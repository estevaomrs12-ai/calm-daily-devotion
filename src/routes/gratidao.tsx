import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Shell, Titulo } from "@/components/Shell";
import { useAuth } from "@/hooks/useAuth";
import { useApagarGratidao, useGratidao, useSalvarGratidao } from "@/hooks/useDados";
import { dataLegivel } from "@/lib/datas";

export const Route = createFileRoute("/gratidao")({
  head: () => ({
    meta: [
      { title: "Diário de gratidão — Alvorada com Deus" },
      {
        name: "description",
        content: "Escreva em uma linha o que você agradece hoje. Tudo salvo na sua conta, só para você.",
      },
      { property: "og:title", content: "Diário de gratidão — Alvorada com Deus" },
      { property: "og:description", content: "Um registro por dia, privado e sincronizado." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const { user, carregando } = useAuth();
  const { data: entradas } = useGratidao();
  const salvar = useSalvarGratidao();
  const apagar = useApagarGratidao();
  const [texto, setTexto] = useState("");

  if (!user && !carregando) {
    return (
      <Shell>
        <Titulo>Diário de gratidão</Titulo>
        <p className="text-muted-foreground">Entre na sua conta para escrever no diário.</p>
        <Link
          to="/auth"
          className="toque mt-5 flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
        >
          Entrar
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <Titulo acima="Só seu">Diário de gratidão</Titulo>

      <div className="superficie mb-8 p-6">
        <label className="text-sm font-medium" htmlFor="gratidao">
          Hoje eu agradeço por…
        </label>
        <textarea
          id="gratidao"
          rows={4}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Uma frase basta."
          className="mt-2 w-full rounded-2xl border border-input bg-background p-4 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          disabled={!texto.trim() || salvar.isPending}
          onClick={() =>
            salvar.mutate(texto.trim(), {
              onSuccess: () => {
                setTexto("");
                toast.success("Guardado.");
              },
              onError: () => toast.error("Não deu para salvar agora."),
            })
          }
          className="toque mt-3 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground disabled:opacity-50"
        >
          Guardar no diário
        </button>
      </div>

      <ul className="space-y-3">
        {(entradas ?? []).map((e) => (
          <li key={e.id} className="superficie flex items-start gap-3 p-5">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {dataLegivel(e.dia)}
              </p>
              <p className="serif mt-2 text-lg leading-relaxed">{e.conteudo}</p>
            </div>
            <button
              onClick={() => apagar.mutate(e.id)}
              aria-label="Apagar entrada"
              className="p-2 text-muted-foreground"
            >
              <Trash2 className="size-5" />
            </button>
          </li>
        ))}
        {(entradas ?? []).length === 0 && (
          <p className="text-muted-foreground">Seu diário começa hoje.</p>
        )}
      </ul>
    </Shell>
  );
}
