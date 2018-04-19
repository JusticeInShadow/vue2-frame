/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

const userInfoChange = ({commit, state},obj)=>{
    commit(Type.USER_INFO_CHANGE,obj)
};

export default {
    userInfoChange,
}