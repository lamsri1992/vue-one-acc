<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">
                            ข้อมูลฝ่าย - กลุ่มงาน
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ตั้งค่าระบบ</li>
                            <li class="breadcrumb-item active">ข้อมูลฝ่าย - กลุ่มงาน</li>
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
                                <i class="fas fa-plus-circle"></i>
                                เพิ่มกลุ่มงาน
                            </button>
                        </div>
                        <DataTable :data="deptlists" :columns="columns" 
                            class="table table-striped table-borderless display"
                        >
                            <thead>
                            <tr>
                                <td width="10%">REF_ID</td>
                                <td width="">ชื่อกลุ่มงาน - ฝ่าย</td>
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
                            เพิ่มรายการกลุ่มงาน
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">ชื่อกลุ่มงาน</label>
                            <input type="text" class="form-control" v-model="create.department" placeholder="กรุณาระบุข้อมูล">
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
                columns: [
                    { 'data': 'dept_id', className: 'text-center' },
                    { 'data': 'dept_name', className: '' },
                ],
                create:{
                    department: '',
                }
            };
        },
        mounted() {
            this.getDepartment()
        },
        methods:{
            getDepartment(){
                axios.get(this.baseURL + 'department')
                    .then(response => {
                    this.deptlists = response.data;
                })
            },
            addModal() {
                var myModal = new bootstrap.Modal(document.getElementById('addUser'));
                myModal.show();
            },
            saveClick() {
                var data = this.create
                if(this.create.department === ''){
                    Swal.fire({
                        icon: 'error',
                        title: "Invalid Data",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        showCancelButton: false,
                        width: '50%'
                    })
                }else{
                    Swal.fire({
                        title: "เพิ่มกลุ่มงานใหม่ ?",
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
                            
                            axios.post(this.baseURL + 'department', data)
                                .then(response => {
                                Toast.fire({
                                    icon: "success",
                                    title: "เพิ่มกลุ่มงานใหม่แล้ว",
                                });
                                    this.create = ''
                                    // this.$router.push('/setting/department');
                                    this.$router.replace({ path: '/setting/department' }).catch(() => {});
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