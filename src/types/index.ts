import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

export type TResponseError = {
  error: unknown;
};

export type TBodyValidation = {
  message: unknown;
};

export type TIndexable = {
  id: string,
};

export type TValidateId = (
  req: Request,
  res: Response<TResponseError>,
  next: NextFunction
) => Response | void;

export type TValidateBody = (
  req: Request,
  res: Response<TBodyValidation | TResponseError>,
  next: NextFunction
) => Response | void;

export type TBodyValidate = (body: unknown) => {
  error: ValidationError | undefined;
  value: unknown;
};