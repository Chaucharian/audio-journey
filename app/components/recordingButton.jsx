import React, { useState } from 'react';
import { withStyles} from '@material-ui/styles';
import ShinyButton from './shinyButton';

const styles = {
   baseButton: {
        "& button": {
            width: "50px",
            borderRadius: "50%",
        }
   },
   recording: {
        "& button": {
            "& div": {
                color: "red"
            }
        }
   }
}

const RecordingButton = props => {
    const { classes, onClick, onClickUp} = props;
    const [recording, setRecording] = useState(false);

    const click = () => {
        setRecording(true);
        onClick();
    }

    const clickUp = () => {
        setRecording(false);
        onClickUp();
    }

    return (
        <div className={classes.baseButton + " " + (recording ? classes.recording : '')}>
            <ShinyButton 
                icon={ <i className="fas fa-microphone"></i> }
                onClick={click} 
                onClickUp={clickUp}
                />    
        </div>
    );
};

export default withStyles(styles)(RecordingButton);