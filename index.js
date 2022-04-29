/*
Simple Todo App with CRUD functionality
- Create a todo
- Read a todo (This won't require a function because you won't be able to click into the todo. They'll all be in a list.)
- Update (Edit the todo after creating it)
- Delete (Delete an individual todo)
*/

// localStorage.clear()
let todos = []; // An empty array to store a todo
let todoIndexNumber = -1; // Reference number for todos in the array
const todosFromLocalStorage = JSON.parse(localStorage.getItem('myTodos'));
const newTodo = document.getElementById('todo-input'); // New todo input
const submitBtn = document.getElementById('submit-btn'); // Store submit button's id to pass to the event listener
const deleteBtn = document.getElementById('delete-btn'); // Store delete buttons id to pass to the event listener
const todosWrapper = document.getElementById('todos-wrapper'); // HTML div for storing the todos in a list

// Passes newTodo input to createTodo() function on click
submitBtn.addEventListener('click', function() {
    createTodo(newTodo.value);
    console.log(newTodo.value);
})

// Checks if there are any todos in local storage
if (todosFromLocalStorage) {
    todos = todosFromLocalStorage;
    console.log(todos);
    render(todos);
} else {
    console.log('No todos in local storage.');
    checkIfAnyTodos(todos);
};

// Creates a todo after detecting a submit button click
function createTodo(todo) {
    todos.push(todo);
    newTodo.value = '';

    localStorage.setItem('myTodos', JSON.stringify(todos));

    console.log(todo);
    render(todos);
};

// Deletes a todo after an onclick calls the function. The onclick can be found in the render(todos) function.
function deleteTodo(todo) {
    todos.splice(todo, 1);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    console.log(todo);
    render(todos);
    showConfettiOnCompletion();

    console.log(todos);
};

function updateTodo(todo) {};

function render(todos) {
    let todoItems = [];
    for (i in todos) {
        todoItems += `
            <div class="todo-item">
                <p style="margin-right: 15px;">${todos[i]}</p>
                <a href="#" class="delete-btn" id="delete-btn" onclick="deleteTodo(${Number(i)})"><img src="/Assets/check.svg" alt="Check mark completion button" class="check-image"></a>
            </div>
        `;
    }
    todosWrapper.innerHTML = todoItems;
    checkIfAnyTodos(todos);
};

function checkIfAnyTodos(todos) {
    if (todos.length === 0) {
        let emptyTodoListAlert = `<div class="empty-alert">
        <p style="margin-right: 15px;">You have nothing jotted down.</p>
        </div>`
        todosWrapper.innerHTML = emptyTodoListAlert;
    };
};

function showConfettiOnCompletion() {
    for(i=0; i<100; i++) {
        // Random rotation
        let randomRotation = Math.floor(Math.random() * 360);
          // Random Scale
          let randomScale = Math.random() * 1;
        // Random width & height between 0 and viewport
        let randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        let randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
        
        // Random animation-delay
        let randomAnimationDelay = Math.floor(Math.random() * 15);
        console.log(randomAnimationDelay);
      
        // Random colors
        let colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
      
        // Create confetti piece
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.top=randomHeight + 'px';
        confetti.style.right=randomWidth + 'px';
        confetti.style.backgroundColor=randomColor;
        // confetti.style.transform='scale(' + randomScale + ')';
        confetti.style.obacity=randomScale;
        confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
        confetti.style.animationDelay=randomAnimationDelay + 's';
        document.getElementById("confetti-wrapper").appendChild(confetti);
      }
};