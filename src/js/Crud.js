import { StorageProvider } from "./AbstractStorageProvider"

export class Crud extends StorageProvider {
    table = ''
    constructor(table) {
        super()
        this.table = table
    }

    save(item) {
        const tasks = this.parseStringToJson(this.getAll()) || []
        const newItem = {
            id: Date.now(),
            title: item,
            completed: false
        }
        localStorage.setItem(this.table, JSON.stringify([...tasks, newItem]))
    }

    updateStatus(item) {
        const tasks = this.parseStringToJson(this.getAll()) || []
        const tasksToUpdate = tasks.map(task => {
            if (task.id === item.id) {
                return item
            }

            return task
        })
        localStorage.setItem(this.table, JSON.stringify(tasksToUpdate))
    }

    parseJsonToString(items = [], newItem) {
        return JSON.stringify([...items, newItem])
    }

    parseStringToJson(item) {
        return JSON.parse(item)
    }

    getAll() {
        return localStorage.getItem(this.table)
    }

    updateTable(items = []) {
        localStorage.setItem(this.table, JSON.stringify(items))
    }

    removeOne(item) {
        const tasks = this.parseStringToJson(this.getAll()) || []
        const filteredTask = tasks.filter((task) => task.id !== item.id)
        localStorage.setItem(this.table, JSON.stringify(filteredTask))
    }

    updateItem(item) {
        const tasks = this.parseStringToJson(this.getAll()) || []
        const tasksUpdated = tasks.map((task) => {
            if (task.id === item.id) {
                return item
            }

            return task
        })
        localStorage.setItem(this.table, JSON.stringify(tasksUpdated))

    }

}