import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MSnake from './App';
import * as serviceWorker from './serviceWorker';



class Component extends React.Component {
    render() {
        return <h2>React Version: {React.version}</h2>;
    }
}
ReactDOM.render(<Component />, document.getElementById('footer'));


ReactDOM.render(<MSnake/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. // TODO unregister
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();