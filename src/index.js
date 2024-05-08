import "./css/base.css";
import { DOM, watchers } from "./js/utils";
import {
  taskStatusHandler,
  editTaskViewModeHandler,
  editTaskTitleHandler,
} from "./js/handlers/task.handlers";
import newTaskItemFactory from "./js/factory/new-task-item.factory";

DOM.controllers.newTodoInputEl
  .getElement()
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskTitle = DOM.controllers.newTodoInputEl.getValue();
      if (taskTitle) {
        newTaskItemFactory.addNewTodoTaskItem(taskTitle);
        DOM.controllers.newTodoInputEl.setValue("");
        watchers.existTasksInTodoList();
      } else {
        console.error("You can not create a task with empty title!");
      }
    }
  });

DOM.controllers.todoListEl.getElement().addEventListener("click", (e) => {
  const taskItemEl = e.target.parentNode.parentNode;
  taskStatusHandler(e, taskItemEl);
  editTaskViewModeHandler(e, taskItemEl);
});

DOM.controllers.todoListEl.getElement().addEventListener("keydown", (e) => {
  editTaskTitleHandler(e);
});

(function main() {
  watchers.existTasksInTodoList();
})();
