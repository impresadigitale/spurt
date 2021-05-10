/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy
} from '@angular/core';
import {
  ModalDismissReasons,
  NgbPanelChangeEvent
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { SellerSandbox } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.service';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import {Observable} from 'rxjs';
import { MustMatch } from '../../../../../../../../../core/admin/vendor/pages/shared/validation/must-match.validator';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../../../../../shared/components/interface/custom-password-validation';


@Component({
  selector: 'app-seller-add',
  templateUrl: 'seller-add.component.html',
  styleUrls: ['seller-add.component.scss']
})
export class SellerAddComponent implements OnInit, OnDestroy {


  // formgroup variable
  public sellerAddForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public avatar: FormControl;
  public avatarPath: FormControl;
  public companyName: FormControl;
  public companyLogo: FormControl;
  public companyDescription: FormControl;
  public companyAddress1: FormControl;
  public companyAddress2: FormControl;
  public companyCity: FormControl;
  public companyState: FormControl;
  public companyCountryId: FormControl;
  public pincode: FormControl;
  public mailStatus: FormControl;
  public companyWebsite: FormControl;
  public status: FormControl;
  public commission: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public mobileNumber: FormControl;
  public paymentInformation: FormControl;
  // Variable
  public submitted = false;
  public selectedPaymentMethod = '';
  public value: any;
  public sellerInfo: any = [];
  public id: any;
  public myValue: boolean;
  public myValues: boolean;
  public details: any;
  public datas: any;
  public ImageUrl: any;
  public postImageUrl: any;
  public postImageUrls: any;
  public coverPostImageUrl: any;
  public CoverImageUrl: any;
  public imageUrls: any;
  public getBaseImageUrl: any;
  public getBaseImageUrls: any;
  public getBaseCoverImageUrls: any;
  public countryId: any;
  @ViewChild('filePath') filePath: ElementRef;
  @ViewChild('filePathCover') filePathCover: ElementRef;
  @ViewChild('filePathCompany') filePathCompany: ElementRef;
  public filteredOptions: Observable<any[]>;
  public name = '';
  public options: any[];
  public ckeConfig: any;
  public showBackToTop = false;
  public passwordField = '';
  private subscriptions: Array<Subscription> = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public sellerSandbox: SellerSandbox,
    private service: SellerService,
    private changeDetectRef: ChangeDetectorRef,
    private configService: ConfigService
  ) {
  }

  // style purpose using
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.sellerForm();
    $('#final').on('click', function() {
      $('html, body').animate({
          'scrollTop' : $('.is-invalid').position().top
      });
  });
    this.getCountryList();
    this.postImageUrl = './assets/upload-banner/upload.png';
    this.postImageUrls = './assets/upload-banner/upload.png';
    this.coverPostImageUrl = './assets/upload-banner/upload.png';

    this.getBaseImageUrl = this.configService.getImageUrl();
    this.getBaseImageUrls = this.configService.getImageUrl();
    this.getBaseCoverImageUrls = this.configService.getImageUrl();
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.myValue = true;
    this.myValues = false;
    this.id = this.route.snapshot.params.id;
    this.submitted = false;
    this.pageDetails();
    if (!this.id) {
      this.sellerForm();
    } else {
      this.sellerUpdateForm();
    }

    this.subscriptions.push(this.sellerSandbox.pageDetails$.subscribe(data => {
      if (data) {
        this.details = data;
        if (this.id) {
          if (this.details.companyCountryId) {
            this.countryId = this.details.companyCountryId;
          }
          this.sellerAddForm.controls.firstName.setValue(
            this.details.customerDetail.firstName
          );
          this.sellerAddForm.controls.lastName.setValue(
            this.details.customerDetail.lastName
          );
          this.sellerAddForm.controls.mobileNumber.setValue(
            this.details.customerDetail.mobileNumber
          );

          this.sellerAddForm.controls.companyName.setValue(
            this.details.companyName
          );

          this.sellerAddForm.controls.companyDescription.setValue(
            this.details.companyDescription
          );

          this.sellerAddForm.controls.commission.setValue(
            this.details.commission
          );
          this.sellerAddForm.controls.status.setValue(
            this.details.customerDetail.isActive
          );


          this.sellerAddForm.controls.companyAddress1.setValue(
            this.details.companyAddress1
          );

          this.sellerAddForm.controls.companyAddress2.setValue(
            this.details.companyAddress2
          );


          this.sellerAddForm.controls.companyCity.setValue(
            this.details.companyCity
          );

          this.sellerAddForm.controls.companyCountryId.setValue(
            this.details.companyCountryId
          );

          this.sellerAddForm.controls.companyState.setValue(
            this.details.companyState
          );


          this.sellerAddForm.controls.pincode.setValue(
            this.details.pincode
          );
          this.sellerAddForm.controls.paymentInformation.setValue(
            this.details.paymentInformation
          );
          this.sellerAddForm.controls.gst.setValue(
            this.details.companyGstNumber
          );

          this.postImageUrl =
            this.getBaseImageUrl +
            '?path=' +
            this.details.customerDetail.avatarPath +
            '&name=' +
            this.details.customerDetail.avatar +
            '&width=160&height=150';

          this.postImageUrls =
          this.getBaseImageUrls +
          '?path=' +
          this.details.companyLogoPath +
          '&name=' +
          this.details.companyLogo +
          '&width=160&height=150';

          this.coverPostImageUrl =
          this.getBaseCoverImageUrls +
          '?path=' +
          this.details.companyCoverImagePath +
          '&name=' +
          this.details.companyCoverImage +
          '&width=160&height=150';

        }
      }
    }));

  // ck editor
  this.ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea',
    height: '100%'
  };
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
      ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  getCountryList() {
    const param: any = {};
    param.status = 1;
    this.sellerSandbox.getCountriesList(param);
    this.sellerSandbox.getCountryList$.subscribe(data => {
      if (data) {
        this.options = data;
        this.getCountryId(data);
      }
    });
  }

  getCountryId(list) {
      list.forEach(data => {
        if (data.isoCode3 === 'IND') {
          this.countryId = data.countryId;
          this.sellerAddForm.controls.companyCountryId.setValue(
            this.countryId
          );
        }
      });
  }

  pageDetails() {
    const params: any = {};
    params.id = this.id;
    this.sellerSandbox.pageDetails(params);
  }


  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  logoButtonClick() {
    const els: HTMLElement = this.filePathCompany.nativeElement as HTMLElement;
    els.click();
  }

  logoChange($event): void {
    this.convertsBase64($event.target);
  }

  convertsBase64(inputValues: any): void {
    const files: File = inputValues.files[0];
    const myReaders: FileReader = new FileReader();

    myReaders.onloadend = e => {
      this.postImageUrls = myReaders.result;
      this.imageUrls = myReaders.result;

      this.changeDetectRef.detectChanges();
    };
    myReaders.readAsDataURL(files);
  }


  profileButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  profileChange($event): void {
    this.convertBase64($event.target);
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  coverButtonClick() {
    const el: HTMLElement = this.filePathCover.nativeElement as HTMLElement;
    el.click();
  }

  coverChange($event): void {
    this.convertBase64ForCover($event.target);
  }

  convertBase64ForCover(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.coverPostImageUrl = myReader.result;
      this.CoverImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  sellerForm() {
    const emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';

    this.sellerAddForm = this.fb.group({

      firstName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.minLength(3),
          Validators.maxLength(32)
        ])],
      lastName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.maxLength(32)
        ])],
      email: ['', Validators.compose([
          Validators.required,
          Validators.pattern(emailPattern),
          Validators.email,
          Validators.maxLength(96)
        ])
      ],
      mobileNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8),
        Validators.maxLength(50)
      ])],
      confirmPassword: [
        '', Validators.required
      ],
      commission: ['', [Validators.required]],
      status: ['', [Validators.required]],
      avatar: [''],
      mailStatus: [''],
      companyLogo: [''],
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(nameValidationPattern)])],
      companyDescription: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
      companyAddress1: ['', Validators.compose([
        Validators.maxLength(128)
      ])],
      companyAddress2: ['', Validators.compose([
        Validators.maxLength(128)
      ])],
      companyCity: ['',  Validators.compose([
        Validators.maxLength(128)
      ])],
      companyState: ['',  Validators.compose([
        Validators.maxLength(128)
      ])],
      companyCountryId: ['', [Validators.required]],
      pincode: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(4)

      ])],
      companyWebsite: [''],
      paymentInformation: [''],
      coverLogo: [''],

      gst: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  sellerUpdateForm() {
    const emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';
      this.sellerAddForm = this.fb.group({
      firstName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.minLength(3),
          Validators.maxLength(32)
        ])],
      lastName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.maxLength(32)
        ])],
      mobileNumber: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15)
        ])],
      commission: ['', [Validators.required]],
      status: ['', [Validators.required]],
      avatar: [''],
      mailStatus: [''],
      companyLogo: [''],
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(nameValidationPattern)])],
      companyDescription: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
      companyAddress1: ['', Validators.compose([
        Validators.maxLength(128)
      ])],
      companyAddress2: ['', Validators.compose([
        Validators.maxLength(128)
      ])],
      companyCity: ['',  Validators.compose([
        Validators.maxLength(128)
      ])],
      companyState: ['',  Validators.compose([
        Validators.maxLength(128)
      ])],
      companyCountryId: ['', [Validators.required]],
      pincode: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(6)
      ])],
      companyWebsite: [''],
      paymentInformation: [''],
      gst: [''],
      coverLogo: [''],
      password: [''],
      confirmPassword: [''],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  keyPress(event: any) {
    const pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Handles form 'onSubmit' event . Calls sandbox addCustomers(for add customer)function and updateCustomers(for update Customer)
   * @param customerForm entire form value
   * @param params storing entire form value
   */
  onSubmit() {
    this.submitted = true;
    if (this.id) {
      this.sellerAddForm.removeControl('email');
    }

    if (this.sellerAddForm.invalid) {
      return;
    }
    const params: any = {};
    params.firstName = this.sellerAddForm.value.firstName;
    params.lastName = this.sellerAddForm.value.lastName;
    params.mobileNumber = this.sellerAddForm.value.mobileNumber;
    if (this.ImageUrl) {
      params.avatar = this.ImageUrl;
    }
    params.commission = this.sellerAddForm.value.commission;
    params.status = this.sellerAddForm.value.status;
    params.companyName = this.sellerAddForm.value.companyName;
    if (this.imageUrls) {
      params.companyLogo = this.imageUrls;
    }

    if (this.CoverImageUrl) {
      params.companyCoverImage = this.CoverImageUrl;
    }
    params.companyDescription = this.sellerAddForm.value.companyDescription;
    params.companyAddress1 = this.sellerAddForm.value.companyAddress1;
    params.companyAddress2 = this.sellerAddForm.value.companyAddress2;
    params.companyCity = this.sellerAddForm.value.companyCity;
    params.companyState = this.sellerAddForm.value.companyState;
    params.companyCountryId = this.sellerAddForm.value.companyCountryId;
    params.pincode = this.sellerAddForm.value.pincode;
    params.companyWebsite = this.sellerAddForm.value.companyWebsite;
    params.mailStatus = this.sellerAddForm.value.mailStatus;
    params.paymentInformation = this.sellerAddForm.value.paymentInformation;
    params.companyGstNumber = this.sellerAddForm.value.gst;
    params.password = this.sellerAddForm.value.password;
    params.confirmPassword = this.sellerAddForm.value.confirmPassword;
    if (this.sellerAddForm.value.mailStatus === true) {
      params.mailStatus = 1;
    } else {
      params.mailStatus = 0;
    }
    if (this.id) {
      params.customerId = this.details.customerId;
      this.sellerSandbox.sellerUpdate(params);
    } else  if (!this.id) {
    params.email = this.sellerAddForm.value.email;

      this.sellerSandbox.sellerAdd(params);
    }
  }

  cancel() {
    this.router.navigate(['/vendors/vendor/seller']);
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  conditionalValidator(
    condition: () => boolean,
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }

  public scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
        if (window.pageYOffset !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 10);
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        });
    }
}

  get f() {
    return this.sellerAddForm.controls;
  }

  selectCountry(event) {
    this.countryId = +event.target.value;
    if (this.countryId === 99) {
      this.sellerAddForm.controls.companyState.setValue('');
      this.getZoneList();
    }
  }

  getZoneList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.sellerSandbox.zoneList(params);
  }

  enterPassword(value) {
    if (value) {
      this.passwordField = value;
    } else {
      this.passwordField = '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
