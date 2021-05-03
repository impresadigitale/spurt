import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsSandbox } from '../../../../core/blogs/blogs.sandbox';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  public blogId: number;
  public imagePath: string;

  constructor(public activeRoute: ActivatedRoute, public blogSandbox: BlogsSandbox,
              public router: Router) {
                this.activeRoute.params.subscribe(route => {
                  this.blogId = route['id'];
                  if (this.blogId) {
                    this.blogSandbox.getBlogDetail({id: this.blogId});
                  }
                });
  }

  ngOnInit() {
    this.imagePath = environment.imageUrl;
    this.getRelatedBloglist();
  }

  getRelatedBloglist() {
    const params: any = {};
    params.blogSlug	= this.blogId;
    this.blogSandbox.getRelatedBlogsList(params);
  }

  goTo(list) {
    this.router.navigate(['/blogs/blog-detail/' , list.blogSlug]);
  }
}
