import "./css/base.css";
import {
  mainEl,
  footerEl,
  taskEl,
  newTodoInputEl,
  todoEl,
} from "./js/utils/dom-elements";
import newTaskItemFactory from "./js/factory/new-task-item.factory";

const existTasksInTodoList = () => {
  if (!taskEl.hasElements()) {
    mainEl.hide();
    footerEl.hide();
  } else {
    mainEl.show();
    footerEl.show();
  }
};

newTodoInputEl.getElement().addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskTitle = newTodoInputEl.getValue();
    if (taskTitle) {
      newTaskItemFactory.addNewTodoTaskItem(taskTitle);
      newTodoInputEl.setValue("");
      existTasksInTodoList();
    } else {
      console.error("You can not create a task with empty title!");
    }
  }
});

const handlePendingTaskStatus = (e, taskItemEl) => {
  if (
    e.target.tagName === "INPUT" &&
    e.target.getAttribute("type") === "checkbox"
  ) {
    if (e.target.checked) {
      e.target.setAttribute("checked", "");
      taskItemEl.setAttribute("class", "completed");
    } else {
      e.target.removeAttribute("checked");
      taskItemEl.removeAttribute("class");
    }
  }
};

let mouseClicks = 0;
let timer = null;

const handleEditTaskMode = (e, taskItemEl) => {
  if (e.target.tagName === "LABEL") {
    const checkboxEl = e.target.previousSibling.previousSibling;
    mouseClicks++;
    if (mouseClicks === 1) {
      timer = setTimeout(() => {
        mouseClicks = 0;
      }, 500);
    }
    if (mouseClicks === 2 && !checkboxEl.checked) {
      taskItemEl.removeAttribute("class");
      taskItemEl.setAttribute("class", "editing");
      mouseClicks = 0;
      clearTimeout(timer);
    }
  }
};

todoEl.getElement().addEventListener("click", (e) => {
  const taskItemEl = e.target.parentNode.parentNode;
  handlePendingTaskStatus(e, taskItemEl);
  handleEditTaskMode(e, taskItemEl);
});

(function () {
  existTasksInTodoList();
})();
