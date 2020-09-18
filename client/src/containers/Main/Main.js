import React, {useCallback, useEffect, useState} from 'react';
import classes from  './Main.module.css'
import Header from "../../components/Header/Header"
import TodoBuilder from "../../containers/TodoBuilder/TodoBuilder";
import RegistrationForm from "../../components/Forms/RegistrationForm/RegistrationForm";
import SignInForm from '../../components/Forms/SignInForm/SignInForm'
import UserService from "../../service/UserService";
import TodoService from "../../service/TodoService";
import Context from "../../Context";

function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signUpModal, setSignUpModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loginModal, setLoginModal] = useState(false)
    const [signError, setSignError] = useState(``)
    const [todos, setTodos] = useState([])
    const [userId, setUserId] = useState('')

    const getUserId = async () => {
        const response = await UserService.getUserId()
        if (response) {
            setUserId(response.id)
            setIsLoggedIn(true)
            setIsLoading(false)
        }
        else {
            setIsLoggedIn(false)
            setIsLoading(false)
            setSignUpModal(true)
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            TodoService.getTodos(isLoggedIn, userId, setTodos)
            setSignUpModal(false)
        }
        else {
            setSignUpModal(true)
            setUserId(null)
            setTodos([])
        }

    }, [isLoggedIn])

    const submitSignUpHandler = useCallback(async (username, password) => {
        const response = await UserService.submitSignUpHandler(username, password)
        if (response) {
            setSignError(response.split(';'))
        }
        else {
            discardSignUp()
            showLogInHandler()
        }
    }, [])

    const submitLogInHandler = useCallback(async (username, password) => {
        const response = await UserService.submitLogInHandler(username, password);
        if (response === 200) {
            discardLogIn();
            getUserId()
        }
        else {
            setSignError(response)
        }
    }, [])

    const logOutHandler = () => {
        UserService.logOutHandler()
        setIsLoggedIn(false)
    }

    const showSignUpHandler = () => {
        discardLogIn()
        setSignUpModal(true);
        setSignError('');
    }

    const showLogInHandler = () => {
        discardSignUp()
        setLoginModal(true);
        setSignError('');
    }

    const discardSignUp = (setUsername, setPassword) => {
        setSignUpModal(false);
        setSignError('');
    }

    const discardLogIn = () => {
        setLoginModal(false);
        setSignError('');
    }


    return (
        <Context.Provider value={{isLoggedIn, isLoading, userId}}>
            <div className={classes.Main}>
                <RegistrationForm canceled={discardSignUp} show={signUpModal} submit={submitSignUpHandler} err={signError} logIn={showLogInHandler}/>
                <SignInForm  canceled={discardLogIn} show={loginModal} submit={submitLogInHandler} err={signError} signUp={showSignUpHandler}/>
                <Header showSignUp={showSignUpHandler} showLogin={showLogInHandler} logOut={logOutHandler}/>
                <TodoBuilder todo={[todos, setTodos]} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>
        </Context.Provider>
    );
}

export default Main;