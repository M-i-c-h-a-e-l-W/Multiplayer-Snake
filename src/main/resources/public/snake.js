window.onload = initialization();
var canvas, ctx, playerNr = -1, maxPlayer = 0;
var fodderX = 100, fodderY = 100;
var pause = false;

window.onbeforeunload = function () {
    if(playerNr === -1 || maxPlayer === 0){
        return;
    }
    fetch("http://localhost:8080/api/snake/playerDead?deadPlayerNr=" + playerNr, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {


    }).catch((function (error) {
        console.log("Error: ", error);
    }));
};

// TODO 2 Spieler pro Rechner soll möglich sein über "wasd"

function initialization() {
    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        connectWebSocketChangeDirection(() => {
            fetch("http://localhost:8080/api/snake/newPlayer", {
                method: 'GET',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }).then(function (ev) {
                if (ev.status !== 200) {
                    console.log("Error: not 200");
                    return;
                }
                console.log("Erzeugte Snake Klasse ohne JSON:\n\n" + ev.toString());
                ev.json().then(function (snakeClass) {
                    console.log("Erzeugte Snake Klasse:\n\n" + snakeClass.playerNr);
                    playerNr = snakeClass.playerNr;
                });
                startGame();
            }).catch((function (error) {
                console.log("Error: ", error);
            }));

        });

        // Connection Backend & PlayerGetID from Backend
    } else {
        alert("I am sorry, but your browser is bullshit. It does not support the canvas tag.");

    }

}

function startGame() {
    fetch("http://localhost:8080/api/snake/runGame", {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {


    }).catch((function (error) {
        console.log("Error: ", error);
    }));
}

function drawSnakes(color, posX, posY, partOfHead) {
    ctx.beginPath();
    //ctx.fillStyle = "rgb(250,0,0)";

    ctx.fillStyle = color;
    if (partOfHead === 0) {
        ctx.strokeStyle = "#000000";
    } else if (partOfHead === 404) {
        ctx.strokeStyle = "#ff0000";
    } else {
        ctx.strokeStyle = "#ffffff";
    }


    var width = 10;
    var height = 10;

    ctx.lineWidth = 1.5;
    ctx.fillRect(posX, posY, width, height);

    ctx.strokeRect(posX, posY, width, height);
    //ctx.clearRect(x,y,width,height);
    ctx.closePath();
}

var interval = setInterval(getPosition, 5);

function getPosition() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    /*

    drawSnakes("blue", i, 100);

    if (i === 999) {
        i = 0;
    }
    i++;

     */

    document.onkeydown = function (event) {
        var keyCode, changeD = "Error";
        var sendKeyCode = false;

        if (event == null) {
            keyCode = window.event.keyCode;
        } else {
            keyCode = event.keyCode;
        }

        //alert("Eingabe: " + keyCode);
        switch (keyCode) {
            // left
            case 37:
                changeD = "l";
                sendKeyCode = true;
                // action when pressing left key
                break;
            // up
            case 38:
                changeD = "o";
                sendKeyCode = true;
                // action when pressing up key
                break;

            // right
            case 39:
                changeD = "r";
                sendKeyCode = true;
                // action when pressing right key
                break;
            // down
            case 40:
                changeD = "u";
                sendKeyCode = true;
                // action when pressing down key
                break;
            case 8:
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // action when pressing down key
                break;
            case 32:
                changeD = "pause";
                sendKeyCode = true;
                break;
            default:
                console.log("Fehlerhafte Eingabe: " + keyCode);
                break;
        }

        if (sendKeyCode && changeD !== "Error") {
            changeD += ";" + playerNr.toString();
            //changeD = changeD.toString();
            fetch("http://localhost:8080/api/snake/changeDirection?changeD=" + changeD, {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }).then(function (ev) {
                if (ev.status !== 200) {
                    console.log("Errorcode: " + ev.status);
                    console.log("ChangeD ist gleich: " + changeD);
                }

            }).catch((function (error) {
                console.log("Error: ", error);
            }));

            changeD = "Error";
        }
    };
}


//setTimeout(getPosition, 5);

function connectWebSocketChangeDirection(succesFunction) {
    let socket = new WebSocket("ws://localhost:8080/ws");
    let ws = Stomp.over(socket);
    let that = this;
    ws.connect({}, (frame) => {
        ws.subscribe("/snake/fodderOfSnake", (message) => {
            let newFodder = JSON.parse(message.body);
            fodderX = newFodder.posX * 10;
            fodderY = newFodder.posY * 10;
            console.log("NewFodder: ", message)
        });
        ws.subscribe("/snake/deleted", (message) => {
            let newFodder = JSON.parse(message.body);
            if (newFodder.deletedPlayer != null && newFodder.deletedPlayer === playerNr) {
                alert("Du bist offensichtlich weniger talentiert als dein Gegner.\nDu bist Tod!\nSeite neuladen um wiedereinzusteigen ;-)");
                alert("Bei \"Ok\" wird die Seite neugeladen");
                location.reload(true);
                socket.close();
            }
            console.log("NewFodder: ", message);
        });
        ws.subscribe("/snake/changeDofP", (message) => {
            // console.log("WebSocket is Connected\nVariable Message: ", message);
            let snakeNewData = JSON.parse(message.body);

            maxPlayer = snakeNewData.length;
            console.log("MaxPlayer: " + maxPlayer);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawSnakes("#FF0000", fodderX, fodderY, 404);
            document.getElementById('spanId').innerHTML = "";

            for (var currentPlayer = 0; currentPlayer < maxPlayer; currentPlayer++) {
                //console.log("Spielerrichtung: " + snakeNewData[0].direction);
                //console.log("Richtung: " + snakeNewData[currentPlayer].direction + "\nSpielerNr: " + snakeNewData[currentPlayer].playerNr);

                //console.log("posY Laenge: " + snakeNewData[currentPlayer].posY.length);

                console.log("Player: " + currentPlayer + " has a Score of:" +
                    snakeNewData[currentPlayer].score);

                if (snakeNewData[currentPlayer].score !== null && snakeNewData[currentPlayer].score !== 0) {
                    document.getElementById('spanId').innerHTML += "<ol><font color=\"" +
                        snakeNewData[currentPlayer].playerColor + "\">" + "Player: " +
                        currentPlayer + " </font>has a Score of: " +
                        snakeNewData[currentPlayer].score + "</ol>";
                }
                if (snakeNewData[currentPlayer].posX === null || snakeNewData[currentPlayer].posY === null
                    && snakeNewData[currentPlayer].posX.length === 0) {

                } else if (snakeNewData[currentPlayer].posX.length === snakeNewData[currentPlayer].posY.length) {
                    for (var i = 0; i < snakeNewData[currentPlayer].posX.length; i++) {
                        drawSnakes(snakeNewData[currentPlayer].playerColor,
                            snakeNewData[currentPlayer].posX[i]*10, snakeNewData[currentPlayer].posY[i]*10,
                            snakeNewData[currentPlayer].posX.length - (i + 1));
                    }
                }
            }
        });
        that.webSocket = ws;
        succesFunction();
    }, function (error) {
        console.log("STOMP error " + error);
        //that.webSocket = null;
    });

}