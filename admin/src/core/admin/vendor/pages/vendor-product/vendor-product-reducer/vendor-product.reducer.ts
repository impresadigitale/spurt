import * as actions from '../vendor-product-action/vendor-product.action';
import {
  ProductsState,
  ProductsRecord
} from '../vendor-product-reducer/vendor-product.state';
import { ApprovalRequest } from '../vendor-product-models/seller-approval.request.model';
import { DetailModel } from '../vendor-product-models/detail.model';
import { DetailResponseModel } from '../vendor-product-models/detail-response.model';

export const initialState: ProductsState = new ProductsRecord() as unknown as ProductsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductsState {
  if (!type) {
    return state;
  }

  switch (type) {

// <--------------CATEGORY LIST---------------> //

    case actions.ActionTypes.DO_CAT_LIST: {
      return Object.assign({}, state, {
        catListRequestLoading: true,
        catListRequestLoaded: false,
        catListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_CAT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        catListResponse: payload.data,
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_CAT_LIST_FAIL: {
      return Object.assign({}, state, {
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: true
      });
    }

// <--------------VENDOR LIST---------------> //

    case actions.ActionTypes.GET_SELLER_LIST: {
      return Object.assign({}, state, {
        sellerListLoading: true,
        sellerListLoaded: false,
        sellerListFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerListLoading: false,
        sellerListLoaded: true,
        sellerListFailed: false,
        sellerList: payload.data
      });
    }

    case actions.ActionTypes.GET_SELLER_LIST_FAIL: {
      return Object.assign({}, state, {
        sellerListLoading: false,
        sellerListLoaded: true,
        sellerListFailed: true
      });
    }

// <--------------PRODUCT ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        productAdded: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

// <--------------PRODUCT COMMISION---------------> //

    case actions.ActionTypes.DO_PRODUCT_COMMISSION: {
      return Object.assign({}, state, {
        commissionLoading: true,
        commissionLoaded: false,
        commissionFailed: false,
        productCommission: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_COMMISSION_SUCCESS: {
      if (payload) {
        let array: any = [];
        array = state.productCommission.productId.split(',');
          state.productList.map(data => {
           array.forEach(datas => {
            if (data.productId === Number(datas)) {
              data.vendorProductCommission = state.productCommission.commission;
            }
          });
        });
      }
      return Object.assign({}, state, {
        commissionLoading: false,
        commissionLoaded: true,
        commissionFailed: false,
        productList: state.productList
      });
    }

    case actions.ActionTypes.DO_PRODUCT_COMMISSION_FAIL: {
      return Object.assign({}, state, {
        commissionLoading: false,
        commissionLoaded: false,
        commissionFailed: true
      });
    }

// <--------------CLEAR PRODUCT DETAILS---------------> //

    case actions.ActionTypes.DO_CLEAR_PRODUCT_DETAILS: {
      return Object.assign({}, state, {
        productDetail: {}
      });
    }

// <--------------PRODUCT REMOVE---------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE_LIST: {
      const Data: any = state.productList;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveLists: Data,
        productRemoveListResponse: false,
        productRemoveListRequestLoading: true,
        productRemoveListRequestLoaded: false,
        productRemoveListRequestFailed: false
      });
    }

// <--------------PRODUCT ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD_LIST: {
      const Data: any = JSON.parse(JSON.stringify(state.productList));
      Data.push(payload);

      return Object.assign({}, state, {
        productList: Data,
        productAddListResponse: false,
        productAddListRequestLoading: true,
        productAddListRequestLoaded: false,
        productAddListRequestFailed: false
      });
    }

// <--------------CATEGORY REMOVE---------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE: {
      const Data: any = state.catListResponse;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveRequestLoading: true,
        productRemoveRequestLoaded: false,
        productRemoveRequestFailed: false
      });
    }

// <--------------CATEGORY ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD_VENDOR: {
      const Data: any = state.catListResponse;
      Data.push(payload);
      return Object.assign({}, state, {
        catListResponse: Data,
        productAddResponse: Data,
        productAddRequestLoading: true,
        productAddRequestLoaded: false,
        productAddRequestFailed: false
      });
    }

