export default class Todo {
  #id = null;
  #title = "";
  #completed = false;

  id(id = null) {
    this.#id = id ? id : "todo-" + Date.now();

    return this;
  }

  title(title = "") {
    this.#title = title;

    return this;
  }

  completed(completed = false) {
    this.#completed = completed;

    return this;
  }

  build() {
    return {
      id: this.#id || "todo-" + Date.now(),
      title: this.#title,
      completed: this.#completed,
    };
  }
}
