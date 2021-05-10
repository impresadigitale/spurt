/**
 * Created by piccosoft on 21/6/19.
 */
import {AppState} from '../../../../app.state.interface';
import {createSelector} from 'reselect';
import * as fromServiceEnquiry from './service-leads.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getServiceLeadsState = (state: AppState) => state.serviceLeads;


export const getServiceLeadsList = createSelector(getServiceLeadsState, fromServiceEnquiry.getServiceLeadsList);
export const getServiceLeadsCount = createSelector(getServiceLeadsState, fromServiceEnquiry.getServiceLeadsCount);
