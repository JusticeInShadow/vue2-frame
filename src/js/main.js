/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/20.
 */
import Vue from 'vue';
import { Container, Header , Main } from 'element-ui';
import store from './store/store';
import router from './router/router';

//按需加载，引入element-ui的时候要注意，有坑。。。。
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);

new Vue({
    router,
    store,
}).$mount('#app');