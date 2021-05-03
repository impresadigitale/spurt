import * as actions from '../order-action/order.action';
// state
// import { OrderState, OrderStateRecord } from './order.state';
// model
import { DetailResponseModel } from '../order-model/detail-response.model';
import { OrderAddResponseModel } from '../order-model/order-add-response.model';
import { OrderSearchOptionModel } from '../order-model/order-search-option';
import { OrderState, OrderStateRecord } from './order.state';

export const initialState: OrderState = (new OrderStateRecord() as unknown) as OrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): OrderState {
  if (!type) {
    return state;
  }

  switch (type) {


// <---------------GET ORDER DETAILS----------------> //

    case actions.ActionTypes.GET_ORDER_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        orderDetail: new DetailResponseModel(payload.data)
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

// <---------------GET ARCHIVE ORDER DETAILS----------------> //

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL: {
      return Object.assign({}, state, {
        archiveDetailLoading: true,
        archiveDetailLoaded: false,
        archiveDetailFailed: false
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        archiveDetailLoading: false,
        archiveDetailLoaded: true,
        archiveDetailFailed: false,
        archiveOrderDetail: new DetailResponseModel(payload.data)
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        archiveDetailLoading: false,
        archiveDetailLoaded: false,
        archiveDetailFailed: true
      });
    }

// <---------------GET ORDER COUNT----------------> //

    case actions.ActionTypes.GET_ORDER_COUNT: {
      return Object.assign({}, state, {
        orderCountLoading: true,
        orderCountLoaded: false,
        orderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderCountLoading: false,
        orderCountLoaded: true,
        orderCountFailed: false,
        orderCount: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderCountLoading: false,
        orderCountLoaded: false,
        orderCountFailed: true
      });
    }

// <---------------GET RECENT ORDER LIST----------------> //

    case actions.ActionTypes.GET_RECENT_ORDER_LIST: {
      return Object.assign({}, state, {
        recentListLoading: true,
        recentListLoaded: false,
        recentListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_ORDER_LIST_SUCCESS: {
      let todayOrderModel: any = [];
      let previousOrderModel: any = [];
      const date = new Date();
      const todayDate = (new Date().getDate() + '').slice(-1);
      date.setDate(date.getDate() - 1);
      const previousDate = (date.getDate() + '').slice(-1);
      if (payload.data) {
        todayOrderModel = payload.data.filter(data => {
          if (
            (new Date(data.createdDate).getDate() + '').slice(-1) === todayDate
          ) {
            return true;
          } else {
            return false;
          }
        });
        previousOrderModel = payload.data.filter(data => {
          if (
            (new Date(data.createdDate).getDate() + '').slice(-1) ===
            previousDate
          ) {
            return true;
          } else {
            return false;
          }
        });
      }
      return Object.assign({}, state, {
        recentListLoading: false,
        recentListLoaded: true,
        recentListFailed: false,
        todayRecentOrderList: todayOrderModel,
        prevRecentOrderList: previousOrderModel,
        recentOrder: payload.data
      });
    }

    case actions.ActionTypes.GET_RECENT_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        recentListLoading: false,
        recentListLoaded: false,
        recentListFailed: true
      });
    }

// <---------------GET ALL ORDER LIST----------------> //

    case actions.ActionTypes.GET_ALL_ORDER_LIST: {
      return Object.assign({}, state, {
        allListLoading: true,
        allListLoaded: false,
        allListFailed: false
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        allListLoading: false,
        allListLoaded: true,
        allListFailed: false,
        allOrderList: payload.data
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        allListLoading: false,
        allListLoaded: false,
        allListFailed: true
      });
    }

// <---------------GET ARCHIVE ORDER LIST----------------> //

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST: {
      return Object.assign({}, state, {
        archiveListLoading: true,
        archiveListLoaded: false,
        archiveListFailed: false
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: true,
        archiveListFailed: false,
        archiveOrderList: payload.data
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: false,
        archiveListFailed: true
      });
    }

// <---------------GET DELIVERY PERSON LIST----------------> //

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: true,
        deliveryPersonsListLoaded: false,
        deliveryPersonsListFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: false,
        deliveryPersonsListLoaded: true,
        deliveryPersonsListFailed: false,
        deliveryPersonsList: payload.data
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: false,
        deliveryPersonsListLoaded: false,
        deliveryPersonsListFailed: true
      });
    }

