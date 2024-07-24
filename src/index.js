import "./css/base.css";
import MainLayout from "./js/main-layout";

(function main() {
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");

  const mainLayout = new MainLayout(mainElement, footerElement);

  mainLayout.hide();
})();
