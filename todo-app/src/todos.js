import uuidv4 from 'uuid/v4'

let todos = []

const loadTodo = function () {
    // get the localStorage datas
    const todosJSON = localStorage.getItem('todos')
    // assign the locaStorage datas to todo array if its exists.
    try {
        todos = todosJSON !== null ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

let saveTodo = function () {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
        text,
        id: uuidv4(),
        completed: false
    })
    saveTodo()
}

// remove element section
let removeTodo = function (id) {
    let removeEl = todos.findIndex(todo => {
        return todo.id === id
    })
    if (removeEl > -1) {
        todos.splice(removeEl, 1)
        saveTodo()
    }
}

let toggleTodo = function (id) {
    // debugger
    let matchedTodo = todos.find(todo => todo.id === id.id)
    if (matchedTodo !== undefined) {
        matchedTodo.completed = !matchedTodo.completed
        saveTodo()
    }
}

loadTodo()

export {
    createTodo,
    removeTodo,
    toggleTodo,
    getTodos
}