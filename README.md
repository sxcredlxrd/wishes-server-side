# Wishes Server

Backend часть проекта **Wishes** — сервиса для создания и управления списками желаний, коллекциями и шарингом через уникальные ссылки.

## 📦 Стек технологий

- **NestJS 11.x** — модульный backend-фреймворк на TypeScript
- **Prisma** — типобезопасный ORM и миграции базы данных
- **JWT + Passport.js** — токен-ориентированная аутентификация с поддержкой стратегий OAuth
- **Argon2** — безопасное хеширование паролей
- **class-validator** — валидация входящих DTO-запросов
- **TypeScript + ESLint + Prettier** — типизация и контроль качества кода
- **Jest** — юнит- и интеграционное тестирование
- **Yandex OAuth** — внешняя авторизация через Яндекс

## 🛠 Установка и запуск

### 1. Клонируй репозиторий

```bash
git clone https://github.com/sxcredlxrd/wishes-server-side.git
cd wishes-server-side
````

### 2. Установи зависимости

```bash
yarn install
```

### 3. Настрой переменные окружения

Создай файл `.env` на основе `.env.example`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/wishes_db"

# JWT Configuration
JWT_SECRET="your-jwt-secret-key"
JWT_REFRESH_SECRET="your-jwt-refresh-secret"

# Client Configuration
CLIENT_URL="http://localhost:3000"

# Yandex OAuth
YANDEX_CLIENT_ID="your-yandex-client-id"
YANDEX_CLIENT_SECRET="your-yandex-client-secret"
```

### 4. Запусти миграции и Prisma Studio (по желанию)

```bash
npx prisma migrate dev --name init
npx prisma studio
```

### 5. Запусти сервер

```bash
yarn start:dev
```

## 📁 Основные модули

| Модуль        | Описание                                            |
| ------------- | --------------------------------------------------- |
| `auth`        | Регистрация, логин, JWT                             |
| `user`        | Работа с пользователями                             |
| `collection`  | Коллекции желаний                                   |
| `wish`        | Желания внутри коллекций                            |
| `shared-link` | Генерация публичных ссылок на коллекции или желания |

## 🔐 Аутентификация

Используется JWT. После логина пользователь получает `accessToken`, который нужно передавать в заголовке:

```
Authorization: Bearer <access_token>
```

## 📤 Примеры запросов (Postman)

Коллекция Postman может быть добавлена позже. Примеры запросов:

* POST `/auth/register`
* POST `/auth/login`
* POST `/collection`
* POST `/wish/:collectionId`
* GET `/shared-link/:token`

## 📌 TODO / Планы

* [x] Аутентификация
* [x] CRUD для пользователей, коллекций, желаний
* [x] Генерация публичных ссылок
* [ ] Ограничения по правам доступа
* [ ] Реакции на желания

## 🧑‍💻 Автор

**sxcredlxrd**
GitHub: [@sxcredlxrd](https://github.com/sxcredlxrd)
