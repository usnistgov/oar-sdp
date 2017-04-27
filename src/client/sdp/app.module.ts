import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeHeadbarComponent , HeadbarComponent, FootbarComponent } from './shared/index';


import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { FaqModule } from './faq/faq.module';
import { ApiModule } from './api/api.module';
import { PolicyModule } from './policy/policy.module';
import { HelpModule } from './help/help.module';
import { CodeRepoModule } from './code_repo/code_repo.module';
import { SearchModule } from './search/search.module';
import { AdvSearchModule } from './adv_search/adv_search.module';
import { AppMenuComponent,AppSubMenuComponent }  from './app.menu.component';
import { TopBarComponent }  from './app.topbar.component';
import { SearchTopBarComponent }  from './app.searchtopbar.component';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes ,{ useHash: true })
  , AboutModule, HomeModule, HelpModule, PolicyModule, FaqModule, ApiModule,CodeRepoModule, SearchModule, AdvSearchModule, SharedModule.forRoot()
  ],
  declarations: [AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    TopBarComponent,SearchTopBarComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]


})

export class AppModule { }
