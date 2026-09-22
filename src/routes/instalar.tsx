import { createFileRoute } from "@tanstack/react-router";
import { Share, MoreVertical } from "lucide-react";

import { Shell, Titulo } from "@/components/Shell";

export const Route = createFileRoute("/instalar")({
  head: () => ({
    meta: [
      { title: "Instalar o Alvorada no celular" },
      {
        name: "description",
        content:
          "Passo a passo para adicionar o Alvorada à tela de início no Android e no iPhone e usar offline.",
      },
      { property: "og:title", content: "Instalar o Alvorada no celular" },
      { property: "og:description", content: "Android e iPhone, em poucos toques." },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  return (
    <Shell>
      <Titulo acima="Funciona offline">Instalar no celular</Titulo>

      <section className="superficie mb-5 p-6">
        <div className="flex items-center gap-3">
          <MoreVertical className="size-6 text-primary" />
          <h2 className="text-xl">Android (Chrome)</h2>
        </div>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed">
          <li>Toque no menu de três pontos, no canto superior.</li>
          <li>
            Escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.
          </li>
          <li>Confirme. O ícone do Alvorada aparece junto dos seus outros apps.</li>
        </ol>
      </section>

      <section className="superficie mb-5 p-6">
        <div className="flex items-center gap-3">
          <Share className="size-6 text-primary" />
          <h2 className="text-xl">iPhone (Safari)</h2>
        </div>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed">
          <li>Abra este endereço no Safari (não funciona pelo Chrome no iPhone).</li>
          <li>Toque no botão de compartilhar, na barra de baixo.</li>
          <li>
            Escolha <strong>Adicionar à Tela de Início</strong> e confirme.
          </li>
        </ol>
      </section>

      <section className="superficie p-6">
        <h2 className="text-xl">Uso offline</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Abra o app conectado uma vez: o texto bíblico completo fica guardado no aparelho e a
          leitura continua funcionando sem internet. Anotações, check-ins e diário são enviados para
          a nuvem quando a conexão volta.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          No iPhone não há notificações nesta versão — lembretes ficam para uma fase seguinte.
        </p>
      </section>
    </Shell>
  );
}
