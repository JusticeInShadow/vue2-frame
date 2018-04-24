/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/23.
 */
import swal from "sweetalert";
import moment from "moment";
import config from "../config/config";
let env = process.env["NODE_ENV"];
let commonConfig = config[env];

/**
 * 是否是数组
 * @param arr
 * @returns {boolean}
 */
export const isArray = function (arr) {
    return arr instanceof Array;
};

/**
 * 是否是有效的浮点数
 * @param obj
 * @returns {boolean}
 */
export const isNumeric = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};

/**
 * 是否为空 undefined  null "" 都返回true
 * @param param
 * @returns {*}
 */
export const isEmpty = function (obj) {
    if (obj == null || obj == undefined || obj === ''){ //0==''
        return true;
    } else {
        return false;
    }
    // if (isArray(obj) || isString(obj)) return obj.length === 0; //不空的array和obj也是true
    // return true;
};

/**
 *是否不为空
 * @param param
 * @returns {boolean}
 */
export const isNotEmpty = function (param) {
    return !this.isEmpty(param);
};

/**
 * 是否是字符串
 * @param obj
 * @returns {boolean}
 */
export const isString = function (obj) {
    //return toString.call(obj) == '[object String]';
    return (typeof obj == 'string') && obj.constructor == String;
};

/**
 * 是否是数字
 * @param obj
 * @returns {boolean}
 */
export const isNumber = function (obj) {
    //return toString.call(obj) == '[object Number]';
    return (typeof obj == 'number') && obj.constructor == Number;
};

/**
 *是否是手机号码
 * @param phone
 * @returns {*|boolean}
 */
export const isMobile = function (phone) {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/;
    return reg.test(phone);

};

/**
 *是否是有效的密码
 * @param userName
 * @returns {*|boolean}
 */
export const isPassword = function (password) {
    var reg = /[^\w]/;//不是数字字母下划线
    var reg2 = /\w*\d\w*/;//必须包含数组
    var reg3 = /\w*[a-z]\w*/;//必须包含小写字母
    var reg4 = /\w*[A-Z]\w*/;//必须包含大写字母

    if (!reg.test(password) && reg2.test(password) && reg3.test(password) && reg4.test(password)) {
        return true;
    } else {
        return false;
    }
};


/**
 *邮箱是否有效 （允许除中文、空格、制表符、换页符和换行符外的任意字符）
 * @param email
 * @returns {*|boolean}
 */
export const isEmail = function (email) {
    var reg1 = /[\u4E00-\u9FA5\uF900-\uFA2D]/;    //只匹配中文
    var reg2 = /^\S*@(\w)+((\S*\.+\w{1,}){1,})$/;  //匹配非空白字符
    var res = !reg1.test(email) && reg2.test(email);
    return res;
};


/**
 * 获取token
 * @param c_name
 * @returns {*}
 */
export const getCookie = function (c_name) {
    var c_start = -1, c_end = -1;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
};

/**
 *设置token
 * @param c_name
 * @param value
 * @param expiredays
 */
export const setCookie = function (c_name, value, expiredays) {
    expiredays = expiredays || 1;
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiredays * 24 * 3600 * 1000);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + "; path:/" + commonConfig.domain);//--todo 设置domain时需要设置一级域名
};

/**
 *清除cookie
 * @param name
 */
export const removeCookie = function (name) {
    setCookie(name, 'removecookie', -1);
};

/**
 *去前后空格
 * @param val
 * @returns {*}
 */
