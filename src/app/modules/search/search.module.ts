import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {DisqusModule} from 'ngx-disqus';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SearchComponent} from './components/search/search.component';
import {SearchTotalComponent} from './components/search-total/search-total.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {SearchPagerComponent} from './components/search-pager/search-pager.component';
import {SearchFacetComponent} from './components/search-facet/search-facet.component';
import {SearchQueryComponent} from './components/search-query/search-query.component';

@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        ControlsModule,
        PipesModule,
        DisqusModule.forRoot('omicsdi'),
        FormsModule,
        ClipboardModule,
        UtilsModule,
        NgxPaginationModule
    ],
    declarations: [
        SearchComponent,
        SearchTotalComponent,
        SearchResultComponent,
        SearchPagerComponent,
        SearchFacetComponent,
        SearchQueryComponent
    ],
    exports: [
        SearchQueryComponent
    ]
})
export class SearchModule {
}