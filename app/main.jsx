import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import WorldGame from './worldGame';
import { Observable } from 'rxjs';

ReactDOM.render(
    <App game={new Observable( dispatcher => WorldGame(dispatcher) )} />,
    document.getElementById('app')
);
  