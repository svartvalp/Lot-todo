import React from "react";
import classes from "./Loader.module.css"

const loader = () => (
    <div style={{display: 'flex', justifyContent: 'center', margin: '0.5rem'}}>
        <div className={classes.ldsDualRing}></div>
    </div>
)

export default loader;