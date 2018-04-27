/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

export default {
    [Type.EVALUATING_INFO_CHANGE](state,obj){
        state.info = obj;
    },
}