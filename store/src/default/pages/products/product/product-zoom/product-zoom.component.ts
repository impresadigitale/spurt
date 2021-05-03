/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-product-zoom',
    templateUrl: './product-zoom.component.html',
    styleUrls: ['./product-zoom.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductZoomComponent implements OnInit {

    @ViewChild('zoomImage') zoomImage;
    public count = 10;
    public maxWidth = 60;
    public data: any;

    constructor(public dialogRef: MatDialogRef<ProductZoomComponent>,
        public _DomSanitizationService: DomSanitizer,
                @Inject(MAT_DIALOG_DATA)
                public image: any) {
    }

    ngOnInit() {
    }

    public close(): void {
        this.dialogRef.close();
    }

    public zoomIn() {
        if (this.count < 60) {
            this.maxWidth = this.maxWidth + this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
            this.count = this.count + 10;
        }
    }

    public zoomOut() {
        if (this.count > 10) {
            this.count = this.count - 10;
            this.maxWidth = this.maxWidth - this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
        }
    }

}
