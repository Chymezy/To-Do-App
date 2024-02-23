document.addEventListener('DOMContentLoaded', function () {
    const tasks = []; // Array to store tasks
    const taskInput = document.querySelector('.taskInput');
    const addTaskBtn = document.querySelector('.addTaskBtn');
    const taskList = document.querySelector('.TaskList');

    addTaskBtn.addEventListener('click', function () {
        const taskTitle = taskInput.value.trim();
        if (taskTitle !== '') {
            const task = { title: taskTitle, completed: false };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        taskList.innerHTML = ''; // Clear the existing task list

        tasks.forEach(function (task, index) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('taskItem');

            if (task.completed) {
                taskItem.classList.add('completedTask');
            }

            taskItem.innerHTML = `
                <span>${task.title}</span>
                <button onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    window.toggleCompletion = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

//    window.editTask = function (index) {
//        const newTitle = prompt('Enter a new title for the task:');
//        if (newTitle !== null) {
//            tasks[index].title = newTitle;
//            renderTasks();
//        }
//    };

    window.editTask = function (index) {
        const task = tasks[index];

        if (!task.completed) {
            // Allow editing only if the task is not completed
            const newTitle = prompt('Enter a new title for the task:');

            if (newTitle !== null && newTitle.trim() !== '') {
                // Check if the new title is not null and not an empty string
                tasks[index].title = newTitle;
                renderTasks();
            } else if (newTitle !== null) {
                // Show an alert if the new title is an empty string
                alert('Please enter a non-empty title for the task.');
            }
        } else {
            alert('Completed tasks cannot be edited.');
        }
    };



    window.deleteTask = function (index) {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };
});

