
// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoItems = document.querySelectorAll(".todo");

// event listners
todoButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("dblclick", openModal);
todoList.addEventListener("dragstart",dragfunction);
document.addEventListener("keydown",checkAll);


// functions
function addTask(event){
    // console.log("clicked");
    event.preventDefault();

    // Remove during testing
    // if(todoInput.value === ""){
    //     return;
    // }

    // create new div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // check box
    const completedBtn = document.createElement("div");
    completedBtn.innerHTML = '<input type="checkbox" class="completed-btn" >'
    // completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    // icon
    const statusIcon = document.createElement("div");
    statusIcon.innerHTML = `<i class="fas fa-hourglass-half pending"></i>`;
    statusIcon.classList.add("statusDiv");
    todoDiv.appendChild(statusIcon);

    // create task 
    // const linkTag = document.createElement("a"); 
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    // put this task item in div
    // linkTag.appendChild(newTodo);
    // newTodo.addEventListener("dblclick",openModal);
    todoDiv.appendChild(newTodo);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);


    // drag button
    const dragBtn = document.createElement("button");
    dragBtn.innerHTML = '<i class="fas fa-arrows-alt"></i>'
    dragBtn.classList.add("drag-btn");

    todoDiv.setAttribute("draggable","true")
    todoDiv.appendChild(dragBtn);
    
    // append this div to the list of tasks
    todoList.appendChild(todoDiv);
    
    // clear input
    todoInput.value = "";
    // dragBtn.addEventListener("dragstart",dragfunction);
}

function deleteCheck(event){
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
        const parent = elem.parentElement.parentElement;
        parent.classList.toggle("completed");
        // console.log(parent);

        const targetDiv = parent.querySelector(".statusDiv");
        if(parent.classList.contains("completed")){
            targetDiv.innerHTML = `<i class="fas fa-check finshed"></i>`
        }else{
            targetDiv.innerHTML = `<i class="fas fa-hourglass-half pending"></i>`
        }
    }
}

function dragfunction(event){
    const elem = event.target;
    elem.classList.add('dragging');

    const items = todoList.children;
    // console.log(items);
    // console.log(typeof(items));

    for(let i=0; i<items.length;i++ ){
        // console.log(i, "th element is - ", items[i]);
        items[i].addEventListener("dragover",dragOver);
        items[i].addEventListener("dragenter",dragEnter);
        items[i].addEventListener("dragleave",dragLeave);
        items[i].addEventListener("drop",dragDrop);
    }

    // console.log("start");
    // console.log("elem",elem);
    elem.addEventListener('dragend', () => {
        elem.classList.remove('dragging')
        // console.log("end");
    })
}

function dragOver(event){
    event.preventDefault();
    // const draggable = document.querySelector(".dragging");
    // todoList.appendChild(draggable);

    console.log("todo is ",todoList);
    const afterElement = getDragAfterElement(todoList, event.clientY);
    const draggable = document.querySelector('.dragging');
    if(afterElement == null){
        todoList.addEventListener('dragover', event => {
            todoList.appendChild(draggable)
        })
    }else{
        todoList.insertBefore(draggable, afterElement)
    }
    // console.log(afterElement);
    // console.log("dragover");
}

function dragEnter(event){
    // event.preventDefault();
    // console.log("dragenter");
}

function dragLeave(){
    // console.log("dragleave");
}

function dragDrop(){
    // console.log("dragdrop");
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo:not(.dragging)')]
    // console.log("Here is : ",draggableElements[0]);
    // console.log("all items length is - ",draggableElements.length);
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2;
      console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

// Function to check/uncheck all checkboxes
function checkAll(event){
    if(event.ctrlKey && event.key.toLowerCase() === "q" ){
        const allCheckBoxes = document.querySelectorAll(".todo")

        allCheckBoxes.forEach((checkBox)=>{
            const thisCheckBox = checkBox.querySelector(".completed-btn");
            thisCheckBox.checked = true;
            thisCheckBox.parentElement.parentElement.classList.add("completed");
            const iconDiv = checkBox.querySelector(".statusDiv");
            // console.log(iconDiv);
            iconDiv.innerHTML = `<i class="fas fa-check finshed"></i>`;
        })
    }

    if(event.ctrlKey && event.key.toLowerCase() === "x" ){
        const allCheckBoxes = document.querySelectorAll(".todo")

        allCheckBoxes.forEach((checkBox)=>{
            const thisCheckBox = checkBox.querySelector(".completed-btn");
            thisCheckBox.checked = false;
            thisCheckBox.parentElement.parentElement.classList.remove("completed");
            const iconDiv = checkBox.querySelector(".statusDiv");
            // console.log(iconDiv);
            iconDiv.innerHTML = `<i class="fas fa-hourglass-half pending"></i>`;
        })
    }
}


function openModal(event){
    const liItem = event.target;
    
    const parent = liItem.parentElement;
    console.log("parent element is ",parent);
    
    let customContent ="";
    customContent = `<div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    ${parent.querySelector(".todo-item").innerText}
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">${"List changes"}</button>
    </div>
    </div>`;    
    
    document.querySelector(".modal-dialog").innerHTML = customContent;

    liItem.setAttribute("data-bs-toggle","modal")
    liItem.setAttribute("data-bs-target","#exampleModal")

    
}