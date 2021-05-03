/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { mail } from '../env';
export class MAILService {
    // for add customer API
    public static customerLoginMail(logo: any, emailContent: any, email: any, Subject: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    //  customer register
    public static registerMail(logo: any, emailContent: any, email: any, Subject: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // forgot password
    public static passwordForgotMail(logo: any, emailContent: any, email: any, Subject: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // contact Us
    public static contactMail(logo: any, emailContent: string, Subject: any, adminId: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        to: adminId,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // admin mail for check out
    public static adminOrderMail(logo: any, emailContent: any, orderData: any, Subject: any, productDetailData: any, today: any, adminId: any, redirectUrl: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, orderData, productDetailData, today, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: orderData.email,
                        to: adminId,
                        subject: Subject + ' ' + orderData.orderPrefixId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // customer mail for check out
    public static customerOrderMail(logo: any, emailContent: any, orderData: any, Subject: any, productDetailData: any, today: any, redirectUrl: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, orderData, productDetailData, today, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: orderData.email,
                        subject: Subject + ' ' + orderData.orderPrefixId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }

    // for posting question API
    public static questionAndAnswerMail(logo: any, emailContent: any, email: any, Subject: any, adminId: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', { logo, emailContent, productDetailData, redirectUrl }, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        cc: adminId,
                        subject: Subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    //  invoice mail
    public static invoiceMail(logo: any, emailContent: any, pdfBinary: any, email: any, orderData: any, Subject: any, redirectUrl: any): Promise<any> {
        const productDetailData = undefined;
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', {logo, emailContent , productDetailData, redirectUrl}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        subject: Subject,
                        html: data,
                        attachments: [
                            {   // utf-8 string as an attachment
                              filename: 'Invoice-' + orderData.invoicePrefix + orderData.invoiceNo + '.pdf',
                              path: pdfBinary,
                            }],
                        };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
}
