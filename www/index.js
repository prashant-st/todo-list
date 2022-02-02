let arrayList = [];
let idNumber = 1;

const submitBtn = document.querySelector(".add-button")
const itemContainer = document.querySelector(".task-container")
const closeBtn = document.querySelector('.close')
const modal = document.querySelector('#my-modal')
const saveBtn = document.querySelector(".save-list")
const loadBtn = document.querySelector(".load-list")
const clearLs = document.querySelector(".clear-ls")

itemContainer.addEventListener("dragstart",dragfunction);

window.addEventListener('click', (event)=>{
    if (event.target == modal) {
        const modalBody = document.querySelector(".modal-body")
        modalBody.classList = "modal-body"

        modal.style.display = 'none';
    }
});

closeBtn.addEventListener('click', ()=>{
    const modalBody = document.querySelector(".modal-body")
    modalBody.classList = "modal-body"

    modal.style.display = 'none';
});

document.addEventListener("keydown",(event) =>{

    if(event.ctrlKey && event.key.toLowerCase() === "q" ){
        const allListItems = document.querySelectorAll(".todo")
        allListItems.forEach((listItem)=>{
            const statusDiv = listItem.querySelector(".status-div");
            const inputField = statusDiv.querySelector("input")
            inputField.checked = true;
            statusDiv.parentElement.classList.add("completed");
            const iconDiv = listItem.querySelector(".status-icon");
            iconDiv.innerHTML = `<i class="fas fa-check"></i>`;
        })
    }

    if(event.ctrlKey && event.key.toLowerCase() === "x" ){
        const allListItems = document.querySelectorAll(".todo")
        allListItems.forEach((listItem)=>{
            const statusDiv = listItem.querySelector(".status-div");
            const inputField = statusDiv.querySelector("input")
            inputField.checked = false;
            statusDiv.parentElement.classList.remove("completed");
            const iconDiv = listItem.querySelector(".status-icon");
            iconDiv.innerHTML = `<i class="fas fa-hourglass-half"></i>`;
        })
    }
    
});

submitBtn.addEventListener("click",()=>{
    const inputElem= document.querySelector("#input")
    const dateElem = document.querySelector("#date")
    const priorityElem = document.querySelector("#priority")

    if(inputElem.value === "" || dateElem.value === ""){
        alert("Enter all details to add task");
        return;
    }

    inputElem.value = inputElem.value.trim()
    // dateElem.value = "2022-01-30"  //default date added
    const taskObj = {
        id : idNumber++,
        taskInput : inputElem.value,
        dueDate : dateElem.value,
        priority : priorityElem.value
    }

    arrayList.push(taskObj);
 
    const screenWidth = screen.width   
    // console.log("screen size is : ",screenWidth);

    if(screenWidth >= 960){
        // console.log("960+");
        if(inputElem.value.length > 40){
            // console.log("greater 40");
            inputElem.value = inputElem.value.substr(0,40) +"..."
        }
    }else if(screenWidth >= 720){
        // console.log("720+");
        if(inputElem.value.length > 35){
            // console.log("greater 35");
            inputElem.value = inputElem.value.substr(0,35) +"..."
        }
    }else if(screenWidth >= 480){
        // console.log("480+");
        if(inputElem.value.length > 30 ){
            // console.log("greater 30");
            inputElem.value = inputElem.value.substr(0,30) +"..."
        }
    }else{
        // console.log("less than 480");
        if(inputElem.value.length > 20){
            // console.log("greater 20");
            inputElem.value = inputElem.value.substr(0,20) +"..."
        }
    }

    
    const newTaskObj = {
        id : taskObj.id,
        taskInput : inputElem.value,
        dueDate : dateElem.value,
        priority : priorityElem.value
    }

    createListItem(newTaskObj);





    // clear input area
    inputElem.value = ""
    dateElem.value = ""
});

document.addEventListener("dblclick",(event) =>{
    // console.log("location is ", event.target);
    if(!event.target.classList.contains("todo-item") && !event.target.classList.contains("todo")){
        // console.log("other elements");
    }else{
        // console.log("in target area div");
        let elem = event.target

        if(elem.classList.contains("todo-item")){
            elem = elem.parentElement.parentElement
        }
        // console.log("this is element ",elem); // we have the div with id
        const id = parseInt(elem.id.substr(4))
        const targetData = getTargetId(id);
        // console.log("targetData is :", targetData);
        showModal(targetData);
    }
})

const showModal = (targetData) =>{
    // console.log("clicked here with data :",targetData);
    
    const modalBody = document.querySelector(".modal-body")
    modalBody.classList.add(targetData.priority)

    document.querySelector(".modal-heading").innerText = `Task ID: ${targetData.id}`;
    document.querySelector(".modal-value").innerText = targetData.taskInput
    document.querySelector(".modal-due-date").innerText = `Due Date is : ${targetData.dueDate}`
    document.querySelector(".modal-priority").innerText = `Priority : ${targetData.priority}`
    
    modal.style.display = 'block';
}

