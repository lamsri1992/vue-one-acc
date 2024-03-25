<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">ข้อมูลบัญชีหนี้</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ตั้งค่าระบบ</li>
                            <li class="breadcrumb-item active">ข้อมูลบัญชีหนี้</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <DataTable :data="lists" :columns="columns" 
                            class="table table-striped table-borderless display"
                        >
                            <thead>
                            <tr>
                                <td width="10%">REF_ID</td>
                                <td width="20%">รหัสบัญชีหนี้</td>
                                <td width="30%">ชื่อบัญชีหนี้</td>
                                <td width="30%">กลุ่มประเภทหนี้</td>
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
                    { 'data': 'sub_id', className: 'text-center' },
                    { 'data': 'sub_code', className: 'text-center' },
                    { 'data': 'sub_name', className: 'text-left' },
                    { 'data': 'type_name', className: 'text-left' },
                ],
            };
        },
        mounted() {
            this.getAccLists()
        },
        methods:{
            getAccLists(){
                axios.get(this.baseURL + 'sub_type')
                    .then(response => {
                    this.lists = response.data;
                })
            }
        }
    };
</script>