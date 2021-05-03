/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Authorized, Res, Req, BodyParam, QueryParam, Get,
} from 'routing-controllers';
import { ProductQuestionService } from '../../services/ProductQuestionService';
import { ProductAnswerService } from '../../services/ProductAnswerService';
import { ProductAnswerLikeService } from '../../services/ProductAnswerLikeDislikeService';
import { ProductAnswerLikeDislike } from '../../models/ProductAnswerLikeDislike';
import { VendorProductService } from '../../services/VendorProductService';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { CustomerService } from '../../services/CustomerService';
import { ProductService } from '../../services/ProductService';
import { SettingService } from '../../services/SettingService';
import { VendorService } from '../../services/VendorService';
import { UserService } from '../../services/UserService';
import { AnswerAbuseReasonService } from '../../services/AnswerAbuseReasonService';
import { AnswerReportAbuseService } from '../../services/AnswerReportAbuseService';
import { ProductQuestion } from '../../models/ProductQuestion';
import { ProductAnswer } from '../../models/ProductAnswer';
import { AnswerReportAbuse } from '../../models/AnswerReportAbuse';
import { CreateAnswer } from './requests/CreateAnswerRequest';
import { CreateQuestion } from './requests/CreateQuestionRequest';
import { AbuseReportRequest } from './requests/CreateReportAbuseRequest';
import { MAILService } from '../../../auth/mail.services';
import { env } from '../../../env';

