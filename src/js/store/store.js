/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from "./app/state";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        app,
    }
});

export default store