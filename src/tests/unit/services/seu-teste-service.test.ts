import { expect } from 'chai';
// import { Model } from 'mongoose';
// import mongoose from 'mongoose';
import sinon from 'sinon';

// import CarModel, { carSchema } from '../../../models/Car';

import {
  createCarMock,
} from '../../mocks/createCarMock';
import CarService from '../../../services/Car';
import { getAllCarMock } from '../../mocks/getAllCarMock';
import { updateCarMock, updatedCarMock } from '../../mocks/updateCarMock';

describe ('Car service', () => {
  describe('Método POST /cars', () => {
    let carService = new CarService();

    before(() => sinon.stub(carService,
      'create').resolves(createCarMock)
    );

    after(() => {
      sinon.restore()
    });

    it('retorna um objeto', async () => {
      const car = await carService.create({
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      });
      expect(car).to.be.an('object');
    })

    it('retorna o carro criado', async () => {
      const car = await carService.create({
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      });
      expect(car).to.be.equal(createCarMock);
    });
  });

  describe('Método GET /cars', async () => {
    describe('Retorna todos os carros', async () => {
      let carService = new CarService();

      before(() => sinon.stub(carService,
      'read').resolves(getAllCarMock)
      );

      after(() => {
        sinon.restore()
      });

      it('retorna um array', async () => {
        const cars = await carService.read();
        expect(cars).to.be.an('array');
      });
  
      it('retorna todos os carros', async () => {
        const cars = await carService.read();
        expect(cars).to.be.equal(getAllCarMock);
      });
    });

    describe('Retorna um carro', async () => {
      let carService = new CarService();

      before(() => sinon.stub(carService,
      'readOne').resolves(createCarMock)
      );

      after(() => {
        sinon.restore()
      });

      it('retorna um objeto', async () => {
        const cars = await carService.readOne("4edd40c86762e0fb12000003");
        expect(cars).to.be.an('object');
      });
  
      it('retorna o carro correto pelo atributo "ID"', async () => {
        const cars = await carService.readOne("4edd40c86762e0fb12000003");
        expect(cars).to.be.equal(createCarMock);
      });
    });
  });

  describe('Método PUT /cars', async () => {
    let carService = new CarService();

    before(() => sinon.stub(carService,
      'update').resolves(updatedCarMock)
    );

    after(() => {
      sinon.restore()
    });

    it('retorna um objeto', async () => {
      const car = await carService.update("4edd40c86762e0fb12000003", updateCarMock)
      expect(car).to.be.an('object');
    });

    it('retorna o carro correto atualizado pelo atributo "ID"', async () => {
      const car = await carService.update("4edd40c86762e0fb12000003", updateCarMock)
      expect(car).to.be.equal(updatedCarMock);
    });
  });

  describe('Método DELETE /cars', async () => {
    let carService = new CarService();

    before(() => sinon.stub(carService,
      'delete').resolves(updatedCarMock)
    );

    after(() => {
      sinon.restore()
    });

    it('retorna a mensagem "Removido com sucesso!"', async () => {
      const result = await carService.delete('4edd40c86762e0fb12000003');
      expect(result).to.be.equal(updatedCarMock);
    });
  });
});
