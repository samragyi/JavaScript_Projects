const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');


function createTaskItem(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
    <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.description}</span>
    <span class="delete-icon" data-id="${task.id}"> &#x2715;</span>
  `;
  return li;
}


async function fetchTasks() {
  taskList.innerHTML = '';  // set to empty string 
  //const response = await fetch('/api/tasks');
  const response = await fetch('/user-data');
  const userData = await response.json();
  // iterate over tasks
  userData.tasks.forEach((task) => {
    const taskItem = createTaskItem(task);  ///create a task item for each task and append it 
    taskList.appendChild(taskItem);
  });
}


async function addTask(description) {
  const response = await fetch('/users-data/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description })  //json to string
  });
  const newTask = await response.json();
  const taskItem = createTaskItem(newTask);
  taskList.appendChild(taskItem);
}


async function updateTaskStatus(taskId, completed) {
  await fetch(`/users-data/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });
}


async function deleteTask(taskId) {
  await fetch(`/users-data/tasks/${taskId}`, {
    method: 'DELETE'
  });
}


taskForm.addEventListener('submit', (e) => {
  e.preventDefault();  // to prevent the page from reloading once the task is submitted. The code next will follow
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