export const trim = function (val) {
    return val.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 *获取字符串的字节长度 1个中文占2个字符
 * @param str
 */
export const getBytesLength = function (str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
};

/**
 * 生成序号
 * @param email
 * @returns {*|boolean}
 */
export const getNo = function (index, pageNumber, pageSize) {
    var order = (pageNumber - 1) * pageSize + index;
    return order;
};

/**
 * 获取当年月份
 * @param email
 * @returns {*|boolean}
 */
export const getNowMonth = function () {
    let time = moment().format("YYYY-MM");
    return time;
};

/**
 * 生成千分位数字
 * @param email
 * @returns {*|boolean}
 */
export const getThousands = function (num) {
    let oriNum = String(num);
    let re=/(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    let newNum = oriNum.replace(re,"$1,");
    return newNum;
};

/**
 * 判断是否是ie浏览器
 * @returns {*|boolean}
 */
export const isIe = function () {
    return ("ActiveXObject" in window);
};

/**
 * 获取剪切板内容
 * @param isIe
 * @returns {null|string}
 */
export const getPaste = function (e,isIe) {
    if(isIe){
        return window.clipboardData.getData("text");
    }else if(e.clipboardData.types.indexOf('text/html') > -1 && e.target.tagName === "INPUT"){
        return e.clipboardData.getData('text/plain');
    }
};

/**
 * 深拷贝
 * @param obj
 * @returns {null|string}
 */
export const deepCopy = function (obj) {
    var str,newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== "object"){
        return;
    }else if (window.JSON){
        str = JSON.stringify(obj);
        newobj = JSON.parse(str);
    }else {
        for (var i in obj){
            newobj[i] = typeof obj[i] === "object"?deepCopy(obj[i]):obj[i];
        }
    }
    return newobj
};

/**
 * 模糊搜索
 * @param obj
 * @returns {null|string}
 */
export const fuzzySearch = function (searchParams,data,currentData) {
    let newData = [];
    let copyData = JSON.parse(JSON.stringify(data));
    let currentDataIndex={};
    if(currentData !== undefined){
        for(let i in currentData){
            let item = currentData[i];
            currentDataIndex[item.rn] = item;
        }
    }
    let patt1 = new RegExp(/^\*/);
    let patt2 = new RegExp(/\*$/);
    let patt3 = new RegExp(/[^\*][\*$]/);
    let pattNum = new RegExp(/^[0-9]*$/);
    for(let i in copyData){
        let flag = true;
        let flagObj = {};
        for(let k in searchParams){
            flagObj[k] = true
        }
        let item = copyData[i];
        for(let j in item){
            if(undefined === searchParams[j] || null === searchParams[j] || "" === searchParams[j]){
                continue
            }else if (searchParams[j].indexOf(">") == 0 && searchParams[j].indexOf("=") != 1){
                let newSingleParam = searchParams[j].replace(/>/,"");
                let judgeItem = item[j].toString();
                if(pattNum.test(newSingleParam)){
                    flagObj[j] = (judgeItem-0) > (newSingleParam-0);
                }else {
                    flagObj[j] = judgeItem.toUpperCase()>newSingleParam.toUpperCase()
                }
            }else if (searchParams[j].indexOf(">=") == 0){
                let newSingleParam = searchParams[j].replace(/>=/,"");
                let judgeItem = item[j].toString();
                if(pattNum.test(newSingleParam)){
                    flagObj[j] = (judgeItem-0) >= (newSingleParam-0);
                }else {
                    flagObj[j] = judgeItem.toUpperCase() >= newSingleParam.toUpperCase()
                }
            }else if (searchParams[j].indexOf("<") == 0 && searchParams[j].indexOf("=") != 1){
                let newSingleParam = searchParams[j].replace(/</,"");
                let judgeItem = item[j].toString();
                if(pattNum.test(newSingleParam)){
                    flagObj[j] = (judgeItem-0) < (newSingleParam-0);
                }else {
                    flagObj[j] = judgeItem.toUpperCase() < newSingleParam.toUpperCase();
                }
            }else if (searchParams[j].indexOf("<=") == 0 ){
                let newSingleParam = searchParams[j].replace(/<=/,"");
                let judgeItem = item[j].toString();
                if(pattNum.test(newSingleParam)){
                    flagObj[j] = (judgeItem-0) <= (newSingleParam-0);
                }else {
                    flagObj[j] = judgeItem.toUpperCase() <= newSingleParam.toUpperCase();
                }
            }else if (searchParams[j].indexOf("!=") == 0 ){
                let newSingleParam = searchParams[j].replace(/!=/,"");
                let judgeItem = item[j].toString();
                if(pattNum.test(newSingleParam)){
                    flagObj[j] = (judgeItem-0) != (newSingleParam-0);
                }else {
                    flagObj[j] = judgeItem.toUpperCase() != newSingleParam.toUpperCase();
                }
            }/*else if (patt1.test(searchParams[j]) && !patt3.test(searchParams[j])){
                let newSingleParam = searchParams[j].replace(/\*!/g,"");
                let matchPatten = eval("/" + newSingleParam+"$/");
                flagObj[j] = item[j].search(matchPatten)>-1;
            }else if (patt2.test(searchParams[j]) && !patt3.test(searchParams[j])){
                let newSingleParam = searchParams[j].replace(/\*!/g,"");
                let matchPatten = eval("/^" + newSingleParam+"/");
                flagObj[j] = item[j].search(matchPatten)>-1;
            }else if (patt3.test(searchParams[j])){
                let newSingleParam = searchParams[j].replace(/\*!/g,"");
                let matchPatten = eval("/" + newSingleParam+"/");
                flagObj[j] = item[j].search(matchPatten)>-1;
            }*/else {
                let searchItem = searchParams[j];
                let isNumber = searchItem.indexOf(".")>-1;
                if(isNumber){
                    searchItem = parseFloat(searchItem);
                }
                let matchPatten = searchItem.toString().toUpperCase();
                let waitMatchItem = item[j];
                if(null === waitMatchItem || undefined === waitMatchItem || "" === waitMatchItem){
                    flagObj[j] = false;
                }else {
                    flagObj[j] = waitMatchItem.toString().toUpperCase().indexOf(matchPatten)>-1;
                }
            }
        }
        for (let l in flagObj){
            if(!flagObj[l]){
                flag = false;
                break
            }
        }
        if(flag){
            newData.push(data[i]);
        }
    }
    if(currentData !== undefined){
        for(let i in newData){
            newData[i] = Object.assign({},newData[i],currentDataIndex[newData[i].rn])
        }
    }
    copyData = null;
    return newData
};

/**
 * 函数节流
 * @param time
 * @param action
 * @returns {null|string}
 */
export const debounce = function(time, action){
    var t;
    return function(){
        var ctx = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function(){
            action.apply(ctx, args)
        }, time)
    }
};

