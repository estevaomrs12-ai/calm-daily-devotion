import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Flame, Sun, Sparkles, UserRound } from "lucide-react";
import type { ReactNode } from "react";

const ITENS = [
  { to: "/", rotulo: "Hoje", Icone: Sun },
  { to: "/biblia", rotulo: "Bíblia", Icone: BookOpen },
  { to: "/plano", rotulo: "Plano", Icone: Flame },
  { to: "/gratidao", rotulo: "Gratidão", Icone: Sparkles },
  { to: "/conta", rotulo: "Conta", Icone: UserRound },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const caminho = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen suave pb-28">
      <div className="mx-auto w-full max-w-xl px-5 pt-8">{children}</div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto flex w-full max-w-xl items-stretch">
          {ITENS.map(({ to, rotulo, Icone }) => {
            const ativo = to === "/" ? caminho === "/" : caminho.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                    ativo ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icone className="size-6" strokeWidth={ativo ? 2.4 : 1.8} />
                  {rotulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Titulo({ acima, children }: { acima?: string; children: ReactNode }) {
  return (
    <header className="mb-6">
      {acima ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{acima}</p>
      ) : null}
      <h1 className="mt-1 text-3xl leading-tight">{children}</h1>
    </header>
  );
}
