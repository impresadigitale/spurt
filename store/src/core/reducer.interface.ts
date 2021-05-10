/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState as State } from './state.interface';
import * as fromAuth from '../core/auth/reducer/auth.reducer';
import * as fromAccount from '../core/account/reducer/account.reducer';
import * as fromProductControl from '../core/product-control/reducer/product-control.reducer';
import * as fromWishlist from '../core/wishlist/reducer/wishlist.reducer';
import * as fromCommon from '../core/common/reducer/common.reducer';
import * as fromCart from '../core/cart/reducer/cart.reducer';
import * as fromList from '../core/lists/reducer/lists.reducer';
import * as fromCompare from '../core/product-compare/reducer/product-compare.reducer';
import * as fromBlogs from '../core/blogs/reducer/blogs.reducer';

import { environment } from '../environments/environment';

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  account: fromAccount.reducer,
  productControl: fromProductControl.reducer,
  wishlist: fromWishlist.reducer,
  common: fromCommon.reducer,
  cart: fromCart.reducer,
  list: fromList.reducer,
  compare: fromCompare.reducer,
  blogs: fromBlogs.reducer

};

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
