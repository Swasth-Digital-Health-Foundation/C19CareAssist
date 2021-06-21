import { Router } from 'express';

interface ControllerInterface {
  initRoutes(): void;
  router: Router;
}

export default ControllerInterface;