/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

const commonChange = ({commit, state},obj)=>{
    commit(Type.COMMON_CHANGE,obj)
};

export default {
    commonChange,
}