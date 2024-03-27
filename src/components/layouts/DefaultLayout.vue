<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <Sidebar v-if="store.user?.permission_id == 1"></Sidebar>
    <SidebarUser v-if="store.user?.permission_id == 2"></SidebarUser>
    <SidebarFinance v-if="store.user?.permission_id == 3"></SidebarFinance>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script setup>
  import Navbar from '../Navbar.vue';
  import Sidebar from '../Sidebar.vue';
  import SidebarUser from '../SidebarUser.vue';
  import SidebarFinance from '../SidebarFinance.vue';
  import Footer from '../Footer.vue';
  import { useAuthStore } from '../../stores/auth';

  const store = useAuthStore()

</script>

<style scoped>

</style>