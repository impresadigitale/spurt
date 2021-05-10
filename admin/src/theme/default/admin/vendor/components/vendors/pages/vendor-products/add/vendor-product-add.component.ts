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
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgbModal, NgbPanelChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
// Store Module
import { ImagemanagerpopupComponent } from '../../../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { StockSandbox } from '../../../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { VendorProductSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TaxSandbox } from '../../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';


@Component({
  selector: 'app-vendor-product-add',
  templateUrl: 'vendor-product-add.component.html',
  styleUrls: ['vendor-product-add.component.scss']
})
export class VendorProductAddComponent implements OnInit, OnDestroy {


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public venId: any;
  public id: any;
  @ViewChild(NgbTabset)
  private tabset: NgbTabset;
  public dropDownnArray: any = [];
  public user: FormGroup;
  public sizeFormArray: FormArray;
  public vendorId = new FormControl();
  public productName: FormControl;
  public productSlug: FormControl;
  public productDescription: FormControl;
  public upc: FormControl;
  public hsn: FormControl;
  public sku: FormControl;
  public discountArray = [];
  public specialArray = [];
  public location: FormControl;
  public minimumQuantity: FormControl;
  public quantity: FormControl;
  public subtractStock: FormControl;
  public outOfStockStatus: FormControl;
  public requiredShipping: FormControl;
  public dateAvailable: FormControl;
  public sortOrder: FormControl;
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
  public TextBoxRequired: FormControl;
  public date: Date;
  public editId: any;
  // pagination
  public catagory: any;
  // selected category list
  public selectedCategories: any = [];
  public selectedCategoryList: any = [];
  // upload
  public uploadImage: any = [];
  // selectedCategories data in TotalCategories
  public TotalCategories: any = [];
  public filteredArray: any[];
  // product add or update api params
  private param: any = {};
  public value: any;
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
  private searchKeyword: string;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public currencySymbol: any = JSON.parse(localStorage.getItem('adminCurrency'));
  public updateproductdetails = [];
  public searchText = '';
  public productOptions: any = [];
  public productDiscount: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  public keyword = '';
  public defaultSelected = '--select option--';
  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  public ratingImage = {};
  public ratingVal = 3.4;
  @ViewChild('myckeditor') ckeditor: any;
  public discountForm: FormGroup;
  public specialForm: FormGroup;
  public seoForm: FormGroup;
  public discountItems: FormArray;
  public specialItems: FormArray;
  // option form

  public required: FormControl;
  public optionValue: FormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public option: any[];
  public priceForm: FormGroup;
  public filteredOptions: Observable<any[]>;
  public firstName: '';
  public vendorLoading = false;
   // tax variables
  public taxType = '1';
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public totalPrice: number;
  public manufacturer: FormControl;

  // options vriable

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
  public productTypeSelectedSlug: any = '';


