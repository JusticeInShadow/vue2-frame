/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import mutations from './mutations';
import actions from './actions';

const state = {
    isAsideShow:true,
    notice:"",
    navCount:{},
    choosedNav:-1,
};

export default {
    state,
    mutations,
    actions,
}