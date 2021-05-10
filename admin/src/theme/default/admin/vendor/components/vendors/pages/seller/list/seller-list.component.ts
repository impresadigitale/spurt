import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SellerSandbox } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { DeleteConfirmationDialogComponent } from '../../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-seller-list',
  templateUrl: 'seller-list.component.html',
  styleUrls: ['seller-list.component.scss']
})
export class SellerListComponent implements OnInit {


  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;

  // formgroup variable
  public filterForm: FormGroup;
  public firstName: FormControl;
  public status: FormControl;
  public buttoncheck = true;
  public buttonActive = false;
  public checkBox: any = [];
  public sampleArray: any = [];
  public filterEnable = true;
  // Variable
  public submitted = false;
  public selectAllValues = false;
  @Output() progressEmits = new EventEmitter<string>();
  public closeResult: string;
  public pageSizeOptions = [10, 20];
  public keyword = '';
  public limit = 10;
  public name = '';
  public email: any;
  public date: any;
  public popoverContent: any;
  public checkedArray: any = [];
  public customerGroupName = '';
  public customerGroup = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public unCheckData: any = [];
  public selectedAll: any;
  public filterData: any = [];
  public filterDataId = [];
  public approval = false;
  public value: any = [];
  public pagenationData: any = [];
  public offset: number;
  public index = 0;
  public pageSize = 20;
  private isCount: boolean;
  public sellerArray = [];
  public currentPage = 1;
  public bulkFunction = false;

  constructor(
    public sellerSandbox: SellerSandbox,
    private sellerService: SellerService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager,
    public modalService: NgbModal
  ) {
    this.subscribeVal();
    }

  ngOnInit() {
    this.submitted = false;
    this.sellerFilterForm();
    this.isCount = true;
    this.sellerList();
    this.sellerListCount();

    this.sellerSandbox.getVendorCounts();
  }
  addVendor() {
    this.router.navigate(['/vendors/vendor/seller/add']);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttoncheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttoncheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  receiveProgress(event) {
    this.index = 0;
    this.firstName = event.firstName;
    this.status = event.status;
  }

  sellerFilterForm() {
    this.filterForm = this.fb.group({
      firstName: [''],
      status: ['']
    });
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.sellerArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

  filterDataList() {
    this.filterData = this.sellerArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.vendorId);
  }
  /**
   * Handles  'resetFilter' event. Calls  getProductList and reset().
   *
   * @param filterForm entire form value
   */
  resetFilter(offset: number = 0, pageSize) {
    this.filterForm.reset();
    const param: any = {};
    param.limit = 10;
    param.offset = offset;
    param.firstName = '';
    param.status = '';
    this.firstName = this.filterForm.value.firstName || '';
    this.status = this.filterForm.value.status || '';
    this.progressEmits.emit(param);
    this.sellerList();
    this.sellerListCount();
    this.paginator.firstPage();

  }

  applyFilter() {
    this.offset = 0;
    this.firstName = this.filterForm.value.firstName || '';
    this.status = this.filterForm.value.status || '';
    this.sellerList();
    this.sellerListCount();
    this.paginator.firstPage();

  }

  sellerList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.firstName || '';
    param.status = this.status || '';
    param.count = '';
    this.progressEmits.emit(param);
    this.sellerSandbox.sellerList(param);
  }

  sellerListCount() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.name = this.firstName || '';
    param.status = this.status || '';
    param.count = 1;
    this.sellerSandbox.sellerListCount(param);
  }

  update(array) {
    const id = array.vendorId;
    this.router.navigate(['vendors/vendor/seller/edit', id]);
  }

  view(array) {
    const id = array.vendorId;
    this.router.navigate(['vendors/vendor/seller/view', id]);
  }

  selectAll(event: any) {
    for (let i = 0; i < this.sellerArray.length; i++) {
      this.sellerArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

  /**
   * Handles form 'deletecustomer' event. for delete customer data
   * @param id from customer id
   */
  deleteSeller(id, key) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
  });
  modelRef.componentInstance.key = key;
  modelRef.componentInstance.id = id;
  modelRef.result.then((result) => {
    if (result === 'deleted') {
      this.sellerList();
          this.sellerSandbox.getVendorCounts();
    }
  });
  }

  bulkDeletes() {
    const param: any = {};
    param.vendorId = this.filterDataId.toString();
    this.sellerSandbox.bulkDelete(param);
    this.sellerSandbox.deletesLoaded$.subscribe(_delete => {
      if (_delete) {
        this.sellerList();
        this.sellerSandbox.getVendorCounts();
     }
    });
  }

  exportExcel() {
    const param: any = {};
    param.vendorId = this.filterDataId.toString();
    this.sellerSandbox.sellerExcel(param);
  }

  exportAllExcel() {
    const param: any = {};
    this.sellerSandbox.sellerExcel(param);
  }

  approvalFlag(array) {
    const params: any = {};
    params.vendorId = array.vendorId;
    params.approvalFlag = 1;
    this.sellerSandbox.sellerApproval(params);
  }

  subscribeVal() {
    this.sellerSandbox.getSellerApproval$.subscribe(val => {
      if (val && val.status === 1) {
        this.sellerList();
      }
    });
    this.sellerSandbox.getSellerList$.subscribe(data => {
      if (data) {
        this.sellerArray = [];
        this.sellerArray = data.map(val => {
          return { ...val, selected: false };
        });
      }
    });
  }

  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.sellerList();
  }
}
