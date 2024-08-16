import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { HelpRoutes } from "./help.routes";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SearchSyntaxComponent } from "./search-syntax/search-syntax.component";
import { HelpPageNotFoundComponent } from "./not-found/not-found.component";
import { HowAdvancedSearchComponent } from "./how-advanced-search/how-advanced-search.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HelpRoutes)
  ],
  declarations: [
    HelpComponent,
    HowAdvancedSearchComponent,
    ContactUsComponent,
    SearchSyntaxComponent,
    HelpPageNotFoundComponent
  ],
  exports: [
    HelpComponent,
    RouterModule
  ]
})

export class HelpModule {


}
