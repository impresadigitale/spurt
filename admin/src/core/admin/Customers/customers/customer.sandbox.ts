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
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as customerAction from './customer-action/customers.action';
import {
  getDetailLoaded,
  getDetailLoading,
  customerList,
  customerListCount,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  addAddressAdd,
  addAddressList,
  addressListCount,
  addAddressUpdate,
  deleteAddAddress,
  detailCustomer
} from './customer-reducer/customer.selector';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CustomerForm } from './customer-model/customerform.model';
import { CustomerListForm } from './customer-model/customerlistform.model';
import { AddAddressListForm } from './customer-model/addAddresslistform.model';
import { AddAddressForm } from './customer-model/addAddressform.model';

@Injectable()
export class CustomerSandbox {


  private subscriptions: Array<Subscription> = [];

  /*customer*/
  public customerList$ = this.appState.select(customerList);
  public addCustomer$ = this.appState.select(addCustomer);
  public updateCustomer$ = this.appState.select(updateCustomer);
  public deleteCustomer$ = this.appState.select(deleteCustomer);
  public customerListCount$ = this.appState.select(customerListCount);

  /* address*/

  public addAddressList$ = this.appState.select(addAddressList);
  public addAddressAdd$ = this.appState.select(addAddressAdd);
  public addAddressUpdate$ = this.appState.select(addAddressUpdate);
  public deleteAddAddress$ = this.appState.select(deleteAddAddress);

  public addressListCount$ = this.appState.select(
    addressListCount
  );

  public getDetailCustomer$ = this.appState.select(detailCustomer);
  public getDetailLoading$ = this.appState.select(getDetailLoading);
  public getDetailLoaded$ = this.appState.select(getDetailLoaded);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscripe();
  }

  public customerList(value) {
    this.appState.dispatch(
      new customerAction.DoCustomersListAction(new CustomerListForm(value))
    );
  }

  public paginationCustomer(value) {
    this.appState.dispatch(
      new customerAction.DoPaginationCustomersListAction(
        new CustomerListForm(value)
      )
    );
  }

  public addCustomers(value) {
    this.appState.dispatch(
      new customerAction.DoAddCustomersListAction(new CustomerForm(value))
    );
  }

  public updateCustomers(value) {
    this.appState.dispatch(
      new customerAction.DoUpdateCustomerAction(new CustomerForm(value))
    );
  }

  public deleteCustomers(value) {
    this.appState.dispatch(new customerAction.DoDeleteCustomerAction(value));
  }

  // Add Address
  public addAddressList(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressListAction(new AddAddressListForm(value))
    );
  }

  public addAddresspagination(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressPaginationtAction(
        new AddAddressListForm(value)
      )
    );
  }

  // Add Address Add
  public addAddressAdd(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressAddAction(new AddAddressForm(value))
    );
  }

  public updateAddressAdd(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressUpdateAction(new AddAddressForm(value))
    );
  }

  public deleteAddressAdd(value) {
    this.appState.dispatch(new customerAction.DoDeleteAddAddressAction(value));
  }

  public viewCustomerDetail(value) {
    this.appState.dispatch(new customerAction.DoCustomerDetailAction(value));
  }

  // Do Customer Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new customerAction.DoCustomerBulkDelete(value));
  }

  // Do Customer Excel
  public customerExcel(value) {
    this.appState.dispatch(new customerAction.DoCustomerExcel(value));
  }


    // Do Customer All Excel
    public customerAllExcel(value) {
      this.appState.dispatch(new customerAction.DoCustomerAllExcel(value));
    }


  subscripe() {
    this.subscriptions.push(
      this.addCustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer']);
        }
      })
    );
    this.subscriptions.push(
      this.updateCustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer']);
        }
      })
    );
  }
}
