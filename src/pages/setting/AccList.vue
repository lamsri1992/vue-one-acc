<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">ข้อมูลประเภทหนี้</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">ตั้งค่าระบบ</li>
                            <li class="breadcrumb-item active">ข้อมูลประเภทหนี้</li>
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
                                <td width="40%">รหัสเจ้าหนี้</td>
                                <td width="50%">ชื่อเจ้าหนี้</td>
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
                    { 'data': 'type_id', className: 'text-center' },
                    { 'data': 'type_code', className: 'text-center' },
                    { 'data': 'type_name', className: 'text-left' },
                ],
            };
        },
        mounted() {
            this.getAccLists()
        },
        methods:{
            getAccLists(){
                axios.get(this.baseURL + 'acc_type')
                    .then(response => {
                    this.lists = response.data;
                })
            }
        }
    };
</script>