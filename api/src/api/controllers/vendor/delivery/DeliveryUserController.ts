import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Req, Get
} from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { Logger, LoggerInterface } from '../../../../decorators/Logger';
import { UserLogin as LoginRequest } from './requests/UserLogin';
import { DeliveryPerson } from '../../../models/DeliveryPerson';
import moment from 'moment';
import { DeliveryPersonService } from '../../../services/DeliveryPersonService';

@JsonController('/delivery-user')
export class DeliveryUserController {

    constructor(
        private userService: DeliveryPersonService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

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
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: LoginRequest, @Res() response: any): Promise<any> {
        const password = await DeliveryPerson.hashPassword('admin123$');
        this.log.info(password);
        const user = await this.userService.findOne({
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

        if (await DeliveryPerson.comparePassword(user, loginParam.password)) {
            // create a token
            this.log.info('create a token');
            const updateUser = new DeliveryPerson();
            updateUser.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
            await this.userService.update(user.id, updateUser);
            const token = jwt.sign({ id: user.id, group: 'delivery-person' }, '123##$$)(***&', {
                expiresIn: 0, // expires in 24 hours
            });
            const successResponse: any = {
                status: 1,
                message: 'Successfully Login',
                data: {
                    token,
                    user: classToPlain(user),
                },
            };
            return response.status(200).send(successResponse);
        }

        const errorResponse: any = {
            status: 0,
            message: 'Invalid username or password',
        };
        return response.status(400).send(errorResponse);
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
    @Post('/change-password')
    @Authorized('delivery-person')
    public async changePassword(@Body({ validate: true }) changePasswordParam: any, @Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.userService.findOne({
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
        if (await DeliveryPerson.comparePassword(user, changePasswordParam.oldPassword)) {
            user.password = await DeliveryPerson.hashPassword(changePasswordParam.newPassword);
            const updateUser = await this.userService.update(user.id, user);
            if (updateUser) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse1: any = {
                    status: 0,
                    message: 'We are unable to change password',
                };
                return response.status(400).send(errorResponse1);
            }
            }
        const errorResponse: any = {
            status: 0,
            message: 'Your old password is wrong',
        };
        return response.status(400).send(errorResponse);
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
    @Get('/me')
    @Authorized('delivery-person')
    public async findMe(@Res() Response: any, @Req() Request: any): Promise<any> {
        const successResponse: any = {
            status: 1,
            data: classToPlain(Request.user),
            message: 'Successfully get user profile details',
        };
        return Response.status(200).send(successResponse);
    }
}
