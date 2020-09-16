import React from "react";

import Backdrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";
import classes from "./Modal.module.css";

const modal = (props) => {
    return (
        <Aux>
            <Backdrop canceled={props.canceled} show={props.show}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
};

export default modal;