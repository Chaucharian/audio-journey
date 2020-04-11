import React, { useState } from 'react';
import Modal from './modal';

const App = () => {
    const [isModalOpen, showModal] = useState(true);

    return (
        <Modal 
        open={isModalOpen} 
        title={ "testing" }
        content={ "testing" }
        onAction={ () => showModal(!isModalOpen) }
        />
    );
}

export default App;