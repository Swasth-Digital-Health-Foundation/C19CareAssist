import * as express from 'express';
import ControllerInterface from './interface';

class SearchController implements ControllerInterface {
  private readonly path: string = '/v1/search/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, this.search);
  }
  search(request: express.Request, response: express.Response, next: express.NextFunction) {
    response.json('all good');
    next();
  }
}

export default new SearchController;