// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    // Создание клиента для подключения к Redis
    const client = createClient();

    // Обработчик ошибок для клиента Redis
    client.on('error', (err) => {
        console.error('Redis Client Error', err);
    });

    // Подключаемся к Redis
    await client.connect();

    // Сохранение данных в Redis
    await client.set('name', 'John Doe');
    await client.set('age', '30');
    await client.set('city', 'New York');

    // Чтение и вывод значения для ключа 'name'
    const name = await client.get('name');
    const age = await client.get('age');
    const city = await client.get('city');

    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`City: ${city}`);

    // Закрытие соединения с Redis
    await client.quit();
}

module.exports = { manageRedis };
