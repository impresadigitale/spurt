/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { LoginResponseModel } from '../models/loginResponse.model';
import { OauthModel } from '../models/oauth.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { ChangePasswordRequestModel } from '../models/change-password.request.model';

export const ActionTypes = {
  // login actions
  DO_LOGIN: type('[login] do login'),
  DO_LOGIN_SUCCESS: type('[login] do login success'),
  DO_LOGIN_FAIL: type('[login] do login fail'),
 

  // register actions
  DO_REGISTER: type('[login] do register'),
  DO_REGISTER_SUCCESS: type('[login] do register success'),
  DO_REGISTER_FAIL: type('[login] do register fail'),

 // recover account action
  DO_FORGET_PASSWORD: type('[login] do forget password'),
  DO_FORGET_PASSWORD_SUCCESS: type('[login] do forget password success'),
  DO_FORGET_PASSWORD_FAIL: type('[login] do forget password fail'),

  // change password actions
  CHANGE_PASSWORD: type('[login] do change password'),
  CHANGE_PASSWORD_SUCCESS: type('[login] do change password success'),
  CHANGE_PASSWORD_FAIL: type('[login] do change password fail')
};
// login actions
export class DoLogin implements Action {
  type = ActionTypes.DO_LOGIN;

  constructor(public payload: LoginModel) {
  }
}

export class DoLoginSuccess implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public payload: LoginResponseModel) {
  }
}
export class DoLoginFail implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any) {}
}

// forget password actions
export class DoForgetPassword implements Action {
    type = ActionTypes.DO_FORGET_PASSWORD;

    constructor(public payload: OauthModel) {
    }
}

export class DoForgetPasswordSuccess implements Action {
    type = ActionTypes.DO_FORGET_PASSWORD_SUCCESS;

    constructor(public payload: any) {
    }
}
export class DoForgetPasswordFail implements Action {
    type = ActionTypes.DO_FORGET_PASSWORD_FAIL;

    constructor(public payload: any) {
    }
}
// register actions

export class DoRegister implements Action {
  type = ActionTypes.DO_REGISTER;

  constructor(public payload: RegisterModel) {
  }
}

export class DoRegisterSuccess implements Action {
  type = ActionTypes.DO_REGISTER_SUCCESS;

  constructor(public payload: RegisterModel) {
  }
}
export class DoRegisterFail implements Action {
  type = ActionTypes.DO_REGISTER_FAIL;

  constructor(public payload: any) {}
}
// change password actions

export class ChangePassword implements Action {
    type = ActionTypes.CHANGE_PASSWORD;

    constructor(public payload: RegisterModel) {
    }
  }

  export class ChangePasswordSuccess implements Action {
    type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

    constructor(public payload: ChangePasswordRequestModel) {
    }
  }
  export class ChangePasswordFail implements Action {
    type = ActionTypes.CHANGE_PASSWORD_FAIL;
    constructor(public payload: any) {}
  }
export type Actions =
  | DoLogin
  | DoLoginSuccess
  | DoLoginFail
  // DoOauthLogin|
  | DoRegister
  | DoRegisterSuccess
  | DoRegisterFail
  | DoForgetPassword
  | DoForgetPasswordSuccess
  | DoForgetPasswordFail
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail;
