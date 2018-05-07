import {NgModule,CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FootbarComponent } from './shared/index';


import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { FaqModule } from './faq/faq.module';
import { ApiModule } from './api/api.module';
import { PolicyModule } from './policy/policy.module';
import { HelpModule } from './help/help.module';
import { SearchModule } from './search/search.module';
import { AdvSearchModule } from './adv_search/adv_search.module';
import { AppMenuComponent,AppSubMenu }  from './app.menu.component';
import { TopBarComponent }  from './app.topbar.component';
import { SearchTopBarComponent }  from './app.searchtopbar.component';
import {DataTableModule,OverlayPanelModule,DataListModule} from "primeng/primeng";



@NgModule({
  imports: [BrowserModule, HttpModule, DataTableModule, BrowserAnimationsModule, RouterModule.forRoot(routes ,{ useHash: true })
  , AboutModule, HomeModule, HelpModule, PolicyModule, FaqModule, ApiModule, SearchModule, AdvSearchModule, OverlayPanelModule, DataListModule, SharedModule.forRoot()
  ],
  declarations: [AppComponent,
    AppMenuComponent,
    AppSubMenu,
    TopBarComponent,SearchTopBarComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
