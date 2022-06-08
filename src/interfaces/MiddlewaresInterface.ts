import {
  TValidateId,
  TValidateBody,
} from '../types';
  
export default interface Middlewares {
  validateId: TValidateId,
  validateBody: TValidateBody
}