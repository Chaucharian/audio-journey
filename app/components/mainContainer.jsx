import React, { useState } from 'react';

import Panel from './panel';
import Canvas from './canvas';

import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100vw",
        height: "100vh"
    }
};


const MainContainer = props => {
    const { classes } = props;
    const [state, setState] = useState({ mousePosition: {} });
    const { mousePosition } = state;

    const setMousePosition = mousePosition => {
        setState({ ...state, mousePosition });
    };

    return (
        <div className={classes.container} onClick={ ({ clientX: x, clientY: y }) => setMousePosition({x,y}) }>
            <Panel mousePosition={mousePosition} onSelectionChange={ data => console.log(data)} />
            <Canvas />
        </div>
    );
};

export default withStyles(styles)(MainContainer);