// <---------------ALLOCATE DELIVERY PERSON----------------> //

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: true,
        allocateDeliveryPersonsLoaded: false,
        allocateDeliveryPersonsFailed: false
      });
    }

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS_SUCCESS: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: false,
        allocateDeliveryPersonsLoaded: true,
        allocateDeliveryPersonsFailed: false,
        allocateDeliveryPersons: payload.data
      });
    }

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS_FAIL: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: false,
        allocateDeliveryPersonsLoaded: false,
        allocateDeliveryPersonsFailed: true
      });
    }

// <---------------GET ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS: {
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: true,
        allOrdersBasedOnStatusListLoaded: false,
        allOrdersBasedOnStatusListFailed: false
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: {
      let tempArray: any = [];
      if (payload.data) {
        tempArray = payload.data.map(data => {
          if (data) {
            data.orderStatusId = String(data.orderStatusId);
            return data;
          }
        });
      }
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: false,
        allOrdersBasedOnStatusListLoaded: true,
        allOrdersBasedOnStatusListFailed: false,
        allOrdersBasedOnStatusList: tempArray
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: {
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: false,
        allOrdersBasedOnStatusListLoaded: false,
        allOrdersBasedOnStatusListFailed: true
      });
    }

// <---------------UPDATE ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS: {
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: true,
        updateAllOrdersBasedOnStatusListLoaded: false,
        updateAllOrdersBasedOnStatusListFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: {
      if (payload.data) {
        state.allOrdersBasedOnStatusList.map(data => {
          if (
            Number(data.orderStatusId) === payload.data.subOrderStatusId
          ) {
            data.orderCount = data.orderCount + 1;
          }
        });
      }
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: false,
        updateAllOrdersBasedOnStatusListLoaded: true,
        updateAllOrdersBasedOnStatusListFailed: false,
        updateAllOrdersBasedOnStatusList: payload.data
      });
    }

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: {
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: false,
        updateAllOrdersBasedOnStatusListLoaded: false,
        updateAllOrdersBasedOnStatusListFailed: true
      });
    }

// <---------------UPDATE ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.DECREASE_UPDATED_ORDER_COUNT: {
      if (payload) {
        state.allOrdersBasedOnStatusList.map(data => {
          if (Number(data.orderStatusId) === Number(payload)) {
            data.orderCount = data.orderCount - 1;
          }
        });
      }
      return Object.assign({}, state, {});
    }

// <---------------GET ORDER LOG LIST----------------> //

    case actions.ActionTypes.GET_ORDER_LOG_LIST: {
      return Object.assign({}, state, {
        logListLoading: true,
        logListLoaded: false,
        logListFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_LOG_LIST_SUCCESS: {
      let groupArrays = [];
      if (payload.data) {
        const group = payload.data.reduce((groups, val) => {
          const date = val.createdDate.split('T')[0];
          if (!groups[val.createdDate]) {
            groups[val.createdDate] = [];
          }
          groups[val.createdDate].push(val);
          return groups;
        }, {});
        groupArrays = Object.keys(group).map(date => {
          return {
            date,
            logs: group[date]
          };
        });
      }
      return Object.assign({}, state, {
        logListLoading: false,
        logListLoaded: true,
        logListFailed: false,
        orderLogList: groupArrays
      });
    }

    case actions.ActionTypes.GET_ORDER_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        logListLoading: false,
        logListLoaded: false,
        logListFailed: true
      });
    }

