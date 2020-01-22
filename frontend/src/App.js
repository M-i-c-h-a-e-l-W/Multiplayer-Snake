import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    /*
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

     */

    return (
        <div className="App">
            <header className="App-header">
                <script src="stomp.js"></script>
                <script src="snake.js"></script>
                <h3>Highscore: <br/>
                    <span id="highScore"> ERROR nothing Avaible</span>
                </h3>
                Snake with React
                <span id="spanId"> ERROR nothing Avaible</span> <br/>
                <canvas width="1000" height="600" id="canvas"></canvas>

            </header>
        </div>
    );
}

export default App;