import "./css/base.css";
import { Crud } from "./js/Crud";

const commons = {
    ENTER_CODE: 13,
    ESC_CODE: 27,
    LOCAL_STORAGE_KEY: 'mydayapp-js'
}

import './test';
class MyApp {

    tasks = []
    crud
    areTasksCompleted = true;
    isDefaultRoute = () => window.location.hash === '#/' || window.location.hash === '';
    isPendingRoute = () => window.location.href.includes('pending');
    isCompletedRoute = () => window.location.href.includes('completed');

    constructor(crud) {
        this.crud = crud
        const initActions = [
            () => this.getAllTasks(),
            () => this.getNumberOfTasksPending(),
            () => this.detectUrlChanges(),
            () => this.setClassSelectedToBtns(),
            () => this.verifyBtnTasks()
        ];

        this.initializeApp(initActions)();
    }

    initializeApp = (actions) => () => {
        actions.forEach(action => action());
    }

    taskOperation = (operation) => (task) => {
        operation(task); 

        this.getAllTasks();
        this.getSections(["main"]);
        this.getNumberOfTasksPending();
        this.verifyBtnTasks();
    }


    completeTask = this.taskOperation((task) => {
        task.completed = !task.completed;
        this.crud.updateStatus(task);
    });

    deleteTask = this.taskOperation((task) => {
        this.crud.removeOne(task);
    });

    saveNewTask = this.taskOperation((taskTitle) => {
        if (taskTitle.trim().length === 0) return;
        this.crud.save(taskTitle.trim());
    });

    verifyBtnTasks() {
        const btnClearTasks = document.querySelector('#clearTasks')
        if (this.areTasksCompleted) {
            btnClearTasks.style.display = 'block'
            return;
        }
        btnClearTasks.style.display = 'none'
    }

    detectUrlChanges() {
        window.addEventListener('hashchange', () => {
            this.getAllTasks()
            this.getSections(['main'])
            this.getNumberOfTasksPending()
            this.setClassSelectedToBtns()
            this.verifyBtnTasks()
        })
    }

    setClassSelectedToBtns() {
        const btns = [
            {
                title: 'All',
                href: '#/',
                isActive: this.isDefaultRoute()
            },
            {
                title: 'Pending',
                href: '#/pending',
                isActive: this.isPendingRoute()
            },
            {
                title: 'Completed',
                href: '#/completed',
                isActive: this.isCompletedRoute()
            }
        ];
        const filters$ = document.querySelector('.filters')
        const btnsDom = btns.map((btn) => {
            return `
            <li>
                <a href="${btn.href}" class="${btn.isActive ? 'selected' : ''}"> ${btn.title} </a>
            </li>`
        }).join('')

        filters$.innerHTML = `${btnsDom}`;
    }

    getSections(elements = []) {
        const displayValue = this.tasks.length === 0 ? 'none' : 'block'
        this.removeSections(elements, displayValue)
        this.addTasksToDOM(elements)
    }

    removeSections(elements = [], display = 'none') {
        const $elements = elements.map((element) => document.querySelectorAll(`#${element}`))
        $elements.forEach(element => element.forEach(el => el.style.display = display))
    }

    addTasksToDOM(el$) {
        const mainEl$ = document.querySelector(`#${el$}`);
        const tasksDom = this.tasks.map((task, index) => {
            return `
            <li class="${task.completed ? 'completed' : task.editing ? 'editing' : ''}">
                <div class="view">
                    <input 
                        class="toggle" 
                        type="checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        data-index="${index}" 
                    />
                    <label data-index="${index}"  class="item-task"  >${task.title}</label>
                    <button data-index="${index}" class="destroy"></button>
                </div>
                <input data-index="${index}" class="edit" value="${task.title}" />
            </li>`;
        }).join('');

        mainEl$.innerHTML = `<ul class="todo-list">${tasksDom}</ul>`;

        const checkboxes = mainEl$.querySelectorAll('.toggle');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                const task = this.tasks[index];
                this.completeTask(task);
            });


        });

        const buttonsDelete = mainEl$.querySelectorAll('.destroy')
        buttonsDelete.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                const task = this.tasks[index];
                this.deleteTask(task);
            })
        })


        const labels = mainEl$.querySelectorAll('.item-task')
        labels.forEach((btn) => {
            btn.addEventListener('dblclick', (event) => {
                const index = event.target.getAttribute('data-index');
                const task = this.tasks[index];
                this.editTask(task);
            })
        })

        const inputEdit = mainEl$.querySelectorAll('.edit')
        inputEdit.forEach((btn) => {
            btn.addEventListener('keydown', (event) => {
                const index = event.target.getAttribute('data-index');
                const task = this.tasks[index];
                this.handleInputEdit(task, event.keyCode, event.target.value);

            })
        })
    }


    editTask(task) {
        task.editing = true
        this.addTasksToDOM(["main"])
    }

    handleInputEdit(task, eventCode, title) {
        if (eventCode === commons.ESC_CODE) {
            task.editing = false
            this.addTasksToDOM(["main"])
        }

        if (eventCode === commons.ENTER_CODE) {
            task.editing = false
            this.updateTask(task, title)
            this.getAllTasks()
            this.addTasksToDOM(["main"])
        }


    }

    updateTask(task, title) {
        const newTask = {
            ...task,
            title: title.trim()
        }

        this.crud.updateItem(newTask)
    }

    clearCompletedTasks() {
        if (this.tasks.length === 0) {
            return
        }
        const completedTasks = this.tasks.filter((task) => task.completed !== true)
        this.crud.updateTable(completedTasks)
        this.getAllTasks()
        this.getSections(["main"])
        this.getNumberOfTasksPending()
        this.verifyBtnTasks()
    }

    getTextFromInput(element) {
        const inputTask$ = document.querySelector(`#${element}`)
        inputTask$.addEventListener('keypress', (event) => {
            if (event.keyCode == commons.ENTER_CODE) {
                this.saveNewTask(event.target.value);
                event.target.value = ''
            }
        })
    }

    getAllTasks() {
        this.areTasksCompleted = false;
        const allTasks = this.crud.parseStringToJson(this.crud.getAll()) || [];

        if (this.isDefaultRoute()) {
            this.tasks = allTasks;
        } else if (this.isPendingRoute()) {
            this.tasks = allTasks.filter(task => !task.completed);
        } else if (this.isCompletedRoute()) {
            this.tasks = allTasks.filter(task => task.completed);
        }

        this.areTasksCompleted = this.tasks.some(task => task.completed);
    }

    getNumberOfTasksPending() {
        let filteredTasks = this.tasks;
        if (this.isDefaultRoute() || this.isPendingRoute()) {
            filteredTasks = this.tasks.filter(task => !task.completed);
        }

        const quantityEl$ = document.querySelector('#quantity');
        quantityEl$.innerHTML = `<strong>${filteredTasks.length}</strong> ${this.getPluralOfWord('item', filteredTasks.length).trim()} left`;
    }

    getPluralOfWord(word = '', length) {
        return length === 1 ? `${word}` : `${word}s`
    }
}
const crud = new Crud(commons.LOCAL_STORAGE_KEY)
const myApp = new MyApp(crud)
myApp.getSections(["main"])
myApp.getTextFromInput('inputTask')
const btnClearTasks = document.querySelector('#clearTasks')
btnClearTasks.addEventListener('click', (e) => {
    myApp.clearCompletedTasks()
})