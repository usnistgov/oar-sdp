import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http'; 
import { routes } from './app.routes';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'primeng/tree';
// import { OverlayPanelModule } from "primeng";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { CanDeactivateGuard} from './can-deactivate/can-deactivate.guard';
import { SearchModule } from './search/search.module';
import { TopBarComponent }  from './app.topbar.component';
import { TooltipModule } from 'primeng/tooltip';
import { AppConfig } from './shared/config-service/config-service.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { HeadbarComponent } from './frame/headbar/headbar.component';
import { SearchPanelModule } from './search-panel/search-panel.module';
import { NotificationService } from './shared/notification-service/notification.service';
import { ToastrModule } from 'ngx-toastr';

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
    TopBarComponent,
    AboutComponent,
    TopMenuBarComponent,
    HeadbarComponent
  ],
  imports: [
    RouterModule.forRoot(routes ,{ useHash: true }),
    BrowserModule,
    HttpClientModule,
    TreeModule,
    // OverlayPanelModule, 
    // DataListModule, 
    // DataTableModule, 
    SearchModule, 
    BrowserAnimationsModule, 
    TooltipModule,
    AutoCompleteModule,
    HelpModule,
    ApiModule,
    AdvSearchModule,
    PolicyModule,
    environment.possiblyMockModule,
    NgbModule,
    SearchPanelModule,
    HomeModule,
    ToastrModule.forRoot({
        toastClass: 'toast toast-bootstrap-compatibility-fix'
    }),
    SharedModule.forRoot()
  ],
  exports:[
    AutoCompleteModule
  ],
  providers: [
    HttpClientModule,
    GoogleAnalyticsService,
    GoogleAnalyticsServiceMock,
    NotificationService,
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
