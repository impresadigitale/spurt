/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class OrderHistoryResponseModel {
  public createdDate: string;
  public orderId: string;
  public total: number;
  public orderStatusId: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;

  constructor(historyResponse: any) {
    this.createdDate = historyResponse.createdDate || '';
    this.orderId = historyResponse.orderId || '';
    this.orderStatusId = historyResponse.orderStatusId || '';
    this.total = historyResponse.total || 0;
    this.currencySymbolLeft = historyResponse.currencySymbolLeft;
    this.currencySymbolRight = historyResponse.currencySymbolRight;
  }
}
