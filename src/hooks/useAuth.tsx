import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Contexto = {
  user: User | null;
  session: Session | null;
  carregando: boolean;
  sair: () => Promise<void>;
};

const AuthContext = createContext<Contexto>({
  user: null,
  session: null,
  carregando: true,
  sair: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_evento, nova) => {
      setSession(nova);
      setCarregando(false);
    });
    supabase.auth.getSession().then(({ data: atual }) => {
      setSession(atual.session);
      setCarregando(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        carregando,
        sair: async () => {
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
