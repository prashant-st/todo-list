
// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listners
todoButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteChecked);

// functions
function addTask(event){
    console.log("clicked");
    event.preventDefault();

    // create new div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // check box
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    // create task 
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    
    // put this task item in div
    todoDiv.appendChild(newTodo);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    // append this div to the list of tasks
    todoList.appendChild(todoDiv);

    // clear input
    todoInput.value = "";
}

function deleteChecked(event){
    const elem = event.target;
    // console.log("clicked here " , elem);

    if(elem.classList[0] === "delete-btn"){
        const parent = elem.parentElement;
        parent.classList.add("shrink");
        parent.addEventListener("transitionend", ()=>{
            parent.remove();
        })
    }

    if(elem.classList[0] === "completed-btn"){
        const parent = elem.parentElement;
        parent.classList.toggle("completed");
    }
}



