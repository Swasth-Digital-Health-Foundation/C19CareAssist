import * as express from 'express';
import logger from '../utils/logger';
import ControllerInterface from './interface';

class SearchController implements ControllerInterface {
  public readonly path: string = '/api/v1/search';
  public router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, this.search);
  }

  private search() {
    logger.info('hello world!');
  }
}

export default new SearchController();