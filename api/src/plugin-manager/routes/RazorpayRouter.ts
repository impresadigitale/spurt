import * as express from 'express';
import {RazorPayController} from '../controller/RazorpayController';

const razorPayController = new RazorPayController();

export const RazorpayRoute: express.Router = express.Router()

.get('/', razorPayController.index)

.post('/', razorPayController.updateSettings);

export const RazorpayNoAuthRoute: express.Router = express.Router()

.get('/process/:orderPrefixId', razorPayController.process)

.get('/proceed/:orderId', razorPayController.proceed)

.get('/success', razorPayController.success)

.get('/cancel/:orderId', razorPayController.cancel)

.get('/process-api/:orderPrefixId', razorPayController.processAPI)

.get('/success-api', razorPayController.successAPI);
