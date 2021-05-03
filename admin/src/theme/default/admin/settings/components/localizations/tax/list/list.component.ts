/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../../core/admin/settings/localizations/tax/tax.service';

@Component({
  selector: 'app-spurt-taxlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TaxListComponent implements OnInit {

  public pageSize: any = 5;
  private pageoffset: number;
  private editedTaxValue: any = {};
  private popoverContent: any;

  constructor(
    public sandbox: TaxSandbox,
    private taxService: TaxService,
    private router: Router
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.taxList();
    this.countPaginationApi();
  }

  addTax() {
    this.taxService.setEditedValue('');
    this.router.navigate(['/settings/local/tax/add']);
  }

  /**
   * Handles form 'list' event. Calls sandbox Tax List function.
   *
   * @param params storing entire value
   */
  taxList(offset: any = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = '';
    params.count = '';
    this.sandbox.getTaxList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Tax List Pagination count function.
   *
   * @param params storing entire value
   */
  countPaginationApi() {
    const params: any = {};
    params.limit = 5;
    params.offset = '';
    params.keyword = '';
    params.count = 1;
    this.sandbox.getTaxListCount(params);
  }

  onPageChange(event) {
    this.pageoffset = event.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.taxList(this.pageoffset);
    this.taxService.deletePagerefresh(this.pageoffset);
  }

  editTax(value: any) {
    this.editedTaxValue = this.taxService.setEditedValue(value);
    this.router.navigate(['/settings/local/tax/edit', value.taxId]);
  }

  deleteTax(taxId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.sandbox.deleteTax({ taxId: taxId });
  }

  regSubscribeEvents() {
    this.sandbox.getTaxDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.taxList(this.pageoffset);
        this.countPaginationApi();
      }
    });
  }
}
