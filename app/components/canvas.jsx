import React, { useState } from 'react';

import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100%",
        background: "#000"
    }
};

const Canvas = props => {
    const { classes, mousePosition } = props;
    return (
        <div className={classes.container} >
            <canvas></canvas>
        </div>
    );
};

export default withStyles(styles)(Canvas);