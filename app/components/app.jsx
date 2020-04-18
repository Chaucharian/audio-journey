import React, { useState, useEffect } from 'react';
import Modal from './modal';
import AudioRecording from '../audioRecording';

const App = ({ game }) => {
    const [modalResponse, setModalResponse] = useState(null);
    const [audioRecorder, setAudioRecorder] = useState(null);
    const [isModalOpen, showModal] = useState(false);

    const onModalHandler = action => {
        if(action === 'close') {
            modalResponse.resolve(action);
            showModal(false);
        } else if(action === 'startRecording') {
            audioRecorder.start();
        } else if(action === 'stopRecording') {
            audioRecorder.stop().then( ({ audioUrl }) => { 
                modalResponse.resolve(audioUrl);
                showModal(false);
            });
        } else {
            modalResponse.resolve(action);
            showModal(false);
        }
    }

    useEffect( () => {
        game.subscribe({
            next: callback => {
                showModal(true);
                AudioRecording().then(({ start, stop }) => {
                    setAudioRecorder({ start, stop });
                });
                callback(new Promise( resolve => {
                    const promiseResolver = { resolve: data => resolve(data) };
                    setModalResponse(promiseResolver);
                }));
            }
        });
    }, []);
    
    return (
        <Modal 
        open={isModalOpen} 
        title={ "Manten presionado el microfono y graba una pista" }
        // content={ "testing" }
        onAction={onModalHandler}
        />
    );
}

export default App;