<template>
    <el-aside :width="sideWidth" class="main-content-side">
        <div :class="{'rotate':!mainAside.isAsideShow,'side-controller':true}" @click="sideTriggle">
            <span class="icon-icon_a"></span>
        </div>
        <div :class="{'hide':!mainAside.isAsideShow,'side-content':true}">
            <div class="notice-card">
                <p class="notice-title">公告</p>
                <div class="notice-content">{{mainAside.notice}}</div>
            </div>
            <h3 class="about-me">与我相关</h3>
            <ul class="hc-aside-munu">
                <li @click.stop="handleAsideNavChange(1)">
                    <a :class="{'menu-item':true,'current':mainAside.choosedNav === 1}">
                        <i class="icon icon-icon_o"></i>
                        我已估价
                        <em class="item-num">{{evaluatedCount}}</em>
                    </a>
                </li>
            </ul>
        </div>
    </el-aside>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {isEmpty,tips} from "../utils/Utils";
    import {getAxios} from "../utils/AjaxUtils";
    import {getEvaluatingInfo} from "../utils/StorageUtil";

    export default {
        name: "MainAside",
        data:()=>{
            return {
                isSideShow:true,
            }
        },
        computed:{
            sideWidth:function(){
                if(this.mainAside.isAsideShow){
                    return "250px"
                }else {
                    return "0px"
                }
            },
            evaluatedCount:function () {
                return this.mainAside.navCount["1"] || 0;
            },
            ...mapState([
                "common",
                "mainAside"
            ])
        },
        methods:{
            sideTriggle(){
                const {isAsideShow} = this.mainAside;
                this.asideShowChange(!isAsideShow);
            },
            getCurrentMenu(){
                let hash = location.hash;
                let info = getEvaluatingInfo();
                if(hash.indexOf('evaluated') > -1 || (hash.indexOf('evaluating') > -1 && isEmpty(info))){
                    //我已估价和估价详情页面呈选中状态
                    this.asideNavChoose(1);
                }
            },
            handleAsideNavChange(type){
                this.asideNavChoose(type);
                if(type === 1){
                    location.hash = "/evaluated";
                }
            },
            ...mapActions([
                "asideShowChange",
                "noticeChange",
                "asideNavCountChange",
                "asideNavChoose",
            ])
        },
        mounted:async function () {
            this.getCurrentMenu();
            const {user} = this.common;
            try {
                let notice = await getAxios("/getNotice?app_flag=PC6");
                let total = await getAxios(`/getSiderTotal?workcode=${user.workcode}`);
                this.noticeChange(notice.content);
                this.asideNavCountChange(total);
            }catch(e) {
                console.error(e);
                if(typeof e === "string"){
                    tips.warning(e);
                }else if(typeof e.description === "string"){
                    tips.warning(e.description);
                }else {
                    tips.error("系统错误，请联系管理员！")
                }
            }
            console.log(this);
        }
    }
</script>

<style>
    .el-aside {
        overflow: visible;
    }
    .main-content-side {
        position: relative;
        background: #ffffff;
    }
    .side-controller {
        position: absolute;
        left: -35px;
        top: 3px;
        width: 34px;
        height: 34px;
        text-align: center;
        line-height: 40px;
        background: #dedede;
        cursor: pointer;
    }
    .side-controller span {
        color: #000;
        font-size: 20px;
    }
    .side-content {
        padding: 22px 13px;
    }
    .notice-card {
        background: #fcfcda;
        border: 1px solid #faf2a7;
        border-radius: 6px;
        padding: 12px 10px;
        margin: 0 5px;
    }
    .notice-title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 1.19px;
        line-height: 40px;
    }
    .notice-content {
        font-size: 14px;
        color: #666666;
        letter-spacing: 1.04px;
        line-height: 24px;
        max-height: 165px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
    }
    .about-me {
        text-align: left;
        color: #333;
        height: 50px;
        line-height: 46px;
        font-size: 16px;
        letter-spacing: 1.34px;
        margin: 20px 0 25px;
        border-bottom: solid 1px #dedede;
    }
    .hc-aside-munu .menu-item {
        display: block;
        padding: 0 10px;
        line-height: 30px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 1.19px;
        margin-top: 8px;
        position: relative;
        cursor: pointer;
    }
    .menu-item .icon {
        margin-right: 8px;
        font-size: 14px;
        vertical-align: -1px;
    }
    .menu-item .item-num {
        background: #b6b6b6;
        color: #fff;
        display: inline-block;
        padding: 1px 7px;
        font-size: 12px;
        border-radius: 17px;
        line-height: 14px;
        font-style: normal;
        position: absolute;
        top: 7px;
        right: 10px;
    }
    .menu-item.current {
        background: #4a9ff3;
        border-radius: 3px;
        color: #fff;
    }
    .menu-item.current .item-num{
        background: #fff;
        color: #4a9ff3;
    }
</style>