#!/bin/bash

# Остановить выполнение скрипта при ошибке
set -e

# Запуск MongoDB инициализационных скриптов
echo "Initializing MongoDB with sample data..."
docker exec -i db mongosh -u admin -p 123456 --authenticationDatabase admin libraryDB < mongo-init.js

echo "Initialization completed."