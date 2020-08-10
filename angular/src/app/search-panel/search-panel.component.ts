import { Component, Inject, OnInit, Input, NgZone } from '@angular/core';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { timer } from 'rxjs/observable/timer';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      state('final', style({
        opacity: '1',
        overflow: 'hidden',
        height: '*'
      })),
      transition('initial=>final', animate('1000ms ease-out')),
      transition('final=>initial', animate('500ms ease-out'))
    ]),
  ]
})
export class SearchPanelComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: boolean;
  @Input() helpicon: boolean = false;
  @Input() advanceLink: boolean;
  @Input() jumbotronPadding: string = '1em';
  @Input() homePage: boolean = false;

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
  showExampleStatus: boolean = false;
  searchBottonWith: string = '10%';
  breadcrumb_top: string = '6em';
  placeHolderText: string[] = ['Kinetics database', 'Gallium', '"SRD 101"', 'XPDB', 'Interatomic Potentials'];
  inputStyle: any = {'width':'100%','padding-left':'40px','height': '42px','font-weight': '400',
                    'font-style': 'italic', 'border': '0px'};
  fields: SelectItem[];
  currentState = 'initial';

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
    private router: Router,
    private appConfig: AppConfig) {
      var ts = new Date();
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
    this.searchFieldsListService.getSearchFields().subscribe(
        (fields) => {
            this.fields = (fields as SelectItem[]);
        },
        (err) => {
            this.errorMessage = <any>err;
        }
    )

    this.searchService._watchQueryValue((queryObj) => {
        if (queryObj && queryObj.queryString && queryObj.queryString.trim() != '') {
            this.searchValue = queryObj.queryString;
            this.searchService.setQueryValue(null, null, null); // Reset
        }
    });

    this.searchService._watchRemoteStart((startQuery) => {
        if (startQuery) {
            this.search(this.searchValue, "", "");
            this.searchService.startSearching(false);   // Reset
        }
    });
    
    // Init search box size and breadcrumb position
    this.onWindowResize();
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
  }

  /**
   * For animation
   */
  changeState() {
      this.showExampleStatus = !this.showExampleStatus;
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
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
        'q': this.convertSearchvalue(searchValue), 'key': searchTaxonomyKey ? searchTaxonomyKey : '',
        'queryAdvSearch': queryAdvSearch
      }
    };
    this.router.navigate(['/search'], params);
  }

  /**
   * Convert the text from search text box into url parameter. For example,
   * convert "Research Topic=water" to "topic.tag%3Dwater"
   * convert "Research Topic=water OR Research Topic=fire" to "topic.tag%3Dwater&logicalOp%3DOR=&topic.tag%3Dfire"
   * @param searchvalue - search value typically from the search text box
   */
  convertSearchvalue(searchvalue: string): string{
      let searchString = '';
      if(!searchvalue) return searchString;

      searchString = searchvalue;
      searchString = searchString.replace(new RegExp('ALL FIELDS', 'g'), "searchphrase");

      for(let field of this.fields){
        searchString = searchString.replace(new RegExp(field.label, 'gi'), field.value.replace('.', '\.'));
      }

      searchString = searchString.replace(new RegExp(' OR ', 'g'), '&logicalOp=OR&');
      searchString = searchString.replace(new RegExp(' NOR ', 'g'), '&logicalOp=NOR&');
      searchString = searchString.replace(new RegExp(' AND ', 'g'), '&logicalOp=AND&');

      return searchString;
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
