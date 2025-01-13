// Write a function that accepts an array of URLs,
// makes parallel queries for each of them, and returns an
// an array of results in the order in which the queries are completed.

// Example input data:
// const urls = ['https://jsonplaceholder.typicode.com/posts/1', 
// 'https://jsonplaceholder.typicode.com/posts/2'];

// Expected result:
// [
// { data: { ... }, status: 200 },
// { data: { ... }, status: 200 }
// ] 
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
];

fetchAll(urls).then(results => {
    console.log(results);
});        

type RequestsResult = {
    data: any,
    status: number
}

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    //Your code goes here
     const promises = urls.map(async (url) => {
        try {
            const response = await fetch(url); // выполняем запрос
            const data = await response.json(); // парсим ответ как JSON
            return { data, status: response.status }; // возвращаем объект с данными и статусом
        } catch (error) {
            return { data: error.message, status: 500 }; // если ошибка, возвращаем код 500
        }
    });

    // Ждём выполнения всех запросов и возвращаем результаты в порядке их выполнения
    return Promise.all(promises);
    return [];
}

module.exports = { fetchAll };
