/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// effects
import { Effect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../order-action/order.action';

import { catchError } from 'rxjs/operators';
// service
import { OrderService } from '../order.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';


@Injectable()
export class OrderEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: OrderService,
    private popup: NgbModal, public toaster: ToastrService
  ) { }

  @Effect()
  doGetOrderDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_DETAIL),
    map((action: actions.GetOrderDetailAction) => action.payload),
    switchMap(state => {
      return this.service.getOrderDetail(state).pipe(

        tap(add => {
        }),
        switchMap(user => [new actions.GetOrderDetailSuccessAction(user)]),
        catchError(error => of(new actions.GetOrderDetailFailAction(error)))
      );
    })
  );
  @Effect()
  doGetArchiveOrderDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL),
    map((action: actions.GetArchiveOrderDetailAction) => action.payload),
    switchMap(state => {
      return this.service.getArchiveOrderDetail(state).pipe(

        tap(add => {
        }),
        switchMap(user => [new actions.GetArchiveOrderDetailSuccessAction(user)]),
        catchError(error => of(new actions.GetArchiveOrderDetailFailAction(error)))
      );
    })
  );
  @Effect()
  getRecentOrderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_RECENT_ORDER_LIST),
    map((action: actions.GetRecentOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.recentOrderList(state).pipe(
        map(user => new actions.GetRecentOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetRecentOrderlistFailAction(error)))
      );
    })
  );
  @Effect()
  getAllOrderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ALL_ORDER_LIST),
    map((action: actions.GetAllOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.allOrderList(state).pipe(
        map(user => new actions.GetAllOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetAllOrderlistFailAction(error)))
      );
    })
  );
  @Effect()
  getArchiveOrderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_ORDER_LIST),
    map((action: actions.GetArchiveOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.archiveOrderList(state).pipe(
        map(user => new actions.GetArchiveOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetArchiveOrderlistFailAction(error)))
      );
    })
  );
  @Effect()
  getOrderCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_COUNT),
    map((action: actions.GetOrderCountAction) => action.payload),
    switchMap(state => {
      return this.service.orderCount(state).pipe(
        map(user => new actions.GetOrderCountSuccessAction(user)),
        catchError(error => of(new actions.GetOrderCountFailAction(error)))
      );
    })
  );
  @Effect()
  getDeliveryPersonsList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_PERSONS_LIST),
    map((action: actions.GetDeliveryPersonsListAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryPersonsList(state).pipe(
        map(user => new actions.GetDeliveryPersonsListSuccessAction(user)),
        catchError(error => of(new actions.GetDeliveryPersonsListFailAction(error)))
      );
    })
  );
  @Effect()
  allocateDeliveryPersons$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS),
    map((action: actions.AllocateDeliveryPersonsAction) => action.payload),
    switchMap(state => {
      return this.service.allocateDeliveryPersons(state).pipe(
        map(user => new actions.AllocateDeliveryPersonsSuccessAction(user)),
        tap(resp => {
            this.toaster.success('Success', resp.payload['message']);
        }),
        catchError(error => of(new actions.AllocateDeliveryPersonsFailAction(error)))
      );
    })
  );
  @Effect()
  getAllOrderListBasedOnStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS),
    map((action: actions.GetAllOrderlistBasedOnStatusAction) => action.payload),
    switchMap(state => {
      return this.service.allOrderListBasedOnStatus(state).pipe(
        map(user => new actions.GetAllOrderlistBasedOnStatusSuccessAction(user)),

        catchError(error => of(new actions.GetAllOrderlistBasedOnStatusFailAction(error)))
      );
    })
  );
  @Effect()
  updateAllOrderListBasedOnStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS),
    map((action: actions.GetAllOrderlistBasedOnStatusAction) => action.payload),
    switchMap(state => {
      return this.service.updateAllOrderListBasedOnStatus(state).pipe(
        map(user => new actions.UpdateAllOrderlistBasedOnStatusSuccessAction(user)),
        catchError(error => of(new actions.UpdateAllOrderlistBasedOnStatusFailAction(error)))
      );
    })
  );
  @Effect()
  getOrderLogList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_LOG_LIST),
    map((action: actions.GetOrderLoglistAction) => action.payload),
    switchMap(state => {
      return this.service.orderLogList(state).pipe(
        map(user => new actions.GetOrderLoglistSuccessAction(user)),
        catchError(error => of(new actions.GetOrderLoglistFailAction(error)))
      );
    })
  );
  @Effect()
  getOrderStatusList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_STATUS_LIST),
    map((action: actions.GetOrderStatuslistAction) => action.payload),
    switchMap(state => {
      return this.service.orderStatusList(state).pipe(
        map(user => new actions.GetOrderStatuslistSuccessAction(user)),
        catchError(error => of(new actions.GetOrderStatuslistFailAction(error)))
      );
    })
  );
  @Effect()
  getOrderStatusUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_STATUS_UPDATE),
    map((action: actions.GetOrderStatusUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.orderStatusUpdate(state).pipe(
        map(user => new actions.GetOrderStatusUpdateSuccessAction(user)),
        catchError(error => of(new actions.GetOrderStatusUpdateFailAction(error)))
      );
    })
  );
  @Effect()
  makeArchive$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_ARCHIVE),
    map((action: actions.MakeArchiveAction) => action.payload),
    switchMap(state => {
      return this.service.makeArchive(state).pipe(
        map(user => new actions.MakeArchiveSuccessAction(user)),
        tap(resp => {
          if (resp) {
              this.toaster.success(resp.payload.message);
          }
        }),
        catchError(error => of(new actions.MakeArchiveFailAction(error)))
      );
    })
  );
  @Effect()
  getShippingInformationUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE),
    map((action: actions.GetShippingInformationUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.shippingInformationUpdate(state).pipe(
        map(user => new actions.GetShippingInformationUpdateSuccessAction(user)),
        tap(resp => {
          if (resp) {
            if (resp.payload.status === 1) {
              this.toaster.success(resp.payload.message, 'Success');
            }
          }
        }),
        catchError(error => of(new actions.GetShippingInformationUpdateFailAction(error)))
      );
    })
  );

  @Effect()
  exportArchiveOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ARCHIVE_ORDER),
    map((action: actions.ExportArchiveOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportArchiveOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportArchiveOrderSuccess(user)),
        catchError(error => of(new actions.ExportArchiveOrderFail(error)))
      );
    })
  );

  @Effect()
  exportAllArchiveOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER),
    map((action: actions.ExportAllArchiveOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllArchiveOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_all_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportAllArchiveOrderSuccess(user)),
        catchError(error => of(new actions.ExportAllArchiveOrderFail(error)))
      );
    })
  );

  @Effect()
  archiveOrderCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT),
    map((action: actions.ArchiveOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.service.archiveOrderListCount(state).pipe(
        map(user => new actions.ArchiveOrderListCountSuccess(user)),
        catchError(error => of(new actions.ArchiveOrderListCountFail(error)))
      );
    })
  );

  @Effect()
  cancelOrderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CANCEL_ORDER_LIST),
    map((action: actions.CancelOrderListAction) => action.payload),
    switchMap(state => {
      return this.service.cancelOrderList(state).pipe(
        map(user => new actions.CancelOrderListSuccessAction(user)),
        catchError(error => of(new actions.CancelOrderListFailAction(error)))
      );
    })
  );

  @Effect()
  cancelOrderListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CANCEL_ORDER_LIST_COUNT),
    map((action: actions.CancelOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.service.cancelOrderListCount(state).pipe(
        map(user => new actions.CancelOrderListCountSuccess(user)),
        catchError(error => of(new actions.CancelOrderListCountFail(error)))
      );
    })
  );

  @Effect()
  exportCancelOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_CANCEL_ORDER),
    map((action: actions.ExportCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportCancelOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'cancel_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportCancelOrderSuccess(user)),
        catchError(error => of(new actions.ExportCancelOrderFail(error)))
      );
    })
  );

  @Effect()
  exportAllCancelOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER),
    map((action: actions.ExportAllCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllCancelOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'cancel_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportAllCancelOrderSuccess(user)),
        catchError(error => of(new actions.ExportAllCancelOrderFail(error)))
      );
    })
  );

  @Effect()
  changeCancelOrderStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS),
    map((action: actions.ChangeCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.service.changeCancelOrderStatus(state).pipe(
        map(user => new actions.ChangeCancelOrderStatusSuccess(user)),
        catchError(error => of(new actions.ChangeCancelOrderStatusFail(error)))
      );
    })
  );

  @Effect()
  bulkCancelOrderStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.BULK_CANCEL_ORDER_STATUS),
    map((action: actions.BulkCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.service.bulkCancelOrderStatus(state).pipe(
        map(user => new actions.BulkCancelOrderStatusSuccess(user)),
        catchError(error => of(new actions.BulkCancelOrderStatusFail(error)))
      );
    })
  );

  @Effect()
  quotationList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.QUOTATION_LIST),
    map((action: actions.QuotationListAction) => action.payload),
    switchMap(state => {
      return this.service.quotationList(state).pipe(
        map(user => new actions.QuotationListSuccess(user)),
        catchError(error => of(new actions.QuotationListFail(error)))
      );
    })
  );

  @Effect()
  quotationListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.QUOTATION_LIST_COUNT),
    map((action: actions.QuotationListCountAction) => action.payload),
    switchMap(state => {
      return this.service.quotationListCount(state).pipe(
        map(user => new actions.QuotationListCountSuccess(user)),
        catchError(error => of(new actions.QuotationListCountFail(error)))
      );
    })
  );

  // get order invoice list

  @Effect()
  orderInvoiceList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_INVOICE_LIST),
    map((action: actions.OrderInvoiceListAction) => action.payload),
    switchMap(state => {
      return this.service.orderInvoiceList(state).pipe(
        map(user => new actions.OrderInvoiceListSuccessAction(user)),
        catchError(error => of(new actions.OrderInvoiceListFailAction(error)))
      );
    })
  );

   // get order invoice list count

   @Effect()
   orderInvoiceListCount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT),
     map((action: actions.OrderInvoiceListCountAction) => action.payload),
     switchMap(state => {
       return this.service.orderInvoiceListCount(state).pipe(
         map(user => new actions.OrderInvoiceListCountSuccessAction(user)),
         catchError(error => of(new actions.OrderInvoiceListCountFailAction(error)))
       );
     })
   );

   @Effect()
   settlementList$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.SETTLEMENT_LIST),
     map((action: actions.SettlementListAction) => action.payload),
     switchMap(state => {
       return this.service.settlementList(state).pipe(
         map(user => new actions.SettlementListSuccessAction(user)),
         catchError(error => of(new actions.SettlementListFailAction(error)))
       );
     })
   );

   @Effect()
   settlementListCount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.SETTLEMENT_LIST_COUNT),
     map((action: actions.SettlementListCountAction) => action.payload),
     switchMap(state => {
       return this.service.settlementListCount(state).pipe(
         map(user => new actions.SettlementListCountSuccessAction(user)),
         catchError(error => of(new actions.SettlementListCountFailAction(error)))
       );
     })
   );

   @Effect()
   sendMail$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.SEND_MAIL),
     map((action: actions.SendMailAction) => action.payload),
     switchMap(state => {
       return this.service.sendMail(state).pipe(
         map(user => new actions.SendMailActionSuccessAction(user)),
         catchError(error => of(new actions.SendMailActionFailAction(error)))
       );
     })
   );


   @Effect()
   exportSalesReport$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.EXPORT_SALES_REPORT),
     map((action: actions.ExportSalesReportAction) => action.payload),
     switchMap(state => {
       return this.service.exportSalesReport(state).pipe(
         tap(data => {
           if (data) {
             const filename = 'sales_report_' + Date.now() + '.xlsx';
             const blob = new Blob([data], {type: 'text/xlsx'});
             saveAs(blob, filename);
           }
         }),
         map(user => new actions.ExportSalesReportSuccessAction(user)),
         catchError(error => of(new actions.ExportSalesReportFailAction(error)))
       );
     })
   );


      // Download Invoice

      @Effect()
      downloadInvoice$: Observable<Action> = this.action$.pipe(
        ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
        map((action: actions.DownloadInvoiceAction) => action.payload),
        switchMap(state => {
          return this.service.downloadInvoice(state).pipe(
            tap((data: any ) => {
              const linkSource = data.data;
              const downloadLink = document.createElement('a');
              const fileName = 'Invoice_' + Date.now() + '.pdf';
              downloadLink.href = linkSource;
              downloadLink.download = fileName;
              downloadLink.click();
            }),
            map(user => new actions.DownloadInvoiceSuccessAction(user)),
            catchError(error => of(new actions.DownloadInvoiceFailAction(error)))
          );
        })
      );
}
