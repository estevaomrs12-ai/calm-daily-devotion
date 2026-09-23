import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame } from "lucide-react";
import { toast } from "sonner";

import { Shell, Titulo } from "@/components/Shell";
import { useAuth } from "@/hooks/useAuth";
import { useBiblia, useCheckins, usePerfil, useSalvarPerfil } from "@/hooks/useDados";
import { PLANOS, acharPlano, montarPlano } from "@/lib/planos";
import { calcularOfensiva, diaLocal, diferencaDias } from "@/lib/datas";

export const Route = createFileRoute("/plano")({
  head: () => ({
    meta: [
      { title: "Plano de leitura e ofensiva — Alvorada com Deus" },
      {
        name: "description",
        content:
          "Escolha um plano de leitura, acompanhe o dia de hoje e mantenha sua ofensiva calculada no seu fuso horário.",
      },
      { property: "og:title", content: "Plano de leitura e ofensiva — Alvorada com Deus" },
      { property: "og:description", content: "Planos de 25 a 90 dias com check-in diário." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const hoje = diaLocal();
  const { user, carregando } = useAuth();
  const { data: livros } = useBiblia();
  const { data: perfil } = usePerfil();
  const { data: checkins } = useCheckins();
  const salvar = useSalvarPerfil();

  if (!user && !carregando) {
    return (
      <Shell>
        <Titulo>Plano de leitura</Titulo>
        <p className="text-muted-foreground">Entre na sua conta para escolher um plano.</p>
        <Link
          to="/auth"
          className="toque mt-5 flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
        >
          Entrar
        </Link>
      </Shell>
    );
  }

  const planoAtual = acharPlano(perfil?.plano_slug);
  const dias = livros && planoAtual ? montarPlano(livros, planoAtual) : null;
  const indice =
    perfil?.plano_inicio && dias
      ? Math.min(Math.max(diferencaDias(perfil.plano_inicio, hoje), 0), dias.length - 1)
      : 0;
  const ofensiva = calcularOfensiva(checkins ?? [], hoje);

  function escolher(slug: string) {
    salvar.mutate(
      { plano_slug: slug, plano_inicio: hoje },
      { onSuccess: () => toast.success("Plano escolhido. Sua leitura de hoje já está pronta.") },
    );
  }

  return (
    <Shell>
      <Titulo acima="Sua rotina">Plano de leitura</Titulo>

      <div className="superficie mb-6 flex items-center gap-4 p-5">
        <div className="amanhecer flex size-12 items-center justify-center rounded-2xl">
          <Flame className="size-6 text-primary-foreground" />
        </div>
        <p className="text-base">
          <span className="serif text-xl">{ofensiva}</span> dia(s) de ofensiva, contados no seu fuso
          horário.
        </p>
      </div>

      <ul className="space-y-3">
        {PLANOS.map((p) => {
          const ativo = perfil?.plano_slug === p.slug;
          return (
            <li key={p.slug} className="superficie p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">{p.nome}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {p.dias} dias
                  </p>
                </div>
                {ativo && <Check className="size-6 shrink-0 text-primary" />}
              </div>
              {!ativo && (
                <button
                  onClick={() => escolher(p.slug)}
                  className="toque mt-4 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground"
                >
                  Começar este plano
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {dias && planoAtual && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl">Próximos dias · {planoAtual.nome}</h2>
          <ul className="space-y-2">
            {dias.slice(indice, indice + 7).map((d, i) => (
              <li key={d.rotulo + i}>
                <Link
                  to="/biblia"
                  search={{ l: d.itens[0]!.a, c: d.itens[0]!.cap }}
                  className="superficie flex items-center justify-between p-4"
                >
                  <span className="text-base font-medium">{d.rotulo}</span>
                  <span className="text-xs text-muted-foreground">
                    {i === 0 ? "hoje" : `+${i}d`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  );
}
