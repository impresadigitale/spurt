import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { EnquirySandbox } from '../../../../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-brandlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']

})
export class EnquiryListComponent  implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  public pageoffset: any;
  public pagesize: any;
  public manufacturerList = [];
  public length: any;
  public keyword: string;
  public index = 0;
  public selectAllFlag = false;
  public checkedData = [];
  public unCheckData = [];
  @Input() checkAssert;
  public buttonCheck = true;
  private subscription: Array<Subscription> = [];


  constructor(public enquirySandbox: EnquirySandbox, public toastr: ToastrManager) {}

  ngOnInit() {
    this.keyword = '';
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

  getEnquiryCount() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    this.enquirySandbox.serviceEnquiryListCount(params);
  }

  deleteEnquiry(id) {
    this.enquirySandbox.deleteServiceEnquiry({enquiryId: id});
    this.subscription.push(this.enquirySandbox.enquiryDelete$.subscribe(data => {
      if (data && data.status === 1) {
        this.getEnquiryList();
        this.getEnquiryCount();
      }
    }));
  }

  selectChkBox(event, productId) {
    if (event.target.checked === true) {
        this.checkedData.push(productId);
    }
    if (event.target.checked === false) {
        this.unCheckData.push(productId);
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


bulkDelete() {
  const param: any = {};
  param.enquiryId = this.checkedData;
  this.enquirySandbox.deleteMultipleEnquiry(param);
  this.checkedData = [];
  this.subscription.push(this.enquirySandbox.multipleEnquiryDelete$.subscribe(_delete => {
      if (_delete) {
          if (_delete.status === 1) {
              this.getEnquiryList();
              this.getEnquiryCount();
          }
      }
  }));
}

ngOnDestroy() {
  this.subscription.forEach(each => each.unsubscribe());
}
}
