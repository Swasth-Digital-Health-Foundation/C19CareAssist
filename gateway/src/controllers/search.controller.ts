import * as express from 'express';
import { Request, Response } from 'express';
import KafkaProducer from '../utils/kafka-producer';
import ControllerBase from '../interfaces/ControllerBase.interface';
import { isAuthenticated } from '../middleware/auth';
import Search from '../services/search';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

class SearchController implements ControllerBase {
  public path = '/api/v1/search';
  private topic = 'teststream';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/service`, this.search);
  }

  private search = async (req: Request, res: Response) => {
    try {
      new KafkaProducer().publish(this.topic ,JSON.stringify({ ...req.body, id: uuidv4() }));
      res.send('ok').status(200);
    } catch (e) {
      logger.error('Error in SearchController.search ', e);
      res.status(500).send({ code: 500, message: e.message });
    }
  }
}

export default SearchController;
