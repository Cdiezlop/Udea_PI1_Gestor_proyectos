# Imagen base con JDK 17
FROM gradle:7.6.0-jdk17 AS build

WORKDIR /app
COPY . .

# Construir proyecto
RUN gradle clean build -x test

# Imagen final
FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
