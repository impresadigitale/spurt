/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, DoCheck} from '@angular/core';
import {ListsSandbox} from '../../../../core/lists/lists.sandbox';
import {Subscription} from 'rxjs';
import {CommonService} from '../../../../core/common/common.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})


export class CategoryListComponent implements OnChanges, OnInit, OnDestroy, DoCheck {

    // decorator
    @Input() categories;
    @Input() categoryId;
    @Input() changeCategories;
    @Input() isClicked = [];
    @Output() change: EventEmitter<any> = new EventEmitter();

    public mainCategories;
    public subCategory = [];
    public activecategory: any;
    public currentCategory: any;
    private subscriptions: Array<Subscription> = [];
    public categorySlug: any;
    @Input() categoryParentId;


    constructor(public listSandBox: ListsSandbox, private commonService: CommonService,
                public route: ActivatedRoute,
                public router: Router) {
        this.subscribe();
    }

    ngOnChanges() {
        this.currentCategory = this.categoryId;
        this.isClicked = [];
        this.isClicked[this.categoryId] = true;
        this.listSandBox.getActiveCategory(this.currentCategory);
    }

    // initially calls subscribe method
    ngOnInit() {
        this.route.params.subscribe(data => {
            if (data) {
                this.categorySlug = data.id;
            }
        });
        this.subCategory = this.categories;
    }

    ngDoCheck() {
        if (this.categories && !this.mainCategories) {
            this.subCategory = this.categories;
            this.mainCategories = this.categories.filter(category => category.parentId === this.categoryParentId);
        }
    }


    // emit the category id
    public changeCategory(id, activeId, slug) {
        this.router.navigate(['/products/' + slug]);
        this.isClicked = [];
        const params: any = {};
        params.id = id;
        params.slug = slug;
        if (id ===  +this.currentCategory) {
            this.activecategory = '';
            this.listSandBox.removeActiveCategory();
            this.change.emit('');

        } else {
            this.isClicked[id] = true;
            this.currentCategory = id;
            this.activecategory = activeId;
            this.change.emit(params);
        }
    }

    subscribe() {
        this.subscriptions.push(this.listSandBox.subCategoryList$.subscribe(data => {
            if (data && data.length > 0) {
                this.subCategory = data;
                if (this.subCategory.length > 0) {
                    this.subCategory.forEach(item => {
                        if (item.children && item.children.length > 0) {
                            item.children .forEach(list => {
                                if (list.categorySlug === this.categorySlug) {
                                    this.activecategory = item.categoryId;
                                }
                            });
                        }
                    });
                }
            } else {
                this.subCategory = this.categories;
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }
}

