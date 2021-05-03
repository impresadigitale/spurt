

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './product.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.product;


// product add action
export const getProductAdd = createSelector(
  getProdState,
  fromProduct.getProductAdd
);
export const productAddLoading = createSelector(
  getProdState,
  fromProduct.getProductAddLoading
);
export const productAddLoaded = createSelector(
  getProdState,
  fromProduct.getProductAddLoaded
);
export const productAddFailed = createSelector(
  getProdState,
  fromProduct.getProductAddFailed
);
// product delete action
export const getProductDelete = createSelector(
  getProdState,
  fromProduct.getProductDelete
);
export const productDeleteLoading = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoading
);
export const productDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoaded
);
export const productDeleteFailed = createSelector(
  getProdState,
  fromProduct.getProductDeleteFailed
);
// product bulk delete action
export const getProductBulkDelete = createSelector(
  getProdState,
  fromProduct.getProductBulkDelete
);
export const productBulkDeleteLoading = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteLoading
);
export const productBulkDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteLoaded
);
export const productBulkDeleteFailed = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteFailed
);
// product Detail action
export const getProductDetail = createSelector(
  getProdState,
  fromProduct.getProductDetail
);
export const ProductDetailLoading = createSelector(
  getProdState,
  fromProduct.getProducDetailLoading
);
export const ProductDetailLoaded = createSelector(
  getProdState,
  fromProduct.getProductDetailLoaded
);
export const ProductDetailFailed = createSelector(
  getProdState,
  fromProduct.getProductDetailFailed
);
// product update action
export const getProductUpdate = createSelector(
  getProdState,
  fromProduct.getProductUpdate
);
export const getProductDetails = createSelector(
  getProdState,
  fromProduct.getProductDetail
);
export const productUpdateLoading = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoading
);
export const productUpdateLoaded = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoaded
);
export const productUpdateFailed = createSelector(
  getProdState,
  fromProduct.getProductUpdateFailed
);

// product status change
export const getProductStatus = createSelector(
  getProdState,
  fromProduct.getProductStatus
);
export const getProductStatusLoading = createSelector(
  getProdState,
  fromProduct.getProductStatusLoading
);
export const getProductStatusLoaded = createSelector(
  getProdState,
  fromProduct.getProductStatusLoaded
);
export const getProductStatusFailed = createSelector(
  getProdState,
  fromProduct.getProductStatusFailed
);

export const productListLoading = createSelector(
  getProdState,
  fromProduct.getProductListLoading
);
export const productListLoaded = createSelector(
  getProdState,
  fromProduct.getProductListLoaded
);
export const productListFailed = createSelector(
  getProdState,
  fromProduct.getProductListFailed
);
export const stockStatusList = createSelector(
  getProdState,
  fromProduct.getStockStatusList
);
export const stockStatusListLoading = createSelector(
  getProdState,
  fromProduct.getStockStatusListLoading
);
export const stockStatusListLoaded = createSelector(
  getProdState,
  fromProduct.getStockStatusListLoaded
);
export const stockStatusListFailed = createSelector(
  getProdState,
  fromProduct.getStockStatusListFailed
);

export const categoryList = createSelector(
  getProdState,
  fromProduct.categoryList
);
export const categoryListLoading = createSelector(
  getProdState,
  fromProduct.categoryListLoading
);

export const tempCategoryList = createSelector(
  getProdState,
  fromProduct.tempCategoryList
);
export const productList = createSelector(
  getProdState,
  fromProduct.productList
);
export const getTotalProductCount = createSelector(
  getProdState,
  fromProduct.getTotalProductCount
);
export const getTotalProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getTotalProductCountLoaded
);
export const getTotalProductCountLoading = createSelector(
  getProdState,
  fromProduct.getTotalProductCountLoading
);
export const getTotalProductCountFailed = createSelector(
  getProdState,
  fromProduct.getTotalProductCountFailed
);

export const getActiveProductCount = createSelector(
  getProdState,
  fromProduct.getActiveProductCount
);
export const getActiveProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getActiveProductCountLoaded
);
export const getActiveProductCountLoading = createSelector(
  getProdState,
  fromProduct.getActiveProductCountLoading
);
export const getActiveProductCountFailed = createSelector(
  getProdState,
  fromProduct.getActiveProductCountFailed
);

export const getInActiveProductCount = createSelector(
  getProdState,
  fromProduct.getInActiveProductCount
);
export const getInActiveProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountLoaded
);
export const getInActiveProductCountLoading = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountLoading
);
export const getInActiveProductCountFailed = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountFailed
);


export const manufacturerList = createSelector(
  getProdState,
  fromProduct.manufacturerList
);
export const manufacturerListLoading = createSelector(
  getProdState,
  fromProduct.manufacturerListLoading
);
export const manufacturerListLoaded = createSelector(
  getProdState,
  fromProduct.manufacturerListLoaded
);


export const changeQuotationStatusLoading = createSelector(
  getProdState,
  fromProduct.changeQuotationStatusLoading
);
export const changeQuotationStatusLoaded = createSelector(
  getProdState,
  fromProduct.changeQuotationStatusLoaded
);

export const variantList = createSelector(
  getProdState,
  fromProduct.variantList
);
export const variantListLoading = createSelector(
  getProdState,
  fromProduct.variantListLoading
);
export const variantListLoaded = createSelector(
  getProdState,
  fromProduct.variantListListLoaded
);
export const selectedVariant = createSelector(
  getProdState,
  fromProduct.selectedVariant
);

export const probabiltyOptions = createSelector(
  getProdState,
  fromProduct.probabiltyOptions
);
export const skuArrayList = createSelector(
  getProdState,
  fromProduct.skuArrayList
);
export const selectedVariantId = createSelector(
  getProdState,
  fromProduct.selectedVariantId
);
export const taxList = createSelector(
  getProdState,
  fromProduct.taxList
);
export const taxListLoading = createSelector(
  getProdState,
  fromProduct.taxListLoading
);
export const taxListLoaded = createSelector(
  getProdState,
  fromProduct.taxListLoaded
);