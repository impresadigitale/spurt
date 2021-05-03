// store
import {Store} from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as servicesActions from './action/service.action';
import {ServiceslistForm} from './models/servicelist.model';
import {
    getServiceList,
    getServiceListCount,
    getServiceAdd,
    getServiceUpdate,
    getServiceDelete,
    serviceMultiDelete,
    serviceDetails,
    serviceCount,
    serviceCountLoading
} from './reducer/service.selector';
import {AddserviceForm} from './models/add service.model';
import {ServiceupdateForm} from './models/serviceupdate.model';


@Injectable()
export class ServicesSandbox {
    constructor(protected appState: Store<store.AppState>, private router: Router) {
        this.subscribe();
    }

    public getServicesList$ = this.appState.select(getServiceList);
    public getServicesListCount$ = this.appState.select(getServiceListCount);
    public getServicesAdd$ = this.appState.select(getServiceAdd);
    public getServicesUpdate$ = this.appState.select(getServiceUpdate);
    public getServicesDelete$ = this.appState.select(getServiceDelete);
    public serviceMultiDelete$ = this.appState.select(serviceMultiDelete);
    public serviceDetails$ = this.appState.select(serviceDetails);
    public serviceCount$ = this.appState.select(serviceCount);
    public serviceCountLoading$ = this.appState.select(serviceCountLoading);




    public servicesList(value) {
        this.appState.dispatch(new servicesActions.DoServiceslistAction(new ServiceslistForm(value)));
    }

    public addService(value) {
        this.appState.dispatch(new servicesActions.DoAddServicesAction(new AddserviceForm(value)));
    }

    public updateService(value) {
        this.appState.dispatch(new servicesActions.DoUpdateServicesAction(new ServiceupdateForm(value)));
    }

    public deleteService(value) {
        this.appState.dispatch(new servicesActions.DoDeleteServicesAction(value));
    }

    public servicesListCount(value) {
        this.appState.dispatch(new servicesActions.DoServiceslistCountAction(new ServiceslistForm(value)));
    }
    public deleteMultipleServices(value) {
        this.appState.dispatch(new servicesActions.DeleteMultipleService(value));
    }
    public exportServices(value) {
        this.appState.dispatch(new servicesActions.ExportServiceList(value));
    }
    public getServiceDetails(value) {
        this.appState.dispatch(new servicesActions.GetServiceDetailsAction(value));
    }
    public getServiceCount() {
        this.appState.dispatch(new servicesActions.GetServiceCountAction());
    }

    subscribe() {
        this.getServicesAdd$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/services/servicesList']);
            }
        });
        this.getServicesDelete$.subscribe(data => {
            if (data && data.status === 1) {
                const param: any = {};
                param.limit = '10';
                param.offset = 0;
                param.keyword = '';
                this.servicesList(param);
                // this.router.navigate(['/services/servicesList']);
            }
        });
        this.getServicesUpdate$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/services/servicesList']);
            }
        });

    }
}
