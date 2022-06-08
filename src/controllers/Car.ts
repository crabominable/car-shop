import { Request, Response } from 'express';

import Controller from './GenericController';
import CarService from '../services/Car';

import { Car } from '../interfaces/CarInterface';
import { TResponseError } from '../types';

class CarController extends Controller<Car> {
  private $route: string;

  private objectNotFound: string;

  constructor(
    carService = new CarService(),
    route = '/cars',
  ) {
    super(carService);
    this.$route = route;
    this.objectNotFound = 'Object not found';
  }

  get route() { return this.$route; }

  create = async (
    req: Request,
    res: Response<Car | TResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(this.statusCode.NotFound)
          .json(car);
      }
      return res.status(this.statusCode.Created)
        .json(car);
    } catch (err) {
      return res.status(this.statusCode.Internal)
        .json({ error: this.statusCode.Internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | TResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      return res.status(this.statusCode.Ok).json(cars);
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };

  readOne = async (
    req: Request,
    res: Response<Car | null | TResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (!car) {
        return res.status(this.statusCode.NotFound)
          .json({ error: this.objectNotFound });
      }
      return res.status(this.statusCode.Ok).json(car);
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };

  update = async (
    req: Request,
    res: Response<Car | null | TResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const updatedCar = await this.service.update(id, req.body);
      if (!updatedCar) {
        return res.status(this.statusCode.NotFound)
          .json({ error: this.objectNotFound });
      }
      return res.status(this.statusCode.Ok).json(updatedCar);
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };

  delete = async (
    req: Request,
    res: Response<TResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (!car) {
        return res.status(this.statusCode.NotFound)
          .json({ error: this.objectNotFound });
      }
      await this.service.delete(id);
      return res.status(this.statusCode.NoContent).json();
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };
}

export default CarController;