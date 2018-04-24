/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import common from './common/state';
import mainHeader from "./mainHeader/state";
import mainAside from "./mainAside/state";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        common,
        mainHeader,
        mainAside
    }
});

export default store