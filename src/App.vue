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
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import DefaultLayout from "../src/components/layouts/DefaultLayout.vue";
import LoginLayout from "../src/components/layouts/LoginLayout.vue";

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
  }
};
</script>

<style>

</style>
