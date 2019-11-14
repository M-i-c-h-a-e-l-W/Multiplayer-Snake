console.log("JavaScript ist eingebunden!\n");
var user;
time = new Date();
window.onload = fethAllComments();

function mOver(obj) {
    obj.innerHTML = "Thank You"
}

function mOut(obj) {
    obj.innerHTML = "Mouse Over Me"
}

function choose(choice) {
    user = choice;
}

function stp(spielerHand) {
    var hand = 0;
    while (hand == 0) {
        hand = Math.round(Math.random() * 100) % 5;
    }
    // document.write('\nZufallswert ' + hand);

    if (spielerHand == 4) alert("Weichei :P");

    if (hand == spielerHand) {
        alert("Unentschieden\n" + "Gegener wählte auch : " + ausgabe(hand));
    } else if (hand == 1 && spielerHand == 2 || spielerHand == 4) {
        alert("Gegener wählte: " + ausgabe(hand) + "\nDu hast Gewonnen! ");
    } else if (hand == 2 && spielerHand == 3 || spielerHand == 4) {
        alert("Gegener wählte: " + ausgabe(hand) + "\nDu hast Gewonnen! ")
    } else if (hand == 3 && spielerHand == 1) {
        alert("Gegener wählte: " + ausgabe(hand) + "\nDu hast Gewonnen! ");
    } else {
        alert("Gegener wählte: " + ausgabe(hand) + "\nLooser");
    }
}

function ausgabe(auswahl) {
    if (auswahl == 1) {
        return 'Schere ';
    } else if (auswahl == 2) {
        return 'Stein ';
    } else if (auswahl == 3) {
        return 'Papier ';
    } else if (auswahl == 4) {
        return 'Nooby Brunnen';
    } else {
        return 'ERROR';
    }
}

function yourComment(newComment) {
    var msg;
    if (newComment === undefined) {
        msg = document.querySelector("#commentInput").value;
    } else {
        msg = newComment;
    }
    console.log("Kommentarnummer: -404" + "\nAusgelesener Text: " + msg);
    if (msg === "") return;
    //‚commentList.comment.getText();
    fetch("http://localhost:8080/api/comments", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({text: msg})
    }).then(function (ev) {
        console.log(ev);
        document.querySelector("#commentInput").value = "";
        fethAllComments();
    }).catch((function (error) {
        console.log("Error", error);
    }));
}

function generiereKommentare() {
    /*
      var newComments = ["Dies", "ist", "ein", "Satz", "Test 9 Millionen 832 Tausend 732", "automatischgenerierter Kommentar"];
      for (var i = 0; i <= 100; i++) {
          newComments.push("generierter Kommentar Nr: " + (i + 1))
      }
      for (var commentCounter = 0; commentCounter < newComments.length; commentCounter++) {
          yourComment(newComments[commentCounter]);
      }
      */

    fetch("http://localhost:8080/api/comments/generator", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    }).then(function (ev) {
        fethAllComments();
    }).catch((function (error) {
        console.log("Error", error);
    }));
}

function fethAllComments(showDeleteComments) {
    /*
import Stomp from "stompjs";

class InfoController{

    static webSocket = null;
    static listeners = [];
    static domain = "solar.tost-soft.de/";
    static wsUrl = "wss://"+this.domain+"ws";
    static url = "https://"+this.domain+"api/solar/info";

    static registerListener(func){
        this.listeners.push(func);
    }

    static connectWebSocket(){
        let socket = new WebSocket(this.wsUrl);
        let ws = Stomp.over(socket);
        let that = this;
        ws.connect({}, (frame) => {
            ws.subscribe("/info", (message)=> {
                //console.log(message);
                let status = JSON.parse(message.body)[0];
                //this.setState({solarInfo:status});
                this.listeners.forEach((func)=>{
                    func(status);
                })
                //this.observersUpdate.map((observer) => observer(JSON.parse(message.body) as Category[]));
            });
            that.webSocket = ws;
        }, function(error) {
            console.log("STOMP error " + error);
            that.webSocket = null;
        });
    }

    static fetchInitData(){
        return fetch(this.url,{ credentials: "include" });
    }
}

export default InfoController;
     */

    var connection = new WebSocket('wss://localhost:8080/ws', ['soap', 'xmpp']);
    connection.onopen = function () {
        connection.send("Ping");
    };
    connection.onerror = function (error) {
        console.log("WebSocket Error " + error);
    };
    connection.onmessage = function (e) {
        console.log("Server: " + e.data);
    };

    fetch("http://localhost:8080/api/comments").then(function (ev) {
        console.clear();
        console.log(ev);
        ev.json().then(function (commentList) {
            console.log(commentList);
            document.getElementById('spanId').innerHTML = "<br>";

            for (var i = 0; i < commentList.length; i++) {
                if (showDeleteComments) {
                    document.getElementById('spanId').innerHTML += "<li id=\"comment_" + commentList[i].id + "\">" +
                        commentList[i].text + "&#160<button onclick='loescheKommentar(" + commentList[i].id + ")' " +
                        "class=\"btn\"><i class=\"fa fa-trash\"></i></button>" + "</li>";

                } else {
                    document.getElementById('spanId').innerHTML += "<li>" + commentList[i].text + "</li>";
                }
            }
            if (document.getElementById('spanId').innerHTML === "" || document.getElementById('spanId').innerHTML === "<br>") {
                document.getElementById('spanId').innerHTML = "<br>Keine Einträge";
            }
        })
    });
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

//<input name="submit" type="submit" id="submit" class="submit" value="Post Comment">

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

function eingabefarbe() {
    document.getElementsByTagName("body")[0].style.backgroundColor = document.form2.farbfeld.value;
    document.form1.bgfarbe.value = document.getElementsByTagName("body")[0].style.backgroundColor;
}

function farbegreen() {
    document.bgColor = "#E3DABB";
    document.getElementsByTagName("body")[0].style.backgroundColor = document.bgColor;
    document.form1.bgfarbe.value = document.bgColor;
}

/*
function OLDdurchsuchKommentare() {
    var msg = document.querySelector("#searchStringInComment").value;
    if (msg === "") {
        return;
    }
    //var search = msg.toString().split("&");
    // for (var i = 0; i < search.length; i++){console.log("Kommentar wird nach: \"" + search[i] + "\" durchsucht");}

    //msg = msg.replace(/&/g, ";soGehtDasAuch_:D;");
    msg = encodeURIComponent(msg);
    fetch("http://localhost:8080/api/comments/search?suchAnfrage=" + msg, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(function (ev) {
        //console.log(ev.text());
        if (msg === "/all") {
            fethAllComments();
        } else {
            document.getElementById('spanId').innerHTML = "";
            ev.json().then(function (comments) {
                document.getElementById('spanId').innerHTML += "Suchanfrage ergab <red>" +
                    comments.length + " Treffer<red> von " + getLengthCommentList() + " Kommentaren";
                for (var i = 0; i < comments.length; i++) {
                    console.log("Gefundener Kommentar: " + comments[i].text);
                    document.getElementById('spanId').innerHTML += "<li>" + comments[i].text + "</li>";
                }
                if (document.getElementById('spanId').innerHTML === "") {
                    document.getElementById('spanId').innerHTML = "Keine Einträge";
                }
            });
        }

    }).catch((function (error) {
        console.log("Error: ", error);
    }));
}
*/

