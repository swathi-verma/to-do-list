const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let isEditing = false; 
let currentTask = null;

// Function to Add or Save a Todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to-do!");
        return false; 
    }

    if (isEditing) {
        // Save Edited Todo
        currentTask.querySelector("p").innerHTML = inputText; 
        updateLocalTodos(); // Update localStorage
        isEditing = false; 
        currentTask = null;
        addBtn.value = "Add";
        inputBox.value = "";
        return;
    }

    // Create a New Todo
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    todoList.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
};

const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        const todoText = e.target.parentElement.querySelector("p").innerHTML;
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(todoText); // Update localStorage after removal
    }
    if (e.target.innerHTML === "Edit") {
        isEditing = true;
        currentTask = e.target.parentElement;
        inputBox.value = currentTask.querySelector("p").innerHTML;
        inputBox.focus();
        addBtn.value = "Save";
    }
};


const saveLocalTodos = (todo) => {
    let todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Delete a Todo from localStorage
const deleteLocalTodos = (todo) => {
    let todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    todos = todos.filter(t => t !== todo); 
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Update localStorage when editing a todo
const updateLocalTodos = () => {
    const updatedTodos = Array.from(todoList.querySelectorAll("li p")).map(p => p.innerHTML);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

// Load Todos from localStorage on Page Load
const loadTodos = () => {
    let todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        // Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        // Create Edit Button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        todoList.appendChild(li);
    });
};

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);

// Load Todos on Page Refresh
document.addEventListener("DOMContentLoaded", loadTodos);
