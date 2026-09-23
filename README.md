# Alvorada com Deus

irei te mandar um app PwA e quero que você faça tipo uma cópia https://jornada-de-fe.vercel.app
## Caminhada Diária — PWA Devocional Original (nome provisório, você escolhe o definitivo)

App PWA instalável, mobile-first, para vender a clientes: Bíblia completa em domínio público + plano de leitura com ofensiva + versículo do dia com anotações + diário de gratidão. Produto **original**, sua marca — não um clone do Jornada de Fé. Web App (PWA), não app de loja.

### Core Features (MVP)

- **Conta e nuvem**: cadastro/login (e-mail + senha, JWT), dados salvos no MongoDB

- **Bíblia completa**: Almeida Revista e Corrigida (1969, domínio público) embutida no banco — sem depender de API de terceiros, sem risco de copyright. Navegação por livro/capítulo/verso + busca

- **Versículo do dia**: determinístico por data, com destaque e anotação pessoal

- **Plano de leitura com check-in diário e ofensiva (streak)**

- **Diário de gratidão**: entradas com data, salvamento na nuvem

- **Instalável**: manifesto PWA + ícones + instruções de instalação para Android e iOS (Adicionar à Tela de Início)

- **Pagamento único**: Cakto Checkout → ativa a conta do comprador

### Casos extremos já tratados no design (o "hardening")

- **LGPD**: convicção religiosa é dado sensível no Art. 5º da LGPD. Anotações e diário = criptografados, consentimento explícito no cadastro, botões de exportar e excluir conta (direitos do titular)

- **Fuso horário do streak**: ofensiva calculada no fuso do usuário (dia local), não em UTC — senão o check-in "vira o dia" errado

- **Offline**: dados locais via IndexedDB com fila de sincronização; conflito resolvido por última-escrita-com-timestamp. A Bíblia inteira funciona offline (está no banco local do app)

- **iOS**: PWA no iPhone tem limites reais (push só depois de instalado, armazenamento limitado). MVP sem notificação push — lembretes ficam para fase 2

- **Stripe**: estrutura de cobrança preparada para assinatura futura, caso pagamento único não sustente suporte/recorrência (tradeoff real: pagamento único = receita única, suporte pra sempre)

- **Multi-dispositivo**: mesmo login em celular e desktop, sem compartilhamento de conta entre pessoas

### Tech Stack

- **Frontend**: React + TypeScript, PWA (service worker, manifest), Tailwind — mobile-first

- **Backend**: FastAPI (Python), JWT auth, bcrypt

- **Banco**: MongoDB (Atlas) — versículos, planos, check-ins, anotações, diário

- **Pagamento**: Stripe Checkout (pagamento único)

- **Deploy**: PWA na Vercel + API em Railway/Fly + MongoDB Atlas

### Fases de Implementação

- **Fase 1 — Base**: setup React/TS + PWA shell, FastAPI + MongoDB, cadastro/login, estrutura de conta ativada/inativa

- **Fase 2 — Bíblia**: importação do dataset ARC 1969, leitor (livro/capítulo/verso), busca, versículo do dia, destaque e anotação

- **Fase 3 — Hábitos**: planos de leitura, check-in diário, streak por fuso local, diário de gratidão

- **Fase 4 — Offline e sincronização**: IndexedDB local-first, fila de sync, conflitos, cache do service worker, telas de instalação Android/iOS

- **Fase 5 — Monetização e lançamento**: Stripe Checkout, consentimento LGPD, exportar/excluir dados, backup do banco, deploy final

### User Flow

Cliente compra (link de pagamento) → recebe acesso → instala o PWA no celular → faz cadastro → escolhe plano de leitura → rotina diária: versículo do dia → leitura → check-in (streak sobe) → anotação/diário → tudo sincroniza na nuvem e funciona offline

### Direção de UI/UX

Propria identidade visual (nada reaproveitado do original): tons quentes de amanhecer, tipografia serifada nos títulos, botões grandes para polegar, telas curtas com uma ação por vez — sensação de "momento calmo do dia", não de dashboard

### Premissas

- Português (pt-BR) apenas, no MVP

- Um usuário por conta; sem recursos sociais/comunidade no MVP

- Sem notificação push no MVP (limitação real de PWA no iOS)

### Decisões em aberto (só você responde)

- **Nome e marca** do app (preciso disso pra logo e manifesto)

- Prefere hospedagem própria (conta sua na Vercel/Railway/Atlas) ou que eu sugira a configuração mais barata pra começar?

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://calm-daily-devotion.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf7275dd-8bbf-4390-a48a-949c38477c1a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
