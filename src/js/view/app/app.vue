<template>
    <div>
        <CHeader father-component="app"></CHeader>
        <button @click="changeTitle">修改标签</button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import axios from "axios";
    import {getAxios,ajaxPlatform} from "../../utils/AjaxUtils";
    import CHeader from "../../component/CHeader";
    export default {
        name: "app",
        components: {
            CHeader
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
                let user = await getAxios("/user");
            }catch(e){
                console.error(e)
            }
            console.log(this)
        }
    }
</script>

<style>

</style>