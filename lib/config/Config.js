/**
 * Created by xufeng.yang on 2016/4/25.
 */
module.exports = {
    develop: {//开发环境配置项
        tmplsPath: "../webapp/vue2/develop/html",//模板地址迁移出项目
        staticPath: "../webapp/vue2/develop",//静态资源路径迁移出项目
        apiUrl: "http://172.30.8.1:3000",
        passportApiUrl: "http://172.30.1.118:7900/oneclick-services-passport",
        estimateApiUrl:"http://es.hc.com",
        serverPort: 6002,
        loginUrl: "http://127.0.0.1:3001/login"//登录页面
    },
    test: {//测试环境配置项
        tmplsPath: "./test/html",
        staticPath: "./test",
        apiUrl: "http://172.30.8.1:3000",
        passportApiUrl: "http://172.30.1.118:7900/oneclick-services-passport",
        estimateApiUrl:"http://es.hc.com",
        serverPort: 6002,
        loginUrl: "http://app.ps-test.hc.com/login"//登录页面
    },
    product: {//生产环境配置项
        tmplsPath: "./product/html",  //模板地址
        staticPath: "./product", //静态资源路径
        apiUrl: "http://10.20.1.45:7900/harmontronics-erp",
        passportApiUrl: "http://10.20.1.45:7900/oneclick-services-passport",
        estimateApiUrl:"http://estimate-api.harmontronics.com",
        serverPort: 6002,
        loginUrl: "https://passport.harmontronics.com/login"//登录页面
    }
};