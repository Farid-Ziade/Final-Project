"use strict";
const colorModeToggle = document.getElementById("color_mode");

colorModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", colorModeToggle.checked);
});

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

  let card = document.createElement("div");
  card.classList.add("added-task");
  card.id = "tasks";

  let titleContainer = document.createElement("div");

  let h2 = document.createElement("h2");
  h2.classList.add("added-task-title");
  h2.textContent = title;

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  let p = document.createElement("p");
  p.classList.add("added-task-description");
  p.textContent = description;

  total = total + 1;
  remaining = remaining + 1;
  totalTask.textContent = total;
  remainingTask.textContent = remaining;

  ////////////////////////////////edit section////////////////////////////////

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
    let saved = false;

    let replace = () => {
      if (saved) return;
      saved = true;
      h2.textContent = input.value.trim();
      titleContainer.replaceChild(h2, input);

      if (p) {
        p.click();
      }
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        replace();
      }
    });
    input.addEventListener("blur", replace);
  });

  buttonContainer.appendChild(edit);
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////Checked button//////////////////////////////////
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

  buttonContainer.appendChild(check);
  ///////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////clear section////////////////////////////////
  let clear = document.createElement("img");
  clear.src = "./images/clear.svg";
  clear.classList.add("svg");
  clear.classList.add("clear");
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
  ///////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////paragraph editing//////////////////////////////
  let savedDesc = false;

  p.addEventListener("click", () => {
    if (savedDesc) return;

    let inputDesc = document.createElement("input");
    inputDesc.value = p.textContent;
    inputDesc.classList.add("task-input");
    inputDesc.rows = 3;
    inputDesc.maxLength = 200;

    card.replaceChild(inputDesc, p);
    inputDesc.focus();

    let saveDescription = () => {
      if (savedDesc) return;
      savedDesc = true;

      p.textContent = inputDesc.value.trim() || "No description";
      card.replaceChild(p, inputDesc);
      savedDesc = false;
    };

    inputDesc.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveDescription();
      }
    });

    inputDesc.addEventListener("blur", saveDescription);
  });

  ///////////////////////////////////////////////////////////////////////////////

  titleContainer.appendChild(h2);
  titleContainer.appendChild(buttonContainer);
  titleContainer.classList.add("added-task-title-container");
  card.appendChild(titleContainer);
  card.appendChild(p);
  taskList.appendChild(card);
  form.reset();
});
