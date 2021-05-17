/*
 * spurtcommerce
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../core/service/config.service';
import { Subscription } from 'rxjs';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { MakeQuatationComponent } from '../modal/make-quatation/make-quatation.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {

  // decorator
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  // configuration
  public config: SwiperConfigInterface = {};
  public configuration: SwiperConfigInterface = {};
  public product: any;
  // images
  public imageObject: Array<object>;
  public image: any;
  public zoomImage: any;
  public zoomPopupImage: any;
  public imagePath: string;
  public productImageId: number;
  // related product data
  public relatedProducts: Array<any>;

  // route params
  private sub: any;
  private id: any;
  public radioValue: any = 'jh';
  public totalPrice = 0;
  public removeData = [];
  public removePrefix = [];

  // available options
  public optionNameSelected: any = [];
  public cartOptionValueArray: any = [];
  public optionNames: any = [];
  public optionValueArray: any = [];
  public previousValueRadio = '';
  public previousValueDropdown = [];
  public oneTimePush = 'enter';
  public oneTimePushValue = 'enter';
  public deleteArray = false;
  public modeSelect = [];
  public totalProductPrice: number;
  public productPriceTag: number;
  public previousPriceTag: number;
  public tempPriceRefer: number;
  public templateHidden: number;
  public productDetails: any = {};
  public productId: any;
  public pinCode: any;
  public checkPinCode = false;
  public pinCodeError = false;

  // subcription
  private subscriptions: Array<Subscription> = [];
  public isActive = [];
  public user: any;
  public pincodeBasedDelivery = 0;
  public tireBasePrice: any;
  public currentUser: any;

  // default quantity for count change
  public quantity: any = 1;

   // tire price
   public tireQuantityArray: any = [];
   public tirePrice: any = '';
   public currency: any;

  // pushed option value id in this array(unique id)
  public selectedOptions: any = [];
  public selectedOptionsName: any = [];
  public variantDetails = [];


  constructor(
    public listSandbox: ListsSandbox,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public productDetail: ListsSandbox,
    public productControlSandbox: ProductControlSandbox,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = true;
        window.scrollTo(0, 0);
      }
    });
  }

  slides = [
    {img: "https://via.placeholder.com/600.png/09f/fff"},
    {img: "https://via.placeholder.com/600.png/021/fff"},
    {img: "https://via.placeholder.com/600.png/321/fff"},
    {img: "https://via.placeholder.com/600.png/422/fff"},
    {img: "https://via.placeholder.com/600.png/654/fff"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  } 
  
  /** Initially initialize getProductdetail,getRelatedProducts when subscribed
   * subscribe productDetails$ and set initially default values for required options **/
  ngOnInit() {

  
    this.currency = JSON.parse(localStorage.getItem('currency'));
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('storeUser'));
    }

    this.imagePath = this.configService.getImageUrl();
    // subscribe route params and trigger selected product detail, related products
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getProductdetail();
      this.getBannerList();
      this.getRelatedProducts();
      this.getProductRatings();
    });
    this.subcribeProductDetails();
  }

  public getTodayDealList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.sku = '';
    this.listSandbox.getTodayDealList(params);
}

  public subcribeProductDetails() {
    this.optionValueArray = [];
    this.optionNameSelected = [];
    this.tireQuantityArray = [];
    this.subscriptions.push(
      this.productDetail.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.optionValueArray = [];
          this.optionNameSelected = [];
          this.tireQuantityArray = [];
          this.productDetails = data;
          this.product = data;
          if (this.product.hasTirePrice === 1) {
            if (this.product.isSimplified === 0) {
              if (this.product.variantTirePrice.length > 0) {
                this.product.variantTirePrice.forEach(each => {
                  if (each) {
                    this.tireQuantityArray.push(each.quantity);
                  }
                });
              }

            } else {
              if (this.product.productTirePrices.length > 0) {
                this.product.productTirePrices.forEach(each => {
                  if (each) {
                    this.tireQuantityArray.push(each.quantity);
                  }
                });
              }
            }
          }
          if (this.product.isSimplified === 0) {
            this.generateVariant();
          }
          if (this.product.hasStock === 1) {
            if (this.product.minQuantityAllowedCart > 0) {
             this.quantity = this.product.minQuantityAllowedCart;
             this.tirePriceCalculation();
            }
         }
          if (data.tirePrice !== '') {
            const tempTirePriceTag = parseFloat(data.tirePrice);
            this.tireBasePrice = tempTirePriceTag;
          } else if (data.pricerefer) {
            const tempProductPriceTag = parseFloat(data.pricerefer);
            this.productPriceTag = tempProductPriceTag;
            this.tempPriceRefer = tempProductPriceTag;
            this.templateHidden = this.productPriceTag;
          } else {
            const tempProductPriceTag = parseFloat(data.price);
            this.productPriceTag = tempProductPriceTag;
            this.tempPriceRefer = tempProductPriceTag;
          }
          setTimeout(() => {
            this.changeDetectRef.detectChanges();
          }, 500);
        }
      })
    );
  }

  changeVariant(event: any) {
    this.productDetail.updateProductDetails(event);
    this.quantity = 1;
  }

  generateVariant() {
    const variantDetails = [];
    if (this.productDetails.productVariant && this.productDetails.productVariant.length > 0) {
        this.productDetails.productVariant.forEach((variant: any) => {
          const temp = variant;
          variantDetails.push(variant);
        });
    }
    this.variantDetails = variantDetails;
  }

  checkSelectedVariant(valueId) {
    if (this.productDetails.productVariantDetail && this.productDetails.productVariantDetail.length > 0) {
      const filterValue = this.productDetails.productVariantDetail.filter((result) => result.varientsValueId === valueId);
      if (filterValue && filterValue.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // calls getRelatedProducts with param
  getRelatedProducts() {
    const params: any = {};
    params.productId = this.id;
    this.productDetail.getRelatedProducts(params);
  }

  // fetch banner list from sandbox
  getBannerList() {
    const params: any = {};
    params.limit = 100;
    params.offset = 0;
    this.productDetail.getBannerList(params);
  }

  // calls getProductRating in sandbox with param
  getProductRatings() {
    const params: any = {};
    params.productId = this.id;
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.productDetail.getProductRating(params);
  }

  /**
   * calls productDetail getProductDetails with param.Then subscribe productDetail productDetails$
   *
   * Then store the image path  and image name in the array.
   * **/

  getProductdetail() {
    const params: any = {};
    params.id = this.id;
    this.productDetail.getProductDetails(params);
    this.subscriptions.push(
      this.productDetail.productDetails$.subscribe(detail => {
        if (detail) {
          this.productId = detail.productId;
        }
        if (detail && detail.productImage.length > 0) {
          const imageLength = detail.productImage.length;
          this.isActive = [];
          this.isActive[detail.productImage[0].productId] = true;
          for (let i = 0; i < imageLength; i++) {
            if (detail.productImage[i].defaultImage === 1) {
              this.productImageId = detail.productImage[i].productId;
              this.image =
                this.imagePath + '?path=' +
                detail.productImage[i].containerName + '&name=' +
                detail.productImage[i].image +
                '&width=390&height=390';
              this.zoomPopupImage = this.image;
              this.zoomImage =
                '"' + this.imagePath + '?path=' +
                detail.productImage[i].containerName + '&name=' +
                detail.productImage[i].image +
                '&width=660&height=660' + '"';
              setTimeout(() => {
                this.config.observer = true;
                this.changeDetectRef.detectChanges();
              }, 500);
            }
          }
        }
      })
    );
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      direction: 'vertical',
      autoHeight: true,
      autoplay: true,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      grabCursor: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        }
      }
    };
    this.configuration = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      grabCursor: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: false,
      watchSlidesVisibility: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        }
      }
    };
  }

  public selectImage(image, i) {
    this.productImageId = image.productId;
    this.isActive = [];
    this.isActive[image.productId] = true;
    this.image =
      this.imagePath + '?path=' +
      image.containerName + '&name=' +
      image.image +
      '&width=390&height=390';
    this.changeDetectRef.detectChanges();
    this.zoomPopupImage = this.image;
    this.zoomImage =
      '"' + this.imagePath + '?path=' +
      image.containerName + '&name=' +
      image.image +
      '&width=660&height=660' + '"';
  }

  // zoom the image when mouse got moved over the image
  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      let image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = (offsetX / image.offsetWidth) * 100;
      y = (offsetY / image.offsetHeight) * 100;
      if (this.zoomImage) {
        zoomer = this.zoomViewer.nativeElement.children[0];
      }
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  // event when mouse clicked to zoom the image
  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  // open pop to view the zoom image
  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomPopupImage,
      panelClass: 'zoom-dialog'
    });
  }


  emptyOutputDecorator(event) {
    if ('clear' === event) {
      this.optionValueArray = [];
      this.optionNameSelected = [];
    }
  }

  // get pincode value
  getPincode(val) {
    if (val !== '') {
      this.pinCodeError = false;
    }
    this.checkPinCode = false;
    this.pinCode = Number(val);
  }

  // check product Availbity event
  checkAvailability() {
    if (!this.pinCode) {
      this.pinCodeError = true;
      return;
    }
    this.pinCodeError = false;
    this.checkPinCode = true;
    const params: any = {};
    params.pincode = this.pinCode;
    params.productId = this.productId;
    this.productControlSandbox.CheckProductAvailability(params);
  }


  makeQuatation(product) {
    const dialogRef = this.dialog.open(MakeQuatationComponent, {
      data: product,
      panelClass: 'make-quotation'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }

  // change quantity of the product
  public changeCount(operation) {
    if (this.product.hasStock === 1) {
        if (operation === 'remove') {
          if (this.quantity > this.product.minQuantityAllowedCart) {
            this.quantity -= 1;
            this.tirePriceCalculation();
          }
        } else if (operation === 'add') {
          if (this.quantity >= this.product.minQuantityAllowedCart && this.quantity < this.product.maxQuantityAllowedCart) {
            this.quantity += 1;
            this.tirePriceCalculation();
          }
        }
    } else {
          if (operation === 'remove' && this.quantity > 1) {
            this.quantity -= 1;
            this.tirePriceCalculation();

          } else if (operation === 'add') {
            this.quantity += 1;
            this.tirePriceCalculation();
          }
        }
  }

  getClosest(list, qty) {
    return qty - list.reduce(function(closest, v) {
        return qty >= v.quantity ? Math.min(qty - v.quantity, closest) : closest;
    }, 1e100);
  }

  tirePriceCalculation() {
       if (this.product.hasTirePrice === 1) {

        if (this.product.isSimplified === 0) {
          if (this.product.variantTirePrice && this.product.variantTirePrice.length > 0) {
            const minQty = Math.min.apply(Math, this.tireQuantityArray);
            let isMatched = false;
           if (this.quantity >= minQty) {
              this.product.variantTirePrice.forEach(data => {
                if (data.quantity === this.quantity) {
                  this.tirePrice = data.price;
                  const tempTirePriceTag = parseFloat(this.tirePrice);
                  this.tireBasePrice = tempTirePriceTag;
                  this.productDetail.changeCount(this.tirePrice);
                  isMatched = true;
                }
              });
              if (!isMatched) {
                const result = this.getClosest(this.product.variantTirePrice, this.quantity);
                const resultObj = this.product.variantTirePrice.find(_list => _list.quantity === result);
                this.tirePrice = resultObj.price;
                const tempTirePriceTag = parseFloat(this.tirePrice);
                  this.tireBasePrice = tempTirePriceTag;
                this.productDetail.changeCount(this.tirePrice);
              }
          } else {
            this.tirePrice = '';
            this.productDetail.changeCount(this.tirePrice);
          }
          }
        } else {
          const minQty = Math.min.apply(Math, this.tireQuantityArray);
          let isMatched = false;
         if (this.quantity >= minQty) {
            this.product.productTirePrices.forEach(data => {
              if (data.quantity === this.quantity) {
                this.tirePrice = data.price;
                const tempTirePriceTag = parseFloat(this.tirePrice);
                this.tireBasePrice = tempTirePriceTag;
                this.productDetail.changeCount(this.tirePrice);
                isMatched = true;
              }
            });
            if (!isMatched) {
              const result = this.getClosest(this.product.productTirePrices, this.quantity);
              const resultObj = this.product.productTirePrices.find(_list => _list.quantity === result);
              this.tirePrice = resultObj.price;
              const tempTirePriceTag = parseFloat(this.tirePrice);
                this.tireBasePrice = tempTirePriceTag;
              this.productDetail.changeCount(this.tirePrice);
            }
        } else {
          this.tirePrice = '';
          this.productDetail.changeCount(this.tirePrice);
        }

        }

    } else {
      return;
    }
  }


  calculatePrice(amount: number, taxType: number, taxValue: number) {
    const price = +amount;
    switch (taxType) {
      case 1:
        const priceWithOutTax = (+price + this.totalPrice) + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = (+price + this.totalPrice) * (taxValue / 100);
        const priceWithTax = (+price + this.totalPrice) + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return (+price + this.totalPrice);
    }
  }

  getOptionTotal(event) {
    this.totalPrice = +event;
  }

  getSelectedOptionName(event) {
    this.selectedOptionsName = event;
  }

  getSelectedOptionId(event) {
    this.selectedOptions = event;
  }

  // unsubscribe subscribed events while destroy the page
  ngOnDestroy() {
    this.optionValueArray = [];
    this.sub.unsubscribe();
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
