import React, {useContext} from "react";
import {Button} from "@material-ui/core";
import classes from './Todo.module.css'
import Context from "../../../Context";
import Aux from "../../../hoc/Aux";

const Todo = (props) => {
    //const [isDoneTodo, setIsDoneTodo] = useState(props.isDone)
    const {deleteTodoHandler} = useContext(Context)
    const {toggleDoneHandler} = useContext(Context)
    const style = [classes.todoItem]
    const wrapperStyle = [classes.Wrapper]

    if (props.done) {
        style.push(classes.todoItemDone)
    }

    return(
        <Aux>
            <div className={classes.Wrapper}>
                <div className={classes.Todo}>
                    <li className={style.join(' ')}>
                        {props.index + ". " + props.name}
                        <input
                            type='checkbox'
                            onChange={(event) => toggleDoneHandler(props.id, props.name, props.description, props.done)}
                            checked={props.done}
                        />
                    </li>
                    <Button variant="contained"
                            color="secondary"
                            size='small'
                            className={classes.Btn}
                            onClick={() => {deleteTodoHandler(props.id)}}><i className="material-icons" >
                        delete
                            </i>
                    </Button>
                </div>
                <div>
                    <li className={classes.Description}>
                        {props.description}
                    </li>
                </div>
            </div>
        </Aux>
            )
}

export default Todo;
