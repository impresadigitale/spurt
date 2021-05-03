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
import * as fromLocation from './location.reducer';

export const getLocationState = (state: AppState) => state.location;
export const locationList = createSelector(
  getLocationState,
  fromLocation.locationList
);
export const locationPagination = createSelector(
  getLocationState,
  fromLocation.locationPagination
);
export const locationDelete = createSelector(
  getLocationState,
  fromLocation.locationDelete
);
export const newLocation = createSelector(
  getLocationState,
  fromLocation.newLocation
);
export const updateLocation = createSelector(
  getLocationState,
  fromLocation.updateLocation
);

export const LocationListLoading = createSelector(
  getLocationState,
  fromLocation.getLocationListLoading
);
export const LocationListLoaded = createSelector(
  getLocationState,
  fromLocation.getLocationListLoaded
);
export const LocationListFailed = createSelector(
  getLocationState,
  fromLocation.getLocationListFailed
);

export const LocationCountLoading = createSelector(
  getLocationState,
  fromLocation.getLocationCountLoading
);
export const LocationCountLoaded = createSelector(
  getLocationState,
  fromLocation.getLocationCountLoaded
);
export const LocationCountFailed = createSelector(
  getLocationState,
  fromLocation.getLocationCountFailed
);

export const LocationAddLoading = createSelector(
  getLocationState,
  fromLocation.getLocationAddLoading
);
export const LocationAddLoaded = createSelector(
  getLocationState,
  fromLocation.getLocationAddLoaded
);
export const LocationAddFailed = createSelector(
  getLocationState,
  fromLocation.getLocationAddFailed
);

export const LocationDeleteLoading = createSelector(
  getLocationState,
  fromLocation.getLocationDeleteLoading
);
export const LocationDeleteLoaded = createSelector(
  getLocationState,
  fromLocation.getLocationDeleteLoaded
);
export const LocationDeleteFailed = createSelector(
  getLocationState,
  fromLocation.getLocationDeleteFailed
);

export const LocationUpdateLoading = createSelector(
  getLocationState,
  fromLocation.getLocationUpdateLoading
);
export const LocationUpdateLoaded = createSelector(
  getLocationState,
  fromLocation.getLocationUpdateLoaded
);
export const LocationUpdateFailed = createSelector(
  getLocationState,
  fromLocation.getLocationUpdateFailed
);
