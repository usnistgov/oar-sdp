import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AppMenuComponent,AppSubMenu }  from './app.menu.component';
import { InlineProfileComponent } from './app.profile.component';
import { HttpClientModule } from '@angular/common/http'; 
import { routes } from './app.routes';
import { Routes, RouterModule } from '@angular/router';
import { SearchTopBarComponent }  from './app.searchtopbar.component';
import { DataTableModule,OverlayPanelModule,DataListModule} from "primeng/primeng";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { CanDeactivateGuard} from './can-deactivate/can-deactivate.guard';
import { SearchModule } from './search/search.module';
import { TopBarComponent }  from './app.topbar.component';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { AppConfig } from './shared/config-service/config-service.service';
import { AutoCompleteModule } from 'primeng/primeng';
import { AboutComponent } from './about/about.component';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { PolicyComponent } from './policy/policy.component';
import { HelpModule } from './help/help.module';
import { ApiModule } from './api/api.module';

/**
 * Initialize the configs for backend services
 */
const appInitializerFn = (appConfig: AppConfig) => {
  return () => {
    console.log("**** CAlling APP Initialization ***");
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppMenuComponent,
    AppSubMenu,
    SearchTopBarComponent,
    InlineProfileComponent,
    TopBarComponent,
    AboutComponent,
    AdvSearchComponent,
    PolicyComponent
  ],
  imports: [
    RouterModule.forRoot(routes ,{ useHash: true }),
    BrowserModule,
    HttpClientModule,
    OverlayPanelModule, 
    DataListModule, 
    DataTableModule, 
    SearchModule, 
    BrowserAnimationsModule, 
    TooltipModule,
    AutoCompleteModule,
    HelpModule,
    ApiModule,
    SharedModule.forRoot()
  ],
  exports:[
    AutoCompleteModule
  ],
  providers: [
    HttpClientModule,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfig]
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }