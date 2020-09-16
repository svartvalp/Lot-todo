import React, {useCallback, useEffect, useState} from 'react';
import classes from  './Main.module.css'
import Header from "../../components/Header/Header"
import TodoBuilder from "../../containers/TodoBuilder/TodoBuilder";
import RegistrationForm from "../../components/Forms/RegistrationForm/RegistrationForm";
import SignInForm from '../../components/Forms/SignInForm/SignInForm'
import Context from "../../Context";
import Loader from "../../components/Loader/Loader"


function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signUpModal, setSignUpModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loginModal, setLoginModal] = useState(false)
    const [signError, setSignError] = useState(false)
    const [todos, setTodos] = useState([])
    //const [showButtons, setShowButtons] = useState(null)

    const getUserId = () => {
        fetch('/user/info')
            .then(response => response.json())
            .then(response => {
                window.userId = response.id
                setIsLoggedIn(true)
                //setShowButtons(true)
                setIsLoading(false)
            })
            .catch(error => {
                //setShowButtons(true)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getUserId()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            fetch(`/todo/user/${window.userId}`)
                .then((response) => response.json())
                .then(response => {
                    setTodos(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [isLoggedIn])

    const submitSignUpHandler = useCallback((username, password) => {
        fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then((response) => {
            if(response.ok) {

                discardSignUp()
                showLogInHandler()
            }
            else {
                setSignError(true)
                console.log(response.message)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const submitLogInHandler = useCallback((username, password) => {
        const params = new URLSearchParams({
            username: username,
            password: password
        })

        const url = `/login?${ params.toString() }`

        fetch(url, {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                //setIsLoggedIn(true);
                discardLogIn();
                getUserId()
            }
            else {
                setSignError(true)
            }

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const logOutHandler = () => {
        fetch('/logout')
        setIsLoggedIn(false)
        window.userId = null
        setTodos([])
    }

    const showSignUpHandler = () => {
        setSignUpModal(true);
    }

    const showLogInHandler = () => {
        setLoginModal(true);
    }

    const discardSignUp = () => {
        setSignUpModal(false);
        setSignError(false);
    }

    const discardLogIn = () => {
        setLoginModal(false);
        setSignError(false);
    }

    return (
        <Context.Provider value={{isLoggedIn, isLoading}}>
            <div className={classes.Main}>
                <RegistrationForm canceled={discardSignUp} show={signUpModal} submit={submitSignUpHandler} err={signError}/>
                <SignInForm  canceled={discardLogIn} show={loginModal} submit={submitLogInHandler} err={signError}/>
                <Header showSignUp={showSignUpHandler} showLogin={showLogInHandler} logOut={logOutHandler}/>
                <TodoBuilder todo={[todos, setTodos]} isLoggedIn={isLoggedIn}/>
            </div>
        </Context.Provider>
    );
}

export default Main;