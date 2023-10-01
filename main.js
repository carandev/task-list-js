import './style.css'

const cardContainerTemplate = document.getElementById('taskCard')
const cardContainer = cardContainerTemplate.content
const tasksContainer = document.getElementById('tasksContainer')

const taskTitleInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTaskButton')

const errorContainer = document.getElementById('errorContainer')

const STORAGE_NAME = 'tasks'

let tasks = []

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.length !== 0) {
    tasks = JSON.parse(localStorage.getItem(STORAGE_NAME))
  }

  renderTasks()

  taskTitleInput.focus()
})

const renderTasks = () => {
  tasksContainer.innerHTML = ''
  tasks.forEach((task, index) => {
    cardContainer.firstElementChild.childNodes[1].firstElementChild.textContent = task
    cardContainer.firstElementChild.childNodes[1].lastElementChild.dataset.taskId = index
    cardContainer.firstElementChild.childNodes[3].firstElementChild.dataset.taskId = index
    cardContainer.firstElementChild.childNodes[3].lastElementChild.dataset.taskId = index

    tasksContainer.append(cardContainer.cloneNode(true))
  })

  const editTaskButtons = document.querySelectorAll('.editTaskButton')
  const deleteTaskButtons = document.querySelectorAll('.deleteTaskButton')
  const checkTaskButtons = document.querySelectorAll('.checkTaskButton')

  deleteTaskButtons.forEach(button => {
    button.addEventListener('click', e => {
      tasks.splice(e.target.dataset.taskId, 1)
      localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks))
      renderTasks()
    })
  })

  checkTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.firstElementChild.classList.toggle('line-through')
      button.parentElement.parentElement.classList.toggle('bg-green-600')

      if (button.firstElementChild.classList.contains('ti-check')) {
        button.firstElementChild.classList.replace('ti-check', 'ti-checks')
      } else {
        button.firstElementChild.classList.replace('ti-checks', 'ti-check')
      }
    })
  })

  editTaskButtons.forEach(button => {
    button.addEventListener('click', e => {
      const taskTitle = taskTitleInput.value
      errorContainer.textContent = ''
      errorContainer.classList.remove('p-4')

      if (taskTitle.trim() === '') {
        errorContainer.textContent = 'No se puede dejar la tarea vacía.'
        errorContainer.classList.add('p-4')
        taskTitleInput.value = ''
        taskTitleInput.focus()
        return
      }

      if (tasks.some(task => task.toLowerCase() === taskTitle.toLowerCase())) {
        errorContainer.textContent = 'Ya existe esta tarea.'
        errorContainer.classList.add('p-4')
        taskTitleInput.value = ''
        taskTitleInput.focus()
        return
      }

      tasks[e.target.dataset.taskId] = taskTitleInput.value
      localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks))
      renderTasks()
      taskTitleInput.value = ''
      taskTitleInput.focus()
    })
  })
}

addTaskButton.addEventListener('click', () => {
  const taskTitle = taskTitleInput.value
  errorContainer.textContent = ''
  errorContainer.classList.remove('p-4')

  if (taskTitle.trim() === '') {
    errorContainer.textContent = 'No se puede añadir una tarea vacía.'
    errorContainer.classList.add('p-4')
    taskTitleInput.value = ''
    taskTitleInput.focus()
    return
  }

  if (tasks.some(task => task.toLowerCase() === taskTitle.toLowerCase())) {
    errorContainer.textContent = 'Ya existe esta tarea.'
    errorContainer.classList.add('p-4')
    taskTitleInput.value = ''
    taskTitleInput.focus()
    return
  }

  tasks.unshift(taskTitle)
  localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks))

  renderTasks()

  taskTitleInput.value = ''
  taskTitleInput.focus()
})
