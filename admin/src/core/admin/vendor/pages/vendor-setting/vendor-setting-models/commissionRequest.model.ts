/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CommissionRequest {
    public commission: Number;
    public vendorId: Number;
    constructor(commissionRequest: any) {
        this.commission = commissionRequest.defaultCommission;
        this.vendorId = commissionRequest.vendorId;
    }
  }
