// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose from 'mongoose';

// Тип для дублированных пользователей
type DuplicatedUsers = {
    email: string;
};

// Схема для пользователя
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Уникальный email
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        // Подключаемся к базе данных MongoDB
        await mongoose.connect('mongodb://localhost:27017/mydb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Создание новых пользователей
        const users = [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Doe', email: 'jane@example.com' },
            { name: 'John Smith', email: 'john@example.com' }, // Этот email будет дублироваться
        ];

        // Добавляем новых пользователей в коллекцию 'users'
        await User.insertMany(users, { ordered: false }); // { ordered: false } чтобы продолжить добавление, если ошибка

        // Поиск пользователей с дублирующимися email
        const duplicates = await User.aggregate([
            {
                $group: {
                    _id: "$email",
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gt: 1 }, // Ищем только те email, которые встречаются более одного раза
                },
            },
            {
                $project: {
                    email: "$_id",
                    _id: 0,
                },
            },
        ]);

        return duplicates;

    } catch (error) {
        console.error('Error:', error);
        return [];
    } finally {
        // Закрытие подключения к базе данных
        await mongoose.disconnect();
    }
}

module.exports = { manageUsers };
