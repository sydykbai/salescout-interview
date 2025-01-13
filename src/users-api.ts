// Create an API using Node.js and Express:
// 1. POST /user - adds a user.
// 2. GET /users - returns all users.

// Use Express library

import express, { Request, Response } from 'express';
const app = express();

app.use(express.json()); // Middleware для парсинга JSON в теле запроса

const users: { name: string }[] = []; // Массив для хранения пользователей

// POST /user - добавляет пользователя
app.post('/user', (req: Request, res: Response) => {
    const { name } = req.body; // Извлекаем имя пользователя из тела запроса

    if (!name) {
        return res.status(400).json({ message: 'Name is required' }); // Проверка на наличие имени
    }

    // Добавляем нового пользователя в массив
    users.push({ name });

    return res.status(201).json({ message: 'User added successfully' });
});

// GET /users - возвращает всех пользователей
app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users); // Отправляем всех пользователей в ответе
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Запуск сервера
}

export default app;
