import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnquiryDialogComponent } from '../enquiry-dialog/enquiry-dialog.component';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})


export class ServiceDetailComponent implements OnInit {


  public contactForm: FormGroup;
  public subcsription: Array<Subscription> = [];
  public serviceDetail: any;
  public serviceId: number;
  public currentCategory: any;
  public imageUrl = environment.imageUrl;

  constructor(public formBuilder: FormBuilder, public dialog: MatDialog,
     public listSandbox: ListsSandbox, public activeRoute: ActivatedRoute) {
      activeRoute.params.subscribe(data => {
        if (data['serviceId']) {
          this.serviceId = +data['serviceId'];
        }
        if (data['id']) {
          this.getServiceList(data['id']);
        }
        this.currentCategory = data['category'];
      });
     }

  ngOnInit() {
  }

  public openEnquiryDialog(service) {
    const dialogRef = this.dialog.open(EnquiryDialogComponent, {
      panelClass: 'service-dialog',
      data: service

    });
  }

  getServiceList(id) {
    const params: any = {};
    params.categoryId = id;
    this.listSandbox.getServiceList(params);
    this.subscribeEvent();
  }

  subscribeEvent() {
    this.subcsription.push(this.listSandbox.serviceList$.subscribe(list => {
      if (list) {
        list.forEach(each => {
          if (each.serviceId === this.serviceId) {
            this.serviceDetail = each;
          }
        });
      }
    }));
  }
}
