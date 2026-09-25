import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Sun,
  Flame,
  Sunrise,
  Heart,
  WifiOff,
  Check,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import celular from "@/assets/celular-alvorada.png";
import { CHECKOUT_CAKTO } from "@/components/Bloqueio";

export const Route = createFileRoute("/venda")({
  head: () => ({
    meta: [
      {
        title: "Alvorada com Deus — comece cada manhã na presença de Deus",
      },
      {
        name: "description",
        content:
          "Bíblia completa, versículo do dia, plano de leitura com ofensiva, devocional de 7 dias e diário de gratidão. Pagamento único de R$ 27,90, acesso imediato e garantia de 7 dias.",
      },
      {
        property: "og:title",
        content: "Alvorada com Deus — comece cada manhã na presença de Deus",
      },
      {
        property: "og:description",
        content:
          "Bíblia completa, versículo do dia, ofensiva de leitura e diário de gratidão. Pagamento único de R$ 27,90 com garantia de 7 dias.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://calm-daily-devotion.lovable.app/venda" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://calm-daily-devotion.lovable.app/venda" }],
  }),
  component: PaginaVenda,
});

const PRECO = "R$ 27,90";

function BotaoComprar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CHECKOUT_CAKTO}
      target="_blank"
      rel="noopener noreferrer"
      className={`toque flex items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[var(--sombra-calma)] ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function Card({
  icone,
  titulo,
  texto,
}: {
  icone: React.ReactNode;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="superficie p-6">
      <div className="amanhecer flex size-12 items-center justify-center rounded-2xl">
        {icone}
      </div>
      <h3 className="mt-4 text-xl leading-snug">{titulo}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{texto}</p>
    </div>
  );
}

function Duvida({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  return (
    <details className="superficie group p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
        {pergunta}
        <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{resposta}</p>
    </details>
  );
}

function PaginaVenda() {
  return (
    <div className="min-h-screen suave pb-40">
      <div className="mx-auto w-full max-w-xl px-5">
        {/* Hero */}
        <header className="pt-10">
          <div className="flex items-center gap-3">
            <img src="/icone-192.png" alt="" width={44} height={44} className="size-11" />
            <span className="serif text-2xl">Alvorada com Deus</span>
          </div>

          <h1 className="mt-10 text-4xl leading-[1.12]">
            Comece cada manhã na presença de Deus.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Bíblia completa, versículo do dia, plano de leitura com ofensiva, devocional guiado e
            diário de gratidão — tudo em um só lugar, calmo e simples, direto no seu celular.
          </p>

          <img
            src={celular}
            alt="App Alvorada com Deus no celular, com o versículo do dia"
            width={1024}
            height={1536}
            className="mx-auto mt-8 w-full max-w-sm rounded-3xl object-cover shadow-[var(--sombra-calma)]"
          />

          <div className="superficie mt-8 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Acesso único
            </p>
            <p className="serif mt-2 text-4xl">{PRECO}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pagamento único. Sem mensalidade, sem cobrança de novo.
            </p>
            <BotaoComprar className="mt-5 w-full">Quero começar hoje</BotaoComprar>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-primary" /> Acesso imediato após o pagamento
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-primary" /> Garantia de 7 dias com reembolso
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-primary" /> Pagamento seguro pela Cakto
              </li>
            </ul>
          </div>
        </header>

        {/* Dor */}
        <section className="mt-16">
          <h2 className="text-3xl leading-snug">
            Você já abriu a Bíblia com vontade… e parou no terceiro dia?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A correria engole o tempo, o celular distrai, e a leitura “de um dia” vira “um dia eu
            leio”. Não é falta de fé — é falta de um caminho simples, que caiba nos seus minutos da
            manhã e te chame de volta no dia seguinte.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            O Alvorada com Deus foi feito exatamente para isso: um momento calmo com a Palavra, uma
            ação por vez, todos os dias.
          </p>
        </section>

        {/* O que você recebe */}
        <section className="mt-16">
          <h2 className="text-3xl leading-snug">O que você recebe</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Tudo já dentro do app, liberado na hora.
          </p>
          <div className="mt-6 space-y-4">
            <Card
              icone={<BookOpen className="size-6 text-primary-foreground" />}
              titulo="Bíblia completa em português"
              texto="Almeida Revista e Corrigida, do Gênesis ao Apocalipse, com navegação por livro e capítulo, busca e destaques — sem depender de internet."
            />
            <Card
              icone={<Sun className="size-6 text-primary-foreground" />}
              titulo="Versículo do dia"
              texto="Um versículo novo para começar bem a manhã. Destaque o que tocou seu coração e guarde sua anotação pessoal sobre ele."
            />
            <Card
              icone={<Flame className="size-6 text-primary-foreground" />}
              titulo="Plano de leitura com ofensiva"
              texto="Escolha um plano de 25 a 90 dias, leia o capítulo do dia e faça o check-in. Sua ofensiva cresce a cada dia que você se mantém fiel."
            />
            <Card
              icone={<Sunrise className="size-6 text-primary-foreground" />}
              titulo="Devocional guiado de 7 dias"
              texto="Uma semana para começar de verdade: versículo, reflexão, prática e oração — um passo pequeno por dia, já preparado para você."
            />
            <Card
              icone={<Heart className="size-6 text-primary-foreground" />}
              titulo="Diário de gratidão"
              texto="Guarde o que Deus tem feito. Anote suas gratidões do dia e releia quando precisar de ânimo."
            />
            <Card
              icone={<WifiOff className="size-6 text-primary-foreground" />}
              titulo="Funciona offline e instala no celular"
              texto="Adicione à tela de início como um app (Android ou iPhone) e use até sem internet. Seus dados ficam salvos e sincronizam na nuvem quando a conexão volta."
            />
          </div>
        </section>

        {/* Como funciona */}
        <section className="mt-16">
          <h2 className="text-3xl leading-snug">Como funciona</h2>
          <ol className="mt-6 space-y-4">
            {[
              {
                icone: <CreditCard className="size-5" />,
                titulo: "Faça o pagamento",
                texto: "Clique no botão e conclua a compra no checkout seguro, em menos de dois minutos.",
              },
              {
                icone: <Sparkles className="size-5" />,
                titulo: "Crie sua conta com o mesmo e-mail",
                texto: "Use o mesmo e-mail da compra ao criar sua conta — a liberação é automática e imediata.",
              },
              {
                icone: <Smartphone className="size-5" />,
                titulo: "Instale no celular",
                texto: "Adicione à tela de início e o app passa a abrir como qualquer aplicativo, direto no ícone.",
              },
              {
                icone: <Sunrise className="size-5" />,
                titulo: "Comece a sua rotina",
                texto: "Versículo do dia, leitura do plano, check-in e gratidão. Cinco minutos que mudam o tom da manhã.",
              },
            ].map(({ icone, titulo, texto }, i) => (
              <li key={i} className="superficie flex gap-4 p-5">
                <div className="amanhecer flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold">{titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Garantia */}
        <section className="mt-16">
          <div className="superficie flex gap-4 p-6">
            <ShieldCheck className="size-8 shrink-0 text-primary" />
            <div>
              <h2 className="text-2xl leading-snug">Garantia de 7 dias</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Comprou e não era o que esperava? Em até 7 dias você solicita o reembolso direto na
                plataforma de pagamento. O risco é nosso; a caminhada é sua.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-3xl leading-snug">Dúvidas frequentes</h2>
          <div className="mt-6 space-y-3">
            <Duvida
              pergunta="É assinatura?"
              resposta="Não. É um pagamento único de R$ 27,90. Sem mensalidade, sem renovação automática, sem surpresa depois."
            />
            <Duvida
              pergunta="Funciona no meu celular?"
              resposta="Sim. Funciona em Android e iPhone: você abre o site no navegador e instala na tela de início, como um aplicativo comum."
            />
            <Duvida
              pergunta="E se eu estiver sem internet?"
              resposta="A Bíblia completa e o app continuam funcionando offline. O que você escrever fica salvo no aparelho e sincroniza na nuvem quando a conexão voltar."
            />
            <Duvida
              pergunta="Minhas anotações são privadas?"
              resposta="Sim. Sua conta é protegida por senha e só você acessa os seus dados. Você pode exportar tudo ou apagar a conta quando quiser."
            />
            <Duvida
              pergunta="Como recebo o acesso?"
              resposta="Assim que o pagamento é aprovado, a conta criada com o mesmo e-mail da compra é liberada automaticamente — sem esperar, sem pedir para ninguém."
            />
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-16 text-center">
          <Sun className="mx-auto size-10 text-primary" />
          <h2 className="mt-4 text-3xl leading-snug">
            Sua primeira manhã com Deus começa agora.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Pagamento único de {PRECO}. Acesso imediato. Garantia de 7 dias.
          </p>
          <BotaoComprar className="mt-6 w-full">Quero começar hoje — {PRECO}</BotaoComprar>
        </section>

        <footer className="mt-12 pb-4 text-center text-xs text-muted-foreground">
          <p>Alvorada com Deus · Pagamento processado com segurança pela Cakto</p>
          <p className="mt-2">© 2026 Alvorada com Deus. Todos os direitos reservados.</p>
        </footer>
      </div>

      {/* Barra fixa de compra */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-5 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Acesso único
            </p>
            <p className="serif text-2xl">{PRECO}</p>
          </div>
          <BotaoComprar className="px-6">Quero começar</BotaoComprar>
        </div>
      </div>
    </div>
  );
}
