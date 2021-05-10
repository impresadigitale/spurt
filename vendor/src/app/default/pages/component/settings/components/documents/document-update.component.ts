import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonSandbox } from '../../../../../../core/common/common.sandbox';
import * as _ from 'lodash';


@Component({
  selector: 'app-document-update',
  templateUrl: './document-update.component.html',
  styleUrls: ['./document-update.component.scss']
})
export class DocumentUpdateComponent implements OnInit {


  public uploadCsvFile = false;
  public uploadFile = '';
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public listEnable = true;
  public fileData: any;
  public title = '';
  public fileName = '';
  public uploadSubmit = false;
  public fileError: any;
  public vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public documentTypeError = false;


  constructor(
    public commonSandbox: CommonSandbox,
    private changeDetectRef: ChangeDetectorRef,
    public toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getDocumentList();
    this.getCsvCount();
    this.commonSandbox.updateDocumentLoaded$.subscribe(data => {
      if (data === true) {
        this.uploadFile = '';
        this.getDocumentList();
        this.listEnable = true;
      }
    });
  }

  upload() {
    this.listEnable = false;
  }

  getTitle(value) {
    this.title = value;
  }

  onUpload(files) {
    this.fileName = files[0].name;
    this.convertBase64(files);
  }

  convertBase64(inputValue: any) {
    this.documentTypeError = false;
    if (inputValue && inputValue[0].type) {
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!_.includes(allowed_types, inputValue[0].type)) {
      this.fileName = '';
      this.fileData = undefined;
      this.documentTypeError = true;
      return false;
    }
    this.documentTypeError = false;
    const file: File = inputValue[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.fileData = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }
}

  uploadSuccess() {
    this.uploadSubmit = true;
    if (!this.fileData || this.title === '') {
      return;
    }
    const params: any = {};
    params.customerData	 = this.fileData;
    params.title = this.title;
    this.commonSandbox.updateDocument(params);
  }

  download(id) {
    this.commonSandbox.downloadDocument(id);
  }

  getDocumentList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    this.commonSandbox.getDocumentList(params);
  }

  getCsvCount() {
    const params: any = {};
    params.count = 1;
    params.vendorId = this.vendorDetails['vendorId'];
    this.commonSandbox.getDocumentCount(params);
  }

  reset() {
    this.uploadSubmit = false;
    this.fileData = undefined;
    this.title = '';
    this.fileName = '';
    this.documentTypeError = false;
  }

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getDocumentList();
  }
}
