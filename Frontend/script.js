"use strict";

//get form
const form = document.getElementById("task-form");

//get the section where I want to add the cards to it
const taskList = document.getElementById("task-lists");

//get the total, remaining and completed cards
const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const remainingTask = document.getElementById("remaining-task");

//set counters
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

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  let edit = document.createElement("img");
  edit.src = "./images/pen.svg";
  edit.classList.add("svg");
  edit.classList.add("edit");

  edit.addEventListener("click", () => {
    let input = document.createElement("input");

    input.type = "text";
    input.value = h2.textContent;
    input.classList.add("task-input");

    input.maxLength = 50;
    titleContainer.replaceChild(input, h2);

    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        titleContainer.replaceChild(input, h2);
      }
    });
    input.addEventListener("blur", () => {
      titleContainer.replaceChild(input, h2);
    });
  });

  let check = document.createElement("div");
  check.classList.add("checkbox-con");
  let checked = document.createElement("input");
  checked.id = "checkbox";
  checked.type = "checkbox";
  check.appendChild(checked);

  checked.addEventListener("click", () => {
    if (checked.checked) {
      completed = completed + 1;
      if (remaining > 0) {
        remaining = remaining - 1;
      }
    } else {
      if (completed > 0) {
        completed = completed - 1;
      }
      remaining = remaining + 1;
    }
    remainingTask.textContent = remaining;
    completedTask.textContent = completed;
  });

  let clear = document.createElement("img");
  clear.src = "./images/clear.svg";
  clear.classList.add("svg");
  clear.classList.add("clear");

  buttonContainer.appendChild(edit);
  buttonContainer.appendChild(check);
  buttonContainer.appendChild(clear);

  clear.addEventListener("click", () => {
    if (completed > 0 && checked.checked) {
      completed = completed - 1;
    }
    if (remaining > 0 && checked.checked != true) {
      remaining = remaining - 1;
    }
    if (total > 0) {
      total = total - 1;
    }
    totalTask.textContent = total;
    remainingTask.textContent = remaining;
    completedTask.textContent = completed;
    card.remove();
  });

  titleContainer.appendChild(h2);
  titleContainer.appendChild(buttonContainer);
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
