import * as actions from '../product-action/product.action';
// state
// model
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { ProductSearchOptionModel } from '../product-model/product-search-option';
import { ProductState, ProductStateRecord } from './product.state';
import { PriceUpdateListResponse } from '../product-model/price-update-List.model';

export const initialState: ProductState = (new ProductStateRecord() as unknown) as ProductState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductState {
  if (!type) {
    return state;
  }

  switch (type) {

// <---------------ADD PRODUCT----------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_SUCCESS: {
      const addedProduct = new ProductAddResponseModel(payload.data);
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        addProductDetail: addedProduct,
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

// <---------------GET PRODUCT DETAILS----------------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false,
        productDetail: {}
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      const tempVariantList = state.variantList;
      const tempSelectedVariant = [];
      const tempSelectedVariantId = [];
      let tempProbabilityArray: any = [];
      let tempProductVariantList:  any = [];
      let skuArray: any = [];
    if (tempVariantList && tempVariantList.length > 0) {
    if (payload.data) {
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
           skuArray.push(payload.data.sku);
          } else {
          skuArray.push(payload.data.sku);

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
        currentCategoryList: payload.data.Category,
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
        detailFailed: true,
        productDetail: {}

      });
    }

// <---------------DELETE PRODUCT----------------> //

    case actions.ActionTypes.DO_PRODUCT_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        deleteProduct: payload['productId']
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_SUCCESS: {
      if (payload) {
       state.productList = state.productList.filter(data => {
         if (data.productId === state.deleteProduct) {
           return false;
         } else {
           return true;
         }
       });
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_FAIL: {
      if (payload) {
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
      });
    }

// <---------------BULK DELETE PRODUCT----------------> //

    case actions.ActionTypes.DO_BULK_PRODUCT_DELETE: {
      return Object.assign({}, state, {
        deleteBulkLoading: true,
        deleteBulkLoaded: false,
        deleteBulkFailed: false,
        deleteBulkProduct: payload['productId']
      });
    }

    case actions.ActionTypes.DO_BULK_PRODUCT_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: true,
        deleteBulkFailed: false
      });
    }

    case actions.ActionTypes.DO_BULK_PRODUCT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: false,
        deleteBulkFailed: true
      });
    }


// <---------------UPDATE PRODUCT----------------> //

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
        productUpdate: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }

// <---------------GET PRODUCT LIST----------------> //

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
        productList: payload.data
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }


// <---------------STOCK STATUS LIST----------------> //

    case actions.ActionTypes.GET_STOCK_STATUS_LIST: {
      return Object.assign({}, state, {
        stockStatusListLoading: true,
        stockStatusListLoaded: false,
        stockStatusListFailed: false
      });
    }

    case actions.ActionTypes.GET_STOCK_STATUS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        stockStatusListLoading: false,
        stockStatusListLoaded: true,
        stockStatusListFailed: false,
        stockStatusList: payload.data
      });
    }

    case actions.ActionTypes.GET_STOCK_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        stockStatusListLoading: false,
        stockStatusListLoaded: false,
        stockStatusListFailed: true
      });
    }

// <---------------GET CATEGORY LOIST----------------> //

    case actions.ActionTypes.GET_CATEGORIES_LIST: {
      return Object.assign({}, state, {
        categoryListLoading: true
      });
    }

    case actions.ActionTypes.GET_CATEGORIES_LIST_SUCCESS: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryList: payload.data,
        tempCategoryList: payload.data
      });
    }

    case actions.ActionTypes.GET_CATEGORIES_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListLoading: false,
      });
    }

// <---------------PRODUCT STATUS----------------> //

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

// <---------------ADD CATEGORY----------------> //

    case actions.ActionTypes.ADD_CATEGORY: {
      let update = [];
      if (payload.length) {
        update = [];
      } else {
        const currentCategory = state.categoryList;
        update = currentCategory.filter(category => {
          if (category.categoryId === payload.categoryId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        categoryList: update
      });
    }


// <---------------REMOVE CATEGORY----------------> //

    case actions.ActionTypes.REMOVE_CATEGORY: {
      let tempArray = [];
      if (payload.length) {
        tempArray = state.tempCategoryList;
      } else {
        tempArray = state.categoryList;
        tempArray.push(payload);
      }
      return Object.assign({}, state, {
        categoryList: tempArray
      });
    }

// <---------------SEARCH CATEGORY----------------> //

    case actions.ActionTypes.SEARCH_CATEGORY: {
      let update = [];
      if (payload) {
        const currentCategory = state.categoryList;

        update = currentCategory.filter(item => {
          if (
            item.categoryName
              .toString()
              .toLowerCase()
              .indexOf(payload.toLowerCase()) !== -1
          ) {
            return true;
          }
          return false;
        });
      }
      return Object.assign({}, state, {
        categoryList: update
      });
    }


// <---------------GET TOTAL PRODUCT COUNT----------------> //

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        totalProductCount: 0,
        totalProductLoading: true,
        totalProductLoaded: false,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalProductCount: payload.data,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalProductCount: 0,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: true
      });
    }

