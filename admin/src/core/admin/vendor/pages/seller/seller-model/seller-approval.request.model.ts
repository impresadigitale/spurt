/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ApprovalRequest {


    public vendorId: number;
    public approvalFlag: number;

     constructor(approvalRequest: any) {
         this.vendorId = approvalRequest.vendorId || '';
         this.approvalFlag = approvalRequest.approvalFlag || 1;
     }
 }
