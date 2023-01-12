import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";
import { navegation } from "./js/navegationBtn";


const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));
export let todoList = localArrTodo || [];
window.addEventListener('DOMContentLoaded', () => {
  location.hash = "#/all"
  navegation()
  if (todoList) {
    newItem(todoList)
    console.log('lenght', todoList);
  }
})

let newTodo = document.querySelector(".new-todo");
const clearCompleteBtn = document.querySelector(".clear-completed");
const ul = document.querySelector(".todo-list");


export let completedTodos = [];
export let pendingTodos = [];
// const inputList = document.querySelectorAll('.toggle')
// console.log(inputList)

newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (newTodo.value != 0) {
      todoList.push({
        tarea: newTodo.value.trim(),
        completed: false,
        visible: true,
      });
      localStorage.setItem('mydayapp-js', JSON.stringify(todoList));

      newItem(todoList);
    } else {
      alert("Write something")
    }
  }

});


export function btnClearCompletedVisible() {
  const completedList = todoList.filter(element => element.completed === true);

  if (completedList.length != 0) {
    clearCompleteBtn.classList.remove("hidden")
  } else {
    clearCompleteBtn.classList.add("hidden")
  }

}
clearCompleteBtn.addEventListener("click", () => {
  const completedList = todoList.filter(element => element.completed === false)
  todoList = completedList
  localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
  newItem(todoList);


})
window.addEventListener("hashchange", navegation)
