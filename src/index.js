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

/* function actualizarTareas(){
    if(Tareas.length == 0){
        main.classList.add("hidden");
        footer.classList.add("hidden");
    }
    input.value = "";
}
 */