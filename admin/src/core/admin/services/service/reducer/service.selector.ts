
import {AppState} from '../../../../app.state.interface';
import {createSelector} from 'reselect';
import * as fromServices from './service.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getServicesState = (state: AppState) => state.services;
export const getServiceList = createSelector(getServicesState, fromServices.getServicesList);
export const getServiceListCount = createSelector(getServicesState, fromServices.getServicesListCount);
export const getServiceAdd = createSelector(getServicesState, fromServices.getServicesAdd);
export const getServiceUpdate = createSelector(getServicesState, fromServices.getServicesUpdate);
export const getServiceDelete = createSelector(getServicesState, fromServices.getServicesDelete);
export const serviceMultiDelete = createSelector(getServicesState, fromServices.getServiceMultiDelete);

export const serviceDetails = createSelector(getServicesState, fromServices.serviceDetails);
export const serviceDetailsLoading = createSelector(getServicesState, fromServices.serviceDetailsLoading);
export const serviceDetailsLoaded = createSelector(getServicesState, fromServices.serviceDetailsLoaded);
export const serviceDetailsFailed = createSelector(getServicesState, fromServices.serviceDetailsFailed);

export const serviceCount = createSelector(getServicesState, fromServices.serviceCount);
export const serviceCountLoading = createSelector(getServicesState, fromServices.serviceCountLoading);
export const serviceCountLoaded = createSelector(getServicesState, fromServices.serviceCountLoaded);
export const serviceCountFailed = createSelector(getServicesState, fromServices.serviceCountFailed);
