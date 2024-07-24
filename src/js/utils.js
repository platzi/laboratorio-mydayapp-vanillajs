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

export function filterTodos(todos, filter) {
  return todos.filter((todo) => {
    if (!filter) {
      return true;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    if (filter === "pending") {
      return !todo.completed;
    }
  });
}
