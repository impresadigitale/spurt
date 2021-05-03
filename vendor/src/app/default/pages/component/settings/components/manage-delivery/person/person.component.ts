import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { DeliverySandbox } from '../../../../../../../core/delivery/delivery.sandbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../../../../../../shared/popup/delete-popup/delete-popup.component';
import { environment } from '../../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../../../shared/validation/confirm.password';
@Component({
  selector: 'app-manage-delivery',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {


  @ViewChild('filePathForUser') filePathForUser: ElementRef;


  public add = false;
  public keyword = '';
  public submitted = false;
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public location = false;
  public locationType: any;
  public selectedCity: any;
  public editLocationId: any;
  public editPersonId: any;
  public locationForm: FormGroup;
  public addPersonForm: FormGroup;
  public ifImageAvailable: string;
  public locationError = '';
  public imageUrl: any;
  public fileData: any;
  public fileName = '';
  public locationDisable = false;
  public upload = false;
  public locationArray: any = [];
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public baseImageUrl = environment.imageUrl;
  public userImage: any;
    cities = [
        {id: 1, name: '600056, Camproad, Tambaram'},
        {id: 2, name: '600044, RP Road, Chrompet'},
    ];

  constructor(
    public formbuilder: FormBuilder,
    public deliverySandBox: DeliverySandbox, public modal: NgbModal, public toaster: ToastrService
  ) {
    this.deliverySandBox.deliveryLocationList$.subscribe(data => {
      if (data) {
        this.locationArray = data;
      }
    });
  }

  ngOnInit() {
    this.initPersonsForm();
    this.getDeliveryLocationlist();
    this.getDeliveryPersonslist();
    this.getDeliveryPersonsCount();
    $('body').on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
      });
  }

  initPersonsForm() {
    this.addPersonForm = this.formbuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confpassword: ['', Validators.compose([Validators.required])],
      allLocation: [false],
      location: [''],
      status: [false]
    }, {
      validator: MustMatch('password', 'confpassword')
  });
  }

  searchPerson(value) {
    this.keyword = value;
    this.getDeliveryPersonslist();
    this.getDeliveryPersonsCount();
  }

  getDeliveryPersonslist() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    this.deliverySandBox.getDeliveryPersonslist(params);
  }

  getDeliveryLocationlist() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    this.deliverySandBox.getDeliveryLocationlist(params);
  }

  // calls convertBase64 to convert data into base64 formt
  uploadChange($event): void {
    this.ifImageAvailable = 'avatar';
    this.convertBase64($event.target);
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

  uploadBtnClick() {
    this.upload = true;
  }

  getDeliveryPersonsCount() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    this.deliverySandBox.getDeliveryPersonlistCount(params);
  }

  openDelete() {
    this.modal.open(DeletePopupComponent);
  }

  addUser() {
    this.add = true;
  }

  addLocationPage(type) {
    this.locationType = type;
    this.location = true;
  }

  remove(type) {
    if (type === 'user') {
      this.add = false;
      this.addPersonForm.reset();
      this.imageUrl = '';
      this.userImage = '';
      this.ifImageAvailable = null;
      this.locationDisable = false;
      this.editPersonId = null;
    }
    if (type === 'location') {
      this.location = false;
      this.locationForm.reset();
      this.upload = false;
      this.editLocationId = null;
    }
  }

  addDeliveryPerson() {
    const locationArray = [];
    if (this.selectedCity) {
     this.selectedCity.forEach((data: any) => {
      if (data) {
        locationArray.push(data.deliveryLocationId);
      }
     });
    }

    this.submitted = true;
    if (this.editPersonId) {
      if (!this.addPersonForm.value.password && !this.addPersonForm.value.confirmPassword) {
        this.addPersonForm.controls['password'].clearValidators();
        this.addPersonForm.controls['password'].updateValueAndValidity();
        this.addPersonForm.controls['confpassword'].clearValidators();
        this.addPersonForm.controls['confpassword'].updateValueAndValidity();
      }
    } else {
      this.addPersonForm.controls['password'].setValidators([Validators.required, Validators.minLength(5)]);
      this.addPersonForm.controls['password'].updateValueAndValidity();
      this.addPersonForm.controls['confpassword'].setValidators([Validators.required]);
      this.addPersonForm.controls['confpassword'].updateValueAndValidity();
    }
    if (!this.addPersonForm.valid) {
      this.validateAllFormFields(this.addPersonForm);
      return;
    }

    if ((!this.selectedCity || this.selectedCity === null) && (this.addPersonForm.value.allLocation === 0 || this.addPersonForm.value.allLocation === false)) {
      this.locationError = 'Please Choose Location';
      return;
    }
    const params: any = {};
    params.firstName = this.addPersonForm.value.name;
    params.mobileNumber = this.addPersonForm.value.mobileNumber;
    params.allLocation = this.addPersonForm.value.allLocation === true ? 1 : 0;
    params.location = locationArray.toString();
    params.image = this.userImage;
    params.status	 = this.addPersonForm.value.status === true ? 1 : 0;
    params.emailId = this.addPersonForm.value.email;
    if (this.addPersonForm.value.password) {
      params.password = this.addPersonForm.value.password;
    }
    if (this.addPersonForm.value.confpassword) {
      params.confirmPassword = this.addPersonForm.value.confpassword;
    }
        if (this.editPersonId) {
      params.deliveryPersonId = this.editPersonId;
      this.deliverySandBox.doDeliveryPersonUpdate(params);
      this.deliverySandBox.deliveryPersonUpdateLoaded$.subscribe(data => {
        if (data === true) {
          this.getDeliveryPersonslist();
          this.getDeliveryPersonsCount();
          this.remove('user');
        }
      });
    } else {
      this.deliverySandBox.doDeliveryPersonAdd(params);
      this.deliverySandBox.deliveryPersonAddLoaded$.subscribe(data => {
        if (data === true) {
          this.getDeliveryPersonslist();
          this.getDeliveryPersonsCount();
          this.remove('user');
        }
      });
    }
  }

  // page change event
  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getDeliveryPersonslist();
  }

  editPerson(array, city) {
    this.selectedCity = array.locations !== [] ? this.getLocationBasedOnPerson(array.locations) : null;
    this.ifImageAvailable = array.imagePath;
    this.imageUrl = (array.image && array.imagePath) ? this.baseImageUrl + '?path=' + array.imagePath + '&name=' + array.image + '&width=100&height=100' : '';
    $( '.user-menu' ).removeClass( 'show' );
    this.add = true;
    this.locationDisable = array.allLocation === 1 ? true : false;
    this.editPersonId = array.id;
    this.addPersonForm.controls['name'].setValue(array.firstName);
    this.addPersonForm.controls['email'].setValue(array.email);
    this.addPersonForm.controls['mobileNumber'].setValue(array.mobileNumber);
    this.addPersonForm.controls['allLocation'].setValue(array.allLocation === 1 ? true : false);
    this.addPersonForm.controls['status'].setValue(array.isActive);
  }

  getLocationBasedOnPerson(array) {
    return this.locationArray.filter(val => array.some((data) => val.deliveryLocationId === data.deliveryLocationId));
  }

  deleteDeliveryPerson(id) {
    const params: any = {};
    params.deliveryId = id;
    this.deliverySandBox.doDeliveryPersonDelete(params);
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

  allLocationChange(event) {
    this.locationError = '';
    if (event.target.checked === true) {
     this.locationDisable = true;
     this.selectedCity = null;
  } else {
      this.locationDisable = false;
  }
}

  downloadCsv() {
    this.deliverySandBox.downloadMainCsv({});
  }

  // get upload data event by using input 'file' change event
  onUpload(files) {
    this.fileData = files[0];
    this.fileName = files[0].name;
  }
  // reset all fields event
  reset() {
    this.fileData = undefined;
    this.fileName = '';
  }
  statusChange(event, val) {
    const locationArray = [];
    if (this.selectedCity) {
    val.locations.forEach((data: any) => {
      if (data) {
        locationArray.push(data.deliveryLocationId);
      }
      });
    }
    const featureValue = event.target.checked;
    let status: any;
    if (featureValue === true) {
      status = 1;
    } else {
      status = 0;
    }
    const params: any = {};
    params.deliveryPersonId = val.id;
    params.status = status;
    params.firstName = val.firstName;
    params.mobileNumber = val.mobileNumber;
    params.allLocation = val.allLocation;
    params.location = locationArray.toString();
    params.image = this.userImage;
    params.emailId = val.email;
    this.deliverySandBox.doDeliveryPersonUpdate(params);
  }
}
