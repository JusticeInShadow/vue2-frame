<template>
    <el-header>
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

</style>