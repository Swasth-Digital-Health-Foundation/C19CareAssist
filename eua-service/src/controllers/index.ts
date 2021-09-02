import ControllerInterface from './interface';
import OnUpdateController from './onUpdate.controller';
import SearchController from './search.controller';

const controllers: Array<ControllerInterface> = [
  SearchController,
  OnUpdateController
];

export default controllers;
