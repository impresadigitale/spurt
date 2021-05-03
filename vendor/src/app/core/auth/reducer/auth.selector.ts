/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromAuth from './auth.reducer';
import {AppState} from '../../app.state.interface';

export const getState = (State: AppState) => State.auth;

export const get_loginLoading = createSelector(getState, fromAuth.getLoginLoading);
export const get_loginLoaded = createSelector(getState, fromAuth.getLoginLoaded);
export const get_loginFailed = createSelector(getState, fromAuth.getLoginFailed);

export const get_registerLoading = createSelector(getState, fromAuth.getRegisterLoading);
export const get_registerLoaded = createSelector(getState, fromAuth.getRegisterLoaded);
export const get_registerFailed = createSelector(getState, fromAuth.getRegisterFailed);

export const getChangePasswordLoading = createSelector(getState, fromAuth.getChangePasswordLoading);
export const getChangePasswordLoaded = createSelector(getState, fromAuth.getChangePasswordLoaded);
export const getChangePasswordFailed = createSelector(getState, fromAuth.getChangePasswordFailed);

export const getForgetPasswordLoading = createSelector(getState, fromAuth.getForgetPasswordLoading);
export const getForgetPasswordLoaded = createSelector(getState, fromAuth.getForgetPasswordLoaded);
export const getForgetPasswordFailed = createSelector(getState, fromAuth.getForgetPasswordFailed);


