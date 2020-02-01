import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "200px",
        minHeight: "100px",
        border: "1px solid #000",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
    }, 
    list: {
        margin: "0px",
        padding: "0px"
    },
    option: {
        cursor: "pointer",
        color: "black",
        padding: "12px 16px",
        textDecoration: "none",
        display: "block",
        userSelect: "none",
        borderBottom: "1px solid #000",
        "&:hover": {
            backgroundColor: "#DDD"
        }
    }
};

const Panel = props => {
    const { classes, mousePosition, onSelectionChange } = props;
    const [state, setState] = useState({ showPanel: false, timeToClose: 3000, options: [{ name: "Fire" }, { name: "Birs" }, { name: "Nature" }] });
    const { showPanel, timeToClose, options } = state;

    useEffect( () => {
        if(mousePosition.x) {
            setState({ ...state, showPanel: true });
            if (!showPanel) {
                setTimeout(() => setState({ ...state, showPanel: false }), timeToClose);
            }
        }
    }, [mousePosition]);

    return (
        showPanel && 
        <div className={classes.container} style={{ left: mousePosition.x, top: mousePosition.y }}>
            <ul className={classes.list}>
                {options.map( (option, index) => (
                    <li key={index} className={classes.option} onClick={ () => onSelectionChange(option.name) }>
                        <a>{option.name}</a>
                    </li>
                ))}
            </ul>
        </div> 
    );
};

export default withStyles(styles)(Panel);