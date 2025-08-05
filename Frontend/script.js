"use strict";

//get form
const form = document.getElementById("task-form");

//get the section where I want to add the cards to it
const taskList = document.getElementById("task-lists");

const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const remainingTask = document.getElementById("remaining-task");

let total = 0;
let completed = 0;
let remaining = 0;

//get input from user
form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent page reload on submit

  let title = document.getElementById("task-title").value.trim();
  let description = document.getElementById("task-description").value.trim();

  const card = document.createElement("div");
  card.classList.add("added-task");
  card.id = "tasks";

  const titleContainer = document.createElement("div");

  let h2 = document.createElement("h2");
  h2.classList.add("added-task-title");
  h2.textContent = title;

  let trash = document.createElement("img");
  trash.src = "./images/trash.svg";
  trash.classList.add("svg");
  trash.classList.add("trash");
  trash.addEventListener("click", () => {
    document.getElementById("tasks").remove();
    if (remaining > 0 && total > 0) {
      total = total - 1;
      totalTask.textContent = total;
      remaining = remaining - 1;
      remainingTask.textContent = remaining;
    }
  });

  titleContainer.appendChild(h2);
  titleContainer.appendChild(trash);
  titleContainer.classList.add("added-task-title-container");

  let p = document.createElement("p");
  p.classList.add("added-task-description");
  p.textContent = description;

  card.appendChild(titleContainer);
  card.appendChild(p);
  taskList.appendChild(card);

  total = total + 1;
  remaining = remaining + 1;
  totalTask.textContent = total;
  remainingTask.textContent = remaining;

  form.reset();
});
