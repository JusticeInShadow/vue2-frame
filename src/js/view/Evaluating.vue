<template>
    <div class="evaluate-plane">
        <header>
            {{mode === "mount"?"估价处理":"估价详情"}}
            <em>{{evaluatingCount}}</em>
        </header>
        <div class="evaluate-material-info">
            <div class="material-title">物料信息</div>
            <div class="material-list">
                <div class="material-item">
                    <div class="material-item-name">料号：</div>
                    <div class="material-item-value">{{evaluating.info.material_num || ""}}</div>
                </div>
                <div class="material-item">
                    <div class="material-item-name">图号：</div>
                    <div class="material-item-value">{{evaluating.info.draw_num || ""}}</div>
                </div>
                <div class="material-item">
                    <div class="material-item-name">附件：</div>
                    <div class="material-item-value appendix-value">
                        <span v-for="(item,index) in files" @click="downloadFile(item)">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="evaluate-material-details">
            <div class="evaluate-card-info">
                <div class="evaluate-info-title">
                    工艺信息
                </div>
                <div class="evaluate-marks"></div>
                <div class="evaluate-info-table">
                    <el-table
                        :data="evaluating.TData"
                        border
                        fit
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" align="center"></el-table-column>
                        <el-table-column prop="date" label="日期" min-width="180" align="center"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="180" align="center"></el-table-column>
                        <el-table-column prop="address" label="地址" min-width="180" align="center"></el-table-column>
                    </el-table>
                    <ul type="circle">
                        li*3
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {isEmpty,tips} from "../utils/Utils";
    import {getAxios} from "../utils/AjaxUtils";
    import {getEvaluatingInfo} from "../utils/StorageUtil";
    import {formatFilesString} from "../utils/SpecialUtils";

    export default {
        name: "Evaluating",
        data:function(){
            return {
                fileNameIndex:{
                    PDF:"PDF",
                    SLDDRW:"工程图",
                    SLDPRT:"模型图"
                },
                multipleSelection:[],
            }
        },
        computed:{
            mode:function () {
                const info = getEvaluatingInfo();
                const routerQuery = this.$router.history.query;
                if(!isEmpty(routerQuery)){
                    return "detail"
                }else if(!isEmpty(info)){
                    return "mount"
                }else {
                    return ""
                }
            },
            files:function(){
                const {attach_type} = this.evaluating.info;
                if(isEmpty(attach_type)){
                    return []
                }
                let files = attach_type.split(",");
                for(let i in files){
                    let file = files[i];
                    let name = this.fileNameIndex[file];
                    if(isEmpty(name)){
                        continue
                    }
                    files[i] = name;
                }
                return files;
            },
            evaluatingCount:function () {
                return this.mainAside.navCount["2"] || 0;
            },
            ...mapState([
                "mainAside",
                "evaluating",
            ])
        },
        methods:{
            downloadFile(item){
                tips.success(`你就假装我在打印 ${item} 吧`);
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            ...mapActions([
                "evaluatingInfoChange",
            ])
        },
        mounted:async function () {
            const info = getEvaluatingInfo();
            const routerQuery = this.$router.history.query;
            console.log(routerQuery);
            if(this.mode === "detail"){

            }else if(this.mode === "mount"){
                this.evaluatingInfoChange(info);
            }else {
                this.$router.push("/")
            }
        }
    }
</script>

<style>
    .evaluate-plane header {
        height: 40px;
        line-height: 36px;
        padding-left: 15px;
        font-size: 17px;
        color: #333333;
        letter-spacing: 1.49px;
        font-weight: bold;
        border-bottom: 1px solid #dedede;
    }
    .evaluate-plane header>em {
        font-style: normal;
        background: #ff7200;
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
        line-height: 14px;
        padding: 0 4px 0 6px;
        position: relative;
        font-weight: normal;
    }
    .evaluate-material-info {
        margin: 15px;
        margin-bottom: 0;
        border: 1px solid #dedede;
        border-bottom: 0;
    }
    .evaluate-material-info > div {
        height: 42px;
        line-height: 42px;
        font-weight: bold;
        color: #000000;
    }
    .material-title {
        font-size: 18px;
        background: #d2d2d2;
        padding-left: 10px;
    }
    .material-list {
        background: #f7f7f7;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .material-item {
        width: 33.33%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .material-item-name {
        width: 60px;
        padding-left: 10px;
        font-size: 16px;
    }
    .material-item-value {
        flex-grow: 1;
        color: #ff7200;
    }
    .appendix-value {
        color: #007dff;
    }
    .appendix-value span {
        margin-right: 20px;
        cursor: pointer;
    }
    .evaluate-material-details {
        overflow-y: auto;
        margin: 0 15px;
        border: 1px solid #dedede;
    }
    .evaluate-card-info {
        padding: 15px;
    }
    .evaluate-info-title {
        height: 44px;
        line-height: 44px;
        padding-left: 10px;
        font-size: 18px;
        color: #000000;
        border-bottom: 1px dotted #c8c8c8;
    }
    .evaluate-marks {
        padding: 6px 0;
        margin-bottom: -12px;
    }
    .evaluate-info-table {
        font-size: 14px;
        margin-top: 12px;
    }
</style>