@JsonController('/store-question-answer')
export class QuestionAndAnswerController {
    constructor(private productQuestionService: ProductQuestionService, private productAnswerService: ProductAnswerService, private customerService: CustomerService, private userService: UserService, private productAnswerLikeService: ProductAnswerLikeService, private settingsService: SettingService,
                private productService: ProductService, private vendorProductService: VendorProductService, private emailTemplateService: EmailTemplateService, private vendorService: VendorService, private answerAbuseReasonService: AnswerAbuseReasonService, private answerReportAbuseService: AnswerReportAbuseService) {
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
    @Post('/add-question')
    @Authorized('customer')
    public async createQuestion(@Body({ validate: true }) questionParam: CreateQuestion, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail = await this.productService.findOne({
            where: { productId: questionParam.productId },
        });
        if (!productDetail) {
            const errorResponse: any = {
                status: 1,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const question = new ProductQuestion();
        question.question = questionParam.question;
        question.productId = questionParam.productId;
        question.type = 2;
        question.referenceId = request.user.id;
        question.isActive = 0;
        const questionSaved = await this.productQuestionService.create(question);
        const logo = await this.settingsService.findOne();
        const val = await this.vendorProductService.findOne({ where: { productId: questionParam.productId } });
        const customer = await this.customerService.findOne({ where: { id: request.user.id } });
        const emailContent = await this.emailTemplateService.findOne(17);
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        for (const user of adminUser) {
            const value = user.username;
            adminId.push(value);
        }
        if (val !== undefined) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
            const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
            const vendorRedirectUrl = env.vendorRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', questionParam.question).replace('{title}', productDetail.name).replace('{username}', customer.email);
            MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
        } else {
            const adminRedirectUrl = env.adminRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', questionParam.question).replace('{title}', productDetail.name).replace('{username}', customer.email);
            MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
        }
        if (questionSaved !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Question Posted Successfully',
                data: questionSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/add-answer')
    @Authorized('customer')
    public async createAnswer(@Body({ validate: true }) answerParam: CreateAnswer, @Req() request: any, @Res() response: any): Promise<any> {
        const question = await this.productQuestionService.findOne({
            where: { questionId: answerParam.questionId },
        });
        if (!question) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid QuestionId',
            };
            return response.status(400).send(errorResponse);
        }
        const answer = new ProductAnswer();
        answer.answer = answerParam.answer;
        answer.questionId = +answerParam.questionId;
        answer.type = 2;
        answer.referenceId = request.user.id;
        answer.isActive = 0;
        const answerSaved = await this.productAnswerService.create(answer);
        const productDetail = await this.productService.findOne({
            where: { productId: question.productId },
        });
        const val = await this.vendorProductService.findOne({ where: { productId: question.productId } });
        const customer = await this.customerService.findOne({ where: { id: request.user.id } });
        const emailContent = await this.emailTemplateService.findOne(18);
        const logo = await this.settingsService.findOne();
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        for (const user of adminUser) {
            const value = user.username;
            adminId.push(value);
        }
        if (val !== undefined) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
            const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
            const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', question.question).replace('{answer}', answerParam.answer).replace('{title}', productDetail.name).replace('{username}', customer.email);
            const vendorRedirectUrl = env.vendorRedirectUrl;
            MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
        } else {
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', question.question).replace('{answer}', answerParam.answer).replace('{title}', productDetail.name).replace('{username}', customer.email);
            const adminRedirectUrl = env.adminRedirectUrl;
            MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
        }
        if (answerSaved !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Answer Posted Successfully',
                data: answerSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/update-like-status')
    @Authorized('customer')
    public async updateLikeStatus(@BodyParam('answerId') answerId: number, @BodyParam('type') type: number, @Req() request: any, @Res() response: any): Promise<any> {
        const answer = await this.productAnswerService.findOne({
            where: {
                answerId,
            },
        });
        if (!answer) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid  AnswerId',
            };
            return response.status(400).send(errorResponse);
        }
        if (type === 2) {
            const findExist = await this.productAnswerLikeService.findOne({
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
            const answerLike = await this.productAnswerLikeService.findOne({
                where: {
                    answerId, customerId: request.user.id, type: 1,
                },
            });
            if (answerLike) {
                await this.productAnswerLikeService.delete(answerLike.id);
            }
        } else if (type === 1) {
            const findExist = await this.productAnswerLikeService.findOne({
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
            const answerDislike = await this.productAnswerLikeService.findOne({
                where: {
                    answerId, customerId: request.user.id, type: 2,
                },
            });
            if (answerDislike) {
                await this.productAnswerLikeService.delete(answerDislike.id);
            }
        }
        const productAnswer: any = new ProductAnswerLikeDislike();
        productAnswer.answerId = answerId;
        productAnswer.questionId = answer.questionId;
        productAnswer.type = type;
        productAnswer.customerId = request.user.id;
        const questionSave = await this.productAnswerLikeService.create(productAnswer);
        const like = await this.productAnswerLikeService.findLikeCount(answerId);
        const disLike = await this.productAnswerLikeService.findDislikeCount(answerId);
        answer.likes = like.likeCount;
        answer.dislikes = disLike.dislikeCount;
        await this.productAnswerService.create(answer);
        if (questionSave) {
            const successResponse: any = {
                status: 1,
                message: 'Updated Your Question Status',
                data: questionSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update your question status',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/abuse-Reason-list')
    @Authorized('customer')
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'reason'];
        const abuseReasonList: any = await this.answerAbuseReasonService.list(limit, offset, select, 0, 0, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Abuse Reason list',
            data: abuseReasonList,
        };
        return response.status(200).send(successResponse);
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
    @Post('/add-report-abuse')
    @Authorized('customer')
    public async createAnswerAbuseReport(@Body({ validate: true }) abuseReport: AbuseReportRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const productAnswer = await this.productAnswerService.findOne({
            where: { answerId: abuseReport.answerId },
        });
        if (!productAnswer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid AnswerId',
            };
            return response.status(400).send(errorResponse);
        }
        const reason = await this.answerAbuseReasonService.findOne({
            where: { id: abuseReport.reasonId },
        });
        if (!reason) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ReasonId',
            };
            return response.status(400).send(errorResponse);
        }
        const report = new AnswerReportAbuse();
        report.questionId = productAnswer.questionId;
        report.reasonId = abuseReport.reasonId;
        report.answerId = abuseReport.answerId;
        report.remark = abuseReport.remark;
        report.isActive = 1;
        const abuseSaved = await this.answerReportAbuseService.create(report);
        const product = await this.productQuestionService.findOne({ where: { questionId: productAnswer.questionId } });
        const val = await this.vendorProductService.findOne({ where: { productId: product.productId } });
        const customer = await this.customerService.findOne({ where: { id: request.user.id } });
        const emailContent = await this.emailTemplateService.findOne(19);
        const logo = await this.settingsService.findOne();
        const productDetail = await this.productService.findOne({
            where: { productId: product.productId },
        });
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        for (const user of adminUser) {
            const value = user.username;
            adminId.push(value);
        }
        if (val !== undefined) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
            const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
            const message = emailContent.content.replace('{name}', 'Vendor').replace('{question}', product.question).replace('{title}', productDetail.name).replace('{username}', customer.email).replace('{answer}', productAnswer.answer).replace('{content}', reason.reason);
            const vendorRedirectUrl = env.vendorRedirectUrl;
            MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
        } else {
            const adminRedirectUrl = env.adminRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', product.question).replace('{title}', productDetail.name).replace('{username}', customer.email).replace('{answer}', productAnswer.answer).replace('{content}', reason.reason);
            MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
        }
        if (abuseSaved !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Your Report Posted Successfully',
                data: abuseSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to post',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
