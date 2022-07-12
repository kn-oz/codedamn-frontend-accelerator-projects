let todos = []
const todoForm = document.getElementById('todo-form')

todoForm.addEventListener('submit', addToDo);

function addToDo(event) {
    
    event.preventDefault()

    const todoInput = document.getElementById('todo-input')

    const todo = todoInput.value.trim();

    todoInput.value = ''
    
    if (todo !== '' && todo) {
        const todoItem = {
            id: Date.now(),
            value: todo,
            done: false
        }

    todos.push(todoItem)
    }

    

    updateDom()
}

function deleteToDo(event) {
    event.preventDefault()

    const target = event.target
    const id = Number(target.getAttribute('key')) 

    todos = todos.filter(todo => todo.id !== id)

    updateDom()
}

function checkToDo(event) {
    event.preventDefault()

    const target = event.target
    const id = Number(target.getAttribute('key'))

    todos = todos.map(todo => {
        if (todo.id !== id) {
            return todo
        } else {
            let updatedStatus = !todo.done
            return {
                ...todo,
                done: updatedStatus
            }
        }
    })

    updateDom()
}    

function updateDom() {
    const todoList = document.getElementById('todo-list')

    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild)
    }

    const ul = document.createElement('ul')

    todos.forEach(todo => {
        const li = document.createElement('li')
        li.setAttribute('class', 'todo')
        li.setAttribute('id', todo.id)

        const todoTask = document.createElement('p')
        todoTask.setAttribute('class', 'todo-task')
        todoTask.textContent = todo.value
        li.append(todoTask)

        const checkButton = document.createElement('button')
        checkButton.setAttribute('class', `check-button ${todo.done ? 'done' : ''}`)
        checkButton.setAttribute('key', todo.id)
        checkButton.addEventListener('click', checkToDo)
        checkButton.innerHTML = '&#x2611;'
        li.append(checkButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('class', 'delete-button')
        deleteButton.setAttribute('key', todo.id)
        deleteButton.addEventListener('click', deleteToDo)
        deleteButton.innerHTML = '&#x2612;'
        li.append(deleteButton)

        ul.append(li)
    })

    todoList.append(ul)
}