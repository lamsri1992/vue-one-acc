<template>
    <aside class="main-sidebar sidebar-dark-success elevation-4">
        <div class="text-center">
            <a href="#" class="brand-link">
                <img src="/dist/img/logo_cmh.png" alt="CMPHO Logo" class="brand-image img-circle elevation-3"
                    style="opacity: .8">
                <span class="brand-text font-weight-light">One Accounting</span>
            </a>
        </div>
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                    <li class="nav-header"><small class="text-muted">สิทธิผู้ดูแลระบบ</small></li>
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
                        <router-link :to="{ name: 'listFinance' }" class="nav-link">
                            <i class="nav-icon fas fa-spinner fa-spin"></i>
                            รายการรอดำเนินการ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-cog"></i>
                            <p>
                                ตั้งค่าระบบ
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link :to="{ name: 'department' }" class="nav-link">
                                    <i class="nav-icon fas fa-sitemap"></i>
                                    ข้อมูลฝ่าย - กลุ่มงาน
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'usermanage' }" class="nav-link">
                                    <i class="nav-icon fas fa-user-cog"></i>
                                    ผู้ใช้งานระบบ
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'creditorlist' }" class="nav-link">
                                    <i class="nav-icon fas fa-building"></i>
                                    ข้อมูลบริษัท (เจ้าหนี้)
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'acclist' }" class="nav-link">
                                    <i class="nav-icon fas fa-list"></i>
                                    ข้อมูลประเภทหนี้
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'sublist' }" class="nav-link">
                                    <i class="nav-icon fas fa-file-invoice"></i>
                                    ข้อมูลบัญชีหนี้
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-book"></i>
                            คู่มือการใช้งาน
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>