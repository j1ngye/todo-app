import "./styles.css";
import editSvgURL from "./images/edit.svg";
import closeSvgURL from "./images/close.svg";

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
let isEditing = false;
let currentEditingTodo = null;
function createProject(title) {
  projects.push(new Project(title));
}

function displayNewProject(project) {
  const projectDiv = document.createElement("div");
  const projectTitle = document.createElement("p");
  const deleteButton = document.createElement("button");
  const img = document.createElement("img");

  projectDiv.classList.add("project");
  projectTitle.classList.add("title");
  deleteButton.classList.add("delete-button");
  img.src = closeSvgURL;
  projectTitle.textContent = project.title;

  deleteButton.addEventListener("click", () => {
    const removeConfirmation = confirm("Are you sure?");
    if (removeConfirmation) {
      projectDiv.remove();
      project.todos = [];
    } else {
      return;
    }
  });
  projectDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    const projectDivs = Array.from(projectContainer.children).slice(1);
    projectDivs.forEach((p) => {
      p.classList.remove("active");
    });
    currentProject = project;
    projectDiv.classList.add("active");
    displayNewTodo();
  });
  deleteButton.appendChild(img);
  projectDiv.appendChild(projectTitle);
  projectDiv.appendChild(deleteButton);
  projectContainer.appendChild(projectDiv);
  displayNewTodo();
  const clickEvent = new Event("click");
  projectDiv.dispatchEvent(clickEvent);
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

    checkBox.addEventListener("click", () => {
      if (checkBox.classList.contains("checked")) {
        checkBox.classList.remove("checked");
        todoTitle.classList.remove("checked");
      } else {
        checkBox.classList.add("checked");
        todoTitle.classList.add("checked");
      }
    });

    deleteButton.addEventListener("click", () => {
      currentProject.todos = currentProject.todos.filter((t) => t !== todo);
      displayNewTodo();
    });

    editButton.addEventListener("click", () => {
      isEditing = true;
      currentEditingTodo = todo;
      addTodoForm.style.display = "flex";
      todoContainer.style.display = "none";

      document.querySelector("input#todo-title").value = todo.title;
      document.querySelector("textarea#description").value = todo.description;
      document.querySelector("input#due-date").value = todo.dueDate;
      document.querySelector("select#priority").value = todo.priority;
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
  if (isEditing && currentEditingTodo) {
    currentEditingTodo.title = titleInputValue;
    currentEditingTodo.description = descriptionInputValue;
    currentEditingTodo.dueDate = dueDateInputValue;
    currentEditingTodo.priority = priorityInputValue;
  } else {
    currentProject.addTodo(
      new Todo(
        titleInputValue,
        descriptionInputValue,
        dueDateInputValue,
        priorityInputValue
      )
    );
  }
  resetTodoForm();
  displayNewTodo();
});

function resetTodoForm() {
  document.querySelector("input#todo-title").value = "";
  document.querySelector("textarea#description").value = "";
  document.querySelector("input#due-date").value = "";
  document.querySelector("select#priority").value = "";
  addTodoForm.style.display = "none";
  todoContainer.style.display = "flex";
  isEditing = false;
  currentEditingTodo = null;
}

todoFormBackButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetTodoForm();
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
