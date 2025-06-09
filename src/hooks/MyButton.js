import React from "react";
import './MyButton.css'

const MyButton = (props) => {
    return <button 
                className={props.className}
                type="submit" 
                hidden={null} 
                disabled={null}
                value={props.value} 
                onClick={(event) => props.onClick(event.target.value)}
                style={{
                    "color": "white",
                    "background-color":  "rgb(33, 120, 233)",
                    "border-radius": "15px",
                    "padding": "10px",
                    "cursor": "pointer",
                    "width": "280px",
                    "height": "45px",
                    "font-size": "1.00rem",
                }}
                >
                    {props.children}
            </button>
}

export default MyButton