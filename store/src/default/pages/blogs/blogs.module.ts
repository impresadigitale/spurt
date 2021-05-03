import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { BlogsEffects } from '../../../core/blogs/effects/blogs.effects';
import { BlogsSandbox } from '../../../core/blogs/blogs.sandbox';
import { BlogsService } from '../../../core/blogs/blogs.service';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { SpurtSocialShareModule } from '../../shared/social-share/spurt-social-share.module';
import { TranslateModule } from '@ngx-translate/core';


export const routes = [
      {
        path: '',
        component: BlogListComponent,
        data: {
          urls: [
            { title: 'Blogs' },
          ]
        }
      },
      {
        path: 'blog-detail/:id',
        component: BlogDetailComponent,
        data: {
          urls: [
            { title: 'Blogs', url: '/blogs' },
            { title: 'Blog detail' }
          ]
        }
      }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EffectsModule.forFeature([BlogsEffects]),
    SharedModule,
    JwSocialButtonsModule,
    SpurtSocialShareModule,
    TranslateModule
  ],
  declarations: [
    BlogDetailComponent,
    BlogListComponent
  ],
  providers: [
    BlogsSandbox,
    BlogsService
  ],
  entryComponents: []
})
export class BlogsModule {}
