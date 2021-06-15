import * as express from 'express';
import logger from '../utils/logger';
import ControllerInterface from './interface';

class SearchController implements ControllerInterface {
  private readonly path: string = '/api/v1/search/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, this.search);
  }

  private search(request: express.Request, response: express.Response) {

  }
}

export default new SearchController();