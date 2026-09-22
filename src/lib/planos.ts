import type { Livro } from "./biblia";

export type ItemLeitura = { a: string; cap: number; nome: string };
export type DiaPlano = { rotulo: string; itens: ItemLeitura[] };

export type Plano = {
  slug: string;
  nome: string;
  descricao: string;
  dias: number;
  /** Índices dos livros na ordem canônica (0 = Gênesis, 39 = Mateus). */
  livros: number[];
};

export const PLANOS: Plano[] = [
  {
    slug: "evangelhos-30",
    nome: "Os Evangelhos em 30 dias",
    descricao: "A vida de Jesus, do começo ao fim, em um mês de leituras curtas.",
    dias: 30,
    livros: [39, 40, 41, 42],
  },
  {
    slug: "salmos-30",
    nome: "Salmos em 30 dias",
    descricao: "Um mês de oração e poesia — bom para começar o dia com calma.",
    dias: 30,
    livros: [18],
  },
  {
    slug: "novo-testamento-90",
    nome: "Novo Testamento em 90 dias",
    descricao: "De Mateus a Apocalipse em três meses, cerca de 3 capítulos por dia.",
    dias: 90,
    livros: Array.from({ length: 27 }, (_, i) => 39 + i),
  },
  {
    slug: "genesis-25",
    nome: "Gênesis em 25 dias",
    descricao: "As origens, dois capítulos por dia, com espaço para anotar.",
    dias: 25,
    livros: [0],
  },
];

export function acharPlano(slug?: string | null) {
  return PLANOS.find((p) => p.slug === slug);
}

/** Distribui os capítulos do plano em dias, de forma estável. */
export function montarPlano(livros: Livro[], plano: Plano): DiaPlano[] {
  const capitulos: ItemLeitura[] = [];
  for (const idx of plano.livros) {
    const livro = livros[idx];
    if (!livro) continue;
    for (let c = 1; c <= livro.c.length; c++) {
      capitulos.push({ a: livro.a, cap: c, nome: livro.n });
    }
  }
  const dias: DiaPlano[] = [];
  const total = capitulos.length;
  let pos = 0;
  for (let d = 0; d < plano.dias; d++) {
    const restantes = plano.dias - d;
    const quantos = Math.max(1, Math.round((total - pos) / restantes));
    const itens = capitulos.slice(pos, pos + quantos);
    pos += itens.length;
    if (itens.length === 0) break;
    dias.push({ rotulo: rotularItens(itens), itens });
  }
  return dias;
}

function rotularItens(itens: ItemLeitura[]) {
  const primeiro = itens[0]!;
  const ultimo = itens[itens.length - 1]!;
  if (primeiro.nome === ultimo.nome) {
    return primeiro.cap === ultimo.cap
      ? `${primeiro.nome} ${primeiro.cap}`
      : `${primeiro.nome} ${primeiro.cap}–${ultimo.cap}`;
  }
  return `${primeiro.nome} ${primeiro.cap} – ${ultimo.nome} ${ultimo.cap}`;
}
