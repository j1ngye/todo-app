export function displayNewProject(project) {
  const projectContainer = document.querySelector(".project-container");
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
