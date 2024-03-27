<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">ข้อมูลจัดซื้อ - จัดจ้าง</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ข้อมูลจัดซื้อ - จัดจ้าง</li>
                            <li class="breadcrumb-item active">บันทึกข้อมูลจัดซื้อ - จัดจ้าง</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ปีงบประมาณ</label>
                                        <input type="text" class="form-control" v-model="create.year">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>วันที่รับสินค้า</label>
                                        <div class="input-group">
                                            <VDatePicker locale="th" v-model="create.datein">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <input type="text" class="form-control" 
                                                    :value="inputValue" v-on="inputEvents">
                                                </template>
                                            </VDatePicker>
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="far fa-calendar-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ทะเบียนใบสั่งซื้อ - สั่งจ้าง</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="create.docno">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="far fa-clipboard"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ยอดหนี้</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="create.total">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-comments-dollar"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ประเภทหนี้</label>
                                        <v-select :options="accList" v-model="create.acctype" 
                                            :reduce="accList => accList.type_id" label="type_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ประเภทบัญชี</label>
                                        <v-select :options="subList" v-model="create.subtype" 
                                            :reduce="subList => subList.sub_id" label="sub_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>บริษัท / เจ้าหนี้</label>
                                        <v-select :options="creditorList" v-model="create.creditor" 
                                            :reduce="creditorList => creditorList.creditor_id" label="creditor_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>หมายเหตุ</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="create.note">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-pen"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>เลขที่ใบส่งของ</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="create.docitem">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-shopping-cart"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>กำหนดชำระ (จำนวนวัน)</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="create.datedue">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="far fa-calendar-check"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" hidden>
                                    <div class="form-group">
                                        <label>Department ID</label>
                                        <div class="input-group">
                                            <input id="creator" type="text" class="form-control">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-pen"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group text-right">
                                        <button class="btn btn-success" 
                                        @click.prevent="saveClick">
                                            <i class="fas fa-plus-circle"></i>
                                            บันทึกข้อมูลจัดซื้อ - จัดจ้าง
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import { useAuthStore } from "@/stores/auth";

    export default {
        data() {
            return {
                baseURL: import.meta.env.VITE_BASE_URL,
                accList: [],
                subList: [],
                creditorList: [],
                create: {
                    year: '',
                    datein: '',
                    docno: '',
                    total: '',
                    acctype: '',
                    subtype: '',
                    creditor: '',
                    note: '',
                    docitem: '',
                    datedue: '',
                    creator: '',
                    department: '',
                },
            };
        },
        mounted() {
            this.getAccType(),
            this.getSubType(),
            this.getCompany()
        },
        methods:{
            getAccType(){
                axios.get(this.baseURL + 'acc_type')
                    .then(response => {
                    this.accList = response.data;
                })
            },
            getSubType(){
                axios.get(this.baseURL + 'sub_type')
                    .then(response => {
                    this.subList = response.data;
                })
            },
            getCompany(){
                axios.get(this.baseURL + 'creditor')
                    .then(response => {
                    this.creditorList = response.data;
                })
            },
            saveClick () {
                const store = useAuthStore()
                this.create.creator = store.user.id;
                this.create.department = store.user.department;
                var data = this.create

                // console.log(JSON.stringify(data))

                if(this.create.year === '' || this.create.datein === '' || this.create.docno === '' || this.create.total === ''
                || this.create.acctype === '' || this.create.creditor === ''|| this.create.note === ''|| this.create.docitem === ''
                || this.create.datedue === '' || this.create.subtype === ''){
                    Swal.fire({
                        icon: 'error',
                        title: "Invalid Data",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        showCancelButton: false,
                        width: '50%'
                    })
                }else{
                    Swal.fire({
                        title: "ยืนยันบันทึกรายการใหม่ ?",
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
                            
                            axios.post(this.baseURL + 'list', data)
                                .then(response => {
                                Toast.fire({
                                    icon: "success",
                                    title: "บันทึกรายการสำเร็จ",
                                });
                                    this.$router.push('/list');
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