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
// store
import { Store } from '@ngrx/store';
// actions
import * as productActions from './product-action/product.action';
// app state
import * as store from '../../../app.state.interface';
// router
import { Router } from '@angular/router';
// notifications
import { ToastrManager } from 'ng6-toastr-notifications';

import {
  // product add selectors
  getProductAdd,
  ProductAddFailed,
  ProductAddLoaded,
  ProductAddLoading,
  // product count selectors
  getProductCount,
  ProductCountFailed,
  ProductCountLoaded,
  ProductCountLoading,
  // product delete selectors
  getProductDelete,
  ProductDeleteFailed,
  ProductDeleteLoaded,
  ProductDeleteLoading,
  // product details selectors
  getProductAddDetail,
  getProductDetails,
  ProductDetailFailed,
  ProductDetailLoaded,
  ProductDetailLoading,
  // product list selectors
  getProductList,
  ProductListFailed,
  ProductListLoaded,
  ProductListLoading,
  // product update selectors
  getProductUpdate,
  ProductUpdateFailed,
  ProductUpdateLoaded,
  ProductUpdateLoading,
  // product add List
  getProductAddListRequestLoading,
  getProductAddListResponse,
  getProductAddListRequestFailed,
  getProductAddListRequestLoaded,
  // product remove List
  getProductRemoveListResponse,
  getProductRemoveListRequestLoading,
  getProductRemoveListRequestLoaded,
  getProductRemoveListRequestFailed,
  optionList,
  optionlistLoading,
  optionlistLoaded,
  optionlistFailed,
  gettingOptionList,
  gettingOptionListLoading,
  gettingOptionListLoaded,
  gettingOptionListFailed,
  gettingRatingList,
  questionList,
  questionListLoading,
  questionListLoaded,
  addQuestion,
  deleteQuestion,
  changeQuestionStatus,
  answerList,
  answerListLoading,
  answerListLoaded,
  updateAnswer,
  updateAnswerLoaded,
  updateAnswerLoading,
  deleteAnswer,
  deleteAnswerLoaded,
  deleteAnswerLoading,
  changeAnswerStatus,
  changeAnswerStatusLoading,
  changeAnswerStatusLoaded,
  addAnswer,
  addAnswerLoading,
  addAnswerLoaded,
  defaultAnswer,

  manufacturerList,
  manufacturerListLoading,
  manufacturerListLoaded,

  variantList,
  variantListLoading,
  variantListLoaded,

  selectedVariant,
  probabiltyOptions,
  skuArrayList,
  selectedVariantId


} from './product-reducer/product.selector';
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { ProductAddModel } from './product-model/Product-add.model';
import { ProductUpdateModel } from './product-model/Product-update.model';
import { DetailModel } from './product-model/detail.model';
import { ProductRatingListModel } from './product-model/product-rating-list.model';

@Injectable()
export class ProductSandbox {
  public productList$ = this.appState.select(getProductList);
  public productCount$ = this.appState.select(getProductCount);
  public deletedProduct$ = this.appState.select(getProductDelete);
  public productAdd$ = this.appState.select(getProductAdd);
  public productAddDetail$ = this.appState.select(getProductAddDetail);
  public productUpdate$ = this.appState.select(getProductUpdate);
  public productDetails$ = this.appState.select(getProductDetails);
  public optionList$ = this.appState.select(optionList);
  public gettingOptionList$ = this.appState.select(gettingOptionList);
  public gettingRatingList$ = this.appState.select(gettingRatingList);

  public productDetailLoading$ = this.appState.select(ProductDetailLoading);
  public productDetailLoaded$ = this.appState.select(ProductDetailLoaded);
  public productDetailFailed$ = this.appState.select(ProductDetailFailed);

  public productListLoading$ = this.appState.select(ProductListLoading);
  public productListLoaded$ = this.appState.select(ProductListLoaded);
  public productListFailed$ = this.appState.select(ProductListFailed);

  public productDeleteLoading$ = this.appState.select(ProductDeleteLoading);
  public productDeleteLoaded$ = this.appState.select(ProductDeleteLoaded);
  public productDeleteFailed$ = this.appState.select(ProductDeleteFailed);

  public productCountLoading$ = this.appState.select(ProductCountLoading);
  public productCountLoaded$ = this.appState.select(ProductCountLoaded);
  public productCountFailed$ = this.appState.select(ProductCountFailed);

  public productAddLoading$ = this.appState.select(ProductAddLoading);
  public productAddLoaded$ = this.appState.select(ProductAddLoaded);
  public productAddFailed$ = this.appState.select(ProductAddFailed);

