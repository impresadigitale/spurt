/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { AccountService } from '../../../../core/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';


@Component({
  selector: 'app-addaddresses',
  templateUrl: './addaddresses.component.html',
  styleUrls: ['./addaddresses.component.scss']
})
export class AddaddressesComponent implements OnInit, OnDestroy {

  public billingForm: FormGroup;
  public addAddressForm: FormGroup;
  public customerAddress: any = [];
  public addressId: any;
  public countries = [];
  public prevUrl: any;
  public countryId: any;
  private subscription: Array<Subscription> = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public accountSandbox: AccountSandbox,
    public accountService: AccountService,
    public listSandbox: ListsSandbox
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.prevUrl = params['url'];
      }
    });
  }

  ngOnInit() {
    this.getZoneList();
    this.addressId = this.route.snapshot.paramMap.get('id');
    this.addAddressForm = this.formBuilder.group({
      name: ['', Validators.required],
      address1: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
    ])],
      address2: ['', Validators.compose([
        Validators.maxLength(128),
    ])],
      addresstype: '',
      city: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
    ])],
      state: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
    ])],
      postcode: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6)
      ])],
      country: ['', Validators.required]
    });
    this.addAddressForm.patchValue({ addresstype: '1', tc: true });
    if (this.addressId) {
      this.editAddressForm();
    } else {
      this.subscribeCountry();
    }

  }

  subscribeCountry() {
    this.subscription.push(this.listSandbox.countryList$.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach((item) => {
          if (item.isoCode3 === 'IND') {
            this.countryId = item.countryId;
            this.addAddressForm.controls['country'].setValue(this.countryId);
           }
        });
      }
    }));
  }

  editAddressForm() {
    this.customerAddress.push(this.accountService.getCustomerAddress());
    if (this.customerAddress && this.customerAddress[0]) {
      this.addAddressForm.controls['address1'].setValue(
        this.customerAddress[0].address1
      );
      this.addAddressForm.controls['address2'].setValue(
        this.customerAddress[0].address2
      );
      if (this.customerAddress[0].addressType === 1) {
        this.addAddressForm.patchValue({ addresstype: '1', tc: true });
      } else if (this.customerAddress[0].addressType === 0) {
        this.addAddressForm.patchValue({ addresstype: '0', tc: true });
      }
      this.addAddressForm.controls['city'].setValue(
        this.customerAddress[0].city
      );
      this.addAddressForm.controls['state'].setValue(
        this.customerAddress[0].state
      );
      this.addAddressForm.controls['postcode'].setValue(
        this.customerAddress[0].postcode
      );
      this.addAddressForm.controls['country'].setValue(
        this.customerAddress[0].countryId
      );
      this.countryId = this.customerAddress[0].countryId;

      this.addAddressForm.controls['name'].setValue(
        this.customerAddress[0].company
      );
    }
  }

  public onSubmit(addressFormGroup) {
    if (this.addAddressForm.valid) {
      const params: any = {};
      params.company = addressFormGroup.name;
      params.address1 = addressFormGroup.address1;
      params.address2 = addressFormGroup.address2;
      params.city = addressFormGroup.city;
      params.state = addressFormGroup.state;
      params.postcode = addressFormGroup.postcode;
      params.countryId = addressFormGroup.country;
      if (addressFormGroup.addresstype === '1') {
        params.addressType = 1;
      } else {
        params.addressType = 0;
      }
      if (this.customerAddress && this.customerAddress[0]) {
        params.addressId = this.addressId;
        this.accountSandbox.updateCustomerAddress(params);
        this.customerAddress = [];
      } else {
        this.accountSandbox.addCustomerAddress(params);
        this.subscribeEvents();
      }
    }
  }

  subscribeEvents() {
    this.subscription.push(
      this.accountSandbox.getCustAddAddress$.subscribe(add => {
        if (add && add.status === 1) {
          if (this.prevUrl) {
            this.router.navigate([this.prevUrl]);
          } else {
            this.router.navigate(['/account/addresses']);
          }
        }
      })
    );
  }

  cancel() {
    this.accountService.setCustomerAddress('');
    if (this.prevUrl) {
      this.router.navigate([this.prevUrl]);
    } else {
      this.router.navigate(['/account/addresses']);
    }
  }


  selectCountry(event) {
    this.countryId = event.value;
    this.addAddressForm.controls['state'].setValue('');
  }

  getZoneList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    this.accountSandbox.getZoneList(params);
  }

  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
