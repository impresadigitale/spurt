/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromVariants from './variants.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getVariantState = (state: AppState) => state.variants;
// product list action
export const getProductList = createSelector(
  getVariantState,
  fromVariants.getProductList
);
export const getProductListCount = createSelector(
  getVariantState,
  fromVariants.getProductListCount
);
export const ProductListLoading = createSelector(
  getVariantState,
  fromVariants.getProductListLoading
);
export const ProductListLoaded = createSelector(
  getVariantState,
  fromVariants.getProductListLoaded
);
export const ProductListFailed = createSelector(
  getVariantState,
  fromVariants.getProductListFailed
);

// product delete action
export const getProductDelete = createSelector(
  getVariantState,
  fromVariants.getProductDelete
);
export const ProductDeleteLoading = createSelector(
  getVariantState,
  fromVariants.getProductDeleteLoading
);
export const ProductDeleteLoaded = createSelector(
  getVariantState,
  fromVariants.getProductDeleteLoaded
);
export const ProductDeleteFailed = createSelector(
  getVariantState,
  fromVariants.getProductDeleteFailed
);

// product add action
export const getProductAdd = createSelector(
  getVariantState,
  fromVariants.getProductAdd
);
export const ProductAddLoading = createSelector(
  getVariantState,
  fromVariants.getProductAddLoading
);
export const ProductAddLoaded = createSelector(
  getVariantState,
  fromVariants.getProductAddLoaded
);
export const ProductAddFailed = createSelector(
  getVariantState,
  fromVariants.getProductAddFailed
);

// product update action
export const getProductUpdate = createSelector(
  getVariantState,
  fromVariants.getProductUpdate
);
export const ProductUpdateLoading = createSelector(
  getVariantState,
  fromVariants.getProductUpdateLoading
);
export const ProductUpdateLoaded = createSelector(
  getVariantState,
  fromVariants.getProductUpdateLoaded
);
export const ProductUpdateFailed = createSelector(
  getVariantState,
  fromVariants.getProductUpdateFailed
);

export const variantsDetails = createSelector(
  getVariantState,
  fromVariants.variantsDetails
);