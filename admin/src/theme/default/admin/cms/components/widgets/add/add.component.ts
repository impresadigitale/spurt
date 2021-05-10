/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import {Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { environment } from '../../../../../../../environments/environment';
import { WidgetSandbox } from '../../../../../../../core/admin/cms/widgets/widgets.sandbox';


@Component({
  selector: 'app-cms-widget-add',
  templateUrl: 'add.component.html',
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ],
  providers: [DatePipe]
})
export class WidgetsAddComponent implements OnInit, OnDestroy {

  private closeResult: string;
  public widgetInfo: any;
  public serviceData: any;
  public ImageUrl: any = '';
  public widgetsForm: FormGroup;
  public submitted = false;
  public postImageUrl: any;
  public editWidgetId: any;
  public id = '';
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];
  public Productkeyword = '';
  public categorykeyword = '';
  // Image
  @ViewChild('filePath') filePath: ElementRef;
  public linkWidgetId: any;
  public selectedProductId = [];
  public selectedCategoryId = [];
  public todayDate: any;
  public categoryError = false;
  public productError = false;
  public throttle = 50;
  public scrollDistance = 2;
  public scrollUpDistance = 2;
  public direction = '';
  public limit = 10;
  public productOffset = 0;
  public catOffset = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: WidgetSandbox,
    public datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.getProductList();
    this.getCategoryList();
    this.linkWidgetId = 2;
    this.todayDate = new Date();
    this.imageUrl = environment.imageUrl;
    this.postImageUrl = './assets/img/addpic.svg';
    this.initForm();
    this.editWidgetId = this.route.snapshot.paramMap.get('id');
    if (this.editWidgetId) {
      const param: any = {};
      param.widgetId = this.editWidgetId;
      this.sandbox.getWidgetDetails(param);
      this.editWidgetData();
    }
  }

  getProductList() {
    const params: any = {};
    params.offset = this.productOffset;
    params.limit = this.limit;
    params.keyword = this.Productkeyword;
    params.sku = '';
    params.status = 1;
    params.price = '';
    params.isRefresh = false;
    this.sandbox.getProductList(params);
  }


  onProductScrollDown() {
    this.productOffset += this.limit;
    this.getProductList();
  }

  getCategoryList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.catOffset;
    params.count = '';
    params.keyword = this.categorykeyword;
    params.sortOrder = '';
    params.status = 1;
    params.isSearch = false;
    this.sandbox.getCategoryList(params);
  }

  onCategoryScrollDown() {
    this.catOffset += this.limit;
    this.getCategoryList();
  }

  //  cancel it  navigate  to - add page to  list page
  widgetCancel() {
    this.router.navigate(['/cms/widgets']);
  }

  // Form  Initialization
  initForm() {
    this.widgetsForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      position: ['', Validators.required],
      status: ['', Validators.required],
      content: [''],
      widgetlinkType: ['2', Validators.required],
      metaDescription: ['', Validators.compose([
        Validators.maxLength(160)
      ])],
      metaTitle: ['', Validators.compose([
        Validators.maxLength(60)
      ])],
      metaKeyword: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox widget  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  public onSubmit() {
    this.submitted = true;
    if (!this.widgetsForm.valid) {
      this.validateAllFormFields(this.widgetsForm);
      return;
    } else {
      if (this.widgetsForm.value.widgetlinkType === '1') {
        if (this.selectedCategoryId.length === 0) {
          this.categoryError = true;
          window.scrollTo(0, document.body.scrollHeight);
          return;
        }
      } else if (this.widgetsForm.value.widgetlinkType === '2') {
        if (this.selectedProductId.length === 0) {
          this.productError = true;
          window.scrollTo(0, document.body.scrollHeight);
          return;
        }
      }
      const params: any = {};
      params.title = this.widgetsForm.value.title;
      params.position = +this.widgetsForm.value.position;
      params.status = +this.widgetsForm.value.status;
      params.metaTagTitle = this.widgetsForm.value.metaTitle;
      params.metaTagDescription = this.widgetsForm.value.metaDescription;
      params.metaTagKeyword = this.widgetsForm.value.metaKeyword;
      params.content = this.widgetsForm.value.content;
      params.widgetLinkType = +this.widgetsForm.value.widgetlinkType;
      if (this.widgetsForm.value.widgetlinkType === '1') {
        params.refId = this.selectedCategoryId;
      } else if (this.widgetsForm.value.widgetlinkType === '2') {
        params.refId = this.selectedProductId;
      } else {
        params.refId = [];
      }

      if (this.editWidgetId) {
        params.widgetId = +this.editWidgetId;
        this.sandbox.updateWidget(params);
      } else {
        this.sandbox.addWidget(params);
      }
      this.subscribe();
    }
  }

  subscribe() {
    if (this.editWidgetId) {
      this.subscriptions.push(this.sandbox.updateWidget$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/cms/widgets']);
        }
      }));
    } else {
      this.subscriptions.push(this.sandbox.getAddNewWidget$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/cms/widgets']);
        }
      }));
    }

  }

  // editWidget Data
  editWidgetData() {
    this.subscriptions.push(this.sandbox.getWidgetDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setWidget(data);

      }
    }));
  }

  setWidget(details) {
    this.selectedCategoryId = [];
    this.selectedProductId = [];
    this.widgetsForm.controls['title'].setValue(details.widgetTitle);
    this.widgetsForm.controls['position'].setValue(details.position);
    this.widgetsForm.controls['status'].setValue(details.isActive);
    this.widgetsForm.controls['metaTitle'].setValue(details.metaTagTitle);
    this.widgetsForm.controls['metaDescription'].setValue(details.metaTagDescription);
    this.widgetsForm.controls['metaKeyword'].setValue(details.metaTagKeyword);
    this.widgetsForm.controls['content'].setValue(details.widgetDescription);
    if (details.widgetLinkType === 1) {
      this.linkWidgetId = 1;
      this.widgetsForm.controls['widgetlinkType'].setValue('1');
      if (details.refId && details.refId.length > 0) {
        details.refId.forEach(data => {
          this.selectedCategoryId.push(data.categoryId);
        });
      }
    } else if (details.widgetLinkType === 2) {
      this.linkWidgetId = 2;
      this.widgetsForm.controls['widgetlinkType'].setValue('2');
      if (details.refId && details.refId.length > 0) {
        details.refId.forEach(data => {
          this.selectedProductId.push(data.productId);
        });
      }
    }
    this.widgetsForm.controls['content'].setValue(details.widgetDescription);


  }


  //  validation controls  -  function (f) is using in widget add html
  get f() {
    return this.widgetsForm.controls;
  }

  // show all validation at when invalid form
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

  linkWidgetTo(event) {
    this.linkWidgetId = +event.target.value;
    if (this.linkWidgetId === 1) {
      this.selectedCategoryId = [];
      this.sandbox.clearSelectedProducts();
    } else {
      this.selectedProductId = [];
      this.sandbox.clearSelectedCategories();
    }
  }

  selectProduct(event, product) {
    if (event.target.checked) {
      this.selectedProductId.push(product.productId);
    } else {
      this.selectedProductId = this.selectedProductId.filter(data => {
        if (data === product.productId) {
          return false;
        } else {
          return true;
        }
      });
    }
    const params: any = {};
    params.checked = event.target.checked;
    params.product = product;
    this.sandbox.selectProduct(params);
  }

  searchProduct(value) {
    this.Productkeyword = value;
    this.productOffset = 0;
    const params: any = {};
    params.offset = this.productOffset;
    params.limit = this.limit;
    params.keyword = this.Productkeyword;
    params.sku = '';
    params.status = 1;
    params.price = '';
    params.isRefresh = true;
    this.sandbox.getProductList(params);
  }

  searchSelectedProduct(value) {
    const params: any = {};
    params.keyword = value;
    this.sandbox.searchSelectedProduct(params);
  }

  selectCategory(event, category) {
    if (event.target.checked) {
      this.selectedCategoryId.push(category.categoryId);
    } else {
      this.selectedCategoryId = this.selectedCategoryId.filter(data => {
        if (data === category.categoryId) {
          return false;
        } else {
          return true;
        }
      });
    }
    const params: any = {};
    params.checked = event.target.checked;
    params.category = category;
    this.sandbox.selectCategory(params);
  }

  searchCategory(value) {
    this.categorykeyword = value;
    this.catOffset = 0;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.catOffset;
    params.count = '';
    params.keyword = this.categorykeyword;
    params.sortOrder = '';
    params.status = 1;
    params.isSearch = true;
    this.sandbox.getCategoryList(params);
  }

  searchSelectedCategory(value) {
    const params: any = {};
    params.keyword = value;
    this.sandbox.searchSelectedCategory(params);
  }

  ngOnDestroy() {
    this.sandbox.clear();
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
