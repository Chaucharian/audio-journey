import React from 'react';
import { render } from 'react-dom';

import MainCointainer from './components/mainContainer';

const App = () => {
    return (
        <MainCointainer />
    );
};

render(<App />, document.getElementById('root'));