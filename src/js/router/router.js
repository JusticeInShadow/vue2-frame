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

const routes = [
    {
        path:"",
        name:"Container",
        component:Container,
        children:[
            {path:"/startEvaluate",name:"StartEvaluate",component:StartEvaluate},
            {path:"/evaluating",name:"Evaluating",component:Evaluating},
            {path:"/evaluated",name:"Evaluated",component:Evaluated},
        ]
    }
];

export default new VueRouter({
    routes
});
