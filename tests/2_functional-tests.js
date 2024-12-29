const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
suite('Functional Tests', function () {

    test('#1 GET: Viewing one stock', done => {
      chai.request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({ stock: 'TSLA' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'TSLA');
          assert.exists(res.body.stockData.price, 'TSLA has a price');
          done();
        });
    });

    test('#2 GET: Viewing one stock and liking it', done => {
      chai.request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({ stock: 'GOLD', like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOLD');
          assert.equal(res.body.stockData.likes, 1);
          assert.exists(res.body.stockData.price, 'GOLD has a price');
          done();
        });
    });

    test('#3 GET: Viewing the same stock and liking it again', done => {
      chai.request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({ stock: 'GOLD', like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOLD');
          assert.equal(res.body.stockData.likes, 1);
          assert.exists(res.body.stockData.price, 'GOLD has a price');
          done();
        });
    });

    test('#4 GET: Viewing two stocks', done => {
      chai.request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({ stock: ['AMZN', 'T'] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'AMZN');
          assert.equal(res.body.stockData[1].stock, 'T');
          assert.exists(res.body.stockData[0].price, 'AMZN has a price');
          assert.exists(res.body.stockData[1].price, 'T has a price');
          done();
        });
    });

    test('#5 GET: Viewing two stocks and liking them', done => {
      chai.request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({ stock: ['AMZN', 'T'], like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'AMZN');
          assert.equal(res.body.stockData[1].stock, 'T');
          assert.exists(res.body.stockData[0].price, 'AMZN has a price');
          assert.exists(res.body.stockData[1].price, 'T has a price');
          assert.exists(res.body.stockData[0].rel_likes, 'has rel_likes');
          assert.exists(res.body.stockData[1].rel_likes, 'has rel_likes');
          done();
        });
    });

});
