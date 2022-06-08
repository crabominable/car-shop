import {
  Motorcycle,
} from '../interfaces/MotorcycleInterface';
  
import Service from './GenericService';
import MotorcycleModel from '../models/Motorcycle';
  
class MotorcycleService extends Service<Motorcycle> {
  constructor(
    model = new MotorcycleModel(),
  ) {
    super(model);
  }
}
  
export default MotorcycleService;
