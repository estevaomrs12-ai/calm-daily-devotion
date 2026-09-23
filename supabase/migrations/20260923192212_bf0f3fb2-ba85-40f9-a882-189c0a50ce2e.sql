CREATE OR REPLACE FUNCTION public.aplicar_compra(_email TEXT, _pago BOOLEAN) RETURNS VOID LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.profiles p SET ativo = _pago
  FROM auth.users u WHERE u.id = p.id AND lower(u.email) = lower(_email);
$$;
REVOKE ALL ON FUNCTION public.aplicar_compra(TEXT, BOOLEAN) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.aplicar_compra(TEXT, BOOLEAN) TO service_role;