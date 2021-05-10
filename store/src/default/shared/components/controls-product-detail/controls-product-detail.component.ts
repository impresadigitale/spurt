/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { WishlistSandbox } from '../../../../core/wishlist/wishlist.sandbox';
import { CartSandbox } from '../../../../core/cart/cart.sandbox';
import {MatDialog} from '@angular/material/dialog';
import { CartPopupComponent } from '../cart/modal/cart-popup/cart-popup.component';


@Component({
  selector: 'app-controls-product-detail',
  templateUrl: './controls-product-detail.component.html',
  styleUrls: ['./controls-product-detail.component.scss']
})
export class ControlsProductDetailComponent implements OnInit {
  // decorator
  @Input() product: any;
  @Input() quantity: any;
  @Input() show: any;
  @Input() type: string;
  @Input() cartOptionValueArray: any;
  @Input() optionValueArray: any = [];
  @Input() optionNameSelected: any;
  @Input() totalPrice = 0;
  @Output() OpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() emptyDecorator: EventEmitter<any> = new EventEmitter();
  @Output() QuantityChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedOptions: any;
  @Output() setPincodeFocus: EventEmitter<any> = new EventEmitter<any>();

  public count = 1;
  public align = 'center center';
  public isWish = [];
  public products: any;
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));

  // tire price
  public tireQuantityArray: any = [];
  public tirePrice: any = '';
  public pincodeFocus = false;


  constructor(
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public controlSandbox: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    public wishlistSandbox: WishlistSandbox,
    private router: Router, public cartSandBox: CartSandbox,
    public dialog: MatDialog,

  ) {
  }

  ngOnInit() {
    if (this.product) {
      if (this.product.wishListStatus && this.product.wishListStatus === 1) {
        this.isWish[this.product] = 'warn';
      }
      if (this.product.cartCount > 0) {
        this.count = this.product.cartCount;
      }
    }
    this.layoutAlign();
  }

  // align layout based on condition type
  public layoutAlign() {
    if (this.type === 'all') {
      this.align = 'space-between center';
    } else if (this.type === 'wish') {
      this.align = 'start center';
    } else if (this.type === 'detail') {
      this.align = 'start center';
    } else if (this.type === 'home') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }


 // add product to cart

 public addToCart(details, status: boolean = false) {
   if (this.product.pincodeBasedDelivery === 1) {
     if (this.show) {
       if (this.product.stockStatus !== 'outOfStock') {
         this.addToCartMethod(details, status);
       } else {
         return;
       }
     } else {
       this.pincodeFocus = true;

       this.setPincodeFocus.emit(this.pincodeFocus);
     }
   } else {
    if (this.product.stockStatus !== 'outOfStock') {
      this.addToCartMethod(details, status);
    } else {
      return;
    }
   }
 }

 addToCartMethod(details, status) {
 const product = JSON.parse(JSON.stringify(details));
 if (product.hasTirePrice === 1) {
   product.minTireQty = Math.min.apply(Math, this.tireQuantityArray);
   product.tirePrice = this.tirePrice;
 } else {
   product.tirePrice = '';
   product.minTireQty = 0;
 }
 if (this.currentUser) {

   const params: any = {};
    params.productId = product.productId;
    params.quantity = this.quantity;
    params.productPrice = product.price;
    params.tirePrice = this.tirePrice;
    params.varientName = product.variantName;
    params.productVarientOptionId = product.variantId;
    params.skuName = product.skuName;
    params.type = 'new';


   if (product.productOption.length > 0) {
     const tempParams: any = {};
     tempParams.totalOptions = this.totalPrice;
     tempParams.options = product.productOption;
     if (this.optionValueArray.length > 0) {
       const array = [];
       this.optionValueArray.forEach(data => {
         if (data !== null) {
           array.push(data);
         }
       });
       tempParams.optionValueArray = array;
     }
     if (this.selectedOptions.length > 0) {
       const array = [];
       this.selectedOptions.forEach(data => {
         if (data !== null) {
           array.push(data);
         }
       });
       product.selectedOptions = array;
       params.productOptionValueId	= array;
   } else {
     params.productOptionValueId	= [];
   }
     params.optionName = JSON.stringify(tempParams);
     params.optionValueName = '';
   } else {
       params.productOptionValueId	= [];
   }

   this.cartSandBox.doAddToCart(params);
 }
 if (product.optionRequired === 1 && this.optionValueArray.length > 0) {
   const params: any = {};
   params.id = product.productId;
   this.listSandbox.getProductDetailsMandatory(params);
 } else {
   this.products = product;
   const param: any = {};
   param.totalOptions = this.totalPrice;
   product.productCount = this.quantity;
   if (this.optionValueArray.length > 0) {
     const array = [];
     this.optionValueArray.forEach(data => {
       if (data !== null) {
         array.push(data);
       }
     });
     product._optionValueArray = array;
     param._optionValueArray = array;
   } else {
     product._optionValueArray = [];
     param._optionValueArray = [];
   }

   if (this.selectedOptions.length > 0) {
       const array = [];
       this.selectedOptions.forEach(data => {
         if (data !== null) {
           array.push(data);
         }
       });
       product.selectedOptions = array;
   } else {
     product.selectedOptions = [];
   }
   this.controlSandbox.selectedOptions(param);
   product._totalOptions = param.totalOptions;
   this.controlSandbox.addItemsToCart(product, param);
   this.emptyData();
   if (status) {
    this.router.navigate(['/checkout']);
  } else {
    this.viewCartPopup();
  }
 }
}

viewCartPopup() {
  const dialogRef = this.dialog.open(CartPopupComponent, {
    panelClass: 'make-quotation',
    hasBackdrop: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
    }
  });
}

  // clear the decorator optionValueArray value in the product detail component
  public emptyData() {
    this.emptyDecorator.emit('clear');
  }

  // emit the data from open product dialoug component
  public openProductDialog(event) {
    this.OpenProductDialog.emit(event);
  }


  orderNow(detail) {
    if (this.product.pincodeBasedDelivery === 1) {
      if (this.show) {
        if (this.product.stockStatus === 'outOfStock') {
          this.orderNowMethod(detail);
        } else {
          return;
        }
      } else {
        this.pincodeFocus = true;

        this.setPincodeFocus.emit(this.pincodeFocus);
      }
    } else {
     if (this.product.stockStatus === 'outOfStock') {
       this.orderNowMethod(detail);
     } else {
       return;
     }
    }

  }

  /** if product is out of stock, order it */
  orderNowMethod(detail) {
    const param: any = {};
    param.totalOptions = this.totalPrice;
    param._optionValueArray = this.optionValueArray;
    detail.productCount = this.quantity;
    detail._optionValueArray = this.optionValueArray;
    this.controlSandbox.selectedBackorderOptions(param);
    detail._totalOptions = param.totalOptions;
    this.controlSandbox.addTocheckout(detail);
  }

}
