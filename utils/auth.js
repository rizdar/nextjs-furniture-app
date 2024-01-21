import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const supabase = createClientComponentClient();

export const getUserSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};

export const login = async (email, password) => {
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return res;
};

export const register = async (values) => {
  const res = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        nama: values.nama,
        nohp: values.nohp,
      },
      emailRedirectTo: `${location.origin}/callback`,
    },
  });

  return res;
};

export const logout = async () => {
  await supabase.auth.signOut();
};
