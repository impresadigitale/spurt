/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServicesService } from '../../../../../../../core/admin/services/service/service.Service';
import { ServicesSandbox } from '../../../../../../../core/admin/services/service/service.Sandbox';
import { ServicesCategoriesSandbox } from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import { ImagemanagerpopupComponent } from '../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-serviceslist-add',
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

export class ServicesListAddComponent implements OnInit, OnDestroy {

    public servicesForm: FormGroup;
    public serviceCategoryTitle: FormControl;
    public serviceCategoryCost: FormControl;
    public serviceCategoryPhoneNumber: FormControl;
    public serviceCategoryStatus: FormControl;
    public serviceCategoryDescription: FormControl;
    public metaTagDescription: FormControl;
    public metaTagTitle: FormControl;
    public metaTagKeyword: FormControl;
    public submittedValues = false;
    public list: any;
    public selectedServiceArray: any = [];
    public selectedServiceSearched: any = [];
    public selectedServiceCategoryId: any = [];
    public addOneTimeData = false;
    public editId: any;
    private closeResult: any;
    private getDismissReason: any;
    public uploadImage: any = [];
    // default image
    public defaultImage = 0;
    // image view
    public imageUrls: string;
    // temp values
    public tempCategoryId: string;
    // search categoryKeyword
    private categoryKeyword = '';
    public length: number;
    public serviceId: any;
    private subscriptions: Array<Subscription> = [];
    public defaultImageValue: any = 1;



    constructor(private serivesService: ServicesService,
        private servicesSandbox: ServicesSandbox,
        private popup: NgbModal,
        public configService: ConfigService,
        private changeDetectRef: ChangeDetectorRef,
        public serviceCategorySandBox: ServicesCategoriesSandbox,
        private fb: FormBuilder,
        public route: ActivatedRoute) {
        this.route.params.subscribe(data => {
            this.serviceId = data.id;
        });
    }

    /**             LIFECYCLE HOOK METHOD CALLS AFTER THE CONSTRUCTOR
     *initially  calls _initForm(),getServiceCategoryList() method.
     * get data from service (serivesService) in getServices method.
     * calls editServicesList if ServicesEditdata is avilable.
     **/
    ngOnInit() {
        if (this.serviceId) {
            this.servicesSandbox.getServiceDetails({serviceId: this.serviceId});
            this.subscribe();
        }
        this.initForm();
        this.getServiceCategoryList();
        this.imageUrls = this.configService.getImageUrl();
    }

