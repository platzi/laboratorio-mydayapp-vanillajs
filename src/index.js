import "./css/base.css";
import MainLayout from "./js/layouts/main-layout";
import TodosService from "./js/services/todos";
import TodosObserver from "./js/services/todos/todos-observer";

(function main() {
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");

  const mainLayout = new MainLayout(mainElement, footerElement);
  const todosService = new TodosService([]);
  const todosObserver = new TodosObserver(mainLayout);

  todosService.subscribe(todosObserver);

  mainLayout.hide();
})();
