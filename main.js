import './style.css'

const cardContainerTemplate = document.getElementById('taskCard')
const cardContainer = cardContainerTemplate.content
const tasksContainer = document.getElementById('tasksContainer')

const taskTitleInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTaskButton')

const errorContainer = document.getElementById('errorContainer')

const tasks = []

const renderTasks = () => {
  tasksContainer.innerHTML = ''
  tasks.forEach((task, index) => {
    cardContainer.firstElementChild.childNodes[1].textContent = task
    cardContainer.firstElementChild.childNodes[3].firstElementChild.dataset.taskId = index
    cardContainer.firstElementChild.childNodes[3].lastElementChild.dataset.taskId = index
    console.log(cardContainer)

    tasksContainer.append(cardContainer.cloneNode(true))
  })

  const editTaskButtons = document.querySelectorAll('.editTaskButton')
  const deleteTaskButtons = document.querySelectorAll('.deleteTaskButton')

  deleteTaskButtons.forEach(button => {
    button.addEventListener('click', e => {
      tasks.splice(e.target.dataset.taskId, 1)
      renderTasks()
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

  renderTasks()

  taskTitleInput.value = ''
  taskTitleInput.focus()
})
