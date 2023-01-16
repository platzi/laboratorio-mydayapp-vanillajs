export default class Storage {
  constructor() {}

  init() {}

  registerTask(key, text) {
    let storage = this.getStorage(key);
    let newIndex = this.getNewIndex(storage);
    this.addNewItem(storage, newIndex, text, key);
    return newIndex;
  }

  getNewIndex(value) {
    if (value === undefined || value === null) return 0;
    return JSON.parse(value).length;
  }

  getStorage(key) {
    return localStorage.getItem(key);
  }

  addNewItem(storage, index, value, key) {
    let newItem = {
      id: index,
      title: value.trim(),
      completed: false,
    };
    if (storage === null) storage = [];
    else storage = JSON.parse(storage);
    storage.push(newItem);
    let itemToStorage = JSON.stringify(storage);
    localStorage.setItem(key, itemToStorage);
  }

  getItemLeft(key) {
    let itemsLeft = this.getStorage(key);
    if (!itemsLeft) return 0;
    itemsLeft = JSON.parse(itemsLeft);
    return itemsLeft.length;
  }

  updateStateItem(key, id, state, text) {
    let storage = this.getStorage(key);
    let clearValue = JSON.parse(storage);
    clearValue.forEach((element) => {
      if (element.id == id) {
        element.completed = state === undefined ? element.completed : state;
        element.title = text === undefined ? element.title : text.trim();
      }
    });
    let itemToStorage = JSON.stringify(clearValue);
    localStorage.setItem(key, itemToStorage);
  }
}
