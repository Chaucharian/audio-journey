import React, { useEffect, useState } from 'react';
import Modal from './modal';
import RecordingButton from './recordingButton';
import ShinyButton from './shinyButton';

const RecordingModal = ({ open, title, content, onAction }) => {
  const [selectionEnabled, enableSelection] = useState(false);

  const onActionHandler = action => selectionEnabled && onAction(action);

  useEffect(() => {
    // avoiding fast clicking
    if (open) {
      setTimeout(() => {
        enableSelection(true);
      }, 500);
    } else {
      enableSelection(false);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      title={title}
      content={content}
    >
      <RecordingButton onClick={() => onActionHandler("startRecording")} onClickUp={() => onAction("stopRecording")} />
      <ShinyButton text="CERRAR" onClick={() => onActionHandler("close")} />
    </Modal>
  );
}

export default RecordingModal;