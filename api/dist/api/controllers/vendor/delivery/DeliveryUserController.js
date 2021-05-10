"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryUserController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const Logger_1 = require("../../../../decorators/Logger");
const UserLogin_1 = require("./requests/UserLogin");
const DeliveryPerson_1 = require("../../../models/DeliveryPerson");
const moment_1 = tslib_1.__importDefault(require("moment"));
const DeliveryPersonService_1 = require("../../../services/DeliveryPersonService");
let DeliveryUserController = class DeliveryUserController {
    constructor(userService, log) {
        this.userService = userService;
        this.log = log;
    }
    // Login
    /**
     * @api {post} /api/delivery-user/login Login
     * @apiGroup Delivery Person
     * @apiParam (Request body) {String} userName User Name
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "userName" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-user/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    login(loginParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const password = yield DeliveryPerson_1.DeliveryPerson.hashPassword('admin123$');
            this.log.info(password);
            const user = yield this.userService.findOne({
                where: {
                    email: loginParam.userName,
                    isActive: 1,
                },
            });
            if (!user) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid username or password',
                });
            }
            if (yield DeliveryPerson_1.DeliveryPerson.comparePassword(user, loginParam.password)) {
                // create a token
                this.log.info('create a token');
                const updateUser = new DeliveryPerson_1.DeliveryPerson();
                updateUser.lastLogin = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
                yield this.userService.update(user.id, updateUser);
                const token = jsonwebtoken_1.default.sign({ id: user.id, group: 'delivery-person' }, '123##$$)(***&', {
                    expiresIn: 0,
                });
                const successResponse = {
                    status: 1,
                    message: 'Successfully Login',
                    data: {
                        token,
                        user: class_transformer_1.classToPlain(user),
                    },
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Invalid username or password',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Change Password
    /**
     * @api {post} /api/delivery-user/change-password Change Password
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword Old Password
     * @apiParam (Request body) {String} newPassword New Password
     * @apiParamExample {json} Input
     * {
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-user/change-password
     * @apiErrorExample {json} Change Password error
     * HTTP/1.1 500 Internal Server Error
     */
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    id: request.user.id,
                    isActive: '1',
                },
            });
            if (!user) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Login Id',
                });
            }
            if (yield DeliveryPerson_1.DeliveryPerson.comparePassword(user, changePasswordParam.oldPassword)) {
                user.password = yield DeliveryPerson_1.DeliveryPerson.hashPassword(changePasswordParam.newPassword);
                const updateUser = yield this.userService.update(user.id, user);
                if (updateUser) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse1 = {
                        status: 0,
                        message: 'We are unable to change password',
                    };
                    return response.status(400).send(errorResponse1);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // User Profile
    /**
     * @api {get} /api/delivery-user/me User Profile
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get user profile details",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-user/me
     * @apiErrorExample {json} User Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    findMe(Response, Request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const successResponse = {
                status: 1,
                data: class_transformer_1.classToPlain(Request.user),
                message: 'Successfully get user profile details',
            };
            return Response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UserLogin_1.UserLogin, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryUserController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/change-password'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryUserController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/me'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryUserController.prototype, "findMe", null);
DeliveryUserController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/delivery-user'),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [DeliveryPersonService_1.DeliveryPersonService, Object])
], DeliveryUserController);
exports.DeliveryUserController = DeliveryUserController;
//# sourceMappingURL=DeliveryUserController.js.map