// <---------------ACTIVE PRODUCT COUNT----------------> //

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        activeProductCount: 0,
        activeProductCountLoading: true,
        activeProductCountLoaded: false,
        activeProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        activeProductCount: payload.data,
        activeProductCountLoading: false,
        activeProductCountLoaded: true,
        activeProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        activeProductCount: 0,
        activeProductCountLoading: false,
        activeProductCountLoaded: true,
        activeProductCountFailed: true
      });
    }

// <---------------INACTIVE PRODUCT COUNT----------------> //

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        inactiveProductCount: 0,
        inactiveProductCountLoading: true,
        inactiveProductCountLoaded: false,
        inactiveProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        inactiveProductCount: payload.data,
        inactiveProductCountLoading: false,
        inactiveProductCountLoaded: true,
        inactiveProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        inactiveProductCount: 0,
        inactiveProductCountLoading: false,
        inactiveProductCountLoaded: true,
        inactiveProductCountFailed: true
      });
    }





// <---------------CHNAGE COUNT----------------> //

    case actions.ActionTypes.CHANGE_COUNT: {
      if (payload) {
        state.productList = state.productList.filter(data => {
          if (data.productId === payload.productId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {});
    }




// <---------------MANUFACTURER LIST----------------> //

     case actions.ActionTypes.MANUFACTURER_LIST: {
      return Object.assign({}, state, {
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
        manufacturerList: []
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
        manufacturerList: payload.data
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_FAIL: {
      return Object.assign({}, state, {
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
        manufacturerList: []
      });
    }

// <----------------CHANGE QUOTATION STATUS----------------> //

    case actions.ActionTypes.CHANGE_QUOTATION_STATUS: {
      return Object.assign({}, state, {
        changeQuotationStatusLoading: true,
        changeQuotationStatusLoaded: false,
        changeQuotationStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_QUOTATION_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        changeQuotationStatusLoading: false,
        changeQuotationStatusLoaded: true,
        changeQuotationStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_QUOTATION_STATUS_FAIL: {
      return Object.assign({}, state, {
        changeQuotationStatusLoading: false,
        changeQuotationStatusLoaded: false,
        changeQuotationStatusFailed: true,
      });
    }


// <---------------GET PRODUCT VARINAT LIST----------------> //

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

// <---------------SELECT VARIANT----------------> //

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
     case actions.ActionTypes.ADD_IMAGE_FOR_VARIANT: {
       let tempProbabilityArray = [];
       tempProbabilityArray = state.originalProbabiltyArray;
       if (payload) {
        tempProbabilityArray = tempProbabilityArray.map(data => {
           if (data.arrayId === payload.option.arrayId) {
             const array = [];
             array.push(payload.image);
            return { ...data, optionImage: array };
           } else {
             return data;
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

// <---------------REMOVE PROBABILITY VARIANT----------------> //

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

  // <---------------CHANGE PROBABILITY STATUS----------------> //

   case actions.ActionTypes.CHANGE_PROBABILITY_OPTION_STATUS: {
    let tempProbabilityArray = [];
    tempProbabilityArray = state.probabiltyOptions;
    if (payload) {
      if (payload.checked) {
        tempProbabilityArray = tempProbabilityArray.map(data => {
          if (data.arrayId === payload.option.arrayId) {
            return { ...data, isActive: 1 };
          } else {
            return data;
          }
        });
      } else {
        tempProbabilityArray = tempProbabilityArray.map(data => {
          if (data.arrayId === payload.option.arrayId) {
            return { ...data, isActive: 0 };
          } else {
            return data;
          }
        });
      }
    }
   return Object.assign({}, state, {
     variantListLoading: false,
     variantListLoaded: false,
     variantListFailed: true,
     probabiltyOptions: tempProbabilityArray,
     originalProbabiltyArray: tempProbabilityArray
   });
 }

// <---------------CLEAR VARIANT----------------> //

case actions.ActionTypes.CLEAR_VARIANT: {
  return Object.assign({}, state, {
    originalProbabiltyArray: [],
    probabiltyOptions: [],
    selectedVariant: [],
    selectedVariantOriginal: [],
  });
}

// <---------------GET TAX LIST----------------> //

  case actions.ActionTypes.TAX_LIST: {
    return Object.assign({}, state, {
      taxListLoading: false,
      taxListLoaded: false,
      taxListFailed: false,
      taxList: []
    });
  }

  case actions.ActionTypes.TAX_LIST_SUCCESS: {
    return Object.assign({}, state, {
      taxListLoading: false,
      taxListLoaded: false,
      taxListFailed: false,
      taxList: payload.data
    });
  }

  case actions.ActionTypes.TAX_LIST_FAIL: {
    return Object.assign({}, state, {
      taxListLoading: false,
      taxListLoaded: false,
      taxListFailed: false,
      taxList: []
    });
  }

    default: {
      return state;
    }
  }
}

// product list action
export const getProductListLoading = (state: ProductState) => state.listLoading;
export const getProductListLoaded = (state: ProductState) => state.listLoaded;
export const getProductListFailed = (state: ProductState) => state.listFailed;
export const productList = (state: ProductState) => state.productList;


export const getStockStatusListLoading = (state: ProductState) => state.stockStatusListLoading;
export const getStockStatusListLoaded = (state: ProductState) => state.stockStatusListLoaded;
export const getStockStatusListFailed = (state: ProductState) => state.stockStatusListFailed;
export const getStockStatusList = (state: ProductState) => state.stockStatusList;

// product detail action
export const getProductDetail = (state: ProductState) => state.productDetail;
export const getProducDetailLoading = (state: ProductState) =>
  state.detailLoading;
export const getProductDetailLoaded = (state: ProductState) =>
  state.detailLoaded;
export const getProductDetailFailed = (state: ProductState) =>
  state.detailFailed;
  export const getCurrentCategoryList = (state: ProductState) =>
  state.currentCategoryList;

// product add action
export const getProductAdd = (state: ProductState) => state.productAdded;

export const getProductAddLoading = (state: ProductState) => state.addLoading;
export const getProductAddLoaded = (state: ProductState) => state.addLoaded;
export const getProductAddFailed = (state: ProductState) => state.addFailed;
// product update action
export const getProductUpdate = (state: ProductState) => state.productUpdate;
export const getProductUpdateLoading = (state: ProductState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: ProductState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: ProductState) =>
  state.updateFailed;
// product status change
export const getProductStatus = (state: ProductState) => state.productStatus;
export const getProductStatusLoading = (state: ProductState) =>
  state.productStatusLoading;
export const getProductStatusLoaded = (state: ProductState) =>
  state.productStatusLoaded;
export const getProductStatusFailed = (state: ProductState) =>
  state.productStatusFailed;

// product delete action
export const getProductDelete = (state: ProductState) => state.deleteProduct;
export const getProductDeleteLoading = (state: ProductState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: ProductState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: ProductState) =>
  state.deleteFailed;

// product bulk delete action
export const getProductBulkDelete = (state: ProductState) =>
  state.deleteBulkProduct;
export const getProductBulkDeleteLoading = (state: ProductState) =>
  state.deleteBulkLoading;
export const getProductBulkDeleteLoaded = (state: ProductState) =>
  state.deleteBulkLoaded;
export const getProductBulkDeleteFailed = (state: ProductState) =>
  state.deleteBulkFailed;

export const categoryListLoading = (state: ProductState) =>
  state.categoryListLoading;
export const categoryList = (state: ProductState) => state.categoryList;
export const tempCategoryList = (state: ProductState) => state.tempCategoryList;

export const getTotalProductCount = (state: ProductState) =>
  state.totalProductCount;
export const getTotalProductCountLoading = (state: ProductState) =>
  state.totalProductCountLoading;
export const getTotalProductCountLoaded = (state: ProductState) =>
  state.totalProductCountLoaded;
export const getTotalProductCountFailed = (state: ProductState) =>
  state.totalProductCountFailed;

export const getActiveProductCount = (state: ProductState) =>
  state.activeProductCount;
export const getActiveProductCountLoading = (state: ProductState) =>
  state.activeProductCountLoading;
export const getActiveProductCountLoaded = (state: ProductState) =>
  state.activeProductCountLoaded;
export const getActiveProductCountFailed = (state: ProductState) =>
  state.activeProductCountFailed;

export const getInActiveProductCount = (state: ProductState) =>
  state.inactiveProductCount;
export const getInActiveProductCountLoading = (state: ProductState) =>
  state.inactiveProductCountLoading;
export const getInActiveProductCountLoaded = (state: ProductState) =>
  state.inactiveProductCountLoaded;
export const getInActiveProductCountFailed = (state: ProductState) =>
  state.inactiveProductCountFailed;


  export const manufacturerList = (state: ProductState) =>
    state.manufacturerList;
  export const manufacturerListLoading = (state: ProductState) =>
    state.manufacturerListLoading;
  export const manufacturerListLoaded = (state: ProductState) =>
    state.manufacturerListLoaded;

  export const changeQuotationStatusLoading = (state: ProductState) =>
    state.changeQuotationStatusLoading;
  export const changeQuotationStatusLoaded = (state: ProductState) =>
    state.changeQuotationStatusLoaded;


 // getting option list
 export const variantList = (state: ProductState) =>
 state.variantList;
 export const variantListLoading = (state: ProductState) =>
 state.variantListLoading;
 export const variantListListLoaded = (state: ProductState) =>
 state.variantListLoaded;
 export const variantListListFailed = (state: ProductState) =>
 state.variantListFailed;

 export const selectedVariant = (state: ProductState) =>
 state.selectedVariant;


 export const probabiltyOptions = (state: ProductState) =>
 state.probabiltyOptions;

 export const skuArrayList = (state: ProductState) =>
 state.skuArrayList;

 
 export const selectedVariantId = (state: ProductState) =>
 state.selectedVariantId;

 export const taxList = (state: ProductState) =>
 state.taxList;
export const taxListLoading = (state: ProductState) =>
 state.taxListLoading;
export const taxListLoaded = (state: ProductState) =>
 state.taxListLoaded;