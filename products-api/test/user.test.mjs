/* eslint-env node, mocha */
/* global describe, it, before, */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import User from '../models/user.js';


chai.use(chaiHttp);

describe('Users', () => {
    before((done) => {
        // Nettoyer la base de données avant de commencer les tests
        User.deleteMany({}, () => { 
           done();           
        });        
    });

    describe('/POST signup', () => {
        it('it should not POST a user without email field', (done) => {
            let user = {
                password: "123456"
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    res.body.errors.email.should.have.property('kind').eql('required');
                  done();
                });
        });

        it('it should POST a user', (done) => {
            let user = {
                email: "test@example.com",
                password: "123456"
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                  done();
                });
        });
    });
});
