<template>
    <el-header height="56px" class="main-header clear">
        <div class="layout">
            <div class="header-logo clear">
                <a>
                    <img src="../../images/cg-logo.png">
                    <ul>
                        <li></li>
                    </ul>
                </a>
                <span>瀚川集团采购估价系统</span>
            </div>
            <div class="header-setting">
                <div class="setting-view clear">
                    <img :src="common.user.picture_url" alt="">
                    <i></i>
                </div>
                <ul class="setting-list">
                    <li class="clear">
                        <p>返回 passport</p>
                        <span class="icon-icon_yg"></span>
                    </li>
                </ul>
            </div>
        </div>

    </el-header>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {getAxios} from "../utils/AjaxUtils";
    export default {
        name: "MainHeader",
        data(){
          return {
              headerNav:[]
          }
        },
        computed: {
            ...mapState([
                "common"
            ]),
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
        color: #ffffff;
    }
    .header-logo {
        float: left;
    }
    .header-logo>a {
        float: left;
    }
    .header-logo>a>img {
        height: 30px;
        margin-top: 13px;
        padding-right: 15px;
        border-right: solid 1px #6d8596;
    }
    .header-logo>span {
        float: left;
        opacity: 0.54;
        font-family: "Arial-ItalicMT";
        font-size: 20px;
        color: #fff;
        margin-left: 15px;
        line-height: 55px;
        font-weight: 600;
    }
    .header-setting {
        float: right;
        position: relative;
    }
    .setting-view {
        height: 24px;
        line-height: 20px;
        background: #a2a2a2;
        padding: 3px 8px 3px 3px;
        margin-top: 13px;
    }
    .setting-view>img {
        width: 24px;
        height: 24px;
        background: #fff;
        float: left;
        margin-right: 7px;
    }
    .setting-view>i {
        display: inline-block;
        color: #000;
        width: 0px;
        height: 0px;
        border-color: #000 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0px;
        cursor: pointer;
    }
    .setting-list {
        width: 150px;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 45px;
        display: block;
        text-align: left;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        background-clip: padding-box;
        cursor: pointer;
    }
    .setting-list>li {
        padding: 0 10px 0 11px;
    }
    .setting-list>li>p {
        float: left;
        color: #333;
        line-height: 30px;
    }
    .setting-list>li>span {
        float: right;
        color: #333333;
        line-height: 26px;
    }
</style>