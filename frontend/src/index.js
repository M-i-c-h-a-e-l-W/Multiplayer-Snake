import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class Car extends React.Component {
    render() {
        return <h2>Hi, I am a Car!</h2>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Car />, document.getElementById('footer'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. // TODO unregister
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();