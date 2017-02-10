import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-searchtopbar',
    template: `
    <div class="topbar clearfix" style="background-color: #000000">
      <div class="topbar-left" style="background-color: #000000">
          <a href="/" title="National Institute of Standards and Technology" class="header__logo-link" rel="home">
          <img class="Fleft" srcset="./assets/images/nist_logo_reverse.png" alt="National Institute of Standards and Technology" title="National Institute of Standards and Technology" >
            </a>         
      </div>
        <div class="textTopCenter" style="background-color: #000000">
          NIST Data Discovery
        </div>
         <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)" [ngClass]="{'menu-button-rotate': app.rotateMenuButton}">
                    <i></i>
                </a>
                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                </a>
         </div>
      </div>
    `
})

export class AppSearchTopBar {

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}

}
