<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
  import Navbar from '../Navbar.vue';
  import Sidebar from '../Sidebar.vue';
  import Footer from '../Footer.vue';
  import { onMounted } from 'vue';
  import { userStore } from '../../stores/user'

  const store = userStore()

  onMounted(() => {
    if (localStorage.getItem("user")) {
      store.setUser()
    }
  })
</script>

<style scoped>

</style>