import React from 'react';
import './App.css';
import Stomp from 'stompjs'
import './krone.png'
import './snake-fodder.png'

var canvas, ctx, playerNr = -1, maxPlayer = 0;
var fodderX = 100, fodderY = 100;
var check; // oldDirection = "r";
let ip = "localhost", ipSecure = "", protocol = "";
let field;
let table = "";

class Chat extends React.Component {
    render() {
        return (
            <div className="chat">
                <h2>
                    <div className="chatHeader">
                        Chat:
                    </div>
                </h2>
                <div className="chatContent">
                    <span id="messages"> no messages</span>
                </div>

                <form>
                        <textarea placeholder="be nice to each other..."
                                  type="text" id="chatWindow" className={"tArea"}></textarea>
                </form>
                <button type="button" variant="raised" color="accent" onClick={newMessage}>send</button>
            </div>
        );
    }
}

class Head extends React.Component {
    render() {
        return (
            <div className="App-header">
                Multiplayer-Snake with React
            </div>
        );
    }
}

class Foot extends React.Component {
    render() {
        return (
            <div className="footer">
                Highscore:
                <span id="highScore"> ERROR nothing available</span>
                <br></br>

                <a href="index.html"> coming soon</a>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="mainGame">

                <div className="score">
                    <h1>Scores:</h1>
                    <span id="spanId"> ERROR nothing available</span>
                </div>

                <br/>

                <canvas width="1000" height="600" id="canvas"></canvas>
                <br/>

                <Foot/>
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <Head/>

            <main>
                <Chat/>
                <Game/>
            </main>
        </div>
    );
}

window.onload = function () {
    field = new Array(6600);

    while (check === '' || check == null) {
        check = prompt('Please set your name, and do not forget your colour ( "Name#HexCode" ) ', '');
    }
    check = check.replace("#", "xHashTagx");

    ip = window.location.origin;
    ip = "http://localhost:8080";
    protocol = window.location.protocol;
    if (protocol === "https:") {
        ipSecure = "s";
    }

    initialization();
};

// if reload send a message to playerDead in backend
window.onbeforeunload = function () {
    if (playerNr === 0 || maxPlayer === -1) {
        return;
    }

    fetch(ip + "/api/snake/playerDead?deadPlayerNr=" + playerNr, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {

    }).catch((function (error) {
        console.log("Error: ", error);
    }));
};

// connection backend & PlayerGetID from backend
function initialization() {
    document.getElementById('messages').innerHTML = "";

    canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        alert("Failed to initialize: no canvas context \n It does not support the canvas tag.");
        return;
    }
    ctx = canvas.getContext('2d');

    connectWebSocketChangeDirection(() => {
        fetch(ip + "/api/snake/newPlayer?playerName=" + check, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (ev) {
            if (ev.status !== 200) {
                console.log("Error: not 200");
                return;
            }

            console.log("created Snake class without JSON:\n\n" + ev.toString());

            ev.json().then(function (snakeClass) {
                console.log("created Snake class:\n\n" + snakeClass.playerNr);
                playerNr = snakeClass.playerNr;
            });
            startGame();

        }).catch((function (error) {
            console.log("Error: ", error);
        }));
    });
}

