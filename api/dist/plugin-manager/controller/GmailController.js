"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
const Customer_1 = require("../../api/models/Customer");
const LoginLog_1 = require("../../api/models/LoginLog");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const class_transformer_1 = require("class-transformer");
const mail_services_1 = require("../../auth/mail.services");
const EmailTemplate_1 = require("../../api/models/EmailTemplate");
const env_1 = require("../../env");
const Setting_1 = require("../../api/models/Setting");
class GmailController {
    constructor() {
        // ---
    }
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'gmail',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const gmailAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            res.render('pages/gmail/form', {
                title: 'Gmail',
                path: '../gmail/form',
                clientId: gmailAdditionalInfo.clientId ? gmailAdditionalInfo.clientId : '',
                isTest: gmailAdditionalInfo.isTest,
            });
        });
    }
    updateSettings(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.assert('clientId', 'Client Id cannot be blank').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                req.flash('errors', errors);
                return res.redirect('gmail');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'gmail',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const gmailAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            gmailAdditionalInfo.clientId = req.body.clientId;
            gmailAdditionalInfo.clientSecret = req.body.clientSecret;
            gmailAdditionalInfo.isTest = req.body.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(gmailAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                req.flash('success', ['Gmail settings updated successfully']);
                return res.redirect('home');
            }
            req.flash('errors', ['Unable to update the Gmail settings']);
            return res.redirect('home');
        });
    }
    login(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const CustomerRepository = typeorm_1.getManager().getRepository(Customer_1.Customer);
            const EmailTemplateRepository = typeorm_1.getManager().getRepository(EmailTemplate_1.EmailTemplate);
            const LoginLogRepository = typeorm_1.getManager().getRepository(LoginLog_1.LoginLog);
            const settingRepository = typeorm_1.getManager().getRepository(Setting_1.Settings);
            const resultData = yield CustomerRepository.findOne({
                where: { email: req.body.emailId, deleteFlag: 0 },
            });
            if (!resultData) {
                const newUser = new Customer_1.Customer();
                const randomize = require('randomatic');
                const tempPassword = randomize('0', 5).toString();
                // const tempPassword: any = Math.random().toString().substr(2, 5);
                newUser.password = yield Customer_1.Customer.hashPassword(tempPassword);
                newUser.email = req.body.emailId;
                newUser.username = req.body.emailId;
                newUser.oauthData = req.body.oauthData;
                newUser.isActive = 1;
                newUser.ip = (req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress).split(',')[0];
                const newCustomer = yield CustomerRepository.save(newUser);
                const loginLog = new LoginLog_1.LoginLog();
                loginLog.customerId = newCustomer.id;
                loginLog.emailId = newCustomer.email;
                loginLog.ipAddress = (req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = yield LoginLogRepository.save(loginLog);
                const customer = yield CustomerRepository.findOne({ where: { email: newCustomer.email, deleteFlag: 0 } });
                customer.lastLogin = savedloginLog.createdDate;
                yield CustomerRepository.save(customer);
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: newCustomer.id }, '123##$$)(***&', {
                    expiresIn: 86400,
                });
                const emailContent = yield EmailTemplateRepository.findOne({ where: { emailTemplateId: 9 } });
                const message = emailContent.content.replace('{name}', newCustomer.username).replace('{xxxxxx}', tempPassword);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield settingRepository.findOne();
                mail_services_1.MAILService.registerMail(logo, message, newCustomer.email, emailContent.subject, redirectUrl);
                if (newCustomer) {
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully. ',
                        data: {
                            token,
                            user: newCustomer,
                        },
                    };
                    return res.status(200).send(successResponse);
                }
            }
            else {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: resultData.id }, '123##$$)(***&', {
                    expiresIn: 86400,
                });
                const loginLog = new LoginLog_1.LoginLog();
                loginLog.customerId = resultData.id;
                loginLog.emailId = resultData.email;
                loginLog.firstName = resultData.firstName;
                loginLog.ipAddress = (req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = yield LoginLogRepository.save(loginLog);
                const customer = yield CustomerRepository.findOne({ where: { email: resultData.email, deleteFlag: 0 } });
                customer.lastLogin = savedloginLog.createdDate;
                yield CustomerRepository.save(customer);
                const successResponse = {
                    status: 1,
                    message: 'Loggedin successfully.',
                    data: {
                        token,
                        user: class_transformer_1.classToPlain(resultData),
                    },
                };
                return res.status(200).send(successResponse);
            }
        });
    }
}
exports.GmailController = GmailController;
//# sourceMappingURL=GmailController.js.map