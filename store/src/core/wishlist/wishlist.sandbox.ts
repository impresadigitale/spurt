/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authAction from './action/wishlist.action';
import * as store from '../state.interface';
import {
  getWishlist,
  wishlistFailed,
  wishlistLoaded,
  wishlistLoading
} from './reducer/wishlist.selector';

@Injectable()
export class WishlistSandbox {
  public wishlist$ = this.appState$.select(getWishlist);
  public wishlistLoading$ = this.appState$.select(wishlistLoading);
  public wishlistLoaded$ = this.appState$.select(wishlistLoaded);
  public wishlistFailed$ = this.appState$.select(wishlistFailed);

  constructor(
    protected appState$: Store<store.AppState>
  ) {}

  /* trigger get wish list action*/

  public getWishlist(params): void {
    this.appState$.dispatch(new authAction.GetWishlist(params));
  }

  /* trigger delete item from wish list action*/

  public deleteWishlist(params): void {
    this.appState$.dispatch(new authAction.DeleteProduct(params));
  }
}
