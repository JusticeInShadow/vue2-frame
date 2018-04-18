/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

const appChange = ({commit, state},data)=>{
    commit(Type.APP_CHANGE,data)
};

export default {
    appChange,
}