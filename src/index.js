import "./css/base.css";

// DOM elements
const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");
const todoInput = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");

const tasks = [];

window.onload = () => {
  toggleMainAndFooterView();
};

todoInput.onkeypress = (e) => {
  if (e.key !== "Enter") {
    return;
  }

  addTask(e.target.value);
  e.target.value = "";
};

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

  updateTodoListView();
}

function removeTask(task) {
  let taskIndex = tasks.findIndex((t) => t.id === task.id);
  tasks.splice(taskIndex, 1);
  updateTodoListView();
}

function updateTodoListView() {
  // clear todo-list element
  todoList.textContent = ``;

  tasks.forEach((task) => {
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

  toggleMainAndFooterView();
  updatePendingCount();
}

function updatePendingCount() {
  let pendingTasks = 0;
  for (let task of tasks) {
    if (task.completed === false) {
      pendingTasks++;
    }
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

function handleCheckBoxChange(checkBox, liElement, task) {
  if (checkBox.checked) {
    liElement.classList.add("completed");
  } else {
    liElement.classList.remove("completed");
  }

  task.completed = checkBox.checked;
  updatePendingCount();
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
