import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: ,
//   activeWhen: ["/"],
// });

registerApplication(
  "@single-spa/welcome", 
  () => System.import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"),
  (location) => location.pathname === '/'
);

registerApplication({
  name: "@yueluo/test",
  app: () => System.import("@yueluo/test"),
  activeWhen: ["/test"],
});

registerApplication({
  name: "@yueluo/todos",
  app: () => System.import("@yueluo/todos"),
  activeWhen: ["/todos"],
});

registerApplication({
  name: "@yueluo/realworld",
  app: () => System.import("@yueluo/realworld"),
  activeWhen: ["/realworld"],
});

// registerApplication({
//   name: "@yueluo/navbar",
//   app: () => System.import("@yueluo/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
