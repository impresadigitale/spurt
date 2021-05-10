"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILService = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = tslib_1.__importDefault(require("nodemailer-smtp-transport"));
const env_1 = require("../env");
class MAILService {
    // for add customer API
    static customerLoginMail(logo, emailContent, email, Subject, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    //  customer register
    static registerMail(logo, emailContent, email, Subject, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // forgot password
    static passwordForgotMail(logo, emailContent, email, Subject, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // contact Us
    static contactMail(logo, emailContent, Subject, adminId, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        to: adminId,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // admin mail for check out
    static adminOrderMail(logo, emailContent, orderData, Subject, productDetailData, today, adminId, redirectUrl) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, orderData, productDetailData, today, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: orderData.email,
                        to: adminId,
                        subject: Subject + ' ' + orderData.orderPrefixId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // customer mail for check out
    static customerOrderMail(logo, emailContent, orderData, Subject, productDetailData, today, redirectUrl) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, orderData, productDetailData, today, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: orderData.email,
                        subject: Subject + ' ' + orderData.orderPrefixId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // for posting question API
    static questionAndAnswerMail(logo, emailContent, email, Subject, adminId, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: email,
                        cc: adminId,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    //  invoice mail
    static invoiceMail(logo, emailContent, pdfBinary, email, orderData, Subject, redirectUrl) {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            ejs_1.default.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const mailOptions = {
                        from: env_1.mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                        attachments: [
                            {
                                filename: 'Invoice-' + orderData.invoicePrefix + orderData.invoiceNo + '.pdf',
                                path: pdfBinary,
                            }
                        ],
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
}
exports.MAILService = MAILService;
//# sourceMappingURL=mail.services.js.map