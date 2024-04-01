<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3>{{ this.total }} <sup>บาท</sup></h3>
                                <p>ยอดเจ้าหนี้ทั้งหมด</p>
                            </div>
                            <div class="icon">
                                <i class="fas fa-list"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3>{{ this.paid }} <sup>บาท</sup></h3>
                                <p>หนี้ที่ชำระแล้ว</p>
                            </div>
                            <div class="icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3>{{ this.wait }} <sup>บาท</sup></h3>
                                <p>หนี้ค้างชำระ</p>
                            </div>
                            <div class="icon">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
        return {
            baseURL: import.meta.env.VITE_BASE_URL,
            total: '',
            wait: '',
            paid: '',
        };
        },
        mounted() {
             axios.get(this.baseURL + 'data',{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")||null}`
                }
            }).then(response => {
                this.data = response.data;
                this.total = new Intl.NumberFormat().format(response.data[0].total);
                this.wait = new Intl.NumberFormat().format(response.data[0].wait);
                this.paid = new Intl.NumberFormat().format(response.data[0].paid);
            })
        }
    };
</script>