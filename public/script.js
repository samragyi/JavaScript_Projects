const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');


function createTaskItem(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
    <span>${task.description}</span>
    <span class="delete-icon" data-id="${task.id}"> &#x2715;</span>
  `;
  return li;
}


async function fetchTasks() {
  taskList.innerHTML = '';
  const response = await fetch('/api/tasks');
  const tasks = await response.json();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });
}


async function addTask(description) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description })
  });
  const newTask = await response.json();
  const taskItem = createTaskItem(newTask);
  taskList.appendChild(taskItem);
}


async function updateTaskStatus(taskId, completed) {
  await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });
}


async function deleteTask(taskId) {
  await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  });
}


taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = taskInput.value.trim();
  if (description !== '') {
    addTask(description);
    taskInput.value = '';
  }
});


taskList.addEventListener('click', (e) => {
  if (e.target.matches('.task-checkbox')) {
    const taskId = e.target.dataset.id;
    const completed = e.target.checked;
    updateTaskStatus(taskId, completed);
  } else if (e.target.matches('.delete-icon')) {
    const taskId = e.target.dataset.id;
    const taskItem = e.target.parentNode;
    deleteTask(taskId).then(() => {
      taskList.removeChild(taskItem);
    });
  }
});


fetchTasks();