// <---------------UPDATE ORDER STATUS----------------> //

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE: {
      return Object.assign({}, state, {
        updateOrderStatusLoading: true,
        updateOrderStatusLoaded: false,
        updateOrderStatusFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE_SUCCESS: {
      state.orderDetail.orderStatusName = payload.data.name;
      return Object.assign({}, state, {
        updateOrderStatusLoading: false,
        updateOrderStatusLoaded: true,
        updateOrderStatusFailed: false,
        updateOrderStatus: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateOrderStatusLoading: false,
        updateOrderStatusLoaded: false,
        updateOrderStatusFailed: true
      });
    }

// <---------------MAKE ORDER ARCHIVE----------------> //

    case actions.ActionTypes.MAKE_ARCHIVE: {
      return Object.assign({}, state, {
        makeArchiveLoading: true,
        makeArchiveLoaded: false,
        makeArchiveFailed: false
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_SUCCESS: {
      return Object.assign({}, state, {
        makeArchiveLoading: false,
        makeArchiveLoaded: true,
        makeArchiveFailed: false,
        makeArchive: payload.data
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_FAIL: {
      return Object.assign({}, state, {
        makeArchiveLoading: false,
        makeArchiveLoaded: false,
        makeArchiveFailed: true
      });
    }

// <---------------UPDATE SHIPPING INFORMATION----------------> //

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: true,
        updateShippingInformationLoaded: false,
        updateShippingInformationFailed: false
      });
    }

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: false,
        updateShippingInformationLoaded: true,
        updateShippingInformationFailed: false,
        updateShippingInformation: payload.data
      });
    }

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: false,
        updateShippingInformationLoaded: false,
        updateShippingInformationFailed: true
      });
    }

// <---------------GET ORDER STATUS LIST----------------> //

    case actions.ActionTypes.GET_ORDER_STATUS_LIST: {
      return Object.assign({}, state, {
        orderStatusListLoading: true
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        orderStatusListLoading: false,
        orderStatusList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        orderStatusListLoading: false
      });
    }


// <---------------EXPORT ARCHIVE ORDER (ONLY SELECTED ORDER)----------------> //

     case actions.ActionTypes.EXPORT_ARCHIVE_ORDER: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: true,
        exportArchiveOrderLoaded: false,
        exportArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: false,
        exportArchiveOrderLoaded: true,
        exportArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: false,
        exportArchiveOrderLoaded: false,
        exportArchiveOrderFailed: true,
      });
    }


// <---------------EXPORT ALL RCHIVE ORDER----------------> //

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: true,
        exportAllArchiveOrderLoaded: false,
        exportAllArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: false,
        exportAllArchiveOrderLoaded: true,
        exportAllArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: false,
        exportAllArchiveOrderLoaded: false,
        exportAllArchiveOrderFailed: true,
      });
    }

// <---------------ARCHIVE ORDER LIST COUNT----------------> //

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT: {
      return Object.assign({}, state, {
        archiveOrderListCount: '',
        archiveOrderListCountLoading: true,
        archiveOrderListCountLoaded: false,
      });
    }

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        archiveOrderListCount: payload.data,
        archiveOrderListCountLoading: false,
        archiveOrderListCountLoaded: true,
      });
    }

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        archiveOrderListCount: '',
        archiveOrderListCountLoading: false,
        archiveOrderListCountLoaded: false,
      });
    }

// <---------------REMOVE SELECTED ORDER TO EXPORT----------------> //

    case actions.ActionTypes.REMOVE_EXPORT_SELECTION: {
      if (payload === 'archiveOrder') {
        state.archiveOrderList.map(data => {
          data.selected = false;
        });
      }
      if (payload === 'cancelOrder') {
        state.cancelOrderList.map(data => {
          data.selected = false;
        });
      }
      return Object.assign({}, state, {
      });
    }

