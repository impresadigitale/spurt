import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-controls-options',
  templateUrl: './controls-options.component.html',
  styleUrls: ['./controls-options.component.scss']
})
export class ControlsOptionsComponent implements OnInit {

  @Input() productDetails: any;
  @Output() optionAmount = new EventEmitter<any>();
  @Output() selectedOption = new EventEmitter<any>();
  @Output() selectedOptionIds = new EventEmitter<any>();


  public selectedOptions: any = [];
  public selectedOptionsName: any = [];
  public relatedProducts: Array<any>;
  public radioValue: any = 'jh';
  public totalPrice: number;
  public removeData = [];
  public removePrefix = [];
  private previousData = [];
  private previousPrefix = [];
  private temptotalPrice: number;
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
    this.optionCalculate();
  }

  public optionCalculate() {
    if (this.productDetails && Object.keys(this.productDetails).length) {
    this.totalPrice = 0;
    this.temptotalPrice = 0;
    let requiredOption = false;
    const tempArray: any = [];
    let tempPrice: any;
    const tempData: any = this.productDetails;
    if (tempData.productOption && tempData.productOption.length > 0) {
      const tempOptions = this.productDetails.productOption;
      if (tempOptions[0]) {
        const param: any = {};
        for (let i = 0; i < tempData.productOption.length; i++) {
          if (tempData.productOption[i].required === 1) {
            if (tempData.productOption[i].optiontype === 'Radio') {
              this.previousValueRadio =
                tempData.productOption[i].optionValue[0].optionValueName;
              const temPrefix = parseFloat(
                tempData.productOption[i].optionValue[0].pricePrefix
              );
              const removeValue = parseFloat(
                tempData.productOption[i].optionValue[0].price
              );
              this.removePrefix[tempData.productOption[i].productOptionId] = temPrefix;
              this.oneTimePush = '';
              this.removeData[
                tempData.productOption[i].productOptionId
              ] = removeValue;
              this.optionNameSelected.push(
                tempData.productOption[i].optionValue[0].optionValueName
              );
            } else {
              this.modeSelect[tempData.productOption[i].productOptionId] =
                tempData.productOption[i].optionValue[0];
              this.previousValueDropdown[
                tempData.productOption[i].productOptionId
              ] =
                tempData.productOption[i].optionValue[0].optionValueName;
              this.oneTimePushValue = '';
              const temPrefix = parseFloat(
                tempData.productOption[i].optionValue[0].pricePrefix
              );
              const removeValue = parseFloat(
                tempData.productOption[i].optionValue[0].price
              );
              this.previousData[
                tempData.productOption[i].productOptionId
              ] = removeValue;
              this.previousPrefix[tempData.productOption[i].productOptionId] = temPrefix;
              this.optionNameSelected.push(
                tempData.productOption[i].optionValue[0].optionValueName
              );
            }
            tempArray.push(
              tempData.productOption[i].optionValue[0].optionValueName
            );
            tempPrice = parseFloat(
              tempData.productOption[i].optionValue[0].price
            );
            if (
              tempData.productOption[i].optionValue[0].pricePrefix === '0'
            ) {
              tempPrice = tempPrice * -1;
            } else {
              tempPrice = tempPrice * 1;
            }
            this.temptotalPrice += tempPrice;
            requiredOption = true;

            this.selectedOptions[tempData.productOption[i].optionId] = tempData.productOption[i].optionValue[0].productOptionValueId;
            this.selectedOptionsName[tempData.productOption[i].optionId] = tempData.productOption[i].optionValue[0].optionValueName;
          }
        }
        this.optionValueArray = this.optionNameSelected;
        this.totalPrice = this.temptotalPrice;
      }
    }
    this.productPriceWithOptions(this.totalPrice);
  }
  }

     // Params from available option (radio button)

  radioOptionValue(value, prefixs, valueName, optionName, optionId, object) {
    this.selectedOptions[object.optionId] = object.productOptionValueId;
    this.selectedOptionsName[object.optionId] = object.optionValueName;
    const data = +parseFloat(value);
    const prefix = parseInt(prefixs, 10);
    if (this.oneTimePush === 'enter') {
      this.optionValueArray.push(valueName);
      this.optionNames.push(optionName);
      this.oneTimePush = '';
    }
    if (this.optionNameSelected.length !== 0) {
      if (this.previousValueRadio) {
        for (let i = 0; i < this.optionNameSelected.length; i++) {
          if (this.previousValueRadio === this.optionNameSelected[i]) {
            this.optionNameSelected.splice(i, 1);
            this.optionNameSelected.push(valueName);
          }
        }
      } else {
        this.optionNameSelected.push(valueName);
      }
    } else {
      this.optionNameSelected.push(valueName);
    }
    if (prefix === 1) {
      if (this.removePrefix[optionId] === undefined) {
        this.totalPrice = this.totalPrice + data;
      } else if (this.removePrefix[optionId] === 1) {
        if (this.removeData[optionId]) {
          this.totalPrice = this.totalPrice - this.removeData[optionId];
        }
        this.totalPrice = this.totalPrice + data;
      } else {
        if (this.removeData[optionId]) {
          this.totalPrice = this.totalPrice + this.removeData[optionId];

        }
        this.totalPrice = this.totalPrice + data;
      }
      this.removeData[optionId] = data;
      this.removePrefix[optionId] = prefix;
    } else {
      if (this.removePrefix[optionId] === undefined) {
        this.totalPrice = this.totalPrice - data;
      } else if (this.removePrefix[optionId] === 1) {
        if (this.removeData[optionId]) {
          this.totalPrice = this.totalPrice - this.removeData[optionId];
        }
        this.totalPrice = this.totalPrice - data;

      } else {
        if (this.removeData[optionId]) {
          this.totalPrice = this.totalPrice + this.removeData[optionId];
        }
        this.totalPrice = this.totalPrice - data;
      }
      this.removeData[optionId] = data;
      this.removePrefix[optionId] = prefix;
    }
    this.previousValueRadio = valueName;
    this.optionValueArray = this.optionNameSelected;
    this.totalProductPrice = this.totalPrice;
    this.productPriceWithOptions(this.totalPrice);
  }

  // Params from available option (check box)
  checkOptionValue(event, value, prefixes, valueName, optionName) {
    const data = parseFloat(value);
    const prefix = parseFloat(prefixes);
    if (event.checked === true) {
      this.optionNames.push(optionName);
      this.optionNameSelected.push(valueName);
      if (prefix === 1) {
        this.totalPrice += data;
      } else {
        this.totalPrice -= data;
      }
    } else {
      this.deleteArray = true;
      for (let i = 0; i < this.optionNames.length; i++) {
        if (optionName === this.optionNames[i] && this.deleteArray === true) {
          this.optionNames.splice(i, 1);
          this.deleteArray = false;
        }
      }
      if (prefix === 1) {
        this.totalPrice -= data;
      } else {
        this.totalPrice += data;
      }
      for (let i = 0; i < this.optionNameSelected.length; i++) {
        if (this.optionNameSelected[i] === valueName) {
          this.optionNameSelected.splice(i, 1);
        }
      }
    }
    this.optionValueArray = this.optionNameSelected;
    this.productPriceWithOptions(this.totalPrice);
  }


  // Params from available option (drop down box)
  selectOptionValue(value, optionName, option) {
    this.selectedOptions[option.optionId] = option.productOptionValueId;
    this.selectedOptionsName[option.optionId] = option.optionValueName;
    const prefix = parseFloat(value.pricePrefix);
    const data = parseFloat(value.price);
    if (this.oneTimePushValue === 'enter') {
      this.optionNames.push(optionName);
      this.oneTimePushValue = '';
    }
    if (this.optionNameSelected.length !== 0) {
      if (this.previousValueDropdown[option.productOptionId]) {
        for (let i = 0; i < this.optionNameSelected.length; i++) {
          if (
            this.previousValueDropdown[option.productOptionId] ===
            this.optionNameSelected[i]
          ) {
            this.optionNameSelected.splice(i, 1);
            this.optionNameSelected.push(value.optionValueName);
          }
        }
      } else {
        this.optionNameSelected.push(value.optionValueName);
      }
    } else {
      this.optionNameSelected.push(value.optionValueName);
    }
    if (prefix === 1) {
      if (this.previousPrefix[option.productOptionId] === undefined) {
        this.totalPrice = this.totalPrice + data;
      } else if (this.previousPrefix[option.productOptionId] === 1) {
        if (this.previousData[option.productOptionId]) {
          this.totalPrice =
            this.totalPrice - this.previousData[option.productOptionId];
        }
        this.totalPrice = this.totalPrice + data;
      } else {
        if (this.previousData[option.productOptionId]) {
          this.totalPrice =
            this.totalPrice + this.previousData[option.productOptionId];
        }
        this.totalPrice = this.totalPrice + data;
      }
      this.previousData[option.productOptionId] = data;
      this.previousPrefix[option.productOptionId] = prefix;
    } else {
      if (this.previousPrefix[option.productOptionId] === undefined) {
        this.totalPrice = this.totalPrice - data;
      } else if (this.previousPrefix[option.productOptionId] === 1) {
        if (this.previousData[option.productOptionId]) {
          this.totalPrice =
            this.totalPrice - this.previousData[option.productOptionId];
        }
        this.totalPrice = this.totalPrice - data;
      } else {
        if (this.previousData[option.productOptionId]) {
          this.totalPrice =
            this.totalPrice + this.previousData[option.productOptionId];
        }
        this.totalPrice = this.totalPrice - data;
      }
      this.previousData[option.productOptionId] = data;
      this.previousPrefix[option.productOptionId] = prefix;
    }
    this.previousValueDropdown = value.optionValueName;
    this.optionValueArray = this.optionNameSelected;
    this.productPriceWithOptions(this.totalPrice);
  }

  // change the original price if available options selected
  productPriceWithOptions(param) {
    if (this.previousPriceTag) {
      this.productPriceTag = this.tempPriceRefer;
      this.productPriceTag += param;
    } else {
      this.productPriceTag += param;
    }
    this.previousPriceTag = param;
    this.optionAmount.emit(this.totalPrice);
    this.selectedOption.emit(this.selectedOptionsName);
    this.selectedOptionIds.emit(this.selectedOptions);
  }


  calculateOptionPrice(optionPrice: any, optionSymbol: string, taxType: number, taxValue: number) {
    let productPrice = parseFloat(this.productDetails.price);
    if (this.productDetails.pricerefer) {
      productPrice = parseFloat(this.productDetails.pricerefer);
    }
    let optionProductPrice = 0;
    if (optionSymbol === '-') {
      optionProductPrice = +productPrice - parseFloat(optionPrice);
    } else {
      optionProductPrice = +productPrice + parseFloat(optionPrice);
    }
    let optionAmount = 0;
    switch (taxType) {
      case 1:
        const priceAmountWithTax = +productPrice + (+taxValue);
        const optionPriceAmountWithOutTax = +optionProductPrice + (+taxValue);

        if (optionSymbol === '-') {
          optionAmount = +priceAmountWithTax - +optionPriceAmountWithOutTax;
        } else {
          optionAmount = +optionPriceAmountWithOutTax - (+priceAmountWithTax);
        }
        return Math.round(optionAmount);
      case 2:
        const percentToAmount = +productPrice * (taxValue / 100);
        const priceWithTax = +productPrice + +percentToAmount;
        const percentToOptionAmount = +optionProductPrice * (taxValue / 100);
        const OptionPriceWithTax = +optionProductPrice + +percentToOptionAmount;
        if (optionSymbol === '-') {
          optionAmount = +priceWithTax - +OptionPriceWithTax;
        } else {
          optionAmount = +OptionPriceWithTax - +priceWithTax;
        }
        return Math.round(optionAmount);
      default:
        return +optionPrice;
    }
  }
}
