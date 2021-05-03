import {ServiceLeadsState, ServiceLeadsRecord} from './service-leads.state';
import * as actions from '../actions/service-leads.action';

/**
 * Created by piccosoft on 21/6/19.
 */

export const initialState: ServiceLeadsState = new ServiceLeadsRecord() as unknown as ServiceLeadsState;

export function reducer(state = initialState, {type, payload}: any): ServiceLeadsState {

    if (!type) {
        return state;
    }

    switch (type) {



// <--------------LEADS LIST ---------------> //

        case actions.ActionTypes.GET_SERVICE_LEAD_LIST: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.GET_SERVICE_LEAD_LIST_SUCCESS: {
            return Object.assign({}, state, {
                enquiryList: payload.data,
            });
        }

        case actions.ActionTypes.GET_SERVICE_LEAD_LIST_FAIL: {
            return Object.assign({}, state, {});
        }

// <--------------LEADS LIST COUNT---------------> //


        case actions.ActionTypes.GET_SERVICE_LEAD_COUNT: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.GET_SERVICE_LEAD_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                enquiryCount: payload.data,
            });
        }

        case actions.ActionTypes.GET_SERVICE_LEAD_COUNT_FAIL: {
            return Object.assign({}, state, {});
        }


        default: {
            return state;
        }

    }
}

export const getServiceLeadsList = (state: ServiceLeadsState) => state.serviceLeadList;
export const getServiceLeadsCount = (state: ServiceLeadsState) => state.serviceLeadCount;
