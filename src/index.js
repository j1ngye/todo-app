import "./styles.css";

const projectContainer = document.querySelector(".project-container");
const addProjectButton = document.querySelector(".left-panel .add-button");
const addProjectForm = document.querySelector(".add-project-form");
const projectFormSubmitButton = document.querySelector(
  ".add-project-form .submit-button"
);

let projects = [];
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

  projectDiv.appendChild(projectTitle);
  projectDiv.appendChild(DeleteButton);

  projectContainer.appendChild(projectDiv);
}

function createTodo(projectTitle, title, description, dueDate, priority) {
  for (let p of projects) {
    if (p.title === projectTitle) {
      p.addTodo(new Todo(title, description, dueDate, priority));
    }
  }
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
  console.log(projects);
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