// send message to the backend to start the game
function startGame() {
    fetch(ip + "/api/snake/runGame", {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {

    }).catch((function (error) {
        console.log("Error: ", error);
    }));
}

// draw the snakes and the fodder
function drawSnakes(color, posX, posY, partOfHead, actBest) {
    ctx.beginPath();
    //ctx.fillStyle = "rgb(250,0,0)";

    ctx.fillStyle = color;
    if (actBest && partOfHead === 0) {
        let img = new Image();
        ////img.src = "./krone.png";
        ctx.drawImage(img, posX - 5, posY - 15, 20, 20);

        ctx.strokeStyle = "#000000";
    } else if (partOfHead === 0) {
        ctx.strokeStyle = "#000000";
    } else if (partOfHead === 4040) {
        let img = new Image();
        ////img.src = "./snake-fodder.png";
        // without red Point use this
        // ctx.drawImage(img, posX-5, posY-5, 20 , 20); return;

        ctx.drawImage(img, posX - 7, posY - 9, 25, 25);
        ctx.strokeStyle = "#ff0000";
    } else {
        ctx.strokeStyle = "#ffffff";
    }

    let width = 10;
    let height = 10;

    ctx.lineWidth = 1.5;
    ctx.fillRect(posX, posY, width, height);

    ctx.strokeRect(posX, posY, width, height);
    //ctx.clearRect(x,y,width,height);
    ctx.closePath();
}

setInterval(getPosition, 5);
//setTimeout(getPosition, 5);

// input "wasd" and arrow keys and send the input to the backend
function getPosition() {
    document.onkeydown = function (event) {
        let changeD = "Error", keyCode;
        let sendKeyCode = false;

        if (event) {
            keyCode = event.keyCode;
        } else {
            keyCode = window.event.keyCode;
        }

        switch (keyCode) {
            // left
            case 65:
            case 37:
                changeD = "l";
                sendKeyCode = true;
                break;
            // right
            case 68:
            case 39:
                changeD = "r";
                sendKeyCode = true;
                break;
            // up
            case 87:
            case 38:
                changeD = "o";
                sendKeyCode = true;
                break;
            // down
            case 83:
            case 40:
                changeD = "u";
                sendKeyCode = true;
                break;
            case 189:
                changeD = "pause";
                sendKeyCode = true;
                break;
            default:
                console.log("wrong input Code: " + keyCode);
                break;
        }

        console.log("input: " + changeD);

        if (changeD === "pause" || (sendKeyCode && changeD !== "Error")) {
            // oldDirection = changeD;  && changeD !== oldDirection
            changeD += ";" + playerNr.toString();
            //changeD = changeD.toString();
            fetch(ip + "/api/snake/changeDirection?changeD=" + changeD, {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }).then(function (ev) {
                if (ev.status !== 200) {
                    console.log("Error code: " + ev.status);
                    console.log("ChangeD is equal with: " + changeD);
                }

            }).catch((function (error) {
                console.log("Error: ", error);
            }));

            changeD = "Error";
        }
    };
}

// connection to webSockets with all other clients
function connectWebSocketChangeDirection(succesFunction) {
    let socket = new WebSocket("ws" + ipSecure.toString() + "://localhost:8080" + "/ws");
    let ws = Stomp.over(socket);
    ws.connect({}, (frame) => {

        // get new Position of fodder
        ws.subscribe("/snake/fodderOfSnake", (message) => {
            let newFodder = JSON.parse(message.body);
            fodderX = newFodder.posX * 10;
            fodderY = newFodder.posY * 10;
            console.log("NewFodder: ", message)
        });

        // get dead player
        ws.subscribe("/snake/deleted", (message) => {
            let newFodder = JSON.parse(message.body);
            if (newFodder.deletedPlayer != null && newFodder.deletedPlayer === playerNr) {
                alert("You are instead of your enemy really bad, better get more skills.\n" +
                    "You are Dead!\nReload the side to try it again ;-)");

                alert("Pres \"Ok\" or pres enter to reload the side");
                socket.close();
                window.location.reload();
            }
            console.log("NewFodder: ", message);
        });

        // get new position of snakes
        ws.subscribe("/snake/changeDofP", (message) => {
            clearFieldArray();
            createTable();

            let snakeNewData = JSON.parse(message.body);
            document.getElementById('spanId').innerHTML = "";

            maxPlayer = snakeNewData.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawSnakes("#770000", fodderX, fodderY, 4040);

            let actualBest = 0, actBest = false;
            for (var index = 0; index < maxPlayer; index++) {
                if (snakeNewData[index].score > actualBest) {
                    actualBest = snakeNewData[index].score;
                }
            }


            for (let currentPlayer = 0; currentPlayer < maxPlayer; currentPlayer++) {

                if (snakeNewData[currentPlayer].score !== null && snakeNewData[currentPlayer].score !== 0) {
                    let playedTime = Math.round(snakeNewData[currentPlayer].playTime / 100);

                    if (actualBest === snakeNewData[currentPlayer].score) {
                        actBest = true;
                    }
                    playedTime /= 10;
                    if (playedTime % 1 === 0) {
                        playedTime += ".0";
                    }
                    addPlayerToTable(currentPlayer, snakeNewData[currentPlayer].playerName,
                        snakeNewData[currentPlayer].score,
                        playedTime, snakeNewData[currentPlayer].playerDeaths, snakeNewData[currentPlayer].playerColor, actBest);
                }

                if (snakeNewData[currentPlayer].posX === null || snakeNewData[currentPlayer].posY === null
                    && snakeNewData[currentPlayer].posX.length === 0) {
                    console.log("Array Error L256");
                } else if (snakeNewData[currentPlayer].posX.length === snakeNewData[currentPlayer].posY.length) {
                    fillFieldArray(snakeNewData[currentPlayer].posX, snakeNewData[currentPlayer].posY);

                    for (let i = 0; i < snakeNewData[currentPlayer].posX.length; i++) {
                        drawSnakes(snakeNewData[currentPlayer].playerColor,
                            snakeNewData[currentPlayer].posX[i] * 10,
                            snakeNewData[currentPlayer].posY[i] * 10,
                            snakeNewData[currentPlayer].posX.length - (i + 1), actBest);
                    }
                }
                actBest = false;
            }
            document.getElementById('spanId').innerHTML += table + "</table>";

        });

        // get messages of chat
        ws.subscribe("/snake/chat", (message) => {
            let theNewMessage = JSON.parse(message.body);

            console.log(theNewMessage.playerNr + "  Message: " + theNewMessage.newMessage);

            let newM = "<span style='color:" + theNewMessage.playerColor + ";'> " +
                "ID " + theNewMessage.playerNr +
                "</span>" + " : " +
                "<span style='color: #000000;'>" +
                theNewMessage.newMessage + "</span><br/>";

            document.getElementById('messages').innerHTML += newM;
        });

        // get the highScore
        ws.subscribe("/snake/newHighScore", (message) => {
            let theNewMessage = JSON.parse(message.body);

            document.getElementById('highScore').innerHTML =
                theNewMessage.name + " reached " +
                theNewMessage.bestScore + " points";

        });

        // ws.send("/snake/newD", "", "String");

        succesFunction();
    }, function (error) {
        console.log("STOMP error " + error);
        //that.webSocket = null;
    });

}

// return string of the table´s header
function createTable() {
    table = "<table style=\"width:100%\">" +
        "<tr>" +
        "<th>Player ID</th>" +
        "<th>Name</th>" +
        "<th>Score</th>" +
        "<th>Seconds alive</th>" +
        "<th>Deaths</th>" +
        "</tr>";

    return table;
}

// return string of all score data
function addPlayerToTable(id, name, score, time, deaths, color, isBest) {
    if (isBest === true) {
        // console.log(name + " is the best. Score: " + score);
        score = "<font color=\"red\">" + score + "</font>";
        // name = "<img src=\"krone.png\" width=\"30\" height=\"30\" alt=\"Krone\">\n" + name;
    }

    table += "<tr>"
        + "<td>" + id + "</td>"
        + "<td><font color=\"" + color + "\">" + name + "</font></td>"
        + "<td>" + score + "</td>"
        + "<td>" + time + "</td>"
        + "<td>" + deaths + "</td>"
        + "</tr>";
    return table;
}

// set Data to field array
function fillFieldArray(x, y) {
    for (var index = 0; index < x.length; index++) {
        field[x[index] + y[index] * 100] = true;
    }
}

// field get cleared
function clearFieldArray() {
    if (field === null) {
        field = new Array(6600);
    }
    for (var index = 0; index < 6600; index++) {
        field[index] = false;
    }
}

// cheat/ chat box  // to see cheat code look in the backend (chatController)
function newMessage() {
    let newMessage = document.querySelector("#chatWindow").value;

    fetch(ip + "/api/snake/chat?playerNr=" + playerNr + "&message=" + newMessage, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {
        console.log("NEW MESSAGE AVAIBLE");
    }).catch((function (error) {
        console.log("Error: ", error);
    }));
}


export default App;