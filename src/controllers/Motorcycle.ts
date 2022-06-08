import {
  Request,
  Response,
} from 'express';
  
import Controller from './GenericController';
import MotorcycleService from '../services/Motorcycle';
  
import {
  Motorcycle,
} from '../interfaces/MotorcycleInterface';
  
import {
  TResponseError,
} from '../types';
  
import ErrorCatcher from '../helpers/ErrorCatcher';
  
class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;
  
  private objectNotFound: string;
  
  constructor(
    motorcycleService = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(motorcycleService);
    this.$route = route;
    this.objectNotFound = 'Object not found';
  }
  
  get route() { return this.$route; }
  
  create = async (
    req: Request,
    res: Response<Motorcycle | string | TResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(this.statusCode.NotFound).json(this.objectNotFound);
      }
      if (motorcycle instanceof ErrorCatcher) {
        return res.status(motorcycle._httpStatusCode)
          .json({ error: motorcycle.message });
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(this.statusCode.Internal)
        .json({ error: this.statusCode.Internal });
    }
  };
  
  read = async (
    _req: Request,
    res: Response<Motorcycle[] | TResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.service.read();
      return res.status(this.statusCode.Ok).json(motorcycles);
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };
  
  readOne = async (
    req: Request,
    res: Response<Motorcycle | null | TResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.readOne(id);
      if (!motorcycle) {
        return res.status(this.statusCode.NotFound)
          .json({ error: this.objectNotFound });
      }
      return res.status(this.statusCode.Ok).json(motorcycle);
    } catch (err) {
      return res.status(this.statusCode.Internal).json({ error: err });
    }
  };
  
  update = async (
    req: Request,
    res: Response<Motorcycle | null | TResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const updatedMotorcycle = await this.service.update(id, req.body);
      if (!updatedMotorcycle) {
        return res.status(this.statusCode.NotFound)
          .json({ error: this.objectNotFound });
      }
      return res.status(this.statusCode.Ok).json(updatedMotorcycle);
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
      const motorcycle = await this.service.readOne(id);
      if (!motorcycle) {
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
  
export default MotorcycleController;