/**
 * 排序
 * @param sort
 * @param arr
 * @returns {null|array}
 */
export const selectionSort = function(sort, arr){
    let sortArr = JSON.parse(JSON.stringify(arr));
    let type = sort.target;
    let len = sortArr.length;
    let minIndex, temp;
    let pattNum = new RegExp(/^[0-9]*$/);
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            let thisItem = sortArr[j][type];
            let minItem = sortArr[minIndex][type];
            let flag = false;
            if(pattNum.test(thisItem) && pattNum.test(minItem)){
                flag = (thisItem - 0) < (minItem - 0);
            }else {
                flag = thisItem < minItem;
            }
            if (flag || null === thisItem || undefined === thisItem || "" === thisItem) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = sortArr[i];
        sortArr[i] = sortArr[minIndex];
        sortArr[minIndex] = temp;
    }
    if(sort.way){
        sortArr.reverse()
    }
    return sortArr;
};

/**
 * 日期搜索
 * @param searchParams
 * @param data
 * @returns {null|arr}
 */
export const dateSearch = function (dataSearchParams,data,currentData) {
    let newData = [];
    let removeIndex = [];
    let copyData = JSON.parse(JSON.stringify(data));
    let currentDataIndex={};
    if(currentData !== undefined){
        for(let i in currentData){
            let item = currentData[i];
            currentDataIndex[item.rn] = item;
        }
    }
    for(let i in dataSearchParams){
        let item = dataSearchParams[i];
        for(let j in copyData){
            if(undefined !== item.from && null !== item.from && "" !== item.from){
                if(copyData[j][i] === undefined || copyData[j][i] === null || copyData[j][i] === ""){
                    removeIndex.push(j);
                    continue
                }
                let dataItem = copyData[j][i].toString().toUpperCase();
                let searchFrom = dataSearchParams[i].from;
                let flag = dataItem >= searchFrom;
                if(!flag){
                    removeIndex.push(j);
                }
            }
            if(undefined !== item.to && null !== item.to && "" !== item.to){
                if(copyData[j][i] === undefined || copyData[j][i] === null || copyData[j][i] === ""){
                    removeIndex.push(j);
                    continue
                }
                let dataItem = copyData[j][i].toString().toUpperCase();
                let searchFrom = dataSearchParams[i].to;
                let flag = dataItem <= searchFrom;
                if(!flag){
                    removeIndex.push(j);
                }
            }
        }
    }
    for(let i in copyData){
        if(removeIndex.indexOf(i) == -1){
            newData.push(copyData[i])
        }
    }
    /*  for(let i in newData){
          newData[i] = Object.assign({},newData[i],currentDataIndex[newData[i].rn])
      }*/
    return newData
};

