import ConfirmController from './confirm.controller';
import ControllerInterface from './interface';
import SearchController from './search.controller';

const controllers: Array<ControllerInterface> = [
  SearchController,
  ConfirmController
];

export default controllers;