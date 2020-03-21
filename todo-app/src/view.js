import { getFilters } from './filters'
import { getTodos, toggleTodo, removeTodo } from './todos'

// create DOM element fo individual note
let generateToDOM = function (item) {
    const rootDiv = document.createElement('label')
    // setup checkbox input
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = item.completed
    checkBox.addEventListener('change', () => {
        toggleTodo(item)
        renderTodo()
    })


    // setup text section
    const text = document.createElement('span')
    text.setAttribute('href', `edit.html/#${item.id}`)
    text.textContent = item.text

    // setup container element
    const containerEl = document.createElement('div')
    rootDiv.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    rootDiv.appendChild(containerEl)

    // setup button
    const button = document.createElement('button')
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
        removeTodo(item.id)
        renderTodo()
    })

    // create DOM section
    containerEl.appendChild(checkBox)
    containerEl.appendChild(text)
    rootDiv.appendChild(button)
    document.querySelector('#todos').appendChild(rootDiv)
}

//get the DOM elements for list summery
let generateSummeryDOM = function (todos) {
    const incompleteTodo = todos.filter(todo => !todo.complete)
    const summery = document.createElement('h3')
    const plural = incompleteTodo.length === 1 ? '' : 's'
    summery.classList.add('list-title')
    summery.textContent = `You have ${incompleteTodo.length} todo${plural} left`

    document.querySelector('#todos').appendChild(summery)
}
// render the data 
const renderTodo = function () {
    const filters = getFilters()
    const todos = getTodos()
    const filteredTodo = todos.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    document.querySelector('#todos').innerHTML = ''

    generateSummeryDOM(todos)

    if (!filters.hideCompleted) {
        if (filteredTodo.length > 0) {
            filteredTodo.forEach(item => generateToDOM(item))
        } else {
            const emptySituation = document.createElement('p')
            emptySituation.classList.add('empty-message')
            emptySituation.textContent = 'No To-dos to show'
            document.querySelector('#todos').appendChild(emptySituation)

        }
    } else {
        filteredTodo.forEach(item => {
            if (!item.complete) {
                generateToDOM(item)
            }
        })
    }
}

export { generateSummeryDOM, generateToDOM, renderTodo}