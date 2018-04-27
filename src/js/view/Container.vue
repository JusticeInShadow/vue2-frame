<template>
    <el-container direction="vertical">
        <MainHeader father-component="app"></MainHeader>
        <el-container class="layout">
            <el-main class="main-container">
                <router-view></router-view>
            </el-main>
            <MainAside father-component="app"></MainAside>
        </el-container>
    </el-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import MainHeader from "./MainHeader";
    import MainAside from "./MainAside";

    export default {
        name: "Container",
        components: {
            MainHeader,
            MainAside
        },
        data(){
            return {

            }
        },
        computed: {

        },
        methods:{
        },
        created:function () {

        }
    }
</script>

<style>
    .main-container {
        background: #ffffff;
        border-right: 1px solid #dedede;
        position: relative;
        padding: 0;
    }
</style>