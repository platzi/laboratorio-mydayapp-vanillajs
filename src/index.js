import "./css/base.css";
import "./css/utils.scss";
import { utils, tasksCount, isCompletedTask, data} from "./js/utils.js";

const editData = {
    create: function ({ key, status, value = key }){
      data[key] = {
        status,
        value
      };
      saveLocalStorage();
    },
    editStatus: function ({ key, status }){
      data[key].status = status;
      saveLocalStorage();
    },
    editValue: function ({ oldKey, newKey, newValue = newKey}){
      data[newKey] = { ...data[oldKey] };
      data[newKey].value = newValue;
      delete data[oldKey];
      saveLocalStorage();
    },
    delete: function (key){
      delete data[key];
      saveLocalStorage();
    },
    deleteCompleted: function (){
      for (const key in data) {
        if (data[key].status == 'completed'){
          delete data[key];
          tasksCount.completed--;
        }
      }
      filterUrl();
      saveLocalStorage();
    }
};

function in_activeTodo (){
    if (tasksCount.all > 0){
        utils.todoContainer.classList.remove('inactive');
    } else {
        utils.todoContainer.classList.add('inactive');
    }
}

function createTask ({status = 'pending', value, isNewTask = true}){
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.classList.add('view');


    const inputCheck = document.createElement('input');
    inputCheck.classList.add('toggle');
    inputCheck.setAttribute('type', 'checkbox');

    inputCheck.addEventListener('change', (event) => {
        li.classList.toggle('completed');
        if (event.target.checked){
            tasksCount.completed++;
            tasksCount.pending--;
            editData.editStatus({key: label.textContent, status: 'completed'});
        } else {
            tasksCount.completed--;
            tasksCount.pending++;
            editData.editStatus({key: label.textContent, status: 'pending'});
        }
        filterUrl();
        printItem_sCount();
        in_activeClearButton();
    });


    const label = document.createElement('label');
    label.innerText = value;

    label.addEventListener('dblclick', () => {
        if (li.classList.contains('completed')) {
            li.classList.replace('completed', 'editing');
            isCompletedTask.value = true;
        } else {
            li.classList.add('editing');
        }
        inputEdit.focus();
    });
    

    const button = document.createElement('button');
    button.classList.add('destroy');

    button.addEventListener('click', (event) => {
        if (event.target.parentNode.parentNode.classList.contains('completed')){
            tasksCount.completed--;
        } else {
            tasksCount.pending--;
        }
        tasksCount.all--;
        editData.delete(label.textContent);
        utils.todoList.removeChild(event.target.parentNode.parentNode);
        printItem_sCount(); in_activeClearButton(); in_activeTodo();
    });
    

    const inputEdit = document.createElement('input');
    inputEdit.classList.add('edit');
    inputEdit.value = value;

    inputEdit.addEventListener('keyup', (event) => {
        const newValue = inputEdit.value.trim();
        if (newValue != '') {
            if (event.keyCode === 13){
                editData.editValue({oldKey: label.textContent, newKey: newValue});
                label.innerText = newValue;
                if (isCompletedTask.value == true){
                    li.classList.replace('editing', 'completed');
                    isCompletedTask.value = false;
                } else {
                    li.classList.remove('editing');
                }

            } else if (event.keyCode === 27) {
                if (isCompletedTask.value == true){
                    li.classList.replace('editing', 'completed');
                    isCompletedTask.value = false;
                } else {
                    li.classList.remove('editing');
                }
                inputEdit.value = label.textContent;
            }
        }
    });

    if (status == 'completed'){
        li.classList.add('completed');
        inputCheck.checked = true;
    }

    div.append(inputCheck, label, button);
    li.append(div, inputEdit);
    utils.todoList.append(li);

    if (isNewTask){
        ++tasksCount.all;
        ++tasksCount.pending;
        editData.create({key: value, status: 'pending'});
    }

    utils.todoInput.value = '';
    in_activeTodo();
    printItem_sCount();
    in_activeClearButton();
}

function printItem_sCount (){
    let item_s;
    switch (tasksCount.pending) {
        case 1:
            item_s = 'item';
            break;
        default:
            item_s = 'items';
    }

    utils.todoCount.innerHTML = `<strong>${tasksCount.pending}</strong> ${item_s} left`;
}
printItem_sCount();

function in_activeClearButton(){
    if (tasksCount.completed > 0){
        utils.buttonClear.classList.remove('inactive');
    } else {
        utils.buttonClear.classList.add('inactive');
    }
}

function saveLocalStorage (){
    localStorage.setItem('mydayapp-js', JSON.stringify(data));
    localStorage.setItem('counter', JSON.stringify(tasksCount));
}

function filterUrl () {
  const dataStorage = localStorage.getItem('mydayapp-js');

  if (location.hash == '#/' || location.hash == '#/all') {
    utils.todoList.innerHTML = '';
    const dataStorageObj = JSON.parse(dataStorage);
    for (const key in dataStorageObj) {
      createTask({status: dataStorageObj[key].status, value: dataStorageObj[key].value, isNewTask: false})
    }
    filterClass();
    return;
  }
  if (location.hash == '#/pending'){
    utils.todoList.innerHTML = '';
    const dataStorageObj = JSON.parse(dataStorage);
    for (const key in dataStorageObj) {
      if (dataStorageObj[key].status == 'pending'){
        createTask({status: dataStorageObj[key].status, value: dataStorageObj[key].value, isNewTask: false})
      }
    }
    filterClass();
    return;
  }
  if (location.hash == '#/completed'){
    utils.todoList.innerHTML = '';
    const dataStorageObj = JSON.parse(dataStorage);
    for (const key in dataStorageObj) {
      if (dataStorageObj[key].status == 'completed'){
        createTask({status: dataStorageObj[key].status, value: dataStorageObj[key].value, isNewTask: false})
      }
    }
    filterClass();
    return;
  }
}

function filterClass (){
  if (location.hash == '#/' || location.hash == '#/all') {
    utils.filters.all.className = 'selected';
    utils.filters.pending.className = '';
    utils.filters.completed.className = '';
    return;
  }  
  if (location.hash == '#/pending'){
    utils.filters.all.className = '';
    utils.filters.pending.className = 'selected';
    utils.filters.completed.className = '';
    return;
  }
  if (location.hash == '#/completed'){
    utils.filters.all.className = '';
    utils.filters.pending.className = '';
    utils.filters.completed.className = 'selected';
    return;
  }
}
filterClass();

utils.todoInput.addEventListener('keyup', (event) => {
    const inputValue = event.target.value.trim();
    if (event.keyCode === 13 && inputValue != ''){
      location.hash = '#/all';
      createTask({value: inputValue});
    }
});

utils.buttonClear.addEventListener('click', () => {
    const tasksCompleted = document.querySelectorAll('.todo-list .completed');
    editData.deleteCompleted();
    tasksCompleted.forEach((element => {
        utils.todoList.removeChild(element);
        tasksCount.all--; tasksCount.completed--;
    }));
    in_activeClearButton();
    in_activeTodo();
    saveLocalStorage();
})

window.addEventListener('hashchange', filterUrl);

if (localStorage.getItem('mydayapp-js')){
    filterUrl();
}