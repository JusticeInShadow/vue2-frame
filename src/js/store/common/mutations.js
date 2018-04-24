/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/18.
 */
import Type from "./constant";

export default {
    [Type.COMMON_CHANGE](state,{data} = data){
        //vue不能去实现state覆盖...现阶段看现象是这样，感觉有点奇怪。
        for(let i in data){
            let item = data[i];
            state[i] = item
        }
    },
}