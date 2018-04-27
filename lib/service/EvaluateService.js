/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/2.
 */
var BaseService = require("./BaseService");
var Util = require("../utils/Util");
var HttpClientUtil = require("../utils/HttpClientUtil");

class EvaluateService extends BaseService {
    constructor(logger, uriPrefix) {
        super(logger);
        this.uriPrefix = uriPrefix;
    }

    //获取书签
    getMarks(work_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/get-all-stars?work_code="+work_code;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //获取侧边栏各个栏目统计数字
    getSiderTotal(work_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/count?work_code="+work_code;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //开始估价
    startEvaluate(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/start";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //根据参数获取已估价的信息
    getMaterialEstimate(material_num,draw_num,order_number,order_type,order_company,work_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/get-okInfo-detail?material_num=${material_num}&draw_num=${draw_num}&order_number=${order_number}&order_type=${order_type}&order_company=${order_company}&work_code=${work_code}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //判断书签名是否重复
    downloadFiles(material,down_type,work_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/get-attach?material=${material}&down_type=${down_type}&work_code=${work_code}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //保存工艺书签信息
    saveCraftMarks(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/save-craft-stars`;
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //保存材料书签信息
    saveMaterialMarks(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/save-material-stars`;
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //判断书签名是否重复
    judgeMarks(work_code,star_name,tag,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/judge-star-name?work_code=${work_code}&star_name=${encodeURIComponent(star_name)}&tag=${tag}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //删除书签
    removeMark(work_code,star_name,tag,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/delete-stars?work_code=${work_code}&star_name=${encodeURIComponent(star_name)}&tag=${tag}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //退出估价
    endEvaluate(order_number,order_type,order_company,material_num,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/exit?order_number=${order_number}&order_type=${order_type}&order_company=${order_company}&material_num=${material_num}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //提交物料估价
    submitEvaluate(params,flag, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/submit-or-save/${flag/1}`;
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //获取我的估价数据
    getMyEvaluateData(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/get-okInfo-byCons`;
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //获取工艺价格
    getCraftData(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/get-craft-price";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //获取材料价格
    getMaterialData(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/get-material-price";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //单条工艺价格保存修改
    saveSingleCraft(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/update-craft-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //新增工艺价格
    addCrafts(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/add-craft-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //删除工艺价格
    deleteCraft(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/delete-craft-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //单条材料价格保存修改
    updateMaterial(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/update-material-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //删除材料价格
    deleteMaterial(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/delete-material-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //新增材料价格
    addMaterials(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/add-material-price";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //获取个人设置的物料类型优先级
    getMyMaterials(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/get-material-type-list";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //获取个人设置的紧急程度优先级
    getMyUrgency(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/get-emergency-list";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //保存推送的优先级
    savePriority(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/estimatePrice/save-set-order";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //请求估价的修改记录
    getGjRecord(order_number,order_type,order_company,material_num,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = `${that.uriPrefix}/api/estimatePrice/get-action-record?order_number=${order_number}&order_type=${order_type}&order_company=${order_company}&material_num=${material_num}`;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }
}
module.exports = EvaluateService;