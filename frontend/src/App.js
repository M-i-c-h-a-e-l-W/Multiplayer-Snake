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
            </header>
            <body>
            <main>
                <div class="chat">
                    <h2>
                        <div class="chatHeader">
                            Chat bzw. Console:
                        </div>
                    </h2>

                    <span id="messages"> keine Nachrichten</span>
                    <form onsubmit="newMessage(); return false;">
                        <input placeholder="be nice to each other..."
                               type="text" name="" id="chatWindow"></input>
                    </form>

                </div>


                <div class="mainGame">

                    <div class="score">
                        <h1>Scores:</h1>
                        <span id="spanId"> ERROR nothing Avaible</span>
                    </div>

                    <br/>

                    <canvas width="1000" height="600" id="canvas"></canvas>
                    <br/>

                    <div class="footer">
                        Highscore:
                        <span id="highScore"> ERROR nothing Avaible</span>
                        <br></br>

                        <a href="index.html"> Kommentarseite</a>

                    </div>
                </div>
            </main>
            </body>
        </div>
);
}

export default App;