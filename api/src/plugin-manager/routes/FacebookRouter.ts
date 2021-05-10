import * as express from 'express';
import {FacebookController} from '../controller/FacebookController';

const facebookController = new FacebookController();

export const FacebookRoute: express.Router = express.Router()

.get('/', facebookController.index)

.post('/', facebookController.updateSettings);

export const FacebookNoAuthRoute: express.Router = express.Router()

.post('/', facebookController.login);
