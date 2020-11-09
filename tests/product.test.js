const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;

beforeAll((done) => {
    queryInterface.bulkDelete("Products")
    .then(() => {
        done();
    });
})

describe('POST /products', function() {
    let data = {name: 'Batok Casan', image_url: 'gipi.com', price: '5000', stock: '420'}
    it('responds with json', function(done) {
      request(app)
        .post('/products')
        .send(data)
        .then(response => {
            const {body, status} = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("image_url", 'gipi.com');
            expect(body).toHaveProperty("stock", 420);
            done();
        })
        .catch(err => {
            console.log(err);
            done();
        })
    });

    it(`name cannot be empty`, function(done) {
        request(app)
            .post('/products')
            .send(data)
            .then(response => {
                const {body, status} = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("name", 'Batok Casan');
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })

    it(`price`, function(done) {
        request(app)
            .post('/products')
            .send(data)
            .then(response => { 
                const {body, status} = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("price", 5000);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })
});

