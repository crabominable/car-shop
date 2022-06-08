import { Request, Response } from 'express';

import Service from '../services/GenericService';
import StatusCode from '../utils/StatusCode';

import { TResponseError } from '../types';

abstract class Controller<T> {
  abstract route: string;

  protected statusCode = StatusCode;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: Request,
    res: Response<T | TResponseError>,
  ): Promise<typeof res>;

  abstract read(
    req: Request,
    res: Response<T[] | TResponseError>
  ): Promise<typeof res>;

  abstract readOne(
    req: Request,
    res: Response<T | TResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: Request,
    res: Response<T | TResponseError>
  ): Promise<typeof res>;

  abstract delete(
    req: Request,
    res: Response<TResponseError>
  ): Promise<typeof res>;
}

export default Controller;