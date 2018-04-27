/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/2.
 */
var BaseController = require("./BaseController");
var AppService = require("../service/EvaluateService");
var Util = require("../utils/Util");

class EvaluateController extends BaseController {
    constructor(logger, router, uriPrefix) {
        super(logger);
        this.router = router;
        this.appService = new AppService(logger, uriPrefix);
        this.routerPrefix = "/evaluate/";
        this.token = "";     // 正式环境Api上线之后发布正式环境代码的时候注意把this.token 清空，平时启动本地服务的时候也要清空this.token
        this.initRouter();
    }

    initRouter() {
        let that = this;

        //跳转到采购审核PC页面
        this.router.get(this.routerPrefix, async(ctx, next) =>{
            await ctx.render("index")
        });

        //获取书签详情
        this.router.get(this.routerPrefix+"getMarks", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取书签详情成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let query = ctx.query;
                let work_code = query.work_code;
                resBody.data = await that.appService.getMarks(work_code,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //获取侧边栏各个栏目统计数字
        this.router.get(this.routerPrefix+"getSiderTotal", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取侧边栏各个栏目统计数字成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let work_code = body.work_code;
                resBody.data = await that.appService.getSiderTotal(work_code,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //开始估价
        this.router.get(this.routerPrefix+"startEvaluate", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取随机估价单成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                resBody.data = await that.appService.startEvaluate(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //根据参数获取已估价的物料估价信息
        this.router.get(this.routerPrefix+"getMaterialEstimate", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取已估价的物料估价信息成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let query = ctx.query;
                let material_num = query.material_num;
                let draw_num = query.draw_num;
                let order_number = query.order_number;
                let order_type = query.order_type;
                let order_company = query.order_company;
                let work_code = query.work_code;
                resBody.data = await that.appService.getMaterialEstimate(material_num,draw_num,order_number,order_type,order_company,work_code,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //下载文件
        this.router.get(this.routerPrefix+"downloadFiles", async(ctx, next) =>{
            let resBody = {"success": true, "description": "下载文件成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let material = body.material;
                let down_type = body.down_type;
                let work_code = body.work_code;
                resBody.data = await that.appService.downloadFiles(material,down_type,work_code,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //保存工艺书签信息
        this.router.post(this.routerPrefix + "saveCraftMarks", async(ctx, next) =>{
            let resBody = {"success": true, "description": "保存工艺书签信息成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.saveCraftMarks(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //保存材料书签信息
        this.router.post(this.routerPrefix + "saveMaterialMarks", async(ctx, next) =>{
            let resBody = {"success": true, "description": "保存材料书签信息成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.saveMaterialMarks(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //判断书签名是否重复
        this.router.get(this.routerPrefix+"judgeMarks", async(ctx, next) =>{
            let resBody = {"success": true, "description": "书签名不重复！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let work_code = body.work_code;
                let star_name = body.star_name;
                let tag = body.tag;
                resBody.data = await that.appService.judgeMarks(work_code,star_name,tag,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //删除书签
        this.router.get(this.routerPrefix+"removeMark", async(ctx, next) =>{
            let resBody = {"success": true, "description": "删除书签成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let work_code = body.work_code;
                let star_name = body.star_name;
                let tag = body.tag;
                resBody.data = await that.appService.removeMark(work_code,star_name,tag,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //退出估价
        this.router.get(this.routerPrefix+"endEvaluate", async(ctx, next) =>{
            let resBody = {"success": true, "description": "退出估价成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let order_number = body.order_number;
                let order_type = body.order_type;
                let order_company = body.order_company;
                let material_num = body.material_num;
                resBody.data = await that.appService.endEvaluate(order_number,order_type,order_company,material_num,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //提交物料估价
        this.router.post(this.routerPrefix + "submitEvaluate", async(ctx, next) =>{
            let resBody = {"success": true, "description": "估价信息提交成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                let flag = ctx.query.flag;
                resBody.data = await that.appService.submitEvaluate(body,flag, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.errorMessage;
                if(typeof e == "object"){
                    resBody.data = e.data
                }
            }
            ctx.body = resBody;
        });

        //获取我的估价数据
        this.router.post(this.routerPrefix + "getMyEvaluateData", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取我的估价数据成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.getMyEvaluateData(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //获取工艺价格
        this.router.get(this.routerPrefix+"getCraftData", async(ctx, next) =>{
            let resBody = {"success": true, "description": "请求工艺价格成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                resBody.data = await that.appService.getCraftData(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //获取材料价格
        this.router.get(this.routerPrefix+"getMaterialData", async(ctx, next) =>{
            let resBody = {"success": true, "description": "请求材料价格成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                resBody.data = await that.appService.getMaterialData(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //单条工艺价格保存修改
        this.router.post(this.routerPrefix + "saveSingleCraft", async(ctx, next) =>{
            let resBody = {"success": true, "description": "保存单条工艺价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.saveSingleCraft(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });


        //新增工艺价格
        this.router.post(this.routerPrefix + "addCrafts", async(ctx, next) =>{
            let resBody = {"success": true, "description": "新增工艺价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.addCrafts(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //删除工艺价格
        this.router.post(this.routerPrefix + "deleteCraft", async(ctx, next) =>{
            let resBody = {"success": true, "description": "删除工艺价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.deleteCraft(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //单条材料价格保存修改
        this.router.post(this.routerPrefix + "updateMaterial", async(ctx, next) =>{
            let resBody = {"success": true, "description": "保存单条材料价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.updateMaterial(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //删除材料价格
        this.router.post(this.routerPrefix + "deleteMaterial", async(ctx, next) =>{
            let resBody = {"success": true, "description": "删除材料价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.deleteMaterial(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //新增材料价格
        this.router.post(this.routerPrefix + "addMaterials", async(ctx, next) =>{
            let resBody = {"success": true, "description": "新增材料价格成功"};
            try {
                let token = this.token || ctx.req.headers.token;//获取ajax token
                let body = ctx.request.body;
                resBody.data = await that.appService.addMaterials(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //获取个人设置的物料类型优先级
        this.router.get(this.routerPrefix+"getMyMaterials", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取个人设置的物料类型优先级成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                resBody.data = await that.appService.getMyMaterials(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //获取个人设置的紧急程度优先级
        this.router.get(this.routerPrefix+"getMyUrgency", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取个人设置的紧急程度优先级成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                resBody.data = await that.appService.getMyUrgency(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //保存推送优先级设置
        this.router.post(this.routerPrefix + "savePriority", async(ctx, next) =>{
            let resBody = {"success": true, "description": "推送优先级保存成功！"};
            try {
                let token = this.token || ctx.req.headers.token;
                let body = ctx.request.body;
                resBody.data = await that.appService.savePriority(body, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });

        //请求估价的修改记录
        this.router.get(this.routerPrefix+"getGjRecord", async(ctx, next) =>{
            let resBody = {"success": true, "description": "请求估价的修改记录成功！"};
            try{
                let token = this.token || ctx.req.headers.token;
                let body = ctx.query;
                let order_number = body.order_number;
                let order_type = body.order_type;
                let order_company = body.order_company;
                let material_num = body.material_num;
                resBody.data = await that.appService.getGjRecord(order_number,order_type,order_company,material_num,token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody;
        });
    }
}

module.exports = EvaluateController;