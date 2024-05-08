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
