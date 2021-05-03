/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import * as express from 'express';
import {getManager} from 'typeorm';
import {Plugins} from '../models/Plugin';
import {Customer} from '../../api/models/Customer';
import {LoginLog} from '../../api/models/LoginLog';
import jwt from 'jsonwebtoken';
import {MAILService} from '../../auth/mail.services';
import {EmailTemplate} from '../../api/models/EmailTemplate';
import {env} from '../../env';
import { Settings } from '../../api/models/Setting';
export class FacebookController {
    constructor() {
        // ---
    }

    public async index(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'facebook',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const facebookAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        res.render('pages/facebook/form', {
            title: 'facebook',
            path: '../facebook/form',
            clientId: facebookAdditionalInfo.AppId ? facebookAdditionalInfo.AppId : '',
            clientSecret: facebookAdditionalInfo.AppSecretKey ? facebookAdditionalInfo.AppSecretKey : '',
            isTest: facebookAdditionalInfo.isTest,
        });
    }

    public async updateSettings(req: express.Request | any, res: express.Response): Promise<any> {
        req.assert('clientId', 'Client Id cannot be blank').notEmpty();
        req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();
        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('facebook');
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'facebook',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const facebookAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        facebookAdditionalInfo.AppId = req.body.clientId;
        facebookAdditionalInfo.AppSecretKey = req.body.clientSecret;
        facebookAdditionalInfo.isTest = req.body.isTest;
        pluginDetail.pluginAdditionalInfo = JSON.stringify(facebookAdditionalInfo);
        const saveResponse = await pluginRepository.save(pluginDetail);
        if (saveResponse) {
            req.flash('success', ['facebook settings updated successfully']);
            return res.redirect('home');
        }
        req.flash('errors', ['Unable to update the facebook settings']);
        return res.redirect('home');
    }

    public async login(req: express.Request | any, res: express.Response): Promise<any> {
        const CustomerRepository = getManager().getRepository(Customer);
        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const LoginLogRepository = getManager().getRepository(LoginLog);
        const SettingRepository = getManager().getRepository(Settings);
        const resultData = await CustomerRepository.findOne({
            where: {email: req.body.emailId, deleteFlag: 0},
        });
        if (!resultData) {
            const newUser = new Customer();
            const randomize = require('randomatic');
            const tempPassword: any = randomize('0', 5).toString();
            newUser.password = await Customer.hashPassword(tempPassword);
            newUser.email = req.body.emailId;
            newUser.username = req.body.emailId;
            newUser.oauthData = req.body.oauthData;
            newUser.isActive = 1;
            newUser.ip = (req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress).split(',')[0];
            const newCustomer = await CustomerRepository.save(newUser);

            const loginLog = new LoginLog();
            loginLog.customerId = newCustomer.id;
            loginLog.emailId = newCustomer.email;
            loginLog.ipAddress = (req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress).split(',')[0];
            const savedloginLog = await LoginLogRepository.save(loginLog);
            const customer = await CustomerRepository.findOne({where: {email: newCustomer.email, deleteFlag: 0}});
            customer.lastLogin = savedloginLog.createdDate;
            await CustomerRepository.save(customer);
            // create a token
            const token = jwt.sign({id: newCustomer.id}, '123##$$)(***&', {
                expiresIn: 86400, // expires in 24 hours
            });
            const emailContent = await EmailTemplateRepository.findOne({where : {emailTemplateId: 9}});
            const message = emailContent.content.replace('{name}', newCustomer.username).replace('{xxxxxx}', tempPassword);
            const redirectUrl = env.storeRedirectUrl;
            const logo = await SettingRepository.findOne();
            MAILService.registerMail(logo, message, newCustomer.email, emailContent.subject, redirectUrl);
            if (newCustomer) {
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successfully. ',
                    data: {
                        token,
                        user: newCustomer,
                       },
                };
                return res.status(200).send(successResponse);
            }
        } else {
            // create a token
            const token = jwt.sign({id: resultData.id}, '123##$$)(***&', {
                expiresIn: 86400, // expires in 24 hours
            });
            const loginLog = new LoginLog();
            loginLog.customerId = resultData.id;
            loginLog.emailId = resultData.email;
            loginLog.firstName = resultData.firstName;
            loginLog.ipAddress = (req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress).split(',')[0];
            const savedloginLog = await LoginLogRepository.save(loginLog);
            const customer = await CustomerRepository.findOne({where: {email: resultData.email, deleteFlag: 0}});
            customer.lastLogin = savedloginLog.createdDate;
            await CustomerRepository.save(customer);
            const successResponse: any = {
                status: 1,
                message: 'Loggedin successfully.',
                data: {
                    token,
                    user: resultData,
                },
            };
            return res.status(200).send(successResponse);
        }
    }
}
