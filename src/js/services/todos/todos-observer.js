export default class TodosObserver {
  #layout = null;

  constructor(layout) {
    this.#layout = layout;
  }

  update(todos) {
    if (!this.#layout) {
      throw new Error("Main layout is required");
    }

    if (!todos?.length) {
      this.#layout.hide();
    }

    this.#layout.show();
    // TODO: Save todos to local storage
  }
}
