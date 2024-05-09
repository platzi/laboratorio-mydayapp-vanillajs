import "./css/base.css";

import { sayHello } from "./js/utils";
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
const contador = document.querySelector("#contador");
const li = document.createElement("li");
const todolist = document.querySelector(".todo-list");
const completed = document.querySelector(".completed");
const pending = document.querySelector("#default");
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
        let NuevaTarea = new Tarea(generarIdUnico(), input.value, false);
        Tareas.push(NuevaTarea);
        actualizarTareas();
    }
}

function generarIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function actualizarTareas(){
  todolist.innerHTML = "";
  if(Tareas.length === 0){
    main.classList.add("hidden");
    footer.classList.add("hidden");
    todolist.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
    todolist.classList.remove("hidden");
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
      contador.textContent = contarTareasPendientes();
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
      // marcar como completada o desmarcar, tarea.
      const taskId = element.getAttribute("data-task-id");
      toggleTarea(taskId);
    });
  });
  label = document.querySelectorAll("#label");
  label.forEach(function(element) {
    element.addEventListener('dblclick', function() {
      // Editar Tarea
      const taskId = element.getAttribute("data-task-id");
      console.log(taskId);
      todolist.innerHTML = "";
      let clon = pending.cloneNode(true);
      let indice = encontrarPosicionTareaPorId(taskId);
      clon.querySelector("#label").textContent = Tareas[indice].title;
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
  let id = encontrarPosicionTareaPorId(taskId);
  if(Tareas[id].completed){
    Tareas[id].completed = false;
  }else{
    Tareas[id].completed = true;
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
        const id = encontrarPosicionTareaPorId(taskId);
        editarTarea(id, newValue);
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

function encontrarPosicionTareaPorId(id) {
  for (let i = 0; i < Tareas.length; i++) {
      if (Tareas[i].id === id) {
          return i;
      }
  }
  return -1; // Devuelve -1 si no se encuentra ninguna tarea con ese ID
}

function contarTareasPendientes(){
  let cont = 0;
  Tareas.forEach((Tareas) => {
    if(!Tareas.completed) cont++;
  });
  return cont;
}
