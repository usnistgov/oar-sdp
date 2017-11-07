import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HeadbarComponent, FootbarComponent } from './shared/index';

import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { LandingModule} from './landing/landing.module';



@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes ,{ useHash: true })
  , AboutModule, LandingModule, SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class AppModule { }
