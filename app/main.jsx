import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import WorldGame from './worldGame';

WorldGame();

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
  