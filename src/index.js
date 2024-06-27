import "./css/base.css";

// DOM elements
const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");
const todoInput = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const clearCompletedButton = document.querySelector(".clear-completed");
const filterAnchors = document.querySelectorAll(".filters a");

let tasks = getTasksFromLocalStorage();

window.onload = () => {
  updateTodoListView();
  toggleMainAndFooterView();
};

window.onpopstate = () => {
  updateTodoListView();
};

todoInput.onkeypress = (e) => {
  if (e.key !== "Enter") {
    return;
  }

  addTask(e.target.value);
  e.target.value = "";
};

filterAnchors.forEach((element) => {
  element.onclick = handleFilterClick;
});

clearCompletedButton.onclick = clearCompletedTasks;

function getTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("mydayapp-js"));
  return Array.isArray(tasks) ? tasks : [];
}

function saveTasksToLocalStorage() {
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
  updateTodoListView();
}

function toggleMainAndFooterView() {
  // hides the main and footer sections if the list is empty
  const tasksEmpty = tasks === null || tasks.length === 0;
  mainElement.hidden = tasksEmpty;
  footerElement.hidden = tasksEmpty;
}

function addTask(task) {
  // make sure the string isn't empty
  if (task.trim().length === 0) {
    return;
  }

  tasks.push({
    id: tasks.length + 1,
    title: task.trim(),
    completed: false,
  });

  saveTasksToLocalStorage();
}

function removeTask(task) {
  let taskIndex = tasks.findIndex((t) => t.id === task.id);
  tasks.splice(taskIndex, 1);
  saveTasksToLocalStorage();
}

function updateTodoListView() {
  // clear todo-list element
  todoList.textContent = ``;

  // get filter from route
  const filter = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  let filteredTasks = tasks;
  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task) => {
    // EXAMPLE
    //
    // <li data-task-id="1">
    //   <div class="view">
    //     <input class="toggle" type="checkbox" />
    //     <label>Buy a unicorn</label>
    //     <button class="destroy"></button>
    //   </div>
    //   <input class="edit" value="Buy a unicorn" />
    // </li>

    const li = document.createElement("li");
    li.dataset.taskId = task.id;
    if (task.completed) {
      li.classList.add("completed");
    }

    const div = document.createElement("div");
    div.classList.add("view");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.onchange = () => handleCheckBoxChange(checkBox, li, task);
    checkBox.classList.add("toggle");

    const label = document.createElement("label");
    label.textContent = task.title;
    label.ondblclick = () => enterEditing(li);

    const button = document.createElement("button");
    button.onclick = () => removeTask(task);
    button.classList.add("destroy");

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(button);

    const editInput = document.createElement("input");
    editInput.value = task.title;
    editInput.onkeydown = (e) => exitEditing(e, li, task);
    editInput.classList.add("edit");

    li.appendChild(div);
    li.appendChild(editInput);

    todoList.appendChild(li);
  });

  updateFilterList(filter);
  toggleMainAndFooterView();
  updatePendingCount();
}

function updateFilterList(filterName) {
  const compareText =
    filterName === "pending" || filterName === "completed" ? filterName : "";

  filterAnchors.forEach((element) => {
    const elementFilter = element.href.substring(
      element.href.lastIndexOf("/") + 1
    );

    if (elementFilter === compareText) {
      element.classList.add("selected");
      return;
    }

    element.classList.remove("selected");
  });
}

function updatePendingCount() {
  clearCompletedButton.hidden = true;

  let pendingTasks = 0;
  for (let task of tasks) {
    if (task.completed === false) {
      pendingTasks++;
      continue;
    }

    // enable clear-completed button if there is at least one completed task
    clearCompletedButton.hidden = false;
  }

  todoCount.textContent = "";

  const strongNumber = document.createElement("strong");
  strongNumber.textContent = pendingTasks;
  const textNode = document.createTextNode(
    pendingTasks === 1 ? " item left" : " items left"
  );

  todoCount.appendChild(strongNumber);
  todoCount.appendChild(textNode);
}

function handleCheckBoxChange(checkBox, taskElement, task) {
  if (checkBox.checked) {
    taskElement.classList.add("completed");
  } else {
    taskElement.classList.remove("completed");
  }

  task.completed = checkBox.checked;
  saveTasksToLocalStorage();
}

function enterEditing(taskElement) {
  taskElement.classList.add("editing");
  const editInput = taskElement.querySelector(".edit");
  editInput.focus();
}

function exitEditing(event, taskElement, task) {
  const label = taskElement.querySelector("label");

  switch (event.key) {
    case "Enter":
      // save changes
      label.textContent = event.target.value.trim();
      task.title = event.target.value.trim();
      saveTasksToLocalStorage();
      break;
    case "Escape":
      // discard changes
      event.target.value = task.title;
      break;
    default:
      return;
  }

  taskElement.classList.remove("editing");
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
}

function handleFilterClick(event) {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  updateTodoListView();
}
