import {NgModule} from '@angular/core';
import {DefaultCommonModule} from '../../../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../default.material.module';
import {CommonModule} from '@angular/common';
import {ServicesListAddComponent} from './add/add.component';
import {ServicesListRouting} from './servicesList.routing';
import {ServicesListComponent} from './list/list.component';
import {ServicesListFilterComponent} from './filter/filter.component';
import {ServicesSandbox} from '../../../../../../core/admin/services/service/service.Sandbox';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';
import {MediaSandbox} from '../../../../../../core/admin/catalog/media/media.sandbox';
import { ComponentsModule } from '../../../shared/components';


@NgModule({
    declarations: [
        ServicesListAddComponent,
        ServicesListComponent,
        ServicesListFilterComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ComponentsModule,
        ReactiveFormsModule,
        MaterialModule,
        ServicesListRouting,
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
    ],
    providers: [ServicesSandbox, MediaSandbox],
    entryComponents: [],
})
export class ServicesListModule {
}
