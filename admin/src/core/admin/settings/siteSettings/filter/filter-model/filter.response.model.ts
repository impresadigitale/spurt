/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class FilterResponseModel {
  public facebook: string;
  public twitter: string;
  public instagram: string;
  public google: string;

  constructor(socialresponse: any) {
    this.facebook = socialresponse.facebook || '';
    this.twitter = socialresponse.twitter || '';
    this.instagram = socialresponse.instagram || '';
    this.google = socialresponse.google || '';
  }
}
