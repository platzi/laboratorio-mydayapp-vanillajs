import "./css/base.css";
import { STORE_KEY } from "./js/constants/store";
import TodosContainer from "./js/containers/todos";
import TodosConuterContainer from "./js/containers/todos/counter";
import MainLayout from "./js/layouts/main-layout";
import HashService from "./js/services/hash";
import InputService from "./js/services/input";
import StoreService from "./js/services/store";
import TodosService from "./js/services/todos";
import Todo from "./js/services/todos/todo";
import Todos from "./js/services/todos/todos";

(function main() {
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");
  const inputElement = document.querySelector(".new-todo");
  const todoListElement = document.querySelector(".todo-list");
  const todoCounterElement = document.querySelector(".todo-count");
  const clearCompletedElement = document.querySelector(".clear-completed");
  const filterElements = document.querySelectorAll(".filters a");

  const mainLayout = new MainLayout(mainElement, footerElement);
  const storeService = new StoreService();
  const todosService = new TodosService([]);
  const hashService = new HashService(todosService);
  const todosContainer = new TodosContainer(todosService, todoListElement);
  const counterContainer = new TodosConuterContainer(todoCounterElement);
  const todosObserver = new Todos()
    .layout(mainLayout)
    .container(todosContainer)
    .counter(counterContainer)
    .store(storeService)
    .clearComplete(clearCompletedElement)
    .filters(filterElements)
    .build();
  const inputService = new InputService();
  const todos = storeService.load(STORE_KEY) || [];

  todosService.subscribe(todosObserver);
  todosService.set(todos);
  inputService.register(inputElement).onEnter((title) => {
    const todo = new Todo().id().title(title).completed(false).build();
    todosService.add(todo);
  });

  clearCompletedElement.addEventListener("click", () => {
    todosService.clearCompleted();
  });

  hashService.register();
  hashService.check();
})();
