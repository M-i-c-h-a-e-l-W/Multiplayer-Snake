console.log("JavaScript ist eingebunden!\n");
var user;


time = new Date();
window.onload = initialice();

function initialice() {
    fethAllComments();
    connectWebSocket();
}

function connectWebSocket() {
    let socket = new WebSocket("ws://" + "10.62.2.194" + ":8080/ws");
    let ws = Stomp.over(socket);
    let that = this;
    ws.connect({}, (frame) => {
        ws.subscribe("/comment/new", (message) => {
            console.log("WebSocket is Connected\nVariable Message: ", message);
            let commentJSONObject = JSON.parse(message.body);
            console.log(commentJSONObject.text);
            insertComment(commentJSONObject.text);

            console.log("TEST: " + message);
        });
        ws.subscribe("/comment/deleteById", (message) => {
            console.log("TEST: ", message);
            let commentJSONObjectID = JSON.parse(message.body);
            document.getElementById("comment_" + commentJSONObjectID.id).remove();
        });
        that.webSocket = ws;
    }, function (error) {
        console.log("STOMP error " + error);
        //that.webSocket = null;
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
    fetch("http://" + "10.62.2.194" + ":8080/api/comments", {
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

    fetch("http://" + "10.62.2.194" + ":8080/api/comments/generator", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    }).then(function (ev) {
        getNewCommentsToInsert(ev);
    }).catch((function (error) {
        console.log("Error", error);
    }));
}

function fethAllComments(showDeleteComments) {
    fetch("http://" + "10.62.2.194" + ":8080/api/comments").then(function (ev) {
        // console.clear();
        //console.log(ev);
        ev.json().then(function (commentList) {
            //console.log(commentList);
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
    //console.log("SHOW DELETE: " + deleteComments + "\nLänge: " + msg.toString().split("/d").length);

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

    console.log("Suchanfragen: " + suchAnfragen.toString());

    fetch("http://" + "10.62.2.194" + ":8080/api/comments/search?suchAnfrage=" + suchAnfragen, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {
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

                    //console.log("Gefundener Kommentar: " + searchResult.comments[i].text);
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
        fetch("http://" + "10.62.2.194" + ":8080/api/comments/delete?suchAnfrage=" + msg, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (ev) {
            //console.log(ev);
            fethAllComments(true);
        }).catch((function (error) {
            console.log("Error", error);
        }));
    } else {
        fetch("http://" + "10.62.2.194" + ":8080/api/comments/deleteById/" + commentId, {
            method: 'DELETE'
        }).then(function (ev) {
            console.log(ev + "\n\nDie CommentId des Kommentars welcher gelöscht wird: " + commentId);
            //document.getElementById("comment_" + commentId).remove();

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