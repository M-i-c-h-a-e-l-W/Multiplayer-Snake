window.onload = initialization();
var canvas, ctx;

function initialization(){
    canvas = document.getElementById("canvas");
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');
        drawSnakes();
        // Connection Backend & PlayerGetID from Backend
    }else {
        alert("I am sorry, but your browser is bullshit. It does not support the canvas tag.");
    }

}

function drawSnakes(){
    ctx.fillRect(25, 25, 10, 10);
    ctx.clearRect(27, 27, 5, 5);

    ctx.fillStyle = "rgb(250,0,0)";

    var x = 250;
    var y = 250;
    var width = 10;
    var height = 10;

    ctx.strokeStyle = "#ffffff";
    ctx.fillRect(x, y, width, height);

    ctx.strokeRect(x,y,width,height);
    //ctx.clearRect(x,y,width,height);
}


/*
console.log("JavaScript ist eingebunden!\n");
var user;
time = new Date();
window.onload = initialice();

function initialice() {
    fethAllComments();
    connectWebSocket();
}

function connectWebSocket() {
    let socket = new WebSocket("ws://localhost:8080/ws");
    let ws = Stomp.over(socket);
    ws.connect({}, (frame) => {
        ws.subscribe("/comment/new", (message) => {
            console.log("Variable Message: ", message);
            let commentJSONObject = JSON.parse(message.body);
            console.log(commentJSONObject.text);
            insertComment(commentJSONObject.text);

            console.log("TEST: " + message);
        });
        ws.subscribe("/comment/deleteById", (message) => {
            let commentJSONObjectID = JSON.parse(message.body);
            console.log("TEST: ", message);
            document.getElementById("comment_" + commentJSONObjectID.id).remove();
        });
    }, function (error) {
        console.log("STOMP error " + error);
    });
}

function yourComment(newComment) {
    var msg;
    if (newComment === undefined) {
        msg = document.querySelector("#commentInput").value;
    } else {
        msg = newComment;
    }
    //console.log("Ausgelesener Text: " + msg);
    if (msg === "") return;
    //‚commentList.comment.getText();
    fetch("http://localhost:8080/api/comments", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({text: msg})
    }).then(function (ev) {
        //console.log(ev);
        document.querySelector("#commentInput").value = "";
    }).catch((function (error) {
        console.log("Error", error);
    }));
}


function generiereKommentare() {


fetch("http://localhost:8080/api/comments/generator", {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
}).then(function (ev) {
    getNewCommentsToInsert(ev);
}).catch((function (error) {
    console.log("Error", error);
}));
}

function fethAllComments(showDeleteComments) {
    fetch("http://localhost:8080/api/comments").then(function (ev) {
        // console.clear();
        //console.log(ev);
        ev.json().then(function (commentList) {
            console.log(commentList);
            document.getElementById('spanId').innerHTML = "<br>";

            for (var i = 0; i < commentList.length; i++) {
                if (showDeleteComments) {
                    document.getElementById('spanId').innerHTML += "<li id=\"comment_" + commentList[i].id + "\">" +
                        commentList[i].text + "&#160<button onclick='loescheKommentar(" + commentList[i].id + ")' " +
                        "class=\"btn\"><i class=\"fa fa-trash\"></i></button>" + "</li>";

                } else {
                    document.getElementById('spanId').innerHTML += "<li id=\"comment_" + commentList[i].id + "\">" + commentList[i].text + "</li>";
                }
            }
            if (document.getElementById('spanId').innerHTML === "" || document.getElementById('spanId').innerHTML === "<br>") {
                document.getElementById('spanId').innerHTML = "<br>Keine Einträge";
            }
        })
    });
}

function getNewCommentsToInsert(ev) {
    ev.json().then(function (commentList) {
        for (var i = 0; i < commentList.length; i++) {
            insertComment(commentList[i].text);
        }
    });
}

function insertComment(insertThisComment) {
    document.getElementById('spanId').innerHTML += "<li>" + insertThisComment + "</li>";
}


function durchsuchKommentare() {
    var msg = document.querySelector("#searchStringInComment").value;
    if (msg === "/all") {
        fethAllComments(false);
        return;
    }

    var deleteComments = false;
    if (msg.toString().split("/d").length > 1) {
        deleteComments = true;
    }
    console.log("FUCKING SHOW DELETE: " + deleteComments + "\nLänge: " + msg.toString().split("/d").length);

    msg = msg.toString().replace("/all/d", "/all");
    msg = msg.toString().replace("&/d", "");
    msg = msg.toString().replace("/d&", "");
    msg = msg.toString().replace("/d", "/all");

    if (msg === "/all") {
        fethAllComments(true);
        return;
    }
    var suchAnfragen = msg.toString().split('&');

    for (var i = 0; i < suchAnfragen.length; i++) {
        if (suchAnfragen[i] === "") {
            suchAnfragen[i] = "nope_:D";
            suchAnfragen[i] = encodeURIComponent(suchAnfragen[i]);
        }
    }

    console.log("Variable: " + suchAnfragen.toString());

    fetch("http://localhost:8080/api/comments/search?suchAnfrage=" + suchAnfragen, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {
        //console.log(ev.text());

        document.getElementById('spanId').innerHTML = "";
        ev.json().then(function (searchResult) {
            var Ausgabe;
            Ausgabe = "Suchanfrage ergab <darkred>" +
                searchResult.comments.length + " Treffer</darkred> von " + searchResult.length +
                " Kommentaren &#160 <small> Dies sind<darkred> ";
            if (searchResult.length !== 0) {
                Ausgabe += searchResult.comments.length / searchResult.length * 100;
            } else {
                Ausgabe += "100%";
            }
            localStorage.setItem("AnzahlTreffer", searchResult.comments.length);
            localStorage.setItem("AnzahlKommentare", searchResult.length);
            document.getElementById('header').innerHTML = Ausgabe + "%</darkred> aller Anfragen</small>";

            var a = 0;

            for (var i = 0; i < searchResult.comments.length; i++) {
                Ausgabe = "";
                for (a = 0; a < suchAnfragen.length; a++) {

                    console.log("Gefundener Kommentar: " + searchResult.comments[i].text);
                    var splitResult = searchResult.comments[i].text.split(suchAnfragen[a]);
                    if (a !== 0) {
                        splitResult = Ausgabe.split(suchAnfragen[a]);
                        if (splitResult.length < 1) {
                            splitResult = splitResult.replace("<red>", "").replace("</red>", "").split(suchAnfragen[a]);
                        }
                    }
                    var farbeGesuchterString = "red>";
                    if (a === 1) {
                        farbeGesuchterString = "green>";
                    } else if (a === 2) {
                        farbeGesuchterString = "yellow>"
                    } else if (a === 3) {
                        farbeGesuchterString = "blue>";
                    }

                    Ausgabe = "";
                    for (var gS = 0; gS < splitResult.length; gS++) {
                        if (gS === splitResult.length - 1) {
                            Ausgabe += splitResult[gS];
                        } else {
                            Ausgabe += splitResult[gS] + "<" + farbeGesuchterString + suchAnfragen[a] + "</" + farbeGesuchterString;
                        }
                    }
                }
                //if (searchResult.comments[i].text.indexOf(suchAnfragen[a]) !== -1)  //if(searchResult.comments[i].text.split(suchAnfragen[a]).length > 1)   {}
                if (deleteComments) {
                    document.getElementById('spanId').innerHTML += "<li id=\"comment_" + searchResult.comments[i].id + "\">" +
                        Ausgabe + "&#160<button onclick='loescheKommentar(" + searchResult.comments[i].id + ")' " +
                        "class=\"btn\"><i class=\"fa fa-trash\"></i></button>" + "</li>";
                } else if (suchAnfragen[a] !== "/d") {
                    document.getElementById('spanId').innerHTML += "<li>" + Ausgabe + "</li>";
                }
            }

            if (document.getElementById('spanId').innerHTML === "" || document.getElementById('spanId').innerHTML === "") {
                document.getElementById('spanId').innerHTML = "<br>Keine Einträge";
            }
        });


    }).catch((function (error) {
        console.log("Error: ", error);
    }));
}

function loescheKommentar(commentId) {
    var msg;
    if (commentId === undefined) {
        msg = document.querySelector("#deleteCommentWithString").value;
        if (msg === "") return;
        fetch("http://localhost:8080/api/comments/delete?suchAnfrage=" + msg, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (ev) {
            console.log(ev);
            fethAllComments(true);
        }).catch((function (error) {
            console.log("Error", error);
        }));
    } else {
        fetch("http://localhost:8080/api/comments/deleteById/" + commentId, {
            method: 'DELETE'
        }).then(function (ev) {
            console.log(ev + "\n\nUnsere CommenId: " + commentId);
            document.getElementById("comment_" + commentId).remove();

            var e1 = parseInt(localStorage.getItem("AnzahlTreffer")) - 1;
            var e2 = parseInt(localStorage.getItem("AnzahlKommentare")) - 1;

            newHeader = "Suchanfrage ergab <darkred>" + e1 + " Treffer</darkred> von " + e2 + " Kommentaren &#160 <small> Dies sind<darkred> ";
            if (e2 !== 0) {
                newHeader += e1 / e2 * 100;
            } else {
                newHeader += "100%";
            }
            newHeader += "%</darkred> aller Anfragen</small>";
            document.getElementById("header").innerHTML = newHeader;

            localStorage.clear();
            localStorage.setItem("AnzahlTreffer", e1.toString());
            localStorage.setItem("AnzahlKommentare", e2.toString());
        }).catch((function (error) {
            console.log("Error", error);
        }));
    }
}

 */


/*

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};
// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// game loop
function loop() {
    requestAnimationFrame(loop);
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 5) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;
    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({x: snake.x, y: snake.y});
    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);
    // draw snake one cell at a time
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {

        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            // canvas is 400x400 which is 25x25 grids
            // canvas now is 1800*1200 which is 112*75
            apple.x = getRandomInt(0, 112) * grid;
            apple.y = getRandomInt(0, 75) * grid;
        }
        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < snake.cells.length; i++) {

            // snake occupies same space as a body part. reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}
// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
    // prevent snake from backtracking on itself by checking that it's
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)

    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
// start the game
requestAnimationFrame(loop);

 */