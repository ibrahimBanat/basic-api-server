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
  });

  describe('checking the status code and returned data for', () => {
    let id;
    it('record using POST', async () => {
      //arrange
      let food = {
        type: 'mansaf',
        quantity: 3,
      };
      //act
      let response = await (await request.post('/api/v1/food')).send(food);
      //assert
      expect(response.status).toEqual(201);
      expect(response.body.data.type).toEqual('mansaf');
      expect(response.body.data.quantity).toEqual('3');
      expect(response.body.id).toBeTruthy();
      id = response.body.id;
    });
    it('record using GET', async () => {
      //arrange
      //act
      let response = await request.get('/api/v1/food');
      //assert
      expect(response.status).toEqual(200);
      expect(response.body).toEqual([{ data: newStudent, id: id }]);
    });
  });
});

// describe('API Student testing', () => {
//     let id;
//     let newStudent = {
//         name: 'Mousa',
//         age: '25'
//     }
//     it('should create a new student ', async () => {
//         const response = await request.post('/student').send(newStudent);

//         expect(response.status).toEqual(201);
//         expect(response.body.data.name).toEqual('Mousa');
//         expect(response.body.data.age).toEqual('25');
//         expect(response.body.id).toBeTruthy();

//         id = response.body.id;
//     });
//     it('Should Read all Student',async()=>{
//         const response = await request.get('/student');

//         expect(response.status).toEqual(200)
//         expect(response.body).toEqual([{"data": newStudent, "id": id}])
//     });

//     let newInfo = {
//         name: 'Mosa',
//         age : '24'
//     }
//     it('should Update the student information' , async()=> {

//         const response = await request.put(`/student/${id}`).send(newInfo);

//         expect(response.body.data.name).toEqual('Mosa');
//         expect(response.body.data.age).toEqual('24');
//         expect(response.body.id).toEqual(id);
//     });
//     it('Should Read one Student Info',async()=>{
//         const response = await request.get(`/student/${id}`);
//         expect(response.status).toEqual(200)
//         expect(response.body.data.name).toEqual('Mosa');
//         expect(response.body.data.age).toEqual('24');
//         expect(response.body.id).toEqual(id);

//     });
//     it('Should delete  Student Info',async()=>{
//         const deleteStudent = await request.delete(`/student/${id}`);
//         const tryReadDeletedStudent = await request.get(`/student/${id}`);
//         expect(tryReadDeletedStudent.status).toEqual(200)
//         expect(tryReadDeletedStudent.body).toBeFalsy();

//     });
// });
