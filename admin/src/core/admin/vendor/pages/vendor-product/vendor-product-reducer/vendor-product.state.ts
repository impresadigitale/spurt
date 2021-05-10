import { Map, Record } from 'immutable';

export interface ProductsState extends Map<string, any> {
  catListResponse: any;
  catListRequestLoading: boolean;
  catListRequestLoaded: boolean;
  catListRequestFailed: boolean;

  sellerList: any;
  sellerListLoading: boolean;
  sellerListLoaded: boolean;
  sellerListFailed: boolean;

  optionList: any;
  optionListLoading: boolean;
  optionListLoaded: boolean;
  optionListFailed: boolean;

  productAdded: any;
  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  productCommission: any;
  commissionLoading: boolean;
  commissionLoaded: boolean;
  commissionFailed: boolean;

  gettingoptionList: any;
  gettingOptionLoading: boolean;
  gettingOptionLoaded: boolean;
  gettingOptionFailed: boolean;

  productList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  productDelete: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;



  sellerApproval: any;
  sellerApprovalLoading: boolean;
  sellerApprovalLoaded: boolean;
  sellerApprovalFailed: boolean;

  productUpdate: any;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  productDetail: any;
  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;

  productStatus: any;
  productStatusLoading: boolean;
  productStatusLoaded: boolean;
  productStatusFailed: boolean;

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

  vendorProductCount: any;
  vendorProductCountLoading: boolean;
  vendorProductCountLoaded: boolean;
  vendorProductCountFailed: boolean;

  vendorProductListCount: any;
  vendorProductListCountLoading: boolean;
  vendorProductListCountLoaded: boolean;
  vendorProductListCountFailed: boolean;

  manufacturerList: any;
  manufacturerListLoading: boolean;
  manufacturerListLoaded: boolean;
  manufacturerListFailed: boolean;

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

  productListCount: any;
  productListCountLoading: boolean;
  productListCountLoaded: boolean;
  productListCountFailed: boolean;

}

export const ProductsRecord = Record({
  catListResponse: [],
  catListRequestLoading: false,
  catListRequestLoaded: false,
  catListRequestFailed: false,

  sellerList: [],
  sellerListLoading: false,
  sellerListLoaded: false,
  sellerListFailed: false,

  optionList: [],
  optionListLoading: false,
  optionListLoaded: false,
  optionListFailed: false,

  productAdded: [],
  addLoading: false,
  addLoaded: false,
  addFailed: false,


  productCommission: [],
  commissionLoading: false,
  commissionLoaded: false,
  commissionFailed: false,


  gettingoptionList: [],
  gettingOptionLoading: false,
  gettingOptionLoaded: false,
  gettingOptionFailed: false,

  productlist: [],
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  productDelete: [],
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,



  sellerApproval: [],
  sellerApprovalLoading: false,
  sellerApprovalLoaded: false,
  sellerApprovalFailed: false,

  productUpdate: [],
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,



  productDetail: [],
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

  vendorProductCount: {},
  vendorProductCountLoading: false,
  vendorProductCountLoaded: false,
  vendorProductCountFailed: false,

  vendorProductListCount: {},
  vendorProductListCountLoading: false,
  vendorProductListCountLoaded: false,
  vendorProductListCountFailed: false,

  manufacturerList: [],
  manufacturerListLoading: false,
  manufacturerListLoaded: false,
  manufacturerListFailed: false,

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

  productListCount: '',
  productListCountLoading: false,
  productListCountLoaded: false,
  productListCountFailed: false,

});
