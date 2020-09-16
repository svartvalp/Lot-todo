import React from "react";
import Todo from "./Todo/Todo"
import classes from './TodoList.module.css'

const TodoList = (props) => {
    let list = null;

    if (Array.isArray(props.todos)) {
        list = props.todos.map((todo, index) => {
            return (<Todo id={todo.id} key={todo.id} name={todo.name} index={index + 1} done={todo.done} description={todo.description}/>)
        })
    }

    return(
        <div className={classes.todoWrapper}>
            <ul className={classes.todoList}>
                {list}
            </ul>
        </div>
    )
}

export default TodoList;