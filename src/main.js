// 导入vue实例
import Vue from "vue";
//导入 App 组件
import App from "./App";
//导入 vue router
import VueRouter from "vue-router";
//告诉vue使用vue-router路由组件
Vue.use(VueRouter);
//导入Hello组件
import Hello from "./components/Hello";
//导入About组件
import About from "./components/About";
import Param from "./components/param";
import Paramdetails from "./components/Paramdetails";
//定义路由表
const routes = [
    //对应Hello组件的路由地址
    { path: "/", component: Hello },
    //对应About组件的路由地址
    { path: "/about", component: About },
    { path: "/param", component: Param },
    { path: "/Paramdetails/:id", component: Paramdetails, name: "Paramdetails" }
];
// 创建路由器实例，并且传入`routes`变量作为路由。
// 你还可以传入别的参数，不过在这里尽量简单化就可以了
const router = new VueRouter({
    routes,
    mode: "history"
});
//设置路由守护
router.beforeEach((to, from, next) => {
    if (to.path == "/param") {
        if (localStorage.getItem("user") == undefined) {
            let user = prompt("请输入你的用户名");
            let pass = prompt("请输入你的密码");
            if (user == "username" && pass == "password") {
                localStorage.setItem("user", user);
                next();
            } else {
                alert("错误的信息");
                return;
            }
        }
    }
    next();
});
//实例化Vue实例
new Vue({
    //定义Vue绑定的跟元素
    el: "#app",
    //用<App/>代替根元素
    template: "<App/>",
    //声明App组件，这样上面的<App/>元素就可以生效
    components: { App },
    //将上面声明的路由器传递到根Vue实例
    router
}).$mount("#app"); //将这个实例挂载到id=app的根元素上