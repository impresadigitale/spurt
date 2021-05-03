import { Component,   OnInit} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SellerSandbox } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { DocumentSandbox } from '../../../../../../../../../core/admin/vendor/pages/documents/document.sandbox';

@Component({
  selector: 'app-ngbd-viewvendor-basic',
  templateUrl: 'viewvendor.component.html',
  styleUrls: ['viewvendor.component.scss']
})
export class ViewVendorComponent implements OnInit {


  public id: any;
  public details: any = {};
  public ImageUrl: any = '';

  constructor(    public router: Router,
    private route: ActivatedRoute,
    public sellerSandbox: SellerSandbox,
    private service: SellerService,
    private configService: ConfigService, public documentSandbox: DocumentSandbox
) {

}

ngOnInit(): void {
  this.ImageUrl = this.configService.getImageUrl();
  this.id = this.route.snapshot.params.id;
  this.pageDetails();
  this.sellerSandbox.pageDetails$.subscribe(data => {
        if (data) {
      this.details = data;
          }
  });
  if (this.id) {
     this.getVendorDocumentList();
  }
}

pageDetails() {
  const params: any = {};
  params.id = this.id;
  this.sellerSandbox.pageDetails(params);
}

beforeChange($event: NgbPanelChangeEvent) {
  if ($event.panelId === 'preventchange-2') {
    $event.preventDefault();
  }

  if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
    $event.preventDefault();
  }
}

gotoProduct(name: string) {
  this.router.navigate(['vendors/vendor/product'], { queryParams: {keyword: name}});
}

getVendorDocumentList() {
  const params: any = {};
  params.vendorId = this.id;
  params.limit = '';
  params.offset = '';
  params.keyword = '';
  params.count = '';
  this.documentSandbox.getDocumentList(params);
}

download(id) {
  this.documentSandbox.downloadDocument(id);
}

changeStatus(event, val) {
  const params: any = {};
  params.documentStatus = event.target.checked === true ? 1 : 0;
  params.id = val.customerDocumentId;
  this.documentSandbox.getDocumentStatusChange(params);
}
}
