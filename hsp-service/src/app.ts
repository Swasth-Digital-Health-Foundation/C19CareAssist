import * as express from 'express';
import { Application } from 'express';
import ControllerInterface from './controllers/interface';
import controllers from './controllers';
import middleware from './middleware';
import logger from './utils/logger';
import { PORT, NODE_ENV } from './utils/secrets';

class App {
  readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = +PORT;
    if (NODE_ENV !== 'test') this.start();
    this.middleware(middleware);
    this.routes(controllers);
  }

  private middleware = (middlewares: Array<any>) => {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  };

  private routes = (controllers: Array<ControllerInterface>) => {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  };

  private start = async () => {
    this.app.listen(this.port, () => {
      logger.info(`App is listening on the http://localhost:${this.port}`);
    });

    return 'Server is ready';
  };
}

export default new App();