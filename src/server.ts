import CustomRouter from './routes/Router';
import App from './app';

import CarController from './controllers/Car';
import MotorcycleController from './controllers/Motorcycle';

import CarMiddleware from './middlewares/CarMiddlewares';
import MotorcycleMiddleware from './middlewares/MotorcycleMiddlewares';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carMiddleware = new CarMiddleware();
const motorcycleMiddleware = new MotorcycleMiddleware();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController, carMiddleware);

const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController, motorcycleMiddleware);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;