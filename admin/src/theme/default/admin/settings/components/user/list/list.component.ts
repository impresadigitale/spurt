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
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserSandbox } from '../../../../../../../core/admin/settings/user/user.sandbox';
import { UserService } from '../../../../../../../core/admin/settings/user/user.service';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-settings-user-list',
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
export class UserListComponent implements OnInit, OnDestroy {

  public userdetails: any = {};
  public pageSize = '5';
  private keyword: any = '';
  public id: any = '';
  private offset: any;
  private page: any;
  private pagination = 1;
  private currentPage: any;
  private index: any;
  public addnewuser = false;
  private popoverContent: string;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    public sandbox: UserSandbox,
    public service: UserService,
    private toastr: ToastrManager
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.getUserList(this.offset, this.keyword);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }


  addNewUser() {
    this.router.navigate(['/settings/user/add']);
  }

  // USER LIST
  getUserList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.sandbox.getUserList(params);
    if (this.pagination) {
      params.count = 'true';
      this.sandbox.getUserPagination(params);
    }
  }

  // UPDATE USER
  editUser(userinfo) {
    const userDetail = JSON.parse(localStorage.getItem('adminUserdetail'))
      .userdetails;
    if (userDetail.userId === userinfo.userId) {
      this.toastr.errorToastr('You cannot edit current logged in user');
      return;
    }
    this.userdetails = userinfo;
    this.service.setdata(this.userdetails);
    this.router.navigate(['/settings/user/edit', this.userdetails.userId]);
  }

  /**calls getUserList for pagination
   *
   * @param event from material paginator
   * */
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getUserList(offset, this.pageSize);
  }

  // router navigation event to go to permssion page
  goToPermission(user) {
    const userDetail = JSON.parse(localStorage.getItem('adminUserdetail'))
    .userdetails;
    if (userDetail.userId === user.userId) {
      this.toastr.errorToastr('You cannot set permission for current logged in user');
      return;
    }
    const details = {id: user.userId, name: user.firstName + ' ' + user.lastName, type: 'user', role: user.usergroup.name};
    this.router.navigate(['/settings/permission'], { queryParams: {user: JSON.stringify(details)}});
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular country.
   *
   */
  deleteUser(userId, deletePop) {
    this.popoverContent = deletePop;
    this.sandbox.deleteUser({ id: userId });
  }

  // delete event , subscripe status
  regSubscribeEvents() {
    this.subscriptions.push(
      this.sandbox.userDelate$.subscribe(_delete => {
        if (_delete && _delete.status === 1) {
          this.getUserList(this.offset, '');
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
