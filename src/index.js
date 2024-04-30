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
actualizarTareas();

console.log(sayHello("Hello"));
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
        console.log(Tareas[id]);
        id += 1;
        actualizarTareas();
    }
}

 function actualizarTareas(){
     todolist.innerHTML = "";
    if(Tareas.length == 0){
        main.classList.add("hidden");
        footer.classList.add("hidden");
    }else{
        main.classList.remove("hidden");
        footer.classList.remove("hidden");
        Tareas.forEach(x => {
            const pendingClonado = pending.cloneNode(true);
            pendingClonado.querySelector("#label").textContent = x.title;
            todolist.appendChild(pendingClonado);
        });
    }
    input.value = "";
}
 