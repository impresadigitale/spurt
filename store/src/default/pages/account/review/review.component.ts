import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {

  public orderProductId: any;
  public imageUrl = environment.imageUrl;
  public details: any;
  private subscription: Array<Subscription> = [];
  public currentRate = 0;
  public textError = false;
  public ratingError = false;
  public submitted = false;
  public review = '';
  public ratingArr = [];
  public starCount = 5;
  public rating = 0;
  public color = 'accent';



  constructor(public route: ActivatedRoute,
              public sandbox: AccountSandbox,
              public router: Router,
              public listSandbox: ListsSandbox) {
    this.route.params.subscribe(data => {
      this.orderProductId = data.id;
    });
   }

  ngOnInit() {
    if (this.orderProductId) {
      this.sandbox.myOrderDetails({orderProductId: this.orderProductId});
    }
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.subscribe();
  }

  subscribe() {
    this.subscription.push(this.sandbox.myOrderDetails$.subscribe(data => {
      if (data) {
        this.details = data;
        this.rating = data.rating;
        this.review = data.review;
      }
    }));
  }


  submit(text) {
    this.submitted = true;
    this.textError = false;
    this.ratingError = false;
    if (text && this.rating > 0) {
      const params: any = {};
      params.productId = this.details.productId;
      params.orderProductId = this.details.orderProductId;
      params.reviews = text;
      params.rating = this.rating;
      this.sandbox.addProductReview(params);
      this.subscribeSuccess();
    } else {
      if (!text) {
        this.textError = true;
      }
      if (this.rating === 0) {
        this.ratingError = true;

      }
    }
  }

  subscribeSuccess() {
    this.subscription.push(this.sandbox.addProductReview$.subscribe(data => {
      if (data && data.status === 1 ) {
        this.router.navigate(['/account/myorders']);
      }
    }));
  }


  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    return false;
  }

  ngOnDestroy() {
    this.subscription.forEach(each => each.unsubscribe());
  }

}
