import "./css/base.css";
import { sayHello } from "./js/utils";

class Tarea{
    constructor(id, title, completed){
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

function guardarTareasEnLocalStorage() {
  localStorage.setItem('mydayapp-js', JSON.stringify(Tareas));
}

function cargarTareasDesdeLocalStorage() {
  const tareasGuardadas = localStorage.getItem('mydayapp-js');
  if (tareasGuardadas) {
    Tareas = JSON.parse(tareasGuardadas);
  }
}


let filtroActual = 'all';
let Tareas = [];
cargarTareasDesdeLocalStorage();
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const contador = document.querySelector("#contador");
const contadorTexto = document.querySelector(".todo-count");
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
const clear = document.querySelector(".clear-completed");
const Ball = document.querySelector("#all");
const Bpending = document.querySelector("#pending");
const Bcompleted = document.querySelector("#completed");



let tareasFiltradas = [];
function handleHashChange(){
    const hash = window.location.hash.slice(1); // Obtiene la parte hash de la URL sin el '#'
    filtroActual = hash;
    tareasFiltradas = Tareas; // Mostrar todas las tareas
    if (hash === '/pending') {
    tareasFiltradas = Tareas.filter(tarea => !tarea.completed); // Mostrar tareas pendientes
    Bpending.classList.add("selected");
    Ball.classList.remove("selected");
    Bcompleted.classList.remove("selected");
  } else if (hash === '/completed') {
    tareasFiltradas = Tareas.filter(tarea => tarea.completed); // Mostrar tareas completadas
    Bpending.classList.remove("selected");
    Ball.classList.remove("selected");
    Bcompleted.classList.add("selected");
  }else{
    Bpending.classList.remove("selected");
    Ball.classList.add("selected");
    Bcompleted.classList.remove("selected");
  }
  if(tareasFiltradas.some(tarea => tarea.completed)){
    clear.classList.remove('hidden');
  }else{
    clear.classList.add('hidden');
  }
  guardarTareasEnLocalStorage();
  actualizarTareas();
}

window.addEventListener('hashchange', handleHashChange);

// Función para inicializar la aplicación
function init() {
  // Manejar el hash actual en la URL cuando se carga la página
  handleHashChange();
}

// Llama a la función init para inicializar la aplicación cuando se carga la página
init();

actualizarTareas();
clear.addEventListener("click", function(){
  let tempArray = Tareas;
  Tareas = tempArray.filter(x => !x.completed);
  handleHashChange();
});

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      nuevaTarea();
    }
});

function nuevaTarea(){
    const title = input.value.trim();
    if(title != ""){
        let NuevaTarea = new Tarea(generarIdUnico(), title, false);
        Tareas.push(NuevaTarea);
        handleHashChange();
    }
}

function generarIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function actualizarTareas(){
  /* handleHashChange(); */
  todolist.innerHTML = "";
  if(tareasFiltradas.length === 0){
    main.classList.add("hidden");
    footer.classList.add("hidden");
    todolist.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
    todolist.classList.remove("hidden");
    tareasFiltradas.forEach((tarea, index) => {
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
      let numTareas = contarTareasPendientes();
      contador.textContent = numTareas;
      if(numTareas > 1 || numTareas === 0){
        contadorTexto.lastChild.nodeValue = " items left";
      }else{
        contadorTexto.lastChild.nodeValue = " item left";
      }
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
      clon.querySelector(".edit").value = Tareas[indice].title;
      clon.querySelector(".edit").setAttribute("data-task-id", taskId);
      todolist.appendChild(clon);
      clon.querySelector(".edit").focus();
      agregarEventListenerEdit();
    });
  });
  input.value = "";
}

function editarTarea(taskId, newValue){
  newValue = newValue.trim();
  Tareas[taskId].title = newValue;
  handleHashChange();
}

function borrarTarea(taskId){
  // Encontrar la tarea en el array Tareas usando su ID
  const index = Tareas.findIndex(tarea => tarea.id === taskId);
  if(index !== -1){
      Tareas.splice(index, 1); // Eliminar la tarea del array
      handleHashChange();
  }
}

function toggleTarea(taskId){
  let id = encontrarPosicionTareaPorId(taskId);
  if(Tareas[id].completed){
    Tareas[id].completed = false;
  }else{
    Tareas[id].completed = true;
  }
    handleHashChange();
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
        handleHashChange();
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
  tareasFiltradas.forEach((Tareas) => {
    if(!Tareas.completed) cont++;
  });
  return cont;
}
