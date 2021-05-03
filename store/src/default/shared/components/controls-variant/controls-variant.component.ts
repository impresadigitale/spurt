import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-controls-variant',
  templateUrl: './controls-variant.component.html',
  styleUrls: ['./controls-variant.component.scss']
})
export class ControlsVariantComponent implements OnInit {

  @Input() variantDetails: any;
  @Input() variantList: any;
  @Input() selectedVariant: any;
  @Output() optionAmount = new EventEmitter<any>();
  @Output() selectedOption = new EventEmitter<any>();
  @Output() changeVariants = new EventEmitter<any>();
  @Output() selectedOptionIds = new EventEmitter<any>();



   // pushed option value id in this array(unique id)
   public selectedOptions: any = [];
   public selectedOptionsName: any = [];

  //  public selectedVariant: any = {};


  // related product data
  public relatedProducts: Array<any>;
  public radioValue: any = 'jh';
  public totalPrice: number;
  public removeData = [];
  public removePrefix = [];
  public  temptotalPrice: number;
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

  constructor(public productDetail: ListsSandbox) { }

  ngOnInit() {
    this.totalPrice = 0;
    this.temptotalPrice = 0;
  }

  changeVariant(variantId: number, valueId: number, details: any) {
    this.selectedVariant[variantId] = valueId;
    const variantKeys = Object.keys(this.selectedVariant);
    const valueIds = [];
    if (variantKeys && variantKeys.length > 0) {
      variantKeys.forEach((element) => {
        if (this.selectedVariant[element]) {
          valueIds.push(this.selectedVariant[element]);
        }
      });
    }
    let currentOption: any = {};
    if (this.variantList && this.variantList.length > 0) {
      this.variantList.forEach(subElement => {
        let tempCount = 0;
        subElement.productVarientOption.forEach(data => {
          if (valueIds.indexOf(data) > -1) {
            tempCount += 1;
          }
        });
        if (tempCount === subElement.productVarientOption.length) {
          currentOption = subElement;
        }
      });
    }


    if (currentOption && Object.keys(currentOption).length > 0) {
      this.changeVariants.emit({
        skuId: currentOption.skuId,
        skuName: currentOption.skuName,
        price: currentOption.price,
        outOfStockThreshold: currentOption.outOfStockThreshold,
        maxQuantityAllowedCart: currentOption.maxQuantityAllowedCart,
        minQuantityAllowedCart: currentOption.minQuantityAllowedCart,
        notifyMinQuantity: currentOption.notifyMinQuantity,
        enableBackOrders: currentOption.enableBackOrders,
        stockStatus: currentOption.stockStatus,
        pricerefer: currentOption.pricerefer,
        flag: currentOption.flag,
        selectedVariant: this.selectedVariant,
        optionImage: currentOption.optionImage,
        varientName: currentOption.varientName,
        varientId: currentOption.id,
        isAvailable: true,
        variantTirePrice: currentOption.productTirePrices
      });
    } else {

      this.changeVariants.emit({
        skuId: 0,
        skuName: '',
        price: '',
        outOfStockThreshold: '',
        maxQuantityAllowedCart: '',
        minQuantityAllowedCart: '',
        notifyMinQuantity: '',
        enableBackOrders: '',
        stockStatus: '',
        pricerefer: '',
        flag: '',
        selectedVariant: this.selectedVariant,
        optionImage: '',
        varientName: '',
        varientId: '',
        isAvailable: false,
        variantTirePrice: []
      });

    }
   }

  compare(arr1, arr2) {

    if (!arr1 || !arr2) {
      return;
    }

    let result;

    arr1.forEach((e1, i) => arr2.forEach(e2 => {

      if (e1.length > 1 && e2.length) {
        result = this.compare(e1, e2);
      } else if (e1 !== e2) {
        result = false;
      } else {
        result = true;
      }
    })
    );
    return result;
  }
}
