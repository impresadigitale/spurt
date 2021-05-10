import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd} from '@angular/cdk/drag-drop';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  public subOrderStatusId: any;
  public connectedTo: any = [];
  public vendorOrderId: any;
  public currentStatusId: any;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;

  constructor(public orderSandbox: OrderSandbox, public router: Router) {}

  ngOnInit() {
     this.getOrdersList();
  }

  drop(event: CdkDragDrop<string[]>, array) {
    if (event.container) {
      this.subOrderStatusId = Number(event.container.id);
      if (this.subOrderStatusId === this.currentStatusId) {
        return;
      }
      const params: any = {};
      params.subOrderStatusId = this.subOrderStatusId;
      params.vendorOrderId = this.vendorOrderId;
      this.orderSandbox.updateAllOrderListBasedOnStatus(params);
          this.orderSandbox.decreaseOrderCount(this.currentStatusId);
    }
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
  }

  dragEnd($event: CdkDragEnd, item) {
    this.currentStatusId = Number($event.source.dropContainer.id);
    this.vendorOrderId = item.vendorOrderId;
  }


  getOrdersList() {
    const params: any = {};
    params.limit = 4;
    this.orderSandbox.getAllOrderListBasedOnStatus(params);
    this.orderSandbox.allOrderListBasedOnStatus$.subscribe(data => {
      if (data) {
        data.forEach(datas => {
          if (datas) {
              this.connectedTo.push(datas.orderStatusId);
          }
        });
      }
    });
  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], { queryParams: { orderId: id } });
  }
}