// <---------------CANCEL ORDER REQUEST LIST----------------> //

      case actions.ActionTypes.CANCEL_ORDER_LIST: {
        return Object.assign({}, state, {
          cancelOrderList: [],
          cancelOrderListLoading: true,
          cancelOrderListLoaded: false,
        });
      }

      case actions.ActionTypes.CANCEL_ORDER_LIST_SUCCESS: {
        return Object.assign({}, state, {
          cancelOrderList: payload.data,
          cancelOrderListLoading: false,
          cancelOrderListLoaded: true,
        });
      }

      case actions.ActionTypes.CANCEL_ORDER_LIST_FAIL: {
        return Object.assign({}, state, {
          cancelOrderList: [],
          cancelOrderListLoading: false,
          cancelOrderListLoaded: false,
        });
      }


// <---------------CANCEL ORDER REQUEST LIST COUNT----------------> //

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT: {
      return Object.assign({}, state, {
        cancelOrderListCount: '',
        cancelOrderListCountLoading: true,
        cancelOrderListCountLoaded: false,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        cancelOrderListCount: payload.data,
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: true,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        cancelOrderListCount: '',
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: false,
      });
    }

// <---------------EXPORT CANCEL ORDER REQUEST----------------> //

      case actions.ActionTypes.EXPORT_CANCEL_ORDER: {
        return Object.assign({}, state, {
          exportCancelOrder: {},
          exportCancelOrderLoading: true,
          exportCancelOrderLoaded: false,
        });
      }

      case actions.ActionTypes.EXPORT_CANCEL_ORDER_SUCCESS: {
        return Object.assign({}, state, {
          exportCancelOrder: {},
          exportCancelOrderLoading: false,
          exportCancelOrderLoaded: true,
        });
      }

      case actions.ActionTypes.EXPORT_CANCEL_ORDER_FAIL: {
        return Object.assign({}, state, {
          exportCancelOrder: {},
          exportCancelOrderLoading: false,
          exportCancelOrderLoaded: false,
        });
      }

// <---------------EXPORT ALL CANCEL ORDER REQUEST----------------> //

       case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER: {
        return Object.assign({}, state, {
          exportAllCancelOrder: {},
          exportAllCancelOrderLoading: true,
          exportAllCancelOrderLoaded: false,
        });
      }

      case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER_SUCCESS: {
        return Object.assign({}, state, {
          exportAllCancelOrder: {},
          exportAllCancelOrderLoading: false,
          exportAllCancelOrderLoaded: true,
        });
      }

      case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER_FAIL: {
        return Object.assign({}, state, {
          exportAllCancelOrder: {},
          exportAllCancelOrderLoading: false,
          exportAllCancelOrderLoaded: false,
        });
      }

// <---------------CHANGE CANCEL ORDER STATUS----------------> //

       case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS: {
        return Object.assign({}, state, {
          cancelRequest: payload,
          cancelOrderStatus: {},
          cancelOrderStatusLoading: true,
          cancelOrderStatusLoaded: false,
        });
      }

      case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_SUCCESS: {
        let tempList = [];
        if (payload) {
          const requestString = state.cancelRequest.orderProductId;
          tempList = state.cancelOrderList;
          const array = JSON.parse('[' + requestString + ']');
          if (array.length > 0) {
             tempList.map(data => {
               array.map(string => {
                if (data.orderProductId === string) {
                   if (state.cancelRequest.cancelStatusId == '1') {
                    data.cancelRequestStatus = 1;
                   }
                   if (state.cancelRequest.cancelStatusId == '2') {
                    data.cancelRequestStatus = 2;
                  }
                 }
               });
             });
          }
        }
        return Object.assign({}, state, {
          cancelOrderList: tempList,
          cancelOrderStatus: {},
          cancelOrderStatusLoading: false,
          cancelOrderStatusLoaded: true,
        });
      }

      case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_FAIL: {
        return Object.assign({}, state, {
          cancelOrderStatus: {},
          cancelOrderStatusLoading: false,
          cancelOrderStatusLoaded: false,
        });
      }

