/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ConfigService } from '../../../../../../core/admin/service/config.service';
import { EditprofileComponent } from '../../../layout/editprofile/editprofile.component';
import { EditprofileService } from '../../../../../../core/admin/profile/editprofile/editprofile.service';
import { LayoutSandbox } from '../../../../../../core/admin/layout/layout.sandbox';
import { environment } from '../../../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile.bar.component.html'
})
export class ProfileBarComponent implements OnInit {
  // event emitter
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  message: string;
  @ViewChild(EditprofileComponent) child;

  // variable
  public imageUrls: any;

  constructor(
    public configService: ConfigService,
    public layoutSandbox: LayoutSandbox,
    public editProfileService: EditprofileService
  ) {
  }

  ngOnInit(): void {
    this.imageUrls = this.configService.getImageUrl();
  }
  openPlugin() {
    window.open(environment.pluginUrl);
  }
}
