import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export const CHECKOUT_CAKTO = "https://pay.cakto.com.br/3dqacrk_1132821";

export function Bloqueio() {
  const { user, sair } = useAuth();
  const qc = useQueryClient();
  const link = user?.email
    ? `${CHECKOUT_CAKTO}?email=${encodeURIComponent(user.email)}`
    : CHECKOUT_CAKTO;

  return (
    <div className="min-h-screen suave">
      <div className="mx-auto w-full max-w-xl px-5 pb-16 pt-12">
        <div className="flex items-center gap-3">
          <img src="/icone-192.png" alt="" width={44} height={44} className="size-11" />
          <span className="serif text-2xl">Alvorada</span>
        </div>
        <h1 className="mt-10 text-3xl leading-tight">Falta só liberar seu acesso.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Faça o pagamento único no checkout seguro. Use o mesmo e-mail desta conta
          {user?.email ? ` (${user.email})` : ""} para a liberação ser automática.
        </p>
        <div className="mt-8 space-y-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="toque flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
          >
            Ir para o pagamento
          </a>
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ["perfil"] })}
            className="toque flex w-full items-center justify-center rounded-full border border-border bg-card text-base font-medium"
          >
            Já paguei, verificar
          </button>
          <button
            onClick={() => sair()}
            className="flex w-full items-center justify-center py-2 text-sm font-medium text-muted-foreground underline"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
