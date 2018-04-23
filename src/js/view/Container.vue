<template>
    <el-container direction="vertical">
        <MainHeader father-component="app"></MainHeader>
        <el-container class="layout main-container">
            <el-main>
                <router-view></router-view>
                <button @click="changeTitle">修改标签</button>
            </el-main>
            <el-aside width="200px">Aside</el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {getAxios} from "../utils/AjaxUtils";
    import MainHeader from "./MainHeader";
    export default {
        name: "Container",
        components: {
            MainHeader
        },
        data(){
            return {

            }
        },
        computed: mapState({
            app:state=>state.app,
        }),
        methods:{
            ...mapActions([
                "appChange",
            ]),
            changeTitle(){
                this.appChange(`你要叫我来呀，哪个犊子不愿意来啊`);
            }
        },
        created: async function () {
            // `this` 指向 vm 实例
            let spead = {a:1,b:2,c:3};
            let newSpead = {...spead};
            try {
                // let user = await getAxios("/user");
            }catch(e){
                console.error(e)
            }
            console.log(this)
        }
    }
</script>

<style>
    .el-aside {
        background:#dedede
    }

    .main-container {
        background: #ffffff;
    }
</style>