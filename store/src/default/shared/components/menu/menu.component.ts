/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, Input, OnInit, ViewChild, PLATFORM_ID,
    Inject,
    Renderer2,
    OnDestroy
  } from '@angular/core';
  import { isPlatformBrowser } from '@angular/common';
import {ListsSandbox} from '../../../../core/lists/lists.sandbox';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import {AppSettings, Settings} from '../../../app.settings';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit, OnDestroy {


    @Input() categories: any;
    @Input() categoriesExpanded: any;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    private brand: number;
    public clearBrand: string;
    public index: number;
    public hover: any;
    public categoryId: string;
    public categorylinkActive: string;
    public settings: Settings;
    public enteredButton = false;
    public isMatMenuOpen = false;
    public isMatMenu2Open = false;
    public prevButtonTrigger;
    public recheckIfInMenu: boolean;
    public activeSlug: any;
    public activeSubSlug: any;

    constructor(public listSandbox: ListsSandbox,
                public appSettings: AppSettings, private ren: Renderer2,
                @Inject(PLATFORM_ID) private platformId: Object,
                private titleService: Title,
                public router: Router) {

        this.settings = this.appSettings.settings;
        if (isPlatformBrowser(this.platformId)) {
        const setTheme = localStorage.getItem('optionsTheme');
        this.settings.theme = setTheme;
        }
    }

    ngOnInit() {
        this.recheckIfInMenu = false;
    }

    openMegaMenu() {
        const pane = document.getElementsByClassName('cdk-overlay-pane');
        [].forEach.call(pane, function (el) {
            if (el.children.length > 0) {
                if (el.children[0].classList.contains('mega-menu')) {
                    el.classList.add('mega-menu-pane');
                }
            }
        });
    }

    over() {
        this.trigger.closeMenu();
    }

    /** index for selecting categories.
     * @param index from event
     * @param categoryId from event
     * **/
    indexData(index, id) {
        if (this.categories && this.categories[index] && this.categories[index].children && this.categories[index].children.length > 0) {
            this.index = index;
            this.categoryId = id;
            this.trigger.openMenu();
            this.openMegaMenu();
        } else {
            this.trigger.closeMenu();
            return;
        }
    }

    // Make category link active if category got selected
    linkActive(mainCategory, slug) {

        this.activeSubSlug = slug;
        this.activeSlug = mainCategory.categorySlug;
        this.categorylinkActive = this.categoryId;
        this.titleService.setTitle(mainCategory.name);
    }

    /**
     * calls listSandbox productFilterData and send the value
     * @param productFilter set default value getting from template file
     */
    sendUniqueId(productFilter) {
        this.listSandbox.productFilterData.next(productFilter);
    }

     // getcategoryId value
     getCategory(id) {
        const params: any = {};
        params.categoryId = id;
        this.listSandbox.getCategory(params);
    }

    // getChildCategory value
    getChildCategory(id) {
        const params: any = {};
        params.categoryId = id;
        this.listSandbox.getCategory(params);
    }

    setTitle(title) {
        if (title === 'All Products') {
            this.titleService.setTitle('All Products');
            this.activeSlug = 'All';
        } else if (title === 'Blogs') {
            this.titleService.setTitle(title);
            this.activeSlug = 'Blogs';
        } else if (title === 'Contacts') {
            this.titleService.setTitle(title);
            this.activeSlug = 'Contacts';
        } else if (title === 'Home') {
            this.titleService.setTitle(title);
            this.activeSlug = 'Home';
        } else if (title === 'Service') {
            this.activeSlug = 'Service';
        } else if (title === 'ChiSiamo') {
            this.activeSlug = 'Chiiamo';
        }
    }

    setMainTitle(index, category) {
        this.activeSlug = category.categorySlug;
        this.openMegaMenu();
        if (this.categories && this.categories[index] && this.categories[index].children && this.categories[index].children.length > 0) {
            this.index = index;
            this.categoryId = category.categoryId;
            this.trigger.openMenu();
        } else {
            this.trigger.closeMenu();
            return;
        }
    }

    openResourceMenu(index, id) {
        if (this.categories && this.categories[index] && this.categories[index].children && this.categories[index].children.length > 0) {
            this.index = index;
            this.categoryId = id;
            this.trigger.openMenu();
            this.openMegaMenu();
        } else {
            this.trigger.closeMenu();
            this.openMegaMenu();
            return;
        }
      }

      closeResourceMenu() {
        setTimeout(() => {
          if (this.recheckIfInMenu === false) {
            this.trigger.closeMenu();
          }
        }, 175);
      }

      ngOnDestroy() {
          this.activeSlug = '';
          this.activeSlug.activeSubSlug = '';
      }
}
