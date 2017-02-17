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
import { CodeRepoModule } from './code_repo/code_repo.module';
import { SearchModule } from './search/search.module';
import { AppMenuComponent,AppSubMenu }  from './app.menu.component';
import { TopBarComponent }  from './app.topbar.component';
import { SearchTopBarComponent }  from './app.searchtopbar.component';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes ,{ useHash: true })
  , AboutModule, HomeModule, FaqModule, ApiModule,CodeRepoModule, SearchModule, SharedModule.forRoot()
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
