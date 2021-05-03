/**
 * Created by piccosoft on 21/6/19.
 */
import {Api} from '../../providers/api/api';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class ServiceLeadsService extends Api {
    // url
    private url: string = this.getBaseUrl();

      // editing categories purpose
      public setEditvariable: any;

      // passing data to category edit

      setServiceEnquiry(data) {
          this.setEditvariable = data;
      }

      getServiceEnquiry() {
          return this.setEditvariable;
      }

    /**
     * Handles 'services enquiry list' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from Services CategorylistForm.
     */
    public serviceLeadsList(params: any): Observable<any> {
        return this.http.get(this.url + '/service/service-enquiry-list', {params: params});

    }
    /**
     * Handles 'services enquiry count' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from Services CategorylistForm.
     */
    public serviceLeadsListCount(params: any): Observable<any> {
        return this.http.get(this.url + '/service/service-enquiry-list', {params: params});
    }

    /**
     * add enquiry function. Calls post method with specific api address
     * along its param.
     *
     * @param param from CategoryForm
     */

    addServiceEnquiry(param: any): Observable<any> {
        return this.http.post(this.url + '/service-category/add-service-category', param);

    }

    /**
     * Handles 'updateCategory' function. Calls put method with specific api address
     * along its param.
     *
     * @param params from model.
     */
    updateServiceEnquiry(params): Observable<any> {
        return this.http.put(this.url + '/service-category/update-service-category/' + params.serviceCategoryId, params);

    }


    /**
     * Handles 'delete' function. Calls delete method with specific api address
     * along its param.
     *
     * @param params from CategorydeleteForm
     */
    deleteServiceEnquiry(params: any): Observable<any> {
        return this.http.delete(this.url + '/service-category/delete-service-category/' + params.serviceCategoryId);

    }



}
