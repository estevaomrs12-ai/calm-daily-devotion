import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Highlighter, Search, X } from "lucide-react";

import { Shell, Titulo } from "@/components/Shell";
import { useAuth } from "@/hooks/useAuth";
import { useAlternarDestaque, useBiblia, useDestaques } from "@/hooks/useDados";
import { buscar, chaveRef } from "@/lib/biblia";

type Busca = { l?: string | undefined; c?: number | undefined; q?: string | undefined };

export const Route = createFileRoute("/biblia")({
  validateSearch: (b: Record<string, unknown>): Busca => ({
    l: typeof b["l"] === "string" ? b["l"] : undefined,
    c: b["c"] ? Number(b["c"]) : undefined,
    q: typeof b["q"] === "string" ? b["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Bíblia completa — Alvorada" },
      {
        name: "description",
        content:
          "Leia a Bíblia inteira em português por livro, capítulo e versículo, com busca e destaques. Disponível offline.",
      },
      { property: "og:title", content: "Bíblia completa — Alvorada" },
      { property: "og:description", content: "Livro, capítulo, versículo e busca — tudo offline." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const { l, c, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/biblia" });
  const { data: livros, isLoading, error } = useBiblia();
  const { user } = useAuth();
  const { data: destaques } = useDestaques();
  const alternar = useAlternarDestaque();
  const [termo, setTermo] = useState(q ?? "");

  useEffect(() => {
    setTermo(q ?? "");
  }, [q]);

  const resultados = useMemo(
    () => (livros && q ? buscar(livros, q) : []),
    [livros, q],
  );

  if (error) {
    return (
      <Shell>
        <Titulo>Bíblia</Titulo>
        <p className="text-muted-foreground">
          Não conseguimos carregar o texto agora. Abra o app com internet uma vez para guardá-lo no
          aparelho.
        </p>
      </Shell>
    );
  }

  if (isLoading || !livros) {
    return (
      <Shell>
        <Titulo>Bíblia</Titulo>
        <p className="text-muted-foreground">Carregando o texto…</p>
      </Shell>
    );
  }

  const livro = l ? livros.find((x) => x.a === l) : undefined;
  const cap = livro ? Math.min(Math.max(c ?? 1, 1), livro.c.length) : 1;
  const versos = livro?.c[cap - 1] ?? [];

  return (
    <Shell>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ search: { q: termo || undefined } });
        }}
        className="mb-6 flex items-center gap-2 rounded-full border border-input bg-card px-4"
      >
        <Search className="size-5 text-muted-foreground" />
        <input
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar no texto bíblico"
          className="toque flex-1 bg-transparent text-base outline-none"
        />
        {termo && (
          <button type="button" onClick={() => navigate({ search: {} })} aria-label="Limpar busca">
            <X className="size-5 text-muted-foreground" />
          </button>
        )}
      </form>

      {q ? (
        <>
          <Titulo acima={`${resultados.length} resultado(s)`}>“{q}”</Titulo>
          <ul className="space-y-3">
            {resultados.map((r) => (
              <li key={`${r.a}${r.cap}${r.ver}`}>
                <button
                  onClick={() => navigate({ search: { l: r.a, c: r.cap } })}
                  className="superficie block w-full p-4 text-left"
                >
                  <p className="text-sm font-semibold text-primary">
                    {livros.find((x) => x.a === r.a)?.n} {r.cap}:{r.ver}
                  </p>
                  <p className="mt-1 text-base leading-relaxed">{r.texto}</p>
                </button>
              </li>
            ))}
            {resultados.length === 0 && (
              <p className="text-muted-foreground">
                Nada encontrado. Tente outra palavra (mínimo 3 letras).
              </p>
            )}
          </ul>
        </>
      ) : !livro ? (
        <>
          <Titulo acima="Almeida, domínio público">Bíblia completa</Titulo>
          <ul className="grid grid-cols-2 gap-3">
            {livros.map((x) => (
              <li key={x.a}>
                <button
                  onClick={() => navigate({ search: { l: x.a, c: 1 } })}
                  className="superficie w-full px-4 py-4 text-left text-base font-medium"
                >
                  {x.n}
                  <span className="block text-xs font-normal text-muted-foreground">
                    {x.c.length} capítulos
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              onClick={() => navigate({ search: {} })}
              className="text-sm font-medium text-muted-foreground underline"
            >
              Todos os livros
            </button>
            <select
              value={cap}
              onChange={(e) => navigate({ search: { l: livro.a, c: Number(e.target.value) } })}
              className="rounded-full border border-input bg-card px-4 py-2 text-base"
              aria-label="Escolher capítulo"
            >
              {livro.c.map((_, i) => (
                <option key={i} value={i + 1}>
                  Capítulo {i + 1}
                </option>
              ))}
            </select>
          </div>

          <Titulo acima={livro.n}>Capítulo {cap}</Titulo>

          <div className="superficie space-y-4 p-6">
            {versos.map((texto, i) => {
              const ref = chaveRef(livro.a, cap, i + 1);
              const destacado = (destaques ?? []).includes(ref);
              return (
                <p
                  key={i}
                  className={`texto-versiculo rounded-xl px-2 py-1 ${destacado ? "bg-accent/40" : ""}`}
                >
                  <span className="mr-2 align-super text-xs font-semibold text-primary">{i + 1}</span>
                  {texto}
                  {user && (
                    <button
                      onClick={() => alternar.mutate({ referencia: ref, ativo: destacado })}
                      aria-label="Destacar versículo"
                      className="ml-2 inline-flex align-middle text-muted-foreground"
                    >
                      <Highlighter className="size-4" />
                    </button>
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              disabled={cap <= 1}
              onClick={() => navigate({ search: { l: livro.a, c: cap - 1 } })}
              className="toque flex flex-1 items-center justify-center gap-1 rounded-full border border-border bg-card text-base font-medium disabled:opacity-40"
            >
              <ChevronLeft className="size-5" /> Anterior
            </button>
            <button
              disabled={cap >= livro.c.length}
              onClick={() => navigate({ search: { l: livro.a, c: cap + 1 } })}
              className="toque flex flex-1 items-center justify-center gap-1 rounded-full bg-primary text-base font-semibold text-primary-foreground disabled:opacity-40"
            >
              Próximo <ChevronRight className="size-5" />
            </button>
          </div>
        </>
      )}
    </Shell>
  );
}
