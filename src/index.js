import "./styles.css";
import editSvgURL from "./edit.svg";
import deleteSvgURL from "./close.svg";

const logo = document.querySelector("#logo");
const message = document.querySelector("p.message");
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
    this.completed = false;
  }
}

let projects = [];
let randomMessages = [
  "Rest when you need to, my child",
  "Your progress is beautiful to behold",
  "The night embraces your efforts",
  "Be gentle with your precious self",
  "Small steps still move mountains",
  "Your heart's rhythm is your guide",
  "Breathe deep, the night is patient",
  "You're doing better than you know",
  "Darkness holds space for your light",
  "Your struggles make you human",
  "The moon witnesses your strength",
  "Healing happens in quiet moments",
  "Your worth isn't measured in tasks",
  "Tend to your soul like a garden",
  "You're allowed to simply exist",
  "Stars shine brighter after darkness",
  "Your journey matters more than speed",
  "Rest is sacred, not surrender",
  "You are enough in this moment",
  "The night cradles your weariness",
  "Softness is its own strength",
  "Your light matters in the darkness",
  "Pause and feel your own heartbeat",
  "Growth happens between the lines",
  "Be your own kindest companion",
];
let currentProject;
let isEditing = false;
let currentEditingTodo = null;

// Load data when app starts
loadFromLocalStorage();

setInterval(() => {
  const rand = Math.floor(Math.random() * randomMessages.length);
  message.textContent = randomMessages[rand];
}, 15000);

// LocalStorage functions
function saveToLocalStorage() {
  localStorage.setItem("todoAppData", JSON.stringify(projects));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("todoAppData");
  if (data) {
    const parsedData = JSON.parse(data);
    projects = parsedData.map((projectData) => {
      const project = new Project(projectData.title);
      project.todos = projectData.todos.map((todoData) => {
        const todo = new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        );
        todo.completed = todoData.completed || false;
        return todo;
      });
      return project;
    });

    // Display loaded projects
    projects.forEach((project) => displayNewProject(project));

    if (projects.length > 0) {
      currentProject = projects[0];
      displayNewTodo();
    }
  }
}

// Save data before page unload
window.addEventListener("beforeunload", saveToLocalStorage);

function createProject(title) {
  projects.push(new Project(title));
  saveToLocalStorage();
}

logo.addEventListener("click", () => {
  todoContainer.style.backgroundBlendMode =
    todoContainer.style.backgroundBlendMode === "normal"
      ? "luminosity"
      : "normal";
});

function displayNewProject(project) {
  const projectDiv = document.createElement("div");
  const projectTitle = document.createElement("p");
  const deleteButton = document.createElement("button");
  const deleteSvg = document.createElement("img");

  projectDiv.classList.add("project");
  projectTitle.classList.add("title");
  deleteButton.classList.add("delete-button");
  deleteSvg.src = deleteSvgURL;
  projectTitle.textContent = project.title;

  deleteButton.addEventListener("click", () => {
    const deleteConfirmation = confirm("Are you sure?");
    if (deleteConfirmation) {
      message.textContent = "The project is deleted!";
      projectDiv.remove();
      projects = projects.filter((p) => p !== project);
      saveToLocalStorage();

      if (currentProject === project) {
        currentProject = null;
      }

      if (projects.length === 0) {
        message.textContent = "Create a project to get started!";
      }
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

  deleteButton.appendChild(deleteSvg);
  projectDiv.appendChild(projectTitle);
  projectDiv.appendChild(deleteButton);
  projectContainer.appendChild(projectDiv);
  displayNewTodo();

  // Activate the first project by default
  if (projects.length === 1) {
    const clickEvent = new Event("click");
    projectDiv.dispatchEvent(clickEvent);
  }
}

function displayNewTodo() {
  if (!currentProject) return;

  todoContainer.innerHTML = "";

  for (let todo of currentProject.todos) {
    const todoDiv = document.createElement("div");
    const checkBox = document.createElement("button");
    const contentDiv = document.createElement("div");
    const todoTitle = document.createElement("p");
    const todoButtonContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteSvg = document.createElement("img");
    const editSvg = document.createElement("img");

    todoDiv.classList.add("todo");
    checkBox.classList.add("checkbox");
    contentDiv.classList.add("content");
    todoTitle.classList.add("title");
    todoButtonContainer.classList.add("button-container");
    deleteButton.classList.add("delete-button");
    editButton.classList.add("edit-button");
    deleteSvg.src = deleteSvgURL;
    editSvg.src = editSvgURL;

    if (todo.completed) {
      checkBox.classList.add("checked");
      contentDiv.classList.add("checked");
    }

    todoTitle.textContent = todo.title;
    deleteButton.appendChild(deleteSvg);
    editButton.appendChild(editSvg);

    todoButtonContainer.appendChild(deleteButton);
    todoButtonContainer.appendChild(editButton);

    contentDiv.appendChild(todoTitle);
    contentDiv.appendChild(todoButtonContainer);

    todoDiv.appendChild(checkBox);
    todoDiv.appendChild(contentDiv);

    todoContainer.appendChild(todoDiv);

    checkBox.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveToLocalStorage();

      if (todo.completed) {
        checkBox.classList.add("checked");
        contentDiv.classList.add("checked");
        message.textContent = "Well Done!";
      } else {
        checkBox.classList.remove("checked");
        contentDiv.classList.remove("checked");
        message.textContent = "You Can Do it!";
      }
    });

    deleteButton.addEventListener("click", () => {
      currentProject.todos = currentProject.todos.filter((t) => t !== todo);
      saveToLocalStorage();
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
  if (inputVal === "") {
    message.textContent = "You must give it a title!";
  } else {
    message.textContent = "";
    createProject(inputVal);
    currentProject = projects[projects.length - 1];
    displayNewProject(projects[projects.length - 1]);
    addProjectForm.children[0].value = "";
    addProjectForm.style.display = "none";
  }
});

addTodoButton.addEventListener("click", () => {
  if (projects.length === 0) {
    message.textContent = "You must have a project!";
    return;
  }
  message.textContent = "Welcome Back!";
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
  if (titleInputValue === "") {
    message.textContent = "You must give it a title!";
    return;
  }
  message.textContent = "";
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
  saveToLocalStorage();
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
