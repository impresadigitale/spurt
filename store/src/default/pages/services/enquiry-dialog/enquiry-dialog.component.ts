import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../../default/theme/utils/app-validators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enquiry-dialog',
  templateUrl: './enquiry-dialog.component.html',
  styleUrls: ['./enquiry-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class EnquiryDialogComponent implements OnInit {

  public enquiryForm: FormGroup;
  public submitted = false;

  constructor(
    public dialogRef: MatDialogRef<EnquiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public service: any,
    public formBuilder: FormBuilder,
    public listSandbox: ListsSandbox,
    public router: Router
  ) {}

  ngOnInit() {
    this.initenquiryForm();
  }

  public close(): void {
    this.dialogRef.close();
  }

  initenquiryForm() {
    this.enquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      mobile: ['', Validators.required],
      comments: ['']
    });
  }

  submitEnquiry() {
    this.submitted = true;
    if (!this.enquiryForm.valid) {
      return;
    }
    const params = this.enquiryForm.value;
    params.serviceId = this.service.serviceId;
    this.listSandbox.createEnquiry(params);
    this.listSandbox.enquirySuccess$.subscribe(success => {
      if (success && success.status === 1) {
        this.close();
        this.router.navigate(['/services/enquiry-success']);
      }
    });
  }
}