// <---------------BULK CANCEL ORDER STATUS----------------> //

       case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS: {
        return Object.assign({}, state, {
          cancelRequest: payload,
          bulkCancelOrderStatus: {},
          bulkCancelOrderStatusLoading: true,
          bulkCancelOrderStatusLoaded: false,
        });
      }

      case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS: {
        let tempList = [];
        if (payload) {
          const requestString = state.cancelRequest.orderProductId;
          tempList = state.cancelOrderList;
          const array = JSON.parse('[' + requestString + ']');
          if (array.length > 0) {
             tempList.map(data => {
               array.map(string => {
                if (data.orderProductId === string) {
                   if (state.cancelRequest.cancelStatusId == '1') {
                    data.cancelRequestStatus = 1;
                   }
                   if (state.cancelRequest.cancelStatusId == '2') {
                    data.cancelRequestStatus = 2;
                  }
                 }
               });
             });
          }
        }
        return Object.assign({}, state, {
          cancelOrderList: tempList,
          bulkCancelOrderStatus: {},
          bulkCancelOrderStatusLoading: false,
          bulkCancelOrderStatusLoaded: true,
        });
      }

      case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS: {
        return Object.assign({}, state, {
          bulkCancelOrderStatus: {},
          bulkCancelOrderStatusLoading: false,
          bulkCancelOrderStatusLoaded: false,
        });
      }

// <---------------QUOTATION LIST COUNT----------------> //

    case actions.ActionTypes.QUOTATION_LIST_COUNT: {
      return Object.assign({}, state, {
        quotationListCount: '',
        quotationListCountLoading: true,
        quotationListCountLoaded: false,
        quotationListCountFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        quotationListCount: payload.data,
        quotationListCountLoading: false,
        quotationListCountLoaded: true,
        quotationListCountFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        quotationListCount: '',
        quotationListCountLoading: false,
        quotationListCountLoaded: false,
        quotationListCountFailed: true,
      });
    }


// <---------------QUOTATION LIST----------------> //

    case actions.ActionTypes.QUOTATION_LIST: {
      return Object.assign({}, state, {
        quotationListLoading: true,
        quotationListLoaded: false,
        quotationListFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_SUCCESS: {
      return Object.assign({}, state, {
        quotationList: payload.data,
        quotationListLoading: false,
        quotationListLoaded: true,
        quotationListFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_FAIL: {
      return Object.assign({}, state, {
        quotationListLoading: false,
        quotationListLoaded: false,
        quotationListFailed: true,
      });
    }

// <---------------GET ORDER INVOICE LIST----------------> //

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: true,
        orderInvoiceListLoaded: false,
        orderInvoiceListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: false,
        orderInvoiceListLoaded: true,
        orderInvoiceListFailed: false,
        orderInvoiceList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_FAIL: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: false,
        orderInvoiceListLoaded: false,
        orderInvoiceListFailed: true,
      });
    }

// <---------------GET ORDER INVOICE LIST COUNT----------------> //

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: true,
        orderInvoiceListCountLoaded: false,
        orderInvoiceListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: false,
        orderInvoiceListCountLoaded: true,
        orderInvoiceListCountFailed: false,
        orderInvoiceListCount: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: false,
        orderInvoiceListCountLoaded: false,
        orderInvoiceListCountFailed: true,
      });
    }

// <---------------DOWNLOAD INVOICE----------------> //

    case actions.ActionTypes.DOWNLOAD_INVOICE: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: true,
        downloadInvoiceLoaded: false,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        downloadInvoice: payload.data,
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: true
      });
    }

