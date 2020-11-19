const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;
const {hashToken} = require('../helpers/jwt');
const {User} = require('../models/index');

let access_token = '';

async function generateToken() {
        let userData = {email: 'anto@mail.com', password: 'alhamdulilah', role: 'admin'}
        await User.create(userData)
            .then((res) => {
                return User.findOne({where:{email:userData.email}})
            })
            .then((res) => {
                access_token = hashToken({
                    id: res.id,
                    email: res.email,
                    role: res.role
                })
            })
            .catch(err => {
                throw err;
            })
}

beforeAll(async (done) => {
    await generateToken();
    done();     
    queryInterface.bulkDelete("Products")
        .then(() => {
            done();
        });
})

describe('POST /products', function() {
    it('should respond with json', function(done) {
        let data = {name: 'Batok Casan', image_url: 'gipi.com', price: 5000, stock: 420}

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(data)
        .end((err, response) => {
            if(err) {
                throw err;
            } else {
                const {body, status} = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("image_url", 'gipi.com');
                expect(body).toHaveProperty("stock", 420);
                done();
            }
           
        })
    });

    it(`Name should not be empty`, function(done) {
        let data = {name: '', image_url: 'gipi.com', price: 5000, stock: 420}
        request(app)
            .post('/products')
            .set('access_token', access_token)           
            .send(data)
            .end((err, response) => {
                if(err){
                    throw err;
                } else {
                    const {body, status} = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Nama produk tidak boleh kosong!');
                    done();
                }
        })
    })

    it(`Price should not be negative`, function(done) {
        let data = {name: 'Batok Casan Samsung', image_url: 'gipi.com', price: -5000, stock: 420}
        request(app)
            .post('/products')
            .set('access_token', access_token)           
            .send(data)
            .end((err, response) => {
                if(err){
                    throw err;
                } else {
                    const {body, status} = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Harga tidak boleh negatif!');
                    done();
                }
        })
    })

    it(`Price should not be empty`, function(done) {
        let data = {name: 'Batok Casan Samsung', image_url: 'gipi.com', price: '', stock: 420}
        request(app)
            .post('/products')
            .set('access_token', access_token)           
            .send(data)
            .end((err, response) => {
                if(err){
                    throw err;
                } else {
                    const {body, status} = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Harga produk tidak boleh kosong!');
                    done();
                }
        })
    })
});

