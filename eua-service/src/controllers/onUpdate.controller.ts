import ControllerInterface from './interface';
import * as express from 'express';

class OnUpdate implements ControllerInterface {
  initRoutes(): void {
    throw new Error('Method not implemented.');
  }

  public router: express.Router = express.Router();

}

export default new OnUpdate();