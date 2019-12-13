docker run -it --rm --name Website-002 \
  -v /Users/mweishaar/projects/Website-002:/usr/src/mymaven \
  -w /usr/src/mymaven \
  maven:3.6-jdk-11 \
  mvn clean install -DskipTests
