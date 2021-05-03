import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonSandbox } from '../../../../../../core/common/common.sandbox';
import { ConfigService } from '../../../../../../core/services/config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],

})
export class BusinessDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('filePathForUser') filePathForUser: ElementRef;
  @ViewChild('filePathForCompany') filePathForCompany: ElementRef;
  @ViewChild('filePathForCover') filePathForCover: ElementRef;

  public UserForm: FormGroup;
  public userDetails: any = {};
  public companyForm: FormGroup;

  // upload image
  public vendorId: any;
  public imageUrl: any;
  public companyImageUrl: any;
  private userImage: any;
  private companyImage: any;
  public imagePath: string;
  private subscriptions: Array<Subscription> = [];
  public ifImageAvailable: string;
  public ifCompanyImageAvailable: string;
  public ifCoverImageAvailable: string;
  public coverImageUrl: any;
  private coverImage: any;
  public countryId: any;

  constructor(
    public modal: NgbModal,
    public formBuilder: FormBuilder,
    public configService: ConfigService,
    public commonSandbox: CommonSandbox,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initiateUserForm();
    this.initiatecompanyForm();
    this.vendorId = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.imagePath = this.configService.getImageUrl();
    this.regDetailEvent();
    this.getCountryList();
    this.regDetailEvent();
    $('#button').on('click', function() {
      if ($('.error-field')) {
        $('html, body').animate({
          'scrollTop' : $('.error-field').position()['top']
      });
      }
  });
  }

  // get country list
  getCountryList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    this.commonSandbox.getCountryList(params);
    this.subscriptions.push(this.commonSandbox.getCountryList$.subscribe(data => {
      if (data) {
        this.getCountryId(data);
      }
    }));
  }

  getCountryId(list) {
    list.forEach(data => {
      if (data.isoCode3 === 'IND') {
        this.countryId = data.countryId;
        this.companyForm.controls['country'].setValue(data['countryId']);
      }
    });

  }
  // initiate user form event
  initiatecompanyForm() {
      this.companyForm = this.formBuilder.group({
        name: ['', Validators.required],
        address1: [''],
        address2: [''],
        city: [''],
        state: ['', Validators.required],
        pincode: [''],
        country: ['', Validators.required],
        mobileNo: [''],
        email: ['', Validators.required],
        website: [''],
        gst: ['']

      });
    }

  // initiate user form event
  initiateUserForm() {
    this.UserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required]
    });
  }

  // subscribe user detail event
  regDetailEvent() {
    this.subscriptions.push(
      this.commonSandbox.getProfile$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.setUserForm(data);
          this.setcompanyForm(data);
          this.userDetails = data;
          this.ifImageAvailable = this.userDetails.customerDetail.avatarPath;
          this.imageUrl =
            this.imagePath +
            '?path=' +
            this.userDetails.customerDetail.avatarPath +
            '&name=' +
            this.userDetails.customerDetail.avatar +
            '&width=100&height=100';
            this.ifCompanyImageAvailable = this.userDetails.companyLogoPath;
          this.companyImageUrl = this.imagePath + '?path=' + this.userDetails.companyLogoPath + '&name=' + this.userDetails.companyLogo + '&width=100&height=100';

          this.ifCoverImageAvailable = this.userDetails.companyCoverImagePath;
          this.coverImageUrl = this.imagePath + '?path=' + this.userDetails.companyCoverImagePath + '&name=' + this.userDetails.companyCoverImage + '&width=100&height=100';
        }
      })
    );
  }
  // set value to companyForm
  setcompanyForm(data) {
    if (data.companyCountryId) {
      this.countryId = data.companyCountryId;
      this.getZoneList();
    }
      this.companyForm.controls['name'].setValue(data['companyName']);
      this.companyForm.controls['address1'].setValue(data['companyAddress1']);
      this.companyForm.controls['address2'].setValue(data['companyAddress2']);
      this.companyForm.controls['city'].setValue(data['companyCity']);
        this.companyForm.controls['state'].setValue(data['companyState']);
      this.companyForm.controls['pincode'].setValue(data['pincode']);
      this.companyForm.controls['country'].setValue(data['companyCountryId']);
      this.companyForm.controls['mobileNo'].setValue(data['companyMobileNumber']);
      this.companyForm.controls['email'].setValue(data['companyEmailId']);
      this.companyForm.controls['website'].setValue(data['companyWebsite']);
      this.companyForm.controls['gst'].setValue(data['companyGstNumber']);

    }
  // set value to userform
  setUserForm(data) {
    this.UserForm.controls['firstName'].setValue(
      data['customerDetail']['firstName']
    );
    this.UserForm.controls['lastName'].setValue(
      data['customerDetail']['lastName']
    );
    this.UserForm.controls['email'].setValue(data['customerDetail']['email']);
    this.UserForm.controls['mobileNo'].setValue(
      data['customerDetail']['mobileNumber']
    );
  }

  saveUserDetails() {
    if (!this.UserForm.valid) {
      this.validateAllFormFields(this.UserForm);
      return;
    }
    const params: any = {};
    params.firstName = this.UserForm.controls['firstName'].value;
    params.email = this.UserForm.controls['email'].value;
    params.mobileNumber = this.UserForm.controls['mobileNo'].value;
    params.lastName = this.UserForm.controls['lastName'].value;
    params.avatar = this.userImage;
    params.companyName = this.userDetails['companyName'];
    params.companyAddress1 = this.userDetails['companyAddress1'];
    params.companyAddress2 = this.userDetails['companyAddress2'];
    params.companyCity = this.userDetails['companyCity'];
    params.companyCountryId = this.userDetails['companyCountryId'];
    params.pincode = this.userDetails['pincode'];
    params.companyMobileNumber = Number(this.userDetails['companyMobileNumber']);
    params.companyEmailId = this.userDetails['companyEmailId'];
    params.companyWebsite = this.userDetails['companyWebsite'];
    params.companyGstNumber = this.userDetails['companyGstNumber'];
    params.companyPanNumber = this.userDetails['companyPanNumber'];
    params.bankInformation = this.userDetails['bankInformation'];
    params.vendorId = this.vendorId['vendorId'];
    this.commonSandbox.doEditProfile(params);
    this.subscriptions.push(this.commonSandbox.editProfileLoaded$.subscribe(data => {
      if (data === true) {
        this.commonSandbox.doGetProfile();
      }
    }));
  }

  saveCompanyDetails() {
    if (!this.companyForm.valid) {
      this.validateAllFormFields(this.companyForm);
      return;
    }
    const params: any = {};
    params.firstName = this.userDetails['customerDetail']['firstName'];
    params.email = this.userDetails['customerDetail']['email'];
    params.mobileNumber = this.userDetails['customerDetail']['mobileNumber'];
    params.lastName = this.userDetails['customerDetail']['lastName'];
    params.designation = this.userDetails['designation'];
    params.companyName = this.companyForm.controls['name'].value;
    params.companyLogo = this.companyImage;
    params.companyCoverImage = this.coverImage;
    params.companyAddress1 = this.companyForm.controls['address1'].value;
    params.companyAddress2 = this.companyForm.controls['address2'].value;
    params.companyCity = this.companyForm.controls['city'].value;
    params.companyState = this.companyForm.controls['state'].value;
    params.companyCountryId = this.companyForm.controls['country'].value;
    params.pincode = this.companyForm.controls['pincode'].value;
    params.companyMobileNumber = Number(this.companyForm.controls['mobileNo'].value);
    params.companyEmailId = this.companyForm.controls['email'].value;
    params.companyWebsite = this.companyForm.controls['website'].value;
    params.companyGstNumber = this.userDetails['companyGstNumber'];
    params.companyPanNumber = this.userDetails['companyPanNumber'];
    params.bankInformation = this.userDetails['bankInformation'];
    params.vendorId = this.vendorId['vendorId'];
    params.companyGstNumber = this.companyForm.controls['gst'].value;
    this.commonSandbox.doEditProfile(params);
    this.subscriptions.push(this.commonSandbox.editProfileLoaded$.subscribe(data => {
      if (data === true) {
        this.commonSandbox.doGetProfile();
      }
    }));
  }

  /**
   * upload new user image
   *
   * @param el refer the HTMLElement filePath
   * it will activate the click function of el
   */
  uploadButtonClickForUser() {
    const el: HTMLElement = this.filePathForUser.nativeElement as HTMLElement;
    el.click();
  }
  uploadButtonClickForCompany() {
    const el: HTMLElement = this.filePathForCompany.nativeElement as HTMLElement;
    el.click();
  }

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

  // calls convertBase64 to convert data into base64 formt
  uploadChange($event): void {
    this.ifImageAvailable = 'avatar';
    this.convertBase64($event.target);
  }

  // calls convertBase64 to convert data into base64 formt
  uploadCompanyImageChange($event): void {
    this.ifCompanyImageAvailable = 'avatar';
    this.convertCompanyImageBase64($event.target);
  }

  // convert image file into Base64 format
  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.imageUrl = myReader.result;
      this.userImage = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  // convert image file into Base64 format
  convertCompanyImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.companyImageUrl = myReader.result;
      this.companyImage = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  selectCountry(event) {
    this.countryId = +event.target.value;
    this.companyForm.controls['state'].setValue('');
    if (event.target.value === '99') {
      this.getZoneList();
    }
  }

  getZoneList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    this.commonSandbox.getZoneList(params);
  }

  uploadButtonClickForCover() {
    const el: HTMLElement = this.filePathForCover.nativeElement as HTMLElement;
    el.click();
  }
  uploadCoverImageChange($event): void {
    this.ifCoverImageAvailable = 'avatar';
    this.convertCoverImageBase64($event.target);
  }

      // convert image file into Base64 format
  convertCoverImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.coverImageUrl = myReader.result;
      this.coverImage = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
