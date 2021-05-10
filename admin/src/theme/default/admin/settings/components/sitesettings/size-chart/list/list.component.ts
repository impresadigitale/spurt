import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SizeChartSandbox } from 'src/core/admin/settings/siteSettings/sizechart/sizechart.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filterlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SizeChartListComponent implements OnInit {


  private subscriptions: Array<Subscription> = [];
  public pageSize = '5';
  private keyword: any = '';
  public id: any = '';
  private offset: any;
  private page: any;
  private pagination = 1;
  private currentPage: any;
  public count = 'true';
  private index: any;
  private popoverContent: string;


  constructor(private router: Router, public sandbox: SizeChartSandbox) { }

  ngOnInit() {
    this.getSizeChartList(this.offset);
  }

  addeNewChart() {
    this.router.navigate(['/settings/sitesettings/size-chart-template/add']);
  }

  getSizeChartList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    this.sandbox.getSizeChartlist(params);
    if (this.pagination) {
    }
  }

  editSizeChart(item) {
    this.router.navigate(['/settings/sitesettings/size-chart-template/edit', item.id]);
  }

  deleteFilter(chartId, deletePop) {
    this.popoverContent = deletePop;
    this.sandbox.deleteSizeChart({ id: chartId });
    this.subscriptions.push(this.sandbox.deleteChartLoaded$.subscribe(data => {
      if (data) {
        this.getSizeChartList();
        this.sandbox.clearHeaderText();
      }
    })
  );
  }
}
