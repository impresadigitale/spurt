/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { AuthState } from './auth/reducer/auth.state';
import { AccountState } from './account/reducer/account.state';
import { ProductControlState } from './product-control/reducer/product-control.state';
import { WishlistState } from './wishlist/reducer/wishlist.state';
import { CommonState } from './common/reducer/common.state';
import { CartState } from './cart/reducer/cart.state';
import { ListsState } from './lists/reducer/lists.state';
import { CompareProductState } from './product-compare/reducer/product-compare.state';
import { BlogsState } from './blogs/reducer/blogs.state';

export interface AppState {
  auth: AuthState;
  account: AccountState;
  productControl: ProductControlState;
  wishlist: WishlistState;
  common: CommonState;
  cart: CartState;
  list: ListsState;
  compare: CompareProductState;
  blogs: BlogsState;

}