  public productUpdateLoading$ = this.appState.select(ProductUpdateLoading);
  public productUpdateLoaded$ = this.appState.select(ProductUpdateLoaded);
  public productUpdateFailed$ = this.appState.select(ProductUpdateFailed);

  public getProductAddResponse$ = this.appState.select(
    getProductAddListResponse
  );
  public getProductAddRequestLoading$ = this.appState.select(
    getProductAddListRequestLoading
  );
  public getProductAddRequestLoaded$ = this.appState.select(
    getProductAddListRequestLoaded
  );
  public getProductAddRequestFailed$ = this.appState.select(
    getProductAddListRequestFailed
  );

  public getProductRemoveResponse$ = this.appState.select(
    getProductRemoveListResponse
  );
  public getProductRemoveRequestLoading$ = this.appState.select(
    getProductRemoveListRequestLoading
  );
  public getProductRemoveRequestLoaded$ = this.appState.select(
    getProductRemoveListRequestLoaded
  );
  public getProductRemoveRequestFailed$ = this.appState.select(
    getProductRemoveListRequestFailed
  );

  public optionListLoading$ = this.appState.select(optionlistLoading);
  public optionListLoaded$ = this.appState.select(optionlistLoaded);
  public optionListFailed$ = this.appState.select(optionlistFailed);


  public variantListLoading$ = this.appState.select(variantListLoading);
  public variantListLoaded$ = this.appState.select(variantListLoaded);
  public variantList$ = this.appState.select(variantList);

  public gettingOptionListLoading$ = this.appState.select(
    gettingOptionListLoading
  );
  public gettingOptionListLoaded$ = this.appState.select(
    gettingOptionListLoaded
  );
  public gettingOptionListFailed$ = this.appState.select(
    gettingOptionListFailed
  );


  // question variables

  public questionList$ = this.appState.select(questionList);
  public questionListLoading$ = this.appState.select(questionListLoading);
  public questionListLoaded$ = this.appState.select(questionListLoaded);
  public addQuestion$ = this.appState.select(addQuestion);
  public deleteQuestion$ = this.appState.select(deleteQuestion);
  public changeQuestionStatus$ = this.appState.select(changeQuestionStatus);

// answer variables

public answerList$ = this.appState.select(answerList);
public answerListLoading$ = this.appState.select(answerListLoading);
public answerListLoaded$ = this.appState.select(answerListLoaded);

public updateAnswer$ = this.appState.select(updateAnswer);
public updateAnswerLoading$ = this.appState.select(updateAnswerLoading);
public updateAnswerLoaded$ = this.appState.select(updateAnswerLoaded);

public deleteAnswer$ = this.appState.select(deleteAnswer);
public deleteAnswerLoaded$ = this.appState.select(deleteAnswerLoaded);
public deleteAnswerLoading$ = this.appState.select(deleteAnswerLoading);

public changeAnswerStatus$ = this.appState.select(changeAnswerStatus);
public changeAnswerStatusLoading$ = this.appState.select(changeAnswerStatusLoading);
public changeAnswerStatusLoaded$ = this.appState.select(changeAnswerStatusLoaded);

public addAnswer$ = this.appState.select(addAnswer);
public addAnswerLoading$ = this.appState.select(addAnswerLoading);
public addAnswerLoaded$ = this.appState.select(addAnswerLoaded);
public defaultAnswer$ = this.appState.select(defaultAnswer);


// manufacturer list

public manufacturerList$ = this.appState.select(manufacturerList);
public manufacturerListLoading$ = this.appState.select(manufacturerListLoading);
public manufacturerListLoaded$ = this.appState.select(manufacturerListLoaded);

public selectedVariant$ = this.appState.select(selectedVariant);

public probabiltyOptions$ = this.appState.select(probabiltyOptions);


public skuArrayList$ = this.appState.select(skuArrayList);
public selectedVariantId$ = this.appState.select(selectedVariantId);


  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public getProductList(value) {
    this.appState.dispatch(
      new productActions.GetProductlistAction(new ProductListModel(value))
    );
  }

  public getProductCount(value) {
    this.appState.dispatch(
      new productActions.GetProductCountAction(new ProductListModel(value))
    );
  }

  public doProductDelete(value) {
    this.appState.dispatch(
      new productActions.DoProductDeleteAction(new ProductDeleteModel(value))
    );
  }

  public doProductAdd(value) {
    this.appState.dispatch(
      new productActions.DoProductAddAction(new ProductAddModel(value))
    );
  }

