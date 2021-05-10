import * as express from 'express';
import {HomeController} from '../controller/HomeController';

const homeController = new HomeController();

export const HomeRoute: express.Router = express.Router()

.get('/', homeController.home);
