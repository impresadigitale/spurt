/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectorRef} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';

import {BlogService} from '../../../../../../../core/admin/cms/blogs/blogs.service';
import {CategoriesSandbox} from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import {LayoutsSandbox} from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import {BlogSandbox} from '../../../../../../../core/admin/cms/blogs/blog.sandbox';
import * as _ from 'lodash';


@Component({
    selector: 'app-cms-blog-add',
    templateUrl: 'add.component.html',
    styleUrls: ['./add.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogAddComponent implements OnInit {

    private closeResult: string;
    public blogInfo: any;
    public blogData: any;
    public ImageUrl: any = '';
    public blogForm: FormGroup;
    public blogTitle: FormControl;
    public categories: FormControl;
    public image: FormControl;
    public description: FormControl;
    public status: FormControl;
    public metaTitle: FormControl;
    public metaContent: FormControl;
    public metaKeyword: FormControl;
    public submitted = false;
    public postImageUrl: any;
    public editBlogId: any;
    private offset = 0;
    public pageSize = '10';
    private keyword = '';
    public searchText = '';
    public searchSelectedText = '';
    public index: number;
    private currentPage: number;
    private sortOrder: number;
    public id = '';
    public imageUrl: string;
    public selectedBlogArray: any = [];
    public selectedBlogIds: any = [];
    @ViewChild('filePath') filePath: ElementRef;
    public imageTypeError = false;
    public imageSizeError = false;


    constructor(private modalService: NgbModal,
                private modalService2: NgbModal,
                private router: Router,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private changeDetectRef: ChangeDetectorRef,
                private  configService: ConfigService,
                public sandbox: BlogSandbox,
                private service: BlogService, public categorySandbox: CategoriesSandbox, public layoutSandbox: LayoutsSandbox) {
    }

    ngOnInit() {
        this.imageUrl = this.configService.getImageUrl();
        this.postImageUrl = 'assets/upload-banner/upload.png';
        this.initForm();
        this.categoryList(0, this.keyword);
        this.editBlogId = this.route.snapshot.paramMap.get('id');
        if (this.editBlogId) {
            this.editBlogData();
        }
        this.blogList(0, '');
    }


    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    open2(content) {
        this.modalService.open(content, {windowClass: 'image-manager'}).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    /**
     * Handles form 'submit' event. Calls sandbox getBlogList . function if form is valid.
     *
     * @param event form event
     * @param form entire form value
     */
    blogList(offset: number = 0, keyword) {
        const params: any = {};
        params.offset = offset;
        params.limit = this.pageSize;
        params.keyword = this.keyword;
        params.sortOrder = this.sortOrder;
        this.sandbox.getBlogList(params);
    }

    selectedBlogs(blog) {
     this.selectedBlogArray.push(blog);
     this.sandbox.addRelatedBlog(blog);
    }

   removeSelectedBlog(data) {
    this.selectedBlogArray = this.selectedBlogArray.filter(blog => {
        if (blog.id === data.id) {
          return false;
        } else {
          return true;
        }
      });
      this.sandbox.removeRelatedBlog(data);
    }

    open(content) {
        this.modalService2.open(content, {windowClass: 'dark-modal,image-manager'});
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    blogCancel() {
        this.service.setBlogListData('');
        this.router.navigate(['/cms/blogs/list']);
    }

    /**
     * Handles  'categorylist' event. Calls sandbox categorylist function .
     *
     * @param pageSize form pagination
     *  @param offset form offset
     */
    categoryList(offset: number = 0, keyword) {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = this.offset;
        param.keyword = this.keyword;
        param.sortOrder = this.sortOrder;
        this.categorySandbox.categoryList(param);
        this.layoutSandbox.getCatalogCount();
    }

    initForm() {
        this.blogForm = this.fb.group({
            blogTitle: [null, Validators.compose([
                Validators.required,
                Validators.maxLength(255)
              ])],
            categories: ['', [Validators.required]],
            description: [null, Validators.compose([
                Validators.required,
              ])],
            image: [''],
            status: ['', [Validators.required]],
            metaTitle: ['',  Validators.compose([
                Validators.maxLength(60)
              ])],
            metaContent: ['',  Validators.compose([
                Validators.maxLength(160)
              ])],
            metaKeyword: ['',  Validators.compose([
                Validators.maxLength(255)
              ])],
              imageInput: ['', Validators.required]
        });
    }

    /**
     * Handles form 'submit' event. Calls sandbox Blog  function if form is valid.
     *
     * @param event form event
     * @param form entire form value
     */
    public onSubmit() {
        this.selectedBlogIds = [];
        this.submitted = true;
        this.selectedBlogArray.forEach(data => {
            if (data) {
            this.selectedBlogIds.push(data.id);
            }
        });
        if (!this.blogForm.valid) {
            this.validateAllFormFields(this.blogForm);
            return;
        } else {
            const params: any = {};
            params.blogTitle = this.blogForm.value.blogTitle;
            params.categories = this.blogForm.value.categories;
            params.description = this.blogForm.value.description;
            params.status = this.blogForm.value.status;
            params.metaTitle = this.blogForm.value.metaTitle;
            params.metaContent = this.blogForm.value.metaContent;
            params.metaKeyword = this.blogForm.value.metaKeyword;
            params.relatedBlogId = this.selectedBlogIds;
            params.image = this.ImageUrl;
            if (this.editBlogId) {
                params.blogId = this.editBlogId;
                this.sandbox.UpdateBlog(params);
            } else {
                this.sandbox.addBlog(params);
            }
        }
    }

    editBlogData() {
        const params: any = {};
        params.blogId = this.editBlogId;
        this.sandbox.getBlog(params);
        this.sandbox.blogDetails$.subscribe(data => {
            if (data && Object.keys(data).length) {
              this.setBlogData(data);
            }
        });
    }

    setBlogData(data) {
        this.blogForm.controls['blogTitle'].setValue(data.title);
                this.blogForm.controls['description'].setValue(data.description);
                this.blogForm.controls['categories'].setValue(data.categoryId);
                this.blogForm.controls['status'].setValue(data.isActive);
                this.blogForm.controls['metaTitle'].setValue(data.metaTagTitle);
                this.blogForm.controls['metaContent'].setValue(data.metaTagDescription);
                this.blogForm.controls['metaKeyword'].setValue(data.metaTagKeyword);
                this.selectedBlogArray = [];
                data.blogRelated.forEach(each => {
                  if (each) {
                    this.selectedBlogArray.push(each);
                    this.sandbox.addRelatedBlog(each);
                  }
                });
                this.blogForm.controls['imageInput'].setValue(data.image); // <-- Set Value for Validation

                this.postImageUrl = data.imagePath !== '' ? this.imageUrl + '?path=' + `${data.imagePath}` + '&name=' + `${data.image}` + '&width=160&height=150' : 'assets/upload-Blog/upload.png';
    }

    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    uploadChange($event): void {
        this.submitted = false;
        this.convertBase64($event.target);
    }

    convertBase64(inputValue: any) {
        this.imageTypeError = false;
        this.imageSizeError = false;
        if (inputValue.files && inputValue.files[0]) {
          const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!_.includes(allowed_types, inputValue.files[0].type)) {
          this.imageTypeError = true;
          this.ImageUrl = '';
          this.postImageUrl = './assets/upload-banner/upload.png';
          this.filePath.nativeElement.value = '';
          this.blogForm.controls['imageInput'].setValue('');
          return false;
        }
        const size = Math.round(inputValue.files[0].size / 1024);
        if (size > 2048) {
          this.imageSizeError = true;
          this.ImageUrl = '';
          this.postImageUrl = './assets/upload-banner/upload.png';
          this.filePath.nativeElement.value = '';
          this.blogForm.controls['imageInput'].setValue('');
           return;
        }
        this.imageTypeError = false;
        this.imageSizeError = false;
        const file: File = inputValue.files[0];
        this.blogForm.controls['imageInput'].setValue(file ? file.name : '');
        const myReader: FileReader = new FileReader();
        myReader.onloadend = e => {
          this.postImageUrl = myReader.result;
          this.ImageUrl = myReader.result;
          this.changeDetectRef.detectChanges();
        };
        myReader.readAsDataURL(file);
       }
      }

    //  validation controls  -  function (f) is using in Blog add html
    get f() {
        return this.blogForm.controls;
    }

    // show all validation at when invalid form
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
