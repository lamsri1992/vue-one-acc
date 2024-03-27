<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">ระบบรายงานข้อมูล</h1>
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
                        <h1>Hello World</h1>
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

            };
        },
        mounted() {
            
        },
        methods:{

        }
    };
</script>