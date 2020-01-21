import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firstFunction from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<firstFunction />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. // TODO unregister
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();