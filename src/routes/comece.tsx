import { createFileRoute } from "@tanstack/react-router";
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
      className={`toque flex items-center justify-center rounded-xl bg-amber-400 text-base font-extrabold uppercase tracking-wide text-slate-900 shadow-[0_0_28px_rgba(245,158,11,0.45)] transition-transform active:scale-[0.98] hover:bg-amber-300 ${className ?? ""}`}
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-amber-400/50">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400/15">
          <span className="text-amber-400">{icone}</span>
        </div>
        <span className="text-sm font-bold tracking-widest text-amber-400/70">{numero}</span>
      </div>
      <h3 className="mt-4 text-xl leading-snug text-white">{titulo}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-400">{texto}</p>
    </div>
  );
}

function DorItem({ texto }: { texto: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-100">
        <X className="size-4 text-red-500" strokeWidth={3} />
      </div>
      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{texto}</p>
    </div>
  );
}

function Duvida({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 sm:text-base">
        {pergunta}
        <ChevronDown className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">{resposta}</p>
    </details>
  );
}

function PaginaVenda() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-xl overflow-x-hidden">
        {/* Hero */}
        <header className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#f59e0b] px-5 pt-10 pb-16 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px]" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3">
              <img src="/icone-192.png" alt="" width={40} height={40} className="size-10" />
              <span className="text-xl font-bold text-white">Alvorada com Deus</span>
            </div>

            <h1 className="mt-10 text-4xl font-bold leading-tight tracking-tight text-white">
              Comece cada manhã na <span className="text-amber-300">presença de Deus</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-indigo-100/90">
              Bíblia completa, versículo do dia, plano de leitura com ofensiva, devocional guiado e
              diário de gratidão — tudo em um só lugar, calmo e simples, direto no seu celular.
            </p>

            <img
              src={celular}
              alt="App Alvorada com Deus no celular, com o versículo do dia"
              width={1024}
              height={1536}
              className="mx-auto mt-10 w-full max-w-xs rounded-3xl object-cover shadow-2xl ring-4 ring-white/20"
            />

            {/* Preço */}
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 text-left shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                Acesso único · Pagamento único
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-4xl font-extrabold tracking-tight text-white">{PRECO}</p>
                <p className="text-sm text-white/70">para sempre</p>
              </div>
              <p className="mt-1 text-sm text-white/70">
                Sem mensalidade, sem renovação automática, sem cobrança de novo.
              </p>
              <BotaoComprar className="mt-5 w-full">Quero começar hoje</BotaoComprar>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-amber-300" strokeWidth={3} /> Acesso
                  imediato após o pagamento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-amber-300" strokeWidth={3} /> Garantia de 7
                  dias com reembolso
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-amber-300" strokeWidth={3} /> Pagamento
                  seguro pela Cakto
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dor */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-slate-900">
              Você já abriu a Bíblia com vontade… e parou no terceiro dia?
            </h2>
            <div className="mt-8 space-y-3">
              <DorItem texto="A correria engole o tempo e o celular distrai antes de tudo." />
              <DorItem texto="A leitura “de um dia” vira “um dia eu leio”." />
              <DorItem texto="Não é falta de fé — é falta de um caminho simples." />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              O Alvorada com Deus foi feito exatamente para isso: um momento calmo com a Palavra,
              uma ação por vez, todos os dias — que caiba nos seus minutos da manhã e te chame de
              volta no dia seguinte.
            </p>
          </div>
        </section>

        {/* O que você recebe */}
        <section className="-mt-10 relative z-10 rounded-t-[40px] bg-slate-900 px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-white">O que você recebe</h2>
            <p className="mt-3 text-center text-lg text-slate-400">
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
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-3xl leading-snug text-slate-900">Como funciona</h2>
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
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-900">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Garantia */}
        <section className="bg-white px-5 pb-8">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="size-10 shrink-0 text-amber-600" />
                <h2 className="text-2xl leading-snug text-slate-900">Garantia de 7 dias</h2>
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Comprou e não era o que esperava? Em até 7 dias você solicita o reembolso direto na
                plataforma de pagamento. O risco é nosso; a caminhada é sua.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl leading-snug text-slate-900">Dúvidas frequentes</h2>
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
        <section className="bg-gradient-to-t from-[#0f172a] via-[#1e1b4b] to-[#312e81] px-5 py-20 text-center">
          <div className="mx-auto max-w-md">
            <Sun className="mx-auto size-12 text-amber-400" />
            <h2 className="mt-4 text-3xl italic leading-snug text-amber-300">
              Sua primeira manhã com Deus começa agora.
            </h2>
            <p className="mt-3 text-lg text-indigo-200">
              Pagamento único de {PRECO}. Acesso imediato. Garantia de 7 dias.
            </p>
            <BotaoComprar className="mt-8 w-full">Quero começar hoje — {PRECO}</BotaoComprar>
          </div>
        </section>

        <footer className="bg-[#0f172a] px-5 pb-4 pt-2 text-center text-xs text-slate-500">
          <p>Alvorada com Deus · Pagamento processado com segurança pela Cakto</p>
          <p className="mt-2 pb-4">© 2026 Alvorada com Deus. Todos os direitos reservados.</p>
        </footer>
      </div>

      {/* Barra fixa de compra */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4">
        <div className="flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.18)] backdrop-blur-lg">
          <div className="pl-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Acesso único
            </p>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">{PRECO}</p>
          </div>
          <BotaoComprar className="rounded-xl px-6">Quero começar</BotaoComprar>
        </div>
      </div>
    </div>
  );
}
