# Multiplayer-Snake

This is my Mulitplayer-Snake game.
Its possible to play a normal Snake Game with Websockets in your lokal network with other friends.
If you want to  start the program on your computer you have to add the package in IntelliJ or an other IDEA and start the project with Spring Boot (the path of the main class is "org.snake.MainApplication").
If you have any questions please contact me.

**How to run it:**<br/>
- run the "./startDocker.sh" Script or: "docker run --name simple-postgresql -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=test -p 127.0.0.1:5433:5432 -d postgres"
- go in the backend folder and run "mvn clean install"
- then "mvn spring-boot:run"
- now you can play it using your ip adress + http://xxx.xxx.xxx.xxx:8080/snake.html


**Aim:**<br/>
- [x] playing a snake which can eat fodder
- [x] snake should get some more points by eating or hitting other players
- [x] it should be possible to comment the site and communicate with a chatbox 
- [x] player choose their name and color
- [ ] adding login
- [ ] player can play against each other on a public server

**Sources** <br/>
Snake Icon: <br/>
http://www.iconarchive.com/show/noto-emoji-animals-nature-icons-by-google/22285-snake-icon.html <br/>
Crone png: <br/>
https://dlpng.com/png/502383 <br/>
Apple png: <br/>
https://pngriver.com/download-apple-fruit-png-image-72131/ <br/>
