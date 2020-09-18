import React, {useState} from "react";
import {Button} from "@material-ui/core";
import classes from './AddTodoForm.module.css'
import Aux from "../../hoc/Aux";

const AddTodoForm = (props) => {
    const [inputTodo, setInputTodo] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    const descriptionChangeHandler = (event) => {
        setDescriptionInput(event.target.value)
    }

    const errorWarning = props.addError ? (<p className={classes.Error}>{props.addError}</p>) : null
    const arrowType = !showDescription ? (<i className="fas fa-angle-left"></i>) : (<i className="fas fa-angle-down"></i>)
    const textArea = showDescription ? (
        <textarea
            className={classes.Description}
            onChange={descriptionChangeHandler}
            rows="2"
            cols="50"
            placeholder='ToDo description'
            value={descriptionInput}>
        </textarea>) : null

    const inputChangeHandler = (event) => {
        setInputTodo(event.target.value);
    }

    const toggleDescriptionHandler = () => {
        setShowDescription((prevState) => !prevState)
    }

    const submitTodoHandler = (event, inputTodo, descriptionInput) => {
        if(inputTodo === "")
        {
            props.setAddingError('Todo should not be empty')
            return
        }
        if(inputTodo.length < 4)
        {
            props.setAddingError('ToDo should contain at lest 4 letters')
            return
        }
        if(inputTodo.length > 50)
        {
            props.setAddingError('ToDo should not contain more than 50 letters')
            return
        }
        if(descriptionInput.length > 300)
        {
            props.setAddingError('ToDo description should not contain more than 300 letters')
            return
        }
        setInputTodo('')
        setDescriptionInput('')
        props.addTodoHandler(event, inputTodo, descriptionInput)
    }

    return (
        <Aux>
            <p className={classes.Hint}>Put your ToDo here</p>
            <form className={classes.Form}>
                <input className={classes.InputForm} value={inputTodo} onChange = {inputChangeHandler} placeholder='Your ToDo'/>
                <Button
                    variant="contained"
                    color="primary"
                    type='button'
                    onClick={toggleDescriptionHandler}>
                    {arrowType}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    onClick={(event) => submitTodoHandler(event, inputTodo, descriptionInput)}>
                    <i className="fas fa-plus"></i>
                </Button>
            </form>
            {textArea}
            {errorWarning}
        </Aux>
    )
}

export default AddTodoForm;