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
import * as fromFilter from './filter.reducer';

export const getFilterState = (state: AppState) => state.filter;

export const filterList = createSelector(getFilterState, fromFilter.filterList);
export const getNewFilter = createSelector(getFilterState, fromFilter.getNewFilter);
export const getFilter = createSelector(getFilterState, fromFilter.getFilter);
export const FilterListLoading = createSelector(getFilterState, fromFilter.getFilterListLoading);
export const FilterListLoaded = createSelector(getFilterState, fromFilter.getFilterListLoaded);
export const FilterListFailed = createSelector(getFilterState, fromFilter.getFilterListFailed);
export const varientList = createSelector(getFilterState, fromFilter.varientList);
export const attributeList = createSelector(getFilterState, fromFilter.attributeList);
export const filterDelete = createSelector(getFilterState, fromFilter.filterDelete);
export const updateFilter = createSelector(getFilterState, fromFilter.updateFilter);
export const getFilterLoaded = createSelector(getFilterState, fromFilter.getFilterLoaded);
export const userpagination = createSelector(getFilterState, fromFilter.userpagination);

