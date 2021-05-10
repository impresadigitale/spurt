/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoleSandbox } from '../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../core/admin/settings/role/role.ApiClientService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-role-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
    `
  ]
})
export class RoleListComponent implements OnInit, OnDestroy {

  public roledetails: any = {};
  public pageSize = '10';
  private keyword = '';
  private offset: number;
  private currentPage: any;
  private index: any;
  private popoverContent: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    public appSandbox: RoleSandbox,
    public service: RoleApiClientService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.getRolelist(this.offset, this.pageSize);
    this.getRoleListCount(this.offset, this.pageSize);
  }

  addNewRole() {
    this.roledetails = null;
    this.service.rolesetdata(this.roledetails);
    this.router.navigate(['/settings/role/add']);
  }

  /**
   * Handles form 'list' event. Calls sandbox Role getRolelist function .
   *
   * @param params storing entire value
   */
  getRolelist(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.appSandbox.getRoleList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Role getRolelistCount function .
   *
   * @param params storing entire value
   */
  getRoleListCount(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getpagination(params);
  }

  editRole(roleinfo) {
    this.roledetails = roleinfo;
    this.service.rolesetdata(this.roledetails);
    this.router.navigate(['/settings/role/edit', this.roledetails.groupId]);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getRolelist(offset, this.pageSize);
  }

  goToPermission(user) {
    const userDetail = JSON.parse(localStorage.getItem('adminUserdetail'))
    .userdetails;
    const details = {id: user.groupId, type: 'role', role: user.name};
    this.router.navigate(['/settings/permission'], { queryParams: {user: JSON.stringify(details)}});
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular role.
   *
   */
  deleteRole(Id, deletePop) {
    this.popoverContent = deletePop;
    this.appSandbox.deleteRole({ groupId: Id });
  }

  // delete event , subscripe status
  regSubscribeEvents() {
    this.subscriptions.push(
      this.appSandbox.roleDelete$.subscribe(_delete => {
        if (_delete && _delete.status === 1) {
          this.getRolelist(this.offset, this.pageSize);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
