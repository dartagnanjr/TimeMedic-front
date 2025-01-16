import React, { useState } from "react";
import './MyButton.css'

const MyButton = (props) => {
    return <button 
                className={props.className}
                type="submit" 
                hidden={null} 
                disabled={null}
                value={props.value} 
                onClick={(event) => props.onClick(event.target.value)}>
                    {props.children}
            </button>
}

export default MyButton