  public doProductUpdate(value) {
    this.appState.dispatch(
      new productActions.DoProductUpdateAction(new ProductUpdateModel(value))
    );
  }

  public getProductDetail(value) {
    this.appState.dispatch(
      new productActions.GetProductDetailAction(new DetailModel(value))
    );
  }

  public productCarPark(value) {
    this.appState.dispatch(
      new productActions.DoProductDetailCarParkAction(value)
    );
  }

  public productIsFeature(value) {
    this.appState.dispatch(
      new productActions.DoProductDetailIsFeatureAction(value)
    );
  }

  public productAddList(value) {
    this.appState.dispatch(new productActions.DoProductaddlistAction(value));
  }

  public productRemoveList(value) {
    this.appState.dispatch(new productActions.DoProductremovelistAction(value));
  }

  public productTodayDeals(value) {
    this.appState.dispatch(new productActions.DoProductTodayDealAction(value));
  }

  // clear product details
  public ClearProductDetails() {
    this.appState.dispatch(new productActions.DOClearProductDetails());
  }

  // Get Product Rating List
  public getProductRatingList(value) {
    this.appState.dispatch(
      new productActions.GetProductRating(new ProductRatingListModel(value))
    );
  }

  // Do Rating Status
  public doRatingStatus(value) {
    this.appState.dispatch(new productActions.DoProductRatingStatus(value));
  }

  // Do Product Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new productActions.DoProductBulkDelete(value));
  }

  // Do Product Excel
  public productExcel(value) {
    this.appState.dispatch(new productActions.DoProductExcel(value));
  }


  // Do Product Excel
  public productAllExcel(value) {
    this.appState.dispatch(new productActions.DoProductAllExcel(value));
  }

  // Get Question List

  public getQuestionList(value) {
    this.appState.dispatch(new productActions.GetQuestionListAction(value));
  }

  // Add Question

  public addQuestion(value) {
    this.appState.dispatch(new productActions.AddQuestionAction(value));
  }

  // delete Question

  public deleteQuestion(value) {
    this.appState.dispatch(new productActions.DeleteQuestionAction(value));
  }

  // clear state variable to avoid subscription

  public clear() {
    this.appState.dispatch(new productActions.ClearVariableAction());
  }

  // clear state variable to avoid subscription

  public changeQuestionStatus(value) {
    this.appState.dispatch(new productActions.ChangeQuestionStatusAction(value));
  }

  // get answer list

  public getAnswerList(value) {
    this.appState.dispatch(new productActions.GetAnswerListAction(value));
  }

  // add answer

  public addAnswer(value) {
    this.appState.dispatch(new productActions.AddAnswerAction(value));
  }

  // update answer

  public updateAnswer(value) {
    this.appState.dispatch(new productActions.UpdateAnswerAction(value));
  }

  // delete answer

  public deleteAnswer(value) {
    this.appState.dispatch(new productActions.DeleteAnswerAction(value));
  }

  // change Answer Status

  public changeAnswerStatus(value) {
    this.appState.dispatch(new productActions.ChangeAnswerStatusAction(value));
  }

  // make default answer

  public makeDefaultAnswer(value) {
    this.appState.dispatch(new productActions.MakeDefaultAnswerAction(value));
  }

   // get manufacturer list

   public manufacturerList(value) {
    this.appState.dispatch(new productActions.ManufacturerListAction(value));
  }

  public getVariantList(value) {
    this.appState.dispatch(new productActions.VariantListAction(value));
  }

  public selectVariant(value) {
    this.appState.dispatch(new productActions.SelectVariant(value));
  }

  public deleteVariant(value) {
    this.appState.dispatch(new productActions.DeleteVariant(value));
  }

  public addImageForVaraint(value) {
    this.appState.dispatch(new productActions.AddImageForVariant(value));
  }

  public removeProbabiltyOption(value) {
    this.appState.dispatch(new productActions.RemoveProbabiltyOption(value));
  }

  public changeProbabilityOptionStatus(value) {
    this.appState.dispatch(new productActions.ChangeProbabiltyOptionStatus(value));
  }
  public removeOptionImage(value) {
    this.appState.dispatch(new productActions.RemoveOptionImage(value));
  }
  public variantClear() {
    this.appState.dispatch(new productActions.Variantclear());
  }

  public deleteProbabilityOption(value) {
    this.appState.dispatch(new productActions.DeleteProbabilityOption(value));
  }


  subscribe() {
    this.productAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/product']);
      }
    });

    this.productUpdate$.subscribe(data => {
      if (data && data['status'] === 1) {
        this.router.navigate(['/catalog/product']);
      }
    });
  }
}