// <--------------GET PRODUCT LIST---------------> //

    case actions.ActionTypes.GET_PRODUCT_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        productList: payload.data,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }

// <--------------PRODUCT DELETE---------------> //

    case actions.ActionTypes.DO_PRODUCT_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        productDelete: payload

      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_SUCCESS: {
      if (payload) {
        state.productList = state.productList.filter(data => {
          if (data.productId === state.productDelete.productId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false,
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
      });
    }

// <--------------SELLER APPROVAL---------------> //

    case actions.ActionTypes.DO_SELLER_APPROVAL: {
      return Object.assign({}, state, {
        sellerApprovalLoading: true,
        sellerApprovalLoaded: false,
        sellerApprovalFailed: false
      });
    }

    case actions.ActionTypes.DO_SELLER_APPROVAL_SUCCESS: {
      return Object.assign({}, state, {
        sellerApprovalLoading: false,
        sellerApprovalLoaded: true,
        sellerApprovalFailed: false,
        sellerApproval: payload
      });
    }

    case actions.ActionTypes.DO_SELLER_APPROVAL_FAIL: {
      return Object.assign({}, state, {
        sellerApprovalLoading: false,
        sellerApprovalLoaded: false,
        sellerApprovalFailed: true
      });
    }

// <--------------PRODUCT UPDATE---------------> //

    case actions.ActionTypes.DO_PRODUCT_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        productUpdate: payload.data
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }

// <--------------PRODUCT STATUS CHANGE---------------> //

    case actions.ActionTypes.DO_STATUS: {
      return Object.assign({}, state, {
        productStatusLoading: true,
        productStatusLoaded: false,
        productStatusFailed: false
      });
    }

    case actions.ActionTypes.DO_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        productStatusLoading: false,
        productStatusLoaded: true,
        productStatusFailed: false,
        productStatus: payload
      });
    }

    case actions.ActionTypes.DO_STATUS_FAIL: {
      return Object.assign({}, state, {
        productStatusLoading: false,
        productStatusLoaded: false,
        productStatusFailed: true
      });
    }

// <--------------PRODUCT DETAILS---------------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      const tempVariantList = state.variantList;
      const tempSelectedVariant = [];
      const tempSelectedVariantId = [];
      let tempProbabilityArray: any = [];
      let tempProductVariantList:  any = [];
      let skuArray: any = [];

      if (payload.data) {
        skuArray.push(payload.data.sku);
      if (tempVariantList && tempVariantList.length > 0) {
      tempProductVariantList = payload.data.productvarientList;
        tempVariantList.map(data => {
          payload.data.productVarient.forEach(item => {
            if (item.varientsId === data.id) {
                const opts = { ...data, selected: true};
                Object.assign(data, opts);
                tempSelectedVariant.push(data);
                tempSelectedVariantId.push(data.id);
            }
          });
        });

        if (tempProductVariantList.length > 0) {
          tempProductVariantList = tempProductVariantList.map((opt, i) => {
            const obj: any = {};
            obj.arrayId = 'id' + i;
            obj.value = opt.productVarientOption;
            obj.sku = opt.skuName;
            obj.price = opt.price;
            obj.barcode = '';
            obj.inventory = opt.quantity;
            obj.isActive = opt.isActive;
            obj.optionImage = opt.optionImage;
            obj.id = opt.id;
            skuArray.push(opt.skuName);
            return obj;
           });
          }
            tempProbabilityArray = tempProductVariantList.map(data => {
              const array = [];
              data.value.map(item => {
                const opts = {id: item.varientsValueId, value: item.valueName};
                array.push(opts);
              });
              return {...data, value: array};
            });
      }
      }
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        productDetail: new DetailResponseModel(payload.data),
        variantList: tempVariantList,
        selectedVariant: tempSelectedVariant,
        selectedVariantOriginal: tempSelectedVariant,
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray,
        skuArrayList: skuArray,
        selectedVariantId: tempSelectedVariantId
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

