import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CancelOrderComponent } from '../myorders/model/cancel-order/cancel-order.component';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  @ViewChild('todo') todo: ElementRef;

  public pageSize = 5;
  public offset = 0;
  public index = 0;
  public id: any;
  public imageUrl = environment.imageUrl;

  constructor(public sandbox: AccountSandbox,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getOrderList();
    this.getOrderListCount();
  }

  // Get Order List api

  getOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = '';
    params.keyword = '';
    this.sandbox.getOrderList(params);
  }

  // Get Order List Count api

  getOrderListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = 1;
    params.keyword = '';
    this.sandbox.getOrderListCount(params);
  }

  // search

  search(value) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.count = '';
    params.keyword = value;
    this.sandbox.getOrderList(params);
  }

  reset() {
    this.todo.nativeElement.value = '';
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.count = '';
    params.keyword = '';
    this.sandbox.getOrderList(params);
  }

  // download invoice

  downloadInvoice(id) {
    this.id = id;
    this.sandbox.downloadInvoice({orderProductId: id});
  }

  // pagination page change

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this. offset = event.pageIndex * event.pageSize;
    this.getOrderList();
  }

  cancelOrder(list) {
    const dialogRef = this.dialog.open(CancelOrderComponent, {
      width: '60%',
      data: list
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getOrderList();
      }
    });

  }
}
