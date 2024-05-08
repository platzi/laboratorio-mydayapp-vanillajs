export const taskStatusHandler = (e, taskItemEl) => {
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

let mouseClickState = 0;
let timeState = null;

export const editTaskViewModeHandler = (e, taskItemEl) => {
  if (e.target.tagName === "LABEL") {
    const checkboxEl = e.target.previousSibling.previousSibling;
    mouseClickState++;
    if (mouseClickState === 1) {
      timeState = setTimeout(() => {
        mouseClickState = 0;
      }, 500);
    }
    if (mouseClickState === 2 && !checkboxEl.checked) {
      taskItemEl.removeAttribute("class");
      taskItemEl.setAttribute("class", "editing");
      mouseClickState = 0;
      clearTimeout(timeState);
      const editInputEl = e.target.parentNode.nextSibling.nextSibling;
      editInputEl.focus();
    }
  }
};

export const editTaskTitleHandler = (e) => {
  const editInputFieldEl = e.target;
  if (editInputFieldEl.getAttribute("class") === "edit") {
    const taskItemEl = editInputFieldEl.parentNode;
    const labelEl =
      editInputFieldEl.previousSibling.previousSibling.querySelector("label");

    if (e.key === "Enter") {
      const freshInputValue = editInputFieldEl.value.trim();
      labelEl.innerHTML = freshInputValue;
      editInputFieldEl.setAttribute("value", freshInputValue);
      taskItemEl.removeAttribute("class");
    }
    if (e.key === "Escape" || e.key === "Esc") {
      editInputFieldEl.value = editInputFieldEl.getAttribute("value");
      taskItemEl.removeAttribute("class");
    }
  }
};
