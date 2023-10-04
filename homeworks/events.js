let tasks = [];

let todoInput = document.getElementById("todo");
let listElement = document.getElementById("todoList")

function renderTasks(tasks) {
  listElement.innerHTML = "";
  tasks.forEach(task => {
    let taskHTML = `<li ${task.completed ? 'class="strike"' : ""}>
    <p>${task.detail}</p>
    <div>
      <span data-function="delete">❎</span>
      <span data-function="complete">✅</span>
    </div>
  </li>`;
  listElement.innerHTML += taskHTML;
  });
}

function newTask() {
  let task = todoInput.value;
  tasks.push({detail: task, completed: false})
  renderTasks(tasks);
}

function removeTask(taskElement) {
  // note the use of Array.filter to remove the element from our task array
  tasks = tasks.filter(
    (task) => task.detail != taskElement.childNodes[1].innerText
  );
  // this line removes the HTML element from the DOM
  taskElement.remove();
}

function completeTask(taskElement) {
  // In this case we need to find the index of the task so we can modify it.
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.childNodes[1].innerText
  );
  // once we have the index we can modify the complete field.
  // tasks[taskIndex].completed ? false : true is a ternary expression.
  // If the first part is true (left of the ?), then the value on the left of the : will get returned, otherwise the value on the right of the : will be returned.
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  // toggle adds a class if it is not there, removes it if it is.
  taskElement.classList.toggle("strike");
}

function manageTasks(event) {
  // did they click the delete or complete icon?
    let activeElement = event.target.closest("li");

    if (event.target.dataset.function == "delete"){
        removeTask(activeElement);
    } else if (event.target.dataset.function == "complete"){
        completeTask(activeElement);
    }
  // because we added 'data-function="delete"' to each icon in a task we can access a dataset property on our target
  // use that in a couple of if statements to decide whether to run removeTask or completeTask
}

document.getElementById("submitTask").addEventListener("click", newTask);

listElement.addEventListener("click", manageTasks);
// we need to attach listeners to the submit button and the list. Listen for a click, call the 'newTask' function on submit and call the 'manageTasks' function if either of the icons are clicked in the list of tasks.