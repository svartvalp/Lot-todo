import React, {useContext} from "react";
import classes from "./Header.module.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Context from '../../Context'

const Header = (props) => {
    const {isLoggedIn} = useContext(Context)
    const {isLoading} = useContext(Context)
    let buttons = null;
    if(!isLoading) {
        if (isLoggedIn === false) {
            buttons = (
                <div>
                    <Button color="inherit" onClick={props.showLogin}>Login</Button>
                    <Button color="inherit" onClick={props.showSignUp}>SignUp</Button>
                </div>
            )
        } else if (isLoggedIn === true) {
            buttons = (
                <div>
                    <Button color="inherit" onClick={props.logOut}>Logout</Button>
                </div>
            )
        }
    }
    return(
        <div className={classes.Wrapper}>
            <AppBar position="static">
                <Toolbar className={classes.ToolBar}>
                    <Typography variant="h6" className={classes.title}>
                        Lot-ToDo
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;