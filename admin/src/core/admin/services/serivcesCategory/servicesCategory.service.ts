/**
 * Created by piccosoft on 21/6/19.
 */
import {Api} from '../../providers/api/api';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class ServicesCategoriesService extends Api {
    // url
    private url: string = this.getBaseUrl();

      // editing categories purpose
      public setEditvariable: any;

      // passing data to category edit

      setServicecategories(data) {
          this.setEditvariable = data;
      }

      getServicecategories() {
          return this.setEditvariable;
      }

    /**
     * Handles 'services categoryList' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from Services CategorylistForm.
     */
    public serviceCategoryList(params: any): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/service-category/service-category-list', {params: reqOpts});

    }
    /**
     * Handles 'services categoryList Pagination' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from Services CategorylistForm.
     */
    public serviceCategoryListCount(params: any): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/service-category/service-category-list', {params: reqOpts});
    }

    /**
     * Handles 'addServiceCategory' function. Calls post method with specific api address
     * along its param.
     *
     * @param param from CategoryForm
     */

    addServiceCategory(param: any): Observable<any> {
        return this.http.post(this.url + '/service-category/add-service-category', param);

    }

    /**
     * Handles 'updateCategory' function. Calls put method with specific api address
     * along its param.
     *
     * @param params from model.
     */
    updateServiceCategory(params): Observable<any> {
        return this.http.put(this.url + '/service-category/update-service-category/' + params.serviceCategoryId, params);

    }

    getCategoryDetails(params): Observable<any> {
        return this.http.get(this.url + '/service-category/service-category-detail', {params: params});

    }

    /**
     * Handles 'delete' function. Calls delete method with specific api address
     * along its param.
     *
     * @param params from CategorydeleteForm
     */
    deleteServiceCategory(params: any): Observable<any> {
        return this.http.delete(this.url + '/service-category/delete-service-category/' + params.serviceCategoryId);

    }



}
