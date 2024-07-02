import "./css/base.css";

import { read } from "./js/utils";
import { add } from "./js/utils";
import { write } from "./js/utils";
import { clear } from "./js/utils.js"

const main = document.getElementById('main')
const footer = document.getElementById('footer')
const newTask = document.getElementById('new-todo')
const toDoList = document.getElementById('todo-list')
const toDoCount = document.getElementById('todo-count')
const filters = document.querySelectorAll('a[href]')
const clearButton = document.getElementById('clear-completed')

const selected = (filters, rute) => {
    filters.forEach(filter => {
        if (filter.hash == rute) {
            filter.classList.add('selected')
        }
        else {
            filter.classList.remove('selected')
        }
    })
}

read(main, footer)
add(newTask, toDoList, toDoCount, clearButton)
window.addEventListener('load', () => {
    const rute = location.hash
    write(toDoList, toDoCount, rute, clearButton)

    selected(filters, rute)

    if (location.hash == '') {
        filters[0].className = 'selected'
    }
})
clear(toDoList, toDoCount, clearButton)
window.addEventListener('hashchange', () => {
    toDoList.innerHTML = ''
    const rute = location.hash
    write(toDoList, toDoCount, rute, clearButton)

    selected(filters, rute)
})