import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes } from "single-spa-layout";

// 获取路由配置对象
const routes = constructRoutes(document.querySelector("#single-spa-layout"));

// 获取路由信息数组
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  }
})

// 遍历路由信息注册应用
applications.forEach(registerApplication);

// // registerApplication({
// //   name: "@single-spa/welcome",
// //   app: ,
// //   activeWhen: ["/"],
// // });

// registerApplication(
//   "@single-spa/welcome", 
//   () => System.import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"),
//   (location) => location.pathname === '/'
// );

// registerApplication({
//   name: "@yueluo/test",
//   app: () => System.import("@yueluo/test"),
//   activeWhen: ["/test"],
// });

// registerApplication({
//   name: "@yueluo/todos",
//   app: () => System.import("@yueluo/todos"),
//   activeWhen: ["/todos"],
// });

// registerApplication({
//   name: "@yueluo/realworld",
//   app: () => System.import("@yueluo/realworld"),
//   activeWhen: ["/realworld"],
// });

start({
  urlRerouteOnly: true,
});
