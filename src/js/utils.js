const newTask = document.querySelector(".new-todo");
const ulTodoList = document.querySelector(".todo-list");
const taskList = [];

export const sayHello = (text) => {
  if (ulTodoList) console.log(ulTodoList.childElementCount);
  return text;
};

export const displayHash = () => {
  let hashItemsFooter = window.location.hash;
  hashItemsFooter;
  return true;
};

export const createTask = () => {
  newTask.addEventListener("keydown", function (e) {
    newTask.value.trim();
    if (e.key === "Enter" && newTask.value !== "") {
      taskList.push({
        name: newTask.value,
        id: Math.floor(Math.random() * Date.now()),
        completed: false,
      });
      let objectTask = taskList.map((object) => object);
      localStorage.setItem("mydayapp-js", JSON.stringify(objectTask));
      objectTask = JSON.parse(localStorage.getItem("mydayapp-js"));
      allListTask(objectTask);
      removeTaskCompleted();
      newTask.value = "";
    }
  });
};

export const allListTask = (arrayTask) => {
  arrayTask = JSON.parse(localStorage.getItem("mydayapp-js"));
  const toRender = [];
  ulTodoList.innerHTML = "";
  if (arrayTask) {
    arrayTask.forEach((task) => {
      let li = document.createElement("li");
      li.className = "pending";
      let div = document.createElement("div");
      div.className = "view";
      let labelText = document.createElement("label");
      let button = document.createElement("button");
      button.className = "destroy";
      let inputCheckbox = document.createElement("input");
      inputCheckbox.className = "toggle";
      inputCheckbox.setAttribute("id", task.id);
      inputCheckbox.type = "checkbox";
      inputCheckbox.addEventListener("click", function (e) {
        if (e.target.id && inputCheckbox.checked) {
          li.classList.add("completed");
          li.classList.remove("pending");
        } else {
          li.classList.remove("completed");
          li.classList.add("pending");
        }
      });
      let inputEdit = document.createElement("input");
      inputEdit.className = "edit";
      inputEdit.placeholder = "Learn JavaScript";
      labelText.innerHTML = task.name;
      div.append(inputCheckbox, labelText, button);
      li.append(div, inputEdit);
      toRender.push(li);
      editingWork(li);
      removeTaskCompleted(arrayTask);
      window.localStorage.setItem(
        "mydayapp-js",
        JSON.stringify(Array.from(arrayTask.values()))
      );
    });
  }
  ulTodoList.append(...toRender);
  counterTaskPending(arrayTask);
};

export const counterTaskPending = (taskPending) => {
  taskPending = JSON.parse(localStorage.getItem("mydayapp-js"));
  const containerFooter = document.querySelector(".todo-count");
  containerFooter.innerHTML = "";
  const strong = document.createElement("strong");
  taskPending?.filter((item) => item.completed === false).length >= 1
    ? (strong.innerHTML = taskPending?.filter(
        (item) => item.completed === false
      ).length)
    : "";

  let message =
    taskPending?.filter((item) => item.completed === false).length > 1
      ? "items left"
      : taskPending?.filter((item) => item.completed === false).length === 1
      ? "item left"
      : taskPending?.filter((item) => item.completed === false).length < 1
      ? ""
      : "";

  containerFooter.append(strong, message);
  removeTaskCompleted(strong, message);
};

function editingWork(element) {
  element.children[0].addEventListener("dblclick", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentNode.parentNode.classList.add("editing");
  });
  element.children[1].addEventListener("keydown", (event) => {
    console.log(event, "event");
    if (event.key == "Enter") {
      element.children[0].children[1].textContent =
        element.children[1].value.trim();
      element.classList.remove("editing");
    }
  });
}

export const removeTaskCompleted = (arrayTask) => {
  const btnClearCompleted = document.querySelector(".clear-completed");
  btnClearCompleted.addEventListener("click", () => {
    document.querySelectorAll(".completed").forEach((event) => {
      localStorage.removeItem("mydayapp-js");
      event.remove();
      window.localStorage.setItem(
        "mydayapp-js",
        JSON.stringify(Array.from(arrayTask.values()))
      );
    });
    counterTaskPending();
  });
};

export const routes = () => {
  document
    .querySelector('.filters > li a[href="#/pending"]')
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
      for (let chill of document.querySelectorAll(".todo-list li")) {
        if (chill.classList.contains("completed")) {
          chill.classList.add("hidden");
        }
        if (
          !chill.classList.contains("completed") &&
          chill.classList.contains("hidden")
        ) {
          chill.classList.remove("hidden");
        }
      }
    });
  document
    .querySelector('.filters > li a[href="#/completed"]')
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
      for (let list of document.querySelectorAll(".todo-list li")) {
        if (!list.classList.contains("completed")) {
          list.classList.add("hidden");
        }
        if (
          list.classList.contains("completed") &&
          list.classList.contains("hidden")
        ) {
          list.classList.remove("hidden");
        }
      }
    });
  document
    .querySelector('.filters > li a[href="#/"]')
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
      for (let list of document.querySelectorAll(".todo-list li")) {
        if (list.classList.contains("hidden")) list.classList.remove("hidden");
      }
    });
  allListTask();
};

createTask();
allListTask();
counterTaskPending();
routes();
