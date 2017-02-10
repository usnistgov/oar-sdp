import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-topbar',
    template: `
    <div class="topbar clearfix header__inner header__logo divHeight30" style="background-color: #ffffff;">
      <div class="topbar-left" style="background-color: #ffffff;">
        <a href="/" title="National Institute of Standards and Technology" class="header__logo-link" rel="home">
          <img srcset="./assets/images/nist-logo-2x.png" alt="National Institute of Standards and Technology"
               title="National Institute of Standards and Technology" >
        </a>
      </div>

         <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)" >
                    <i></i>
                </a>
                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                </a>
         </div>
      </div>
    `
})

export class AppTopBar {

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}

}