// <---------------GET SALES REPORT LIST----------------> //

     case actions.ActionTypes.SETTLEMENT_LIST: {
      return Object.assign({}, state, {
        settlementListLoading: true,
        settlementListLoaded: false,
        settlementListFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_SUCCESS: {
      let tempReports = [];
      if (payload.data) {
        let quantityTotal = 0;
        let baseTotal = 0;
        let subTotal = 0;
        let taxTotal = 0;
        tempReports = payload.data.map(data => {
          quantityTotal += data.quantity;
          baseTotal += (+data.basePrice) * (+data.quantity);
          subTotal += (+data.total);

          if (data.taxType === 2) {
            const percentToAmount = (+data.basePrice) * (data.taxValue / 100);
            const percent = Math.round(percentToAmount);
            taxTotal += percent * data.quantity;
            const opts = { ...data, taxAmount: percent * data.quantity};
            Object.assign(data, opts);

          } else {
            taxTotal += (+data.taxValue) * data.quantity;
            const opts = { ...data, taxAmount: (+data.taxValue) * data.quantity};
            Object.assign(data, opts);            }
            return {...data, quantityTotal: quantityTotal, baseTotal: baseTotal.toFixed(2), subTotal: subTotal, taxTotal: taxTotal};
          });
      }
      return Object.assign({}, state, {
        settlementList: tempReports,
        settlementListLoading: false,
        settlementListLoaded: true,
        settlementListFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        settlementListLoading: false,
        settlementListLoaded: false,
        settlementListFailed: true,
      });
    }

// <---------------GET SALES REPORT LIST COUNT----------------> //

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        settlementListCount: payload.data,
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

// <---------------EXPORT SALES REPORT----------------> //

    case actions.ActionTypes.EXPORT_SALES_REPORT: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: true,
        exportSalesOrderLoaded: false,
        exportSalesOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SALES_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: false,
        exportSalesOrderLoaded: true,
        exportSalesOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: false,
        exportSalesOrderLoaded: false,
        exportSalesOrderFailed: true,
      });
    }

    // <---------------SEND MAIL TO VENDOR----------------> //

    case actions.ActionTypes.SEND_MAIL: {
      return Object.assign({}, state, {
        sendMailLoading: true,
        sendMailLoaded: false,
        sendMailFailed: false,
      });
    }

    case actions.ActionTypes.SEND_MAIL_SUCCESS: {
      return Object.assign({}, state, {
        sendMailLoading: false,
        sendMailLoaded: true,
        sendMailFailed: false,
      });
    }

    case actions.ActionTypes.SEND_MAIL_FAIL: {
      return Object.assign({}, state, {
        sendMailLoading: false,
        sendMailLoaded: false,
        sendMailFailed: true,
      });
    }



    default: {
      return state;
    }
  }
}

export const getRecentOrderListLoading = (state: OrderState) =>
  state.recentListLoading;
export const getRecentOrderListLoaded = (state: OrderState) =>
  state.recentListLoaded;
export const getRecentOrderListFailed = (state: OrderState) =>
  state.recentListFailed;
export const todayRecentOrderList = (state: OrderState) =>
  state.todayRecentOrderList;
export const recentOrderList = (state: OrderState) => state.recentOrder;
export const prevRecentOrderList = (state: OrderState) =>
  state.prevRecentOrderList;
export const getOrderDetail = (state: OrderState) => state.orderDetail;
export const getOrderDetailLoading = (state: OrderState) => state.detailLoading;
export const getOrderDetailLoaded = (state: OrderState) => state.detailLoaded;
export const getOrderDetailFailed = (state: OrderState) => state.detailFailed;
// get archive order detail action
export const getArchiveOrderDetail = (state: OrderState) => state.archiveOrderDetail;
export const getArchiveOrderDetailLoading = (state: OrderState) => state.archiveDetailLoading;
export const getArchiveOrderDetailLoaded = (state: OrderState) => state.archiveDetailLoaded;
export const getArchiveOrderDetailFailed = (state: OrderState) => state.archiveDetailFailed;
// get order count action
export const getOrderCount = (state: OrderState) => state.orderCount;
export const getOrderCountLoading = (state: OrderState) =>
  state.orderCountLoading;
export const getOrderCountLoaded = (state: OrderState) =>
  state.orderCountLoaded;
export const getOrderCountFailed = (state: OrderState) =>
  state.orderCountFailed;

export const orderStatusListLoading = (state: OrderState) =>
  state.orderStatusListLoading;
export const orderStatusList = (state: OrderState) => state.orderStatusList;

// all order list action
export const getAllOrderListLoading = (state: OrderState) =>
  state.allListLoading;
