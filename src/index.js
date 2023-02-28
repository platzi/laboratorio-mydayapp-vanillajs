import {
  mainFooterDisplayValidator,
  generalTodoListGenerator,
} from "./js/utils";
import "./css/base.css";
import {
  clearCompleted,
  clearCompletedButtonValidator,
} from "./js/clearCompleted";

let todos = [];

const isMydayapp_js = JSON.parse(localStorage.getItem("mydayapp-js"));

if (!isMydayapp_js) localStorage.setItem("mydayapp-js", JSON.stringify(todos));

generalTodoListGenerator();
mainFooterDisplayValidator();
clearCompletedButtonValidator();

// const saveTodosInLocalStorage = () => {
//   localStorage.setItem("mydayapp-js", JSON.stringify(todos));
// };

// const getTodosFromLocalStorage = () => {
//   todos = JSON.parse(localStorage.getItem("maydayapp-js"));
// };

const newTodoInput = document.querySelector(".new-todo");

let newUserInput = "";

newTodoInput.addEventListener("input", (e) => {
  const userInput = e.target.value.trim();
  newUserInput = userInput;
});

newTodoInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    if (newUserInput.length < 1) return;
    todos = JSON.parse(localStorage.getItem("mydayapp-js"));
    todos?.push({ title: newUserInput, completed: false });
    localStorage.setItem("mydayapp-js", JSON.stringify(todos));
    generalTodoListGenerator();
    clearCompletedButtonValidator();

    e.target.value = "";
    newUserInput = "";
  }
  return;
});

const clearCompletedTarget = document.querySelector(".clear-completed");

clearCompletedTarget.addEventListener("click", () => {
  clearCompleted();
});
