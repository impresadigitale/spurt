/**
 * Created by piccosoft on 21/6/19.
 */
import {Api} from '../../providers/api/api';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class EnquiryService extends Api {
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
    public serviceEnquiryList(params: any): Observable<any> {
        return this.http.get(this.url + '/service/service-enquiry-list', {params: params});

    }
    /**
     * Handles 'services enquiry count' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from Services CategorylistForm.
     */
    public serviceEnquiryListCount(params: any): Observable<any> {
        return this.http.get(this.url + '/service/service-enquiry-list', {params: params});
    }

    /**
     * Handles 'delete' function. Calls delete method with specific api address
     * along its param.
     *
     * @param params from CategorydeleteForm
     */
    deleteServiceEnquiry(params: any): Observable<any> {
        return this.http.delete(this.url + '/service/delete-service-enquiry/' + params.enquiryId);
    }

    /**
     * Handles 'multiple delete' function. Calls delete method with specific api address
     * along its param.
     *
     * @param params from EnquirydeleteForm
     */
    deleteMultipleServiceEnquiry(params: any): Observable<any> {
        return this.http.post(this.url + '/service/delete-multiple-enquiry', params);
    }
}
