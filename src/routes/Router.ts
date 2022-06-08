import { Router } from 'express';

import Controller from '../controllers/GenericController';
import IMiddlewares from '../interfaces/MiddlewaresInterface';

class CustomRouter<T> {
  router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    middleware: IMiddlewares,
    route: string = controller.route,
  ) {
    this.router.post(route, middleware.validateBody, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, middleware.validateId, controller.readOne);
    this.router.put(
      `${route}/:id`,
      middleware.validateId,
      middleware.validateBody,
      controller.update,
    );
    this.router.delete(
      `${route}/:id`,
      middleware.validateId,
      controller.delete,
    );
  }
}

export default CustomRouter;