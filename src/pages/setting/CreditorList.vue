<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">ข้อมูลเจ้าหนี้</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ตั้งค่าระบบ</li>
                            <li class="breadcrumb-item active">ข้อมูลเจ้าหนี้</li>
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
                                เพิ่มรายการเจ้าหนี้
                            </button>
                        </div>
                        <DataTable :data="lists" :columns="columns"
                            class="table table-striped table-borderless display">
                            <thead>
                                <tr>
                                    <td width="5%">REF_ID</td>
                                    <td width="30%">ชื่อบริษัท / เจ้าหนี้</td>
                                    <td width="15%">รหัสผู้เสียภาษี</td>
                                    <td width="35%">ที่อยู่</td>
                                    <td width="15%">เบอร์โทร</td>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </div>
        </section>
        <!-- Modal -->
        <div class="modal fade" id="addCreditor" tabindex="-1" aria-labelledby="addCreditorLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCreditorLabel">
                            <i class="fas fa-plus-circle"></i>
                            เพิ่มรายการเจ้าหนี้
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">ชื่อบริษัท / เจ้าหนี้</label>
                            <input type="text" class="form-control" v-model="create.creditor_name">
                        </div>
                        <div class="form-group">
                            <label for="">รหัสผู้เสียภาษี</label>
                            <input type="text" class="form-control" v-model="create.creditor_code">
                        </div>
                        <div class="form-group">
                            <label for="">ที่อยู่</label>
                            <input type="text" class="form-control" v-model="create.creditor_address">
                        </div>
                        <div class="form-group">
                            <label for="">เบอร์โทร</label>
                            <input type="text" class="form-control" v-model="create.creditor_tel">
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
        components: {
            DataTable
        },
        data() {
            return {
                baseURL: import.meta.env.VITE_BASE_URL,
                lists: null,
                columns: [
                    {
                        'data': 'creditor_id',
                        className: 'text-center'
                    },
                    {
                        'data': 'creditor_name',
                        className: 'text-left'
                    },
                    {
                        'data': 'creditor_code',
                        className: 'text-left'
                    },
                    {
                        'data': 'creditor_address',
                        className: 'text-left'
                    },
                    {
                        'data': 'creditor_tel',
                        className: 'text-left'
                    },
                ],
                create:{
                    creditor_name: '',
                    creditor_code: '',
                    creditor_address: '',
                    creditor_tel:'',
                }
            };
        },
        mounted() {
            this.getAccLists()
        },
        methods: {
            getAccLists() {
                axios.get(this.baseURL + 'creditor')
                    .then(response => {
                        this.lists = response.data;
                    })
            },
            addModal() {
                var myModal = new bootstrap.Modal(document.getElementById('addCreditor'));
                myModal.show();
            },
            saveClick () {
                var data = this.create
                if( this.create.creditor_name === '' || 
                    this.create.creditor_code === '' ||
                    this.create.creditor_address === '' ||
                    this.create.creditor_tel === '')
                {
                    Swal.fire({
                        icon: 'error',
                        title: "Invalid Data",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        showCancelButton: false,
                        width: '50%'
                    })
                }else{
                    Swal.fire({
                        title: "ยืนยันบันทึกรายการเจ้าหนี้ใหม่ ?",
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
                            
                            axios.post(this.baseURL + 'creditor', data)
                                .then(response => {
                                Toast.fire({
                                    icon: "success",
                                    title: "เพิ่มเจ้าหนี้ใหม่แล้ว , " + this.create.creditor_name,
                                });
                                    this.create = ''
                                    this.$router.push('/setting/creditorlist');
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