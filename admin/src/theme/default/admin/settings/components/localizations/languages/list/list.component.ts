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
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';

@Component({
  selector: 'app-settings-language-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LanguageListComponent implements OnInit {

  public pageSize: any = 5;
  private keyword = '';
  private offset: number;
  private languageinfodetails: any = [];
  private pagenationcount = true;
  public index: number;
  private popoverContent: string;

  constructor(
    public languageSandbox: LanguagesSandbox,
    public router: Router,
    public service: LanguagesService
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.regSubscribeEvents();
    this.languageList(this.offset);
  }

  /**
   * Handles form 'list' event. Calls sandbox Language list function .
   *
   * @param params storing entire value
   */
  languageList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.languageSandbox.languageList(params);
    if (this.pagenationcount) {
      params.count = 'true';
      this.languageSandbox.languageListPagination(params);
    }
  }

  addLanguage() {
    this.service.languageSetData('');
    this.router.navigate(['/settings/local/language/add']);
  }

  editLanguage(languageinfo) {
    this.languageinfodetails = languageinfo;
    this.service.languageSetData(this.languageinfodetails);
    this.router.navigate([
      '/settings/local/language/edit',
      this.languageinfodetails.languageId
    ]);
  }

  deleteLanguage(languageId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.languageSandbox.deleteLanguage({ languageId: languageId });
  }

  regSubscribeEvents() {
    this.languageSandbox.languageDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.languageList(this.offset);
      }
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.languageList(this.offset);
  }
}
