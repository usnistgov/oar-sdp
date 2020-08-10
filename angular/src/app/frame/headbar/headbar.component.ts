import { Component, OnInit,Inject,forwardRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchQueryService } from '../../shared/search-query/search-query.service';
import { SearchEntity } from '../../shared/search-query/search.entity';
import * as _ from 'lodash';
import { AppConfig, Config } from '../../shared/config-service/config-service.service';
import { Query, QueryRow } from '../../shared/search-query/query';
import { SearchService, SEARCH_SERVICE } from '../../shared/search-service';

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
  queries: Query[] = [];

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public app: AppComponent, 
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig) {

    this.searchQueryService.watchStorage().subscribe(value => {
      this.queries = this.searchQueryService.getQueries();
      this.queryLength = this.queries.length;
    });

    this.confValues = this.appConfig.getConfig();
    this.appVersion = this.confValues.APPVERSION;
  }

  ngOnInit() {
  }

  executeQuery(query: Query){
    let lQueryValue = this.searchQueryService.buildSearchString(query);
    this.searchService.setQueryValue(lQueryValue, '', '');
    this.searchService.startSearching(true);

  }
}
