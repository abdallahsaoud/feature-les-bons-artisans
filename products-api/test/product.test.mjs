/* eslint-env node, mocha */
/* global describe, it, before, */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import Product from '../models/product.js';


chai.use(chaiHttp);

describe('Products', () => {
    before((done) => {
        // Nettoyer la base de données avant de commencer les tests
        Product.deleteMany({}, () => { 
           done();           
        });        
    });

    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                  done();
                });
        });
    });

    describe('/POST product', () => {
        it('it should not POST a product without name field', (done) => {
            let product = {
                type: "phone",
                price: 100
            }
            chai.request(server)
                .post('/api/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                  done();
                });
        });

        it('it should POST a product', (done) => {
            let product = {
                name: "Test Phone",
                type: "phone",
                price: 200,
                rating: 5,
                warranty_years: 2,
                available: true
            }
            chai.request(server)
                .post('/api/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('type');
                    res.body.should.have.property('price');
                  done();
                });
        });
    });
});