// <--------------PRODUCT Overall COUNT---------------> //


    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        vendorProductCount: {},
        vendorProductCountLoading: true,
        vendorProductCountLoaded: false,
        vendorProductCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorProductCount: payload.data,
        vendorProductCountLoading: false,
        vendorProductCountLoaded: true,
        vendorProductCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorProductCount: {},
        vendorProductCountLoading: false,
        vendorProductCountLoaded: false,
        vendorProductCountFailed: true,
      });
    }

// <--------------PRODUCT PRODUCT COUNT FOR PAGINATION---------------> //

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        vendorProductListCount: {},
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorProductListCount: payload.data,
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorProductListCount: {},
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

// <--------------MANUFACTURER LIST---------------> //

    case actions.ActionTypes.MANUFACTURER_LIST: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: true,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        manufacturerList: payload.data,
        manufacturerListLoading: false,
        manufacturerListLoaded: true,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_FAIL: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: true,
      });
    }

// <--------------GET VARIANT LIST---------------> //

    case actions.ActionTypes.VARIANT_LIST: {
      return Object.assign({}, state, {
        variantListLoading: true,
        variantListLoaded: false,
        variantListFailed: false
      });
    }

    case actions.ActionTypes.VARIANT_LIST_SUCCESS: {
      let listArray = [];
      if (payload.data && payload.data.length > 0) {
        listArray = payload.data.map(data => {
          return { ...data, selected: false };
        });
      }
      return Object.assign({}, state, {
        variantListLoading: false,
        variantListLoaded: true,
        variantListFailed: false,
        variantList: listArray,
        originalVariantList: listArray
      });
    }

    case actions.ActionTypes.VARIANT_LIST_FAIL: {
      return Object.assign({}, state, {
        variantListLoading: false,
        variantListLoaded: false,
        variantListFailed: true
      });
    }

// <--------------SELECT VARIANT (MAKE PROBABILITY VARINAT ARRAY)---------------> //

    case actions.ActionTypes.SELECT_VARIANT: {
      let tempSelectedVariant: any = [];
     let tempProbabilityArray: any = [];
      if (state.selectedVariant) {
        tempSelectedVariant = state.selectedVariant;
      }
       if (payload.list) {
         if (!payload.list.selected) {
          state.variantList = state.variantList.map(data => {
            if (data.id === payload.list.id) {
              const opts = { ...data, selected: true};
              tempSelectedVariant.push(opts);
              return opts;
            } else {
              return data;
            }
          });

         } else {
          tempSelectedVariant = tempSelectedVariant.filter(data => {
             if (data.id === payload.list.id) {
              const opts = { ...data, selected: false};
              Object.assign({}, data, opts);
              return false;
             } else {
              const opts = { ...data, selected: true};
              Object.assign({}, data, opts);
               return true;
             }
           });
           state.variantList = state.variantList.map(item => {
              if (item.id === payload.list.id) {
                return { ...item, selected: false };
              } else {
                return item;
              }
           });
         }
       }
       if (tempSelectedVariant.length === 0) {
        tempProbabilityArray = [];

       } else if (tempSelectedVariant.length === 1) {
       tempProbabilityArray = tempSelectedVariant[0].varientsValue.map((data, i) => {
         const array = [];
         const obj: any = {};
          const opts = {id: data.id, value: data.valueName};
          array.push(opts);
          obj.value = array;
          obj.arrayId = 'id' + i;
          obj.sku = payload.mainSku ? payload.mainSku + '-' + (i + 1) : '';
          obj.price = payload.defaultPrice ? payload.defaultPrice : '';
          obj.barcode = '';
          obj.inventory = '';
          obj.isActive = 1;
          obj.optionImage = [];
          return obj;
        });
       } else {
        let sections = tempSelectedVariant.map(variant => {
          return variant.varientsValue.map(val => ({id: val.id, value: val.valueName}));
        });
        tempProbabilityArray = sections.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
        tempProbabilityArray = tempProbabilityArray.map((data, i) => {
          const obj: any = {};
          obj.arrayId = 'id' + i;
          obj.value = data;
          obj.sku = payload.mainSku ? payload.mainSku + '-' + (i + 1) : '';
          obj.price = payload.defaultPrice ? payload.defaultPrice : '';
          obj.barcode = '';
          obj.inventory = '';
          obj.isActive = 1;
          obj.optionImage = [];
          return obj;
        });
       }
       return Object.assign({}, state, {
        selectedVariant: tempSelectedVariant,
        selectedVariantOriginal: tempSelectedVariant,
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray
       });
     }


