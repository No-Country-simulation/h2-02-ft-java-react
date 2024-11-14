## Esto requiere de que la carpeta target este subida al Repo
FROM amazoncorretto:21-alpine-jdk
COPY target/waki-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]