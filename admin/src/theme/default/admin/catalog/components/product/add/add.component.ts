import { map } from 'rxjs/operators';
/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { FormArray } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbModal, NgbPanelChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Store Module
import { ImagemanagerpopupComponent } from '../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { StockSandbox } from '../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { TaxSandbox } from '../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { AttributeGroupSandbox } from '../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.sandbox';

@Component({
  selector: 'app-add-products',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {


  public dropDownnArray: any = [];
  public user: FormGroup;
  public sizeFormArray: FormArray;
  @ViewChild(NgbTabset)
  private tabset: NgbTabset;
  public productName: FormControl;
  public productSlug: FormControl;
  public productDescription: FormControl;
  public upc: FormControl;
  public sku: FormControl;
  public hsn: FormControl;
  public location: FormControl;
  public minimumQuantity: FormControl;
  public quantity: FormControl;
  public subtractStock: FormControl;
  public outOfStockStatus: FormControl;
  public requiredShipping: FormControl;
  public dateAvailable: FormControl;
  public status: FormControl;
  public sortOrder: FormControl;
  public manufacturer: FormControl;
  public textOptionValue: FormControl;
  public textRequired: FormControl;
  public optionId: FormControl;
  public discountId: FormControl;
  public specialId: FormControl;
  public dataRequired: FormControl;
  public dateValue: FormControl;
  public checkboxRequired: FormControl;
  public optionValueId: FormControl;
  public pricePrefix: FormControl;
  public sizeBoxRequired: FormControl;
  public timeRequired: FormControl;
  public timeValue: FormControl;
  public dateTimeRequired: FormControl;
  public dateTimeValue: FormControl;
  public pincodeBasedDelivery: FormControl;
  public discountArray = [];
  public specialArray = [];
  public productDiscount: any = [];
  public discountForm: FormGroup;
  public specialForm: FormGroup;
  public seoForm: FormGroup;
  public priceForm: FormGroup;
  public shippingForm: FormGroup;
  public discountItems: FormArray;
  public specialItems: FormArray;
  public date: Date;
  // editing values
  public editId: any;
  // pagination
  public catagory: any;
  // selected category list
  public selectedCategories: any = [];
  // upload
  public uploadImage: any = [];
  // selectedCategories data in TotalCategories
  public TotalCategories: any = [];
  public filteredArray: any[];
  // product add or update api params
  private param: any = {};
  // getting values from popup
  private closeResult: any;
  private getDismissReason: any;
  // condition for product remove
  public show: boolean;
  // condition for product add or update api
  private onetimeEdit = false;
  private CategoryValue = false;
  // validation
  public submittedValues = false;
  public length: number;
  // image view
  public imageUrls: string;
  public defaultImageValue = 1;
  // add categories only when add button clicked
  private addOneTime = false;
  // selected products in paroducts
  public selectedProducts: any = [];
  // add product data
  private totalArray: any = [];
  public addOneTimeData = false;
  // search product
  private searchKeyword: string;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public searchText = '';
  public updateproductdetails = [];
  public productOptions: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  // defaultSelected
  public defaultSelected = '--select option--';
  // ck editor
  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  public ratingImage = {};
  public ratingVal = 3.4;
  @ViewChild('myckeditor') ckeditor: any;
  // option form
  public selected_optionId: FormControl;
  public required: FormControl;
  public optionValue: FormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public currencySymbol: any = JSON.parse(localStorage.getItem('adminCurrency'));
 // tax variables
  public taxType = '1';
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public totalPrice: number;
  public shippingValid = false;
  // tier price
  public tierFormArray: FormArray;
  public tierForm: FormGroup;

  public priceValid = false;
  public selectedVariantArray = [];
  public selectedVaraintId = [];
  public emptyVariant = [];
  public currency: any;
  public probability: any = [];
  public isVariantExist = false;
  // variant form
  public variantItems: FormArray;
  public variantForm: FormGroup;
  public optionImageArray: any = [];
  public optionValueArray: any = [];
  public toggleArray: any = [];
  // filter params
  public filterParams: any = {};

  public productTypeSelectedSlug: any = '';

   // attributes
 public attributeFormArray: FormArray;
 public attributeForm: FormGroup;


  constructor(
    public fb: FormBuilder,
    public productSandbox: ProductSandbox,
    public categoriessandbox: CategoriesSandbox,
    private popup: NgbModal,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    public stockStatusSandbox: StockSandbox,
    public configService: ConfigService,
    private datePipe: DatePipe, public taxSandbox: TaxSandbox,
    public attributeGroupSandbox: AttributeGroupSandbox
  ) {
    this.mycontent = `<p>My html content</p>`;
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });
    const pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const keyword = this.route.snapshot.queryParamMap.get('keyword');
    const filterSku = this.route.snapshot.queryParamMap.get('sku');
    const filterStatus = this.route.snapshot.queryParamMap.get('status');
    const price = this.route.snapshot.queryParamMap.get('price');
    const index = this.route.snapshot.queryParamMap.get('index');


    this.filterParams.pageSize = pageSize || '';
    this.filterParams.keyword = keyword || '';
    this.filterParams.sku = filterSku || '';
    this.filterParams.offset = offset || 0;
    this.filterParams.price = price || '';
    this.filterParams.index = index || 0;
    this.filterParams.status = filterStatus || '';

  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    this.getCategoryList();
    this.variantList();
    this.productSandbox.ClearProductDetails();
    this.subscriptions.push(
      this.taxSandbox.taxList$.subscribe(data => {
        if (data) {
          this.taxArray = data;
        }
      })
    );
    this.initProductForm();
    this.getManufacturerList();

    if (this.editId) {
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.regDetailEvent();
    } else {
      this.initDropDownList();
    }
    this.imageUrls = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();

    // ck editor
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      height: '100%'
    };
    // calling searchoptionlist Api
    this.getTaxlist();
    this.getProductRatingList();
    this.user.controls.tierForm.disable();
    this.user.controls.attributeForm.disable();

  }
  initDropDownList() {
    this.ProductLists();
    this.getStockStausList();
    this.getAttributeGroupList();
  }

  getAttributeGroupList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.attributeGroupSandbox.getAttributeList(params);
  }

  // reactive form
  initProductForm() {
    this.productName = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.productSlug = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.productDescription = new FormControl('');
    this.upc = new FormControl('', Validators.compose([
      Validators.maxLength(12)
    ]));
    this.hsn = new FormControl('', Validators.compose([
      Validators.maxLength(64)
    ]));
    this.sku = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(64)
    ]));
    this.location = new FormControl('');
    this.quantity = new FormControl('');
    this.outOfStockStatus = new FormControl('');
    this.requiredShipping = new FormControl('');
    this.dateAvailable = new FormControl('');
    this.status = new FormControl('', [Validators.required]);
    this.sortOrder = new FormControl('');
    this.optionId = new FormControl('');
    this.textOptionValue = new FormControl('');
    this.textRequired = new FormControl('');
    this.timeRequired = new FormControl('');
    this.timeValue = new FormControl('');
    this.dateTimeRequired = new FormControl('');
    this.dateTimeValue = new FormControl('');
    this.manufacturer = new FormControl('', [Validators.required]);
    this.pincodeBasedDelivery = new FormControl('');
    this.checkboxRequired = new FormControl('');
    this.sizeBoxRequired = new FormControl('');
    this.dataRequired = new FormControl('');
    this.dateValue = new FormControl('');
    this.discountId = new FormControl('');
    (this.specialId = new FormControl('')),

    this.user = this.fb.group({
      productName: this.productName,
      productSlug: this.productSlug,
      productDescription: this.productDescription,
      upc: this.upc,
      sku: this.sku,
      hsn: this.hsn,
      location: this.location,
      quantity: this.quantity,
      outOfStockStatus: this.outOfStockStatus,
      dateAvailable: this.dateAvailable,
      status: this.status,
      sortOrder: this.sortOrder,
      textOptionValue: this.textOptionValue,
      textRequired: this.textRequired,
      timeRequired: this.timeRequired,
      timeValue: this.timeValue,
      dateTimeRequired: this.dateTimeRequired,
      dateTimeValue: this.dateTimeValue,
      optionId: this.optionId,
      discountId: this.discountId,
      specialId: this.specialId,
      dataRequired: this.dataRequired,
      dateValue: this.dateValue,
      manufacturer: this.manufacturer,
      pincodeBasedDelivery: this.pincodeBasedDelivery,

      tierForm: this.fb.group({
         hasTire: ['1'],
        tierFormArray: this.fb.array([])
      }),
      options: this.fb.group({
        selected_optionId: this.selected_optionId,
        rightOption: this.fb.array([])
      }),

      sizeForm: this.fb.group({
        sizeBoxRequired: this.sizeBoxRequired,
        sizeFormArray: this.fb.array([])
      }),
      attributeForm: this.fb.group({
        attributeFormArray: this.fb.array([])
     }),
    });
    this.priceForm = this.fb.group({
      productPrice: ['', Validators.required],
      packingPrice: [0],
      shippingPrice: [0],
      others: [0],
    });
    this.seoForm = this.fb.group({
      metaTagTitle: ['', Validators.compose([
        Validators.maxLength(60)
      ])],
      metaTagKeyword: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
      metaTagDescription: ['', Validators.compose([
        Validators.maxLength(160)
      ])],
    });
    this.discountForm = this.fb.group({
      discountItems: this.fb.array([])
    });
    this.specialForm = this.fb.group({
      specialItems: this.fb.array([])
    });
    this.shippingForm = this.fb.group({
      requiredShipping: ['0'],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required]
    });

    this.variantForm = this.fb.group({
      variantItems: this.fb.array([])
    });

    this.optionValue = this.user.controls['options'].get(
      'rightOption'
    ) as FormArray;
  }
  createDiscountItem(): FormGroup {
    return this.fb.group({
      discountSku: ['', Validators.required],
      disCustomerGroup: '',
      discountPriority: '',
      discountPrice: '',
      discountDateStart: [Validators.required],
      discountDateEnd: [Validators.required]
    });
  }
  createSpecialItem(): FormGroup {
    return this.fb.group({
      specialSku: ['', Validators.required],
      specialCustomerGroup: '',
      specialPriority: ['', Validators.required],
      specialPrice: ['', Validators.required],
      specialDateStart: ['', Validators.required],
      specialDateEnd: ['', Validators.required],
    });
  }
  addDiscountForm(): void {
    if (this.editId) {
      this.discountItems = this.discountForm.get('discountItems') as FormArray;
      this.discountItems.push(this.createDiscountItem());
    }

  }

  // create control for FormArray of discountFormArray
  get discountsArray() {
    return <FormArray>(
      this.discountForm.controls['discountItems']);
  }
    // create control for FormArray of specialFormArray
  get specialFormArray() {
    return <FormArray>(
      this.specialForm.controls['specialItems']);
  }

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <FormArray>this.user.controls['sizeForm'].get('sizeFormArray');
  }

 // create control for FormArray of rappleFormArray
 get tierArray() {
  return <FormArray>this.user.controls['tierForm'].get('tierFormArray');
 }
   // create control for FormArray of attributes
  get attributeArray() {
    return <FormArray>this.user.controls['attributeForm'].get('attributeFormArray');
   }

  get variantFormArray() {
    return <FormArray>(
      this.variantForm.controls['variantItems']);
  }


  removeDiscountForm(index) {
    this.discountItems.removeAt(index);
  }

  addSpecialForm(): void {
    if (this.editId) {
      this.specialItems = this.specialForm.get('specialItems') as FormArray;
      this.specialItems.push(this.createSpecialItem());
    }

  }
  removeSpecialForm(index) {
    this.specialItems.removeAt(index);
  }

  // add tier form
  addTierForm() {
    if (this.editId) {
      this.user.controls.tierForm.enable();
      this.tierArray.push(this.addTierField());
    }
  }

    // create formArray of optionFormArray
  public addTierField() {
    return this.fb.group({
      quantity: [''],
      price: [''],
      skuName: ['']

    });
  }

  deleteTierForm(index) {
    this.tierArray.removeAt(index);
    if (this.tierArray.length === 0) {
      this.user.controls.tierForm.disable();
    }
  }

    // attributes
    addAttributeForm() {
      this.user.controls.attributeForm.enable();
      this.attributeArray.push(this.addAttributeField());
    }
  
      // create formArray of optionFormArray
    public addAttributeField() {
      return this.fb.group({
        attributeId: [''],
        text: ['']
      });
    }
  
    deleteAttributeForm(index) {
      this.attributeArray.removeAt(index);
      if (this.attributeArray.length === 0) {
        this.user.controls.attributeForm.disable();
      }
    }


  // productoption data Formvalue
  public setProductOptionFormData() {

  }

  // Stock Status List

  getStockStausList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 100;
    params.keyword = '';
    params.status = '1';
    this.stockStatusSandbox.stockStatusList(params);
  }



  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    this.shippingValid = false;

    if (this.probability.length > 0) {
      this.probability.map((data, i) => {
        this.optionImageArray.map((item, j) => {
          if (i === j) {
            const opts: any = { ...data, optionImage: item};
            Object.assign(data, opts);
          }
        });
      });
    }

    // calling
    this.setProductOptionFormData();
    this.submittedValues = true;
    this.priceValid = true;

    this.addSelecctedCategories();
    this.addProductData();
    if (!this.user.valid) {
      this.validateAllFormFields(this.user);
      this.tabset.select('6');
            window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!this.variantForm.valid) {
      this.validateAllFormFields(this.variantForm);
      this.tabset.select('7');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!this.priceForm.valid) {
      this.validateAllFormFields(this.priceForm);
      this.tabset.select('8');
            window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (this.shippingForm.value.requiredShipping === '1') {
      if (this.shippingForm.valid) {
      } else {
        this.shippingValid = true;
        this.tabset.select('9');
        return;
      }
    }


    const param: any = {};
    const categoryIds = this.TotalCategories.map(val => {
      return val.categoryId;
    });
    this.onetimeEdit = true;
    this.param.productName = user.productName;
    this.param.productSlug = user.productSlug;
    this.param.productDescription = user.productDescription;
    this.param.upc = user.upc;
    this.param.hsn = user.hsn;
    this.param.sku = user.sku;
    this.param.image = this.uploadImage;
    this.param.categoryId = categoryIds;
    this.param.relatedProductId = this.totalArray;
    this.param.location = user.location;
    this.param.quantity = user.quantity;
    this.param.outOfStockStatus = user.outOfStockStatus;
    if (this.shippingForm.value.requiredShipping) {
      this.param.requiredShipping = this.shippingForm.value.requiredShipping;
    }
    this.param.dateAvailable = user.dateAvailable;
    const dateSendingToServer = new DatePipe('en-US').transform(
      user.dateAvailable,
      'yyyy-MM-dd'
    );
    this.param.dateAvailable = dateSendingToServer;
    this.param.status = user.status;
    this.param.sortOrder = user.sortOrder;
    this.param.price = Number(this.priceForm.controls['productPrice'].value);
    this.param.packingCost = +this.priceForm.controls['packingPrice'].value;
    this.param.shippingCost = +this.priceForm.controls['shippingPrice'].value;
    this.param.tax = this.taxType === '2' ? this.currentTaxId : this.taxValue;
    this.param.taxType = Number(this.taxType);
    this.param.others = +this.priceForm.controls['others'].value;
    this.param.metaTagTitle = this.seoForm.controls['metaTagTitle'].value;
    this.param.metaTagKeyword = this.seoForm.controls['metaTagKeyword'].value;
    this.param.metaTagDescription = this.seoForm.controls['metaTagDescription'].value;
    this.param.width = this.shippingForm.value.width;
    this.param.height = this.shippingForm.value.height;
    this.param.length = this.shippingForm.value.length;
    this.param.weight = this.shippingForm.value.weight;
    this.param.manufacturerId = this.user.value.manufacturer;

    if (this.user.value.pincodeBasedDelivery === true || this.user.value.pincodeBasedDelivery === 1) {
     this.param.pincodeBasedDelivery = 1;
    } else {
      this.param.pincodeBasedDelivery = 0;
    }

    if (this.specialForm.valid) {
      let array = [];
       array = this.specialForm.value.specialItems.map(data => {
        return {specialCustomerGroup: data.specialCustomerGroup , skuName: data.specialSku, specialDateEnd: data.specialDateEnd,
          specialDateStart: data.specialDateStart, specialPrice: data.specialPrice, specialPriority: data.specialPriority};
      });
      this.param.productSpecial = array;
    }
    if (this.discountForm.valid) {
      let array = [];
      array = this.discountForm.value.discountItems.map(data => {
        return {disCustomerGroup: data.disCustomerGroup , skuName: data.discountSku, discountDateEnd: data.discountDateEnd,
          discountDateStart: data.discountDateStart, discountPrice: data.discountPrice, discountPriority: data.discountPriority};
      });
      this.param.productDiscount = array;

    }

    if (this.user.controls.tierForm.disabled) {
      this.param.tierPrices = [];
      this.param.hasTirePrice = 0;
    } else {
        this.param.hasTirePrice = user.tierForm.hasTire;
        this.param.tierPrices = user.tierForm.tierFormArray;
    }

    if (this.user.controls.attributeForm.disabled) {
      this.param.productAttribute = [];
    } else {
        this.param.productAttribute = user.attributeForm.attributeFormArray;
    }




  // probality options


  if (this.editId) {
  if (this.probability.length > 0) {
   const final = [];
   const form = this.variantForm.value.variantItems;
   const prob = this.probability;

 for (let i = 0; i < prob.length; i++) {
   for (let k = 0; k < form.length; k++) {
     if (prob[i].arrayId === form[k].arrayId) {
       prob[i].name = form[k].name;
       const name = [];
       const id = [];
       const price = form[k].price;
       const sku = form[k].sku;
       const isActive = form[k].isActive === true ? 1 : 0;
       const optionImage = prob[i].optionImage;
       const quantity = form[k].inventory;
       const listId = prob[i].id;


       prob[i].value.map(each => {
           name.push(each.value);
           id.push(each.id);
         });
         final.push({ varientName: name.toString(), optionValue: id, optionImage: optionImage, price: price, sku: sku, isActive: isActive, quantity: quantity, id: listId });
       break;
     }
   }
 }
   this.param.productVarientOption = final;
   this.param.productVarient = this.selectedVaraintId;

 } else {
   this.param.productVarientOption = [];
   this.param.productVarient = [];
 }
   this.param.productId = this.editId;
   this.productSandbox.doProductUpdate(this.param);
 } else {
    if (this.probability.length > 0) {
   const final = [];
   const form = this.variantForm.value.variantItems;
   const prob = this.probability;

 for (let i = 0; i < prob.length; i++) {
   for (let k = 0; k < form.length; k++) {
     if (prob[i].arrayId === form[k].arrayId) {
       prob[i].name = form[k].name;
       const name = [];
       const id = [];
       const price = form[k].price;
       const sku = form[k].sku;
       const isActive = form[k].isActive === true ? 1 : 0;
       const optionImage = prob[i].optionImage;
       const quantity = form[k].inventory;

       prob[i].value.map(each => {
           name.push(each.value);
           id.push(each.id);
         });
         final.push({ varientName: name.toString(), optionValue: id, optionImage: optionImage, price: price, sku: sku, isActive: isActive, quantity: quantity });
       break;
     }
   }
 }
   this.param.productVarientOption = final;
   this.param.productVarient = this.selectedVaraintId;

 } else {
   this.param.productVarientOption = [];
   this.param.productVarient = [];
 }
   this.productSandbox.doProductAdd(this.param);
 }

  }

  /**
   * unsubscribe the subscriptions
   *
   * Handles  'regDetailEvent' event. Calls productSandbox productDetails$ to
   * subscribe the response data.,then calls editProductForm function with the response data.
   *
   */
  regDetailEvent() {
    this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.selectedProducts = [];
          this.editProductForm(data);
          this.initDropDownList();
        }
      })
    );
  }

  // Handles form 'getManufacturerList' event. Calls sandbox manufacturerList function with empty value.

  getManufacturerList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    params.count = '';
    this.productSandbox.manufacturerList(params);
  }

  // calling category list api with pagination
  getCategoryList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = this.catagory;
    param.sortOrder = '';
    param.status = 1;
    this.categoriessandbox.categoryList(param);
  }

  // calling product list api with default value

  ProductLists() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.keyword = this.searchKeyword;
    params.sku = '';
    params.status = '';
    params.price = '';
    this.productSandbox.getProductList(params);
  }

  /**
     * Handles  'searchCategory' event. Calls sandbox getCategoryList function.

     * @param catagory searchCategory input value
     */
  searchCategory(event) {
    this.catagory = event.target.value;
    this.getCategoryList();
  }

  /**
   * Handles  'selectCategory' event. Calls categoriessandbox Productremove  if (this.editId)function.
   * else Calls categoriessandbox Productremove.And push  the datas to categories list using push() method.
   * @param categoryId searchCategory input value
   * @param name searchCategory input value
   */
  selectCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.categoryName = data.name;
      param.levels = data.levels;

      this.addOneTime = true;
      this.selectedCategories.push(param);
      this.categoriessandbox.productRemove(i);
    } else {
      this.selectedCategories.push(data);
      this.categoriessandbox.productRemove(i);
      this.show = false;
    }
    this.filteredArray = this.selectedCategories;
  }

  /**
   * Handles  'removeCategory' event. Calls categoriessandbox Productadd  if (this.editId)function.
   * else Calls categoriessandbox Productadd.And splice the datas with particular index as(i)
   * @param categoryId searchCategory input value.
   * @param name searchCategory input value.
   */
  removeCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.name = data.categoryName;
      this.addOneTime = true;
      this.categoriessandbox.productAdd(param);
      this.selectedCategories.splice(i, 1);
    } else {
      this.categoriessandbox.productAdd(data);
      this.selectedCategories.splice(i, 1);
    }
    this.filteredArray = this.selectedCategories;
  }

  /** calls productSandbox productRemoveList,
   * after pushing the product datas into selectedProducts(array)
   * @param data from selectProduct
   * @param i from selectProduct
   * **/
  selectProduct(data, i) {
    if (this.editId) {
      this.addOneTimeData = true;
    }
    this.selectedProducts.push(data);
    if (this.selectedProducts) {
    }
    this.productSandbox.productRemoveList(i);
  }

  /**
   * call productSandbox productAddList,after splice product datas in the list.
   * @params data from removeProduct
   * @param i from productAddList
   * */
  removeProduct(data, i) {
    if (this.editId) {
      this.addOneTimeData = true;
      this.selectedProducts.splice(i, 1);
      this.productSandbox.productAddList(data);
    } else {
      this.productSandbox.productAddList(data);
      this.selectedProducts.splice(i, 1);
    }
  }

  // calls ProductLists ,when  searching the  product list data
  searchProduct(event) {
    this.searchKeyword = event.target.value;
    this.ProductLists();
  }

  // push the selected data into the totalArray(array).

  addProductData() {
    this.totalArray = [];
    if (this.selectedProducts) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i] && this.selectedProducts[i].productId) {
          this.totalArray.push(this.selectedProducts[i].productId);
        }
      }
    }
  }

  /**
   * Handles  'addSelecctedCategories' event.
   *
   * storing selectedCategories data in TotalCategories
   */

  addSelecctedCategories() {
    if (this.show === true) {
      this.selectedCategories = this.filteredArray;
    }
    this.TotalCategories = this.selectedCategories;
  }

  /**
   * Handles  'searchSelectedCategory' event. And show the searched result  in the form
   *
   * @param filter searchbox  value
   */
  searchSelectedCategory(filter: String) {
    this.filteredArray = this.selectedCategories.filter(item => {
      if (
        item.name
          .toString()
          .toLowerCase()
          .indexOf(filter.toLowerCase()) !== -1
      ) {
        if (this.filteredArray != null) {
          this.show = true;
        }
        return true;
      }
      return false;
    });
  }

  // editing Product Form with product list values

  editProductForm(productDetail) {
    this.productTypeSelectedSlug = productDetail.productType;

    this.probabilitySubscribe();

    if (productDetail.productVarient && productDetail.productVarient.length > 0) {
      this.isVariantExist = true;
      productDetail.productVarient.forEach(data => {
        this.selectedVaraintId.push(data.varientsId);
      });
    }
    this.selectedProducts = [];
    this.selectedCategories = [];
    if (productDetail.Category && productDetail.Category.length > 0) {
      this.categoriessandbox.filterCategory(productDetail.Category);
    }
    productDetail.Category.forEach(each => {
      if (each) {
        this.selectedCategories.push(each);
      }
    });
    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    this.uploadImage = productDetail.productImage;
    productDetail.relatedProductDetail.forEach(each => {
      if (each) {
        this.selectedProducts.push(each);
      }
    });
    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.hsn.setValue(productDetail.hsn);


    this.priceForm.controls['productPrice'].setValue(productDetail.productCost);
    this.priceForm.controls['packingPrice'].setValue(productDetail.packingCost);
    this.priceForm.controls['shippingPrice'].setValue(productDetail.shippingCost);
    this.priceForm.controls['others'].setValue(productDetail.others);
    if (productDetail.manufacturerId) {
      this.user.controls['manufacturer'].setValue(productDetail.manufacturerId);
    }
    this.productSlug.setValue(productDetail.productSlug);
    this.taxType = String(productDetail.taxType);


    // shipping form
    this.shippingForm.controls['width'].setValue(parseFloat(productDetail.width).toFixed());
    this.shippingForm.controls['height'].setValue(parseFloat(productDetail.height).toFixed());
    this.shippingForm.controls['weight'].setValue(parseFloat(productDetail.weight).toFixed());
    this.shippingForm.controls['length'].setValue(parseFloat(productDetail.length).toFixed());

    if (productDetail.taxType === 2) {
      this.currentTaxId = productDetail.tax;
      this.getTaxPercentage(this.currentTaxId);
    } else {
      this.taxValue = productDetail.tax !== 0 ? productDetail.tax : null;
    }
    this.seoForm.controls['metaTagTitle'].setValue(
      productDetail.metaTagTitle
    );
    this.seoForm.controls['metaTagDescription'].setValue(
      productDetail.metaTagDescription
    );
    this.seoForm.controls['metaTagKeyword'].setValue(
      productDetail.metaTagKeyword
    );
    this.getGrossTotal();
    this.getTotalPrice();
    this.location.setValue(productDetail.location);
    this.quantity.setValue(productDetail.quantity);
    this.outOfStockStatus.setValue(productDetail.stockStatusId);
    this.status.setValue(productDetail.isActive);
    if (productDetail && productDetail.stockStatusId) {
      this.outOfStockStatus = productDetail.stockStatusId;
    }
    if (productDetail.shipping === 0) {
      this.shippingForm.controls['requiredShipping'].setValue('0');

    }
    if (productDetail.shipping === 1) {
      this.shippingForm.controls['requiredShipping'].setValue('1');

    }
    this.dateAvailable.setValue(productDetail.dateAvailable);
    this.sortOrder.setValue(productDetail.sortOrder);
    this.productDescription.setValue(productDetail.description);


    if (productDetail.pincodeBasedDelivery === 1) {
      this.user.controls['pincodeBasedDelivery'].setValue(true);
    } else {
      this.user.controls['pincodeBasedDelivery'].setValue(false);
    }

    // setting product dicount form array
    if (
      productDetail.productDiscount.length > 0 &&
      productDetail.productDiscount[0].productDiscountId
    ) {


      this.discountItems = <FormArray>(
        this.discountForm.controls['discountItems']
        );

      if (productDetail.productDiscount.length > 0) {
        this.discountForm.enable();
        this.discountsArray.removeAt(0);
        productDetail.productDiscount.forEach(data => {
          const tempstartDate = this.datePipe.transform(
            data.dateStart,
            'yyyy-MM-dd'
          );
          const tempendDate = this.datePipe.transform(
            data.dateEnd,
            'yyyy-MM-dd'
          );
          const tempPrice = parseInt(data.price, 10).toFixed();
          this.discountItems.push(
            this.fb.group({
              discountId: data.productDiscountId,
              disCustomerGroup: 1,
              discountQuantity: data.quantity,
              discountPriority: data.priority,
              discountPrice: tempPrice,
              discountDateStart: tempstartDate,
              discountDateEnd: tempendDate,
              discountSku: data.skuName

            })
          );
        });

      }
    }

    if (
      productDetail.productSpecialPrice.length > 0 &&
      productDetail.productSpecialPrice[0].productSpecialId
    ) {
      this.specialItems = <FormArray>(
        this.specialForm.controls['specialItems']);
      if (productDetail.productSpecialPrice.length > 0) {

      this.specialForm.enable();
      this.specialFormArray.removeAt(0);
      productDetail.productSpecialPrice.forEach(value => {
        const tempstartDate = this.datePipe.transform(
          value.dateStart,
          'yyyy-MM-dd'
        );
        const tempendDate = this.datePipe.transform(
          value.dateEnd,
          'yyyy-MM-dd'
        );
        const tempPrices = parseInt(value.price, 10).toFixed();

        this.specialItems.push(
          this.fb.group({
            specialId: value.productSpecialId,
            specialCustomerGroup: 1,
            specialPriority: value.priority,
            specialPrice: tempPrices,
            specialDateStart: tempstartDate,
            specialDateEnd: tempendDate,
            specialSku: value.skuName

          })
        );
      });
    }
    }

      // set tier value into tier array form
      if (
        productDetail.productTirePrices.length > 0 &&
        productDetail.productTirePrices[0].id
      ) {
        this.user.controls.tierForm.enable();

        const tierFormControl = <FormArray>(
        this.user.controls['tierForm'].get('tierFormArray'));
        this.tierArray.removeAt(0);
        productDetail.productTirePrices.forEach(value => {
          tierFormControl.push(
            this.fb.group({
              quantity: value.quantity,
              price: value.price,
              skuName: value.skuName

            })
          );
        });
      }

      // set attribute value into tier array form
      if (
        productDetail.productAttribute.length > 0 &&
        productDetail.productAttribute[0].id
      ) {
        this.user.controls.attributeForm.enable();

        const attributeFormControl = <FormArray>(
        this.user.controls['attributeForm'].get('attributeFormArray'));
        this.attributeArray.removeAt(0);
        productDetail.productAttribute.forEach(value => {
          attributeFormControl.push(
            this.fb.group({
              attributeId: value.attributeId,
              text: value.text,
            })
          );
        });
      }

      if (productDetail.hasTirePrice === 1) {
        this.user.controls.tierForm['controls']['hasTire'].setValue('1');
      } else {
        this.user.controls.tierForm['controls']['hasTire'].setValue('0');
      }

  }

 // getting values from media popup
 uploadProductImages() {
  const modalRef = this.popup.open(ImagemanagerpopupComponent, {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  });
  // Make the first image as default  selected.
  modalRef.result.then(
    result => {
      if (result && result.length > 0) {
        const lengthOfUploadImage: number = this.uploadImage.length;

      result.forEach(data => {
        if (data) {
          this.uploadImage.push(data);
        }
      });

      this.length = 0;
      // make non default value
      if (this.uploadImage.length > 1 && !this.editId) {
        for (let i = 0; i < this.uploadImage.length; i++) {
          if (i === 0) {
            this.uploadImage[i].defaultImage = 1;
          } else {
            this.uploadImage[i].defaultImage = 0;
          }
        }
      } else if (!this.editId) {
        this.uploadImage[0].defaultImage = 1;
      } else if (this.editId) {
        // make  default value
        if (this.uploadImage[0]) {
          this.uploadImage[0].defaultImage = 1;

        } else {
          for (
            let i = lengthOfUploadImage;
            i < this.uploadImage.length;
            i++
          ) {
            this.uploadImage[i].defaultImage = 0;
          }
        }
      }
      }
      this.changeDetectRef.detectChanges();
      this.closeResult = `Closed with: ${'result'}`;
    },
    reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
  );
}

  // delete image
  deleteImage(i) {
    this.uploadImage.splice(i, 1);
  }

  // validation for the formGroup
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // ck editor
  checkBox(event, ii) {
    const index: number = ii;
    for (let i = 0; i < this.uploadImage.length; i++) {
      if (index === i && event.target.checked) {
        this.length = index;
        this.uploadImage[i].defaultImage = 1;
      } else {
        this.length = index;
        this.uploadImage[i].defaultImage = 0;
      }
    }
  }


  public variantList() {
    const params: any = {};
    params.keyword = '';
    this.productSandbox.getVariantList(params);
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getProductRatingList() {
    const param: any = {};
    param.productId = this.editId;
    param.limit = 0;
    param.offset = 5;
    this.productSandbox.getProductRatingList(param);
  }

  updateRatingStatus(event, rating) {
    const FeatureValue = event.target.checked;
    const param: any = {};
    param.ratingId = rating.ratingId;
    if (FeatureValue === true) {
      param.status = 1;
      this.productSandbox.doRatingStatus(param);
    } else {
      param.status = 0;
      this.productSandbox.doRatingStatus(param);
    }
  }

  ratingImageLoading(id) {
    this.ratingImage[id] = true;
  }


  getPrice(evt) {
    this.getGrossTotal();
    this.getTotalPrice();
    this.getTaxValueByPercentage(this.taxPercentage);
 }

  getGrossTotal() {
    this.grossTotal = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
    + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value);
  }

  getTotalPrice() {
    this.totalPrice = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
    + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value) + this.taxValue;
  }

  getTaxValue(event) {
    this.taxValue = 0;
    this.taxPercentage = null;
    this.taxType = event.target.value;
    this.getGrossTotal();
    this.getTaxValueByPercentage(this.taxPercentage);
  }

  getTax(val) {
    this.taxValue = Number(val);
    this.getTotalPrice();
  }

  getTaxlist() {
    const params: any = {};
    params.status = 1;
    this.taxSandbox.getTaxList(params);
  }

  getTaxPercentage(val) {
    this.currentTaxId = Number(val);
   if (this.taxArray && this.taxArray['length'] > 0) {
      this.taxArray.forEach(data => {
        if (data.taxId === this.currentTaxId) {
            this.taxPercentage = data.value;
            this.getTaxValueByPercentage(this.taxPercentage);
        }
      });
   }
  }

  getTaxValueByPercentage(data) {
      this.taxValue = data ? ( Number(this.priceForm.controls['productPrice'].value) / 100 ) * data : 0;
      this.getTotalPrice();
  }


 public selectVariant(list) {
  if (list.selected === false) {
    if (this.selectedVaraintId.length < 3) {
      this.selectedVaraintId.push(list.id);
    } else {
      return;
    }

  } else {
    if (this.selectedVaraintId.length <= 3) {
      this.selectedVaraintId = this.selectedVaraintId.filter(data => {
        if (data === list.id) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      return;
    }

  }
  let mainSku = this.user.controls['sku'].value;
  let defaultPrice = Number(this.priceForm.controls['productPrice'].value);
  const params: any = {};
  params.list = list;
  params.mainSku = mainSku;
  params.defaultPrice = defaultPrice;
  this.productSandbox.selectVariant(params);
  this.probabilitySubscribe();
}

probabilitySubscribe() {
  this.subscriptions.push(this.productSandbox.probabiltyOptions$.subscribe(data => {
    if (data && data.length > 0) {
      this.probability = data;
      this.pushIntoFormArray(this.probability);
    } else {

  while (this.variantFormArray.length !== 0) {
    this.variantFormArray.removeAt(0);
  }

    }
  }));
}

pushIntoFormArray(details) {
  while (this.variantFormArray.length !== 0) {
    this.variantFormArray.removeAt(0);
  }
  this.variantFormArray.removeAt(0);
  this.variantItems = <FormArray>(
    this.variantForm.controls['variantItems']
  );
  this.variantForm.enable();
  this.optionImageArray = [];
  this.optionValueArray = [];
  this.toggleArray = [];
  details.forEach((value, i) => {
    this.optionImageArray[i] = value.optionImage;
    this.optionValueArray[i] = value.value;
    const opts: any = {};
    opts.isActive = value.isActive;
    this.toggleArray[i] = opts;
    this.variantItems.push(
      this.fb.group({
        arrayId: value.arrayId,
        price: value.price,
        inventory: value.inventory,
        barcode: value.barcode,
        isActive: value.isActive === 1 ? true : false,
        sku: value.sku,
        id: value.id ? value.id : '',

      })
    );
  });
  const groupItems: any = (this.variantForm.get('variantItems') as FormArray).controls;
  for (const item of groupItems) {
    item.controls['sku'].setValidators(Validators.required);
    item.controls['sku'].updateValueAndValidity();
    item.controls['inventory'].setValidators(Validators.required);
    item.controls['inventory'].updateValueAndValidity();
}
this.changeDetectRef.detectChanges();

}

uploadOptionImage(event, options, i) {
  const modalRef = this.popup.open(ImagemanagerpopupComponent, {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  });
// Make the first image as default  selected.
modalRef.result.then(
  result => {

    if (result) {
      this.addImageToOptions(result, options, i);
    }
    this.changeDetectRef.detectChanges();
    this.closeResult = `Closed with: ${'result'}`;
  },
  reason => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  }
);
}

addImageToOptions(image , option, index) {
  const params: any = {};
  params.image = image[0];
  const array = [];
  this.optionImageArray[index] = image;
}

removeOptionImage(options, i) {
  this.optionImageArray = this.optionImageArray.map((data, j) => {
    if (i === j) {
      return [];
    } else {
      return data;
    }
  });

}

removeProbablityOption(option, index) {
  this.variantItems.removeAt(index);
  this.probability = this.probability.filter((data, i) => {
    if (i === index) {
      return false;
    } else {
      return true;
    }
  });

  this.optionImageArray = this.optionImageArray.filter((item, j) => {
    if (j === index) {
      return false;
    } else {
      return true;
    }
  });

  this.optionValueArray = this.optionValueArray.filter((item, k) => {
    if (k === index) {
      return false;
    } else {
      return true;
    }
  });

  if (this.editId && this.isVariantExist === true) {
    const params: any = {};
    params.id = option.value.id;
    this.productSandbox.deleteProbabilityOption(params);
  }

}

checkLength(count) {
  const length = +count;
  const diff = 5 - length;
  this.emptyVariant = [];

  if (diff === 0) {
    return false;
  } else {
    for (let i = 0; i < diff; i++) {
      this.emptyVariant.push(i);
    }
    return true;
  }
}


ngOnDestroy() {
  this.productSandbox.variantClear();
  this.subscriptions.forEach(each => {
    each.unsubscribe();
  });
}
}
