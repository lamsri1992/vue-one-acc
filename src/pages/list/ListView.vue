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
                            <li class="breadcrumb-item active">REF_ID : {{ view.docno }}</li>
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
                            </div>
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <span class="badge badge-dark">
                                        <i class="fas fa-user-edit"></i>
                                        ผู้สร้างรายการ : {{ view.creator + " (" + view.department + ")" }}
                                    </span>
                                </div>
                            </div>
                            <div class="row" v-if="view.statusID == 1">
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
                            <div class="row">
                                <div class="col-md-12 text-center" v-if="view.statusID == 2">
                                    <div class="alert alert-danger" role="alert">
                                        <i class="fas fa-calendar-check"></i>
                                        รายการถูกเจ้าหน้าที่การเงินตอบรับแล้ว <br>
                                        วันที่ : {{ view.finView }}
                                    </div>
                                    <router-link :to="{ name: 'list' }" class="btn btn-secondary">
                                        <i class="fas fa-arrow-circle-left"></i>
                                        กลับ
                                    </router-link>
                                </div>
                                <div class="col-md-12 text-center" v-if="view.statusID == 3">
                                    <div class="alert alert-success" role="alert">
                                        <h4 class="alert-heading">
                                            <i class="fas fa-check-circle"></i>
                                            ชำระหนี้เสร็จสิ้น
                                        </h4>
                                        <hr>
                                        <button class="btn btn-light btn-sm" type="button" data-toggle="collapse" 
                                            data-target="#paidList" aria-expanded="false" aria-controls="paidList">
                                            <i class="far fa-clipboard"></i>
                                            รายละเอียดการชำระหนี้
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <div class="col-md-12 collapse" id="paidList">
                                <div class="card card-body">
                                    <table class="table table-borderless table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>เลขที่บิล</th>
                                                <th>ยอดจ่าย</th>
                                                <th>เลขเช็ค</th>
                                                <th>งบกองทุน</th>
                                                <th>ผู้ดำเนินการ</th>
                                                <th>วันที่จ่าย</th>
                                                <th>กำหนดชำระ</th>
                                                <th><i class="fas fa-bars"></i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(res, index) in finance" :key="index">
                                                <td>{{ res.fin_bill }}</td>
                                                <td>{{ formatSalary(res.fin_paid_total) }}</td>
                                                <td>{{ res.fin_check_number }}</td>
                                                <td>{{ res.bud_name }}</td>
                                                <td>{{ res.name }}</td>
                                                <td>{{ formatJoinDate(res.fin_paid_date) }}</td>
                                                <td>{{ formatJoinDate(res.limit_date) }}</td>
                                                <td>
                                                    <span v-if="res.fin_paid_date < res.limit_date"
                                                        class="badge badge-success">
                                                        <i class="fas fa-check-circle"></i>
                                                        ตามกำหนด
                                                    </span>
                                                    <span v-else 
                                                        class="badge badge-danger">
                                                        <i class="fas fa-times-circle"></i>
                                                        เกินกำหนด
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
                finance: null,
                view: {
                    id: '',
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
                    finView: '',
                    creator: '',
                    department: '',
                },
            };
        },
        mounted() {
            this.getAccType()
            this.getSubType()
            this.getCompany()
            
            axios.get(this.baseURL + 'list/' + this.$route.params.id)
                .then(response => {
                this.data = response.data;
                this.view.id = response.data[0].list_id;
                this.view.year = response.data[0].list_year;
                this.view.datein = response.data[0].list_date_in;
                this.view.docno = response.data[0].list_doc_no;
                this.view.total = new Intl.NumberFormat().format(response.data[0].list_total);
                this.view.creditor = response.data[0].creditor_id;
                this.view.acctype = response.data[0].type_id;
                this.view.subtype = response.data[0].sub_id;
                this.view.note = response.data[0].list_note;
                this.view.docitem = response.data[0].list_doc_item;
                this.view.datedue = response.data[0].list_datedue;
                this.view.status = response.data[0].status_name;
                this.view.text = response.data[0].status_color;
                this.view.statusID = response.data[0].status_id;
                this.view.dateCancel = moment(response.data[0].list_cancel_date).format("DD/MM/YYYY");
                this.view.createDate = moment(response.data[0].list_create_date).format("DD/MM/YYYY");
                this.view.finView = moment(response.data[0].list_finance_view).format("DD/MM/YYYY");
                this.view.creator = response.data[0].name;
                this.view.department = response.data[0].dept_name;

                if(this.view.statusID == 3){
                    axios.get(this.baseURL + 'listFinance/' + this.$route.params.id)
                        .then(response => {
                        this.finance = response.data;
                    })
                }
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
                if(this.view.year === '' || this.view.datein === '' || this.view.docno === '' || this.view.total === ''
                || this.view.acctype === '' || this.view.creditor === ''|| this.view.note === ''|| this.view.docitem === ''
                || this.view.datedue === '' || this.view.subtype === ''){
                    Swal.fire({
                        icon: 'error',
                        title: "Invalid Data",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        showCancelButton: false,
                        width: '50%'
                    })
                }else{
                    Swal.fire({
                        title: "ยืนยันแก้ไขรายการ ?",
                        showDenyButton: true,
                        confirmButtonText: "แก้ไขข้อมูล",
                        denyButtonText: "ยกเลิก"
                        }).then((result) => {
                        if (result.isConfirmed) {
                            const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                            });
                            
                            axios.put(this.baseURL + 'list/' + this.view.id, data, {
                                withCredentials: true
                            })
                            .then(response => {
                                Toast.fire({
                                    icon: "success",
                                    title: "แก้ไขรายการสำเร็จ",
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
            },
            formatJoinDate(date) {
                return moment(date).format("DD/MM/YYYY");
            },
            formatSalary(salary) {
                return new Intl.NumberFormat().format(salary);
            }
        }
    };
</script>