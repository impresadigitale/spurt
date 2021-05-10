import {Directive, ElementRef, OnInit, Input} from '@angular/core';
import { PermissionServices } from '../../../../../../theme/default/admin/shared/components/services/permission.services';

@Directive({
    selector: '[appHideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('appHideIfUnauthorized') permission: string; // Required permission passed in
    constructor(private el: ElementRef, private permissionServices: PermissionServices) {
    }

    ngOnInit() {
        if (!this.permissionServices.hasPermission(this.permission)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
