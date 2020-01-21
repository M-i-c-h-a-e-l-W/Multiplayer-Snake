import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    let rStat = (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <p>
                    Register is way faster than unregister
                </p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );

    return rStat;
}

export const firstFunction=()=> {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <p>
                    Register is way faster than unregister
                </p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <body>
            <h1>This is the Body Part</h1>


            <img src={logo} className="App-logo" alt="logo"/>
            </body>
        </div>
    );

}

export default App;