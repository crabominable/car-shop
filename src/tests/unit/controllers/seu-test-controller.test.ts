import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import { carRequest, createCarMock } from '../../mocks/createCarMock';
import { getAllCarMock } from '../../mocks/getAllCarMock';
import { Car } from '../../../interfaces/CarInterface';
import { updateCarMock, updatedCarMock } from '../../mocks/updateCarMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Camada controller', () => {
  describe('Car controller', () => {
    describe('Método POST /cars', () => {
      it('testa se o método POST /cars retorne o status "201"', async () => {
        chai.request(server.getApp())
          .post('/cars')
          .send(carRequest)
          .then((res) => {
            expect(res).to.have.status(201)
          });
      });

      it('testa se o método POST /cars retorne o status "201"', async () => {
        chai.request(server.getApp())
          .post('/cars')
          .send(carRequest)
          .then((res) => {
            expect(res).to.be.an('object');
          });
      });
  
      it('testa o retorno da função "create"', async () => {
        chai.request(server.getApp())
          .post('/cars')
          .send(carRequest)
          .then((res) => {
            expect(res.body).to.deep.equal(createCarMock)
          });
      });
    });
  
    describe('Método GET /cars', () => {
      describe('Retorna todos os carros', () => {
        it('testa se o retorno possui o status "200"', async () => {
          chai.request(server.getApp())
            .get('/cars')
            .then((res) => {
              expect(res).to.have.status(200)
            });
        });
      
        it('testa o retorno da função "read"', async () => {
          chai.request(server.getApp())
            .get('/cars')
            .then((res) => {
              expect(res.body).to.deep.equal(getAllCarMock)
            });
        });

        it('testa se tem um objeto em cada item do array', async () => {
          chai.request(server.getApp())
            .get('/cars')
            .then((res) => {
              res.body.forEach((car: Car) => {
                expect(car).to.be.an('object');
              });
            });
        });
      });
  
      describe('Retorna um carro', () => {
        it('testa se o retorno possui o status "200"', async () => {
          chai.request(server.getApp())
            .post('/cars')
            .then((res) => {
              expect(res).to.have.status(200)
            });
        });
      
        it('testa o retorno da função "readOne"', async () => {
          chai.request(server.getApp())
            .get(`/cars/${createCarMock._id}`)
            .then((res) => {
              expect(res.body).to.deep.equal(createCarMock)
            });
        });
  
        it('testa se o retorno possui o status "400"', async () => {
          chai.request(server.getApp())
            .get('/cars/4edd40c86762e0fb1')
            .then((res) => {
              expect(res.body).to.have.status(400)
            });
        });
  
        it('testa a mensagem de erro "O ID deve ter 24 caracteres hexadecimais"', async () => {
          chai.request(server.getApp())
            .get('/cars/4edd40c86762e0fb1')
            .then((res) => {
              expect(res.body).to.deep.equal({error: 'Id must have 24 hexadecimal characters'})
            });
        });
      });
    });
  
    describe('Método PUT /cars', () => {
      it('testa se o retorno possui o status "200"', async () => {
        chai.request(server.getApp())
          .put(`/cars/${updatedCarMock._id}`)
          .send(updateCarMock)
          .then((res) => {
            expect(res).to.have.status(200)
          });
      });
    
      it('testa o retorno da função "update"', async () => {
        chai.request(server.getApp())
          .put(`/cars/${updatedCarMock._id}`)
          .send(updateCarMock)
          .then((res) => {
            expect(res.body).to.deep.equal(createCarMock)
          });
      });
    });
  
    describe('Método DELETE /cars', () => {
      it('testa se o retorno possui o status "204"', async () => {
        chai.request(server.getApp())
          .delete(`/cars/${createCarMock._id}`)
          .then((res) => {
            expect(res).to.have.status(204)
          });
      });
    });
  });

  describe('Motorcycle controller', () => {
    describe('Método POST /motorcycles', () => {
      it('testa se o método POST /motorcycles retorne o status "201"', async () => {
        chai.request(server.getApp())
          .post('/motorcycles')
          .then((res) => {
            expect(res).to.have.status(201)
          });
      });
  
      it('testa o retorno da função "create"', async () => {
        chai.request(server.getApp())
          .post('/motorcycles')
          .then((res) => {
            expect(res.body).to.deep.equal(createCarMock)
          });
      });
    });
  
    describe('Método GET /motorcycles', () => {
      describe('Retorna todos os carros', () => {
        it('testa se o retorno possui o status "200"', async () => {
          chai.request(server.getApp())
            .get('/motorcycles')
            .then((res) => {
              expect(res).to.have.status(200)
            });
        });
      
        it('testa o retorno da função "read"', async () => {
          chai.request(server.getApp())
            .get('/motorcycles')
            .then((res) => {
              expect(res.body).to.deep.equal(getAllCarMock)
            });
        });
      });
  
      describe('Retorna um carro', () => {
        it('testa se o retorno possui o status "200"', async () => {
          chai.request(server.getApp())
            .post('/motorcycles')
            .then((res) => {
              expect(res).to.have.status(200)
            });
        });
      
        it('testa o retorno da função "readOne"', async () => {
          chai.request(server.getApp())
            .get(`/motorcycles/${createCarMock._id}`)
            .then((res) => {
              expect(res.body).to.deep.equal(createCarMock)
            });
        });
  
        it('testa se o retorno possui o status "400"', async () => {
          chai.request(server.getApp())
            .get('/motorcycles/4edd40c86762e0fb1')
            .then((res) => {
              expect(res.body).to.have.status(400)
            });
        });
  
        it('testa a mensagem de erro "O ID deve ter 24 caracteres hexadecimais"', async () => {
          chai.request(server.getApp())
            .get('/motorcycles/4edd40c86762e0fb1')
            .then((res) => {
              expect(res.body).to.deep.equal({error: 'Id must have 24 hexadecimal characters'})
            });
        });
      });
    });
  
    describe('Método PUT /motorcycles', () => {
      it('testa se o retorno possui o status "200"', async () => {
        chai.request(server.getApp())
          .put(`/motorcycles/${createCarMock._id}`)
          .then((res) => {
            expect(res).to.have.status(200)
          });
      });
    
      it('testa o retorno da função "update"', async () => {
        chai.request(server.getApp())
          .put(`/motorcycles/${createCarMock._id}`)
          .then((res) => {
            expect(res.body).to.deep.equal(createCarMock)
          });
      });
    });
  
    describe('Método DELETE /motorcycles', () => {
      it('testa se o retorno possui o status "204"', async () => {
        chai.request(server.getApp())
          .put(`/motorcycles/${createCarMock._id}`)
          .then((res) => {
            expect(res).to.have.status(204)
          });
      });
    });
  });
});
