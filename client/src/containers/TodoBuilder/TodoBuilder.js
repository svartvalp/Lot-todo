import React, {useContext, useState} from "react";
import AddTodoForm from "../../components/Forms/AddTodoForm";
import TodoList from "../../components/TodoList/TodoList";
import Loader from "../../components/Loader/Loader"
import Context from "../../Context";

const TodoBuilder = (props) => {
    const [todos, setTodos] = props.todo
    const [addingError, setAddingError] = useState(false)
    const {isLoading} = useContext(Context)

    const content = isLoading ? <Loader /> : <TodoList todos={todos} />

    const addTodoHandler = (event, name, description) => {
        event.preventDefault()
        if (name === "") {
            return;
        }
        fetch(`/todo/user/${window.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.id) {
                    setAddingError(false)
                    setTodos(prevState => [
                        ...prevState,
                        {id: data.id, name: name, description: description, isDone: false}
                    ])
                }
                else {
                    setAddingError(true)
                }
            })
            .catch(error => {
                setAddingError(true)
            })
    }

    const toggleDoneHandler = (id, name, description, done) => {
        fetch('/todo/', {
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
            .then(response => {})
        setTodos(todos.map((todo) => {
            if(id === todo.id) {
                todo.done = !todo.done;
            }
            return todo
        }))
    }

    const deleteTodoHandler = (id) => {
        fetch(`/todo/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
        setTodos(todos.filter((todo) => (id !== todo.id)))
    }

    return(
        <Context.Provider value={{deleteTodoHandler, toggleDoneHandler}}>
            <AddTodoForm addTodoHandler={addTodoHandler} addError={addingError}/>
            {content}
        </Context.Provider>
    )
}

export default TodoBuilder;