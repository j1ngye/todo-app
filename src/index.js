import "./styles.css";
import { Todo } from "./todoClass";
import { Project } from "./projectClass";
import { displayNewProject } from "./displayNewProject";

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

addProjectButton.addEventListener("click", () => {
  addProjectForm.style.display = "flex";
});

projectFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputVal = addProjectForm.children[0].value;
  createProject(inputVal);
  displayNewProject(projects[projects.length - 1]);
  addProjectForm.children[0].value = "";
  addProjectForm.style.display = "none";
});

addTodoButton.addEventListener("click", () => {
  addTodoForm.style.display = "flex";
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
});
