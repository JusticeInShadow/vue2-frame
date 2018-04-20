<template>
    <el-header height="48px">
        hello world!
        {{common.user.username}}
    </el-header>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {getAxios} from "../utils/AjaxUtils";
    export default {
        name: "MainHeader",
        computed: {
            ...mapState([
                "common"
            ])
        },
        methods:{
            ...mapActions([
                "userInfoChange",
            ])
        },
        created: async function () {
            // `this` 指向 vm 实例
            let spead = {a:1,b:2,c:3};
            let newSpead = {...spead};
            try {
                let user = await getAxios("/user");
                this.userInfoChange(user);
            }catch(e){
                console.error(e)
            }
            console.log(this)
        }
    }
</script>

<style>
.el-header {
    background-image: linear-gradient(-180deg, #2a4867 6%, #162f48 100%);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 56px;
    line-height: 56px;
    padding: 0 15px;
    color: #ffffff;
}
</style>