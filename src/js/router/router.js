/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
import App from "../view/app/app";

Vue.use(VueRouter);

const routes = [
    {path:"",component:App}
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
    store,
}).$mount('#app');