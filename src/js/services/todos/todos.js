import TodosObserver from "./todos-observer";

export default class Todos {
  #layout = null;
  #container = null;
  #counter = null;
  #storeService = null;
  #clearComplete = null;

  layout(layout) {
    this.#layout = layout;

    return this;
  }

  container(container) {
    this.#container = container;

    return this;
  }

  counter(counter) {
    this.#counter = counter;

    return this;
  }

  store(storeService) {
    this.#storeService = storeService;

    return this;
  }

  clearComplete(clearComplete) {
    this.#clearComplete = clearComplete;

    return this;
  }

  build() {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!this.#container) {
      throw new Error("Todos container is required");
    }

    if (!this.#counter) {
      throw new Error("Counter container is required");
    }

    if (!this.#storeService) {
      throw new Error("Store service is required");
    }

    return new TodosObserver(
      this.#layout,
      this.#container,
      this.#counter,
      this.#storeService,
      this.#clearComplete
    );
  }
}
