import ControllerInterface from './interface';
import * as express from 'express';
import logger from '../utils/logger';

class OnUpdate implements ControllerInterface {
  private readonly path: string = '/api/v1/on_update/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, this.onUpdate);
  }

  private onUpdate = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    logger.info(JSON.stringify(request.body));
    response.send('OK').status(200);
    return next();
  };
}

export default new OnUpdate();