import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { EnquirySandbox } from '../../../../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-leads-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']

})
export class LeadsListComponent implements OnInit {

    @ViewChild('paginator') paginator: MatPaginator;


    public pageoffset: any;
    public pagesize: any;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public manufacturerList: any = [];
    public length: any;
    public index = 0;
    public keyword = '';
    public selectAllFlag = false;
    @Input() checkAssert: any = [];
    public buttonCheck = true;

    constructor(public enquirySandbox: EnquirySandbox) {}

    ngOnInit() {
        this.getEnquiryList();
    }

    changeFilter(event) {
        this.buttonCheck = event.target.checked;
    }

    getEnquiryList() {
        const params: any = {};
        params.limit = this.pagesize;
        params.offset = this.pageoffset;
        params.keyword = this.keyword;
        this.enquirySandbox.serviceEnquiryList(params);
        this.getEnquiryCount();

    }

    getEnquiryCount() {
        const params: any = {};
        params.count = 1;
        params.keyword = this.keyword;
        this.enquirySandbox.serviceEnquiryListCount(params);
    }

    onPageChange(event: any) {
        this.pagesize = event.pageSize;
        this.index = event.pageIndex;
        this.pageoffset = event.pageSize * event.pageIndex;
        this.getEnquiryList();
    }

    receiveProgress(event) {
        this.index = 0;
        this.keyword = event.keyword;
        this.pageoffset = 0;
        this.paginator.firstPage();
        this.getEnquiryList();
        this.getEnquiryCount();
    }
}
