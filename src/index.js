import "./css/base.css";

import { sayHello } from "./js/utils";
let id = 0;
class Tarea{
    constructor(id, title, completed){
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

let Tareas = [];
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const li = document.createElement("li");
const todolist = document.querySelector("#real");
const completed = document.querySelector(".completed");
const pending = document.querySelector("#pending");
const editing = document.querySelector(".editing");
const input = document.querySelector(".new-todo");
let destroy = document.querySelectorAll(".destroy");
let toggle = document.querySelectorAll(".toggle");
let label = document.querySelectorAll("#label");
let edit = document.querySelectorAll(".edit");

actualizarTareas();

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      nuevaTarea();
    }
});

function nuevaTarea(){
    const title = input.value.trim();
    if(title != ""){
        let NuevaTarea = new Tarea(id.toString(), input.value, false);
        Tareas.push(NuevaTarea);
        id += 1;
        actualizarTareas();
    }
}

function actualizarTareas(){
  todolist.innerHTML = "";
  if(Tareas.length === 0){
    main.classList.add("hidden");
    footer.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
    Tareas.forEach((tarea, index) => {
      let clon;
      if(tarea.completed){
        clon = completed.cloneNode(true);
      }else{
        clon = pending.cloneNode(true);
      }
      clon.querySelector("#label").textContent = tarea.title;
      // Asignar un ID único a cada tarea
      clon.querySelector("#label").setAttribute("data-task-id", tarea.id);
      clon.querySelector(".destroy").setAttribute("data-task-id", tarea.id);
      clon.querySelector(".toggle").setAttribute("data-task-id", tarea.id);
      todolist.appendChild(clon);
    });
  }
  destroy = document.querySelectorAll(".destroy");
  destroy.forEach(function(element) {
    element.addEventListener('click', function() {
      // Obtener el ID de la tarea a eliminar
      const taskId = element.getAttribute("data-task-id");
      borrarTarea(taskId);
    });
  });
  toggle = document.querySelectorAll(".toggle");
  toggle.forEach(function(element) {
    element.addEventListener('click', function() {
      // Obtener el ID de la tarea a eliminar
      const taskId = element.getAttribute("data-task-id");
      toggleTarea(taskId);
    });
  });
  label = document.querySelectorAll("#label");
  label.forEach(function(element) {
    element.addEventListener('dblclick', function() {
      // Obtener el ID de la tarea a eliminar
      const taskId = element.getAttribute("data-task-id");
      console.log(taskId);
      todolist.innerHTML = "";
      let clon = pending.cloneNode(true);
      clon.querySelector("#label").textContent = Tareas[taskId].title;
      todolist.appendChild(clon);
      clon = editing.cloneNode(true);
      clon.querySelector(".edit").setAttribute("data-task-id", taskId);
      todolist.appendChild(clon);
      clon.querySelector(".edit").focus();
      agregarEventListenerEdit();
    });
  });
  input.value = "";
}

function editarTarea(taskId, newValue){
  Tareas[taskId].title = newValue;
  actualizarTareas();
}

function borrarTarea(taskId){
  // Encontrar la tarea en el array Tareas usando su ID
  const index = Tareas.findIndex(tarea => tarea.id === taskId);
  if(index !== -1){
      Tareas.splice(index, 1); // Eliminar la tarea del array
      actualizarTareas();
  }
}

function toggleTarea(taskId){
  if(Tareas[taskId].completed){
    Tareas[taskId].completed = false;
  }else{
    Tareas[taskId].completed = true;
  }
  actualizarTareas();
}

function agregarEventListenerEdit() {
  const edits = document.querySelectorAll(".edit");
  edits.forEach(function (element) {
    element.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const taskId = element.getAttribute("data-task-id");
        const newValue = element.value;
        console.log(taskId, newValue);
        editarTarea(taskId, newValue);
      }
    });
  });
  edits.forEach(function (element) {
    element.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        actualizarTareas();
      }
    });
  });
}

