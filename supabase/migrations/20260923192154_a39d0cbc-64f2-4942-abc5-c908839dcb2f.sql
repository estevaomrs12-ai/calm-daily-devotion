ALTER TABLE public.profiles ALTER COLUMN ativo SET DEFAULT false;

-- Usuários não podem mudar a própria liberação
REVOKE INSERT, UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (nome, timezone, consent_sensivel, consent_em, plano_slug, plano_inicio) ON public.profiles TO authenticated;

CREATE TABLE public.compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  pedido TEXT,
  status TEXT NOT NULL,
  evento TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.compras TO service_role;
ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, ativo) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.raw_user_meta_data->>'full_name'),
    EXISTS (SELECT 1 FROM public.compras c WHERE lower(c.email) = lower(NEW.email) AND c.status = 'pago')
  ) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;