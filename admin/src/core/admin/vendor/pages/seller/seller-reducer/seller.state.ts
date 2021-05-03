import { Map, Record } from 'immutable';

export interface SellerState extends Map<string, any> {
  sellerList: any;
  sellerListLoading: boolean;
  sellerListLoaded: boolean;
  sellerListFailed: boolean;

  sellerAdd: any;
  sellerAddLoading: boolean;
  sellerAddLoaded: boolean;
  sellerAddFailed: boolean;

  sellerUpdate: any;
  sellerUpdateLoading: boolean;
  sellerUpdateLoaded: boolean;
  sellerUpdateFailed: boolean;

  totalSellerCount: number;
  totalSellerCountLoading: boolean;
  totalSellerCountLoaded: boolean;
  totalSellerCountFailed: boolean;

  activeSellerCount: number;
  activeSellerCountLoading: boolean;
  activeSellerCountLoaded: boolean;
  activeSellerCountFailed: boolean;

  inactiveSellerCount: number;
  inactiveSellerCountLoading: boolean;
  inactiveSellerCountLoaded: boolean;
  inactiveSellerCountFailed: boolean;

  pageDetails: any;
  pageDetailsLoading: boolean;
  pageDetailsLoaded: boolean;
  pageDetailsFailed: boolean;

  deleteSeller: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  bulkDeleteSeller: any;
  deletesLoading: boolean;
  deletesLoaded: boolean;
  deletesFailed: boolean;

  sellerApproval: any;
  sellerApprovalLoading: boolean;
  sellerApprovalLoaded: boolean;
  sellerApprovalFailed: boolean;

  countryList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;


  vendorCount: any;
  vendorCountLoading: boolean;
  vendorCountLoaded: boolean;
  vendorCountFailed: boolean;

  zoneList: any;
  zoneListLoading: boolean;
  zoneListLoaded: boolean;
  zoneListFailed: boolean;

  sellerListCount: any;
  sellerListCountLoading: boolean;
  sellerListCountLoaded: boolean;
  sellerListCountFailed: boolean;


}

export const SellerRecord = Record({
  sellerList: [],
  sellerListLoading: false,
  sellerListLoaded: false,
  sellerListFailed: false,

  sellerAdd: [],
  sellerAddLoading: false,
  sellerAddLoaded: false,
  sellerAddFailed: false,

  sellerUpdate: [],
  sellerUpdateLoading: false,
  sellerUpdateLoaded: false,
  sellerUpdateFailed: false,

  totalSellerCount: 0,
  totalSellerCountLoading: false,
  totalSellerCountLoaded: false,
  totalSellerCountFailed: false,

  activeSellerCount: [],
  activeSellerCountLoading: false,
  activeSellerCountLoaded: false,
  activeSellerCountFailed: false,

  inactiveSellerCount: [],
  inactiveSellerCountLoading: false,
  inactiveSellerCountLoaded: false,
  inactiveSellerCountFailed: false,

  pageDetails: [],
  pageDetailsLoading: false,
  pageDetailsLoaded: false,
  pageDetailsFailed: false,

  deleteSeller: [],
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  bulkDeleteSeller: [],
  deletesLoading: false,
  deletesLoaded: false,
  deletesFailed: false,


  sellerApproval: [],
  sellerApprovalLoading: false,
  sellerApprovalLoaded: false,
  sellerApprovalFailed: false,

  countryList: {},
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  vendorCount: {},
  vendorCountLoading: false,
  vendorCountLoaded: false,
  vendorCountFailed: false,

  zoneList: [],
  zoneListLoading: false,
  zoneListLoaded: false,
  zoneListFailed: false,

  sellerListCount: '',
  sellerListCountLoading: false,
  sellerListCountLoaded: false,
  sellerListCountFailed: false,

});
