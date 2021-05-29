"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const ForgotPasswordRequest_1 = require("./requests/ForgotPasswordRequest");
const UserLoginRequest_1 = require("./requests/UserLoginRequest");
const CreateUserRequest_1 = require("./requests/CreateUserRequest");
const UpdateUserRequest_1 = require("./requests/UpdateUserRequest");
const User_1 = require("../models/User");
const AccessTokenModel_1 = require("../models/AccessTokenModel");
const UserService_1 = require("../services/UserService");
const UserGroupService_1 = require("../services/UserGroupService");
const ChangePasswordRequest_1 = require("./requests/ChangePasswordRequest");
const EditProfileRequest_1 = require("./requests/EditProfileRequest");
const AccessTokenService_1 = require("../services/AccessTokenService");
const EmailTemplateService_1 = require("../services/EmailTemplateService");
const mail_services_1 = require("../../auth/mail.services");
const ImageService_1 = require("../services/ImageService");
const S3Service_1 = require("../services/S3Service");
const SettingService_1 = require("../services/SettingService");
let UserController = class UserController {
    constructor(userService, userGroupService, accessTokenService, emailTemplateService, s3Service, settingService, imageService) {
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.accessTokenService = accessTokenService;
        this.emailTemplateService = emailTemplateService;
        this.s3Service = s3Service;
        this.settingService = settingService;
        this.imageService = imageService;
    }
    // Login API
    /**
     * @api {post} /api/auth/login Login
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username User Username
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
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
     * @apiSampleRequest /api/auth/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    login(loginParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    username: loginParam.username,
                    deleteFlag: 0,
                }, relations: ['usergroup'],
            });
            if (user) {
                if (yield User_1.User.comparePassword(user, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: user.userId }, '123##$$)(***&');
                    if (user.usergroup.isActive === 0) {
                        const errorResponse = {
                            status: 0,
                            message: 'InActive Role',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    let permission = {};
                    if (user.userGroupId !== 1) {
                        const userDetail = yield this.userService.findOne({ where: { userId: user.userId } });
                        if (userDetail.permission) {
                            permission = JSON.parse(userDetail.permission);
                        }
                        else {
                            const roleDetail = yield this.userGroupService.findOne({ where: { groupId: user.userGroupId } });
                            permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                        }
                    }
                    if (token) {
                        const newToken = new AccessTokenModel_1.AccessToken();
                        newToken.userId = user.userId;
                        newToken.token = token;
                        yield this.accessTokenService.create(newToken);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successful',
                        data: {
                            token,
                            user: class_transformer_1.classToPlain(user),
                            permission,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid password',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid username',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // User List API
    /**
     * @api {get} /api/auth/userlist User List API
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get user list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/userlist
     * @apiErrorExample {json} User Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    findAll(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relation = ['usergroup'];
            const WhereConditions = [{
                    name: 'deleteFlag',
                    value: 0,
                }];
            const user = yield this.userService.list(limit, offset, ['userId', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'avatar', 'avatarPath', 'password', 'createdDate'], relation, WhereConditions, keyword, count);
            const successResponse = {
                status: 1,
                data: class_transformer_1.classToPlain(user),
                message: 'Successfully get All user List',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create User API
    /**
     * @api {post} /api/auth/create-user Create User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username userName
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String} firstName User First Name
     * @apiParam (Request body) {String} lastName User Last Name
     * @apiParam (Request body) {String} email User Email-Id
     * @apiParam (Request body) {Number} userGroupId User GroupId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "userGroupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New User is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/create-user
     * @apiErrorExample {json} createUser error
     * HTTP/1.1 500 Internal Server Error
     */
    createUser(createParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userGroupExistWhereCondition = [
                {
                    name: 'id',
                    value: createParam.userGroupId,
                },
            ];
            const userGroupExistRecord = yield this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
            if (userGroupExistRecord.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid userGroupId',
                };
                return response.status(400).send(errorResponse);
            }
            const user = yield this.userService.findOne({
                where: {
                    username: createParam.username,
                    deleteFlag: 0,
                },
            });
            if (user) {
                const errorResponse = {
                    status: 0,
                    message: 'this user already saved',
                };
                return response.status(400).send(errorResponse);
            }
            const partsOfThreeLetters = createParam.email.match(/.{3}/g).concat(createParam.email.substr(1).match(/.{3}/g), createParam.email.substr(2).match(/.{3}/g));
            const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(createParam.password);
            if (matchEmail === true) {
                const validationMessage = [];
                validationMessage.push('Password must not duplicate any part of the email address');
                const passwordDuplicateErrorResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: validationMessage },
                };
                return response.status(422).send(passwordDuplicateErrorResponse);
            }
            const newUserPassword = yield User_1.User.hashPassword(createParam.password);
            const newUserParams = new User_1.User();
            newUserParams.username = createParam.username;
            newUserParams.password = newUserPassword;
            newUserParams.firstName = createParam.firstName;
            newUserParams.lastName = createParam.lastName;
            newUserParams.email = createParam.email;
            newUserParams.deleteFlag = 0;
            newUserParams.userGroupId = createParam.userGroupId;
            newUserParams.isActive = 1;
            const userSaveResponse = yield this.userService.create(newUserParams);
            // sending login Credential email to new user
            if (userSaveResponse) {
                const emailContent = yield this.emailTemplateService.findOne(7);
                const message = emailContent.content.replace('{name}', createParam.username).replace('{username}', createParam.email).replace('{password}', createParam.password);
                const redirectUrl = env_1.env.adminRedirectUrl;
                const logo = yield this.settingService.findOne();
                mail_services_1.MAILService.customerLoginMail(logo, message, createParam.email, emailContent.subject, redirectUrl);
                const successResponse = {
                    status: 1,
                    message: 'User saved successfully',
                    data: userSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // update User API
    /**
     * @api {put} /api/auth/update-user/:id Update User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username userName
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String} firstName User First Name
     * @apiParam (Request body) {String} lastName User Last Name
     * @apiParam (Request body) {String} email User Email-Id
     * @apiParam (Request body) {Number} userGroupId User GroupId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "userGroupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/update-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */
    updateUser(id, createParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request.user.userId === id) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot Edit loggedin User',
                };
                return response.status(400).send(errorResponse);
            }
            const userGroupExistWhereCondition = [
                {
                    name: 'id',
                    value: createParam.userGroupId,
                },
            ];
            const userGroupExistRecord = yield this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
            if (userGroupExistRecord.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid userGroupId',
                };
                return response.status(400).send(errorResponse);
            }
            const newUserPassword = yield User_1.User.hashPassword(createParam.password);
            const newUserParams = new User_1.User();
            newUserParams.username = createParam.username;
            if (createParam.password) {
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                if (!createParam.password.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                const partsOfThreeLetters = createParam.email.match(/.{3}/g).concat(createParam.email.substr(1).match(/.{3}/g), createParam.email.substr(2).match(/.{3}/g));
                const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(createParam.password);
                if (matchEmail === true) {
                    const validationMessage = [];
                    validationMessage.push('Password must not duplicate any part of the email address');
                    const passwordDuplicateErrorResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: validationMessage },
                    };
                    return response.status(422).send(passwordDuplicateErrorResponse);
                }
                newUserParams.password = newUserPassword;
            }
            newUserParams.firstName = createParam.firstName;
            newUserParams.lastName = createParam.lastName;
            newUserParams.email = createParam.email;
            newUserParams.userGroupId = createParam.userGroupId;
            newUserParams.isActive = 1;
            const userSaveResponse = yield this.userService.update(id, newUserParams);
            if (userSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'User updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update user',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete User API
    /**
     * @api {delete} /api/auth/delete-user/:id Delete User
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} id UserId
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is deleted successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/delete-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */
    remove(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request.user.userId === id) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete loggedin user',
                };
                return response.status(400).send(errorResponse);
            }
            const user = yield this.userService.findOne({
                where: {
                    userId: id,
                },
            });
            if (!user) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid UserId',
                };
                return response.status(400).send(errResponse);
            }
            user.deleteFlag = 1;
            const deleteUser = yield this.userService.create(user);
            if (deleteUser) {
                const successResponse = {
                    status: 1,
                    message: 'User Deleted successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete user',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // forgot Password API
    /**
     * @api {post} /api/auth/forgot-password Forgot Password API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you. Your password send to your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/forgot-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    forgotPassword(forgotPassword, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    email: forgotPassword.email,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid email Id',
                };
                return response.status(400).send(errorResponse);
            }
            const tempPassword = Math.random().toString().substr(2, 5);
            const password = yield User_1.User.hashPassword(tempPassword);
            user.password = password;
            yield this.userService.create(user);
            const emailContent = yield this.emailTemplateService.findOne(2);
            const logo = yield this.settingService.findOne();
            const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
            const redirectUrl = env_1.env.adminRedirectUrl;
            const sendMailRes = mail_services_1.MAILService.passwordForgotMail(logo, message, user.email, emailContent.subject, redirectUrl);
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'error in sending email',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Change Password API
    /**
     * @api {put} /api/auth/change-password Change Password API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword User oldPassword
     * @apiParam (Request body) {String} newPassword User newPassword
     * @apiParamExample {json} Input
     * {
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/change-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid userId',
                };
                return response.status(400).send(errResponse);
            }
            if (yield User_1.User.comparePassword(user, changePasswordParam.oldPassword)) {
                const val = yield User_1.User.comparePassword(user, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'Existing password and New password should not match',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                if (!changePasswordParam.newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                const partsOfThreeLetters = user.email.match(/.{3}/g).concat(user.email.substr(1).match(/.{3}/g), user.email.substr(2).match(/.{3}/g));
                const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(changePasswordParam.newPassword);
                if (matchEmail === true) {
                    const validationMessage = [];
                    validationMessage.push('Password must not duplicate any part of the email address');
                    const passwordDuplicateErrorResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: validationMessage },
                    };
                    return response.status(422).send(passwordDuplicateErrorResponse);
                }
                user.password = yield User_1.User.hashPassword(changePasswordParam.newPassword);
                const updateUser = yield this.userService.update(user.userId, user);
                if (updateUser) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Logout API
    /**
     * @api {get} /api/auth/logout Log Out API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully logout",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/logout
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    logout(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.accessTokenService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid token',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteToken = yield this.accessTokenService.delete(user);
            if (!deleteToken) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Logout',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Edit Profile API
    /**
     * @api {post} /api/auth/edit-profile Edit Profile API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} username User username
     * @apiParam (Request body) {String} email User email
     * @apiParam (Request body) {String} phoneNumber User phoneNumber
     * @apiParam (Request body) {String} address User address
     * @apiParam (Request body) {String} avatar User avatar
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "address" : "",
     *      "avatar" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated User.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/edit-profile
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    editProfile(editProfileParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid UserId',
                };
                return response.status(400).send(errorResponse);
            }
            const avatar = editProfileParam.avatar;
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'user/';
                const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = avatar.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                if (+sizeInKb <= 2048) {
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'File size is too large for user image, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                user.avatar = name;
                user.avatarPath = path;
            }
            user.username = editProfileParam.username;
            user.email = editProfileParam.email;
            user.phoneNumber = editProfileParam.phoneNumber;
            user.address = editProfileParam.address;
            const userSave = yield this.userService.create(user);
            userSave.usergroup = yield this.userGroupService.findOne({ where: { groupId: userSave.userGroupId } });
            if (userSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated profile',
                    data: userSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to edit profile',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UserLoginRequest_1.UserLogin, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/userlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/create-user'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateUserRequest_1.CreateUser, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-user/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateUserRequest_1.UpdateUserRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-user/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/forgot-password'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ForgotPasswordRequest_1.ForgotPassword, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/change-password'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ChangePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/logout'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/edit-profile'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [EditProfileRequest_1.EditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
UserController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/auth'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        UserGroupService_1.UserGroupService,
        AccessTokenService_1.AccessTokenService,
        EmailTemplateService_1.EmailTemplateService, S3Service_1.S3Service, SettingService_1.SettingService,
        ImageService_1.ImageService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map