/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

const asideShowChange = ({commit, state},obj)=>{
    commit(Type.ASIDE_SHOW_CHANGE,obj)
};

const noticeChange = ({commit, state},obj)=>{
    commit(Type.ASIDE_NOTICE_CHANGE,obj)
};

const asideNavCountChange = ({commit, state},obj)=>{
    commit(Type.ASIDE_NAV_COUNT_CHANGE,obj)
};

const asideNavChoose = ({commit, state},obj)=>{
    commit(Type.ASIDE_NAV_CHOOSE_CHANGE,obj)
};

export default {
    asideShowChange,
    noticeChange,
    asideNavCountChange,
    asideNavChoose,
}