# Используйте официальный образ OpenJDK 11 как базовый
FROM maven:3.8.4-openjdk-17-slim AS builder

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте исходный код приложения в контейнер
COPY . .

# Соберите проект
RUN mvn clean package

# Создайте новый слой для запуска приложения
FROM amazoncorretto:21

# Копируйте собранный JAR-файл из предыдущего этапа сборки
COPY --from=builder /app/target/*.jar /app/my-app.jar

# Установите рабочую директорию в контейнере
WORKDIR /app

# Запустите приложение
ENTRYPOINT ["java", "-jar", "/app/my-app.jar"]