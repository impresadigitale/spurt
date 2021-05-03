import {NgModule} from '@angular/core';
import {DefaultCommonModule} from '../../../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../default.material.module';
import {CommonModule} from '@angular/common';
import {ServicesCategoryAddComponent} from './add/add.component';
import {ServicesCategoriesListComponent} from './list/list.component';
import {ServicesCategoryFilterComponent} from './filter/filter.component';
import {ServicesCategoryRouting} from './serviceCategories.routing';
import {ServicesCategoriesSandbox} from '../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../../../admin.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';


@NgModule({
    declarations: [
        ServicesCategoryAddComponent,
        ServicesCategoriesListComponent,
        ServicesCategoryFilterComponent

    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        ServicesCategoryRouting,
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
    providers: [ServicesCategoriesSandbox],
    entryComponents: [],
})
export class ServicesCategoryModule {
}
