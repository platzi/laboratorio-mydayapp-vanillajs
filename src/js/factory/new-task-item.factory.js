import { DOM } from "../utils";

class NewTaskItemFactory {
  createCheckBoxElement() {
    const checkBoxElement = document.createElement("input");
    checkBoxElement.setAttribute("class", "toggle");
    checkBoxElement.setAttribute("type", "checkbox");
    checkBoxElement.checked = false;
    return checkBoxElement;
  }

  createLabelElement() {
    const labelElement = document.createElement("label");
    return labelElement;
  }

  createDestroyButtonElement() {
    const destroyButtonElement = document.createElement("button");
    destroyButtonElement.setAttribute("class", "destroy");
    return destroyButtonElement;
  }

  createEditInputFieldElement() {
    const editInputFieldElement = document.createElement("button");
    editInputFieldElement.setAttribute("class", "edit");
  }

  createDivWrapperElement() {
    const divWrapperElement = document.createElement("div");
    divWrapperElement.setAttribute("class", "view");
    return divWrapperElement;
  }

  createTaskItemElement() {
    const taskItemElement = document.createElement("li");
    return taskItemElement;
  }

  addNewTodoTaskItem(taskTitle) {
    const taskTitleNode = document.createTextNode(taskTitle);

    const checkBoxEl = this.createCheckBoxElement();
    const labelEl = this.createLabelElement();
    const destroyBtnEl = this.createDestroyButtonElement();
    const editInputEl = this.createDestroyButtonElement();
    const divWrapperEl = this.createDivWrapperElement();
    const taskItemEl = this.createTaskItemElement();

    labelEl.appendChild(taskTitleNode);
    divWrapperEl.appendChild(checkBoxEl);
    divWrapperEl.appendChild(labelEl);
    divWrapperEl.appendChild(destroyBtnEl);

    taskItemEl.appendChild(divWrapperEl);
    taskItemEl.appendChild(editInputEl);

    DOM.controllers.todoListEl.getElement().appendChild(taskItemEl);
  }
}

export default new NewTaskItemFactory();
