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
import elements from "./js/services/elements";

(function main() {
  const mainLayout = new MainLayout(elements.main, elements.footer);
  const storeService = new StoreService();
  const todosService = new TodosService([]);
  const hashService = new HashService(todosService);
  const todosContainer = new TodosContainer(todosService, elements.todoList);
  const counterContainer = new TodosConuterContainer(elements.todoCounter);
  const todosObserver = new Todos()
    .layout(mainLayout)
    .container(todosContainer)
    .counter(counterContainer)
    .store(storeService)
    .clearComplete(elements.clearCompleted)
    .filters(elements.filters)
    .build();
  const inputService = new InputService();
  const todos = storeService.load(STORE_KEY) || [];

  todosService.subscribe(todosObserver);
  todosService.set(todos);
  inputService.register(elements.input).onEnter((title) => {
    const todo = new Todo().id().title(title).completed(false).build();
    todosService.add(todo);
  });

  elements.clearCompleted.addEventListener("click", () => {
    todosService.clearCompleted();
  });

  hashService.register();
  hashService.check();
})();
