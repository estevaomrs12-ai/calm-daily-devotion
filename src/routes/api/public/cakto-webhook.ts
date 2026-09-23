import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";
import { z } from "zod";

const Corpo = z.object({
  secret: z.string().optional(),
  event: z.string(),
  data: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
      status: z.string().optional(),
      customer: z.object({ email: z.string().email() }).passthrough().optional(),
    })
    .passthrough(),
});

const LIBERA = ["purchase_approved"];
const BLOQUEIA = ["refund", "chargeback", "subscription_canceled", "purchase_refused"];

function igual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const Route = createFileRoute("/api/public/cakto-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const esperado = process.env["CAKTO_WEBHOOK_SECRET"];
        if (!esperado) return new Response("Not configured", { status: 503 });

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return new Response("Bad request", { status: 400 });
        }
        const r = Corpo.safeParse(json);
        if (!r.success) return new Response("Bad request", { status: 400 });
        const { secret, event, data } = r.data;
        const informado = secret ?? request.headers.get("x-cakto-secret") ?? "";
        if (!igual(informado, esperado)) return new Response("Unauthorized", { status: 401 });

        const email = data.customer?.email?.toLowerCase();
        if (!email) return new Response("ok");
        const pago = LIBERA.includes(event) ? true : BLOQUEIA.includes(event) ? false : null;
        if (pago === null) return new Response("ignored");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("compras" as never).upsert(
          {
            email,
            pedido: data.id != null ? String(data.id) : null,
            status: pago ? "pago" : "cancelado",
            evento: event,
            updated_at: new Date().toISOString(),
          } as never,
          { onConflict: "email" },
        );
        await (supabaseAdmin.rpc as unknown as (f: string, a: object) => Promise<unknown>)(
          "aplicar_compra",
          { _email: email, _pago: pago },
        );
        return new Response("ok");
      },
    },
  },
});
