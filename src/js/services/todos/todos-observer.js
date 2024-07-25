import { STORE_KEY } from "../../constants/store";

export default class TodosObserver {
  #layout = null;
  #container = null;
  #counter = null;
  #storeService = null;
  #clearComplete = null;
  #filters = null;

  constructor(
    layout,
    container,
    counter,
    storeService,
    clearComplete,
    filters
  ) {
    this.#layout = layout;
    this.#container = container;
    this.#counter = counter;
    this.#storeService = storeService;
    this.#clearComplete = clearComplete;
    this.#filters = filters;
  }

  #handleClearCompleted(todos) {
    if (!todos.some((todo) => todo.completed)) {
      this.#clearComplete.classList.add("hidden");
    } else {
      this.#clearComplete.classList.remove("hidden");
    }
  }

  #handleFilter(filter) {
    this.#filters.forEach((filterElement) => {
      if (filterElement.hash === `#/${filter}`) {
        filterElement.classList.add("selected");
      } else {
        filterElement.classList.remove("selected");
      }
    });
  }

  update(todos, filtered) {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!todos?.length) {
      this.#storeService.remove(STORE_KEY);
      return this.#layout.hide();
    }

    this.#handleClearCompleted(todos);
    this.#handleFilter(filtered.filter);

    this.#layout.show();
    this.#container.render(filtered.todos);
    this.#counter.render(todos.filter((todo) => !todo.completed).length);
    this.#storeService.save(STORE_KEY, todos);
  }
}
