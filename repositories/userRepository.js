import supabase from "@/lib/supabaseClient";

export const userRepoistory = {
  // ✅ Login
  async loginUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    console.log(data);
    return data;
  },

  // ✅ Logout
  async logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
};