  constructor(
    private configService: ConfigService,
    public router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    public fb: FormBuilder,
    public productSandbox: VendorProductSandbox,
    private popup: NgbModal,
    private changeDetectRef: ChangeDetectorRef,
    public stockStatusSandbox: StockSandbox,
    private datePipe: DatePipe,
    private route: ActivatedRoute, public taxSandbox: TaxSandbox

  ) {
    this.productSandbox.getSellerList$.subscribe(data => {
      if (data) {
        this.vendorLoading = false;
        this.option = data;
        this.filteredOptions = this.vendorId.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    });
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });

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
    this.variantList();
    this.getTaxlist();
    this.getVendorList();
    this.initProductForm();
    this.getManufacturerList();
    this.getVendorId(event);
    this.productSandbox.ClearProductDetails();
    this.subscriptions.push(
      this.taxSandbox.taxList$.subscribe(data => {
        if (data) {
          this.taxArray = data;
        }
      })
    );
    // calling ProductDetail
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
      // forcePasteAsPlainText: true,
      height: '100%'
    };
    this.getProductRatingList();
    this.priceForm = this.fb.group({
      productPrice: [0],
      packingPrice: [0],
      shippingPrice: [0],
      tax: [0],
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

    this.variantForm = this.fb.group({
      variantItems: this.fb.array([])
    });
  }

  createDiscountItem(): FormGroup {
    return this.fb.group({
      disCustomerGroup: '',
      discountPriority: '',
      discountPrice: '',
      discountDateStart: '',
      discountDateEnd: '',
      discountSku: ['', Validators.required],

    });
  }

  createSpecialItem(): FormGroup {
    return this.fb.group({
      specialCustomerGroup: '',
      specialPriority: '',
      specialPrice: '',
      specialDateStart: '',
      specialDateEnd: '',
      specialSku: ['', Validators.required],

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

  customSearchFn(term: string, item: any) {
      term = term.toLowerCase();
      return item.firstName.toLowerCase().indexOf(term) > -1 || item.lastName.toLowerCase().indexOf(term) > -1
             || item.email.toLowerCase().indexOf(term) > -1 || item.mobileNumber.toLowerCase().indexOf(term) > -1;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.option.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  initDropDownList() {
    this.getProductList();
    this.getStockStausList();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // reactive form
  initProductForm() {
    this.vendorId = new FormControl('', [Validators.required]);
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
    this.sku = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(64)
    ]));
    this.hsn = new FormControl('', Validators.compose([
      Validators.maxLength(64)
    ]));

    this.location = new FormControl('');
    this.quantity = new FormControl('');
    this.outOfStockStatus = new FormControl('');
    this.requiredShipping = new FormControl('1');
    this.dateAvailable = new FormControl('');
    this.sortOrder = new FormControl('');
    this.optionId = new FormControl('');
    this.textOptionValue = new FormControl('');
    this.textRequired = new FormControl('');
    this.timeRequired = new FormControl('');
    this.timeValue = new FormControl('');
    this.dateTimeRequired = new FormControl('');
    this.dateTimeValue = new FormControl('');
    this.checkboxRequired = new FormControl('');
    this.sizeBoxRequired = new FormControl('');
    this.manufacturer = new FormControl('', [Validators.required]);
    this.pincodeBasedDelivery = new FormControl('');
    this.dataRequired = new FormControl('');
    this.dateValue = new FormControl('');
    this.discountId = new FormControl('');
    (this.specialId = new FormControl('')),
      (this.TextBoxRequired = new FormControl(''));

    this.user = this.fb.group({
      vendorId: this.vendorId,
      productName: this.productName,
      productSlug: this.productSlug,
      quantity: this.quantity,
      productDescription: this.productDescription,
      upc: this.upc,
      hsn: this.hsn,
      sku: this.sku,
      location: this.location,
      outOfStockStatus: this.outOfStockStatus,
      requiredShipping: this.requiredShipping,
      dateAvailable: this.dateAvailable,
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
      sizeForm: this.fb.group({
        sizeBoxRequired: this.sizeBoxRequired,
        sizeFormArray: this.fb.array([])
      }),
    });

  }

  getProductList() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.name = '';
    params.status = '';
    this.productSandbox.productList(params);
  }

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <FormArray>this.user.controls['sizeForm'].get('sizeFormArray');
  }


  getStockStausList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 100;
    params.keyword = '';
    this.stockStatusSandbox.stockStatusList(params);
  }

  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    this.submittedValues = true;
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

    this.addSelecctedCategories();
    this.addProductData();
    if (!this.user.valid) {
      this.validateAllFormFields(this.user);
      return;
    }
    if (!this.variantForm.valid) {
      this.validateAllFormFields(this.variantForm);
      this.tabset.select('7');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    if (!this.seoForm.valid) {
      this.validateAllFormFields(this.seoForm);
      this.tabset.select('6');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    const param: any = {};
    const categoryIds = this.TotalCategories.map(val => {
      return val.categoryId;
    });
    this.discountForm.controls['discountItems'].value.forEach(data => {
      if (data.discountPrice !== '') {
        const tempstartDate = this.datePipe.transform(
          data.discountDateStart,
          'yyyy-MM-dd'
        );
        const tempendDate = this.datePipe.transform(
          data.discountDateEnd,
          'yyyy-MM-dd'
        );
        const tempPrice = parseInt(data.discountPrice, 10).toFixed();
        this.discountArray.push(
          {
            disCustomerGroup: 1,
            discountPriority: data.discountPriority,
            discountPrice: tempPrice,
            discountDateStart: tempstartDate,
            discountDateEnd: tempendDate
          }
        );
      }
    });
    this.specialForm.controls['specialItems'].value.forEach(data => {
      if (data.specialPrice !== '') {
        const tempstartDate = this.datePipe.transform(
          data.specialDateStart,
          'yyyy-MM-dd'
        );
        const tempendDate = this.datePipe.transform(
          data.specialDateEnd,
          'yyyy-MM-dd'
        );
        const tempPrice = parseInt(data.specialPrice, 10).toFixed();
        this.specialArray.push(
          {
            specialGroup: 1,
            specialPriority: data.specialPriority,
            specialPrice: tempPrice,
            specialDateStart: tempstartDate,
            specialDateEnd: tempendDate
          }
        );
      }
    });
    this.onetimeEdit = true;
    param.productName = user.productName;
    param.productSlug = user.productSlug;
    param.productDescription = user.productDescription;
    param.upc = user.upc;
    param.hsn = user.hsn;
    param.sku = user.sku;
    param.image = this.uploadImage;
    param.quantity = user.quantity;
    param.categoryId = categoryIds;
    param.price = Number(this.priceForm.controls['productPrice'].value);
    param.packingCost = +this.priceForm.controls['packingPrice'].value;
    param.shippingCost = +this.priceForm.controls['shippingPrice'].value;
    param.tax = this.taxType === '2' ? this.currentTaxId : this.taxValue;
    param.taxType = Number(this.taxType);
    param.others = +this.priceForm.controls['others'].value;
    param.metaTagTitle = this.seoForm.controls['metaTagTitle'].value;
    param.metaTagKeyword = this.seoForm.controls['metaTagKeyword'].value;
    param.metaTagDescription = this.seoForm.controls['metaTagDescription'].value;
    param.relatedProductId = this.totalArray;
    param.manufacturerId = this.user.value.manufacturer;

    if (this.specialArray.length > 0) {
      let array = [];
       array = this.specialForm.value.specialItems.map(data => {
        return {specialCustomerGroup: data.specialCustomerGroup , skuName: data.specialSku, specialDateEnd: data.specialDateEnd,
          specialDateStart: data.specialDateStart, specialPrice: data.specialPrice, specialPriority: data.specialPriority};
      });
      param.productSpecial = array;
    }
    if (this.discountArray.length > 0) {
      let array = [];
      array = this.discountForm.value.discountItems.map(data => {
        return {disCustomerGroup: data.disCustomerGroup , skuName: data.discountSku, discountDateEnd: data.discountDateEnd,
          discountDateStart: data.discountDateStart, discountPrice: data.discountPrice, discountPriority: data.discountPriority};
      });
      param.productDiscount = array;

    }
    param.location = user.location;
    param.outOfStockStatus = user.outOfStockStatus;
    param.requiredShipping = user.requiredShipping;
    param.dateAvailable = user.dateAvailable;
    const dateSendingToServer = new DatePipe('en-US').transform(
      user.dateAvailable,
      'yyyy-MM-dd'
    );
    param.dateAvailable = dateSendingToServer;
    param.sortOrder = user.sortOrder;


    if (this.dropDownnArray.length === 0) {
      param.productOptions = [];
    } else {
      param.productOptions = user.options.rightOption;
    }

    if (this.user.value.pincodeBasedDelivery === true || this.user.value.pincodeBasedDelivery === 1) {
      this.param.pincodeBasedDelivery = 1;
     } else {
       this.param.pincodeBasedDelivery = 0;
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
      param.productVarientOption = final;
      param.productVarient = this.selectedVaraintId;

    } else {
      param.productVarientOption = [];
      param.productVarient = [];
    }
      param.productId = this.editId;
      param.productName = user.productName;
      param.vendorId = this.venId;
      this.productSandbox.doProductUpdate(param);
    } else if (!this.editId) {
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
      param.productVarientOption = final;
      param.productVarient = this.selectedVaraintId;

    } else {
      param.productVarientOption = [];
      param.productVarient = [];
    }
      param.vendorId = this.id;
      this.productSandbox.doProductAdd(param);
    }

  }


  regDetailEvent() {
    this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length > 0) {
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
    params.ofset = '';
    params.keyword = '';
    params.count = '';
    params.status = 1;
    this.productSandbox.getManufaturerList(params);
  }

  catLists() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.count = '';
    params.category = this.catagory;
    this.productSandbox.catlist(params);
  }

  getVendorId(event) {
     this.getVendorList();
  }

  getCategory(event) {
    if (event) {
      this.id = event.vendorId;
      const param: any = {};
      param.vendorId = this.id;
      this.productSandbox.catlist(param);
    }
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getVendorList() {
    this.vendorLoading = true;
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.name = '';
    param.email = '';
    param.status = '';
    param.count = '';
    this.productSandbox.sellerList(param);
  }

  /**
     * Handles  'searchCategory' event. Calls sandbox getCategoryList function.

     * @param catagory searchCategory input value
     */
  searchCategory(event) {
    this.catagory = event.target.value;
    this.catLists();
  }

  selectCategory(data, i) {
    if (!this.editId) {
      this.show = false;
    }
    this.selectedCategories.push(data);
    this.filteredArray = this.selectedCategories;
    const params: any = {};
    params.list = data;
    this.productSandbox.selectCategoryList(params);
    this.selectedCategoryList = this.selectedCategories;
  }

  removeCategory(data, i) {

    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.selectedCategories = this.selectedCategories.filter(item => {
        if (item.categoryId === data.categoryId) {
          return false;
        } else {
          return true;
        }
      });
      const params: any = {};
      params.list = data;
      this.productSandbox.removeCategoryList(params);
    }
    this.selectedCategoryList = this.selectedCategories;
  }

  addSelecctedCategories() {
    this.TotalCategories = this.selectedCategoryList;
  }

  searchSelectedCategory(filter: String) {
    let value = filter.toLocaleLowerCase();
      this.selectedCategories = this.selectedCategoryList.filter(val => val.name.toLowerCase().includes(value));
  }

  /** calls productSandbox productRemoveList,
   * after pushing the product datas into selectedProducts(array)
   * @param data from selectProduct
   * @param i from selectProduct
   * **/
  selectProduct(data, i) {
    const prodList = JSON.parse(JSON.stringify(data));
    if (this.editId) {
      this.addOneTimeData = true;
    }
    this.selectedProducts.push(prodList);
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
    this.catLists();
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


  editProductForm(productDetail) {
    this.probabilitySubscribe();
    if (productDetail.productVarient && productDetail.productVarient.length > 0) {
      this.isVariantExist = true;
      productDetail.productVarient.forEach(data => {
        this.selectedVaraintId.push(data.varientsId);
      });
    }
    this.selectedCategories = JSON.parse(JSON.stringify(productDetail.Category));
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.selectedCategories = this.selectedCategories.map(data => {
        if (data) {
          return data;
        }
      });
      this.selectedCategoryList = this.selectedCategories;
    }
    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    this.uploadImage = productDetail.productImage;
    if (productDetail.relatedProductDetail && productDetail.relatedProductDetail.length > 0) {
      this.selectedProducts = JSON.parse(JSON.stringify(productDetail.relatedProductDetail));
    }
    this.priceForm.controls['productPrice'].setValue(productDetail.productCost);
    this.priceForm.controls['packingPrice'].setValue(productDetail.packingCost);
    this.priceForm.controls['shippingPrice'].setValue(productDetail.shippingCost);
    this.priceForm.controls['others'].setValue(productDetail.others);
    this.productSlug.setValue(productDetail.productSlug);
    this.taxType = String(productDetail.taxType);
    if (productDetail.taxType === 2) {
      this.currentTaxId = productDetail.tax;
      this.getTaxPercentage(this.currentTaxId);
    } else {
      this.taxValue = productDetail.tax !== 0 ? productDetail.tax : null;
    }
    this.getTotalPrice();
    this.getGrossTotal();
    this.seoForm.controls['metaTagTitle'].setValue(
      productDetail.metaTagTitle
    );
    this.seoForm.controls['metaTagDescription'].setValue(
      productDetail.metaTagDescription
    );
    this.seoForm.controls['metaTagKeyword'].setValue(
      productDetail.metaTagKeyword
    );
     if (productDetail.vendorId) {
      this.option.forEach(data => {
          if (data.vendorId === productDetail.vendorId) {
            this.vendorId.setValue(data.firstName);
            this.venId = data.vendorId;
            const param: any = {};
            param.vendorId = this.venId;
            this.productSandbox.catlist(param);
          }
      });
    }
    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.hsn.setValue(productDetail.hsn);

    this.quantity.setValue(productDetail.quantity);
    this.location.setValue(productDetail.location);
    this.outOfStockStatus.setValue(productDetail.stockStatusId);
    this.requiredShipping.setValue(productDetail.shipping);
    if (productDetail && productDetail.stockStatusId) {
      this.outOfStockStatus = productDetail.stockStatusId;
    }
    if (this.requiredShipping.value === 1) {
      this.user.patchValue({ requiredShipping: '1', tc: true });
    }
    if (this.requiredShipping.value === 2) {
      this.user.patchValue({ requiredShipping: '2', tc: true });
    }
    this.dateAvailable.setValue(productDetail.dateAvailable);
    this.sortOrder.setValue(productDetail.sortOrder);
    this.productDescription.setValue(productDetail.description);

    if (productDetail.pincodeBasedDelivery === 1) {
      this.user.controls['pincodeBasedDelivery'].setValue(true);
    } else {
      this.user.controls['pincodeBasedDelivery'].setValue(false);
    }


    if (
      productDetail.productDiscount.length > 0 &&
      productDetail.productDiscount[0].productDiscountId
    ) {
      this.discountItems = <FormArray>(
        this.discountForm.controls['discountItems']);
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
        this.specialForm.controls['specialItems']
      );
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

    if (productDetail.manufacturerId) {
      this.user.controls['manufacturer'].setValue(productDetail.manufacturerId);
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

  // getProductRatingList

  getProductRatingList() {
    const param: any = {};
    param.productId = this.editId;
    param.limit = 0;
    param.offset = 5;
  }


  // Rating & Review Image loader
  ratingImageLoading(id) {
    this.ratingImage[id] = true;
  }

  cancel() {
    this.router.navigate(['/vendors/vendor/product']);
  }
    // tax events

  // get price event
  getPrice(evt) {
    this.getGrossTotal();
    this.getTotalPrice();
    this.getTaxValueByPercentage(this.taxPercentage);
 }
  // get gross total event
  getGrossTotal() {
    this.grossTotal = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
    + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value);
  }
  // get total price event
  getTotalPrice() {
    this.totalPrice = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
    + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value) + this.taxValue;
  }
  // get tax value event
  getTaxValue(event) {
    this.taxValue = 0;
    this.taxPercentage = null;
    this.taxType = event.target.value;
    this.getGrossTotal();
    this.getTaxValueByPercentage(this.taxPercentage);
  }
  // get tax amount from input
  getTax(val) {
    this.taxValue = Number(val);
    this.getTotalPrice();
  }
  // get tax list
  getTaxlist() {
    const params: any = {};
    this.taxSandbox.getTaxList(params);
  }


  public variantList() {
    const params: any = {};
    params.keyword = '';
    this.productSandbox.getVariantList(params);
  }
  // get tax percentage
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
  // get tax value with percentage
  getTaxValueByPercentage(data) {
      this.taxValue = data ? ( Number(this.priceForm.controls['productPrice'].value) / 100 ) * data : 0;
      this.getTotalPrice();
  }

   // options functanalities

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
  const array = [];
  array.push(image);
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
