import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductSandbox } from '../../../../../../core/product/product.sandbox';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { NgbTabset, NgbModal, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagemanagerpopupComponent } from '../../../../../shared/popup/ImageManagerPopup/imagemanagerpopup.component';
import { environment } from '../../../../../../../environments/environment';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDateCustomParserFormatter } from '../../../../../shared/interfaces/dateformat';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})
export class ProductAddComponent implements OnInit, AfterViewInit, OnDestroy {


  public productSubmit = false;
  public detailSubmit = false;
  public config: SwiperConfigInterface = {};
  public submittedValues = false;
  public productForm: FormGroup;
  public detailsForm: FormGroup;
  @ViewChild(NgbTabset)
  private tabset: NgbTabset;
  public selectedCategory = [];
  public searchText = '';
  public generalTab = false;
  public catTab = false;
  public prodTab = false;
  public imageTab = false;
  public priceTab = false;
  public seoTab = false;
  public variantTab = false;
  public searchSelectedText = '';
  public filterCategory: any = [];
  public discountArray = [];
  public specialArray = [];
  public panelOpenState = false;
  public showError = '';
  public showImageError = '';
  public uploadImage: any = [];
  public editId: any;
  public length: number;
  public totalPrice: number;
  public imageUrls = environment.imageUrl;
  private subscriptions: Array<Subscription> = [];

  // discountFormGroup Controls
  public discountForm: FormGroup;
  public specialForm: FormGroup;
  public discountItems: FormArray;
  public specialItems: FormArray;
  public priceForm: FormGroup;
  public seoForm: FormGroup;
  public current = new Date();
  public minDate = { year: this.current.getFullYear(), month:
  this.current.getMonth() + 1, day: this.current.getDate() };
  public currencySymbol: any = JSON.parse(localStorage.getItem('vendor-settings'));
  public symbol = this.currencySymbol.symbolLeft ? this.currencySymbol.symbolLeft : this.currencySymbol.symbolRight;

// options variable

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

  // tax variables
  public taxType = '1';
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public shippingValid = false;
  public approvalId: any;