// <--------------REMOVE VARIANT PROBABILITY ARRAY---------------> //


    case actions.ActionTypes.REMOVE_PROBABILITY_OPTION: {
      let tempProbabilityArray = [];
      tempProbabilityArray = state.originalProbabiltyArray;
      if (payload) {
       tempProbabilityArray = tempProbabilityArray.filter(data => {
          if (data.arrayId === payload.option.arrayId) {
           return false;
          } else {
            return true;
          }
        });
      }
     return Object.assign({}, state, {
       variantListLoading: false,
       variantListLoaded: false,
       variantListFailed: true,
       probabiltyOptions: tempProbabilityArray,
       originalProbabiltyArray: tempProbabilityArray
     });
   }


// <--------------CLEAR VARIANT RELATED VARIABLES ---------------> //

    case actions.ActionTypes.CLEAR_VARIANT: {
      return Object.assign({}, state, {
        originalProbabiltyArray: [],
        probabiltyOptions: [],
        selectedVariant: [],
        selectedVariantOriginal: [],
        productDetail: {}
      });
    }

    // <--------------SELECT CATEGORY ---------------> //

    case actions.ActionTypes.SELECT_CATEGORY: {
      let tempCategoryList = state.catListResponse;
      if (state.catListResponse && state.catListResponse.length > 0) {
        tempCategoryList = tempCategoryList.filter(data => {
          if (data.categoryId === payload.list.categoryId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        catListResponse: tempCategoryList
      });
    }

// <--------------REMOVE CATEGORY ---------------> //

    case actions.ActionTypes.REMOVE_CATEGORY: {
      const tempCategoryList = state.catListResponse;
        tempCategoryList.push(payload.list);
      return Object.assign({}, state, {
        catListResponse: tempCategoryList
      });
    }


    // <--------------PRODUCT COUNT---------------> //


    case actions.ActionTypes.PRODUCT_LIST_COUNT: {
      return Object.assign({}, state, {
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        productListCount: payload.data,
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    default: {
      return state;
    }
  }
}

export const getCatListResponse = (state: ProductsState) =>
  state.catListResponse;
export const getCatListRequestLoading = (state: ProductsState) =>
  state.catListRequestLoading;
export const getCatListRequestLoaded = (state: ProductsState) =>
  state.catListRequestLoaded;
export const getCatListRequestFailed = (state: ProductsState) =>
  state.catListRequestFailed;

export const getSellerList = (state: ProductsState) => state.sellerList;
export const getSellerListLoading = (state: ProductsState) =>
  state.sellerListLoading;
export const getSellerListLoaded = (state: ProductsState) =>
  state.sellerListLoaded;
export const getSellerListFailed = (state: ProductsState) =>
  state.sellerListFailed;

export const optionList = (state: ProductsState) => state.optionList;
export const optionListLoading = (state: ProductsState) =>
  state.optionListLoading;
export const optionListLoaded = (state: ProductsState) =>
  state.optionListLoaded;
export const optionListFailed = (state: ProductsState) =>
  state.optionListFailed;

export const getProductAdd = (state: ProductsState) => state.productAdded;

export const getProductAddLoading = (state: ProductsState) => state.addLoading;
export const getProductAddLoaded = (state: ProductsState) => state.addLoaded;
export const getProductAddFailed = (state: ProductsState) => state.addFailed;

export const getProductCommission = (state: ProductsState) => state.productCommission;

export const getProductCommissionLoading = (state: ProductsState) => state.commissionLoading;
export const getProductCommissionLoaded = (state: ProductsState) => state.commissionLoaded;
export const getProductCommissionFailed = (state: ProductsState) => state.commissionFailed;


// getting option list
export const gettingOptionList = (state: ProductsState) =>
  state.gettingoptionList;
export const gettingOptionListLoading = (state: ProductsState) =>
  state.gettingOptionLoading;
export const gettingOptionListLoaded = (state: ProductsState) =>
  state.gettingOptionLoaded;
export const gettingOptionListFailed = (state: ProductsState) =>
  state.gettingOptionFailed;



  export const getProductList = (state: ProductsState) => state.productList;
export const getProductListLoading = (state: ProductsState) => state.listLoading;
export const getProductListLoaded = (state: ProductsState) => state.listLoaded;
export const getProductListFailed = (state: ProductsState) => state.listFailed;


export const getProductDelete = (state: ProductsState) => state.productDelete;
export const getProductDeleteLoading = (state: ProductsState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: ProductsState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: ProductsState) =>
  state.deleteFailed;



  export const getSellerApproval = (state: ProductsState) => state.sellerApproval;
export const getSellerApprovalLoading = (state: ProductsState) =>
  state.sellerApprovalLoading;
export const getSellerApprovalLoaded = (state: ProductsState) =>
  state.sellerApprovalLoaded;
export const getSellerApprovalFailed = (state: ProductsState) =>
  state.sellerApprovalFailed;

  export const getProductStatus = (state: ProductsState) => state.productStatus;
export const getProductStatusLoading = (state: ProductsState) =>
  state.productStatusLoading;
export const getProductStatusLoaded = (state: ProductsState) =>
  state.productStatusLoaded;
export const getProductStatusFailed = (state: ProductsState) =>
  state.productStatusFailed;


  export const getProductUpdate = (state: ProductsState) => state.productUpdate;
export const getProductUpdateLoading = (state: ProductsState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: ProductsState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: ProductsState) =>
  state.updateFailed;


  export const getProductDetail = (state: ProductsState) => state.productDetail;
export const getProducDetailLoading = (state: ProductsState) =>
  state.detailLoading;
export const getProductDetailLoaded = (state: ProductsState) =>
  state.detailLoaded;
export const getProductDetailFailed = (state: ProductsState) =>
  state.detailFailed;

export const vendorProductCount = (state: ProductsState) =>
state.vendorProductCount;
export const vendorProductCountLoading = (state: ProductsState) =>
state.vendorProductCountLoading;
export const vendorProductCountLoaded = (state: ProductsState) =>
state.vendorProductCountLoaded;
export const vendorProductCountFailed = (state: ProductsState) =>
state.vendorProductCountFailed;

export const vendorProductListCount = (state: ProductsState) =>
state.vendorProductListCount;
export const vendorProductListCountLoading = (state: ProductsState) =>
state.vendorProductListCountLoading;
export const vendorProductListCountLoaded = (state: ProductsState) =>
state.vendorProductListCountLoaded;
export const vendorProductListCountFailed = (state: ProductsState) =>
state.vendorProductListCountFailed;


export const manufacturerList = (state: ProductsState) =>
state.manufacturerList;
export const manufacturerListLoading = (state: ProductsState) =>
state.manufacturerListLoading;
export const manufacturerListLoaded = (state: ProductsState) =>
state.manufacturerListLoaded;


  // getting option list
export const variantList = (state: ProductsState) =>
state.variantList;
export const variantListLoading = (state: ProductsState) =>
state.variantListLoading;
export const variantListListLoaded = (state: ProductsState) =>
state.variantListLoaded;
export const variantListListFailed = (state: ProductsState) =>
state.variantListFailed;

export const selectedVariant = (state: ProductsState) =>
state.selectedVariant;


export const probabiltyOptions = (state: ProductsState) =>
state.probabiltyOptions;

export const skuArrayList = (state: ProductsState) =>
state.skuArrayList;

export const selectedVariantId = (state: ProductsState) =>
state.selectedVariantId;


export const productListCount = (state: ProductsState) =>
state.productListCount;
