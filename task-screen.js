const todoList = JSON.parse(localStorage.getItem('list')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || 0;

renderTodoList();
renderCompleted(completedTasks);

document.querySelector('.js-add-task-button').addEventListener('click', () => {
  addTodo();
});

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((task, index) => {
    const {name, dueDate} = task;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class = "completed-button js-completed-button">Completed</button>
      <button class = "delete-button js-delete-button">Delete</button>
    `;
    todoListHTML += html;
  });
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  localStorage.setItem('list', JSON.stringify(todoList));

  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });

  document.querySelectorAll('.js-completed-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      completedTasks++;
      localStorage.setItem('completedTasks', completedTasks);
      renderCompleted(completedTasks);
    });
  });

  document.querySelector('.js-reset-tasks-completed-button').addEventListener('click', () => {
    completedTasks = 0;
    localStorage.setItem('completedTasks', completedTasks);
    renderCompleted(completedTasks);
  })
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const name = inputElement.value;
  const dueDate = dateInputElement.value;

  todoList.push({name, dueDate});
  
  renderTodoList();

  inputElement.value = '';
}

function renderCompleted(num){
  const taskCompletedElement = document.querySelector('.js-tasks-completed');
  taskCompletedElement.innerHTML = `Tasks Completed: ${num}`;
}