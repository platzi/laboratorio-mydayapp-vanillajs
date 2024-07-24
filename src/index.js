import "./css/base.css";
import MainLayout from "./js/layouts/main-layout";
import InputService from "./js/services/input";
import TodosService from "./js/services/todos";
import Todo from "./js/services/todos/todo";
import TodosObserver from "./js/services/todos/todos-observer";

(function main() {
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");
  const inputElement = document.querySelector(".new-todo");
  const todoListElement = document.querySelector(".todo-list");

  const mainLayout = new MainLayout(mainElement, footerElement);
  const todosService = new TodosService([]);
  const todosObserver = new TodosObserver(mainLayout, todoListElement);
  const inputService = new InputService();

  todosService.subscribe(todosObserver);
  inputService.register(inputElement).onKeypress((title) => {
    const todo = new Todo().id().title(title).completed(false).build();
    todosService.add(todo);
  });

  mainLayout.hide();
})();
