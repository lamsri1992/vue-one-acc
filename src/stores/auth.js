import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({});

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    // await csrfCookie();
    try {
      const res = await login(credentials);

      if (res.data.status == 'success') {
        user.value = res.data.user
        localStorage.setItem("token", res.data.authorisation.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("isLoggedIn",true)
      }

      console.log("user", user);
      //   await fetchUser();
      errors.value = {};
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser) => {
    try {
      await register(newUser);
      await handleLogin({
        email: newUser.email,
        password: newUser.password,
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    console.log("logout");
    await logout();
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.setItem("isLoggedIn",false)
    user.value = null;
  };

  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,

  };
});