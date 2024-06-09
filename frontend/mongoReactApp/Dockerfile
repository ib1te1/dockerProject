# Используйте официальный образ Node.js как базовый
FROM node:18-alpine as builder

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте файлы проекта в контейнер
COPY . .

#RUN npm config set unsafe-perm true
# Установите зависимости проекта
RUN npm install
RUN npm install react-router-dom



# Соберите приложение для продакшена
RUN npm run build


FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]