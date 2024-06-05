#!/bin/bash

# Остановить выполнение скрипта при ошибке
set -e

# Переходим в директорию скрипта
cd "$(dirname "$0")"

# Переходим в директорию backend
cd backend

# Очистка предыдущих сборок
echo "Cleaning previous builds..."
mvn clean

# Сборка проекта
echo "Building project..."
mvn package -DskipTests

# Сборка и запуск Docker контейнеров
echo "Building and starting Docker containers..."
docker-compose up --build -d

echo "Application is now running at http://localhost:3000"