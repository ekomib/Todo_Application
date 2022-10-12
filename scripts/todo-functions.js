"use strict";

const getSavedTodos = () => {
  const todoJSON = localStorage.getItem("todos");

  try {
    return todoJSON ? JSON.parse(todoJSON) : [];
  } catch {
    return [];
  }
};

const todos = getSavedTodos();

const filter = {
  searchText: "",
  hideCompleted: false,
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getSummaryDOM = (incompleteTodo) => {
  const numOfLeftTodos = document.createElement("h2");
  numOfLeftTodos.classList.add("list-title");
  numOfLeftTodos.textContent = `You have ${incompleteTodo.length} ${
    incompleteTodo.length > 1 ? "todos" : "todo"
  } left`;

  return numOfLeftTodos;
};
//

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

const renderTodo = (todo, filter) => {
  let filterTodo = todo.filter(function (note) {
    const searchText = note.title
      .toLowerCase()
      .includes(filter.searchText.toLowerCase());
    const searchFilter = !filter.hideCompleted || !todo.completed;

    return searchText && searchFilter;
  });

  const incompleteTodo = filterTodo.filter((com) => com.completed === false);

  document.querySelector("#to-dos").innerHTML = "";
  document.querySelector("#to-dos").appendChild(getSummaryDOM(incompleteTodo));

  if (filterTodo.length > 0) {
    filterTodo.forEach((todo) => {
      document.querySelector("#to-dos").appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No Todos To Show";
    document.querySelector("#to-dos").appendChild(messageEl);
  }

  filterTodo.filter((filter) => {
    const task = document.createElement("p");
    if (!filter.searchText) {
      task.textContent = "";
    } else {
      task.textContent = todo.title;
    }
    document.querySelector("#to-dos").appendChild(task);
  });
};

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkBox = document.createElement("input");
  const task = document.createElement("span");
  const removeButton = document.createElement("button");

  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todo.completed;
  containerEl.appendChild(checkBox);

  checkBox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodo(todos, filter);
  });

  task.textContent = todo.title;
  containerEl.appendChild(task);

  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  removeButton.textContent = "x";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodo(todos, filter);
  });

  // if (todo.title.length > 0) {
  //   task.textContent = todo.title;
  // } else {
  //   task.textContent = `Unnamed todo`;
  // }

  return todoEl;
};

console.log(todos);