export const getAllOrderListLoaded = (state: OrderState) => state.allListLoaded;
export const getAllOrderListFailed = (state: OrderState) => state.allListFailed;
export const getAllOrderList = (state: OrderState) => state.allOrderList;
// archive order list action
export const getArchiveOrderListLoading = (state: OrderState) =>
  state.archiveListLoading;
export const getArchiveOrderListLoaded = (state: OrderState) => state.archiveListLoaded;
export const getArchiveOrderListFailed = (state: OrderState) => state.archiveListFailed;
export const getArchiveOrderList = (state: OrderState) => state.archiveOrderList;
// all delivery list action
export const getDeliveryPersonsListLoading = (state: OrderState) =>
  state.deliveryPersonsListLoading;
export const getDeliveryPersonsListLoaded = (state: OrderState) =>
  state.deliveryPersonsListLoaded;
export const getDeliveryPersonsListFailed = (state: OrderState) =>
  state.deliveryPersonsListFailed;
export const getDeliveryPersonsList = (state: OrderState) =>
  state.deliveryPersonsList;
// allocate delivery person action
export const allocateDeliveryPersonsLoading = (state: OrderState) =>
  state.allocateDeliveryPersonsLoading;
export const allocateDeliveryPersonsLoaded = (state: OrderState) =>
  state.allocateDeliveryPersonsLoaded;
export const allocateDeliveryPersonsFailed = (state: OrderState) =>
  state.allocateDeliveryPersonsFailed;
export const allocateDeliveryPersons = (state: OrderState) =>
  state.allocateDeliveryPersons;
// all order list action
export const getAllOrderListBasedOnStatusLoading = (state: OrderState) =>
  state.allOrdersBasedOnStatusListLoading;
export const getAllOrderListBasedOnStatusLoaded = (state: OrderState) =>
  state.allOrdersBasedOnStatusListLoaded;
export const getAllOrderListBasedOnStatusFailed = (state: OrderState) =>
  state.allOrdersBasedOnStatusListFailed;
export const getAllOrderListBasedOnStatus = (state: OrderState) =>
  state.allOrdersBasedOnStatusList;
// update all order list action
export const updateAllOrderListBasedOnStatusLoading = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListLoading;
export const updateAllOrderListBasedOnStatusLoaded = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListLoaded;
export const updateAllOrderListBasedOnStatusFailed = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListFailed;
export const updateAllOrderListBasedOnStatus = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusList;

// all order log list action
export const getOrderLogListLoading = (state: OrderState) =>
  state.logListLoading;
export const getOrderLogListLoaded = (state: OrderState) => state.logListLoaded;
export const getOrderLogListFailed = (state: OrderState) => state.logListFailed;
export const getOrderLogList = (state: OrderState) => state.orderLogList;

// update order status action
export const getUpdateOrderStatusLoading = (state: OrderState) =>
  state.updateOrderStatusLoading;
export const getUpdateOrderStatusLoaded = (state: OrderState) =>
  state.updateOrderStatusLoaded;
export const getUpdateOrderStatusFailed = (state: OrderState) =>
  state.updateOrderStatusFailed;
export const getUpdateOrderStatus = (state: OrderState) =>
  state.updateOrderStatus;
  // make archive action
export const makeArchiveLoading = (state: OrderState) =>
state.makeArchiveLoading;
export const makeArchiveLoaded = (state: OrderState) =>
state.makeArchiveLoaded;
export const makeArchiveFailed = (state: OrderState) =>
state.makeArchiveFailed;
export const makeArchive = (state: OrderState) =>
state.makeArchive;
// update shipping information action
export const getUpdateShippingInformationLoading = (state: OrderState) =>
  state.updateShippingInformationLoading;
export const getUpdateShippingInformationLoaded = (state: OrderState) =>
  state.updateShippingInformationLoaded;
export const getUpdateShippingInformationFailed = (state: OrderState) =>
  state.updateShippingInformationFailed;
