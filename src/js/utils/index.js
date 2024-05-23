import {
  mainElementController,
  footerElementController,
  taskElementController,
  newTodoInputElementController,
  todoElementController,
} from "./dom-manipulation";
import { existTasksInTodoList, refreshItemsLength } from "./utils";

export const DOM = {
  controllers: {
    mainEl: mainElementController,
    footerEl: footerElementController,
    taskItemEl: taskElementController,
    newTodoInputEl: newTodoInputElementController,
    todoListEl: todoElementController,
  },
};

export const watcher = { existTasksInTodoList, refreshItemsLength };
