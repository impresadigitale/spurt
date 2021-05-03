import {Injectable} from '@angular/core';
import {Api} from '../../providers/api/api';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ServicesService extends Api {
    // url
    private url: string = this.getBaseUrl();

    // editing categories purpose
    public setEditvariable: any;

    // passing data to category edit

    setServices(data) {
        this.setEditvariable = data;
    }

    getServices() {
        return this.setEditvariable;
    }

    /**
     * Handles 'services List' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from ServiceslistForm.
     */
    public servicesList(params: any): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/service/service-list', {params: reqOpts});

    }

    /**
     * Handles 'services List Count' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from ServiceslistForm.
     */
    public servicesListCount(params: any): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/service/service-list', {params: reqOpts});

    }


    /**
     * Handles 'addServiceCategory' function. Calls post method with specific api address
     * along its param.
     *
     * @param param from CategoryForm
     */

    addServices(param: any): Observable<any> {
        return this.http.post(this.url + '/service/add-service', param);

    }
     /**
     * Handles 'delete multiple services' function. Calls post method with specific api address
     * along its param.
     *
     * @param param from CategoryForm
     */

    deleteMultipleService(param: any): Observable<any> {
        return this.http.post(this.url + '/service/delete-multiple-service', param);

    }
    /**
     * Handles 'delete multiple services' function. Calls post method with specific api address
     * along its param.
     *
     * @param param from CategoryForm
     */

    public serviceExcel(params): Observable<any> {
        const reqOpts: any = {};
        reqOpts.responseType = 'arraybuffer';
        if (params) {
            reqOpts.params = new HttpParams();
            for (const k in params) {
                if (k) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
                }
            }
        }
        return this.http.get(this.url + '/service/service-excel-list', reqOpts);
    }
    /**
     * Handles 'updateCategory' function. Calls put method with specific api address
     * along its param.
     *
     * @param params from model.
     */
    updateServices(params): Observable<any> {
        return this.http.put(this.url + '/service/update-service/' + params.serviceId, params);

    }


    /**
     * Handles 'delete' function. Calls delete method with specific api address
     * along its param.
     *
     * @param params from CategorydeleteForm
     */
    deleteServices(params: any): Observable<any> {
        return this.http.delete(this.url + '/service/delete-service/' + params.serviceId);

    }
    // service details
    getServiceDetails(params: any): Observable<any> {
        return this.http.get(this.url + '/service/service-detail', {params: params});

    }

     // service count

     getServiceCount(): Observable<any> {
        return this.http.get(this.url + '/service/service-count');

    }
}
