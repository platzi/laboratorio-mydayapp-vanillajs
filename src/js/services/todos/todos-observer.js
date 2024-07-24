import { renderTodos } from "../../utils";

export default class TodosObserver {
  #layout = null;
  #elements = null;

  constructor(layout, elements) {
    this.#layout = layout;
    this.#elements = elements;
  }

  update(todos) {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!todos?.length) {
      this.#layout.hide();
    }

    this.#layout.show();
    this.#elements.innerHTML = renderTodos(todos);
    // TODO: Save todos to local storage
  }
}
