import "./css/base.css";
import { DOM, watcher } from "./js/utils";
import {
  taskStatusHandler,
  editTaskViewModeHandler,
  editTaskTitleHandler,
} from "./js/handlers/task.handlers";
import newTaskItemFactory from "./js/factory/new-task-item.factory";

function updateAndReloadApp() {
  watcher.existTasksInTodoList();
  watcher.refreshItemsLength();
}

DOM.controllers.newTodoInputEl
  .getElement()
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskTitle = DOM.controllers.newTodoInputEl.getValue();
      if (taskTitle) {
        newTaskItemFactory.addNewTodoTaskItem(taskTitle);
        DOM.controllers.newTodoInputEl.setValue("");
      } else {
        console.error("You can not create a task with empty title!");
      }
    }
    updateAndReloadApp();
  });

DOM.controllers.todoListEl.getElement().addEventListener("click", (e) => {
  const taskItemEl = e.target.parentNode.parentNode;
  taskStatusHandler(e, taskItemEl);
  editTaskViewModeHandler(e, taskItemEl);
  updateAndReloadApp();
});

DOM.controllers.todoListEl.getElement().addEventListener("keydown", (e) => {
  editTaskTitleHandler(e);
  updateAndReloadApp();
});

(function main() {
  updateAndReloadApp();
})();
