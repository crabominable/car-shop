import { expect } from 'chai';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import sinon, { SinonStub } from 'sinon';

import CarModel, { carSchema } from '../../../models/Car';

import {
  createCarMock,
  carRequest
} from '../../mocks/createCarMock';

import {
  getAllCarMock,
} from '../../mocks/getAllCarMock';

import {
  updateCarMock,
  updatedCarMock,
} from '../../mocks/updateCarMock';

describe('Car model', () => {
  describe('Método POST /cars', () => {
    let carModel: CarModel;
    let mongoModel: Model<any>;

    before(() => {
      sinon.stub(mongoose, 'model').returns({
        create: sinon.stub().resolves(createCarMock),
      });

      mongoModel = mongoose.model('Car', carSchema);
      carModel = new CarModel(mongoModel);
    });

    after(() => {
      (mongoose.model as any).restore();
    });

    it('chama o mongoose com os dados do carro', async () => {
      await carModel.create(carRequest);
      expect((mongoModel.create as SinonStub).calledWith(carRequest)).to.be.true;
    });

    it('retorna o carro criado', async () => {
      const result = await carModel.create(carRequest);
      expect(result).to.be.equal(createCarMock);
    });
  });

  describe('Método GET /cars', () => {
    describe('Retorna todos os carros', () => {
      let carModel: CarModel;
      let mongoModel: Model<any>;

      before(() => {
        sinon.stub(mongoose, 'model').returns({
          find: sinon.stub().resolves(getAllCarMock),
        });

        mongoModel = mongoose.model('Car', carSchema);
        carModel = new CarModel(mongoModel);
      });

      after(() => {
        (mongoose.model as any).restore();
      });

      it('retorna um array', async () => {
        const result = await carModel.read();
        expect(result).to.be.an('array');
      });

      it('retorna todos os carros', async () => {
        const result = await carModel.read();
        expect(result).to.be.equal(getAllCarMock);
      });
    });

    describe('Retorna um carro', () => {
      let carModel: CarModel;
      let mongoModel: Model<any>;

      before(() => {
        sinon.stub(mongoose, 'model').returns({
          findById: sinon.stub().resolves(createCarMock),
        });

        mongoModel = mongoose.model('Car', carSchema);
        carModel = new CarModel(mongoModel);
      });

      after(() => {
        (mongoose.model as any).restore();
      });

      it('se retorna um objeto', async () => {
        const result = await carModel.readOne(createCarMock._id);
        expect(result).to.be.an('object');
      });

      it('retorna o carro correto pelo atributo "ID"', async () => {
        const result = await carModel.readOne('4edd40c86762e0fb12000003');
        expect(result).to.be.equal(createCarMock);
      });
    });
  });

  describe('Método PUT /cars', () => {
    let carModel: CarModel;
    let mongoModel: Model<any>;

    before(() => {
      sinon.stub(mongoose, 'model').returns({
        findOneAndUpdate: sinon.stub().resolves(updatedCarMock),
      });

      mongoModel = mongoose.model('Car', carSchema);
      carModel = new CarModel(mongoModel);
    });

    after(() => {
      (mongoose.model as any).restore();
    });

    it('se retorna um objeto', async () => {
      const result = await carModel.update('4edd40c86762e0fb12000003', updateCarMock);
      expect(result).to.be.an('object');
    });

    it('retorna o carro correto atualizado pelo atributo "ID"', async () => {
      const result = await carModel.update('4edd40c86762e0fb12000003', updateCarMock);
      expect(result).to.be.equal(updatedCarMock);
    });
  });

  describe('Método DELETE /cars', () => {
    let carModel: CarModel;
    let mongoModel: Model<any>;

    before(() => {
      sinon.stub(mongoose, 'model').returns({
        findOneAndDelete: sinon.stub().resolves('Removido com sucesso!'),
      });

      mongoModel = mongoose.model('Car', carSchema);
      carModel = new CarModel(mongoModel);
    });

    after(() => {
      (mongoose.model as any).restore();
    });

    it('retorna a mensagem "Removido com sucesso!"', async () => {
      const result = await carModel.delete('4edd40c86762e0fb12000003');
      expect(result).to.be.equal('Removido com sucesso!');
    });
  });
});
