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
import { Store } from '@ngrx/store';
import * as Filteraction from '../filter/filter-action/filter.action';
import * as store from '../../../../app.state.interface';
import { FilterForm } from '../filter/filter-model/filter.model';
import { getNewFilter, getFilter, filterList, FilterListLoading, FilterListLoaded, FilterListFailed, varientList, attributeList, getFilterLoaded, filterDelete, userpagination } from '../filter/filter-reducer/filter.selector';


@Injectable()
export class FilterSandbox {
  public getNewFilter$ = this.appState.select(getNewFilter);
  public getFilter$ = this.appState.select(getFilter);
  public getFilterLoaded$ = this.appState.select(getFilterLoaded);

  public filterList$ = this.appState.select(filterList);
  public filterListLoading$ = this.appState.select(FilterListLoading);
  public filterListLoaded$ = this.appState.select(FilterListLoaded);
  public filterListFailed$ = this.appState.select(FilterListFailed);

  public varientList$ = this.appState.select(varientList);
  public attributeList$ = this.appState.select(attributeList);
  public filterDelete$ = this.appState.select(filterDelete);
  public userpagination$ = this.appState.select(userpagination);
  constructor(protected appState: Store<store.AppState>) {}

  public getFilterPagination(value) {
    this.appState.dispatch(
      new Filteraction.DoFilterPaginationAction((value))
    );
  }

  public getFilterList(value: any) {
    this.appState.dispatch(
      new Filteraction.DoFilterListAction((value))
    );
  }
  public createFilter(value) {
    this.appState.dispatch(
      new Filteraction.DoNewFilterAction(new FilterForm(value))
    );
  }
  public updateFilter(value) {
    this.appState.dispatch(new Filteraction.UpdateFilterAction((value))
    );
  }
  public getFilter(params) {
    this.appState.dispatch(new Filteraction.DoGetFilterAction(params));
  }
  public varientList(value: any) {
    this.appState.dispatch(
      new Filteraction.DoVarientListAction((value))
    );
  }
  public attributeList(value: any) {
    this.appState.dispatch(
      new Filteraction.DoAttributeListAction((value))
    );
  }
  public clearVarientData(value) {
    this.appState.dispatch(
      new Filteraction.ClearVarientData((value))
    );
  }
  public deleteFilter(value: any) {
    this.appState.dispatch(new Filteraction.DeleteFilter(value));
  }
  public searchVarient(value: any) {
    this.appState.dispatch(new Filteraction.SearchVarient(value));
  }
  public searchAttribute(value: any) {
    this.appState.dispatch(new Filteraction.SearchAttribute(value));
  }
}
