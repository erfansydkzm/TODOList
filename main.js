let todos = localStorage.getItem("todos");

try {
    todos = JSON.parse(todos);
    todos = todos.length ? todos : null
} catch (error) {
    todos = null;
}

if (!todos) {
    todos = [
        { content: "shopping", status: true },
        { content: "test1", status: true },
        { content: "test2", status: true },
        { content: "test3", status: true }
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}

function CreateTodos(todos) {
    let todosList = document.querySelector("#todos-list");
    todosList.innerHTML = "";

    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        let content = document.createElement("span");
        content.textContent = todo.content;
        content.style.textDecoration = todo.status ? "initial" : "line-through";
        let DeleteBtn = document.createElement("img");
        DeleteBtn.className = "float-right";
        DeleteBtn.alt = "delete icon";
        DeleteBtn.src = "media/delete.png";
        li.append(content);
        li.append(DeleteBtn);
        todosList.append(li);

        DeleteBtn.addEventListener("click", e => {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            CreateTodos(todos);
        })
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status;
            localStorage.setItem("todos", JSON.stringify(todos));
            CreateTodos(todos);
        })
    });
}

CreateTodos(todos);

let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");


Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
            <form id="add">
            <input class="form-control" name="add" placeholder="Add TODO Item">
            </form>
            `;
            CreateTodos(todos);
            let add = document.querySelector("#add");
            add.addEventListener("submit", e => {
                e.preventDefault();
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true });
                    CreateTodos(todos);
                    localStorage.setItem("todos", JSON.stringify(todos));
                    add.reset();
                }
            })
            action.addEventListener("click", e => {
                e.preventDefault();
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true });
                    CreateTodos(todos);
                    localStorage.setItem("todos", JSON.stringify(todos));
                    add.reset();
                }
            })
        })
    } else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
            <form id="search">
                    <input class="form-control" name="search" placeholder="Search in TODO Item">
                </form>
            `;
            let search = document.querySelector("#search");
            search.addEventListener("keyup", e => {
                e.preventDefault();
                if (search.search.value) {
                    let filterd_todos = todos.filter(todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase()))
                    CreateTodos(filterd_todos)
                } else {
                    CreateTodos(todos)
                }
            })
        })
    }
})