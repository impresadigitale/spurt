import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SettlementOrderSandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settlement-modal',
  templateUrl: 'settlement-modal.component.html',
  styleUrls: ['settlement-modal.component.scss']
})
export class SettlementOrderModalComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;

  public currency: any;
  public settlementArray: any;
  public settlementAmount: any;
  public title: any = '';
  public submitted = false;
  public subscriptions: Array<Subscription> = [];
  public orderId = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public modalService: NgbModal,
    public sandbox: SettlementOrderSandbox,
    public modal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.currency = localStorage.getItem('adminCurrency') ? JSON.parse(localStorage.getItem('adminCurrency')) : '';
    if (this.settlementArray.length > 0) {
      this.calculateSettlement();
    }
  }

  calculateSettlement() {
    let total = 0;
    this.settlementAmount = 0;
    this.settlementArray.forEach(data => {
      this.orderId.push(data.vendorOrderId);
      total += (+data.NetAmount);
      this.settlementAmount = total;
    });
    this.settlementAmount = this.settlementAmount ? this.settlementAmount.toFixed(2) : 0;
  }

  makeSettlement() {
    this.submitted = true;
    if (this.title) {
      const params: any = {};
      params.title = this.title;
      params.vendorOrderId = this.orderId;
      this.sandbox.makeSettlement(params);
      this.sandbox.makeSettlement$.subscribe(data => {
        if (data && data.status === 1) {
          this.modal.close('success');
        }
      });
    }
    this.subscribe();
  }

  removeSettlementItem(list) {
    this.orderId = [];
    this.settlementArray = this.settlementArray.filter(data => {
      if (data.vendorOrderId === list.vendorOrderId) {
        return false;
      } else {
        return true;
      }
    });
    this.calculateSettlement();
  }

  close() {
    this.modal.close();
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.makeSettlement$.subscribe(data => {
         if (data && Object.keys(data).length && data.status === 1) {
           this.modal.close('success');
         }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.settlementArray = [];
    this.orderId = [];
  }
}
