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
import { AdvSearchModule } from './adv-search/adv_search.module';
import { PolicyModule } from './policy/policy.module';
import { HelpModule } from './help/help.module';
import { ApiModule } from './api/api.module';
import { environment } from '../environments/environment';
import { RealModule } from '../app/real.module';
import {enableProdMode} from '@angular/core';
import {GoogleAnalyticsService} from "./shared/ga-service/google-analytics.service";
import {GoogleAnalyticsServiceMock} from "./shared/ga-service/google-analytics.service.mock";

/**
 * Initialize the configs for backend services
 */
const appInitializerFn = (appConfig: AppConfig) => {
  return () => {
    console.log("**** CAlling APP Initialization ***");
    return appConfig.loadAppConfig();
  };
};

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppMenuComponent,
    AppSubMenu,
    SearchTopBarComponent,
    InlineProfileComponent,
    TopBarComponent,
    AboutComponent
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
    AdvSearchModule,
    PolicyModule,
    environment.possiblyMockModule,
    SharedModule.forRoot()
  ],
  exports:[
    AutoCompleteModule
  ],
  providers: [
    HttpClientModule,
    GoogleAnalyticsService,
    GoogleAnalyticsServiceMock,
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
export class AppModule { 
  constructor(protected _googleAnalyticsService: GoogleAnalyticsService) { } // We inject the service here to keep it alive whole time
}
