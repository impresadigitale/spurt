import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ImportSandbox } from '../../../../../../../core/admin/catalog/import/import.sandbox';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-bulk-product-upload',
  templateUrl: './bulk-product-upload.component.html',
  styleUrls: ['./bulk-product-upload.component.scss']
})
export class BulkProductUploadComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  public zipFileName: any;
  public zipFile: any;
  public zipFileError = '';
  public multipleFile: any = [];
  public zipFileSelected = false;
  private subscriptions: Array<Subscription> = [];
  public initialPage = true;
  public uploadPage = false;
  public uploadSubmit = false;


  constructor(public sandbox: ImportSandbox,
            public toastr: ToastrManager,
            public cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  downloadFile() {
    this.sandbox.downloadFile({});
  }

  uploadZip() {
    this.initialPage = false;
    this.uploadPage = true;
  }

  onUpload(event) {
    this.zipFile = event.target.files[0];
    this.zipFileName = event.target.files[0].name;
  }

  reset(fileInput) {
    this.zipFileName = '';
    this.zipFile = undefined;
    this.uploadSubmit = false;
    this.fileInput.nativeElement.value = '';
  }

  // upload file

  uploadSuccess() {
    this.uploadSubmit = true;
    if (!this.zipFile) {
      return;
    }
    const ext = /^.+\.([^.]+)$/.exec(this.zipFile.name);
    if (!ext || (ext && ext[1] !== 'zip')) {
      this.toastr.errorToastr('Please choose the zip file');
      this.zipFile = undefined;
      this.zipFileName = '';
      return;
    }
      const params: any = {};
      params.file = this.zipFile;
      this.sandbox.uploadFile(params);
      this.subscriptions.push(this.sandbox.uploadFile$.subscribe(data => {
        if (data && data.status === 1) {
          this.uploadPage = false;
          this.initialPage = true;
          this.zipFileSelected = false;
          this.zipFileName = '';
          this.cd.detectChanges();
        }
      }));
    }

    ngOnDestroy() {
      this.subscriptions.forEach(each => each.unsubscribe());
    }
}