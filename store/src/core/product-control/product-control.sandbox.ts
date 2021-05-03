/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authAction from './action/product-control.action';
import * as store from '../state.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  getCartList,
  getCartListCount,
  getCheckedOutData,
  getCheckoutFailed,
  getCheckoutLoaded,
  getCheckoutLoading,
  getTotalCartPrice,
  getOptionsAvailable,
  paymentMode,
  wishListLoading,
  getCheckProductAvailabilityData,
  getCheckProductAvailabilityFailed,
  getCheckProductAvailabilityLoaded,
  getCheckProductAvailabilityLoading, getApplyCouponFailed, getApplyCouponLoaded, getApplyCouponLoading, getApplyCoupon,
  backorderCheckout,
  backorderCheckoutLoading,
  backorderCheckoutLoaded,
  backorder,
  backorderProduct,
  backorderTotal,
  makeQuatation,
  makeQuatationLoading,
  makeQuatationLoaded,
} from './reducer/product-control.selector';
import { CheckoutModel } from './models/checkout.model';
import { ProductAvailabilityModel } from './models/product-availability.model';
import { BackorderCheckoutModel } from './models/backorder-checkout.model';
@Injectable()
export class ProductControlSandbox {
  public cartlist$ = this.appState$.select(getCartList);
  public cartlistCount$ = this.appState$.select(getCartListCount);
  public totalCartPrice$ = this.appState$.select(getTotalCartPrice);
  public checkedOutData$ = this.appState$.select(getCheckedOutData);
  public optionsAvailable$ = this.appState$.select(getOptionsAvailable);

  public checkoutLoading$ = this.appState$.select(getCheckoutLoading);
  public checkoutLoaded$ = this.appState$.select(getCheckoutLoaded);
  public checkoutFailed$ = this.appState$.select(getCheckoutFailed);

  public productAvailabilityData$ = this.appState$.select(
    getCheckProductAvailabilityData
  );
  public productAvailabilityLoading$ = this.appState$.select(
    getCheckProductAvailabilityLoading
  );
  public productAvailabilityLoaded$ = this.appState$.select(
    getCheckProductAvailabilityLoaded
  );
  public productAvailabilityFailed$ = this.appState$.select(
    getCheckProductAvailabilityFailed
  );
  public applyCouponData$ = this.appState$.select(
    getApplyCoupon
  );
  public applyCouponDataLoading$ = this.appState$.select(
    getApplyCouponLoading
  );
  public applyCouponDataLoaded$ = this.appState$.select(
    getApplyCouponLoaded
  );
  public applyCouponDataFailed$ = this.appState$.select(
    getApplyCouponFailed
  );


  public backorderCheckout$ = this.appState$.select(backorderCheckout);
  public backorderCheckoutLoading$ = this.appState$.select(backorderCheckoutLoading);
  public backorderCheckoutLoaded$ = this.appState$.select(backorderCheckoutLoaded);

  public paymentMode$ = this.appState$.select(paymentMode);
  public wishlistLoading$ = this.appState$.select(wishListLoading);

  public backorder$ = this.appState$.select(backorder);
  public backorderProduct$ = this.appState$.select(backorderProduct);
  public backorderTotal$ = this.appState$.select(backorderTotal);

  public makeQuatation$ = this.appState$.select(makeQuatation);
  public makeQuatationLoading$ = this.appState$.select(makeQuatationLoading);
  public makeQuatationLoaded$ = this.appState$.select(makeQuatationLoaded);


  selectedProducts: any[] = [];
  cartTotal = 0;
  productTotal: any;
  backorderTotal: any;
  changeCountTotalPrice = 0;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
 
