const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;

beforeAll(done => {
    queryInterface.bulkDelete("Users")
    .then(() => done());
})

afterAll(done => {
    queryInterface.bulkDelete("Users")
    .then(() => done());
})

describe('POST /register', function (){ 
    it('should receive object success message', (done) => {
        let data = {email: 'mansur@mail.com', password: 'alhamdulilah', role: 'admin'};
        request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("email", 'mansur@mail.com');
                    done();
                }               
            })
    })
    it('email should not be empty', (done) => {
        let data = {email: '', password: 'alhamdulilah', role: 'admin'};
        request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Email tidak boleh kosong!');
                    done();
                }               
            })
    })
    it('email must be unqiue', (done) => {
        let data = {email: 'mansur@mail.com', password: 'alhamdulilah', role: 'admin'};
        request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'email must be unique');
                    done();
                }               
            })
    })
    it('password should not be empty', (done) => {
        let data = {email: 'bayu@mail.com', password: '', role: 'admin'};
        request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Password tidak boleh kosong!');
                    done();
                }               
            })
    })
    it('password lenght must be greater than 6', (done) => {
        let data = {email: 'candra@mail.com', password: '1234', role: 'admin'};
        request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", 'Password harus lebih dari 6 huruf/angka!');
                    done();
                }               
            })
    })
})

describe('POST /login', function(){
    it('should receive access_token', done => {
        let data = {email: 'mansur@mail.com', password: 'alhamdulilah'};
        request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                if(err) { throw err;}
                else {
                    let {status, body} = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("access_token", expect.any(String));
                    done();
                }
        })
    })
    it('should handle wrong email/password', (done) => {
        let data = {email: '', password: 'alhamdulilah'};
        request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                if(err){
                    throw err;
                } else {
                    let {status, body} = res;
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", 'Email/password salah');
                    done();
                }               
            })
    })
})
