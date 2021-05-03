import { Component, OnInit } from '@angular/core';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';
import { DashboardSandbox } from '../../../../../../core/dashboard/dashboard.sandbox';


@Component({
  selector: 'app-recent-order-list',
  templateUrl: './recent-order-list.component.html',
  styleUrls: ['./recent-order-list.component.scss']
})
export class RecentOrderListComponent implements OnInit {

  public limit = 10;
  public offset = 0;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  public imageUrl = environment.imageUrl;

  constructor(public orderSandbox: OrderSandbox, public router: Router,
             public dashboardSandbox: DashboardSandbox) { }

  ngOnInit() {
      this.getOrderList();
  }

// get recent order list event
  getOrderList() {
      const params: any = {};
      params.limit = this.limit;
      params.offset = this.offset;
      this.dashboardSandbox.getOrderList(params);
  }

  viewAll() {
     this.router.navigate(['/orders/all-orders']);
  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], { queryParams: { orderId: id } });
  }

  calculateTotal(total, discount) {
    return (+total) - (+discount);
  }

}