const createListItem = (taskObj) => {
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    todoDiv.setAttribute("id",`task${taskObj.id}`)
    todoDiv.setAttribute("draggable","true")

    const taskItem = `
                    <div class="status-div">
                        <input type="checkbox" onclick="toggleTask(event)" class="completed-btn">
                        <div class="status-icon">
                            <i class="fas fa-hourglass-half pending"></i> 
                        </div>
                    </div>
                    <div class="task-text">
                        <li class="todo-item">${taskObj.taskInput}</li>
                    </div>
                    <div class="icons">
                        <i class="fas fa-trash" onclick="deleteTask(event)"></i>
                        <i class="fas fa-arrows-alt"></i>
                    </div>
                    `

    todoDiv.innerHTML = taskItem

    itemContainer.appendChild(todoDiv)
}

const deleteTask = async (event)=>{
    const elem = event.target
    const parent = elem.parentElement.parentElement.parentElement
    const id = parseInt(parent.id.substr(4))

    parent.classList.add("shrink");
    parent.addEventListener("transitionend", ()=>{
        parent.remove();
    })
    
    deleteByAttr(arrayList,"id",id)
    // console.log("updates array is ", arrayList);
}

const toggleTask = (event) =>{
    const elem = event.target
    const parent = elem.parentElement.parentElement
    // console.log(parent);

    parent.classList.toggle("completed");
    const targetDiv = parent.querySelector(".status-icon");
    if(parent.classList.contains("completed")){
        targetDiv.innerHTML = `<i class="fas fa-check finshed"></i>`
    }else{
        targetDiv.innerHTML = `<i class="fas fa-hourglass-half pending"></i>`
    }
}

const getTargetId = (id) =>{

    for(var i=0; i<arrayList.length;i++){
        var arrayItem = arrayList[i];
        if(arrayItem.id === id){    
            const arrayItemObj = {
                id : arrayItem.id,
                taskInput : arrayItem.taskInput,
                dueDate : arrayItem.dueDate,
                priority : arrayItem.priority
            }
            return arrayItemObj;
        }
    }
}

const deleteByAttr = (arr, attr, value) => {
    arr.splice(arr.findIndex(a => a.id === value) , 1)
}

function dragfunction(event){
    const elem = event.target;
    // console.log("elem is ",elem);
    elem.classList.add('dragging');

    const items = itemContainer.children;
    // console.log(items);
            
    for(let i=0; i<items.length;i++){
        items[i].addEventListener("dragover",dragOver);
    }

    elem.addEventListener('dragend', () => {
        elem.classList.remove('dragging')
    })
}

function dragOver(event){
    event.preventDefault();

    const afterElement = getDragAfterElement(itemContainer, event.clientY);
    const draggable = document.querySelector('.dragging');
    if(afterElement === null){
        itemContainer.addEventListener('dragover', event => {
            itemContainer.appendChild(draggable)
        })
    }else{
        itemContainer.insertBefore(draggable, afterElement)
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2;
    //   console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

saveBtn.addEventListener("click",()=>{

    localStorage.clear();
    const arrToSave = getAllListItems();
    // console.log(typeof(arrToSave)," is the type");
    
    localStorage.setItem("data",JSON.stringify(arrToSave));
    
    if(arrToSave.length === 0){
        localStorage.clear();
    }
    // console.log("stored!!");
})

const getAllListItems = ()=>{
    const todoItems = document.querySelectorAll(".todo")

    let arrToSave = []

    todoItems.forEach((task)=>{
        console.log("id is : ",task);
        const id = parseInt(task.id.substring(4))
        arrToSave.push(getTargetId(id))
    })

    // console.log(typeof(arrToSave));

    return arrToSave;
}

loadBtn.addEventListener("click",(event)=>{
    
    console.log(localStorage.length);
    const keys = Object.keys(localStorage)
    
    // console.log(keys);
    
    const arrOfData = JSON.parse(localStorage.getItem("data"))
    
    // console.log("arrOfData is ",arrOfData);

    localStorage.setItem("data",JSON.stringify(arrOfData));  // push back the retrieved items
    
    if(!arrOfData){
        alert("Save some data first");
        localStorage.clear()
        event.preventDefault()
        return;
    }else{

        itemContainer.innerHTML = "";
        arrayList = []
        arrOfData.forEach((data)=>{
            if(data){
                arrayList.push(data)
                createListItem(data)
            }
        })
    }
})

clearLs.addEventListener("click", ()=>{
    localStorage.clear();
})