<template>
    <div class="index-card">
        <img src="../../images/Bitmap.png">
        <el-button type="primary" @click="startEvaluate">
            <span>我要估价</span>
            <em>{{evaluatingCount}}</em>
        </el-button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {tips} from "../utils/Utils";
    import {getAxios} from "../utils/AjaxUtils";
    import {setEvaluatingInfo} from "../utils/StorageUtil";
    import {formatFilesString} from "../utils/SpecialUtils";

    export default {
        name: "StartEvaluate",
        computed:{
            evaluatingCount:function () {
                return this.mainAside.navCount["2"] || 0;
            },
            ...mapState([
                "common",
                "mainAside"
            ])
        },
        methods:{
            async startEvaluate(){
                const {user} = this.common;
                try{
                    //获取物料信息
                    let materialInfo = await getAxios(`/startEvaluate`);
                    materialInfo.attach_type = formatFilesString(materialInfo.attach_type);
                    setEvaluatingInfo(materialInfo);
                    //重新获取侧边合计数
                    let total = await getAxios(`/getSiderTotalAgain?workcode=${user.workcode}`);
                    this.asideNavCountChange(total);
                    this.$router.push(`/evaluating`);
                }catch(e){
                    console.error(e);
                    if(typeof e === "string"){
                        tips.warning(e);
                    }else if(typeof e.description === "string"){
                        tips.warning(e.description);
                    }else {
                        tips.error("系统错误，请联系管理员！")
                    }
                }
            },
            ...mapActions([
                "asideNavCountChange",
            ])
        }
    }
</script>

<style>
.index-card {
    padding: 50px;
    width: 172px;
    height: 235px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.index-card > img {
    width: 172px;
    height: 160px;
}
.index-card > button {
    margin: 15px 12px;
    width: 148px;
    height: 50px;
    font-size: 16px;
    letter-spacing: 1px;
    position: relative;
}
.index-card > button em {
    font-style: normal;
    background: #fff;
    border-radius: 4px;
    color: #ff7200;
    font-size: 12px;
    line-height: 14px;
    padding: 0 4px;
    margin-left: 5px;
    position: relative;
    font-weight: bold;
}
</style>