export default class TodosService {
  #todos = [];
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
    this.#observers.forEach((observer) => observer.update(this.#todos));
  }

  add(todo) {
    // Every todo must have an id: string, title: string, completed: boolean
    if (!todo) {
      throw new Error("Todo is required");
    }

    this.#todos.push(todo);
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

  get todos() {
    return this.#todos;
  }
}
