"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAndAnswerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const ProductAnswerService_1 = require("../../services/ProductAnswerService");
const ProductAnswerLikeDislikeService_1 = require("../../services/ProductAnswerLikeDislikeService");
const ProductAnswerLikeDislike_1 = require("../../models/ProductAnswerLikeDislike");
const VendorProductService_1 = require("../../services/VendorProductService");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const CustomerService_1 = require("../../services/CustomerService");
const ProductService_1 = require("../../services/ProductService");
const SettingService_1 = require("../../services/SettingService");
const VendorService_1 = require("../../services/VendorService");
const UserService_1 = require("../../services/UserService");
const AnswerAbuseReasonService_1 = require("../../services/AnswerAbuseReasonService");
const AnswerReportAbuseService_1 = require("../../services/AnswerReportAbuseService");
const ProductQuestion_1 = require("../../models/ProductQuestion");
const ProductAnswer_1 = require("../../models/ProductAnswer");
const AnswerReportAbuse_1 = require("../../models/AnswerReportAbuse");
const CreateAnswerRequest_1 = require("./requests/CreateAnswerRequest");
const CreateQuestionRequest_1 = require("./requests/CreateQuestionRequest");
const CreateReportAbuseRequest_1 = require("./requests/CreateReportAbuseRequest");
const mail_services_1 = require("../../../auth/mail.services");
const env_1 = require("../../../env");
let QuestionAndAnswerController = class QuestionAndAnswerController {
    constructor(productQuestionService, productAnswerService, customerService, userService, productAnswerLikeService, settingsService, productService, vendorProductService, emailTemplateService, vendorService, answerAbuseReasonService, answerReportAbuseService) {
        this.productQuestionService = productQuestionService;
        this.productAnswerService = productAnswerService;
        this.customerService = customerService;
        this.userService = userService;
        this.productAnswerLikeService = productAnswerLikeService;
        this.settingsService = settingsService;
        this.productService = productService;
        this.vendorProductService = vendorProductService;
        this.emailTemplateService = emailTemplateService;
        this.vendorService = vendorService;
        this.answerAbuseReasonService = answerAbuseReasonService;
        this.answerReportAbuseService = answerReportAbuseService;
    }
    // Create Question API
    /**
     * @api {post} /api/store-question-answer/add-question Add Question API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} question
     * @apiParam (Request body) {Number} productId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Question created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-question
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    createQuestion(questionParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId: questionParam.productId },
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const question = new ProductQuestion_1.ProductQuestion();
            question.question = questionParam.question;
            question.productId = questionParam.productId;
            question.type = 2;
            question.referenceId = request.user.id;
            question.isActive = 0;
            const questionSaved = yield this.productQuestionService.create(question);
            const logo = yield this.settingsService.findOne();
            const val = yield this.vendorProductService.findOne({ where: { productId: questionParam.productId } });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(17);
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            if (val !== undefined) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', questionParam.question).replace('{title}', productDetail.name).replace('{username}', customer.email);
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
            }
            else {
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', questionParam.question).replace('{title}', productDetail.name).replace('{username}', customer.email);
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
            }
            if (questionSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Question Posted Successfully',
                    data: questionSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Create Answer API
    /**
     * @api {post} /api/store-question-answer/add-answer Add Answer API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} answer
     * @apiParam (Request body) {Number} questionId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Answer created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-answer
     * @apiErrorExample {json} Answer error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswer(answerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: { questionId: answerParam.questionId },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            const answer = new ProductAnswer_1.ProductAnswer();
            answer.answer = answerParam.answer;
            answer.questionId = +answerParam.questionId;
            answer.type = 2;
            answer.referenceId = request.user.id;
            answer.isActive = 0;
            const answerSaved = yield this.productAnswerService.create(answer);
            const productDetail = yield this.productService.findOne({
                where: { productId: question.productId },
            });
            const val = yield this.vendorProductService.findOne({ where: { productId: question.productId } });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(18);
            const logo = yield this.settingsService.findOne();
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            if (val !== undefined) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', question.question).replace('{answer}', answerParam.answer).replace('{title}', productDetail.name).replace('{username}', customer.email);
                const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
            }
            else {
                const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', question.question).replace('{answer}', answerParam.answer).replace('{title}', productDetail.name).replace('{username}', customer.email);
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
            }
            if (answerSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Answer Posted Successfully',
                    data: answerSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer Like and DisLike API
    /**
     * @api {post} /api/store-question-answer/update-like-status Update Answer Like and DisLike API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} answerId answerId
     * @apiParam (Request body) {Number} type  1-> like 2-> dislike
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/update-like-status
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    updateLikeStatus(answerId, type, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!answer) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid  AnswerId',
                };
                return response.status(400).send(errorResponse);
            }
            if (type === 2) {
                const findExist = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 2,
                    },
                });
                if (findExist) {
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully updated',
                    });
                }
                const answerLike = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 1,
                    },
                });
                if (answerLike) {
                    yield this.productAnswerLikeService.delete(answerLike.id);
                }
            }
            else if (type === 1) {
                const findExist = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 1,
                    },
                });
                if (findExist) {
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully updated',
                    });
                }
                const answerDislike = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 2,
                    },
                });
                if (answerDislike) {
                    yield this.productAnswerLikeService.delete(answerDislike.id);
                }
            }
            const productAnswer = new ProductAnswerLikeDislike_1.ProductAnswerLikeDislike();
            productAnswer.answerId = answerId;
            productAnswer.questionId = answer.questionId;
            productAnswer.type = type;
            productAnswer.customerId = request.user.id;
            const questionSave = yield this.productAnswerLikeService.create(productAnswer);
            const like = yield this.productAnswerLikeService.findLikeCount(answerId);
            const disLike = yield this.productAnswerLikeService.findDislikeCount(answerId);
            answer.likes = like.likeCount;
            answer.dislikes = disLike.dislikeCount;
            yield this.productAnswerService.create(answer);
            if (questionSave) {
                const successResponse = {
                    status: 1,
                    message: 'Updated Your Question Status',
                    data: questionSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update your question status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer Abuse Reason List
    /**
     * @api {get} /api/store-question-answer/abuse-reason-list Answer Abuse Reason List
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/abuse-reason-list
     * @apiErrorExample {json} Abuse reason List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Abuse Reason list Function
    reasonList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'reason'];
            const abuseReasonList = yield this.answerAbuseReasonService.list(limit, offset, select, 0, 0, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got Abuse Reason list',
                data: abuseReasonList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Answer Abuse Report API
    /**
     * @api {post} /api/store-question-answer/add-report-abuse Add Report Abuse API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} remark
     * @apiParam (Request body) {Number} answerId
     * @apiParam (Request body) {Number} reasonId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "remark" : "",
     *      "answerId" : "",
     *      "reasonId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully posted your report",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-report-abuse
     * @apiErrorExample {json} Report Abuse error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswerAbuseReport(abuseReport, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productAnswer = yield this.productAnswerService.findOne({
                where: { answerId: abuseReport.answerId },
            });
            if (!productAnswer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid AnswerId',
                };
                return response.status(400).send(errorResponse);
            }
            const reason = yield this.answerAbuseReasonService.findOne({
                where: { id: abuseReport.reasonId },
            });
            if (!reason) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ReasonId',
                };
                return response.status(400).send(errorResponse);
            }
            const report = new AnswerReportAbuse_1.AnswerReportAbuse();
            report.questionId = productAnswer.questionId;
            report.reasonId = abuseReport.reasonId;
            report.answerId = abuseReport.answerId;
            report.remark = abuseReport.remark;
            report.isActive = 1;
            const abuseSaved = yield this.answerReportAbuseService.create(report);
            const product = yield this.productQuestionService.findOne({ where: { questionId: productAnswer.questionId } });
            const val = yield this.vendorProductService.findOne({ where: { productId: product.productId } });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(19);
            const logo = yield this.settingsService.findOne();
            const productDetail = yield this.productService.findOne({
                where: { productId: product.productId },
            });
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            if (val !== undefined) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', product.question).replace('{title}', productDetail.name).replace('{username}', customer.email).replace('{answer}', productAnswer.answer).replace('{content}', reason.reason);
                const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
            }
            else {
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', product.question).replace('{title}', productDetail.name).replace('{username}', customer.email).replace('{answer}', productAnswer.answer).replace('{content}', reason.reason);
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
            }
            if (abuseSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Your Report Posted Successfully',
                    data: abuseSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to post',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-question'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuestionRequest_1.CreateQuestion, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createQuestion", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-answer'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAnswerRequest_1.CreateAnswer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createAnswer", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/update-like-status'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('answerId')), tslib_1.__param(1, routing_controllers_1.BodyParam('type')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "updateLikeStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/abuse-Reason-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "reasonList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-report-abuse'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateReportAbuseRequest_1.AbuseReportRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createAnswerAbuseReport", null);
QuestionAndAnswerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/store-question-answer'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService, ProductAnswerService_1.ProductAnswerService, CustomerService_1.CustomerService, UserService_1.UserService, ProductAnswerLikeDislikeService_1.ProductAnswerLikeService, SettingService_1.SettingService,
        ProductService_1.ProductService, VendorProductService_1.VendorProductService, EmailTemplateService_1.EmailTemplateService, VendorService_1.VendorService, AnswerAbuseReasonService_1.AnswerAbuseReasonService, AnswerReportAbuseService_1.AnswerReportAbuseService])
], QuestionAndAnswerController);
exports.QuestionAndAnswerController = QuestionAndAnswerController;
//# sourceMappingURL=QuestionAndAnswerController.js.map