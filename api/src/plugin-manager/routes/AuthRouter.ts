import * as express from 'express';
import {AuthController} from '../controller/AuthController';

const authController = new AuthController();

export const AuthRoute: express.Router = express.Router()

.get('/', authController.login)

.get('/login', authController.login)

.post('/login', authController.postLogin)

.get('/logout', authController.logout);
