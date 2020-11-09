const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;
const {hashPassword} = require('../helpers/bcrypt');


describe('POST /register', function (){ 
    let data = {email: 'mansur@mail.com', password: hashPassword('alhamdulilah'), role: 'admin'};
    it('has non unique email', done => {
        request(app)
            .post('/register')
            .send(data)
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(500);
                done();
            })
            .catch(err => {
                done();
            })
    })
})
