import * as express from 'express';
import {PaypalController} from '../controller/PaypalController';

const paypalController = new PaypalController();

export const PaypalRoute: express.Router = express.Router()

.get('/', paypalController.index)

.post('/', paypalController.updateSettings);

export const PaypalNoAuthRoute: express.Router = express.Router()

.get('/process/:orderPrefixId', paypalController.process)

.get('/proceed/:orderId', paypalController.proceed)

.get('/success', paypalController.success)

.get('/cancel', paypalController.cancel);
