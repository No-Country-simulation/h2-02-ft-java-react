#FROM amazoncorretto:21-alpine-jdk
#COPY target/waki-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
#Este es mi Docker

# Etapa de construcción
FROM amazoncorretto:21-alpine-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Etapa final
FROM amazoncorretto:21-alpine-jdk
WORKDIR /app
COPY --from=build /app/target/waki-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]