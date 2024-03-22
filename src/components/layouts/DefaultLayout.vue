<template>
    <Navbar></Navbar>
    <!-- <router-view></router-view> -->
    <slot/>
    <Sidebar></Sidebar>
    <Footer></Footer>
</template>

<script setup>
    import Navbar from '../Navbar.vue';
    import Sidebar from '../Sidebar.vue';
    import Footer from '../Footer.vue';
</script>

<style scoped>

</style>