    this.productTotal = 0;
    this.completeOrder();
    if (isPlatformBrowser(this.platformId)) {
      const cartParams: any = {};
      cartParams.productTotal = sessionStorage.getItem('selectedProductsCount')
        ? +JSON.parse(sessionStorage.getItem('selectedProductsCount'))
        : 0;
      cartParams.totalPrice = sessionStorage.getItem('productTotal')
        ? +JSON.parse(sessionStorage.getItem('productTotal'))
        : 0;
      cartParams.products = sessionStorage.getItem('selectedProducts')
        ? JSON.parse(sessionStorage.getItem('selectedProducts'))
        : [];
      this.HandleCart(cartParams);
    }
    if (isPlatformServer(this.platformId)) {
    }
  }

  /*  addToWishlist  */
  public addToWishlist(params): void {
    this.appState$.dispatch(new authAction.AddtoWishlist(params));
  }
  /*  get payment setting  */
  public getPaymentSettings(params): void {
    this.appState$.dispatch(new authAction.GetPaymentSettings(params));
  }
  /*  totalOptionsSelected  */

  public totalOptionsSelected(params): void {
    this.appState$.dispatch(new authAction.AavailableOptionsAction(params));
  }

  /*  selectedOptions  */

  public selectedOptions(params): void {
    this.appState$.dispatch(new authAction.SelectedOptionsAction(params));
  }

  /*  selected backorder Options  */

  public selectedBackorderOptions(params): void {
    this.appState$.dispatch(new authAction.SelectedBackorderOptionsAction(params));
  }


   /**
   * add selected item to cart
   *
   * @param item product detail to be added to cart
   */
  addItemsToCart(item, param) {

    const id: any = item.productId;
    const id_totalOptions: any = param.totalOptions;
    let exists = false;
    this.getSessionData();

    this.selectedProducts = this.selectedProducts.map(_items => {
      const optionSelectedSame = JSON.stringify(_items.selectedOptions) === JSON.stringify(item.selectedOptions);

      if (
        _items.productId === item.productId && _items.skuName === item.skuName
      ) {
        exists = true;
        if (item.productCount) {
          if (item.hasStock === 1) {
            const quantity = _items.productCount + item.productCount;
            if (quantity >= _items.minQuantityAllowedCart && quantity <= _items.maxQuantityAllowedCart) {
              _items.productCount += item.productCount;
              this.cartTotal += item.productCount;
            } else {
            }
          } else {
            _items.productCount += item.productCount;
            this.cartTotal += item.productCount;
          }
        } else {
          _items.productCount += 1;
          this.cartTotal += 1;
        }
      }
      return _items;
    });

    if (!exists) {
      this.selectedProducts.push(item);
      if (!item.productCount) {
        item.productCount = 1;
      }
      this.cartTotal += item.productCount;
    }
    this.calculateCartTotalPrice();
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    const availableData: any = {};
    availableData.options = param.totalOptions;
    cartParams.totalPrice = this.productTotal;
    this.snackBar.open(
      'Product ' + item.name + ' is successfully added to cart',
      '×',
      {
        panelClass: 'success',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      }
    );
    this.changeCountTotalPrice = cartParams.totalPrice;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(this.changeCountTotalPrice)
      );
    }
    this.totalOptionsSelected(availableData);
    this.HandleCart(cartParams);
  }

   /**
   * add selected item to cart from database
   *
   * @param item product detail to be added to cart
   */
  addItemsToCartFromDatabase(item, param) {
    const id: any = item.productId;
    const id_totalOptions: any = param.totalOptions;
    let exists = false;
    this.getSessionData();

    this.selectedProducts = this.selectedProducts.map(_items => {
      if (
        _items.productId === item.productId && _items.skuName === item.skuName
      ) {
        exists = true;
      }
      return _items;
    });

    if (!exists) {
      this.selectedProducts.push(item);
      if (!item.productCount) {
        item.productCount = 1;
      }
      this.cartTotal += item.productCount;
    }
    this.calculateCartTotalPrice();

    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    const availableData: any = {};
    availableData.options = param.totalOptions;
    cartParams.totalPrice = this.productTotal;
    this.changeCountTotalPrice = cartParams.totalPrice;

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(this.changeCountTotalPrice)
      );
    }
    this.totalOptionsSelected(availableData);
    this.HandleCart(cartParams);
  }

  /**
   * remove selected item to cart
   *
   * @param item product detail to be remove to cart
   */
  removeItemFromCart(item) {
    this.productTotal = 0;
    let total = 0;
    this.getSessionData();
    let deletedCount: any = 0;
    this.selectedProducts = this.selectedProducts.filter(_items => {
      if (_items.productId === item.productId && _items.skuName === item.skuName) {
        deletedCount = _items.productCount;
        return false;
      }
      return true;
    });
    this.cartTotal -= deletedCount;
    if (Math.sign(this.cartTotal)  === -1) {
      this.cartTotal = 0;
    }
    // this.productTotal = 0;
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      this.selectedProducts.forEach(_price => {
        let tempPrice = 0;
        if (_price.tirePrice) {
          tempPrice = Number(_price.tirePrice) + _price._totalOptions;
        } else if (_price.pricerefer) {
          tempPrice = Number(_price.pricerefer) + _price._totalOptions;
        } else {
          tempPrice = Number(_price.price) + _price._totalOptions;
        }
        switch (_price.taxType) {
          case 1:
            const priceWithOutTax = +tempPrice + _price.taxValue;
            tempPrice = Math.round(priceWithOutTax);
            break;
          case 2:
            const percentToAmount = tempPrice * (_price.taxValue / 100);
            const priceWithTax = +tempPrice + percentToAmount;
            tempPrice = Math.round(priceWithTax);
            break;
        }

        total = (tempPrice * _price.productCount) + total;
        this.productTotal = total;
        this.productTotal = +this.productTotal.toFixed(2);
      });
    } else {
      this.productTotal = 0;
    }
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    cartParams.totalPrice = this.productTotal;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(this.productTotal)
      );
    }
    this.HandleCart(cartParams);
  }

  /**
   * increase or decrease product count from cart
   *
   * @param product product detail to be remove to cart
   * @param operation increase or decrease
   */
  ChangeCount(product, operation) {
    this.getSessionData();
    if (operation) {
      this.selectedProducts = this.selectedProducts.map(_items => {
        const optionSelectedSame = JSON.stringify(_items.selectedOptions) === JSON.stringify(product.selectedOptions);

        if (
          _items.productId === product.productId && _items.skuName === product.skuName
        ) {
          _items.productCount += 1;
          this.cartTotal += 1;
        }
        if (product.productId === _items.productId) {
          _items.tirePrice = product.tirePrice;
        }
        return _items;
      });
      this.calculateCartTotalPrice();
    } else if (!operation) {
      if (product.productCount > 1) {
        this.selectedProducts = this.selectedProducts.map(_items => {

          if (
            _items.productId === product.productId && _items.skuName === product.skuName
          ) {
            _items.productCount -= 1;
            this.cartTotal -= 1;
          }
          if (product.productId === _items.productId) {
            _items.tirePrice = product.tirePrice;
          }
          return _items;
        });
        this.calculateCartTotalPrice();
      } else if (product.productCount === 1 || product.quantity === 1) {
        this.cartTotal -= 1;
        this.selectedProducts = this.selectedProducts.filter(_items => {
          if (
            _items.productId === product.productId && _items.skuName === product.skuName
          ) {
            return false;
          } else {
            return true;
          }
        });
        let tempPrice = 0;
        if (product.tirePrice) {
          tempPrice = Number(product.tirePrice) + product._totalOptions;
        } else if (product.pricerefer !== '') {
          tempPrice = product._totalOptions + product.pricerefer;
        } else {
          tempPrice = +(
            product._totalOptions + product.price
          ).toFixed(2);
        }
        switch (product.taxType) {
          case 1:
            const priceWithOutTax = +tempPrice + product.taxValue;
            tempPrice = Math.round(priceWithOutTax);
            break;
          case 2:
            const percentToAmount = tempPrice * (product.taxValue / 100);
            const priceWithTax = +tempPrice + percentToAmount;
            tempPrice = Math.round(priceWithTax);
            break;
        }
        this.productTotal -= tempPrice;
        this.productTotal = +this.productTotal.toFixed(2);
      }
    }
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    if (Math.sign(this.cartTotal) === -1) {
      this.cartTotal = 0;
    }
    cartParams.productTotal = this.cartTotal;
    cartParams.totalPrice = this.productTotal;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(cartParams.totalPrice)
      );
      this.HandleCart(cartParams);
    }
  }

  // calculate overall total while increase and decrease product count

  public addItems() {
    this.productTotal = 0;
    let total: any = 0;

    this.selectedProducts.map(data => {
      let tempPrice = 0;
      if (data.tirePrice !== '') {
        const numberPricerefer: any = +parseFloat(data.tirePrice).toFixed(2);
        tempPrice = numberPricerefer + data._totalOptions;
        if (tempPrice < 0) {
          tempPrice = tempPrice / -1;
        }
      } else if (data.pricerefer && data.pricerefer !== '') {
        const numberPricerefer: any = +parseFloat(data.pricerefer).toFixed(2);
        tempPrice = numberPricerefer + data._totalOptions;
        if (tempPrice < 0) {
          tempPrice = tempPrice / -1;
        }
      } else {
        const numberPrice: any = +parseFloat(data.price).toFixed(2);
        tempPrice = numberPrice + data._totalOptions;
        if (tempPrice < 0) {
          tempPrice = tempPrice / -1;
        }
      }
      switch (data.taxType) {
        case 1:
          const priceWithOutTax = +tempPrice + data.taxValue;
          tempPrice = Math.round(priceWithOutTax);
          break;
        case 2:
          const percentToAmount = tempPrice * (data.taxValue / 100);
          const priceWithTax = +tempPrice + percentToAmount;
          tempPrice = Math.round(priceWithTax);
          break;
      }

      total = (tempPrice * data.productCount) + total;
      this.productTotal = total;
      this.productTotal = +this.productTotal.toFixed(2);
    });

  }

   // get tire price

   getTirePrice(product) {
    if (product.hasTirePrice === 1) {
      if (product.isSimplified === 0) {
        if (product.variantTirePrice && product.variantTirePrice.length > 0) {
          let isMatched = false;
          if (product.productCount >= product.minTireQty) {
              product.variantTirePrice.forEach(data => {
                if (data.quantity === product.productCount) {
                  product.tirePrice = data.price;
                  isMatched = true;
                }
              });
              if (!isMatched) {
                const result = this.getClosest(product.variantTirePrice, product.productCount);
                const resultObj = product.variantTirePrice.find(_list => _list.quantity === result);
                product.tirePrice = resultObj.price;
              }
          } else {
            product.tirePrice = '';
          }
        } else {
          product.tirePrice = '';
        }

      } else {
        if (product.productTirePrices && product.productTirePrices.length > 0) {
          let isMatched = false;
          if (product.productCount >= product.minTireQty) {
              product.productTirePrices.forEach(data => {
                if (data.quantity === product.productCount) {
                  product.tirePrice = data.price;
                  isMatched = true;
                }
              });
              if (!isMatched) {
                const result = this.getClosest(product.productTirePrices, product.productCount);
                const resultObj = product.productTirePrices.find(_list => _list.quantity === result);
                product.tirePrice = resultObj.price;
              }
          } else {
            product.tirePrice = '';
          }
        } else {
          product.tirePrice = '';
        }
      }
  }
  }

  getClosest(list, qty) {
    return qty - list.reduce(function(closest, v) {
        return qty >= v.quantity ? Math.min(qty - v.quantity, closest) : closest;
    }, 1e100);
  }

  getMinQty(product) {
    if (product.isSimplified === 0) {
      const array = [];
      if (product.variantTirePrice && product.variantTirePrice.length > 0) {
        product.variantTirePrice.forEach(data => {
          if (data) {
            array.push(data.quantity);
          }
        });
        product.minTireQty = Math.min.apply(Math, array);
      }
    } else {
      const array = [];
      if (product.productTirePrices.length > 0) {
        product.productTirePrices.forEach(data => {
          if (data) {
            array.push(data.quantity);
          }
        });
        product.minTireQty = Math.min.apply(Math, array);
      }
    }

  }


  // this will trigger click add to cart button and reresh the page

  calculateCartTotalPrice() {
    this.productTotal = 0;
    let totalValue = 0;
    this.selectedProducts.forEach(_price => {
      if (_price.hasTirePrice === 1) {
        this.getMinQty(_price);
        this.getTirePrice(_price);
      }
      let tempPrice = 0;
      if (_price.tirePrice !== '') {
        const numberPricerefer: any = +_price.tirePrice;
        tempPrice = numberPricerefer + _price._totalOptions;

      } else if (_price.pricerefer) {

        const numberPricerefer: any = +_price.pricerefer;
        tempPrice = numberPricerefer + _price._totalOptions;

      } else {
        const numberPrice: any = +_price.price;
        tempPrice = numberPrice + _price._totalOptions;

      }
      switch (_price.taxType) {
        case 1:
          const priceWithOutTax = +tempPrice + _price.taxValue;
          tempPrice = Math.round(priceWithOutTax);
          break;
        case 2:
          const percentToAmount = tempPrice * (_price.taxValue / 100);
          const priceWithTax = +tempPrice + percentToAmount;
          tempPrice = Math.round(priceWithTax);
          break;
      }

      totalValue = (tempPrice * _price.productCount) + totalValue;
      this.productTotal = totalValue;
      this.productTotal = +this.productTotal.toFixed(2);
  });
  }


  /**
   * Add Product to back order checkout, if product is out of stock
   */

  addTocheckout(product) {
    this.backorderTotal = 0;
        let tempPriceSingle = 0;
        if (product.pricerefer) {
          const numberPricerefer: any = +product.pricerefer;
          tempPriceSingle = numberPricerefer + product._totalOptions;

        } else {
          const numberPrice: any = +product.price;
          tempPriceSingle = numberPrice + product._totalOptions;

        }
        switch (product.taxType) {
          case 1:
            const priceWithOutTax = +tempPriceSingle + product.taxValue;
            tempPriceSingle = Math.round(priceWithOutTax);
            break;
          case 2:
            const percentToAmount = tempPriceSingle * (product.taxValue / 100);
            const priceWithTax = +tempPriceSingle + percentToAmount;
            tempPriceSingle = Math.round(priceWithTax);
            break;
        }
        this.backorderTotal = tempPriceSingle * product.productCount + this.backorderTotal;
        const params: any = {};
        params.products = product;
        params.totalPrice = this.backorderTotal;
        this.HandleBackorderCheckout(params);
        this.router.navigate(['/stock-checkout']);
    }


  /**
   * clear all products from cart
   */
  clearCart() {
    const cartParams: any = {};
    cartParams.products = [];
    cartParams.productTotal = 0;
    cartParams.totalPrice = 0;
    cartParams.changeCountTotalPrice = 0;
    this.HandleCart(cartParams);
  }

  /**
   * handle cart cart
   * @param params product detail
   */
  HandleCart(params) {

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('productTotal', JSON.stringify(params.totalPrice));
      sessionStorage.setItem(
        'selectedProducts',
        JSON.stringify(params.products)
      );
      sessionStorage.setItem(
        'selectedProductsCount',
        JSON.stringify(params.productTotal)
      );
    }
    this.appState$.dispatch(new authAction.CartHandleAction(params));
  }

  HandleBackorderCheckout(params) {
    sessionStorage.setItem('backorderTotal', JSON.stringify(params.totalPrice));
    sessionStorage.setItem(
      'backorderProduct',
      JSON.stringify(params.products)
    );
    this.appState$.dispatch(new authAction.HandleBackorderAction(params));

  }


  /**
   * do checkout products
   */
  PlaceOrder(params) {
    this.appState$.dispatch(
      new authAction.DoCheckoutAction(new CheckoutModel(params))
    );
  }


  /** do back order checkout product */

  placeBackorderProduct(params) {
    this.appState$.dispatch(
      new authAction.DoBackorderCheckoutAction(new BackorderCheckoutModel(params)));
  }

  /**
   * get session data from session storage
   */
  public getSessionData() {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedProducts = sessionStorage.getItem('selectedProducts')
        ? JSON.parse(sessionStorage.getItem('selectedProducts'))
        : [];
      const cartTotal = sessionStorage.getItem('selectedProducts')
        ? +sessionStorage.getItem('selectedProductsCount')
        : 0;
      this.cartTotal = cartTotal;
      const productTotal = sessionStorage.getItem('productTotal')
        ? +parseFloat(sessionStorage.getItem('productTotal')).toFixed(2)
        : 0;
      this.productTotal = productTotal;
    }
  }

  /**
   * subscribe checkout status events
   */
  completeOrder() {
    this.checkedOutData$.subscribe(data => {
      if (data) {
        if (data.orderId) {
          this.router.navigate(['/checkout/success', data.orderPrefixId]);
          const params: any = {};
          params.products = [];
          params.productTotal = 0;
          params.totalPrice = 0;
          this.HandleCart(params);
        }
      }
    });

    this.backorderCheckout$.subscribe(data => {
      if (data) {
        if (data.orderId) {
          this.router.navigate(['/checkout/success', data.orderPrefixId]);
          sessionStorage.removeItem('backorderProduct');
          sessionStorage.removeItem('backorderTotal');
          this.clearBackorderCheckout();

        }
      }
    });
  }


  clearBackorderCheckout() {
    this.appState$.dispatch(
      new authAction.ClearBackorderCheckoutAction()
    );
  }
  /**
   * check product availability
   */
  CheckProductAvailability(params) {
    this.appState$.dispatch(
      new authAction.CheckProductAvailability(
        new ProductAvailabilityModel(params)
      )
    );
  }
  /**
 * apply coupon
 */
  ApplyCoupon(params) {
    this.appState$.dispatch(
      new authAction.ApplyCoupon(
        params
      )
    );
  }



  // make quatation

  makeQuatation(params) {
    this.appState$.dispatch(
      new authAction.MakeQuatationAction(
        params
      )
    );
  }
}
