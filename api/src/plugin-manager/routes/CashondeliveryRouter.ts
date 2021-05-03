import * as express from 'express';
import {CashondeliveryController} from '../controller/CashondeliveryController';

const cashondeliveryController = new CashondeliveryController();

export const cashOnDeliveryRoute: express.Router = express.Router()

.get('/', cashondeliveryController.cashondelivery);
