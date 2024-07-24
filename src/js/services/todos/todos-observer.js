import { STORE_KEY } from "../../constants/store";

export default class TodosObserver {
  #layout = null;
  #container = null;
  #counter = null;
  #storeService = null;
  #clearComplete = null;

  constructor(layout, container, counter, storeService, clearComplete) {
    this.#layout = layout;
    this.#container = container;
    this.#counter = counter;
    this.#storeService = storeService;
    this.#clearComplete = clearComplete;
  }

  update(todos, filteredTodos) {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!todos?.length) {
      this.#storeService.remove(STORE_KEY);
      return this.#layout.hide();
    }

    if (!todos.some((todo) => todo.completed)) {
      this.#clearComplete.classList.add("hidden");
    } else {
      this.#clearComplete.classList.remove("hidden");
    }

    this.#layout.show();
    this.#container.render(filteredTodos);
    this.#counter.render(todos.filter((todo) => !todo.completed).length);
    this.#storeService.save(STORE_KEY, todos);
  }
}
