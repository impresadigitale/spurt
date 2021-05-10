import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public orderProductId: any;
  public imageUrl = environment.imageUrl;
  public id: any;

  constructor(public route: ActivatedRoute,
              public sandbox: AccountSandbox) {
                this.route.params.subscribe(data => {
                this.orderProductId = data.id;
               });
    }

  ngOnInit() {
    if (this.orderProductId) {
      this.sandbox.myOrderDetails({orderProductId: this.orderProductId});
    }
  }

  // download invoice

  downloadInvoice(id) {
    this.id = id;
    this.sandbox.downloadInvoice({orderProductId: id});
  }

  calculateTax(type, taxValue, price) {
    switch (type) {
      case 1:
      return Math.round(taxValue);
    case 2:
      const percentToAmount = price * (taxValue / 100);
      return Math.round(percentToAmount);
    }

  }


}
