/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class SitesettingsResponsemodel {
  public metaTagTitle: string;
  public metaTagDescription: string;
  public metaTagKeywords: string;

  constructor(Sitesettingresponse: any) {
    this.metaTagTitle = Sitesettingresponse.metaTagTitle || '';
    this.metaTagDescription = Sitesettingresponse.metaTagDescription || '';
    this.metaTagKeywords = Sitesettingresponse.metaTagKeyword || '';
  }
}
