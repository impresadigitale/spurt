/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { PagesApiclientService } from '../../../../../../../core/admin/cms/pages/pages.ApiclientService';
import { PagesSandbox } from '../../../../../../../core/admin/cms/pages/pages.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cms-pages-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class PagesAddComponent implements OnInit {

  private closeResult: string;
  public submitted = false;
  public pagesForm: FormGroup;
  public pageTitle: FormControl;
  public pageContent: FormControl;
  public active: FormControl;
  public metaTitle: FormControl;
  public metaKeyword: FormControl;
  public metaContent: FormControl;
  public groupId: FormControl;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';
  private subscriptions: Array<Subscription> = [];

  constructor(
    private modalService: NgbModal,
    public appSandbox: PagesSandbox,
    public service: PagesApiclientService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.editPagesId = this.route.snapshot.paramMap.get('id');
    if (this.editPagesId) {
      const params: any = {};
      params.pageId = this.editPagesId;
      this.appSandbox.getPageDetails(params);
      this.editPages();
    }
    this.getPageGroup();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  pagesCancel() {
    this.router.navigate(['/cms/pages']);
  }

  initForm() {
    this.pageTitle = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.pageContent = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    this.active = new FormControl('', [Validators.required]);
    this.groupId = new FormControl('', [Validators.required]);
    this.metaTitle = new FormControl('', Validators.compose([
      Validators.maxLength(60)
    ]));
    this.metaKeyword = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.metaContent = new FormControl('', Validators.compose([
      Validators.maxLength(160)
    ]));
    this.pagesForm = this.fb.group({
      pageTitle: this.pageTitle,
      pageContent: this.pageContent,
      active: this.active,
      metaTitle: this.metaTitle,
      metaKeyword: this.metaKeyword,
      metaContent: this.metaContent,
      groupId: this.groupId
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox pages  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.pagesForm.valid) {
      this.validateAllFormFields(this.pagesForm);
      return;
    }
    if (
      this.pagesForm.value.pageTitle !== '' &&
      this.pagesForm.value.pageContent !== ''
    ) {
      const params: any = {};
      params.title = this.pagesForm.value.pageTitle;
      params.content = this.pagesForm.value.pageContent;
      params.active = this.pagesForm.value.active;
      params.metaTagTitle = this.pagesForm.value.metaTitle;
      params.metaTagKeyword = this.pagesForm.value.metaKeyword;
      params.metaTagContent = this.pagesForm.value.metaContent;
      params.pageGroupId = this.pagesForm.value.groupId;
      if (this.editPagesId) {
        params.pageId = this.editPagesId;
        this.appSandbox.updatePagesList(params);
      } else {
        this.appSandbox.getAddpages(params);
      }
    }
  }

  // edit function for pages
  editPages() {
    this.subscriptions.push(this.appSandbox.pageDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
           this.setPage(data);
      }
    }));
  }

  setPage(details) {
    this.pagesForm.controls['pageTitle'].setValue(details.title);
    this.pagesForm.controls['pageContent'].setValue(details.content);
    this.pagesForm.controls['active'].setValue(details.isActive);
    this.pagesForm.controls['metaTitle'].setValue(details.metaTagTitle);
    this.pagesForm.controls['metaKeyword'].setValue(details.metaTagKeyword);
    this.pagesForm.controls['metaContent'].setValue(details.metaTagContent);
    this.pagesForm.controls['groupId'].setValue(details.pageGroupId);
  }

  get f() {
    return this.pagesForm.controls;
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

  getPageGroup() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.status = 1;
    this.appSandbox.getGroupList(params);
  }
}
