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
                            <li class="breadcrumb-item active">REF_ID : {{ this.view.docno }}</li>
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
                                        <input type="text" class="form-control" v-model="view.year">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>วันที่รับสินค้า</label>
                                        <div class="input-group">
                                            <VDatePicker locale="th" v-model="view.datein">
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
                                            <input type="text" class="form-control" v-model="view.docno">
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
                                            <input type="text" class="form-control" v-model="view.total">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-comments-dollar"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ประเภทหนี้</label>
                                        <v-select :options="accList" v-model="view.acctype" 
                                            :reduce="accList => accList.type_id" label="type_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>ประเภทบัญชี</label>
                                        <v-select :options="subList" v-model="view.subtype" 
                                            :reduce="subList => subList.sub_id" label="sub_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>บริษัท / เจ้าหนี้</label>
                                        <v-select :options="creditorList" v-model="view.creditor" 
                                            :reduce="creditorList => creditorList.creditor_id" label="creditor_name" style="width: 100%;">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>หมายเหตุ</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="view.note">
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
                                            <input type="text" class="form-control" v-model="view.docitem">
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
                                            <input type="text" class="form-control" v-model="view.datedue">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="far fa-calendar-check"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 text-right">
                                    <div class="btn-group">
                                        <router-link :to="{ name: 'list' }" class="btn btn-secondary">
                                            <i class="fas fa-arrow-circle-left"></i>
                                            กลับ
                                        </router-link>
                                        <button type="button" class="btn btn-danger">
                                            <i class="fas fa-times-circle"></i>
                                            ยกเลิกรายการ
                                        </button>
                                        <button type="button" class="btn btn-success" 
                                        @click.prevent="saveClick">
                                            <i class="fas fa-edit"></i>
                                            แก้ไขข้อมูล
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
    import moment from 'moment'
    import Swal from 'sweetalert2'
    
    export default {
        data() {
            return {
                baseURL: import.meta.env.VITE_BASE_URL,
                accList: [],
                subList: [],
                creditorList: [],
                view: {
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
                },
            };
        },
        mounted() {
            this.getAccType(),
            this.getSubType(),
            this.getCompany(),
            
            axios.get(this.baseURL + 'list/' + this.$route.params.id)
                .then(response => {
                this.data = response.data;
                this.view.year = response.data[0].list_year;
                this.view.datein = moment(response.data[0].list_date_in).format("DD/MM/YYYY");
                this.view.docno = response.data[0].list_doc_no;
                this.view.total = new Intl.NumberFormat().format(response.data[0].list_total);
                this.view.creditor = response.data[0].creditor_name;
                this.view.acctype = response.data[0].type_name;
                this.view.subtype = response.data[0].sub_name;
                this.view.note = response.data[0].list_note;
                this.view.docitem = response.data[0].list_doc_item;
                this.view.datedue = response.data[0].list_datedue;
                this.view.status = response.data[0].status_name;
                this.view.text = response.data[0].status_color;
                this.view.statusID = response.data[0].status_id;
                this.view.dateCancel = moment(response.data[0].list_cancel_date).format("DD/MM/YYYY");
                this.view.createDate = moment(response.data[0].list_create_date).format("DD/MM/YYYY");
            })
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
                var data = this.view
                Swal.fire({
                   title: "this Data",
                   text: JSON.stringify(data),
                   width: '50%'
               })
                // if(this.view.year === '' || this.view.datein === '' || this.view.docno === '' || this.view.total === ''
                // || this.view.acctype === '' || this.view.creditor === ''|| this.view.note === ''|| this.view.docitem === ''
                // || this.view.datedue === '' || this.view.subtype === ''){
                //     Swal.fire({
                //         icon: 'error',
                //         title: "Invalid Data",
                //         text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                //         showCancelButton: false,
                //         width: '50%'
                //     })
                // }else{
                //     Swal.fire({
                //         title: "ยืนยันบันทึกรายการใหม่ ?",
                //         showDenyButton: true,
                //         confirmButtonText: "บันทึกข้อมูล",
                //         denyButtonText: "ยกเลิก"
                //         }).then((result) => {
                //         if (result.isConfirmed) {
                //             const Toast = Swal.mixin({
                //             toast: true,
                //             position: "top-end",
                //             showConfirmButton: false,
                //             timer: 5000,
                //             timerProgressBar: true,
                //             didOpen: (toast) => {
                //                 toast.onmouseenter = Swal.stopTimer;
                //                 toast.onmouseleave = Swal.resumeTimer;
                //             }
                //             });
                            
                //             axios.post(this.baseURL + 'list', data)
                //                 .then(response => {
                //                 Toast.fire({
                //                     icon: "success",
                //                     title: "บันทึกรายการสำเร็จ",
                //                 });
                //                     this.$router.push('/list');
                //                 })
                //                 .catch(error => {
                //                     Toast.fire({
                //                         icon: "error",
                //                         title: "พบข้อผิดพลาด" + error
                //                 });
                //             });     
                //         }
                //     });
                // }
            }
        }
    };
</script>