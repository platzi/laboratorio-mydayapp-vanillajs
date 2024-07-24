import { STORE_KEY } from "../../constants/store";

export default class TodosObserver {
  #layout = null;
  #container = null;
  #counter = null;
  #storeService = null;

  constructor(layout, container, counter, storeService) {
    this.#layout = layout;
    this.#container = container;
    this.#counter = counter;
    this.#storeService = storeService;
  }

  update(todos, filteredTodos) {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!todos?.length) {
      this.#storeService.remove(STORE_KEY);
      return this.#layout.hide();
    }

    this.#layout.show();
    this.#container.render(filteredTodos);
    this.#counter.render(todos.filter((todo) => !todo.completed).length);
    this.#storeService.save(STORE_KEY, todos);
  }
}
