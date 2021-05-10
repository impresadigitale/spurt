/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import * as express from 'express';
import passport from 'passport';
import '../config/passport';
import { User } from '../../api/models/User';
import { IVerifyOptions } from 'passport-local';

export class AuthController {
    constructor(
    ) {
        // ---
    }

    public async login(req: express.Request, res: express.Response): Promise<any> {
        res.render('pages/login', {
            title: 'Login',
            layout: 'pages/layouts/auth',
        });
    }

    public async postLogin(req: express.Request | any, res: express.Response, next: express.NextFunction): Promise<any> {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('login');
        }

        passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
            if (err) { return next(err); }
            if (!user) {

                req.flash('errors', info.message);
                return res.redirect('/login');
            }
            req.logIn(user, (error) => {
                if (error) { return next(error); }
                req.flash('success', { msg: 'Success! You are logged in.' });
                res.redirect(req.session.returnTo || 'home');
            });
        })(req, res, next);
    }

    public async logout(req: express.Request, res: express.Response): Promise<any> {
        req.logout();
        res.redirect('/');
    }

}
