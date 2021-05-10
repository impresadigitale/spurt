import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesSandbox} from '../../../../../../../core/admin/services/service/service.Sandbox';
import {ServicesService} from '../../../../../../../core/admin/services/service/service.Service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {LayoutSandbox} from '../../../../../../../core/admin/layout/layout.sandbox';
import {environment} from '../../../../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-services-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']

})
export class ServicesListComponent implements OnInit, OnDestroy {

    @ViewChild('paginator') paginator: MatPaginator;


    public page: number;
    private offset = 0;
    public pageSize = '10';
    private keyword = '';
    public index: number;
    private currentPage: number;
    private sortOrder: number;
    // editCategory
    private edit: any;
    public status = '';
    public price = 0;
    public serviceImage = [];
    // condition for filter component
    public buttonCheck = true;
    public checkCondition: any = [];
    public checkmodules: any = [];
    public checkedData: any = [];
    public unCheckData: any = [];
    // service list
    public imageUrl: any;
    private subscriptions: Array<Subscription> = [];

    constructor(public servicesSandBox: ServicesSandbox, private router: Router, private servicesService: ServicesService,
                private toastr: ToastrManager, public commonSandbox: LayoutSandbox) {
    }

    ngOnInit() {
        this.imageUrl = environment.imageUrl;
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.servicesList(0, this.keyword);
    }

    changeFilter(event) {
        this.buttonCheck = event.target.checked;
    }

    servicesList(offset: number = 0, keyword) {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = this.offset;
        param.keyword = this.keyword;
        param.status = this.status;
        param.price = this.price;
        this.servicesSandBox.servicesList(param);
        param.count = 1;
        param.limit = '';
        param.offset = '';
        this.servicesSandBox.servicesListCount(param);
    }

    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.offset = event.pageSize * event.pageIndex;
        this.servicesList(this.offset, this.pageSize);
    }

    // receive param from filter component .And calls categoriesPagination event
    receiveProgress(event) {
        this.index = 0;
        this.keyword = event.keyword;
        this.status = event.status;
        this.price = event.price;
        this.offset = 0;
        this.paginator.firstPage();
        this.servicesList(this.offset, this.pageSize);
    }

    editServices(id) {
        this.edit = id;
        this.router.navigate(['/services/servicesList/edit', id]);
    }

    addServices() {
        this.servicesService.setServices('');
        this.router.navigate(['/services/servicesList/add']);
    }

    bulkDelete() {
        const param: any = {};
        param.serviceId = this.checkedData;
        this.servicesSandBox.deleteMultipleServices(param);
        this.subscriptions.push(this.servicesSandBox.serviceMultiDelete$.subscribe(_delete => {
            if (_delete) {
                if (_delete.status === 1) {
                    this.checkedData = [];
                    this.servicesList(this.offset, this.pageSize);
                    this.servicesSandBox.getServiceCount();
                }
            }
        }));

    }

    selectChkBox(event, ServiceId) {
        if (event.target.checked === true) {
            this.checkedData.push(ServiceId);
        }
        if (event.target.checked === false) {
            this.unCheckData.push(ServiceId);
            this.unCheckData.forEach((value, index) => {
                this.checkedData = this.checkedData.filter(_value => {
                    if (value === _value) {
                        return false;
                    } else {
                        return true;
                    }
                });
            });
        }
        this.unCheckData = [];
    }

    exportExcel() {
        const param: any = {};
        param.serviceId = this.checkedData;
        this.servicesSandBox.exportServices(param);
    }

    public deleteServiceList(id) {
        const params: any = {};
        params.serviceId = id;
        this.servicesSandBox.deleteService(params);
        this.subscriptions.push(this.servicesSandBox.getServicesDelete$.subscribe(_delete => {
            if (_delete) {
                if (_delete.status === 1) {
                    this.servicesList(this.offset, this.pageSize);
                    this.servicesSandBox.getServiceCount();
                }
            }
        }));
    }

    serviceImageLoading(id) {
        this.serviceImage[id] = true;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}