/**
 * 获取元素的相对浏览器左边的位置
 * @param element
 * @returns {number}
 */
export const getElementViewLeft = function(element){
    var actualLeft = element.offsetLeft - element.scrollLeft;
    var current = element.offsetParent;

    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    var scrollCurrent = element.parentNode;

    while (scrollCurrent !== null){
        if(scrollCurrent.nodeName !== "#document"){
            actualLeft -= scrollCurrent.scrollLeft;
        }
        scrollCurrent = scrollCurrent.parentNode;
    }

    if (document.compatMode == "BackCompat"){
        var elementScrollLeft=document.body.scrollLeft;
    } else {
        var elementScrollLeft=document.documentElement.scrollLeft;
    }

    return actualLeft-elementScrollLeft;
};

/**
 * 获取元素的相对浏览器顶部的位置
 * @param element
 * @returns {number}
 */
export const getElementViewTop = function(element){
    var actualTop = element.offsetTop - element.scrollTop;
    var current = element.offsetParent;

    while (current !== null){
        actualTop += current. offsetTop;
        current = current.offsetParent;
    }

    var scrollCurrent = element.parentNode;

    while (scrollCurrent !== null){
        if(scrollCurrent.nodeName !== "#document"){
            actualTop -= scrollCurrent.scrollTop;
        }
        scrollCurrent = scrollCurrent.parentNode;
    }

    if (document.compatMode == "BackCompat"){
        var elementScrollTop=document.body.scrollTop;
    } else {
        var elementScrollTop=document.documentElement.scrollTop;
    }

    return actualTop-elementScrollTop;
};

//提示弹窗
export const tips = new Object();
//成功
tips.success = function (content) {
    return swal({
        text:content,
        icon:"success",
        buttons:"确认"
    })
};
//失败
tips.error = function (content) {
    return swal({
        text:content,
        icon:"error",
        button:"确认"
    })
};
//警告
tips.warning = function (content,successFun) {
    return swal({
        text:content,
        icon:"warning",
        buttons:"确认"
    }).then(
        sure => {
            if(undefined === successFun || null === successFun || "" === successFun){
                return true
            }
            successFun(sure);
        }
    )
};
//提示
tips.info = function (content) {
    return swal({
        text:content,
        icon:"info",
        buttons:"确认"
    })
};
//确认提示框
tips.confirm = function (content,successFun) {
    return swal({
        text:content,
        icon:"warning",
        buttons:["取消","确认"],
        closeOnClickOutside:false
    }).then(
        sure => successFun(sure)
    )
};
//定时提示框
tips.Ksana = function (content) {
    return swal({
        icon:"warning",
        text:content,
        button:false,
        timer:2500
    })
};

