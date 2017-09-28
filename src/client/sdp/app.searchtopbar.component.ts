import { Component,Inject,forwardRef } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-searchtopbar',
    template: `
    <div class="topbar" style="background-color: #000000">
      <span class="topbar-left" style="background-color: #000000;">
          <a href="/" title="National Institute of Standards and Technology" class="header__logo-link" rel="home">
          <img class="Fleft" srcset="./assets/images/nist_logo_reverse.png" 
          alt="National Institute of Standards and Technology" title="National Institute of Standards and Technology" >
            </a> 
        <span style="color: #FFFFFF;font-size: large;padding-left: 2%">Science <br> &nbsp;Data Portal </span>
      </span>
      <span class="badge" style="background-color:#982800;vertical-align: text-top;margin-top: 20px;">1.0.0-beta</span>
        <div class="topbar-right">
              <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
         </div>
      </div>
    `
})

export class SearchTopBarComponent {

  constructor(public app: AppComponent) {}

}
