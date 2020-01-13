docker run -it --rm --name Website-002 \
  -v /home/tost/workspace/Multiplayer-Snake:/usr/src/mymaven \
  -w /usr/src/mymaven \
  maven:3.6-jdk-11 \
  mvn clean install -DskipTests
