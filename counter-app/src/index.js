import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Counters from "./components/counters_v1";

// const element = <h1>Hello World</h1>; // This is JSX which is the same as - var element = React.createElement("h1", null, "Hello World"); - Babel converts JSX into the JS language that browser can understand, at compile time. That is, JSX is just syntactical sugar to make developers feel more at home when manipulating html elements from javascript code.
// console.log(element);
// // hot module loading - by default, react script is restarted when he hit save. Thus automatically reflects on the browser.

// ReactDOM.render(element, document.getElementById("root")); // render(<what to render>, <where to render>) - root element in the DOM is the container for our whole react app

ReactDOM.render(<Counters />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
