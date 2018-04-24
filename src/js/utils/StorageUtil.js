/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/24.
 */
//设置常量对象
const TYPE = {
    TOKEN:"token",
    CURRENT_USER:"current_user",
    EVALUATING_INFO:"evaluating_info",
};


export const setToken = function (token) {
    localStorage.setItem(TYPE.TOKEN, token);
};

export const getToken = function () {
    return localStorage.getItem(TYPE.TOKEN);
};

export const removeToken = function () {
    localStorage.removeItem(TYPE.TOKEN);
};


//设置用户信息
export const setUser = function (user) {
    sessionStorage.setItem(TYPE.CURRENT_USER, JSON.stringify(user));
};

export const removeUser = function () {
    sessionStorage.removeItem(TYPE.CURRENT_USER);
};

export const getUser = function () {
    let userInfo = sessionStorage.getItem(TYPE.CURRENT_USER);
    return (undefined != userInfo && null != userInfo && "" != userInfo) ? JSON.parse(userInfo) : null;
};

//设置估价中的估价信息
export const setEvaluatingInfo = function (info) {
    sessionStorage.setItem(TYPE.EVALUATING_INFO, JSON.stringify(info));
};

export const removeEvaluatingInfo = function () {
    sessionStorage.removeItem(TYPE.EVALUATING_INFO);
};

export const getEvaluatingInfo = function () {
    let info = sessionStorage.getItem(TYPE.EVALUATING_INFO);
    return (undefined != info && null != info && "" != info) ? JSON.parse(info) : null;
};