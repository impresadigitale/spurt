/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class MediauploadForm {
  public image: String;
  public path: string;

  constructor(mediaupload: any) {
    this.image = mediaupload.image || '';
    this.path = mediaupload.path || '';
  }
}
