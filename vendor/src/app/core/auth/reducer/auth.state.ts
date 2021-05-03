/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Map, Record} from 'immutable';

export interface AuthState extends Map<string, any> {

    loginLoading: boolean;
    loginLoaded: boolean;
    loginFailed: boolean;

    registerLoading: boolean;
    registerLoaded: boolean;
    registerFailed: boolean;

    changePasswordLoading: boolean;
    changePasswordLoaded: boolean;
    changePasswordFailed: boolean;

    forgetPasswordLoading: boolean;
    forgetPasswordLoaded: boolean;
    forgetPasswordFailed: boolean;
}

export const authrecord = Record({

    loginLoading: false,
    loginLoaded: false,
    loginFailed: false,

    registerLoading: false,
    registerLoaded: false,
    registerFailed: false,

    changePasswordLoading: false,
    changePasswordLoaded: false,
    changePasswordFailed: false,

    forgetPasswordLoading: false,
    forgetPasswordLoaded: false,
    forgetPasswordFailed: false,
});
