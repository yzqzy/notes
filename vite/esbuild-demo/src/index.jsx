import Server from "react-dom/server";

let Greet = () => <h1>Hello, ESBuild!</h1>;

console.log(Server.renderToString(<Greet />));