import {
  Car,
} from '../interfaces/CarInterface';
  
import ServiceGeneric from './GenericService';
import CarModel from '../models/Car';
  
class CarService extends ServiceGeneric<Car> {
  constructor(
    model = new CarModel(),
  ) {
    super(model);
  }
}
  
export default CarService;
