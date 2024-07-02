//READ----READ----READ----READ----READ----READ----READ----READ----READ----READ----READ----READ----READ
export const read = (main, footer) => {

  if (localStorage.length == 0 || localStorage['mydayapp-js'] == '[]') {
    main.classList.add('hidden')
    footer.classList.add('hidden')

    const tasks = []

    localStorage.setItem('mydayapp-js', JSON.stringify(tasks))
  }
}

//CHECKCOMPLETED
const checkCompleted = (tasks, clearButton) => {
  const completedTasks = tasks.filter(task => task.completed == true)
  completedTasks.length != 0 ? clearButton.classList.remove('hidden') : clearButton.classList.add('hidden')
}

//VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW----VIEW
const view = (toDoList, tasks, task, index, clearButton) => {

  const taskElement = document.createElement('li')
  const taskDivElement = document.createElement('div')
  const toogleTask = document.createElement('input')
  const taskText = document.createElement('label')
  const destroyTask = document.createElement('button')
  const editTask = document.createElement('input')

  if (task.completed) {
    taskElement.setAttribute('class', 'completed')
    toogleTask.checked = true
  }

  taskDivElement.setAttribute('class', 'view')

  toogleTask.setAttribute('class', 'toggle')
  toogleTask.setAttribute('type', 'checkbox')

  taskText.textContent = task.title
  taskText.addEventListener('dblclick', () => {
    taskElement.setAttribute('class', 'editing')
    editTask.focus()
    if (taskElement.className == 'editing') {
      editTask.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
          taskElement.setAttribute('class', '')
        }
      })
    }
  })

  toogleTask.addEventListener('change', () => {
    const newTasks = JSON.parse(localStorage.getItem('mydayapp-js'))
    if (toogleTask.checked) {
      taskElement.setAttribute('class', 'completed')
      newTasks[index].completed = true
      localStorage.setItem('mydayapp-js', JSON.stringify(newTasks))
      checkCompleted(newTasks, clearButton)
    } else {
      taskElement.setAttribute('class', '')
      newTasks[index].completed = false
      console.log(newTasks[index])
      localStorage.setItem('mydayapp-js', JSON.stringify(newTasks))
      checkCompleted(newTasks, clearButton)
    }
  })

  destroyTask.setAttribute('class', 'destroy')

  taskDivElement.append(toogleTask, taskText, destroyTask)

  editTask.focus()
  editTask.setAttribute('class', 'edit')
  editTask.setAttribute('value', task.title)
  editTask.setSelectionRange(task.title.length, task.title.length);
  editTask.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && editTask.value.trim() != '') {
      taskText.textContent = editTask.value.trim()
      taskElement.setAttribute('class', '')
      tasks[index].title = taskText.textContent
      localStorage.setItem('mydayapp-js', JSON.stringify(tasks))
    }
  })

  taskElement.append(taskDivElement, editTask)
  toDoList.appendChild(taskElement)
}

//COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER----COUNTER
const counter = (toDoList, toDoCount) => {
  if (toDoList.childElementCount == 1) {
    toDoCount.innerHTML = `<strong>${toDoList.childElementCount}</strong> item left`
  } else {
    toDoCount.innerHTML = `<strong>${toDoList.childElementCount}</strong> items left`
  }
}

//ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD----ADD
export const add = (newTask, toDoList, toDoCount, clearButton) => {
  newTask.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {

      const newTaskValue = newTask.value.trim()
      if (newTaskValue != '') {

        const task = { completed: false, title: newTaskValue }

        const tasks = JSON.parse(localStorage.getItem('mydayapp-js'))
        tasks.push(task)

        const index = tasks.indexOf(task)

        localStorage.setItem('mydayapp-js', JSON.stringify(tasks))

        view(toDoList, tasks, task, index, clearButton)

        newTask.value = ''

        if (localStorage.length == 1) {
          main.classList.remove('hidden')
          footer.classList.remove('hidden')
        }

        counter(toDoList, toDoCount)
      }
    }
  })
}

//WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE----WRITE
export const write = (toDoList, toDoCount, rute, clearButton) => {

  const tasks = JSON.parse(localStorage.getItem('mydayapp-js'))

  switch (rute) {
    case '#/':
      tasks.forEach(task => {
        const index = tasks.indexOf(task)
        view(toDoList, tasks, task, index, clearButton)
      })
      checkCompleted(tasks, clearButton)
      break;
    case '#/pending':
      const pendingTasks = tasks.filter((task) => task.completed === false)
      pendingTasks.forEach(task => {
        const index = pendingTasks.indexOf(task)
        view(toDoList, pendingTasks, task, index, clearButton)
      })
      clearButton.classList.add('hidden')
      break;
    case '#/completed':
      const completedTasks = tasks.filter((task) => task.completed === true)
      completedTasks.forEach(task => {
        const index = completedTasks.indexOf(task)
        view(toDoList, completedTasks, task, index, clearButton)
      })
      checkCompleted(tasks, clearButton)
      break;
    default:
      tasks.forEach(task => {
        const index = tasks.indexOf(task)
        view(toDoList, tasks, task, index, clearButton)
      })
      checkCompleted(tasks, clearButton)
      break;
  }

  counter(toDoList, toDoCount)
}

//CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR----CLEAR
export const clear = (toDoList, toDoCount, clearButton) => {
  clearButton.addEventListener('click', () => {

    const tasks = JSON.parse(localStorage.getItem('mydayapp-js'))

    const pendingTasks = tasks.filter((task) => task.completed == false)
    localStorage.setItem('mydayapp-js', JSON.stringify(pendingTasks))

    const completedTasks = document.getElementsByClassName('completed')

    Array.from(completedTasks).forEach(task => {
      task.remove()
    });

    counter(toDoList, toDoCount)

    checkCompleted(pendingTasks, clearButton)
  })
}