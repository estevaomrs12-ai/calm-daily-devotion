import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { fusoDoUsuario } from "@/lib/datas";

type Busca = { modo?: "entrar" | "criar" | undefined };

export const Route = createFileRoute("/auth")({
  validateSearch: (busca: Record<string, unknown>): Busca => ({
    modo: busca["modo"] === "entrar" ? "entrar" : "criar",
  }),
  head: () => ({
    meta: [
      { title: "Entrar no Alvorada com Deus" },
      {
        name: "description",
        content: "Crie sua conta ou entre para guardar suas anotações, ofensiva e diário na nuvem.",
      },
      { property: "og:title", content: "Entrar no Alvorada com Deus" },
      { property: "og:description", content: "Acesse sua caminhada diária em qualquer aparelho." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const { modo } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [criar, setCriar] = useState(modo !== "entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      if (criar) {
        if (!consentimento) {
          toast.error("Precisamos do seu consentimento para guardar anotações e diário.");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: { nome },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        if (data.session) {
          await supabase
            .from("profiles")
            .update({
              nome,
              timezone: fusoDoUsuario(),
              consent_sensivel: true,
              consent_em: new Date().toISOString(),
            })
            .eq("id", data.session.user.id);
          navigate({ to: "/plano" });
        } else {
          toast.success("Confira seu e-mail para confirmar a conta.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        navigate({ to: "/" });
      }
    } catch (erro) {
      const msg = erro instanceof Error ? erro.message : "Não foi possível continuar.";
      toast.error(
        msg.includes("Invalid login credentials") ? "E-mail ou senha incorretos." : msg,
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen suave px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="flex items-center gap-3">
          <img src="/icone-192.png" alt="" width={40} height={40} className="size-10" />
          <span className="serif text-xl">Alvorada com Deus</span>
        </Link>

        <h1 className="mt-10 text-3xl">{criar ? "Criar sua conta" : "Bem-vindo de volta"}</h1>
        <p className="mt-2 text-muted-foreground">
          {criar
            ? "Suas anotações, ofensiva e diário ficam salvos e acompanham você em qualquer aparelho."
            : "Entre para continuar sua caminhada."}
        </p>

        <form onSubmit={enviar} className="superficie mt-8 space-y-4 p-6">
          {criar && (
            <div>
              <label className="text-sm font-medium" htmlFor="nome">
                Seu nome
              </label>
              <input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                className="toque mt-1 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="toque mt-1 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              minLength={8}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={criar ? "new-password" : "current-password"}
              className="toque mt-1 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {criar && (
            <label className="flex gap-3 rounded-2xl bg-muted p-4 text-sm">
              <input
                type="checkbox"
                checked={consentimento}
                onChange={(e) => setConsentimento(e.target.checked)}
                className="mt-1 size-5 shrink-0 accent-[var(--primary)]"
              />
              <span>
                Autorizo o Alvorada com Deus a guardar minhas anotações, destaques e diário de gratidão, que
                podem revelar convicção religiosa (dado sensível na LGPD). Posso exportar ou apagar
                tudo quando quiser, na tela Conta.
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="toque w-full rounded-full bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60"
          >
            {enviando ? "Um instante…" : criar ? "Criar conta" : "Entrar"}
          </button>
        </form>

        <button
          onClick={() => setCriar((v) => !v)}
          className="mt-6 w-full text-sm font-medium text-muted-foreground underline"
        >
          {criar ? "Já tenho conta — entrar" : "Não tenho conta — criar agora"}
        </button>
      </div>
    </div>
  );
}
