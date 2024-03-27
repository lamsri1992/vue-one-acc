<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">
                            <i class="fas fa-user-cog"></i>
                            ผู้ใช้งานระบบ
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ตั้งค่าระบบ</li>
                            <li class="breadcrumb-item active">ผู้ใช้งานระบบ</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <div class="text-right">
                            <button type="button" class="btn btn-success" @click="addModal">
                                <i class="fas fa-user-plus"></i>
                                เพิ่มผู้ใช้งาน
                            </button>
                        </div>
                        <DataTable :data="lists" :columns="columns" 
                            class="table table-striped table-borderless display"
                        >
                            <thead>
                            <tr>
                                <td width="">REF_ID</td>
                                <td width="">ชื่อผู้ใช้งาน</td>
                                <td width="">Username</td>
                                <td width="">ฝ่ายงาน / กลุ่มงาน</td>
                                <td width="">สิทธิการใช้งาน</td>
                            </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </div>
        </section>
         <!-- Modal -->
         <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserLabel">
                            <i class="fas fa-plus-circle"></i>
                            เพิ่มรายการเจ้าหนี้
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">
                                <i class="far fa-user-circle"></i>
                                ชื่อผู้ใช้งาน
                            </label>
                            <input type="text" class="form-control" v-model="create.name" placeholder="กรุณาระบุข้อมูล">
                        </div>
                        <div class="form-group">
                            <label for="">
                                <i class="far fa-id-card"></i>
                                Username
                            </label>
                            <input type="email" class="form-control" v-model="create.username" placeholder="กรุณาระบุข้อมูล">
                        </div>
                        <div class="form-group">
                            <label for="">
                                <i class="fas fa-user-shield"></i>
                                สิทธิการใช้งาน
                            </label>
                            <v-select :options="permlists" v-model="create.permission" 
                                :reduce="permlists => permlists.perm_id" 
                                label="perm_name" style="width: 100%;"
                                placeholder="กรุณาเลือกข้อมูล"
                            >
                            </v-select>
                        </div>
                        <div class="form-group">
                            <label for="">
                                <i class="fas fa-sitemap"></i>
                                ฝ่ายงาน / กลุ่มงาน
                            </label>
                            <v-select :options="deptlists" v-model="create.department" 
                                :reduce="deptlists => deptlists.dept_id" 
                                label="dept_name" style="width: 100%;"
                                placeholder="กรุณาเลือกข้อมูล"
                            >
                            </v-select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิดหน้าต่าง</button>
                        <button type="button" class="btn btn-primary"
                        @click.prevent="saveClick">
                            <i class="fas fa-save"></i>
                            เพิ่มข้อมูล
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import DataTable from 'datatables.net-vue3'
    import DataTablesCore from 'datatables.net'
    import 'datatables.net-responsive'
    import 'datatables.net-select'
    import Swal from 'sweetalert2'


    DataTable.use(DataTablesCore);

    export default {
        components:{
            DataTable
        },
        data() {
            return {
                baseURL: import.meta.env.VITE_BASE_URL,
                lists: null,
                deptlists: [],
                permlists: [],
                columns: [
                    { 'data': 'id', className: 'text-center' },
                    { 'data': 'name', className: '' },
                    { 'data': 'email', className: '' },
                    { 'data': 'dept_name', className: '' },
                    { 'data': 'perm_name', className: '' },
                ],
                create:{
                    name: '',
                    username: '',
                    permission: '',
                    department: '',
                }
            };
        },
        mounted() {
            this.getUsers(),
            this.getDepartment(),
            this.getPermission()
        },
        methods:{
            getUsers(){
                axios.get(this.baseURL + 'users')
                    .then(response => {
                    this.lists = response.data;
                })
            },
            getDepartment(){
                axios.get(this.baseURL + 'department')
                    .then(response => {
                    this.deptlists = response.data;
                })
            },
            getPermission(){
                axios.get(this.baseURL + 'permission')
                    .then(response => {
                    this.permlists = response.data;
                })
            },
            addModal() {
                var myModal = new bootstrap.Modal(document.getElementById('addUser'));
                myModal.show();
            },
            saveClick() {
                var data = this.create
                if(this.create.name === '' || this.create.username === '' || this.create.permission === '' || this.create.department === ''){
                    Swal.fire({
                        icon: 'error',
                        title: "Invalid Data",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        showCancelButton: false,
                        width: '50%'
                    })
                }else{
                    Swal.fire({
                        title: "เพิ่มผู้ใช้งานใหม่ ?",
                        showDenyButton: true,
                        confirmButtonText: "บันทึกข้อมูล",
                        denyButtonText: "ยกเลิก"
                        }).then((result) => {
                        if (result.isConfirmed) {
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
                            
                            axios.post(this.baseURL + 'users', data)
                                .then(response => {
                                Toast.fire({
                                    icon: "success",
                                    title: "เพิ่มผู้ใช้งานใหม่แล้ว",
                                });
                                    this.create = ''
                                    this.$router.push('/setting/usermanage');
                                })
                                .catch(error => {
                                    Toast.fire({
                                        icon: "error",
                                        title: "พบข้อผิดพลาด" + error
                                });
                            });     
                        }
                    });
                }    
            }
        }
    };
</script>