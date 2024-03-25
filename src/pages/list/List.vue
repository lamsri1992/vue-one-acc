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
                            <li class="breadcrumb-item active">ข้อมูลจัดซื้อ - จัดจ้าง</li>
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
                            <router-link class="btn btn-success" :to="{ name: 'listCreate' }">
                                <i class="fas fa-plus-circle"></i>
                                บันทึกข้อมูลจัดซื้อ - จัดจ้าง
                            </router-link>
                        </div>
                        <DataTable :data="lists" :columns="columns" 
                            class="table table-striped table-borderless display nowrap"
                            :options="
                            {
                                responsive:true, 
                                autoWidth:true, 
                                scrollX: true
                            }" 
                        >
                            <thead>
                            <tr>
                                <td>วันที่รับสินค้า</td>
                                <td>ครบกำหนด</td>
                                <td class="text-center">ปีงบ</td>
                                <td>ประเภทหนี้</td>
                                <td>เจ้าหนี้</td>
                                <td>เลขที่ใบสั่งซื้อ</td>
                                <td>ยอด</td>
                                <td>สถานะ</td>
                                <td class="text-center"><i class="fas fa-bars"></i></td>
                            </tr>
                            </thead>
                        </DataTable>
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
    import DataTable from 'datatables.net-vue3'
    import DataTablesCore from 'datatables.net'
    import 'datatables.net-responsive'
    import 'datatables.net-select'

    DataTable.use(DataTablesCore);

    export default {
        components:{
            DataTable
        },
        data() {
            return {
                baseURL: import.meta.env.VITE_BASE_URL,
                lists: null,
                columns: [
                    { 'data': 'list_date_in',
                    render: function(data){
                            return moment(data).format("DD/MM/YYYY");
                        }
                    },
                    { 'data': 'limit_date',
                    render: function(data){
                            return moment(data).format("DD/MM/YYYY");
                        }
                    },
                    { 'data': 'list_year', className: 'text-center' },
                    { 'data': 'type_name' },
                    { 'data': 'creditor_name' },
                    { 'data': 'list_doc_no' },
                    { 'data': 'list_total', 
                    render: function(data){
                        return new Intl.NumberFormat().format(data);
                    }
                    },
                    { 'data': 'list_status', className: 'text-center',
                    render: function (data) {
                        if (data === "1") {
                            return '<span style="font-weight:bold;" class="badge badge-danger">รอตอบรับ</span>';
                        }
                        if (data === "2") {
                            return '<span style="font-weight:bold;" class="badge badge-primary">ตอบรับแล้ว</span>';
                        }
                        if (data === "3") {
                            return '<span style="font-weight:bold;" class="badge badge-success">ชำระเสร็จสิ้น</span>';
                        }
                        if (data === "4") {
                            return '<span style="font-weight:bold;" class="badge badge-warning">ยกเลิก</span>';
                        }
                    }
                    },
                    { 'data': 'list_hash',
                    render: function (data) 
                    { 
                        return '<a href="list/'+ data +'" class="btn btn-sm btn-default"><i class="fas fa-search"></i> รายละเอียด</a>';

                    } 
                    },
                ],
            };
        },
        mounted() {
            this.getLists()
        },
        methods:{
            getLists(){
                axios.get(this.baseURL + 'list')
                    .then(response => {
                    this.lists = response.data;
                })
            }
        }
    };
</script>