import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SettingSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-settings',
  templateUrl: 'vendor-setting-list.component.html',
  styleUrls: ['vendor-setting-list.component.scss']
})
export class VendorSettingsComponent implements OnInit, OnDestroy {


  public ImageUrl: any = '';
  public data: any;
  public value: any;
  public vendorId: any;
  public name: any;
  public activeOrderId: any;
  private subscriptions: Array<Subscription> = [];

  constructor(public settingSandbox: SettingSandbox,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
    ) {}

  ngOnInit() {
    this.ImageUrl = this.configService.getImageUrl();
    this.sellerList();
  }

  searchVendor(event: any) {
    const param: any = {};
    param.name = event.target.value;
    param.status = '';
    this.settingSandbox.settingList(param);
  }

  categoryList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.count = '';
    this.settingSandbox.categorylist(param);
  }

  sellerList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.name = '';
    param.email = '';
    param.status = '';
    param.count = '';
    this.settingSandbox.settingList(param);
    this.subscriptions.push(this.settingSandbox.getSettingList$.subscribe(data => {
      if (data) {
        if (data[0]) {
          this.goToDetail(data[0].vendorId);
        }
      }
    }));
  }

  goToDetail(id) {
    this.categoryList();
    this.activeOrderId = id;
    this.router.navigate(['/vendors/vendor/settings/detail/' + this.activeOrderId]);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
