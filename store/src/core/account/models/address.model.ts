/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class AddressModel {
  public address1: string;
  public address2: string;
  public city: string;
  public state: string;
  public postcode: number;
  public addressType: number;
  public addressId: number;
  public countryId: string;
  public company: string;


  constructor(addressreq: any) {
    this.address1 = addressreq.address1 || '';
    this.address2 = addressreq.address2 || '';
    this.addressType = addressreq.addressType || 0;
    this.city = addressreq.city || '';
    this.postcode = addressreq.postcode || 0;
    this.state = addressreq.state || '';
    this.addressId = addressreq.addressId || 0;
    this.countryId = addressreq.countryId || '';
    this.company = addressreq.company || '';
  }
}
