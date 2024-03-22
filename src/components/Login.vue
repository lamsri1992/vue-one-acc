<template>
    <body class="hold-transition login-page">
        <div class="login-box">
            <div class="card card-outline card-success">
                <div class="card-header text-center">
                    <img src="../../public/dist/img/logo_cmh.png" class="img img-fluid" width="50%">
                    <p class="h5">One Accounting <br> ระบบริหารจัดการข้อมูลบัญชีหนี้</p>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">กรุณาลงชื่อเพื่อเข้าใช้งานระบบ</p>
                    <form @submit.prevent="handleSubmit">
                        <div class="input-group mb-3">
                            <input type="email" 
                            :class="{ 'is-invalid': errors.email && errors.email[0] }"
                            class="form-control" id="email" v-model="form.email"
                            placeholder="Email ผู้ใช้งาน">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                            <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                                {{ errors.email && errors.email[0] }}
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" 
                            :class="{ 'is-invalid': errors.password && errors.password[0] }" 
                            class="form-control" id="password" v-model="form.password"
                            placeholder="รหัสผ่าน">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-success btn-block">
                                    <i class="fas fa-sign-in-alt"></i>
                                    เข้าใช้งานระบบ
                                </button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 1rem;">
                            <div class="col-12 text-center text-muted" style="font-size: 14px;;">
                                <p>กลุ่มงานดิจิทัลทางการแพทย์ <br> สำนักงานสาธารณสุขจังหวัดเชียงใหม่</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
    import { reactive } from "vue"
    import { storeToRefs } from "pinia"
    import { useRouter } from "vue-router"
    import { useAuthStore } from "../stores/auth"
    import Swal from 'sweetalert2'


    const router = useRouter()
    const store = useAuthStore()
    const { isLoggedIn, errors } = storeToRefs(store)
    const { handleLogin } = store

    const form = reactive({
        email: '',
        password: '' 
    })

    const handleSubmit = async () => {
        await handleLogin(form)
        if (isLoggedIn.value) {
            router.push({ name: 'dashboard' })
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ"
            });
        }
    }
</script>