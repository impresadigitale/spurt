/**
 * Created by piccosoft on 21/6/19.
 */
import {AppState} from '../../../../app.state.interface';
import {createSelector} from 'reselect';
import * as fromServiceEnquiry from './service-enquiry.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getServiceEnquiryState = (state: AppState) => state.serviceEnquiry;


export const getServiceEnquiryList = createSelector(getServiceEnquiryState, fromServiceEnquiry.getEnquiryList);
export const getServiceEnquiryListCount = createSelector(getServiceEnquiryState, fromServiceEnquiry.getEnquiryCount);

export const getEnquiryListLoading = createSelector(getServiceEnquiryState, fromServiceEnquiry.getEnquiryListLoading);
export const getEnquiryListLoaded = createSelector(getServiceEnquiryState, fromServiceEnquiry.getEnquiryListLoaded);
export const getEnquiryListFailed = createSelector(getServiceEnquiryState, fromServiceEnquiry.getEnquiryListFailed);

export const enquiryDeleteLoading = createSelector(getServiceEnquiryState, fromServiceEnquiry.enquiryDeleteLoading);
export const enquiryDelete = createSelector(getServiceEnquiryState, fromServiceEnquiry.enquiryDelete);

export const multipleEnquiryDelete = createSelector(getServiceEnquiryState, fromServiceEnquiry.multipleEnquiryDelete);
export const multipleEnquiryDeleteLoading = createSelector(getServiceEnquiryState, fromServiceEnquiry.multipleEnquiryDeleteLoading);
