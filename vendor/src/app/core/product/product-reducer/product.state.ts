

import { Map, Record } from 'immutable';
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';
import { PriceUpdateListResponse } from '../product-model/price-update-List.model';

export interface ProductState extends Map<string, any> {

  productAdded: any;
  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  productBulkDelete: any;

  deleteProduct: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  deleteBulkProduct: any;
  deleteBulkLoading: boolean;
  deleteBulkLoaded: boolean;
  deleteBulkFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;
  productList: Array<any>;


  stockStatusListLoading: boolean;
  stockStatusListLoaded: boolean;
  stockStatusListFailed: boolean;
  stockStatusList: Array<any>;

  productStatus: any;
  productStatusLoading: boolean;
  productStatusLoaded: boolean;
  productStatusFailed: boolean;

  productUpdate: ProductAddResponseModel;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  productDetail: {};
  detailLoading: false;
  detailLoaded: false;
  detailFailed: false;
  availableCategoryList: [];

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;
  categoryListLoading: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;
  currentCategoryList: Array<any>;
  totalProductCount: number;
  totalProductCountLoading: boolean;
  totalProductCountLoaded: boolean;
  totalProductCountFailed: boolean;

  activeProductCount: number;
  activeProductCountLoading: boolean;
  activeProductCountLoaded: boolean;
  activeProductCountFailed: boolean;

  inactiveProductCount: number;
  inactiveProductCountLoading: boolean;
  inactiveProductCountLoaded: boolean;
  inactiveProductCountFailed: boolean;


  manufacturerListLoading: boolean;
  manufacturerListLoaded: boolean;
  manufacturerListFailed: boolean;
  manufacturerList: Array<any>;

  changeQuotationStatusLoading: boolean;
  changeQuotationStatusLoaded: boolean;
  changeQuotationStatusFailed: boolean;


  variantListLoading: boolean;
  variantListLoaded: boolean;
  variantListFailed: boolean;
  variantList: any;

  selectedVariant: any;
  originalVariantList: any;
  selectedVariantOriginal: any;
  probabiltyOptions: any;
  originalProbabiltyArray: any;

  skuArrayList: any;
  selectedVariantId: any;

  taxListLoading: boolean;
  taxListLoaded: boolean;
  taxListFailed: boolean;
  taxList: Array<any>;

}

export const ProductStateRecord = Record({

  productAdded: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,
  productList: [],


  stockStatusLoading: false,
  stockStatusLoaded: false,
  stockStatusFailed: false,
  stockStatusList: [],

  deleteProduct: {},
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  deleteBulkProduct: {},
  deleteBulkLoading: false,
  deleteBulkLoaded: false,
  deleteBulkFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  productUpdate: {},
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  categoryListLoading: false,
  categoryList: [],
  tempCategoryList: [],
  currentCategoryList: [],
  productDetail: DetailResponseModel,
  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  productStatus: [],
  productStatusLoading: false,
  productStatusLoaded: false,
  productStatusFailed: false,

  totalProductCount: [],
  totalProductCountLoading: false,
  totalProductCountLoaded: false,
  totalProductCountFailed: false,

  activeProductCount: [],
  activeProductCountLoading: false,
  activeProductCountLoaded: false,
  activeProductCountFailed: false,

  inactiveProductCount: [],
  inactiveProductCountLoading: false,
  inactiveProductCountLoaded: false,
  inactiveProductCountFailed: false,

  manufacturerListLoading: false,
  manufacturerListLoaded: false,
  manufacturerListFailed: false,
  manufacturerList: [],

  changeQuotationStatusLoading: false,
  changeQuotationStatusLoaded: false,
  changeQuotationStatusFailed: false,

  variantListLoading: false,
  variantListLoaded: false,
  variantListFailed: false,
  variantList: [],

  selectedVariant: [],
  originalVariantList: [],
  selectedVariantOriginal: [],
  probabiltyOptions: [],
  originalProbabiltyArray: [],

  skuArrayList: [],
  selectedVariantId: [],

  taxListLoading: false,
  taxListLoaded: false,
  taxListFailed: false,
  taxList: [],

  
});

