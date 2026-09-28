import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  X,
} from "lucide-react";

import celular from "@/assets/celular-alvorada.png";
import { CHECKOUT_CAKTO } from "@/components/Bloqueio";

export const Route = createFileRoute("/comece")({
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
      { property: "og:url", content: "https://calm-daily-devotion.lovable.app/comece" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://calm-daily-devotion.lovable.app/comece" }],
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
      className={`toque flex items-center justify-center rounded-full bg-gradient-to-r from-[#c2410c] to-[#f59e0b] text-base font-bold text-white shadow-[0_6px_24px_rgba(194,65,12,0.45)] transition-transform hover:brightness-110 active:scale-[0.98] ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function Card({
  icone,
  titulo,
  texto,
  numero,
}: {
  icone: React.ReactNode;
  titulo: string;
  texto: string;
  numero: string;
}) {
  return (
    <div className="rounded-3xl border border-[#fbbf24]/20 bg-white/[0.07] p-6 transition-colors hover:border-[#fbbf24]/50">
      <div className="flex items-center justify-between gap-3">
        <div className="amanhecer flex size-12 items-center justify-center rounded-2xl text-white">
          {icone}
        </div>
        <span className="serif text-lg text-[#fbbf24]/80">{numero}</span>
      </div>
      <h3 className="mt-4 text-xl leading-snug text-[#fff7ed]">{titulo}</h3>
      <p className="mt-2 text-base leading-relaxed text-[#fed7aa]/85">{texto}</p>
    </div>
  );
}

function DorItem({ texto }: { texto: string }) {
  return (
    <div className="superficie flex items-start gap-4 p-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fca5a5]">
        <X className="size-4 text-[#7f1d1d]" strokeWidth={3} />
      </div>
      <p className="text-base leading-relaxed text-[#44403c]">{texto}</p>
    </div>
  );
}

function Duvida({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  return (
    <details className="superficie group p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#292524]">
        {pergunta}
        <ChevronDown className="size-5 shrink-0 text-[#78716c] transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-base leading-relaxed text-[#57534e]">{resposta}</p>
    </details>
  );
}

function AvisoNavegador() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const interno = /Instagram|FBAN|FBAV|musical_ly|TikTok|ByteLocale/i.test(ua);
    if (interno) setMostrar(true);
  }, []);

  if (!mostrar) return null;

  return (
    <div className="flex items-start gap-3 bg-[#fde68a] px-4 py-3 text-left">
      <Smartphone className="mt-0.5 size-4 shrink-0 text-[#7c2d12]" />
      <p className="flex-1 text-[13px] leading-snug text-[#7c2d12]">
        Para instalar o app depois da compra, toque nos 3 pontinhos no canto e escolha “Abrir no
        navegador”.
      </p>
      <button
        type="button"
        aria-label="Fechar aviso"
        onClick={() => setMostrar(false)}
        className="toque -m-1 shrink-0 rounded-full p-1 text-[#7c2d12]/70">
        <X className="size-4" />
      </button>
    </div>
  );
}

function PaginaVenda() {
  return (
    <div className="min-h-screen bg-[#fef3c7]">
      <div className="mx-auto w-full max-w-xl overflow-x-hidden">
        <AvisoNavegador />
        {/* Hero */}
        <header className="relative overflow-hidden px-5 pt-10 pb-16 text-center"
          style={{
            background:
              "linear-gradient(180deg, #3b1f0b 0%, #7c2d12 35%, #c2410c 65%, #f59e0b 100%)",
          }}>
          <div className="pointer-events-none absolute left-1/2 top-24 size-96 -translate-x-1/2 rounded-full bg-[#fbbf24]/40 blur-[110px]" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3">
              <img src="/icone-192.png" alt="" width={40} height={40} className="size-10" />
              <span className="serif text-xl font-semibold text-[#fff7ed]">Alvorada com Deus</span>
            </div>

            <h1 className="mt-10 text-4xl font-bold leading-tight text-white">
              Comece cada manhã na <span className="text-[#fde68a]">presença de Deus</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[#ffedd5]/95">
              Bíblia completa, versículo do dia, plano de leitura com ofensiva, devocional guiado e
              diário de gratidão — tudo em um só lugar, calmo e simples, direto no seu celular.
            </p>

            <img
              src={celular}
              alt="App Alvorada com Deus no celular, com o versículo do dia"
              width={1024}
              height={1536}
              className="mx-auto mt-10 w-full max-w-xs rounded-3xl object-cover shadow-2xl ring-4 ring-[#fde68a]/40"
            />

            {/* Preço */}
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-white p-6 text-left shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2410c]">
                Acesso único · Pagamento único
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="serif text-4xl font-semibold text-[#292524]">{PRECO}</p>
                <p className="text-sm font-semibold text-[#78716c]">para sempre</p>
              </div>
              <p className="mt-1 text-sm text-[#78716c]">
                Sem mensalidade, sem renovação automática, sem cobrança de novo.
              </p>
              <BotaoComprar className="mt-5 w-full">Quero começar hoje</BotaoComprar>
              <ul className="mt-4 space-y-2 text-sm text-[#57534e]">
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-[#c2410c]" strokeWidth={3} /> Acesso
                  imediato após o pagamento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-[#c2410c]" strokeWidth={3} /> Garantia de 7
                  dias com reembolso
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-[#c2410c]" strokeWidth={3} /> Pagamento
                  seguro pela Cakto
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dor */}
        <section className="bg-[#fffbf2] px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-[#292524]">
              Você já abriu a Bíblia com vontade… e parou no terceiro dia?
            </h2>
            <div className="mt-8 space-y-3">
              <DorItem texto="A correria engole o tempo e o celular distrai antes de tudo." />
              <DorItem texto="A leitura “de um dia” vira “um dia eu leio”." />
              <DorItem texto="Não é falta de fé — é falta de um caminho simples." />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-[#44403c]">
              O Alvorada com Deus foi feito exatamente para isso: um momento calmo com a Palavra,
              uma ação por vez, todos os dias — que caiba nos seus minutos da manhã e te chame de
              volta no dia seguinte.
            </p>
          </div>
        </section>

        {/* O que você recebe */}
        <section
          className="px-5 py-16"
          style={{
            background: "linear-gradient(180deg, #431407 0%, #7c2d12 100%)",
          }}>
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-[#fff7ed]">O que você recebe</h2>
            <p className="mt-3 text-center text-lg text-[#fdba74]/90">
              Tudo já dentro do app, liberado na hora.
            </p>
            <div className="mt-8 space-y-4">
              <Card
                numero="01"
                icone={<BookOpen className="size-6" />}
                titulo="Bíblia completa em português"
                texto="Almeida Revista e Corrigida, do Gênesis ao Apocalipse, com navegação por livro e capítulo, busca e destaques — sem depender de internet."
              />
              <Card
                numero="02"
                icone={<Sun className="size-6" />}
                titulo="Versículo do dia"
                texto="Um versículo novo para começar bem a manhã. Destaque o que tocou seu coração e guarde sua anotação pessoal sobre ele."
              />
              <Card
                numero="03"
                icone={<Flame className="size-6" />}
                titulo="Plano de leitura com ofensiva"
                texto="Escolha um plano de 25 a 90 dias, leia o capítulo do dia e faça o check-in. Sua ofensiva cresce a cada dia que você se mantém fiel."
              />
              <Card
                numero="04"
                icone={<Sunrise className="size-6" />}
                titulo="Devocional guiado de 7 dias"
                texto="Uma semana para começar de verdade: versículo, reflexão, prática e oração — um passo pequeno por dia, já preparado para você."
              />
              <Card
                numero="05"
                icone={<Heart className="size-6" />}
                titulo="Diário de gratidão"
                texto="Guarde o que Deus tem feito. Anote suas gratidões do dia e releia quando precisar de ânimo."
              />
              <Card
                numero="06"
                icone={<WifiOff className="size-6" />}
                titulo="Funciona offline e instala no celular"
                texto="Adicione à tela de início como um app (Android ou iPhone) e use até sem internet. Seus dados ficam salvos e sincronizam na nuvem quando a conexão volta."
              />
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-[#fffbf2] px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-3xl leading-snug text-[#292524]">Como funciona</h2>
            <ol className="mt-6 space-y-4">
              {[
                {
                  icone: <CreditCard className="size-5" />,
                  titulo: "Faça o pagamento",
                  texto:
                    "Clique no botão e conclua a compra no checkout seguro, em menos de dois minutos.",
                },
                {
                  icone: <Sparkles className="size-5" />,
                  titulo: "Crie sua conta com o mesmo e-mail",
                  texto:
                    "Use o mesmo e-mail da compra ao criar sua conta — a liberação é automática e imediata.",
                },
                {
                  icone: <Smartphone className="size-5" />,
                  titulo: "Instale no celular",
                  texto:
                    "Adicione à tela de início e o app passa a abrir como qualquer aplicativo, direto no ícone.",
                },
                {
                  icone: <Sunrise className="size-5" />,
                  titulo: "Comece a sua rotina",
                  texto:
                    "Versículo do dia, leitura do plano, check-in e gratidão. Cinco minutos que mudam o tom da manhã.",
                },
              ].map(({ icone, titulo, texto }, i) => (
                <li key={i} className="superficie flex gap-4 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c2410c] to-[#f59e0b] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[#292524]">{titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#78716c]">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Garantia */}
        <section className="bg-[#fffbf2] px-5 pb-8">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#fef3c7] p-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="size-10 shrink-0 text-[#c2410c]" />
                <h2 className="text-2xl leading-snug text-[#292524]">Garantia de 7 dias</h2>
              </div>
              <p className="mt-3 text-base leading-relaxed text-[#57534e]">
                Comprou e não era o que esperava? Em até 7 dias você solicita o reembolso direto na
                plataforma de pagamento. O risco é nosso; a caminhada é sua.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#fffbf2] px-5 pb-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-[#292524]">Dúvidas frequentes</h2>
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
          </div>
        </section>

        {/* CTA final */}
        <section
          className="px-5 py-20 text-center"
          style={{
            background: "linear-gradient(180deg, #431407 0%, #7c2d12 55%, #b45309 100%)",
          }}>
          <div className="mx-auto max-w-md">
            <Sun className="mx-auto size-12 text-[#fbbf24]" />
            <h2 className="mt-4 text-3xl italic leading-snug text-[#fde68a]">
              Sua primeira manhã com Deus começa agora.
            </h2>
            <p className="mt-3 text-lg text-[#ffedd5]">
              Pagamento único de {PRECO}. Acesso imediato. Garantia de 7 dias.
            </p>
            <BotaoComprar className="mt-8 w-full">Quero começar hoje — {PRECO}</BotaoComprar>
          </div>
        </section>

        <footer className="bg-[#431407] px-5 pb-28 pt-2 text-center text-xs text-[#d6d3d1]">
          <p>Alvorada com Deus · Pagamento processado com segurança pela Cakto</p>
          <p className="mt-2 pb-4">© 2026 Alvorada com Deus. Todos os direitos reservados.</p>
        </footer>
      </div>

      {/* Barra fixa de compra */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-[#fbbf24]/60 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-5 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c2410c]">
              Acesso único
            </p>
            <p className="serif text-2xl font-semibold text-[#292524]">{PRECO}</p>
          </div>
          <BotaoComprar className="px-6">Quero começar</BotaoComprar>
        </div>
      </div>
    </div>
  );
}
