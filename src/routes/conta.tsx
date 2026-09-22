import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Download, LogOut, Smartphone, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Shell, Titulo } from "@/components/Shell";
import { useAuth } from "@/hooks/useAuth";
import { exportarMeusDados, usePerfil } from "@/hooks/useDados";
import { excluirConta } from "@/lib/conta.functions";
import { fusoDoUsuario } from "@/lib/datas";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Sua conta e seus dados — Alvorada" },
      {
        name: "description",
        content: "Veja seu consentimento, exporte tudo o que você escreveu ou apague sua conta a qualquer momento.",
      },
      { property: "og:title", content: "Sua conta e seus dados — Alvorada" },
      { property: "og:description", content: "Exportar, apagar e sair — controle total dos seus dados." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const { user, carregando, sair } = useAuth();
  const { data: perfil } = usePerfil();
  const navigate = useNavigate();
  const apagarConta = useServerFn(excluirConta);
  const [ocupado, setOcupado] = useState(false);

  if (!user && !carregando) {
    return (
      <Shell>
        <Titulo>Conta</Titulo>
        <Link
          to="/auth"
          className="toque mt-4 flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
        >
          Entrar
        </Link>
      </Shell>
    );
  }

  async function exportar() {
    setOcupado(true);
    try {
      const dados = await exportarMeusDados();
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "alvorada-meus-dados.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Não deu para exportar agora.");
    } finally {
      setOcupado(false);
    }
  }

  async function excluir() {
    if (!window.confirm("Apagar sua conta e todos os seus dados? Isso não pode ser desfeito.")) return;
    setOcupado(true);
    try {
      await apagarConta({});
      await sair();
      window.localStorage.clear();
      toast.success("Conta e dados apagados.");
      navigate({ to: "/" });
    } catch {
      toast.error("Não deu para apagar agora. Tente novamente.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <Shell>
      <Titulo acima={user?.email ?? ""}>{perfil?.nome ?? "Sua conta"}</Titulo>

      <section className="superficie mb-5 p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-6 text-primary" />
          <h2 className="text-xl">Privacidade</h2>
        </div>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Anotações, destaques e diário podem revelar convicção religiosa — dado sensível na LGPD. Só
          você tem acesso a eles: as regras do banco impedem que qualquer outra pessoa leia seus
          registros.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Consentimento: {perfil?.consent_sensivel ? "concedido" : "pendente"} · Fuso horário usado
          na ofensiva: {perfil?.timezone ?? fusoDoUsuario()}
        </p>
      </section>

      <div className="space-y-3">
        <button
          onClick={exportar}
          disabled={ocupado}
          className="toque flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-base font-medium"
        >
          <Download className="size-5" /> Exportar meus dados
        </button>

        <Link
          to="/instalar"
          className="toque flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-base font-medium"
        >
          <Smartphone className="size-5" /> Instalar no celular
        </Link>

        <button
          onClick={async () => {
            await sair();
            navigate({ to: "/" });
          }}
          className="toque flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-base font-medium"
        >
          <LogOut className="size-5" /> Sair
        </button>

        <button
          onClick={excluir}
          disabled={ocupado}
          className="toque flex w-full items-center justify-center gap-2 rounded-full bg-destructive text-base font-semibold text-destructive-foreground"
        >
          <Trash2 className="size-5" /> Apagar conta e dados
        </button>
      </div>
    </Shell>
  );
}
