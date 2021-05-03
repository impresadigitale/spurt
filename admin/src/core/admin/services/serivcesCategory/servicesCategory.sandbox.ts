/**
 * Created by piccosoft on 21/6/19.
 */


// store
import {Store} from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as servicecategoriesActions from './action/servicesCategory.action';

import {Injectable} from '@angular/core';
import {ServiceCategorylistForm} from './models/serviceCategorylist.model';
import {
    getServiceCategoryList, getServiceCategoryListCount,
    getServiceCategoryListFilter,
    getServiceCategoryAdd,
    getServiceCategoryUpdate,
    getServicecategoryRemoveLists,
    getServiceCategoryDelete,
    categoryDetails,
    categoryDetailsLoading,
    categoryDetailsLoaded
} from './reducer/serviceCategory.selector';
import { ServiceCategoryForm } from './models/serviceCategory.model';
import { Router } from '@angular/router';
import {DoCategoriesRemovelistAction} from './action/servicesCategory.action';

@Injectable()

export class ServicesCategoriesSandbox {
    public getServiceCategoriesList$ = this.appState.select(getServiceCategoryList);
    public getServiceCategoriesListCount$ = this.appState.select(getServiceCategoryListCount);
    public getServiceCategoriesListFilter$ = this.appState.select(getServiceCategoryListFilter);
    public getServiceCategoriesAdd$ = this.appState.select(getServiceCategoryAdd);
    public getServiceCategoriesUpdate$ = this.appState.select(getServiceCategoryUpdate);
    public getServiceCategoriesDelete$ = this.appState.select(getServiceCategoryDelete);
    public getServicecategoryRemoveLists$ = this.appState.select(getServicecategoryRemoveLists);

    public categoryDetails$ = this.appState.select(categoryDetails);
    public categoryDetailsLoading$ = this.appState.select(categoryDetailsLoading);
    public categoryDetailsLoaded$ = this.appState.select(categoryDetailsLoaded);

    constructor(protected appState: Store<store.AppState> , private router: Router) {
        this.subscribe();
    }


    public serviceCategorylist(value) {
        this.appState.dispatch(new servicecategoriesActions.DoCategorieslistAction(new ServiceCategorylistForm(value)));
    }
    public resetServiceCategorylist() {
        this.appState.dispatch(new servicecategoriesActions.ResetCategorieslist());
    }
    public serviceRemoveList(value) {
        this.appState.dispatch(new servicecategoriesActions.DoCategoriesRemovelistAction(value));
    }
    public serviceAddList(value) {
        this.appState.dispatch(new servicecategoriesActions.DoCategoriesAddlistAction(value));
    }
    public serviceCategorylistCount(value) {
        this.appState.dispatch(new servicecategoriesActions.DoCategorieslistCountAction(new ServiceCategorylistForm(value)));
    }
    public addServiceCategory(value) {
        this.appState.dispatch(new servicecategoriesActions.DoAddServiceCategoriesAction(new ServiceCategoryForm(value)));
    }
    public updateServiceCategory(value) {
        this.appState.dispatch(new servicecategoriesActions.DoUpdateServiceCategoriesAction(new ServiceCategoryForm(value)));
    }
    public deleteServiceCategory(value) {
        this.appState.dispatch(new servicecategoriesActions.DoDeleteServiceCategoriesAction((value)));
    }
    public getCategoryDetails(value) {
        this.appState.dispatch(new servicecategoriesActions.GetCategoryDetailsAction((value)));
    }

    subscribe() {

        this.getServiceCategoriesAdd$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/services/servicesCategory']);
            }
        });
        this.getServiceCategoriesUpdate$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/services/servicesCategory']);
            }
        });
        this.getServiceCategoriesDelete$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/services/servicesCategory']);
            }
        });


    }

}
