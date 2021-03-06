/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Container from "../view/Container";
import StartEvaluate from "../view/StartEvaluate";
import Evaluating from "../view/Evaluating";
import Evaluated from "../view/Evaluated";

Vue.use(VueRouter);

//存在子路由的时候需要移除父路由的name属性。
const routes = [
    {
        path:"",
        component:Container,
        children:[
            {path:"/",redirect:StartEvaluate},        //设置默认路由
            {path:"/startEvaluate",name:"StartEvaluate",component:StartEvaluate},
            {path:"/evaluating",name:"Evaluating",component:Evaluating},
            {path:"/evaluated",name:"Evaluated",component:Evaluated},
        ]
    }
];

export default new VueRouter({
    mode:"hash",                  //默认是hash模式，初学标记清楚一点的比较好
    routes
});
