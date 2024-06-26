import { Component, OnInit,Inject,forwardRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchQueryService } from '../../shared/search-query/search-query.service';
import * as _ from 'lodash-es';
import { AppConfig, Config } from '../../shared/config-service/config.service';
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
  queries: SDPQuery[] = [];

  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
              public app: AppComponent, 
              public searchQueryService: SearchQueryService,
              private appConfig: AppConfig,
              public router: Router)
  {
    this.searchQueryService.watchQueries().subscribe(value => {
      this.queries = value as SDPQuery[];
      this.queryLength = this.queries.length;
    });
  }

  ngOnInit() {
    this.queryLength = this.searchQueryService.getQueries().length;
    this.queries = this.searchQueryService.getQueries();

    this.appConfig.getConfig().subscribe(
        (conf) => {
            this.appVersion = conf.APPVERSION
        }
    );
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
