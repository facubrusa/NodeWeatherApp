const supertest = require('supertest');
const app = require('../index');
const server = require('../server');

const api = supertest(app);

describe('GET /v1/location', () => {
    test('return a json with a 200 status code', async () => {
        await api
            .get('/v1/location')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('body contains an object', async () => {
        const response = await api.get('/v1/location');
        expect(response.body).toBeInstanceOf(Object);
    });

    test('body contains required properties', async () => {
        const response = await api.get('/v1/location');
        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                country: expect.any(String),
                countryCode: expect.any(String),
                region: expect.any(String),
                regionName: expect.any(String),
                city: expect.any(String),
                zip: expect.any(String),
                lat: expect.any(Number),
                lon: expect.any(Number),
                timezone: expect.any(String),
                isp: expect.any(String),
                org: expect.any(String),
                as: expect.any(String),
                query: expect.any(String),
            })
        )
    });
});

afterAll(() => {
    server.close()
});
