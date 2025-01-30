import { createTodo, readTodo, updateTodo, deleteTodo } from "./TodoApp/TodoApp.js";
import TodoList from "./TodoApp/TodoInterface.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid@11.0.5";

// Get all the inputs from html using querySeletor
// const addTodo = <HTMLButtonElement>document.querySelector('.add-todo-btn')
const inputTodo = <HTMLInputElement>document.querySelector('.todo-input')
const formTodo = <HTMLFormElement>document.querySelector('.todo-form')
const todoList = <HTMLUListElement>document.querySelector('.todo-list')
const clearTodo = <HTMLButtonElement>document.querySelector('.clear-btn')

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    let uuid = uuidv4()
    let task: TodoList = { id: uuid, title: inputTodo.value, isCompleted: false, createdAt: Date.now() }
    let addTask = createTodo(uuid, task)
    if (addTask) {
        inputTodo.value = ''
        await handleDynamicTodoElement(addTask.id)
        alert(addTask.message)
    }
}

const handleListing = async (e: Event) => {
    e.preventDefault()
    await handleDynamicTodoElement()
}

const handleDynamicTodoElement = async (id?: string) => {
    let todos = id ? await readTodo(id) : await readTodo()
    todos.forEach(newTodo => {

        let newList = <HTMLLIElement>document.createElement('li')
        newList.id = newTodo.id

        let newCheckbox = <HTMLInputElement>document.createElement('input')
        newCheckbox.name = 'isCompleted'
        newCheckbox.className = 'todo-checkbox'
        newCheckbox.checked = newTodo.isCompleted
        // newCheckbox.id = newTodo.id
        newCheckbox.value = newTodo.title
        newCheckbox.type = 'checkbox'

        const newSpan = <HTMLSpanElement>document.createElement('span');
        if (newTodo.isCompleted) {
            const newStrike = <HTMLElement>document.createElement('s')
            newStrike.textContent = newTodo.title
            newSpan.appendChild(newStrike)
        } else {
            newSpan.textContent = newTodo.title;
        }

        // const newButton = <HTMLButtonElement>document.createElement('button');
        // newButton.type = 'button'
        // newButton.textContent = 'Delete'
        // newButton.className = 'delete-todo'

        const newButton = <HTMLButtonElement>document.createElement('i');
        newButton.className = 'fas fa-trash delete-todo'

        newList.appendChild(newCheckbox);
        newList.appendChild(newSpan);
        newList.appendChild(newButton)

        todoList.append(newList)
    })
}

const handleCheckbox = async (e: Event) => {
    console.log('handleCheckbox', e.type);
    let checkBoxData = <HTMLElement>e.target
    let liElem = <HTMLElement>checkBoxData.closest('li')
    let inputElem = <HTMLInputElement>liElem?.querySelector('input')
    let spanElem = <HTMLSpanElement>liElem.querySelector('span')
    let updatedTodo = updateTodo(liElem.id, inputElem.value, inputElem.checked)
    if (updatedTodo) {
        if (inputElem.checked) {
            if (!spanElem.querySelector('s')) {
                let strikeTag = <HTMLElement>document.createElement('s')
                strikeTag.textContent = spanElem.textContent
                spanElem.textContent = ''
                spanElem.appendChild(strikeTag)
            }
        } else {
            if (spanElem.querySelector('s')) {
                let strikeTag = <HTMLElement>spanElem.querySelector('s')
                spanElem.textContent = strikeTag.textContent
                strikeTag.remove()
            }
        }
        alert(updatedTodo.message)
    }
}

const handleClearAllTodo = async (e: Event) => {
    let deletedTodos = deleteTodo()
    if (deletedTodos) {
        await removeLiElement()
        alert(deletedTodos.message)
    }
}

const handleDeleteTodo = async (e: Event) => {
    console.log('handleDeleteTodo', e.type);
    let deletedTodoBtn = <HTMLElement>e.target
    let liElem = <HTMLElement>deletedTodoBtn.closest('li')
    let deletedTodo = deleteTodo(liElem.id)
    if (deletedTodo) {
        await removeLiElement(liElem.id)
        alert(deletedTodo.message)
    }

}

const removeLiElement = (id?: string) => {
    if (id) {
        let liElement = <HTMLLIElement>document.getElementById(id)
        liElement.remove()
    } else {
        let allLiElements = todoList.querySelectorAll('li')
        allLiElements.forEach(liElem => {
            liElem.remove()
        })
    }
}

formTodo.addEventListener('submit', e => handleSubmit(e))

window.addEventListener('load', e => handleListing(e))

todoList.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains('todo-checkbox')) {
        handleCheckbox(e);
    }
    // e.stopImmediatePropagation()
})

todoList.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains('delete-todo')) {
        handleDeleteTodo(e);
    }
});

// removeTodo.forEach(button => {
//     button.addEventListener('click', (e: MouseEvent) => {
//         handleDeleteTodo(e);
//     });
// });

clearTodo.addEventListener('click', e => handleClearAllTodo(e))

// import { createTodo, readTodo, findOneTodo, updateTodo } from "./TodoApp/TodoApp";
// import TodoList from "./TodoApp/TodoInterface";

// let task: TodoList = { id: 1, title: 'Task 1', iscompleted: false }

// createTodo(task)

// let allTodos = readTodo()

// console.log('allTodos', allTodos)

// let findTodo = findOneTodo(1)

// console.log('findTodo', findTodo);

// let updateTodos = updateTodo(1, 'Task 1', true)


// let findTodos = findOneTodo(1)

// console.log('findTodos', findTodos);