    // Reactive Form  Initialization
    initForm() {
        this.serviceCategoryTitle = new FormControl('', Validators.compose([
            Validators.required,
            Validators.maxLength(255)
          ]));
        this.serviceCategoryCost = new FormControl('');
        this.serviceCategoryPhoneNumber = new FormControl('', Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(4)
          ]));
        this.serviceCategoryStatus = new FormControl('', [Validators.required]);
        this.serviceCategoryDescription = new FormControl('', Validators.compose([
            Validators.maxLength(255)
          ]));
        this.metaTagTitle = new FormControl('', Validators.compose([
            Validators.maxLength(60)
          ]));
        this.metaTagDescription = new FormControl('');
        this.metaTagKeyword = new FormControl('', Validators.compose([
            Validators.maxLength(255)
          ]));
        this.servicesForm = this.fb.group({
            serviceCategoryTitle: this.serviceCategoryTitle,
            serviceCategoryCost: this.serviceCategoryCost,
            serviceCategoryPhoneNumber: this.serviceCategoryPhoneNumber,
            serviceCategoryStatus: this.serviceCategoryStatus,
            serviceCategoryDescription: this.serviceCategoryDescription,
            metaTagTitle: this.metaTagTitle,
            metaTagDescription: this.metaTagDescription,
            metaTagKeyword: this.metaTagKeyword,
        });
    }

    /**             ADD SERVICE
     * calls servicesSandbox addService to add service
     * @param formValue from reactive form
     * @param param.categoryId from formValue
     * @param param.title from formValue
     * @param param.mobile from formValue
     * @param param.price from formValue
     * @param param.image from formValue
     * @param param.status from formValue
     * @param param.description from formValue
     * @param param.metaTagTitle from formValue
     * @param param.metaTagDescription from formValue
     * @param param.metaTagKeyword from formValue
     * **/
    onSubmit(formValue) {
        if (!this.servicesForm.valid) {
            this.validateAllFormFields(this.servicesForm);
            return;
        }
        const param: any = {};
        param.categoryId = this.selectedServiceCategoryId;
        param.title = formValue.serviceCategoryTitle;
        const tempMobile = (formValue.serviceCategoryPhoneNumber);
        param.mobile = tempMobile;
        const tempPrice = +(formValue.serviceCategoryCost);
        param.price = tempPrice;
        param.image = this.uploadImage;
        const tempStatus = +(formValue.serviceCategoryStatus);
        param.status = tempStatus;
        param.description = formValue.serviceCategoryDescription;
        param.metaTagTitle = formValue.metaTagTitle;
        param.metaTagDescription = formValue.metaTagDescription;
        param.metaTagKeyword = formValue.metaTagKeyword;
        if (this.serviceId) {
            param.serviceId = this.serviceId;
            this.servicesSandbox.updateService(param);
        } else {
            this.servicesSandbox.addService(param);
            this.subscriptions.push(this.servicesSandbox.getServicesAdd$.subscribe(data => {
                if (data && data.status === 1) {
                    this.servicesSandbox.getServiceCount();
                }
            }));
        }

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

    // Mobile Number Validation
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        const inputNo = String.fromCharCode(event.charCode);
        const submitkey = event.key === 'Enter';
        if (event.keyCode !== 8 && !pattern.test(inputNo) && !submitkey) {
            event.preventDefault();
        }
    }

    /**             DELETE AVAILABLE CATEGORIES LIST
     * calls serviceCategorySandBox productRemoveList,
     * after pushing the service datas into selectedCategories(array)
     * @param data from available categories
     * @param i from available categories
     * **/
    selectedCategories(data, i) {
        this.selectedServiceArray.push(data);
        this.selectedServiceCategoryId.push(data.serviceCategoryId);
        this.serviceCategorySandBox.serviceRemoveList(i);
    }



    /**             SERVICE CATEGORY LIST
     * calls  serviceCategorySandBox serviceCategorylist
     * @param param.limit set by default as empty.
     * @param param.offset set by default as empty.
     * @param param.keyword set by default as empty.
     * @param param.sortOrder set by default as empty.
     * **/

    getServiceCategoryList() {
        const param: any = {};
        param.limit = '';
        param.offset = '';
        param.keyword = this.categoryKeyword;
        param.sortOrder = '';
        this.serviceCategorySandBox.serviceCategorylist(param);
    }

    /**         DELETE SELECTED CATEGORIES LIST
     * calls serviceCategorySandBox serviceAddList,
     * after deleting  data in selectedServiceArray.
     * @param category from selectedCategories
     * **/
    removeSelectedCategories(category) {
        for (let i = 0; i < this.selectedServiceArray.length; i++) {
            if (this.selectedServiceArray[i].serviceCategoryId === category.serviceCategoryId) {
                this.selectedServiceArray.splice(i, 1);
                this.selectedServiceCategoryId.splice(i, 1);
                this.serviceCategorySandBox.serviceAddList(category);
            }
        }
    }

     // ck editor
    checkBox(event, ii) {
        const index: number = ii;
        for (let i = 0; i < this.uploadImage.length; i++) {
        if (index === i && event.target.checked) {
            this.uploadImage[i].defaultImage = 1;
        } else {
            this.uploadImage[i].defaultImage = 0;
        }
        }
    }

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
                for (let i = 1; i < this.uploadImage.length; i++) {
                this.uploadImage[i].defaultImage = 0;
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

    // delete selected image
    deleteImage(index) {
        this.uploadImage.splice(index, 1);
    }

    // select the default image
    imageCheckBox(index) {
        this.defaultImage = index;
    }

    /*** EDIT SERVICE ADD  FORM (REACTIVE FORM)
     * edit service reactive form with values from service list**/
    editServicesList(details) {
        this.servicesForm.controls['serviceCategoryTitle'].setValue(details.title);
        this.servicesForm.controls['metaTagTitle'].setValue(details.metaTagTitle);
        this.servicesForm.controls['metaTagDescription'].setValue(details.metaTagDescription);
        this.servicesForm.controls['metaTagKeyword'].setValue(details.metaTagKeyword);
        this.selectedServiceArray = details.category;
        this.serviceCategorySandBox.serviceCategorylist(details.category);

        if (details.Image.length > 0) {
            for (let i = 0; i < details.Image.length; i++) {
                if (details.Image[i].defaultImage === 1) {
                    this.defaultImage = i;
                }
            }
            this.uploadImage = JSON.parse(JSON.stringify(details.Image));
            this.changeDetectRef.detectChanges();
        }

        this.selectedServiceArray.forEach(element => {
            this.selectedServiceCategoryId.push(element.serviceCategoryId);
        });
        this.servicesForm.controls['serviceCategoryPhoneNumber'].setValue(details.mobile);
        this.servicesForm.controls['serviceCategoryCost'].setValue(details.price);
        this.servicesForm.controls['serviceCategoryDescription'].setValue(details.description);
        this.servicesForm.controls['serviceCategoryStatus'].setValue(details.isActive);
    }

    /** SEARCH AVAILABLE CATEGORY
     *  @param event from serach box
     *
     *  **/
    searchCategories(event) {
        this.categoryKeyword = event.target.value;
        this.getServiceCategoryList();
    }

    /**                     SEARCH SELECTED CATEGORY
     * Handles  'searchSelectedCategory' event. And show the searched result  in the form
     *
     * @param filter searchbox  value
     */
    searchSelectedCategory(filter: String) {
        if (!filter) {
            this.selectedServiceSearched = [];
        }
        this.selectedServiceSearched = this.selectedServiceArray.filter(item => {
            if (item.name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                return true;
            }
            return false;
        }
        );
    }

    subscribe() {
        this.subscriptions.push(this.servicesSandbox.serviceDetails$.subscribe(details => {
            if (details && Object.keys(details).length) {
                this.editServicesList(details);
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}

