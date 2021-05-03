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
import * as cartAction from './action/cart.action';
import * as store from '../state.interface';
import {
  cartList,
  addToCart,
  addToCartFailed,
  addToCartLoaded,
  addToCartLoading,
  cartCount,
  cartCountFailed,
  cartCountLoaded,
  cartCountLoading,
  AddToCartValid, deleteFromCartFailed, deleteFromCartLoaded, deleteFromCartLoading, DeleteFromCart
} from './reducer/cart.selector';

@Injectable()
export class CartSandbox {
  /* get cart count status*/
  public cartCount$ = this.appState$.select(cartCount);
  public cartCountLoading$ = this.appState$.select(cartCountLoading);
  public cartCountLoaded$ = this.appState$.select(cartCountLoaded);
  public cartCountFailed$ = this.appState$.select(cartCountFailed);
  /* get addToCart status*/
  public addToCart$ = this.appState$.select(addToCart);
  public addToCartValid$ = this.appState$.select(AddToCartValid);
  public addToCartLoading$ = this.appState$.select(addToCartLoading);
  public addToCartLoaded$ = this.appState$.select(addToCartLoaded);
  public addToCartFailed$ = this.appState$.select(addToCartFailed);
  public deleteFromCart$ = this.appState$.select(DeleteFromCart);
  public deleteFromLoading$ = this.appState$.select(deleteFromCartLoading);
  public deleteFromLoaded$ = this.appState$.select(deleteFromCartLoaded);
  public deleteFromFailed$ = this.appState$.select(deleteFromCartFailed);

  public cartList$ = this.appState$.select(cartList);


  constructor(
    protected appState$: Store<store.AppState>
  ) {}

  public getCartCounts(params): void {
    this.appState$.dispatch(new cartAction.GetCartCount(params));
  }

  public doAddToCart(params): void {
    this.appState$.dispatch(new cartAction.AddToCart(params));
  }

  public deleteFromCart(params): void {
    this.appState$.dispatch(new cartAction.DeleteFromCart(params));
  }

  public GetCartListList(params) {
    this.appState$.dispatch(new cartAction.GetCartList(params));
  }

}
