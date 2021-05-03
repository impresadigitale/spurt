import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettlementHistorySandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settlement-history-modal',
  templateUrl: 'settlement-history-modal.component.html',
  styleUrls: ['settlement-history-modal.component.scss']
})
export class SettlementHistoryModalComponent implements OnInit, OnDestroy {

  public currency: any;
  public title: any = '';
  public submitted = false;
  public subscriptions: Array<Subscription> = [];
  public details: any = {};
  public id: any;

  constructor(
    public modalService: NgbModal,
    public sandbox: SettlementHistorySandbox,
    public modal: NgbActiveModal
  ) {}

  ngOnInit() {
    if (this.details) {
        this.id = this.details.id;
        const params: any = {};
        params.id = this.id;
        this.sandbox.getSettlementDetails(params);
    }
    this.currency = localStorage.getItem('adminCurrency') ? JSON.parse(localStorage.getItem('adminCurrency')) : '';
  }

  close() {
    this.modal.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
