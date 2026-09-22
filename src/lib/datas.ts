/** Tudo que depende de "dia" usa o fuso do usuário, nunca UTC. */

export function fusoDoUsuario() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo";
  } catch {
    return "America/Sao_Paulo";
  }
}

/** Data local no formato AAAA-MM-DD, no fuso informado (ou do aparelho). */
export function diaLocal(data = new Date(), fuso = fusoDoUsuario()) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: fuso,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(data);
  return partes;
}

export function somarDias(dia: string, n: number) {
  const [a, m, d] = dia.split("-").map(Number);
  const base = new Date(Date.UTC(a!, m! - 1, d!));
  base.setUTCDate(base.getUTCDate() + n);
  return base.toISOString().slice(0, 10);
}

export function diferencaDias(de: string, ate: string) {
  const ms = Date.parse(`${ate}T00:00:00Z`) - Date.parse(`${de}T00:00:00Z`);
  return Math.round(ms / 86400000);
}

export function dataLegivel(dia: string) {
  const [a, m, d] = dia.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(
    new Date(Date.UTC(a!, m! - 1, d!)),
  );
}

export function saudacao(fuso = fusoDoUsuario()) {
  const hora = Number(
    new Intl.DateTimeFormat("pt-BR", { timeZone: fuso, hour: "2-digit", hour12: false }).format(new Date()),
  );
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

/** Ofensiva: dias consecutivos terminando hoje (ou ontem, se ainda não fez check-in hoje). */
export function calcularOfensiva(dias: string[], hoje: string) {
  const conjunto = new Set(dias);
  let inicio: string | null = null;
  if (conjunto.has(hoje)) inicio = hoje;
  else if (conjunto.has(somarDias(hoje, -1))) inicio = somarDias(hoje, -1);
  if (!inicio) return 0;
  let total = 0;
  let cursor = inicio;
  while (conjunto.has(cursor)) {
    total++;
    cursor = somarDias(cursor, -1);
  }
  return total;
}
