import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  public orderProductId: any;
  public imageUrl = environment.imageUrl;

  constructor(public sandbox: AccountSandbox,
              public route: ActivatedRoute,
              public listSandbox: ListsSandbox) {
                this.route.params.subscribe(data => {
                  this.orderProductId = data.id;
                });
              }

  ngOnInit() {
    if (this.orderProductId) {
      this.sandbox.trackProductDetails({orderProductId: this.orderProductId});
    }
  }

}
