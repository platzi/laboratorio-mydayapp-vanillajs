import { filterTodos } from "../../utils";

export default class TodosService {
  #todos = [];
  #filter = "";
  #observers = [];

  constructor(todos = []) {
    this.#todos = todos;
    this.notify();
  }

  subscribe(observer) {
    if (!observer || typeof observer?.update !== "function") {
      throw new Error("Observer must have an update method");
    }

    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter(
      (currentObserver) => currentObserver !== observer
    );
  }

  notify() {
    const filteredTodos = filterTodos(this.#todos, this.#filter);

    this.#observers.forEach((observer) =>
      observer.update(this.#todos, filteredTodos)
    );
  }

  add(todo) {
    if (!todo) {
      throw new Error("Todo is required");
    }

    this.#todos.push(todo);
    this.notify();
  }

  set(todos) {
    if (!Array.isArray(todos)) {
      throw new Error("Todos must be an array");
    }

    this.#todos = todos;
    this.notify();
  }

  remove(todoId) {
    if (!todoId) {
      throw new Error("Todo ID is required");
    }

    const todoIndex = this.#todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }

    this.#todos = this.#todos.filter((todo) => todo.id !== todoId);
    this.notify();
  }

  update(todoId, data) {
    if (!todoId) {
      throw new Error("Todo ID is required");
    }

    const todoIndex = this.#todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }

    this.#todos[todoIndex] = {
      ...this.#todos[todoIndex],
      ...data,
    };

    this.notify();
  }

  clearCompleted() {
    const pendingTodos = this.#todos.filter((todo) => !todo.completed);
    this.set(pendingTodos);
  }

  get todos() {
    return this.#todos;
  }

  changeFilter(filter) {
    this.#filter = filter;

    this.notify();
  }
}
