# Website-002-Snake

**Ziele:** <br>
- Es soll ein Multiplayer Snake Spiel mit Kommentarfunktion und Score Anzeige implementiert. 
- Außerdem soll es eine Anmeldefunktion geben, bei welcher zwischen dem Admin und normalen Usern, welche sich registrieren können, differenziert werden soll. 
- Die Kommentare darf der Admin nach belieben löschen und durchsuchen.

**Aktueller Stand:** <br>
- Kommentare werden in DB gespeichert und können durchsucht & gelöscht von jeden Nutzer
- Nutzer & Anmeldefunktion fehlt völlig
- ~~Opensource Snake ist eingefügt grundlegend an einige Dinge angepasst~~ <-- komplett gelöscht und selbst geschrieben
- Snake Spiel über Websockets implementiert siehe Finished TODO

the following text is just for the collaborator

**Finished TODO:** <br>
- ~~Struktur schaffen~~
- ~~Server/Client Kommunikation Testfunktion schreiben~~
- ~~Server/Client Kommunikation neue Kommentare aus anderem Tab aktualisieren~~
- ~~gelöschte Kommentare aktualisieren~~
- ~~generierte Kommentare aktualisieren~~
- ~~Unnötige Console.log entfernen~~ dauerhaft Relevant
- ~~Snake Server/Clients Kommunikation erschaffen~~
- ~~Snake Oberflächen Layout erschaffen (Feld + Snake´s)~~
- ~~unterschiedliche Random Snake Farben einfügen~~
- ~~currentMilis anstatt Sleep()~~
- ~~Snake Score einfügen~~
- ~~Snake Multiplayerfähig~~
- ~~Snake Bugg "Länge der Schlange" beheben~~
- ~~Snake Head farblich erkennbar~~
- ~~Snake in anderer Snake gespawnt Execption gelöst bei Tod~~
- ~~bei Disconnected Dead~~
- ~~Score anzeigen~~
- ~~Farbe bei der Score anzeige~~
- ~~Pause Button~~
- ~~Snake Schaden durch andere Spieler und sich selbst~~
- ~~bester Spieler hervorgehoben~~

**TODO:** <br>
- Snake Bild als Überschrift
- ~~Resetfunktion~~
- Geschwindigkeit anpassen
- Kollision optimieren (Feld Array)
- Session mit Anmeldefunktion und login
- Zeittracking
- parallelität beim Spielstand beachten mutex
- Bestehende Model Klassen in DTO und Model auftrennen
- Bugg Richtungsumkehrung
- Bugg Footer aufsammeln bei geringem Score
