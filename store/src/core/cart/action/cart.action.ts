/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';

export const ActionTypes = {

    ADD_TO_CART: type('[login] get addToCart'),
    ADD_TO_CART_SUCCESS: type('[login] get addToCart success'),
    ADD_TO_CART_FAIL: type('[login] get addToCart fail'),

    DELETE_FROM_CART: type('[login] get delete cart'),
    DELETE_FROM_CART_SUCCESS: type('[login] get delete cart success'),
    DELETE_FROM_CART_FAIL: type('[login] get delete cart fail'),

    GET_CART_COUNT: type('[count] get count'),
    GET_CART_COUNT_SUCCESS: type('[count] count success'),
    GET_CART_COUNT_FAIL: type('[count] count fail'),

    GET_CART_LIST: type('[cart] get cart'),
    GET_CART_LIST_SUCCESS: type('[cart] get cart success'),
    GET_CART_LIST_FAIL: type('[cart] get cart fail'),

};

/* get cart count action*/
export class GetCartCount implements Action {
    type = ActionTypes.GET_CART_COUNT;

    constructor(public payload: any) {
    }
}
/* get Cart action*/
export class GetCartCountSuccess implements Action {
    type = ActionTypes.GET_CART_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetCartCountFail implements Action {
    type = ActionTypes.GET_CART_COUNT_FAIL;

    constructor(public payload: any) {
    }
}

/* get addToCart action*/

export class AddToCart implements Action {
    type = ActionTypes.ADD_TO_CART;

    constructor(public payload: any) {
    }
}

export class AddToCartSuccess implements Action {
    type = ActionTypes.ADD_TO_CART_SUCCESS;

    constructor(public payload: any) {
    }
}

export class AddToCartFail implements Action {
    type = ActionTypes.ADD_TO_CART_FAIL;

    constructor(public payload: any) {
    }
}
/* get delete cart action*/

export class DeleteFromCart implements Action {
    type = ActionTypes.DELETE_FROM_CART;

    constructor(public payload: any) {
    }
}

export class DeleteFromCartSuccess implements Action {
    type = ActionTypes.DELETE_FROM_CART_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteFromCartFail implements Action {
    type = ActionTypes.DELETE_FROM_CART_FAIL;

    constructor(public payload: any) {
    }
}

/* get cart action*/

export class GetCartList implements Action {
    type = ActionTypes.GET_CART_LIST;

    constructor(public payload: any) {
    }
}

export class GetCartListSuccess implements Action {
    type = ActionTypes.GET_CART_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetCartListFail implements Action {
    type = ActionTypes.GET_CART_LIST_FAIL;

    constructor(public payload: any) {
    }
}

export type Actions
    = GetCartCount |
    GetCartCountSuccess |
    GetCartCountFail |
    AddToCart |
    AddToCartSuccess |
    AddToCartFail |
    DeleteFromCart |
    DeleteFromCartSuccess |
    DeleteFromCartFail |
    GetCartList |
    GetCartListSuccess |
    GetCartListFail  ;
