import "./styles.css";

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

let projects = [];
function createProject(title) {
  projects.push(new Project(title));
}

function createTodo(projectTitle, title, description, dueDate, priority) {
  for (let p of projects) {
    if (p.title === projectTitle) {
      p.addTodo(new Todo(title, description, dueDate, priority));
    }
  }
}

const addProjectButton = document.querySelector(
  ".project-container .add-button"
);

addProjectButton.addEventListener("click", () => {
  const addProjectForm = document.querySelector(".add-project-form");
  addProjectForm.style.display = "flex";
});