//成功后自动消失的提示
tips.successAuto = function(content) {
    return swal({
        icon:"success",
        text:content,
        button:false,
        timer:1500
    })
};


//这几个正则方法起的都是什么名字 。。。。。 by author
//验证是否是正整数  ---- 主要服务于数量
export const regZero = function(str){
    return /^\d*$/.test(str) || str === "";
};

//验证是否是正一位小数     ---- 主要服务于估价系统的长、宽、高
export const regOne = function(str){
    return /^\d+(\.\d{0,1})?$/.test(str) || str === "";
};


//验证是否是正两位小数     ---- 主要服务于金额
export const regTwo = function(str){
    return /^\d+(\.\d{0,2})?$/.test(str) || str === "";
};

//验证是否是正四位小数     ---- 主要服务于单价
export const regFour = function(str){
    return /^\d+(\.\d{0,4})?$/.test(str) || str === "";
};

//验证是否是正六位小数     ---- 主要服务于估价系统的体积、材料密度
export const regSix = function(str){
    return /^\d+(\.\d{0,6})?$/.test(str) || str === "";
};

//验证是否是正七位小数     ---- 主要服务于估价系统的体积
export const regSeven = function(str){
    return /^\d+(\.\d{0,7})?$/.test(str) || str === "";
};

//验证是否是正八位小数     ---- 主要服务于估价系统的体积
export const regEight = function(str){
    return /^\d+(\.\d{0,8})?$/.test(str) || str === "";
};

//验证是否是正九位小数     ---- 主要服务于估价系统的体积
export const regNine = function(str){
    return /^\d+(\.\d{0,9})?$/.test(str) || str === "";
};

//验证是否是 小于等于1的 正两位小数   ---- 主要服务于付款比例
export const regTwoAndOne = function(str){
    return /^[0]+(\.\d{0,2})?$/.test(str) || str === "1" || str === "";
};

/**
 * 格式化post方法传递的参数 -- null的字段都用" "代替    参数为对象的时候存在属性为数组的情况可以不用处理
 * @param params
 * @returns params
 */
export const formatPostParams = function(params){
    let isArr = Array.isArray(params);
    //再多处理一个属性值可能为数组或者对象的情况  -- 通过递归处理这种情况  -- 其实我觉得递归在业务层面上而言有点多余
    if(isArr){    // 处理参数是arr的情况
        let newParams = [];
        for(let i in params){
            let param = Object.assign(params[i]);
            for(let j in param){
                let item = param[j];
                if((Array.isArray(item) || typeof item === "object") && null !== item){
                    param[j] = formatPostParams(item);
                }else {
                    param[j] = null === item?" ":item;
                }
            }
            newParams.push(param);
        }
        return newParams
    }else {  // 处理参数是obj的情况
        let newParams = Object.assign(params);
        for(let i in newParams){
            let item = newParams[i];
            if((Array.isArray(item) || typeof item === "object") && null !== item){
                newParams[i] = formatPostParams(item);
            }else {
                newParams[i] = null === item?" ":item;
            }
        }
        return newParams
    }
};

/**
 * 判断日期字符串格式是否正确
 * @param string
 * @returns boolean
 */
export const regDateString = function(string){
    return /^([0-9]{1,4}[\/|\- ]{1}){2}[0-9]{1,4}$/.test(string) || string == "";
};

/**
 * 对象/数组去除值相等的项
 * @param string
 * @returns boolean
 */
export const removeValueSameItem = function(obj,string){
    for(let i in obj){
        if(obj[i] == string){
            if(Array.isArray(obj)){
                obj.splice(i,1);
                break;
            }else {
                delete obj[i];
                break;
            }
        }
    }
    return obj
};