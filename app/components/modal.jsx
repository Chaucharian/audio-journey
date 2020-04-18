import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop } from '@material-ui/core';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import ShinyButton from './shinyButton';
import RecordingButton from './recordingButton';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& div": {
        outline: "none"
    }
  },
  paper: {
    textAlign: "center",
    backgroundColor: "#000",
    border: '2px solid #FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const CustomModal = ({ open, title, content, onAction, onStartRecording, onStopRecording }) => {
    const classes = useStyles();

    return (
        <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => onAction("close")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{title}</h2>
            <p id="spring-modal-description">{content}</p>
            <div>
                <RecordingButton onClick={() => onAction("startRecording")} onClickUp={() => onAction("stopRecording")} />
                <ShinyButton text="Naturaleza" onClick={() => onAction("Nature")} />
                <ShinyButton text="Fuego" onClick={() => onAction("Fire")} />
                <ShinyButton text="Ambiente" onClick={() => onAction("Ambient")} />
                <ShinyButton text="CERRAR" onClick={() => onAction("close")} />
            </div>
          </div>
        </Fade>
      </Modal>
    );
}

export default CustomModal;