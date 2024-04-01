<!-- <template>
    <Navbar></Navbar>
    <router-view></router-view>
    <Sidebar></Sidebar>
    <Footer></Footer>
</template>

<script>
    import Navbar from './components/Navbar.vue';
    import Sidebar from './components/Sidebar.vue';
    import Footer from './components/Footer.vue';

    export default {
        components:{
            Navbar,
            Sidebar,
            Footer
        }
    };
</script>

<style scoped>

</style> -->

<template>
  <keep-alive>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </keep-alive>
</template>

<script>
import { useRoute } from "vue-router";
import DefaultLayout from "../src/components/layouts/DefaultLayout.vue";
import LoginLayout from "../src/components/layouts/LoginLayout.vue";
import { useAuthStore } from "./stores/auth";
import { ref, computed } from "vue";

export default {
  name:'App',
  components: {
    DefaultLayout,
    LoginLayout
  },
  setup() {
    const route = useRoute();
    const authstore = useAuthStore();

    const layout = computed(() => {
      return route.path === "/login" ? "LoginLayout" : "DefaultLayout";
    });

    return {
      authstore,
      layout
    }
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      // isLoggedIn.value = computed(() => !!localStorage.getItem("user"));
      //  loginStatus.setIsLogIn(true)
      this.authstore.user = JSON.parse(localStorage.getItem("user"));
    }
  },
};

/*
export default {
  name: "App",
  components: {
    DefaultLayout,
    LoginLayout
  },
  computed: {
    layout() {
      return this.$route.path === '/login' ? 'LoginLayout' : 'DefaultLayout';
    },
  },
  mounted(){
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("isLoggedIn"));
    if(localStorage.getItem("user")){

    }
  }
};

*/
</script>

<style></style>
