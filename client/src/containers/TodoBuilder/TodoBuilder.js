import React, {useContext, useState} from "react";
import AddTodoForm from "../../components/Forms/AddTodoForm";
import TodoList from "../../components/TodoList/TodoList";
import Loader from "../../components/Loader/Loader"
import Context from "../../Context";
import TodoService from "../../service/TodoService";

const TodoBuilder = (props) => {
    const [todos, setTodos] = props.todo
    const [addingError, setAddingError] = useState('')
    const {isLoading} = useContext(Context)
    const {userId} = useContext(Context)

    const content = isLoading ? <Loader /> : <TodoList todos={todos} />

    const clearErrors = () => {
        setAddingError('')
    }

    const addTodoHandler = async (event, name, description) => {
        event.preventDefault()
        const response = await TodoService.addTodoHandler(name, description, userId)
        console.log(response)
        if (response) {
            clearErrors()
            setTodos(prevState => [
                ...prevState,
                {id: response.id, name: name, description: description, done: false}
            ])
        }
        else if (response === 401){
            props.setIsLoggedIn(false)
        }
    }

    const toggleDoneHandler = async (id, name, description, done) => {
        const response = await TodoService.toggleDoneHandler(id, name, description, done)
        if(response === 200) {
            setTodos(todos.map((todo) => {
                if (id === todo.id) {
                    todo.done = !todo.done;
                }
                return todo
            }))
        }
        else {
            props.setIsLoggedIn(false)
        }
    }

    const deleteTodoHandler = async (id) => {
        const response = await TodoService.deleteTodoHandler(id)
        if (response === 200) {
            setTodos(todos.filter((todo) => (id !== todo.id)))
        }
        else {
            props.setIsLoggedIn(false)
        }
    }

    return(
        <Context.Provider value={{deleteTodoHandler, toggleDoneHandler}}>
            <AddTodoForm setAddingError={setAddingError} addTodoHandler={addTodoHandler} addError={addingError}/>
            {content}
        </Context.Provider>
    )
}

export default TodoBuilder;