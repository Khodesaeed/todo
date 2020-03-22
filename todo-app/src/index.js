import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'
import { renderTodo } from './view'

renderTodo()

document.querySelector('#searchTodo').addEventListener('input', e => {
    
    setFilters({
        searchText: e.target.value
    })

    renderTodo()
})

document.querySelector('#addTodoForm').addEventListener('submit', e => {
    const value =  e.target.elements.addTodo.value.trim()
    e.preventDefault()

    if(value.length > 0) {
        createTodo(value)
    }
    
    renderTodo()
    e.target.elements.addTodo.value = '' 
})

document.querySelector('#hideComplete').addEventListener('change', e => {
    setFilters({
        hideCompleted: e.target.checked
    })
    debugger
    renderTodo()
})

window.addEventListener('storage', (e) => {
    loadTodos()
    renderTodo()
})
// renderTodo()