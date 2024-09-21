document.getElementById('addButton').addEventListener('click', addTask);
function handleAddTask() {
    const name = document.getElementById('taskInput').value;

    if (name) {
        addTask(name); 
        document.getElementById('taskInput').reset(); 
    }
}

document.getElementById('addButton').addEventListener('click', handleAddTask);

document.getElementById('taskInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleAddTask(); 
    }
});

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskTime = new Date().toLocaleTimeString();
    const task = {
         text: taskText, 
         time: taskTime};
    tasks.push(task);
    taskInput.value = '';

    renderTasks();
}

function renderTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} (added at ${task.time})`;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(completeButton);
        taskDiv.appendChild(deleteButton);
        taskContainer.appendChild(taskDiv);
    });
}