export const getUpdateShippingInformation = (state: OrderState) =>
  state.updateShippingInformation;


export const exportArchiveOrderLoading = (state: OrderState) =>
state.exportArchiveOrderLoading;
export const exportArchiveOrderLoaded = (state: OrderState) =>
state.exportArchiveOrderLoaded;
export const exportAllArchiveOrderLoading = (state: OrderState) =>
state.exportAllArchiveOrderLoading;

export const archiveOrderListCount = (state: OrderState) =>
state.archiveOrderListCount;
export const archiveOrderListCountLoading = (state: OrderState) =>
state.archiveOrderListCountLoading;
export const archiveOrderListCountLoaded = (state: OrderState) =>
state.archiveOrderListCountLoaded;

export const cancelOrderList = (state: OrderState) =>
state.cancelOrderList;
export const cancelOrderListLoading = (state: OrderState) =>
state.cancelOrderListLoading;
export const cancelOrderListLoaded = (state: OrderState) =>
state.cancelOrderListLoaded;

export const cancelOrderListCount = (state: OrderState) =>
state.cancelOrderListCount;
export const cancelOrderListCountLoading = (state: OrderState) =>
state.cancelOrderListCountLoading;
export const cancelOrderListCountLoaded = (state: OrderState) =>
state.cancelOrderListCountLoaded;


export const exportCancelOrderLoading = (state: OrderState) =>
state.exportCancelOrderLoading;
export const exportCancelOrderLoaded = (state: OrderState) =>
state.exportCancelOrderLoaded;

export const exportAllCancelOrderLoading = (state: OrderState) =>
state.exportAllCancelOrderLoading;
export const exportAllCancelOrderLoaded = (state: OrderState) =>
state.exportAllCancelOrderLoaded;

export const cancelOrderStatusLoading = (state: OrderState) =>
state.cancelOrderStatusLoading;
export const cancelOrderStatusLoaded = (state: OrderState) =>
state.cancelOrderStatusLoaded;

export const bulkCancelOrderStatusLoading = (state: OrderState) =>
state.bulkCancelOrderStatusLoading;
export const bulkCancelOrderStatusLoaded = (state: OrderState) =>
state.bulkCancelOrderStatusLoaded;

export const quotationList = (state: OrderState) =>
state.quotationList;
export const quotationListLoading = (state: OrderState) =>
state.quotationListLoading;
export const quotationListLoaded = (state: OrderState) =>
state.quotationListLoaded;
export const quotationListCount = (state: OrderState) =>
state.quotationListCount;

export const orderInvoiceList = (state: OrderState) =>
state.orderInvoiceList;
export const orderInvoiceListLoading = (state: OrderState) =>
state.orderInvoiceListLoading;
export const orderInvoiceListLoaded = (state: OrderState) =>
state.orderInvoiceListLoaded;
export const orderInvoiceListCount = (state: OrderState) =>
state.orderInvoiceListCount;


export const downloadInvoice = (state: OrderState) => state.downloadInvoice;
export const downloadInvoiceLoading = (state: OrderState) =>
  state.downloadInvoiceLoading;
export const downloadInvoiceLoaded = (state: OrderState) =>
  state.downloadInvoiceLoaded;
export const downloadInvoiceFailed = (state: OrderState) =>
  state.downloadInvoiceFailed;


  export const settlementList = (state: OrderState) => state.settlementList;
  export const settlementListLoading = (state: OrderState) =>
    state.settlementListLoading;
  export const settlementListLoaded = (state: OrderState) =>
    state.settlementListLoaded;
  export const settlementListCount = (state: OrderState) =>
    state.settlementListCount;

  export const exportSalesOrderLoading = (state: OrderState) =>
    state.exportSalesOrderLoading;
  export const exportSalesOrderLoaded = (state: OrderState) =>
    state.exportSalesOrderLoaded;

    export const sendMailLoading = (state: OrderState) =>
    state.sendMailLoading;
  export const sendMailLoaded = (state: OrderState) =>
    state.sendMailLoaded;