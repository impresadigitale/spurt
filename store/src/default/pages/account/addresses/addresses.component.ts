/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { Router } from '@angular/router';
import { AccountService } from '../../../../core/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit {

  public getAddressinfo: any;
  public waitForResponse: any;
  private subscription: Array<Subscription> = [];


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public accountSandbox: AccountSandbox,
    public accountService: AccountService
  ) {}

  ngOnInit() {
    this.getCustomerAddressList();
    this.getSubscribe();
  }

  /**         CALLS ADDRESS LIST
   * calls accountSandbox getAddressList
   * @param set by default
   * **/
  public getCustomerAddressList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    this.accountSandbox.getAddressList(params);
  }

  /**
   *                  EDIT ADDRESS
   * calls accountService setCustomerAddress to edit address
   * @param details from accountService
   * navigate to ['/account/addaddresses_edit', details.addressId]  with address id.
   * **/
  public addressEdit(details) {
    this.accountService.setCustomerAddress(details);
    this.router.navigate(['/account/addaddresses_edit', details.addressId]);
  }

  /**                 DELETE ADDRESS
   * calls accountSandbox deleteCustomerAddress with params to delete address
   * @param id from delete button,then calls getSubscribe to subscribe response.
   * **/
  public deleteAddress(id) {
    if (!this.waitForResponse || this.waitForResponse !== id) {
      this.waitForResponse = id;
      const params: any = {};
      params.addressId = id;
      this.accountSandbox.deleteCustomerAddress(params);
      this.getSubscribe();
    }
  }

  /**         SUBSCRIBE API(accountSandbox) RESPONSE
   * subscribe accountSandbox getCustAddressList$ and
   * subscribe accountSandbox getCustDeleteAddress$ if success then calls getCustomerAddressList.'
   * **/
  public getSubscribe() {
    this.subscription.push(
      this.accountSandbox.getCustAddressList$.subscribe(data => {
        this.getAddressinfo = data;
      })
    );
    this.subscription.push(
      this.accountSandbox.getCustDeleteAddress$.subscribe(value => {
        if (value && value.status) {
          if (value.status === 1) {
            this.getCustomerAddressList();
          }
        }
      })
    );
  }
}
