document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput").value.trim();
    let taskDateTime = document.getElementById("taskDateTime").value;
    let taskCategory = document.getElementById("taskCategory").value;
    
    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskInput} - ${taskCategory} (Due: ${taskDateTime})</span>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    `;
    taskList.appendChild(li);
    saveTasks();
    document.getElementById("taskInput").value = "";
}

function toggleTask(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}
