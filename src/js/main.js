/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/20.
 */
import Vue from 'vue';
import { Container, Header , Main ,Aside,Icon,Button,Table,TableColumn,Input} from 'element-ui';
//引入ECharts，按需加载
import ECharts from "vue-echarts/components/ECharts";
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

import store from './store/store';
import router from './router/router';
import "../css/common.css";
import "../css/fontstyle.css";
import "./main.css";
import {getAxios} from "./utils/AjaxUtils";
import {tips} from "./utils/Utils";

//注册echarts
Vue.component('chart', ECharts);

//按需加载，引入element-ui的时候要注意，有坑。。。。
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);

//页面正式开始渲染
const pageRender = ()=>{
    new Vue({
        router,
        store,
    }).$mount('#app');
};

//页面渲染需要经过的流程 1、获取用户信息。2、获取工艺、材料列表信息
const renderFlow = async ()=>{
    try {
        let user = await getAxios("/user");
        let crafts = await getAxios("/getCraftData");
        let materials = await getAxios("/getMaterialData");
        // 以对象形式分发
        store.dispatch({
            type: 'commonChange',
            data: {user,crafts,materials}
        });
        pageRender();
    }catch(e){
        tips.error("页面异常，请联系管理员！");
        console.error(e);
        pageRender()
    }

};

renderFlow();