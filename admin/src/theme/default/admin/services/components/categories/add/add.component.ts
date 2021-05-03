/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router , ActivatedRoute} from '@angular/router';
import { ServicesSandbox } from '../../../../../../../core/admin/services/service/service.Sandbox';
import {ConfigService} from './../../../../../../../core/admin/service/config.service';
import {ServicesCategoriesSandbox} from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import { ServicesCategoriesService } from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { onerror } from 'q';


@Component({
    selector: 'app-services-categories-add',
    templateUrl: 'add.component.html',
    styleUrls: ['./add.component.scss'],
    encapsulation: ViewEncapsulation.None,
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
    ]
})

export class ServicesCategoryAddComponent implements OnInit, OnDestroy {

    @ViewChild('filePath') filePath: ElementRef;
    public serviceCategory: FormGroup;
    public submittedValues = false;
    private serviceCategoryEditdata: any;
    public postImageUrl: any;
    public ImageUrl: any = '';
    public imageUrl: string;
    public categoryId: any;
    private subscriptions: Array<Subscription> = [];
    public imageTypeError = false;
    public imageSizeError = false;


    constructor(private modalService: NgbModal, public fb: FormBuilder, public serviceCategorySandBox: ServicesCategoriesSandbox,
        private serviceCategoryService: ServicesCategoriesService, private  configService: ConfigService,
        private router: Router, private cd: ChangeDetectorRef,
        public route: ActivatedRoute,
        public serviceSandbox: ServicesSandbox) {
    }

    ngOnInit() {
        this.postImageUrl = 'assets/upload-banner/upload.png';
        this.imageUrl = this.configService.getImageUrl();
        this.initForm();
        this.route.params.subscribe(data => {
            if (data) {
                this.categoryId = data.id;
            }
        });
        this.serviceCategoryEditdata = this.serviceCategoryService.getServicecategories();
        if (this.categoryId) {
            const params: any = {};
            params.serviceCategoryId = this.categoryId;
            this.serviceCategorySandBox.getCategoryDetails(params);
            this.editServiceCategoryList();
        }
        this.serviceCategoryList(0, '');
    }

    initForm() {
        this.serviceCategory = this.fb.group({
            serviceCategoryName: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(255),
              ])],
            serviceCategoryTitle: [null, Validators.compose([
                Validators.maxLength(60),
              ])],
            serviceCategoryDescription: [null, Validators.compose([
                Validators.maxLength(160),
              ])],
            serviceCategoryKeyword: [null, Validators.compose([
                Validators.maxLength(255),
              ])],
            serviceCategorySortOrder: [null, [Validators.required]],
            parentId: [null],
            status: [null, [Validators.required]],
            imageInput: ['']
        });
    }

    onSubmit(form) {
        this.submittedValues = true;
        if (this.serviceCategory.invalid) {
            return;
        }
        const param: any = {};
        param.name = form.serviceCategoryName;
        param.sortOrder = form.serviceCategorySortOrder;
        param.metaTagDescription = form.serviceCategoryDescription;
        param.metaTagKeyword = form.serviceCategoryKeyword;
        param.metaTagTitle = form.serviceCategoryTitle;
        param.parentInt = form.parentId;
        param.status = form.status;
        param.image = this.ImageUrl;
        if (this.categoryId) {
            param.serviceCategoryId = this.categoryId;
        this.serviceCategorySandBox.updateServiceCategory(param);
        } else {
        this.serviceCategorySandBox.addServiceCategory(param);
        this.subscriptions.push(this.serviceCategorySandBox.getServiceCategoriesAdd$.subscribe(data => {
            if (data && data.status === 1) {
              this.serviceSandbox.getServiceCount();
            }
        }));
        }
    }

    ngOnDestroy() {

    }

    // validation for reactive form
    get f() {
        return this.serviceCategory.controls;
    }

    /**
     * Handles  'Service Categorylist' event. Calls sandbox Service Categorylist function .
     *
     * @param pageSize form pagination
     *  @param offset form offset
     */
    serviceCategoryList(offset: number = 0, keyword) {
        const param: any = {};
        param.limit = 500;
        param.offset = 0;
        param.keyword = '';
        this.serviceCategorySandBox.serviceCategorylist(param);
    }

    editServiceCategoryList() {
        this.subscriptions.push(this.serviceCategorySandBox.categoryDetails$.subscribe(data => {
            if (data && Object.keys(data).length) {
                this.setCategory(data);
            }
        }));
    }

    setCategory(details) {
        this.serviceCategory.controls['serviceCategoryName'].setValue(details.name);
        this.serviceCategory.controls['serviceCategoryTitle'].setValue(details.metaTagTitle);
        this.serviceCategory.controls['serviceCategoryDescription'].setValue(details.metaTagDescription);
        this.serviceCategory.controls['serviceCategoryKeyword'].setValue(details.metaTagKeyword);
        this.serviceCategory.controls['parentId'].setValue(details.parentInt);
        this.serviceCategory.controls['serviceCategorySortOrder'].setValue(details.sortOrder);
        this.serviceCategory.controls['status'].setValue(details.isActive);
        this.serviceCategory.controls['imageInput'].setValue(details.image);
        this.postImageUrl = details.imagePath !== '' ? this.imageUrl + '?path=' + `${details.imagePath}` + '&name=' + `${details.image}` + '&width=160&height=150' : './assets/upload-banner/upload.png';
    }

    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    uploadChange($event): void {
        this.convertBase64($event.target);
    }

  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;

    if (inputValue.files && inputValue.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!_.includes(allowed_types, inputValue.files[0].type)) {
      this.imageTypeError = true;
      this.ImageUrl = '';
      this.postImageUrl = './assets/upload-banner/upload.png';
      this.filePath.nativeElement.value = '';
      this.serviceCategory.controls['imageInput'].setValue('');
      return false;
    }
    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > 2048) {
      this.imageSizeError = true;
      this.ImageUrl = '';
      this.postImageUrl = './assets/upload-banner/upload.png';
      this.filePath.nativeElement.value = '';
      this.serviceCategory.controls['imageInput'].setValue('');
       return;
    }
    this.imageTypeError = false;
    this.imageSizeError = false;
    const file: File = inputValue.files[0];
    this.serviceCategory.controls['imageInput'].setValue(file ? file.name : '');
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.cd.detectChanges();
    };
    myReader.readAsDataURL(file);
   }
  }
    cancleForm() {
        this.serviceCategoryService.setServicecategories('');
        this.router.navigate(['/services/servicesCategory']);

    }
}

