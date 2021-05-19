'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.server);

describe('api server', () => {
  describe('checking routes status when', () => {
    it('we have a bad route with 404', async () => {
      //arrange
      let route = '/api/v1/foo';

      //act
      let response = await request.get(route);
      //assert
      expect(response.status).toEqual(404);
    });
    it('we have a bad method with 404', async () => {
      let route = '/api/v1/food';

      let response = await request.delete(route);
      expect(response.status).toEqual(404);
    });
    it('we have /clothes with 200', async () => {
      const response = await request.get('/api/v1/clothes');
      expect(response.status).toEqual(200);
    });
    it('we have /food with 200', async () => {
      const response = await request.get('/api/v1/food');
      expect(response.status).toEqual(200);
    });
  });

  describe('checking the status code and returned data for', () => {
    let id;
    describe('/clothes', () => {
      it('on record using POST', async () => {
        //arrange
        let clothes = {
          type: 'jeans',
          quantity: 3,
        };
        //act
        let response = await request.post('/api/v1/clothes').send(clothes);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.data.type).toEqual('jeans');
        expect(response.body.data.quantity).toEqual(3);
        id = response.body.id;
      });
      it('on record using GET', async () => {
        //arrange

        //act
        let response = await request.get('/api/v1/clothes');
        //assert
        expect(response.status).toEqual(200);
      });
      it('on record using PUT', async () => {
        //arrange

        //act
        let response = await request.put(`/api/v1/clothes/${id}`).send({
          type: 't-shirt',
          quantity: 5,
        });
        //assert
        expect(response.status).toEqual(200);
        expect(response.body.data.type).toEqual('t-shirt');
      });
      it('on record using GET/:id', async () => {
        //arrange
        //act
        const response = await request.get(`/api/v1/clothes/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.data.type).toEqual('t-shirt');
      });
    });
    describe('/food', () => {
      it('on record using POST', async () => {
        //arrange
        let food = {
          type: 'burger',
          quantity: 3,
        };
        //act
        let response = await request.post('/api/v1/food').send(food);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.data.type).toEqual('burger');
        expect(response.body.data.quantity).toEqual(3);
        id = response.body.id;
      });
      it('on record using GET', async () => {
        //arrange

        //act
        let response = await request.get('/api/v1/food');
        //assert
        expect(response.status).toEqual(200);
      });
      it('on record using PUT', async () => {
        //arrange

        //act
        let response = await request.put(`/api/v1/food/${id}`).send({
          type: 'shawerma',
          quantity: 5,
        });
        //assert
        expect(response.status).toEqual(200);
        expect(response.body.data.type).toEqual('shawerma');
      });
      it('on record using GET/:id', async () => {
        //arrange
        //act
        const response = await request.get(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.data.type).toEqual('shawerma');
      });
    });
  });
});
