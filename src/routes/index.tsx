import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Check, Highlighter, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import amanhecer from "@/assets/amanhecer.jpg";
import { Shell } from "@/components/Shell";
import { useAuth } from "@/hooks/useAuth";
import {
  useAlternarDestaque,
  useAnotacao,
  useBiblia,
  useCheckins,
  useDestaques,
  useFazerCheckin,
  usePerfil,
  useSalvarAnotacao,
} from "@/hooks/useDados";
import { versiculoDoDia } from "@/lib/biblia";
import { acharPlano, montarPlano } from "@/lib/planos";
import { calcularOfensiva, dataLegivel, diaLocal, diferencaDias, saudacao } from "@/lib/datas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alvorada — comece o dia na Palavra" },
      {
        name: "description",
        content:
          "Versículo do dia, leitura do plano, ofensiva e diário de gratidão em uma tela calma. Instale no celular e use offline.",
      },
      { property: "og:title", content: "Alvorada — comece o dia na Palavra" },
      {
        property: "og:description",
        content: "Bíblia completa em português, plano de leitura com ofensiva e diário de gratidão.",
      },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const { user, carregando } = useAuth();
  if (carregando) return <div className="min-h-screen suave" />;
  return user ? <Hoje /> : <BoasVindas />;
}

function BoasVindas() {
  return (
    <div className="min-h-screen suave">
      <div className="mx-auto w-full max-w-xl px-5 pb-16 pt-10">
        <div className="flex items-center gap-3">
          <img src="/icone-192.png" alt="" width={44} height={44} className="size-11" />
          <span className="serif text-2xl">Alvorada</span>
        </div>

        <h1 className="mt-10 text-4xl leading-[1.15]">
          Um momento calmo com a Palavra, todos os dias.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bíblia completa em português, versículo do dia, plano de leitura com ofensiva e diário de
          gratidão. Funciona offline e instala no celular.
        </p>

        <img
          src={amanhecer}
          alt="Amanhecer sobre colinas"
          width={1280}
          height={720}
          className="mt-8 w-full rounded-3xl object-cover shadow-[var(--sombra-calma)]"
        />

        <div className="mt-8 space-y-3">
          <Link
            to="/auth"
            className="toque flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
          >
            Criar minha conta
          </Link>
          <Link
            to="/auth"
            search={{ modo: "entrar" }}
            className="toque flex items-center justify-center rounded-full border border-border bg-card text-base font-medium"
          >
            Já tenho conta
          </Link>
          <Link
            to="/instalar"
            className="flex items-center justify-center py-2 text-sm font-medium text-muted-foreground underline"
          >
            Como instalar no celular
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hoje() {
  const hoje = diaLocal();
  const { data: livros } = useBiblia();
  const { data: perfil } = usePerfil();
  const { data: checkins } = useCheckins();
  const { data: destaques } = useDestaques();
  const fazerCheckin = useFazerCheckin();
  const alternarDestaque = useAlternarDestaque();

  const vd = livros ? versiculoDoDia(livros, hoje) : null;
  const { data: anotacaoSalva } = useAnotacao(vd?.chave ?? null);
  const salvarAnotacao = useSalvarAnotacao();
  const [anotacao, setAnotacao] = useState("");
  useEffect(() => {
    setAnotacao(anotacaoSalva ?? "");
  }, [anotacaoSalva]);

  const ofensiva = calcularOfensiva(checkins ?? [], hoje);
  const feitoHoje = (checkins ?? []).includes(hoje);
  const destacado = !!vd && (destaques ?? []).includes(vd.chave);

  const plano = acharPlano(perfil?.plano_slug);
  const diasPlano = livros && plano ? montarPlano(livros, plano) : null;
  const indiceDia =
    perfil?.plano_inicio && diasPlano
      ? Math.min(Math.max(diferencaDias(perfil.plano_inicio, hoje), 0), diasPlano.length - 1)
      : null;
  const leituraHoje = diasPlano && indiceDia !== null ? diasPlano[indiceDia] : null;

  return (
    <Shell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {dataLegivel(hoje)}
        </p>
        <h1 className="mt-1 text-3xl leading-tight">
          {saudacao()}
          {perfil?.nome ? `, ${perfil.nome.split(" ")[0]}` : ""}.
        </h1>
      </header>

      <div className="superficie mb-5 flex items-center gap-4 p-5">
        <div className="amanhecer flex size-14 items-center justify-center rounded-2xl">
          <Flame className="size-7 text-primary-foreground" />
        </div>
        <div>
          <p className="serif text-2xl">
            {ofensiva} {ofensiva === 1 ? "dia" : "dias"}
          </p>
          <p className="text-sm text-muted-foreground">
            {feitoHoje ? "Você já esteve aqui hoje." : "Faça o check-in para manter a ofensiva."}
          </p>
        </div>
      </div>

      <section className="superficie mb-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Versículo do dia
          </p>
          <button
            aria-label="Destacar versículo"
            onClick={() => vd && alternarDestaque.mutate({ referencia: vd.chave, ativo: destacado })}
            className={`rounded-full p-2 ${destacado ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
          >
            <Highlighter className="size-5" />
          </button>
        </div>
        <p className="texto-versiculo mt-4">{vd?.texto ?? "Carregando o texto…"}</p>
        <p className="mt-3 text-sm font-semibold text-muted-foreground">{vd?.referencia}</p>

        <label className="mt-6 block text-sm font-medium" htmlFor="anotacao">
          Sua anotação
        </label>
        <textarea
          id="anotacao"
          value={anotacao}
          onChange={(e) => setAnotacao(e.target.value)}
          rows={4}
          placeholder="O que esse versículo fala com você hoje?"
          className="mt-2 w-full rounded-2xl border border-input bg-background p-4 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() =>
            vd &&
            salvarAnotacao.mutate(
              { referencia: vd.chave, conteudo: anotacao },
              { onSuccess: () => toast.success("Anotação guardada.") },
            )
          }
          className="toque mt-3 w-full rounded-full border border-border bg-secondary text-base font-medium text-secondary-foreground"
        >
          Salvar anotação
        </button>
      </section>

      <section className="superficie mb-5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Leitura de hoje
        </p>
        {leituraHoje ? (
          <>
            <p className="serif mt-3 text-2xl">{leituraHoje.rotulo}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Dia {(indiceDia ?? 0) + 1} de {diasPlano?.length} · {plano?.nome}
            </p>
            <Link
              to="/biblia"
              search={{ l: leituraHoje.itens[0]!.a, c: leituraHoje.itens[0]!.cap }}
              className="toque mt-4 flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
            >
              Abrir leitura
            </Link>
          </>
        ) : (
          <>
            <p className="mt-3 text-base text-muted-foreground">
              Você ainda não escolheu um plano de leitura.
            </p>
            <Link
              to="/plano"
              className="toque mt-4 flex items-center justify-center gap-1 rounded-full bg-primary text-base font-semibold text-primary-foreground"
            >
              Escolher um plano <ChevronRight className="size-5" />
            </Link>
          </>
        )}
      </section>

      <button
        disabled={feitoHoje || fazerCheckin.isPending}
        onClick={() =>
          fazerCheckin.mutate(leituraHoje?.rotulo ?? vd?.referencia ?? "", {
            onSuccess: () => toast.success("Check-in feito. Ofensiva mantida!"),
            onError: () => toast.error("Não deu para salvar agora. Tente novamente."),
          })
        }
        className={`toque flex w-full items-center justify-center gap-2 rounded-full text-base font-semibold ${
          feitoHoje
            ? "border border-border bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <Check className="size-5" />
        {feitoHoje ? "Check-in de hoje concluído" : "Fazer o check-in de hoje"}
      </button>
    </Shell>
  );
}
