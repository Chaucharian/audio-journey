import React, { useState, useEffect } from 'react';
import Modal from './modal';
import AudioRecording from '../audioRecording';

const App = ({ game }) => {
    const [modalResponse, setModalResponse] = useState(null);
    const [isModalOpen, showModal] = useState(false);

    const onModalHandler = action => {
        if(action === 'close') {
            showModal(false);
        } else if(action === 'startRecording') {
            AudioRecording().then(({ start, stop }) => {
                start();
                setTimeout( () => stop().then( ({ play, audioUrl }) => {
                    // play();
                    modalResponse.resolve(audioUrl);
                }) , 4000);
        });

        } else if(action === 'stopRecording') {
            
        }
    }

    useEffect( () => {
        game.subscribe({
            next: callback => {
                showModal(true);
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
        title={ "testing" }
        content={ "testing" }
        onAction={onModalHandler}
        />
    );
}

export default App;