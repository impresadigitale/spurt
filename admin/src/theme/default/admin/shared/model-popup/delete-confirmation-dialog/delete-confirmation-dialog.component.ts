/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerSandbox } from '../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { VendorProductSandbox } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],

})
export class DeleteConfirmationDialogComponent implements OnInit {
  key: any;
  id: number;
  constructor(public activeModal: NgbActiveModal, public sellerSandbox: SellerSandbox, public productSandbox: VendorProductSandbox) {}

  ngOnInit() {
  }
  // modal close event
  close() {
     this.activeModal.close();
  }
  deleteContent() {
    if (this.key === 'vendor') {
      this.sellerSandbox.deleteSeller({ vendorId: this.id });
          this.sellerSandbox.deleteLoaded$.subscribe(_delete => {
            if (_delete === true) {
              this.activeModal.close('deleted');
             }
          });
    }
    if (this.key === 'product') {
      this.productSandbox.doProductDelete({ productId: this.id});
        this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
          if (_delete === true) {
            this.activeModal.close('deleted');
          }
        });
    }
  }
}
