import React, {useContext, useState} from "react";
import classes from './RegistrationForm.module.css';
import Modal from "../../UI/Modal/Modal";
import {Button} from "@material-ui/core";
import Context from "../../../Context";

const RegistrationForm = (props) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const {isLoggedIn} = useContext(Context)

    let err = null;
    if(Array.isArray(props.err)) {
        err = props.err.map((text, index) => <li key={"error" + index}>{text}</li>)
    }
    else {
        err = <li>{props.err}</li>
    }

    return(
        <Modal
            show={props.show}
            canceled={isLoggedIn ? props.canceled : null}>
            <p>SignUp</p>
            <i className={'far fa-id-card'} style={{fontSize: '64px'}}></i>
            <div className={classes.Container}>
                <label>Username</label>
                <input className={classes.Type} value={username} onChange={(event) => setUsername(event.target.value)} placeholder='Username'/>
                <label>Password</label>
                <input className={classes.Type} value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password'/>
                <Button className={classes.Button} variant="contained" color="primary" size='small' type='submit' onClick={() => props.submit(username, password)}>Submit</Button>

                <ul>
                    {err}
                </ul>

                <div className={classes.Log}>
                    Already have an account?
                    <a href='#' onClick={() => props.logIn(true)}>LogIn</a>
                </div>
            </div>
        </Modal>
    )
}

export default RegistrationForm;