/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

const settingSelectShow = ({commit, state},obj)=>{
    commit(Type.HEAER_SETTING_SHOW_CHANGE,obj)
};

export default {
    settingSelectShow,
}