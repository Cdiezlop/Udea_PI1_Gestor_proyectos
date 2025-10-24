FROM gradle:7.6.0-jdk17 AS build
WORKDIR /app
COPY . .
RUN chmod +x gradlew && ./gradlew clean build -x test

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
