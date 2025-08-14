import "./styles.css";

const projectContainer = document.querySelector(".project-container");
const addProjectButton = document.querySelector(".left-panel .add-button");
const addProjectForm = document.querySelector(".add-project-form");
const projectFormSubmitButton = document.querySelector(
  ".add-project-form .submit-button"
);

const todoContainer = document.querySelector(".todo-container");
const addTodoButton = document.querySelector(".right-panel .add-button");
const addTodoForm = document.querySelector(".add-todo-form");
const todoFormSubmitButton = document.querySelector(
  ".add-todo-form .submit-button"
);
const todoFormBackButton = document.querySelector(
  ".add-todo-form .back-button"
);

let projects = [];
let currentProject;
function createProject(title) {
  projects.push(new Project(title));
}

function displayNewProject(project) {
  const projectDiv = document.createElement("div");
  const projectTitle = document.createElement("p");
  const DeleteButton = document.createElement("button");

  projectDiv.classList.add("project");
  projectTitle.classList.add("title");
  DeleteButton.classList.add("delete-button");

  projectTitle.textContent = project.title;
  DeleteButton.textContent = "X";

  DeleteButton.addEventListener("click", () => projectDiv.remove());
  projectDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    currentProject = project;
  });
  projectDiv.appendChild(projectTitle);
  projectDiv.appendChild(DeleteButton);
  projectContainer.appendChild(projectDiv);
}

function displayNewTodo() {
  todoContainer.innerHTML = "";

  for (let todo of currentProject.todos) {
    const todoDiv = document.createElement("div");
    const checkBox = document.createElement("button");
    const contentDiv = document.createElement("div");
    const todoTitle = document.createElement("p");
    const todoButtonContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    todoDiv.classList.add("todo");
    checkBox.classList.add("checkbox");
    contentDiv.classList.add("content");
    todoTitle.classList.add("title");
    todoButtonContainer.classList.add("button-container");
    deleteButton.classList.add("delete-button");
    editButton.classList.add("edit-button");

    todoTitle.textContent = todo.title;
    deleteButton.textContent = "X";
    editButton.textContent = "Edit";

    todoButtonContainer.appendChild(deleteButton);
    todoButtonContainer.appendChild(editButton);

    contentDiv.appendChild(todoTitle);
    contentDiv.appendChild(todoButtonContainer);

    todoDiv.appendChild(checkBox);
    todoDiv.appendChild(contentDiv);

    todoContainer.appendChild(todoDiv);

    deleteButton.addEventListener("click", () => {
      currentProject.todos = currentProject.todos.filter((t) => t !== todo);
      displayNewTodo();
    });

    editButton.addEventListener("click", () => {
      // Handle edit logic here (e.g., open an edit form with current todo data)
      console.log("Editing todo:", todo);
    });
  }
}

addProjectButton.addEventListener("click", () => {
  addProjectForm.style.display = "flex";
});

projectFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputVal = addProjectForm.children[0].value;
  createProject(inputVal);
  currentProject = projects[projects.length - 1];
  displayNewProject(projects[projects.length - 1]);
  addProjectForm.children[0].value = "";
  addProjectForm.style.display = "none";
});

addTodoButton.addEventListener("click", () => {
  if (!currentProject) return;
  addTodoForm.style.display = "flex";
  todoContainer.style.display = "none";
});

todoFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const titleInputValue = document.querySelector("input#todo-title").value;
  const descriptionInputValue = document.querySelector(
    "textarea#description"
  ).value;
  const dueDateInputValue = document.querySelector("input#due-date").value;
  const priorityInputValue = document.querySelector("select#priority").value;

  currentProject.addTodo(
    new Todo(
      titleInputValue,
      descriptionInputValue,
      dueDateInputValue,
      priorityInputValue
    )
  );
  document.querySelector("input#todo-title").value = "";
  document.querySelector("textarea#description").value = "";
  document.querySelector("input#due-date").value = "";
  document.querySelector("select#priority").value = "";
  addTodoForm.style.display = "none";
  todoContainer.style.display = "flex";

  displayNewTodo();
});

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}
class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
