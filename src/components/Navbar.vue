<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          สวัสดีคุณ , {{ store.user }}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
          <a href="#" class="dropdown-item" @click.prevent="logout">ออกจากระบบ</a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth";

  const router = useRouter()
  const store = useAuthStore()
  const isOpen = ref(false)

  const logout = async () => {
      await store.handleLogout()
      isOpen.value = false
      router.push({ name: 'login' })
  }

  const toggle = () => isOpen.value = !isOpen.value

  const toggleClass = computed(() => isOpen.value === true ? 'show' : '')
</script>
