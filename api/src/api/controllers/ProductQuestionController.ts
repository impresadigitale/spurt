/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Put, Param, Delete, Req, Get, QueryParam, BodyParam
} from 'routing-controllers';
import { CreateQuestion } from './requests/CreateQuestionRequest';
import { ProductQuestionService } from '../services/ProductQuestionService';
import { ProductService } from '../services/ProductService';
import { ProductAnswerService } from '../services/ProductAnswerService';
import { CustomerService } from '../services/CustomerService';
import { UserService } from '../services/UserService';
import { ProductQuestion } from '../models/ProductQuestion';
import { ProductAnswer } from '../models/ProductAnswer';

@JsonController('/admin-product-question')
export class ProductQuestionController {

    constructor(
        private productQuestionService: ProductQuestionService,
        private customerService: CustomerService,
        private userService: UserService,
        private productAnswerService: ProductAnswerService,
        private productService: ProductService) {
    }

    // Create Question API
    /**
     * @api {post} /api/admin-product-question/add-question Add Question API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {String} question
     * @apiParam (Request body) {Number} productId
     * @apiParam (Request body) {String} answer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     *      "answer" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Question created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/add-question
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-question')
    @Authorized()
    public async createQuestion(@Body({ validate: true }) questionParam: CreateQuestion, @Req() request: any, @Res() response: any): Promise<any> {

        const question = new ProductQuestion();
        question.question = questionParam.question;
        question.productId = questionParam.productId;
        question.type = 1;
        question.referenceId = request.user.userId;
        question.isActive = 1;
        const questionSaved = await this.productQuestionService.create(question);
        if (questionParam.answer) {
            const answer = new ProductAnswer();
            answer.answer = questionParam.answer;
            answer.questionId = +questionSaved.questionId;
            answer.type = 1;
            answer.referenceId = request.user.userId;
            answer.defaultAnswer = 1;
            answer.isActive = 1;
            await this.productAnswerService.create(answer);
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

    // Update Question API
    /**
     * @api {put} /api/admin-product-question/update-question/:questionId Update Question API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {String} question question
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Question is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/update-question/:questionId
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-question/:questionId')
    @Authorized()
    public async updateQuestion(@Param('questionId') questionId: number, @BodyParam('question') question: string, @Res() response: any): Promise<any> {
        const findQuestion = await this.productQuestionService.findOne({
            where: {
                questionId,
            },
        });
        if (!findQuestion) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid QuestionId',
            };
            return response.status(400).send(errorResponse);
        }

        findQuestion.question = question;
        const questionSave = await this.productQuestionService.create(findQuestion);
        if (questionSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated your question.',
                data: questionSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update your question',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Question status API
    /**
     * @api {put} /api/admin-product-question/update-question-status/:questionId Update Question status API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {Number} status status should be 0 | 1
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " status updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/update-question-status/:questionId
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-question-status/:questionId')
    @Authorized()
    public async updateQuestionStatus(@Param('questionId') questionId: number, @BodyParam('status') status: number, @Res() response: any): Promise<any> {
        const question = await this.productQuestionService.findOne({
            where: {
                questionId,
            },
        });
        if (!question) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid QuestionId',
            };
            return response.status(400).send(errorResponse);
        }
        question.isActive = status;
        const questionSave = await this.productQuestionService.create(question);
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

    // delete Question API
    /**
     * @api {delete} /api/admin-product-question/delete-question/:questionId Delete Question API
     * @apiGroup Admin Product Question
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/delete-question/:questionId
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-question/:questionId')
    @Authorized()
    public async deleteQuestion(@Param('questionId') questionId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const question = await this.productQuestionService.findOne({
            where: {
                questionId,
            },
        });
        if (!question) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid questionId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteQuestion = await this.productQuestionService.delete(question);
        if (deleteQuestion) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Question',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete Question',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Question List API
    /**
     * @api {get} /api/admin-product-question/question-list Question List API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get question list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/admin-product-question/question-list
     * @apiErrorExample {json} question error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/question-list')
    @Authorized()
    public async questionList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('productId') productId: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const productDetail = await this.productService.findOne({
            where: { productId },
        });
        if (!productDetail) {
            const errorResponse: any = {
                status: 1,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const select = ['questionId', 'productId', 'question', 'referenceId', 'type', 'isActive'];
        const whereConditions = [];
        const search: any = [
            {
                name: 'productId',
                op: 'where',
                value: productId,
            },
            {
                name: 'question',
                op: 'like',
                value: keyword,
            },
        ];

        const questionList = await this.productQuestionService.list(limit, offset, select, search, whereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully get count',
                data: questionList,
            });
        }
        const promise = questionList.map(async (result: any) => {
            const type = result.type;
            const temp: any = result;
            if (type && type === 2) {
                const customer = await this.customerService.findOne({
                    select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                    where: { id: result.referenceId },
                });
                if (customer !== undefined) {
                    temp.postedBy = customer;
                }
            } else if (type && type === 1) {
                const adminUser = await this.userService.findOne({
                    select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                    where: { userId: result.referenceId },
                });
                if (adminUser !== undefined) {
                    temp.postedBy = adminUser;
                }
            }
            const searchQuestion: any = [
                {
                    name: 'questionId',
                    op: 'where',
                    value: result.questionId,
                },
            ];
            const ansCount = await this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
            temp.answerCount = ansCount;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all question List',
            data: {
                productDetail,
                questionList: value,
            },
        };
        return response.status(200).send(successResponse);

    }

}
