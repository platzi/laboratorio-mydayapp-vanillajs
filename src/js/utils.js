import { getTodo, addTodo, updateTodo } from "./store"
import { todoTemplateCreator } from "./templates"

export const addTodoController = (text) => {
  // Validacion de texto
  const newTodoText = text.trim();
  if (!newTodoText) return;
  // Agrega TODO al estado global
  const newTodo = addTodo(newTodoText);
  // Creacion de nodo
  const $todoElement = document.createElement(null);
  const todoTemplate = todoTemplateCreator(newTodo);
  $todoElement.innerHTML = todoTemplate;
  // Agrega eventos al nodo
  const $todoStatusCheckbox = $todoElement.querySelector("input.toggle");
  const $todoLabel = $todoElement.querySelector("label");
  const $todoEditInput = $todoElement.querySelector("input.edit");
  $todoStatusCheckbox.addEventListener("change", (e) => updateTodoStatus(newTodo.id, e.target.checked));
  $todoLabel.addEventListener("dblclick", () => activateTodoEditMode(newTodo.id));
  $todoEditInput.addEventListener("focusout", () => disableTodoEditMode(newTodo.id));
  $todoEditInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") updateTodoText(newTodo.id, e.target.value);
    if (e.key === "Escape") $todoEditInput.blur();
  })
  // Agrega nodo al HTML
  const $todoList = document.querySelector(".todo-list");
  $todoList.appendChild($todoElement.firstElementChild);
}

export const updateTodoText = (todoId, text) => {
  // Validacion de texto
  const newTodoText = text.trim();
  if (!newTodoText) return;
  // Actualiza TODO en el estado global
  updateTodo(todoId, { text: newTodoText });
  // Actualiza TODO en el HTML y deshabilita modo edicion
  const $todoContainer =  document.querySelector(`li[data-todo-id="${todoId}"]`);
  const $todoLabel =  $todoContainer.querySelector(`label`);
  const $todoEditInput =  $todoContainer.querySelector(`input.edit`);
  $todoLabel.innerHTML = newTodoText;
  $todoEditInput.blur();
}

export const updateTodoStatus = (todoId, isCompleted) => {
  // Actualizar TODO en el estado global
  updateTodo(todoId, { completed: isCompleted });
  // Modificando estilos de HTML
  const $todoContainer = document.querySelector(`li[data-todo-id="${todoId}"]`);
  if (isCompleted) $todoContainer.classList.add("completed");
  else $todoContainer.classList.remove("completed");
}

export const activateTodoEditMode = (todoId) => {
  /// Modificando estilos de HTML
  const $todoContainer = document.querySelector(`li[data-todo-id="${todoId}"]`);
  $todoContainer.classList.add("editing");
  // Establece foco en input de edicion y como valor el texto actual del TODO
  const $todoEditInput = $todoContainer.querySelector("input.edit");
  $todoEditInput.value = getTodo(todoId).text;
  $todoEditInput.focus();
}

export const disableTodoEditMode = (todoId) => {
  // Modificando estilos de HTML
  const $todoContainer =  document.querySelector(`li[data-todo-id="${todoId}"]`);
  $todoContainer.classList.remove("editing");
}