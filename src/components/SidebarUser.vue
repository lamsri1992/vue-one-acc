<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <div class="text-center">
            <a href="#" class="brand-link">
                <img src="../../dist/img/logo_cmh.png" alt="CMPHO Logo" class="brand-image img-circle elevation-3"
                    style="opacity: .8">
                <span class="brand-text font-weight-light">One Accounting</span>
            </a>
        </div>
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                    <li class="nav-header"><small class="text-muted">สิทธิผู้ใช้งานทั่วไป</small></li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'dashboard' }" class="nav-link">
                            <i class="nav-icon fas fa-th-large"></i>
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'list' }" class="nav-link">
                            <i class="nav-icon far fa-clipboard"></i>
                            ข้อมูลจัดซื้อ - จัดจ้าง
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'list' }" class="nav-link">
                            <i class="nav-icon fas fa-print"></i>
                            ระบบรายงานข้อมูล
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>