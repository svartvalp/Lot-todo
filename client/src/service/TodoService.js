let TodoService = {
    getTodos: async (isLoggedIn, userId, setTodos) => {
        if (isLoggedIn) {
            const response = await fetch(`/todo/user/${userId}`)
            const responseJson = await response.json()
            setTodos(responseJson)
        }
    },

    addTodoHandler: async (name, description, userId) => {
        const response = await fetch(`/todo/user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        })
        if(response.status < 400) {
            const responseJson = await response.json()
            return responseJson
        }
        else {
           return ''
        }
    },

    toggleDoneHandler: async (id, name, description, done) => {
        const response = await fetch('/todo/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                "id": id,
                "done": !done,
                "name": name,
                "description": description
            })
        })
        return response.status
    },

    deleteTodoHandler: async (id) => {
        const response = await fetch(`/todo/${id}`, {
            method: 'DELETE',
        })
        console.log(response.status)
        return response.status
    }
};
export default TodoService