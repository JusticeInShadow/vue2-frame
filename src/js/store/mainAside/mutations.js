/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

export default {
    [Type.ASIDE_SHOW_CHANGE](state,flag){
        state.isAsideShow = flag;
    },
    [Type.ASIDE_NOTICE_CHANGE](state,str){
        state.notice = str;
    },
    [Type.ASIDE_NAV_COUNT_CHANGE](state,data){
        state.navCount = data;
    },
    [Type.ASIDE_NAV_CHOOSE_CHANGE](state,data){
        state.choosedNav = data;
    },
}