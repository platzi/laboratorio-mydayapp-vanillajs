import { DOM } from "./";

export const existTasksInTodoList = () => {
  if (!DOM.controllers.taskItemEl.hasElements()) {
    DOM.controllers.mainEl.hide();
    DOM.controllers.footerEl.hide();
  } else {
    DOM.controllers.mainEl.show();
    DOM.controllers.footerEl.show();
  }
};

export const refreshItemsLength = () => {
  const sizeEls = DOM.controllers.taskItemEl.getPendingElements().length;
  const footerEl = DOM.controllers.footerEl.getElement();
  const itemsLeft = `${sizeEls > 1 || sizeEls === 0 ? "items" : "item"} left`;
  footerEl.querySelector(".todo-count").innerHTML = `<strong>${
    sizeEls ?? 0
  }</strong> ${itemsLeft}`;
};
