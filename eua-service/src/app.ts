import * as express from 'express';
import { Application } from 'express';
import controllers from './controllers';
import ControllerInterface from './controllers/interface';
import middleware from './middleware';
import logger from './utils/logger';
import { PORT, NODE_ENV } from './utils/secrets';

class App {
  public readonly app: Application;
  private readonly port: number;
  private server: any;

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

  public start = async () => {
    this.server = this.app.listen(this.port, () => {
      logger.info(`App is listening on the http://localhost:${this.port}`);
    });

    return 'Server is ready';
  };

  public stop() {
    this.server.close();
  }
}

export default new App();