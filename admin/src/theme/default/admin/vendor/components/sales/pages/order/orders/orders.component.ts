import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbPanelChangeEvent, NgbDropdown, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { OrdersSandbox } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
import { OrdersService } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbDateCustomParserFormatter } from '../../../../../../../../default/admin/shared/components/interface/dateformat';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})

export class OrdersComponent implements OnInit, OnDestroy {

  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public filterShow = false;
  public limit: any;
  public offset: any;
  public customerName: any;
  public startDate: any;
  public endDate: any;
  public displayStartDate: any;
  public displayEndDate: any;
  public current = new Date();
  public maxDate = { year: this.current.getFullYear(), month: this.current.getMonth() + 1, day: this.current.getDate() };
  public count: 0;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public activeOrderId: any;
  public keyword = '';
  public filterForm: FormGroup;
  public isRequired = false;
  private subscriptions: Array<Subscription> = [];

  constructor(public orderService: OrdersService,
    public orderSandbox: OrdersSandbox, public router: Router, public formbuilder: FormBuilder) {
  }


  ngOnInit() {
    this.initFilterForm();
    this.OrdersList();
    this.subscriptions.push(this.orderSandbox.getOrdersList$.subscribe(data => {
      if (data && data.length > 0) {
        this.activeOrderId = data[0]['orderId'];
        this.router.navigate(['/vendors/sales/order/' + this.activeOrderId]);
      } else {
        this.router.navigate(['/vendors/sales/order']);
      }
    }));
  }

  initFilterForm() {
    this.filterForm = this.formbuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  OrdersList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.customerName = this.customerName;
    params.startDate = this.startDate;
    params.endDate = this.endDate;
    params.count = '';
    this.orderSandbox.ordersList(params);
  }

  searchOrder(val) {
    this.customerName = val;
    this.OrdersList();
  }


  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  onDateSelect(event) {
    this.miniDate = event;
    this.dateError = '';
  }

  setMinValue(d) {
    this.isRequired = false;
    if (this.filterForm.controls['fromDate'].value === '' || this.filterForm.controls['fromDate'].value === null) {
      this.dateError = 'Choose From Date First';
      return;
    }

    d.toggle();
  }

  applyFilter() {
    if ((this.filterForm.controls['toDate'].value === '' ||
      this.filterForm.controls['toDate'].value === null)
      && (this.filterForm.controls['fromDate'].value !== '' &&
        this.filterForm.controls['fromDate'].value !== null)) {
      this.isRequired = true;
      return;
    }
    const form = this.filterForm.value.fromDate;
    const to = this.filterForm.value.toDate;
    this.filter = true;
    if (form && form.year) {
      this.startDate = form.year + '-' + form.month + '-' + form.day;
      this.displayStartDate = form.day + '-' + form.month + '-' + form.year;
    }
    if (to && to.year) {
      this.endDate = to.year + '-' + to.month + '-' + to.day;
      this.displayEndDate = to.day + '-' + to.month + '-' + to.year;
    }
    this.dropdown.close();
    this.OrdersList();
  }

  close() {
    this.dropdown.close();
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filter = false;
    this.filterForm.reset();
    this.OrdersList();
  }

  filterDropdown() {
    this.filterShow = true;
  }

  getOrderDetail(id) {
    this.activeOrderId = id;
    this.router.navigate(['/vendors/sales/order/' + this.activeOrderId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
