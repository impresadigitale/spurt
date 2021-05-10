import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterSandbox } from '../../../../../../../../core/admin/settings/siteSettings/filter/filter.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filterlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class FilterListComponent implements OnInit {


  public pageSize = '10';
  private keyword: any = '';
  public id: any = '';
  private offset: any;
  private page: any;
  private pagination = 1;
  private currentPage: any;
  public count = 'true';
  public pageSizeOptions = [10, 20];
  public index: any;
  private popoverContent: string;
  private subscriptions: Array<Subscription> = [];


  constructor(private router: Router, public sandbox: FilterSandbox) { }

  ngOnInit() {
    this.getFilterList(this.offset, this.pageSize);
    this.getFilterListCount();
  }
  addeNewFilter() {
    this.router.navigate(['/settings/sitesettings/filter/add']);
  }

  getFilterList(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    this.sandbox.getFilterList(params);
  }

  getFilterListCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = this.count;
    this.sandbox.getFilterPagination(params);
  }

  editFilter(filterList) {
    this.router.navigate(['/settings/sitesettings/filter/edit', filterList.id]);
  }

  deleteFilter(filterId, deletePop) {
    this.popoverContent = deletePop;
    this.sandbox.deleteFilter({ id: filterId });
    this.subscriptions.push(this.sandbox.filterDelete$.subscribe((response: any) => {
      if (response) {
        this.getFilterList(this.offset, this.pageSize);
      }
    }));
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSizeOptions = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getFilterList(offset, this.pageSizeOptions);
  }
}
