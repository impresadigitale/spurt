import * as express from 'express';
import {GmailController} from '../controller/GmailController';

const gmailController = new GmailController();

export const GmailRoute: express.Router = express.Router()

.get('/', gmailController.index)

.post('/', gmailController.updateSettings);

export const GmailNoAuthRoute: express.Router = express.Router()

.post('/', gmailController.login);
