import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { OrdersSandbox } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from '../../../../../../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-vendor-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {


  public orderId: any;
  public orderDetail: any;
  public ImageUrl: any = '';
  public productDetails: any;
  private subscriptions: Array<Subscription> = [];
  public downloadStart = false;


  constructor(public orderSandbox: OrdersSandbox, public layoutSandbox: LayoutSandbox, public configService: ConfigService, public route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      if (data) {
        this.orderId = data.id;
        this.getOrderDetail();
      }
    });
    this.subscriptions.push(this.orderSandbox.getOrderDetail$.subscribe(datas => {
      if (datas) {
        this.orderDetail = datas;
        this.productDetails = datas.productList[0];
        this.getOrderLogList();
        this.getOrderStatusList();
      }
    }));
  }

  ngOnInit() {
    this.ImageUrl = this.configService.getImageUrl();
  }

  changeStatus(statusId, orderId) {
    const params: any = {};
    params.orderId = orderId;
    params.orderStatusId = statusId;
    this.orderSandbox.orderStatusChange(params);
    this.orderSandbox.getOrderStatusChangeLoaded$.subscribe(data => {
      if (data === true) {
        this.getOrderDetail();
      }
    });
  }

  getOrderDetail() {
    const params: any = {};
    params.orderId = this.orderId;
    this.orderSandbox.orderDetail(params);
  }

  downloadInvoice(list) {
    const params: any = {};
    params.orderId = this.orderId;
    params.vendorId = list.vendorId;
    params.orderPrefixId = this.orderDetail.orderPrefixId;
    this.orderSandbox.downloadInvoice(params);
  }

  viewDetail(details) {
    this.productDetails = details;
    this.getOrderLogList();
  }

  getOrderLogList() {
    const params: any = {};
    params.vendorOrderId = this.productDetails.vendorOrderId;
    this.orderSandbox.ordersLogList(params);
  }

  getOrderStatusList() {
    const params: any = {};
    this.orderSandbox.ordersStatusList(params);
  }

  changePayment() {
    const params: any = {};
    params.orderId = this.orderId;
    params.paymentStatusId	= 1;
    this.layoutSandbox.getChangePayment(params);
    this.layoutSandbox.changePaymentLoaded$.subscribe(data => {
      if (data === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.orderDetail(param);
      }
    });
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
