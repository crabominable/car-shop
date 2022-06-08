import {
  Request,
  Response,
  NextFunction,
} from 'express';
  
import {
  TBodyValidation,
  TResponseError,
} from '../types';
  
import StatusCode from '../utils/StatusCode';
  
import motorcycleValidate from '../validations/validateMotorcycleBody';

class MotorcycleMiddleware {
  private _httpStatusCode = StatusCode;
  
  validateId = (
    req: Request,
    res: Response<TResponseError>,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    if (id.length !== 24) {
      return res
        .status(this._httpStatusCode.BadRequest)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }
  
    next();
  };
  
  validateBody = (
    req: Request,
    res: Response<TBodyValidation | TResponseError>,
    next: NextFunction,
  ) => {
    const { body } = req;
    try {
      const { error, value } = motorcycleValidate(body);
      if (error) {
        const [message] = error.message;
        return res.status(this._httpStatusCode.BadRequest).json({ message });
      }
      req.body = value;
  
      next();
    } catch (err) {
      return res.status(this._httpStatusCode.Internal)
        .json({ error: err });
    }
  };
}
  
export default MotorcycleMiddleware;