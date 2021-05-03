import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { MatDialog } from '@angular/material/dialog';
import { EnquiryDialogComponent } from '../enquiry-dialog/enquiry-dialog.component';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})

export class ServiceListComponent implements OnInit {


  public contactForm: FormGroup;
  public categoryId: any;
  public currentCategory: any;
  public imageUrl = environment.imageUrl;


  constructor(
    public formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public listSandbox: ListsSandbox,
    public dialog: MatDialog,
  ) {
    activeRoute.params.subscribe(data => {
      this.currentCategory = data['category'];
      if (data['id']) {
        this.categoryId = data['id'];
        this.getServiceList(data['id']);
      }
    });
  }

  ngOnInit() {}

  getServiceList(id) {
    const params: any = {};
    params.categoryId = id;
    this.listSandbox.getServiceList(params);
  }

  public openEnquiryDialog(service) {
    const dialogRef = this.dialog.open(EnquiryDialogComponent, {
      panelClass: 'service-dialog',
      data: service
    });
  }
}
