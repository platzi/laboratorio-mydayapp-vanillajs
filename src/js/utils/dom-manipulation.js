export const mainElementController = {
  getElement() {
    return document.querySelector(".main");
  },
  hide() {
    this.getElement().setAttribute("class", "main hidden");
  },
  show() {
    this.getElement().setAttribute("class", "main");
  },
};

export const footerElementController = {
  getElement() {
    return document.querySelector(".footer");
  },
  hide() {
    this.getElement().setAttribute("class", "footer hidden");
  },
  show() {
    this.getElement().setAttribute("class", "footer");
  },
};

export const todoElementController = {
  getElement() {
    return document.querySelector(".todo-list");
  },
};

export const taskElementController = {
  getElement() {
    return todoElementController.getElement().querySelectorAll("li");
  },
  hasElements() {
    return todoElementController.getElement().querySelectorAll("li").length;
  },
};

export const newTodoInputElementController = {
  getElement() {
    return document.querySelector(".new-todo");
  },
  getValue() {
    return this.getElement().value.trim();
  },
  setValue(value) {
    this.getElement().value = value;
  },
};
