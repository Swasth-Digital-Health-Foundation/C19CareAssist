import * as express from 'express';
import ControllerInterface from './interface';

class ConfirmController implements ControllerInterface {
  private readonly path: string = '/v1/search/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path);
  }
}

export default new ConfirmController;