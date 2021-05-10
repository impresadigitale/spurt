/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { SizeChartSandbox } from 'src/core/admin/settings/siteSettings/sizechart/sizechart.sandbox';

@Component({
  selector: 'app-sizechart',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],

})
export class SizeChartComponent implements OnInit {


  private subscriptions: Array<Subscription> = [];
  public chartForm: FormGroup;
  public submitted = false;
  public headerPart = false;
  public headerText: any = '';
  private offset = 0;
  public pageSize = '10';
  private keyword = '';
  public errorData = false;
  public editId: any = '';
  public finalHeaderValues = [];
  public selectedItem = [];
  public editChartId: any = '';
  private popoverContent: string;


  constructor(
    public sandbox: SizeChartSandbox,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.headerTextList();
  }


  ngOnInit() {
    this.initForm();
    this.editChartId = this.route.snapshot.paramMap.get('id');
    this.subscribtionCreateHeaderText();
    if (this.editChartId) {
      this.detailsSizeChart();
  }
  }

  initForm() {
    this.chartForm = this.fb.group({
      chartName: ['',  Validators.required],
    },
    );
  }

  addHeader() {
    this.headerPart = true;
  }

  addHederText() {
    if (this.headerText !== '') {
      const param: any = {};
      param.headerText = this.headerText;
      if (this.editId == '') {
        this.sandbox.createHeaderTest(param);
      } else {
        param.id = this.editId;
        this.sandbox.updateHeaderTest(param);
        this.subscriptions.push(this.sandbox.updateHeaderTextLoaded$.subscribe(data => {
          if (data) {
            this.headerPart = false;
            this.headerTextList();
            this.headerText = '';
            this.editId = '';
            this.sandbox.clearHeaderText();

          }
        })
      );
      }
    } else {
      this.errorData = true;
    }
  }

  headerTextList() {
    const param: any = {};
    param.limit = '';
    param.offset = this.offset;
    param.keyword = this.keyword;
    this.sandbox.headerTextList(param);
  }

  headerData(event) {
    if (event.target.value == '') {
      this.errorData = true;
    } else {
       this.errorData = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.chartForm.valid) {
      this.validateAllFormFields(this.chartForm);
      $('input.ng-invalid').first().focus();
      return;
    }
    this.finalHeaderValues = [];
    this.selectedItem.forEach(element => {
      this.finalHeaderValues.push({'id': element.id, 'headerText': element.headerText})
    });
    const params: any = {};
    params.templateName = this.chartForm.value.chartName;
    params.header = this.finalHeaderValues;
    if (this.editChartId) {
      params.id = this.editChartId;
      this.sandbox.updateSizeChart(params);
    } else {
      this.sandbox.createSizeChart(params);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  deleteHeaderText(item, deletePop) {
    this.popoverContent = deletePop;
    this.sandbox.deleteHeaderText({ id: item.id });
    this.subscriptions.push(this.sandbox.deleteHeaderTextLoader$.subscribe(data => {
      if (data) {
       this.sandbox.clearHeaderText();
       this.editId = '';
       this.headerText = '';
       this.headerPart = false;
       this.headerTextList();
      }
    })
  );
  }

  subscribtionCreateHeaderText() {
    this.subscriptions.push(this.sandbox.createHeaderTextLoaded$.subscribe(data => {
        if (data) {
         this.headerPart = false;
         this.headerTextList();
         this.sandbox.clearHeaderText();
         this.headerText = '';
        }
      })
    );
  }

  editHeaderText(item) {
    this.headerPart = true;
    this.editId = item.id;
    this.headerText = item.headerText;
  }

  detailsSizeChart() {
    this.sandbox.getSizeChart(this.editChartId);
    this.subscriptions.push(this.sandbox.getSizeChart$.subscribe(data => {
      if (data) {
        this.chartForm.controls['chartName'].setValue(data.templateName);
        this.selectedItem = [];
        data.header.forEach(element => {
          this.selectedItem.push({'id': element.headerId , 'headerText': element.headerText});
        });
      }
    })
  );
  }

  changeHeaderText(event, item) {
    if (event.target.checked === true) {
      item.checkData = true;
      this.selectedItem .push(item);
    } else if (event.target.checked === false) {
      item.checkData = false;
     this.selectedItem = this.selectedItem.filter(data => {
      if (data.id === item.id) {
        return false;
      } else {
        return true;
      }
     });
    }
  }

  clearData(item) {
    item.checkData = false;
    this.selectedItem = this.selectedItem.filter(data => {
      if (data.id === item.id) {
        return false;
      } else {
        return true;
      }
     });
  }

  cancel() {
    this.router.navigate(['/settings/sitesettings/size-chart-template/list']);
  }
}
