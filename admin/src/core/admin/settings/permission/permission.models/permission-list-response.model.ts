import { PermissionModuleModel } from './permission-module-response.model';

/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PermissionListResponseModel {
  public moduleGroupId: number;
  public name: string;
  public sortOrder: number;
  public slugName: string;
  public selected: boolean;
  public permissionModule: Array<PermissionModuleModel>;
  constructor(listResponse: any) {
    this.moduleGroupId = listResponse.moduleGroupId || 0;
    this.name = listResponse.name || '';
    this.sortOrder = listResponse.isActive || 0;
    this.slugName = listResponse.slugName || '';
    this.selected = false;
    this.permissionModule = listResponse.permissionModule || [];
}
}
