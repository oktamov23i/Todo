const storedData = JSON.parse(localStorage.getItem('todoData')) || [
    { id: 1, 
      title: "Erta turish", 
      status: true },

    { id: 2, 
      title: "Yuz yuvish", 
      status: false },

    { id: 3, 
      title: "Nonushta qilish", 
      status: false }
];

const data = [...storedData];
const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");
const todoForm = document.querySelector(".todo-form");

function saveToLocalStorage() {
    localStorage.setItem('todoData', JSON.stringify(data));
}

function renderTodos() {
    todoList.innerHTML = "";
    data.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.innerHTML = `
            <label>
                <input type="checkbox" ${task.status ? "checked" : ""} data-id="${task.id}">
                <span class="${task.status ? 'completed' : ''}">${task.title}</span>
            </label>
            <button data-id="${task.id}">X</button>
        `;
        todoList.appendChild(listItem);
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = newTaskInput.value.trim();
    if (title) {
        data.push({ id: Date.now(), title, status: false });
        newTaskInput.value = "";
        saveToLocalStorage();
        renderTodos();
    }
});

todoList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.type === "checkbox") {
        const task = data.find(t => t.id == id);
        task.status = e.target.checked;
        saveToLocalStorage();
        renderTodos();
    } else if (e.target.tagName === "BUTTON") {
        const index = data.findIndex(t => t.id == id);
        data.splice(index, 1);
        saveToLocalStorage();
        renderTodos();
    }
});

window.addEventListener("load", ()=>{
    renderTodos()
})


