import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { carregarBiblia } from "@/lib/biblia";
import { diaLocal, fusoDoUsuario } from "@/lib/datas";

/* ---------- cache local (funciona offline) ---------- */

const PREFIXO = "alvorada:";

export function lerLocal<T>(chave: string): T | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const bruto = window.localStorage.getItem(PREFIXO + chave);
    return bruto ? (JSON.parse(bruto) as T) : undefined;
  } catch {
    return undefined;
  }
}

export function gravarLocal(chave: string, valor: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    /* espaço cheio: seguir sem cache */
  }
}

/* ---------- texto bíblico ---------- */

export function useBiblia() {
  return useQuery({
    queryKey: ["biblia"],
    queryFn: carregarBiblia,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

/* ---------- perfil ---------- */

export type Perfil = {
  id: string;
  nome: string | null;
  timezone: string;
  consent_sensivel: boolean;
  plano_slug: string | null;
  plano_inicio: string | null;
  ativo: boolean;
};

export function usePerfil() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["perfil", user?.id],
    enabled: !!user,
    initialData: () => lerLocal<Perfil>("perfil"),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, timezone, consent_sensivel, plano_slug, plano_inicio, ativo")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      if (data) gravarLocal("perfil", data);
      return data as Perfil | null;
    },
  });
}

export function useSalvarPerfil() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (mudancas: Partial<Perfil>) => {
      const { error } = await supabase
        .from("profiles")
        .update({ ...mudancas, timezone: mudancas.timezone ?? fusoDoUsuario() })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["perfil"] }),
  });
}

/* ---------- check-ins e ofensiva ---------- */

export function useCheckins() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["checkins", user?.id],
    enabled: !!user,
    initialData: () => lerLocal<string[]>("checkins"),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("dia")
        .order("dia", { ascending: false })
        .limit(400);
      if (error) throw error;
      const dias = (data ?? []).map((d) => d.dia as string);
      gravarLocal("checkins", dias);
      return dias;
    },
  });
}

export function useFazerCheckin() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (referencia: string) => {
      const dia = diaLocal();
      const { error } = await supabase
        .from("checkins")
        .upsert({ user_id: user!.id, dia, referencia }, { onConflict: "user_id,dia" });
      if (error) throw error;
      return dia;
    },
    onSuccess: (dia) => {
      const atuais = lerLocal<string[]>("checkins") ?? [];
      if (!atuais.includes(dia)) gravarLocal("checkins", [dia, ...atuais]);
      qc.invalidateQueries({ queryKey: ["checkins"] });
    },
  });
}

/* ---------- anotações ---------- */

export function useAnotacao(referencia: string | null) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["anotacao", user?.id, referencia],
    enabled: !!user && !!referencia,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("anotacoes")
        .select("conteudo")
        .eq("referencia", referencia!)
        .maybeSingle();
      if (error) throw error;
      return data?.conteudo ?? "";
    },
  });
}

export function useSalvarAnotacao() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ referencia, conteudo }: { referencia: string; conteudo: string }) => {
      if (!conteudo.trim()) {
        const { error } = await supabase.from("anotacoes").delete().eq("referencia", referencia);
        if (error) throw error;
        return;
      }
      const { error } = await supabase.from("anotacoes").upsert(
        {
          user_id: user!.id,
          referencia,
          conteudo,
          atualizado_local: new Date().toISOString(),
        },
        { onConflict: "user_id,referencia" },
      );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["anotacao"] }),
  });
}

/* ---------- destaques ---------- */

export function useDestaques() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["destaques", user?.id],
    enabled: !!user,
    initialData: () => lerLocal<string[]>("destaques"),
    queryFn: async () => {
      const { data, error } = await supabase.from("destaques").select("referencia");
      if (error) throw error;
      const refs = (data ?? []).map((d) => d.referencia as string);
      gravarLocal("destaques", refs);
      return refs;
    },
  });
}

export function useAlternarDestaque() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ referencia, ativo }: { referencia: string; ativo: boolean }) => {
      if (ativo) {
        const { error } = await supabase.from("destaques").delete().eq("referencia", referencia);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("destaques").insert({ user_id: user!.id, referencia });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["destaques"] }),
  });
}

/* ---------- diário de gratidão ---------- */

export type Gratidao = { id: string; dia: string; conteudo: string };

export function useGratidao() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["gratidao", user?.id],
    enabled: !!user,
    initialData: () => lerLocal<Gratidao[]>("gratidao"),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gratidao")
        .select("id, dia, conteudo")
        .order("dia", { ascending: false })
        .limit(200);
      if (error) throw error;
      const lista = (data ?? []) as Gratidao[];
      gravarLocal("gratidao", lista);
      return lista;
    },
  });
}

export function useSalvarGratidao() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (conteudo: string) => {
      const { error } = await supabase.from("gratidao").insert({
        user_id: user!.id,
        dia: diaLocal(),
        conteudo,
        atualizado_local: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gratidao"] }),
  });
}

export function useApagarGratidao() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gratidao").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gratidao"] }),
  });
}

/* ---------- exportar dados (LGPD) ---------- */

export async function exportarMeusDados() {
  const [perfil, checkins, anotacoes, destaques, gratidao] = await Promise.all([
    supabase.from("profiles").select("*").maybeSingle(),
    supabase.from("checkins").select("*"),
    supabase.from("anotacoes").select("*"),
    supabase.from("destaques").select("*"),
    supabase.from("gratidao").select("*"),
  ]);
  return {
    exportado_em: new Date().toISOString(),
    perfil: perfil.data,
    checkins: checkins.data,
    anotacoes: anotacoes.data,
    destaques: destaques.data,
    gratidao: gratidao.data,
  };
}