  constructor(
    public productSandbox: ProductSandbox,
    private changeDetectRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public fb: FormBuilder,
    private popup: NgbModal,
    public toaster: ToastrService, private datePipe: DatePipe, private configs: NgbDatepickerConfig,
  ) {
    const current = new Date();
    configs.minDate = { year: current.getFullYear(), month:
    current.getMonth() + 1, day: current.getDate() };
    configs.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.subscriptions.push(
      this.productSandbox.taxList$.subscribe(data => {
        if (data) {
          this.taxArray = data;
        }
      })
    );
    this.getManufacturerList();
    this.variantList();
    this.getTaxlist();


    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      sku: ['', Validators.required],
      metaTagTitle: ['', Validators.required],
      metaTagDescription: [''],
      productDescription: ['', Validators.required]
    });

    this.detailsForm = this.fb.group({
      upc: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      outOfStockStatus: ['', Validators.compose([Validators.required])],
      dateAvailable: ['', Validators.required],
      pincodeBasedDelivery: [''],
      manufacturer: ['', Validators.required],
      hsn: ['']

    });
    this.discountForm = this.fb.group({
      discountItems: this.fb.array([])
    });
    this.specialForm = this.fb.group({
      specialItems: this.fb.array([])
    });
    this.priceForm = this.fb.group({
      productPrice: [],
      packingPrice: [],
      shippingPrice: [],
      tax: [],
      others: [],
    });
    this.seoForm = this.fb.group({
      metaTagTitle: ['', Validators.required],
      metaTagKeyword: ['', Validators.required],
      metaTagDescription: ['', Validators.required],
    });

    this.variantForm = this.fb.group({
      variantItems: this.fb.array([])
    });
    this.getCategory();
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });
    if (this.editId) {
      this.generalTab = true;
      this.catTab = true;
      this.prodTab = true;
      this.imageTab = true;
      this.priceTab = true;
      this.seoTab = true;
      this.variantTab = true;
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.regDetailEvent();
    }
  }

  // get manufacturer list

  getManufacturerList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    params.keyword = '';
    params.status = 1;
    this.productSandbox.getManufacturerList(params);
  }

  public variantList() {
    const params: any = {};
    params.keyword = '';
    this.productSandbox.getVariantList(params);
  }

  getTaxlist() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    params.keyword = '';
    params.status = 1;
    this.productSandbox.getTaxList(params);
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * unsubscribe the subscriptions
   *
   * Handles  'regDetailEvent' event. Calls productSandbox productDetails$ to
   * subscribe the response data.,then calls editProductForm function with the response data.
   *
   */
  regDetailEvent() {
    // this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.editProductForm(data);
        }
      })
    );
  }

  // editing Product Form with product list values

  editProductForm(productDetail) {
    this.taxType = String(productDetail.taxType);
    this.probabilitySubscribe();
    if (productDetail.productVarient && productDetail.productVarient.length > 0) {
      this.isVariantExist = true;
      productDetail.productVarient.forEach(data => {
        this.selectedVaraintId.push(data.varientsId);
      });
    }

    this.productForm.controls['productName'].setValue(productDetail.name);
    this.productForm.controls['sku'].setValue(productDetail.sku);
    this.priceForm.controls['productPrice'].setValue(productDetail.productCost);
    this.priceForm.controls['packingPrice'].setValue(productDetail.packingCost);
    this.priceForm.controls['shippingPrice'].setValue(productDetail.shippingCost);
    this.priceForm.controls['others'].setValue(productDetail.others);

    if (productDetail.taxType === 2) {
      this.currentTaxId = productDetail.tax;
      this.getTaxPercentage(this.currentTaxId);
    } else {
      this.taxValue = productDetail.tax !== 0 ? productDetail.tax : null;
      this.getTax(this.taxValue);
      this.changeDetectRef.detectChanges();

    }
    this.changeDetectRef.detectChanges();
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
    this.productForm.controls['metaTagTitle'].setValue(
      productDetail.productSlug
    );
    this.seoForm.controls['metaTagDescription'].setValue(
      productDetail.metaTagDescription
    );
    this.seoForm.controls['metaTagKeyword'].setValue(
      productDetail.metaTagKeyword
    );
    this.seoForm.controls['metaTagTitle'].setValue(
      productDetail.metaTagTitle
    );
    this.productForm.controls['productDescription'].setValue(
      productDetail.description
    );
    this.selectedCategory = [];
    productDetail.Category.forEach(each => {
      if (each) {
        this.selectedCategory.push(each);
        this.productSandbox.addCategory(each);
      }
    });
    this.detailsForm.controls['upc'].setValue(productDetail.upc);
    this.detailsForm.controls['hsn'].setValue(productDetail.hsn);

    this.detailsForm.controls['quantity'].setValue(productDetail.quantity);
    this.detailsForm.controls['outOfStockStatus'].setValue(
      productDetail.stockStatusId
    );
    const dateAvailable = { year: Number(this.datePipe.transform(
      productDetail.dateAvailable,
      'yyyy'
    )), month:
    Number(this.datePipe.transform(
      productDetail.dateAvailable,
      'MM'
    )), day: Number(this.datePipe.transform(
      productDetail.dateAvailable,
      'dd'
    )) };
    this.detailsForm.controls['dateAvailable'].setValue(
      dateAvailable
    );

    if (productDetail.pincodeBasedDelivery === 1) {
      this.detailsForm.controls['pincodeBasedDelivery'].setValue(true);
    } else {
      this.detailsForm.controls['pincodeBasedDelivery'].setValue(false);
    }

    this.uploadImage = productDetail.productImage;

    this.detailsForm.controls['manufacturer'].setValue(productDetail.manufacturerId);

  }

  getCategory() {
    this.productSandbox.getCategoryList({ limit: '', offset: 0 });
  }

  addCategory(category) {
    this.showError = '';
    this.selectedCategory.push(category);
    this.productSandbox.addCategory(category);
  }

  removecategory(category) {
    this.selectedCategory = this.selectedCategory.filter(cat => {
      if (cat.categoryId === category.categoryId) {
        return false;
      } else {
        return true;
      }
    });
    this.productSandbox.removeCategory(category);
  }

  addAllCategory(categoryList) {
    this.showError = '';
    this.selectedCategory = categoryList;
    this.productSandbox.addCategory(categoryList);
  }

  removeAllCategory() {
    if (this.selectedCategory.length > 0) {
      this.productSandbox.removeCategory(this.selectedCategory);
      this.selectedCategory = [];
    }
  }


  ngAfterViewInit() {}
  submitInitialSetup(tabId) {
    this.productSubmit = true;

    if (!this.productForm.valid) {
      this.validateAllFormFields(this.productForm);
      this.generalTab = false;
      return;
    }
    const img = $('.category-wrap');
    img.fadeIn();
    this.generalTab = true;
    this.tabset.select(tabId);
  }

  resetInitialForm() {
    this.productForm.reset();
  }

  resetDetailForm() {
    this.detailsForm.reset();
  }

  resetCategory() {
    this.removeAllCategory();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
}

  submitDetail() {
    this.detailSubmit = true;
    if (!this.detailsForm.valid) {
      this.validateAllFormFields(this.detailsForm);
      return;
    }
    this.prodTab = true;
    this.tabset.select('4');
  }

  submitImage() {
    this.detailSubmit = true;
    this.imageTab = true;
    this.tabset.select('7');
  }

  submitPrice() {
    this.detailSubmit = true;
    this.priceTab = true;
    this.tabset.select('6');
  }

  submitCategory() {
    if (this.selectedCategory.length === 0) {
      this.showError = 'Choose any one category';
      return;
    }
    this.catTab = true;
    this.tabset.select('3');
  }

  uploadProductImages() {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg', windowClass: 'image-manager'
    });
    modalRef.result.then(result => {
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
    });
  }

  // delete image
  deleteImage(i) {
    this.uploadImage.splice(i, 1);
  }

  searchAvailableCategories(keyword) {
    this.productSandbox.searchCategory(keyword);
  }

  /**
   * Handles  'searchSelectedCategory' event. And show the searched result  in the form
   *
   * @param filter searchbox  value
   */
  searchSelectedCategory(filter: String) {
    this.filterCategory = this.selectedCategory;
    this.filterCategory = this.selectedCategory.filter(item => {
      if (
        item.categoryName
          .toString()
          .toLowerCase()
          .indexOf(filter.toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    });
  }

  submitProduct() {
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
    if (!this.productForm.valid) {
      this.validateAllFormFields(this.productForm);
      this.productSubmit = true;
      this.tabset.select('1');
      return;
    }

    if (!this.detailsForm.valid) {
      this.validateAllFormFields(this.detailsForm);
      this.detailSubmit = true;
      this.tabset.select('3');
      return;
    }
    if (this.uploadImage.length === 0) {
      this.toaster.error('Choose any one product image');
      this.tabset.select('4');
      return;
    }
    if (!this.priceForm.valid) {
      return;
    }
    if (!this.variantForm.valid) {
      this.validateAllFormFields(this.variantForm);
      this.detailSubmit = true;
      this.variantTab = false;
      this.tabset.select('7');
      return;
    }
    this.variantTab = true;
    if (!this.seoForm.valid) {
      this.validateAllFormFields(this.seoForm);
      this.productSubmit = true;
      this.seoTab = false;
      this.tabset.select('6');
      return;
    }
    this.seoTab = true;

    if (this.uploadImage.length > 0) {
      this.imageTab = true;
    }
    const tempObj = Object.assign(
      this.productForm.value,
      this.detailsForm.value
    );
    const category = this.selectedCategory.map(val => {
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
    const params: any = tempObj;
    if (params.dateAvailable) {
      const date = params.dateAvailable;
      const fDate = new Date(date.year, date.month - 1, date.day);
      params.dateAvailable = this.datePipe.transform(fDate, 'yyyy/MM/dd');
    }
    params.relatedProductId = [];
    params.image = this.uploadImage;
    params.categoryId = category;
    params.condition = 1;
    params.vendorId = 21;
    params.price = +this.priceForm.controls['productPrice'].value;
    params.packingCost = +this.priceForm.controls['packingPrice'].value;
    params.shippingCost = +this.priceForm.controls['shippingPrice'].value;
    params.others = +this.priceForm.controls['others'].value;

    params.tax = this.taxType === '2' ? this.currentTaxId : this.taxValue;
    params.taxType = Number(this.taxType);

    if (this.specialArray.length > 0) {
      if (this.specialForm.valid) {
        let array = [];
         array = this.specialForm.value.specialItems.map(data => {
          return {specialCustomerGroup: data.specialCustomerGroup , skuName: data.specialSku, specialDateEnd: data.specialDateEnd,
            specialDateStart: data.specialDateStart, specialPrice: data.specialPrice, specialPriority: data.specialPriority};
        });
        params.productSpecial = array;
      }
    }
    if (this.discountArray.length > 0) {
        let array = [];
        array = this.discountForm.value.discountItems.map(data => {
          return {disCustomerGroup: data.disCustomerGroup , skuName: data.discountSku, discountDateEnd: data.discountDateEnd,
            discountDateStart: data.discountDateStart, discountPrice: data.discountPrice, discountPriority: data.discountPriority};
        });
        params.productDiscount = array;
      }
    params.metaTagTitle = this.seoForm.controls['metaTagTitle'].value;
    params.metaTagKeyword = this.seoForm.controls['metaTagKeyword'].value;
    params.metaTagDescription = this.seoForm.controls['metaTagDescription'].value;

    if (this.detailsForm.value.pincodeBasedDelivery === true) {
      params.pincodeBasedDelivery = 1;
    } else {
      params.pincodeBasedDelivery = 0;
    }


       // options request make
  params.manufacturerId = this.detailsForm.value.manufacturer;
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
      params.productVarientOption = final;
      params.productVarient = this.selectedVaraintId;

    } else {
      params.productVarientOption = [];
      params.productVarient = [];
    }

      params.productId = this.editId;
      this.productSandbox.doProductUpdate(params);
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
      params.productVarientOption = final;
      params.productVarient = this.selectedVaraintId;

    } else {
      params.productVarientOption = [];
      params.productVarient = [];
    }

      this.productSandbox.doProductAdd(params);
      this.productSandbox.productAddLoaded$.subscribe(data => {
        if (data) {
          this.getTotalProductCount();
        }
      });
    }
  }

    // options functanality

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
    let mainSku = this.productForm.controls['sku'].value;
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
    },
  );
}

