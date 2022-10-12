"use strict";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

renderTodo(todos, filter);



document.querySelector("#new-todo-text").addEventListener("input", (e) => {
  filter.searchText = e.target.value;
  renderTodo(todos, filter);
});

document.querySelector("#form-input").addEventListener("submit", (e) => {
  const text = e.target.elements.firstName.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      title: text,
      completed: false,
    });
    saveTodos(todos);
    renderTodo(todos, filter);
    e.target.elements.firstName.value = "";
    console.log(todos);
  }
});

document.querySelector("#check-completed").addEventListener("change", (e) => {
  filter.hideCompleted = e.target.checked;
  renderTodo(todos, filter);
});


