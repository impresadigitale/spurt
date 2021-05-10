import { Component, OnInit } from '@angular/core';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.scss']
})
export class ServiceCategoryComponent implements OnInit {

  public imageUrl = environment.imageUrl;

  constructor(public listSandbox: ListsSandbox) {}

  ngOnInit() {
    this.listSandbox.getServiceCategory({});
  }
}
