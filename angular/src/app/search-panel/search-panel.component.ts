import { Component, Inject, OnInit, Input, NgZone } from '@angular/core';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: boolean;
  @Input() helpicon: boolean = false;
  @Input() advanceLink: boolean;
  @Input() jumbotronPadding: string = '1em';

  confValues: Config;
  errorMessage: string;
  _searchValue: string = '';
  taxonomies: SelectItem[];
  suggestedTaxonomies: string[];
  suggestedTaxonomyList: string[];
  searchTaxonomyKey: string;
  queryAdvSearch: string = '';
  operators: SelectItem[];
  SDPAPI: any;
  imageURL: string;
  mobHeight: number;
  mobWidth: number;
  placeholder: string;
  display: boolean = false;
  textRotate: boolean = true;
  searchBottonWith: string = '10%';
  breadcrumb_top: string = '6em';
  placeHolderText: string[] = ['Kinetics database', 'Gallium', '"SRD 101"', 'XPDB', 'Interatomic Potentials'];
  inputStyle: any = {'width': '100%','padding-left':'40px','height': '42px','font-weight': '400',
                    'font-style': 'italic', 'border': '0px'};

  get searchValue() : string { return this._searchValue};
                    
  set searchValue(searchValue: string){
    this._searchValue = searchValue;
  } 

  /**
   * Create an instance of services for Home
   */
  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
    public taxonomyListService: TaxonomyListService, 
    public searchFieldsListService: SearchfieldsListService, 
    ngZone: NgZone,
    // public searchService: SearchService, 
    private router: Router,
    private appConfig: AppConfig) {
      var ts = new Date();
      console.log("Home constructor starts", ts.toLocaleString());
    this.taxonomies = [];
    this.suggestedTaxonomies = [];
    this.confValues = this.appConfig.getConfig();

    this.mobHeight = (window.innerHeight);
    this.mobWidth = (window.innerWidth);

    window.onresize = (e) => {
      ngZone.run(() => {
        this.mobWidth = window.innerWidth;
        this.mobHeight = window.innerHeight;
        this.onWindowResize();
      });
    };
  }

  /**
   *
   */
  ngOnInit() {
    // Init search box size and breadcrumb position
    this.onWindowResize();
    console.log("Window width: ", window.screen.width);
    var i = 0;
    const source = timer(1000, 2000);
    source.subscribe(val => {
      if (i < this.placeHolderText.length) {
        i++;
        this.placeholder = this.placeHolderText[i];
      } else {
        this.placeholder = this.placeHolderText[0];
        i = 0;
      }
    });

    this.SDPAPI = this.confValues.SDPAPI;
    this.imageURL = this.confValues.SDPAPI + 'assets/images/sdp-background.jpg';
    this.getTaxonomies();
    this.getTaxonomySuggestions();
    this.searchOperators();

    console.log("helpicon", this.helpicon);
  }


  /**
   * When window resized, we need to resize the search text box and reposition breadcrumb accordingly
   * When top menu bar collapse, we want to place breadcrumb inside the top menu bar
   */
  onWindowResize(){
    if(this.mobWidth > 461){
      this.searchBottonWith = "10%";
    }else{
      this.searchBottonWith = "100%";
    }

    if(this.mobWidth > 750){
      this.breadcrumb_top = '6em';
    }else{
      this.breadcrumb_top = '3.5em';
    }
  }

  /**
   *  Clear the search text box
   */
  clearText() {
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this._searchValue.trim())) {
      field.value = ' ';
    }
  }

  addPlaceholder() {
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this._searchValue)) {
      field.value = '';
    }
  }

  /**
   * Handle the nameListService observable
   */

  getTaxonomies() {
    this.taxonomyListService.get()
      .subscribe(
        taxonomies => this.taxonomies = this.toTaxonomiesItems(taxonomies),
        error => this.errorMessage = <any>error
      );
  }

  getTaxonomySuggestions() {
    this.taxonomyListService.get()
      .subscribe(
        taxonomies => this.suggestedTaxonomies = this.toTaxonomySuggestedItems(taxonomies),
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Taxonomy items list
   */
  toTaxonomySuggestedItems(taxonomies: any[]) {
    let items: string[] = [];
    for (let taxonomy of taxonomies) {
      items.push(taxonomy.label);
    }
    return items;
  }

  /**
   * Taxonomy items list
   */
  toTaxonomiesItems(taxonomies: any[]) {
    let items: SelectItem[] = [];
    items.push({ label: 'ALL RESEARCH', value: '' });
    for (let taxonomy of taxonomies) {
      items.push({ label: taxonomy.label, value: taxonomy.label });
    }
    return items;
  }


  /**
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event: any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for (let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if (keyw.toLowerCase().indexOf(suggTaxonomy.trim().toLowerCase()) >= 0) {
        this.suggestedTaxonomyList.push(keyw);
      }
    }

    console.log('suggestedTaxonomyList', this.suggestedTaxonomyList);
  }

  /**
   * Define Search operators for the drop down
   */
  searchOperators() {
    this.operators = [];
    this.operators.push({ label: 'AND', value: 'AND' });
    this.operators.push({ label: 'OR', value: 'OR' });
    this.operators.push({ label: 'NOT', value: 'NOT' });
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string) {
    this.searchTaxonomyKey = searchTaxonomyKey;
    let params: NavigationExtras = {
      queryParams: {
        'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey : '',
        'queryAdvSearch': this.queryAdvSearch
      }
    };
    this.router.navigate(['/search'], params);
  }

  /**
   *  Pass Search example popup value to home screen
   */
  searchExample(popupValue: string) {
    this.display = false;
    this._searchValue = popupValue;
    this.textRotate = !this.textRotate;
  }
}
