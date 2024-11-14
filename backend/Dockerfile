## Esto requiere de que la carpeta target este subida al Repo
#FROM amazoncorretto:21-alpine-jdk
#COPY target/waki-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

## Esto no requiere de que la carpeta target este subida al Repo
# Etapa de construcción
FROM amazoncorretto:21-alpine-jdk AS build
WORKDIR /workspace
COPY . .
RUN chmod +x mvnw  # Da permisos de ejecución al archivo mvnw
RUN ./mvnw clean package -DskipTests

# Etapa final
FROM amazoncorretto:21-alpine-jdk
WORKDIR /workspace
COPY --from=build /workspace/target/waki-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]