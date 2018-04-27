/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/19.
 */
import axios from "axios";
import config from "../config/config";

//获取当前打包的环境
const node_env = process.env["NODE_ENV"];
//设置baseUrl
const baseUrl = config[node_env].baseUrl;
axios.defaults.baseURL = baseUrl;

export const getAxios = (url)=>{
    let token = "test_token";
    let config = {
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        isFetch:1,
        credentials: 'include',
    };
    return new Promise((resolve, reject)=>{
        axios(config).then((response)=>{
            if(response.status >= 400){
                throw new Error("系统异常请与管理员联系");
            }
            let msg = response.data;
            if (msg.description == 'error100000' || msg.description == '100000:无效token' || msg.description == '无效token') {//无效token  跳转到登录界面
                // location.href = commonConfig.loginUrl;
                console.error("token失效，重新登录");
                return;
            }
            if(msg.success == 1){
                resolve(msg.data);
            }else {
                reject(`${url}接口报错！`)
            }
        });
    });
};

export const postAxios = (url, params)=>{
    let token = "test_token";
    let config = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        isFetch:1,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return new Promise((resolve, reject)=>{
        axios(config).then((response)=>{
            if(response.status >= 400){
                throw new Error("系统异常请与管理员联系");
            }
            let msg = response.data;
            if (msg.description == 'error100000' || msg.description == '100000:无效token' || msg.description == '无效token') {//无效token  跳转到登录界面
                // location.href = commonConfig.loginUrl;
                console.error("token失效，重新登录");
                return;
            }
            resolve(msg);
        });
    });
};

// export const ajaxPlatform = (actions,errors)=>{
//     try {
//         let error = actions();
//         if(undefined !== error || null !== error || "" !== error){
//             throw new Error(error);
//         }
//     }catch(e){
//         console.error(e);
//         errors()
//     }
// };