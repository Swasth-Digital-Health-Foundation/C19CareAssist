import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../interfaces/ControllerBase.interface';
import { isAuthenticated } from '../middleware/auth';
import { doctorConfirmation } from '../middleware/doctorConfirmation';
import Search from '../services/search';
import logger from '../utils/logger';

class SearchController implements ControllerBase {
  public path = '/api/v1/search';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/service`, isAuthenticated, this.search, doctorConfirmation);
  }

  private search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: any = await new Search().getResults(req.body);
      res.locals.doctorSearchUrl = 'https://stagapi.1mgdoctors.com/api/v1/bhs'
        || data.services[0].provider.api.url; // TODO change this after applying validation!
      next();
    } catch (e) {
      logger.error('Error in SearchController.search ', e);
      res.status(500).send({ code: 500, message: e.message });
    }
  }
}

export default SearchController;
