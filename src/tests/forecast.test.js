const supertest = require('supertest');
const app = require('../index');
const server = require('../server');

const api = supertest(app);

describe('GET /v1/forecast', () => {
    test('return a json with a 200 status code', async () => {
        await api
            .get('/v1/forecast')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('body contains an object', async () => {
        const response = await api.get('/v1/forecast');
        expect(response.body).toBeInstanceOf(Object);
    });

    test('body contains required properties', async () => {
        const response = await api.get('/v1/forecast');
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                max_temp: expect.any(Number),
                min_temp: expect.any(Number),
                temp: expect.any(Number),
                feels_like: expect.any(Number),
                pressure: expect.any(Number),
                humidity: expect.any(Number),
                main: expect.any(String),
                icon: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                formated_date: expect.any(String),
            })
        )
    });
});

describe('GET /v1/forecast/:city', () => {
    test('return a json with a 200 status code', async () => {
        await api
            .get('/v1/forecast/Cordoba')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('return 400 status code if city is a number', async () => {
        await api
            .get('/v1/forecast/12345')
            .expect(400);
    });

    test('return 404 status code if the city was not found', async () => {
        await api
            .get('/v1/forecast/asdasd')
            .expect(404);
    });

    test('body contains an object', async () => {
        const response = await api.get('/v1/forecast');
        expect(response.body).toBeInstanceOf(Object);
    });

    test('body contains required properties', async () => {
        const response = await api.get('/v1/forecast');
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                max_temp: expect.any(Number),
                min_temp: expect.any(Number),
                temp: expect.any(Number),
                feels_like: expect.any(Number),
                pressure: expect.any(Number),
                humidity: expect.any(Number),
                main: expect.any(String),
                icon: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                formated_date: expect.any(String),
            })
        )
    });
});

afterAll(() => {
    server.close()
});
