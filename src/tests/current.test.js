const supertest = require('supertest');
const app = require('../index');
const server = require('../server');

const api = supertest(app);

describe('GET /v1/current', () => {
    test('return a json with a 200 status code', async () => {
        await api
            .get('/v1/current')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('body contains an object', async () => {
        const response = await api.get('/v1/current');
        expect(response.body).toBeInstanceOf(Object);
    });

    test('body contains required properties', async () => {
        const response = await api.get('/v1/current');
        expect(response.body).toEqual(
            expect.objectContaining({
                coord: expect.any(Object),
                weather: expect.any(Array),
                main: expect.any(Object),
                wind: expect.any(Object),
                clouds: expect.any(Object),
                sys: expect.any(Object),
                name: expect.any(String),
                cod: expect.any(Number),
            })
        )
    });
});

describe('GET /v1/current/:city', () => {
    test('return a json with a 200 status code', async () => {
        await api
            .get('/v1/current/Cordoba')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('return 400 status code if city is a number', async () => {
        await api
            .get('/v1/current/12345')
            .expect(400);
    });

    test('return 404 status code if the city was not found', async () => {
        await api
            .get('/v1/current/asdasd')
            .expect(404);
    });

    test('body contains an object', async () => {
        const response = await api.get('/v1/current');
        expect(response.body).toBeInstanceOf(Object);
    });

    test('body contains required properties', async () => {
        const response = await api.get('/v1/current');
        expect(response.body).toEqual(
            expect.objectContaining({
                coord: expect.any(Object),
                weather: expect.any(Array),
                main: expect.any(Object),
                wind: expect.any(Object),
                clouds: expect.any(Object),
                sys: expect.any(Object),
                name: expect.any(String),
                cod: expect.any(Number),
            })
        )
    });
});

afterAll(() => {
    server.close()
});
