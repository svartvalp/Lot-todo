import React, {useContext, useState} from "react";
import classes from './SignInForm.module.css';
import Modal from "../../UI/Modal/Modal";
import {Button} from "@material-ui/core";
import Context from "../../../Context";

const SignInForm = (props) => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const {isLoggedIn} = useContext(Context)
    let err = null;
    if(props.err) {
        err = (
            <p style={{color: 'red', fontSize: '0.8em', marginTop: '15px'}}>{props.err}</p>
        )
    }

    return(
        <Modal show={props.show} canceled={isLoggedIn ? props.canceled : null}>
            <p>LogIn</p>
            <i className={'fas fa-user-shield'} style={{fontSize: '64px'}}></i>
            <div className={classes.Container}>
                <label>Username</label>
                <input className={classes.Type} onChange={(event) => setUsername(event.target.value)} placeholder='Username'/>
                <label>Password</label>
                <input className={classes.Type} onChange={(event) => setPassword(event.target.value)} placeholder='Password'/>
                <Button className={classes.Button} variant="contained" color="primary" size='small' type='submit' onClick={() => props.submit(username, password)}>Submit</Button>
                {err}
                <div className={classes.Log}>
                    Don't have an account?
                    <a href='#' onClick={() => props.signUp(true)}>SignUp</a>
                </div>
            </div>
        </Modal>
    )
}

export default SignInForm;