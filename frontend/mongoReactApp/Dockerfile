# Используйте официальный образ Node.js как базовый
FROM node:14-alpine as builder

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте файлы проекта в контейнер
COPY . .

# Установите зависимости проекта
RUN npm install

# Соберите приложение для продакшена
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]