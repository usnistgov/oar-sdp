import { Component,Inject,forwardRef } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchQueryService } from '../sdp/shared/search-query/search-query.service';
import { SearchEntity } from '../sdp/shared/search-query/search.entity';
import * as _ from 'lodash';



@Component({
    selector: 'app-searchtopbar',
    template: `
    <div class="topbar" style="background-color: #000000">
      <span class="topbar-left" style="background-color: #000000;">
          <a href="/" style="text-decoration: none" title="National Institute of Standards and Technology" class="header__logo-link" rel="home">
          <img class="Fleft top_bar" srcset="./assets/images/nist_logo_reverse.png" 
          alt="National Institute of Standards and Technology" title="National Institute of Standards and Technology" >
            <span class="Fleft" style="font-weight:bold;line-height: 16.5px;display: table-cell;vertical-align: text-top;color: #FFFFFF;font-size:14px;padding-left: 2%">SCIENCE <br> DATA PORTAL </span>
          </a>
      </span>
      <span class="badge" style="background-color:#982800;vertical-align: text-top;margin-top: 10px;">1.1.0-beta</span>
        <div class="topbar-right">
              <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
          <a style="float:right;padding-top:20px" href="javascript:;" (click)="op.toggle($event)" ><span class="textlinks" style="vertical-align:5px"><b>Queries </b></span>
            <span class="badge badge-notify" >{{queryLength}}</span></a>
         </div>
      </div>
    <p-overlayPanel #op [dismissable]="true" [showCloseIcon]="true">
      <ul class="line-separated" style="list-style-type: none;margin-right:20px">
      <li *ngFor="let entities of searchEntities| slice:0:5;let i = index">
        <div>
          <a href="/#/search?q={{entities.data.queryValue}}&key=&queryAdvSearch=" (click) = "op.hide($event)" target="_parent">{{entities.data.id}}</a>
        </div>
      </li>
      </ul>
      <div style="text-align:center">
        <a href="/#/advanced?"   class="btn btn-default" (click) = "op.hide($event)" style="background-color:green;color:white;zoom:75%" target="_parent">More</a>
      </div>
    </p-overlayPanel>
    `
})

export class SearchTopBarComponent {

  queryLength : number;
  searchEntities: SearchEntity[];

  constructor(public app: AppComponent, public searchQueryService: SearchQueryService) {

  this.searchQueryService.watchStorage().subscribe(value => {
    this.queryLength = value;
    this.getSearchQueryList();
  });

  }

  getSearchQueryList() {
    this.searchQueryService.getAllSearchEntities().then(function (result) {
    this.searchEntities = _.sortBy(result,[function(o) { return o.date; }]);
    this.searchEntities = _.reverse(this.searchEntities);
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
  }

  updateQueryStatus()
  {
    this.searchQueryService.updateQueryDisplayStatus(true);
    this.app.getSearchQueryList();
  }

}
