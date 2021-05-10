/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class OrderslistResponseModel {
  public orderId: number;
  public totalAmount: string;
  public dateAdded: string;
  public keyword: string;
  public shippingFirstName: string;
  public dateModified: string;
  public isActive: number;
  public orderStatus: object;
  public invoicePrefix: string;
  public orderPrefixId: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;

  constructor(responseOrdersListForm: any) {
    this.orderId = responseOrdersListForm.orderId || 0;
    this.totalAmount = responseOrdersListForm.total || '';
    this.dateAdded = responseOrdersListForm.createdDate || '';
    this.keyword = responseOrdersListForm.keyword || '';
    this.shippingFirstName = responseOrdersListForm.shippingFirstname || '';
    this.dateModified = responseOrdersListForm.modifiedDate || '';
    this.isActive = responseOrdersListForm.isActive || 0;
    this.orderStatus = responseOrdersListForm.orderStatus;
    this.invoicePrefix = responseOrdersListForm.invoicePrefix || 'SPU';
    this.orderPrefixId = responseOrdersListForm.orderPrefixId || '';
    this.currencySymbolLeft = responseOrdersListForm.currencySymbolLeft;
    this.currencySymbolRight = responseOrdersListForm.currencySymbolRight;
  }
}
