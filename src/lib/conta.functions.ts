import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Direito do titular (LGPD): apagar a conta e todos os dados vinculados. */
export const excluirConta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    await supabaseAdmin.from("gratidao").delete().eq("user_id", userId);
    await supabaseAdmin.from("anotacoes").delete().eq("user_id", userId);
    await supabaseAdmin.from("destaques").delete().eq("user_id", userId);
    await supabaseAdmin.from("checkins").delete().eq("user_id", userId);
    await supabaseAdmin.from("profiles").delete().eq("id", userId);

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);

    return { ok: true };
  });
