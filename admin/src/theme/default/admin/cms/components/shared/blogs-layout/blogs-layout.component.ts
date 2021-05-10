/*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {
    Component, OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import {  BlogSandbox } from '../../../../../../../core/admin/cms/blogs/blog.sandbox';

@Component({
    selector: 'app-blogs-layout',
    templateUrl: './blogs-layout.component.html',
    styleUrls: ['./blogs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsLayoutComponent implements OnInit {

constructor(public blogsSandbox: BlogSandbox) {}

ngOnInit() {
    this.getPagesListHeaderCount();
}
getPagesListHeaderCount () {
        this.blogsSandbox.getBlogCount({count: 1});
        this.blogsSandbox.getBlogCounts();
 }
}
