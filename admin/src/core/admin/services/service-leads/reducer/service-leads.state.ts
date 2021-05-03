/**
 * Created by piccosoft on 21/6/19.
 */

import {Map, Record} from 'immutable';


export interface ServiceLeadsState extends Map<string, any> {
    serviceLeadList: Array<any>;
    serviceLeadCount: number;
}


export const ServiceLeadsRecord = Record({
    serviceLeadList: [],
    serviceLeadCount: 0,
});
