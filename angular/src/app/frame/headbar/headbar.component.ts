import { Component, OnInit,Inject,forwardRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchQueryService } from '../../shared/search-query/search-query.service';
import { SearchEntity } from '../../shared/search-query/search.entity';
import * as _ from 'lodash';
import { AppConfig, Config } from '../../shared/config-service/config-service.service';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {
  queryLength : number;
  searchEntities: SearchEntity[];
  appVersion: string;
  confValues: Config;

  constructor(
    public app: AppComponent, 
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig) {

    this.searchQueryService.watchStorage().subscribe(value => {
      this.queryLength = value;
      this.getSearchQueryList();
    });

    this.confValues = this.appConfig.getConfig();
    this.appVersion = this.confValues.APPVERSION;
  }

  ngOnInit() {
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
