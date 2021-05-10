import * as express from 'express';
import {StripeController} from '../controller/StripeController';

const stripeController = new StripeController();

export const StripeRoute: express.Router = express.Router()

.get('/', stripeController.index)

.post('/', stripeController.updateSettings);

export const StripeNoAuthRoute: express.Router = express.Router()

.get('/process/:orderPrefixId', stripeController.process)

.get('/success', stripeController.success)

.get('/cancel', stripeController.cancel);
