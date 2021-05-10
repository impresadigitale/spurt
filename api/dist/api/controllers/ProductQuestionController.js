"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateQuestionRequest_1 = require("./requests/CreateQuestionRequest");
const ProductQuestionService_1 = require("../services/ProductQuestionService");
const ProductService_1 = require("../services/ProductService");
const ProductAnswerService_1 = require("../services/ProductAnswerService");
const CustomerService_1 = require("../services/CustomerService");
const UserService_1 = require("../services/UserService");
const ProductQuestion_1 = require("../models/ProductQuestion");
const ProductAnswer_1 = require("../models/ProductAnswer");
let ProductQuestionController = class ProductQuestionController {
    constructor(productQuestionService, customerService, userService, productAnswerService, productService) {
        this.productQuestionService = productQuestionService;
        this.customerService = customerService;
        this.userService = userService;
        this.productAnswerService = productAnswerService;
        this.productService = productService;
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
    createQuestion(questionParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = new ProductQuestion_1.ProductQuestion();
            question.question = questionParam.question;
            question.productId = questionParam.productId;
            question.type = 1;
            question.referenceId = request.user.userId;
            question.isActive = 1;
            const questionSaved = yield this.productQuestionService.create(question);
            if (questionParam.answer) {
                const answer = new ProductAnswer_1.ProductAnswer();
                answer.answer = questionParam.answer;
                answer.questionId = +questionSaved.questionId;
                answer.type = 1;
                answer.referenceId = request.user.userId;
                answer.defaultAnswer = 1;
                answer.isActive = 1;
                yield this.productAnswerService.create(answer);
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
    updateQuestion(questionId, question, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuestion = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!findQuestion) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            findQuestion.question = question;
            const questionSave = yield this.productQuestionService.create(findQuestion);
            if (questionSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated your question.',
                    data: questionSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update your question',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateQuestionStatus(questionId, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            question.isActive = status;
            const questionSave = yield this.productQuestionService.create(question);
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
    deleteQuestion(questionId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid questionId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteQuestion = yield this.productQuestionService.delete(question);
            if (deleteQuestion) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Question',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Question',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    questionList(limit, offset, keyword, productId, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId },
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['questionId', 'productId', 'question', 'referenceId', 'type', 'isActive'];
            const whereConditions = [];
            const search = [
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
            const questionList = yield this.productQuestionService.list(limit, offset, select, search, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: questionList,
                });
            }
            const promise = questionList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const type = result.type;
                const temp = result;
                if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                const searchQuestion = [
                    {
                        name: 'questionId',
                        op: 'where',
                        value: result.questionId,
                    },
                ];
                const ansCount = yield this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
                temp.answerCount = ansCount;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all question List',
                data: {
                    productDetail,
                    questionList: value,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-question'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuestionRequest_1.CreateQuestion, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "createQuestion", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-question/:questionId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('questionId')), tslib_1.__param(1, routing_controllers_1.BodyParam('question')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "updateQuestion", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-question-status/:questionId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('questionId')), tslib_1.__param(1, routing_controllers_1.BodyParam('status')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "updateQuestionStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-question/:questionId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('questionId')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "deleteQuestion", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/question-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('productId')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "questionList", null);
ProductQuestionController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/admin-product-question'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        CustomerService_1.CustomerService,
        UserService_1.UserService,
        ProductAnswerService_1.ProductAnswerService,
        ProductService_1.ProductService])
], ProductQuestionController);
exports.ProductQuestionController = ProductQuestionController;
//# sourceMappingURL=ProductQuestionController.js.map