import React, { useState, useEffect } from 'react';
import Modal from './modal';

const App = ({ game }) => {
    const [modalResponse, setModalResponse] = useState(null);
    const [isModalOpen, showModal] = useState(false);

    const onModalHandler = () => {
        modalResponse.resolve("DATA");
        showModal(false);
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