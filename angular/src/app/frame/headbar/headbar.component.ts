import { Component, OnInit,Inject,forwardRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchQueryService } from '../../shared/search-query/search-query.service';
import * as _ from 'lodash';
import { AppConfig, Config } from '../../shared/config-service/config-service.service';
import { SDPQuery, QueryRow } from '../../shared/search-query/query';
import { SearchService, SEARCH_SERVICE } from '../../shared/search-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {
  queryLength : number;
  appVersion: string;
  confValues: Config;
  queries: SDPQuery[] = [];

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public app: AppComponent, 
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig,
    public router: Router) {

    this.searchQueryService.watchQueries().subscribe(value => {
      this.queries = value as SDPQuery[];
      this.queryLength = this.queries.length;
    });

    this.confValues = this.appConfig.getConfig();
    this.appVersion = this.confValues.APPVERSION;
  }

  ngOnInit() {
    this.queryLength = this.searchQueryService.getQueries().length;
    this.queries = this.searchQueryService.getQueries();
  }

  hideExamples(){
      this.searchQueryService.setShowExamples(false);
  }

  /**
   * Go to home page
   */
  goHome(){
    this.router.navigate(['']);
  }
}
