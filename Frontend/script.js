"use strict";

//get form
const form = document.getElementById("task-form");

//get input from user
form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent page reload on submit
  let title = document.getElementById("task-title").value;
  let description = document.getElementById("task-description").value;
  console.log(title, description);
});
