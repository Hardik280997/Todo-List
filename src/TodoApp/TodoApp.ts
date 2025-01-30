import TodoList from "./TodoInterface.js";


const createTodo = (uuid: string, task: TodoList) => {
    // taskList.push(task)
    localStorage.setItem(uuid, JSON.stringify(task))
    let response = {
        id: uuid,
        message: 'Todo Added Successfully!'
    }
    return response
}

const readTodo = (id?: string): TodoList[] => {
    let taskList: TodoList[] = [];
    if (!id) {
        for (let index = 0; index < localStorage.length; index++) {
            let taskId = localStorage.key(index)
            if (taskId) {
                let taskDetails = localStorage.getItem(taskId)
                if (taskDetails) {
                    taskList.push(JSON.parse(taskDetails))
                }
            }
        }
    } else {
        let taskDetails = localStorage.getItem(id)
        if (taskDetails) {
            taskList.push(JSON.parse(taskDetails))
        }
    }
    let sortedTodo = taskList.sort((a, b) => a.createdAt - b.createdAt)
    return sortedTodo
}

const updateTodo = (id: string, newTitle?: string, newIsCompleted?: boolean) => {
    let todo = localStorage.getItem(id)
    if (!todo) {
        throw new Error("Todo not found with this id");
    } else {
        let parsedTodo = JSON.parse(todo)
        parsedTodo.title = newTitle
        parsedTodo.isCompleted = newIsCompleted
        localStorage.setItem(id, JSON.stringify(parsedTodo))
    }
    let response = {
        message: 'Todo Updated Successfully!'
    }
    return response
}

const deleteTodo = (id?: string) => {
    if (id) {
        localStorage.removeItem(id)
    } else {
        localStorage.clear()
    }
    let response = {
        message: 'Todo Deleted Successfully!'
    }
    return response
}

// const findOneTodo = (id: number) => {
//     let todo = taskList.find(task => task.id === id)
//     if (!todo) {
//         throw new Error("Todo not found with this id");
//     }
//     return todo
// }



// let title: string = 'New Todo'
// let isCompleted: boolean = false

// console.log('title', title)
// console.log('isCompleted', isCompleted);

export { createTodo, readTodo, updateTodo, deleteTodo }