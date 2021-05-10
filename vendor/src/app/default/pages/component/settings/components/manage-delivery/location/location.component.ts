import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
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
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

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
  public locationForm: FormGroup;
  public ifImageAvailable: string;
  public locationError = '';
  public imageUrl: any;
  public fileData: any;
  public fileName = '';
  public locationDisable = false;
  public upload = false;
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public baseImageUrl = environment.imageUrl;
  public userImage: any;
  cities = [
    { id: 1, name: '600056, Camproad, Tambaram' },
    { id: 2, name: '600044, RP Road, Chrompet' }
  ];


  constructor(
    public formBuilder: FormBuilder,
    public deliverySandBox: DeliverySandbox,
    public modal: NgbModal,
    public toaster: ToastrService
  ) {}

  ngOnInit() {
    this.initLocationForm();
    this.getDeliveryLocationlist();
    this.getDeliveryLocationCount();
    $('body').on('click', '.dropdown-menu', function(e) {
      e.stopPropagation();
    });
  }

  initLocationForm() {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  searchLocation(value) {
    this.keyword = value;
    this.getDeliveryLocationlist();
    this.getDeliveryLocationCount();
  }

  getDeliveryLocationlist() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    this.deliverySandBox.getDeliveryLocationlist(params);
  }

  uploadChange($event): void {
    this.ifImageAvailable = 'avatar';
    this.convertBase64($event.target);
  }

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

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getDeliveryLocationlist();
  }

  getDeliveryLocationCount() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    this.deliverySandBox.getDeliveryLocationlistCount(params);
  }

  openDelete() {
    this.modal.open(DeletePopupComponent);
  }

  addUser() {
    this.add = true;
  }

  addLocationPage(type) {
    this.editLocationId = null;
    this.locationType = type;
    this.location = true;
  }

  remove(type) {
    if (type === 'location') {
      this.location = false;
      this.locationForm.reset();
      this.upload = false;
      this.editLocationId = null;
    }
  }

  addLocation() {
    this.submitted = true;
    if (!this.locationForm.valid) {
      this.validateAllFormFields(this.locationForm);
      return;
    }
    const params: any = {};
    params.locationName = this.locationForm.value.name;
    params.zipCode = this.locationForm.value.pinCode;
    if (this.editLocationId) {
      params.deliveryLocationId = this.editLocationId;
      this.deliverySandBox.doDeliveryUpdate(params);
      this.deliverySandBox.deliveryUpdateLoaded$.subscribe(data => {
        if (data === true) {
          this.locationForm.reset();
          this.location = false;
        }
      });
    } else {
      this.deliverySandBox.doDeliveryAdd(params);
      this.deliverySandBox.deliveryAddLoaded$.subscribe(data => {
        if (data === true) {
          this.locationForm.reset();
          this.getDeliveryLocationlist();
          this.getDeliveryLocationCount();
          this.location = false;
        }
      });
    }
  }

  editLocation(array) {
    $('.location-menu').removeClass('show');
    this.editLocationId = array.deliveryLocationId;
    this.location = true;
    this.locationType = 'location-page';
    this.locationForm.controls['name'].setValue(array.locationName);
    this.locationForm.controls['pinCode'].setValue(array.zipCode);
  }

  deleteLocation(id) {
    const params: any = {};
    params.deliveryId = id;
    this.deliverySandBox.doDeliveryDelete(params);
  }

  deleteDeliveryLocation(id) {
    const params: any = {};
    params.deliveryId = id;
    this.deliverySandBox.doDeliveryDelete(params);
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

  onUpload(files) {
    this.fileData = files[0];
    this.fileName = files[0].name;
  }

  uploadSuccess() {
    if (!this.fileData) {
      this.toaster.error('Please choose the file');
      return;
    }
    const params: any = {};
    params.productData = this.fileData;
    this.deliverySandBox.uploadMainCsv(params);
    this.deliverySandBox.uploadMainCsvLoaded$.subscribe(data => {
      if (data === true) {
        this.getDeliveryLocationlist();
        this.getDeliveryLocationCount();
        this.location = false;
        this.reset();
        this.upload = false;
      }
    });
  }

  reset() {
    this.fileData = undefined;
    this.fileName = '';
  }
}
