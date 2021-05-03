import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public todayDate = new Date();
  public duration = 1;
  public orderDuration = 1;
  public userDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public currencyCode = this.userDetails.currencyCode;

  constructor(
    public dashboardSandbox: DashboardSandbox,
    public paymentSandbox: PaymentSandbox,
    public orderSandbox: OrderSandbox
  ) {}

  // chart options
  public pieChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 1
      }
    },
    legend: {
      position: 'left',
      onClick: function(e) {
        e.stopPropagation();
     },
      labels: {
        boxWidth: 16,
        fontSize: 18
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return null;
        }
      },
      labels: [
        {
          render: 'label',
          position: 'outside'
        },
        {
          render: 'value'
        }
      ]
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: []
    }
  ];

  ngOnInit() {
    this.getDashboardCount();
    this.getOrdersList();
    this.getRecentPaymentList();
    this.getTopSellingProducts();
    this.getOrders();
  }

  // get all dashboard counts
  getDashboardCount() {
    const params: any = {};
    this.dashboardSandbox.getDashboardCounts(params);
  }

  // get recent orders list
  getOrdersList() {
    const params: any = {};
    params.limit = 4;
    params.offset = 0;
    this.dashboardSandbox.getOrderList(params);
  }

  // get recent sales list
  getRecentPaymentList() {
    const params: any = {};
    params.limit = 4;
    params.offset = 0;
    this.paymentSandbox.getPaymentList(params);
  }

  // get top selling product list
  getTopSellingProducts() {
    const params: any = {};
    params.duration = this.duration;
    this.dashboardSandbox.getTopSellingProductsList(params);
  }

  // get chart event for orders
  getOrders() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    const params: any = {};
    params.duration = this.orderDuration;
    this.dashboardSandbox.getLanguageList(params);
    this.dashboardSandbox.getLanguageList$.subscribe(data => {
      this.pieChartData = [];
      this.pieChartLabels = [];
      if (data) {
        data.value.forEach(datas => {
          this.pieChartData.push(Number(datas.orderCount));
          this.pieChartLabels.push(datas.name);
          this.pieChartColors[0].backgroundColor.push(datas.colorCode);
        });
      }
    });
  }

  // get product duration event
  getDuration(val) {
    this.duration = Number(val);
    this.getTopSellingProducts();
  }

  // get chart duration event
  getChartDuration(val) {
    this.orderDuration = Number(val);
    this.getOrders();
  }
}
