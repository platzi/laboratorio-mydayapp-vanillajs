import "./css/base.css";

// DOM elements
const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");
const todoInput = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");

const tasks = [];

window.onload = () => {
  toggleMainAndFooterView();
};

todoInput.onkeypress = (e) => {
  if (e.code !== "Enter") {
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

  updateTodoList();
}

function updateTodoList() {
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
    checkBox.classList.add("toggle");

    const label = document.createElement("label");
    label.textContent = task.title;

    const button = document.createElement("button");
    button.classList.add("destroy");

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(button);

    const editInput = document.createElement("input");
    editInput.value = task.title;
    editInput.classList.add("edit");

    li.appendChild(div);
    li.appendChild(editInput);

    todoList.appendChild(li);
  });

  toggleMainAndFooterView();
}
