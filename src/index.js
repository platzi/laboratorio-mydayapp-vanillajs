import "./css/base.css";

// DOM elements
const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");

const tasks = [];

window.onload = () => {
  if (tasks === null || tasks.length === 0) {
    mainElement.hidden = true;
    footerElement.hidden = true;
  }
};
