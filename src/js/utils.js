export const sayHello = (text) => {
  return text;
};

export function renderTodos(todos) {
  return todos
    .map(function (todo) {
      const status = todo.completed ? "completed" : "";

      return `
        <li class="${status}" data-todo-id="${todo.id}">
          <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completed ? "checked" : ""
            } />
            <label>${todo.title}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todo.title}" />
        </li>
      `;
    })
    .join("");
}
