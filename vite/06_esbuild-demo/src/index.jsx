// import Server from "react-dom/server";

// let Greet = () => <h1>Hello, ESBuild!</h1>;

// console.log(Server.renderToString(<Greet />));

import React from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";

let Greet = () => <h1>Hello, ESBuild!</h1>;

render(<Greet />, document.getElementById("root"));