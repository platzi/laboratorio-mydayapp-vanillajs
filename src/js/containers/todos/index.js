import InputService from "../../services/input";
import { renderTodos } from "./../../utils";

export default class TodosContainer {
  #todosService = null;
  #elements = null;

  constructor(todosService, elements) {
    this.#todosService = todosService;
    this.#elements = elements;
  }

  #registerEvents(element, todo) {
    const toggleElement = element.querySelector(".toggle");
    toggleElement.addEventListener("click", () => {
      this.#todosService.update(todo.id, {
        completed: !todo.completed,
      });
    });

    const removeElement = element.querySelector(".destroy");
    removeElement.addEventListener("click", () => {
      this.#todosService.remove(todo.id);
    });

    const labelElement = element.querySelector("label");
    labelElement.addEventListener("dblclick", () => {
      element.classList.remove("completed");
      element.classList.add("editing");
      const inputElement = element.querySelector(".edit");
      inputElement.focus();

      const inputService = new InputService();

      inputService
        .register(inputElement)
        .onEnter((title) => {
          this.#todosService.update(todo.id, {
            title,
          });
          element.classList.remove("editing");

          if (todo.completed) {
            element.classList.add("completed");
          }
        })
        .onEscape(() => {
          element.classList.remove("editing");
          inputElement.value = todo.title;

          if (todo.completed) {
            element.classList.add("completed");
          }
        });
    });
  }

  render(todos) {
    this.#elements.innerHTML = renderTodos(todos);

    for (let todo of todos) {
      const selector = `[data-todo-id="${todo.id}"]`;
      const todoElement = this.#elements.querySelector(selector);

      this.#registerEvents(todoElement, todo);
    }
  }
}
