import * as express from 'express';
import { isAuthenticated } from '../middleware/auth';
import logger from '../utils/logger';
import ControllerInterface from './interface';

class SearchController implements ControllerInterface {
  private readonly path: string = '/api/v1/search/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, isAuthenticated, this.search);
  }

  private search(request: express.Request, response: express.Response) {
    logger.debug('Hello world');
  }
}

export default new SearchController();