addImageToOptions(image , option, index) {
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

  submitVariant() {
    this.detailSubmit = true;
    if (!this.variantForm.valid) {
      this.validateAllFormFields(this.variantForm);
      return;
    }
    this.variantTab = true;
    this.tabset.select('5');
  }

  // tax functanalities
  getTotalProductCount() {
    const params: any = {};
    params.count = 1;
    this.productSandbox.getProductListCount(params);
  }

  selectRadio(event) {
  }

  getPrice(evt) {
    this.getGrossTotal();
    this.getTotalPrice();
    this.getTaxValueByPercentage(this.taxPercentage);
 }

 getTotalPrice() {
  this.changeDetectRef.detectChanges();
  this.totalPrice = (+this.priceForm.controls['productPrice'].value) + this.taxValue;
}

// get tax type form radio button click
  getTaxValue(event) {
    this.taxValue = 0;
    this.taxPercentage = null;
    this.taxType = event.value;
    this.getGrossTotal();
    this.getTaxValueByPercentage(this.taxPercentage);
  }

  getTaxPercentage(val) {
    if (val) {
      this.currentTaxId = Number(val);
      if (this.taxArray && this.taxArray['length'] > 0) {
         this.taxArray.forEach(data => {
           if (data.taxId === this.currentTaxId) {
               this.taxPercentage = data.taxPercentage;
               this.getTaxValueByPercentage(this.taxPercentage);
           }
         });
      }
    } else {
      this.taxValue = 0;
      this.getTotalPrice();
    }

  }

  getGrossTotal() {
    this.grossTotal = (+this.priceForm.controls['productPrice'].value);
  }

  getTaxValueByPercentage(data) {
      this.taxValue = data ? ( Number(this.priceForm.controls['productPrice'].value) / 100 ) * data : 0;
      this.getTotalPrice();
  }

  getTax(val) {
    this.taxValue = Number(val);
    this.getTotalPrice();
  }


  ngOnDestroy() {
    this.productSandbox.variantClear();
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
