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
import * as fromProduct from './attributes.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.attribute;
// product list action
export const attributeList = createSelector(
  getProdState,
  fromProduct.attributeList
);
export const attributeListLoading = createSelector(
  getProdState,
  fromProduct.attributeListLoading
);
export const attributeListLoaded = createSelector(
  getProdState,
  fromProduct.attributeListLoaded
);

export const attributeGet = createSelector(
  getProdState,
  fromProduct.attributeGet
);



// product delete action
export const attributeDelete = createSelector(
  getProdState,
  fromProduct.attributeDelete
);
export const attributeDeleteLoading = createSelector(
  getProdState,
  fromProduct.attributeDeleteLoading
);
export const attributeDeleteLoaded = createSelector(
  getProdState,
  fromProduct.attributeDeleteLoaded
);


// product add action
export const attributeAdd = createSelector(
  getProdState,
  fromProduct.attributeAdd
);
export const attributeAddLoading = createSelector(
  getProdState,
  fromProduct.attributeAddLoading
);
export const attributeAddLoaded = createSelector(
  getProdState,
  fromProduct.attributeAddLoaded
);


// product update action
export const attributeUpdate = createSelector(
  getProdState,
  fromProduct.attributeUpdate
);
export const attributeUpdateLoading = createSelector(
  getProdState,
  fromProduct.attributeUpdateLoading
);
export const attributeUpdateLoaded = createSelector(
  getProdState,
  fromProduct.attributeUpdateLoaded
);


export const groupList = createSelector(
  getProdState,
  fromProduct.groupList
);

export const groupListLoded = createSelector(
  getProdState,
  fromProduct.groupListLoded
);

export const attributeDetails = createSelector(
  getProdState,
  fromProduct.attributeDetails
);