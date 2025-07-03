import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SearchComponent } from "./search.component";
import { ReadMoreKeywordsComponent } from "./search.readmorekeywords";
import { ReadMoreDescriptionComponent } from "./search.readmoredescription";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { TaxonomyListService } from "../shared/taxonomy-list/index";
import { SearchfieldsListService } from "../shared/searchfields-list/index";
import { SearchQueryService } from "../shared/search-query/index";
import { DropdownModule } from "primeng/dropdown";
import { AccordionModule } from "primeng/accordion";
import { TreeModule } from "primeng/tree";
import { PanelMenuModule } from "primeng/panelmenu";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from "primeng/tooltip";
import { SearchPanelModule } from "../search-panel/search-panel.module";
import { FiltersComponent } from "./filters/filters.component";
import { ResultsComponent } from "./results/results.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { TagModule } from "primeng/tag";
import { DividerModule } from "primeng/divider";
import { ChipModule } from "primeng/chip";
import { PaginatorModule } from "primeng/paginator";
@NgModule({ declarations: [
        SearchComponent,
        ReadMoreDescriptionComponent,
        ReadMoreKeywordsComponent,
        FiltersComponent,
        ResultsComponent,
        PaginationComponent,
    ],
    exports: [SearchComponent, ReadMoreDescriptionComponent, ReadMoreKeywordsComponent], imports: [CommonModule,
        SharedModule,
        AccordionModule,
        AutoCompleteModule,
        MessagesModule,
        MessageModule,
        MultiSelectModule,
        DropdownModule,
        TreeModule,
        DialogModule,
        InputTextModule,
        PanelMenuModule,
        OverlayPanelModule,
        CheckboxModule,
        TooltipModule,
        ProgressSpinnerModule,
        InputTextareaModule,
        SearchPanelModule,
        TagModule,
        DividerModule,
        ChipModule,
        PaginatorModule], providers: [TaxonomyListService, SearchfieldsListService, SearchQueryService, provideHttpClient(withInterceptorsFromDi())] })
export class SearchModule {}
