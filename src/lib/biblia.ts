export type Livro = { n: string; a: string; c: string[][] };

let cache: Livro[] | null = null;
let pendente: Promise<Livro[]> | null = null;

export async function carregarBiblia(): Promise<Livro[]> {
  if (cache) return cache;
  if (!pendente) {
    pendente = fetch("/dados/biblia-aa.json")
      .then((r) => {
        if (!r.ok) throw new Error("Não foi possível carregar o texto bíblico.");
        return r.json() as Promise<Livro[]>;
      })
      .then((dados) => {
        cache = dados;
        return dados;
      })
      .finally(() => {
        pendente = null;
      });
  }
  return pendente;
}

export function acharLivro(livros: Livro[], abrev: string) {
  return livros.find((l) => l.a === abrev);
}

export function nomeLivro(livros: Livro[], abrev: string) {
  return acharLivro(livros, abrev)?.n ?? abrev;
}

export function versiculo(livros: Livro[], abrev: string, cap: number, ver: number) {
  return acharLivro(livros, abrev)?.c[cap - 1]?.[ver - 1] ?? "";
}

export function referenciaLegivel(livros: Livro[], abrev: string, cap: number, ver?: number) {
  return `${nomeLivro(livros, abrev)} ${cap}${ver ? `:${ver}` : ""}`;
}

/** Chave estável usada no banco: "sl.23.1" */
export function chaveRef(abrev: string, cap: number, ver: number) {
  return `${abrev}.${cap}.${ver}`;
}

export type Resultado = { a: string; cap: number; ver: number; texto: string };

export function buscar(livros: Livro[], termo: string, limite = 60): Resultado[] {
  const alvo = termo
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (alvo.length < 3) return [];
  const achados: Resultado[] = [];
  for (const livro of livros) {
    for (let ci = 0; ci < livro.c.length; ci++) {
      const cap = livro.c[ci]!;
      for (let vi = 0; vi < cap.length; vi++) {
        const texto = cap[vi]!;
        const normal = texto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (normal.includes(alvo)) {
          achados.push({ a: livro.a, cap: ci + 1, ver: vi + 1, texto });
          if (achados.length >= limite) return achados;
        }
      }
    }
  }
  return achados;
}

/** Versículos selecionados para o "versículo do dia" (rotação determinística por data). */
const SELECAO: Array<[string, number, number]> = [
  ["sl", 23, 1],
  ["sl", 27, 1],
  ["sl", 46, 1],
  ["sl", 37, 5],
  ["sl", 91, 1],
  ["sl", 119, 105],
  ["sl", 121, 1],
  ["sl", 143, 8],
  ["pv", 3, 5],
  ["pv", 16, 3],
  ["pv", 18, 10],
  ["is", 40, 31],
  ["is", 41, 10],
  ["is", 43, 19],
  ["jr", 29, 11],
  ["lm", 3, 22],
  ["mq", 6, 8],
  ["sf", 3, 17],
  ["mt", 5, 16],
  ["mt", 6, 33],
  ["mt", 11, 28],
  ["mc", 11, 24],
  ["lc", 6, 31],
  ["jo", 3, 16],
  ["jo", 8, 12],
  ["jo", 14, 27],
  ["jo", 15, 5],
  ["rm", 8, 28],
  ["rm", 12, 12],
  ["rm", 15, 13],
  ["1co", 13, 4],
  ["2co", 4, 16],
  ["2co", 12, 9],
  ["gl", 5, 22],
  ["ef", 2, 10],
  ["ef", 4, 32],
  ["fp", 4, 6],
  ["fp", 4, 13],
  ["cl", 3, 23],
  ["1ts", 5, 16],
  ["hb", 11, 1],
  ["hb", 12, 1],
  ["tg", 1, 5],
  ["1pe", 5, 7],
  ["1jo", 4, 19],
  ["ap", 21, 4],
];

function hashDia(dia: string) {
  let h = 2166136261;
  for (let i = 0; i < dia.length; i++) {
    h ^= dia.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function versiculoDoDia(livros: Livro[], dia: string) {
  const escolha = SELECAO[hashDia(dia) % SELECAO.length]!;
  const [a, cap, ver] = escolha;
  return {
    a,
    cap,
    ver,
    chave: chaveRef(a, cap, ver),
    referencia: referenciaLegivel(livros, a, cap, ver),
    texto: versiculo(livros, a, cap, ver),
  };
}
