import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef,  ViewChildren } from '@angular/core';
import { SearchService, TaxonomyListService, SearchFieldsListService } from '../shared/index';

import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
import * as _ from 'lodash';



declare var Ultima: any;
declare var jQuery: any;



/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component ({
    moduleId: module.id,
    selector: 'sdp-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    providers:[TaxonomyListService, SearchService, SearchFieldsListService]
})



export class SearchPanelComponent implements OnInit, OnDestroy {


  layoutCompact: boolean = true;

  layoutMode: string = 'horizontal';

   darkMenu: boolean = false;
   selectedThemesNode: TreeNode[];
   selectedComponentsNode: TreeNode[];
   profileMode: string = 'inline';
    msgs: Message[] = [];
    exception : string;
    errorMsg: string;
    status: string;
    errorMessage: string;
    queryAdvSearch:string;
    searchResults: any[] = [];
    errorMessageArray: string[];
    themesTree:any[];
    componentsTree:any[];
    searchValue:string;
    taxonomies: SelectItem[];
    fields: SelectItem[];
    searchTaxonomyKey: string;
    cols: any[];
    rows: number = 5;
    columnOptions: SelectItem[];
    searching:boolean = false;
    keywords: string[];
    themes:SelectItem[] = [];
    components:SelectItem[] = [];
    authors:string[] = [];
    filteredResults:any[] = [];
    keyword:string;
    Keywords:string[] = [];
    selectedKeywords:string[] = [];
    selectedThemes:string[] = [];
    selectedComponents:string[] = [];
    selectedAuthor:string;
    suggestedKeywords:string[] = [];
    suggestedThemes:string[] = [];
    suggestedAuthors:string[] = [];
    ALL:string='All';
    filteredKeywords:string[] = [];
    filteredThemes:string[] = [];
    filteredAuthors:string[] = [];
    summaryPageOpen : boolean = false;
    summaryCandidate: any[];
    selectedAuthorDropdown: boolean = false;
    items: MenuItem[];
    private _routeParamsSubscription: Subscription;


  /**
   * Creates an instance of the SearchPanel
   *
   */
    constructor(private route: ActivatedRoute, private el: ElementRef, public taxonomyListService:
      TaxonomyListService, public searchService:SearchService, public searchFieldsListService: SearchFieldsListService) {
    }

   /**
     * Handle the nameListService observable
     */
    getTaxonomies() {
        this.taxonomyListService.get()
            .subscribe(
            taxonomies => this.taxonomies = this.toTaxonomiesItems(taxonomies),
            error =>  this.errorMessage = <any>error
        );
    }

  /**
   * Populate taxonomy items
   */
  toTaxonomiesItems(taxonomies:any[]) {
        let items :SelectItem[] = [];
        items.push({label:this.ALL, value:''});
        for (let taxonomy of taxonomies) {
            items.push({label:taxonomy.label, value:taxonomy.label});
        }
        return items;
    }

  /**
   * Populate list of themes from Search results
   */

  collectThemes(searchResults:any[]) {
        let themes :SelectItem[] = [];
        let themesArray:string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.theme && resultItem.theme !== null && resultItem.theme.length > 0) {
                for (let theme of resultItem.theme) {
                    if(themesArray.indexOf(theme) < 0) {
                        themes.push({label:theme,value:theme});
                        themesArray.push(theme);
                    }
                }
            }
        }
        return themes;
    }


  /**
   * Populate list of themes from Search results
   */

  collectComponents(searchResults:any[]) {
    let components :SelectItem[] = [];
    let componentsArray:string[] = [];
    let resultItemComp:string[] = [];
    for (let resultItem of searchResults) {
      if(resultItem.components && resultItem.components !== null && resultItem.components.length > 0) {
        for (let resultItemComponents of resultItem.components) {
            let comp = resultItemComponents['@type'];
            let compType = _.split(comp, ',')[0];
            let compTypeFinal = _.split(compType, ':')[1];
          if(componentsArray.indexOf(compTypeFinal) < 0) {
            components.push({label:compTypeFinal,value:compTypeFinal});
            componentsArray.push(compTypeFinal);
          }
        }
      }
    }
    return components;
  }

  /**
   * Populate list of Authors from Search results
   */

  collectAuthors(searchResults:any[]) {
        let authors :string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.contactPoint && resultItem.contactPoint !== null && resultItem.contactPoint.fn !== null) {
                if(authors.indexOf(resultItem.contactPoint.fn) < 0) {
                    authors.push(resultItem.contactPoint.fn);
                }
            }
        }
        return authors;
    }

  /**
   * Populate list of keywords from search results
   */

  collectKeywords(searchResults:any[]) {
        let kwords :string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.keyword && resultItem.keyword !== null && resultItem.keyword.length > 0) {
                for (let keyword of resultItem.keyword) {
                    if(kwords.indexOf(keyword) < 0) {
                        kwords.push(keyword);
                    }
                }
            }
        }
        return kwords;
     }

  /**
   * If Search is successful populate list of keywords themes and authors
   */

  onSuccess(searchResults:any[]) {
        this.searchResults = searchResults;
        this.filteredResults = searchResults;
        this.keywords = this.collectKeywords(searchResults);
        this.themes = this.collectThemes(searchResults);
        this.components = this.collectComponents(searchResults);
        this.themesTree = [{
          label: 'Research Topics',
          children: this.themes
        }];
        this.componentsTree =   [{
          label: 'Components',
          children: this.components
        }];
        this.authors = this.collectAuthors(searchResults);
        this.clearFilters();
        if (this.filteredResults.length < 5) {
          this.rows = 20;
        }
    }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error:any[]) {
        this.searchResults = [];
        this.filteredResults = [];
        this.keywords = [];
        this.themes = [];
        this.msgs = [];
        this.exception = (<any>error).ex;
        this.errorMsg = (<any>error).message;
        this.status = (<any>error).httpStatus;
        this.msgs.push({severity:'error', summary:this.errorMsg + ':', detail:this.status + ' - ' + this.exception});
  }

  /**
   * call the Search service with parameters
   */
  search(searchValue:string,searchTaxonomyKey:string,queryAdvSearch:string,summaryPageOpen:boolean) {
        this.searching = true;
        this.keyword = '';
        let that = this;
        return this.searchService.searchPhrase(this.searchValue, this.searchTaxonomyKey,queryAdvSearch,this.summaryPageOpen)
            .subscribe(
            searchResults => that.onSuccess(searchResults),
            error => that.onError(error)
            );
  }

  /**
   * Filter keywords for suggestive search
   */
  filterKeywords(event:any) {
        let keyword = event.query;
        this.suggestedKeywords = [];
        for(let i = 0; i < this.keywords.length; i++) {
            let keyw = this.keywords[i];
            if(keyw.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
                this.suggestedKeywords.push(keyw);
            }
        }

        this.suggestedKeywords = this.sortAlphabetically(this.suggestedKeywords);
  }

  /**
   * Filter authors for suggestive search
   */

  filterAuthors(event:any) {
        let author = event.query;
        this.suggestedAuthors = [];
        for(let i = 0; i < this.authors.length; i++) {
            let autho = this.authors[i];
            if(autho.toLowerCase().indexOf(author.toLowerCase()) >= 0) {
                this.suggestedAuthors.push(autho);
            }
        }
        this.suggestedAuthors = this.sortAlphabetically(this.suggestedAuthors);
        //this.suggestedAuthors.splice(0, 0, 'All');

    }

  /**
   * Sort arrays alphabetically
   */
  sortAlphabetically(array:string[]) {
        var sortedArray: string[] = array.sort((n1,n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
        return sortedArray;
    }

  /**
   * Display suggested authors on dropdown click
   */
  onAuthorDropdownClick(event:any) {
        //var tmp = this.suggestedAuthors; // wierd, have to do this, otherwise nothing display
        this.suggestedAuthors = [];
        //mimic remote call
        setTimeout(() => {
            this.suggestedAuthors = this.authors;
        }, 100);
  }

  /**
   * Filter themes
   */
  filterByTheme(searchResults:any[], selectedThemes:string[]) {
     var filteredResults : any[] = [];
       if(selectedThemes.length > 0 && selectedThemes.indexOf(this.ALL) < 0) {
            if (searchResults !== null && searchResults.length > 0) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.theme && resultItem.theme !== null &&
                        this.containsAllThemes(resultItem.theme, selectedThemes)) {
                        filteredResults.push(resultItem);
                    }
                }
            }
            return filteredResults;
        }else {
           return searchResults;
       }
  }

  /**
   * Filter Components
   */
  filterByComponents(searchResults:any[], selectedComponents:string[]) {
    var filteredResults: any[] = [];

    if (selectedComponents.length > 0) {
      if (searchResults !== null && searchResults.length > 0) {
        let components: SelectItem[] = [];
        let componentsArray: string[] = [];
        let resultItemComp: string[] = [];
        for (let resultItem of searchResults) {
          if (resultItem.components && resultItem.components !== null && resultItem.components.length > 0) {
            for (let resultItemComponents of resultItem.components) {
              let comp = resultItemComponents['@type'];
              let compType = _.split(comp, ',')[0];
              let compTypeFinal: string;
                compTypeFinal = _.split(compType, ':')[1];
              if (selectedComponents.indexOf(compTypeFinal) === 0) {
                filteredResults.push(resultItem);
              }
            }
          }
        }
        return filteredResults;
      } else {
        return searchResults;
      }
    }
  }

  /**
   * filter authors
   */
  filterByAuthor(searchResults:any[], selectedAuthor:string) {
        if(selectedAuthor !== null  && selectedAuthor !== this.ALL  && selectedAuthor !== '') {
            var filteredResults : any[] = [];
            if (searchResults && searchResults.length > 0) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.contactPoint && resultItem.contactPoint !== null &&
                        resultItem.contactPoint.fn !== null &&  selectedAuthor === resultItem.contactPoint.fn) {
                        filteredResults.push(resultItem);
                    }
                }
            }
            return filteredResults;
        } else {
            return searchResults;
        }
    }

  /**
   * filter results
   */
  filterResults(event:any,selectedDropdown:string) {
    if (selectedDropdown !== null) {
      if (selectedDropdown === 'Author') {
        this.selectedAuthorDropdown = true;
      }
    }
    if (this.selectedKeywords !== null) {
      this.filteredResults = this.filterByKeyword(this.searchResults, this.selectedKeywords);
    }

    this.suggestedKeywords = this.collectKeywords(this.filteredResults);
    //this.suggestedThemes = this.collectThemes(this.filteredResults);
    this.selectedThemes = [];
    this.selectedComponents = [];
    for (let theme of this.selectedThemesNode)
    {
      this.selectedThemes.push(theme.label);
    }

    if (this.selectedThemes !== null && this.selectedThemes.length > 0) {
      this.filteredResults =this.filterByTheme(this.filteredResults, this.selectedThemes);
    }

    for (let comp of this.selectedComponentsNode)
    {
      this.selectedComponents.push(comp.label);
    }
    if (this.selectedComponents !== null && this.selectedComponents.length > 0) {
      this.filteredResults =this.filterByComponents(this.filteredResults, this.selectedComponents);
    }
    this.suggestedAuthors = this.collectAuthors(this.filteredResults);

    if (this.selectedAuthor !== null && this.selectedAuthor.length > 0) {
      this.filteredResults = this.filterByAuthor(this.filteredResults, this.selectedAuthor);
    }
  }


  /**
   * clear filters
   */
  clearFilters() {
        this.filteredResults = this.searchResults;
        this.suggestedThemes = [];
        this.suggestedKeywords =[];
        this.suggestedAuthors = [];
        this.selectedAuthor = null;
        this.selectedKeywords = [];
        this.selectedThemes =[];
        this.selectedThemesNode = [];
        this.selectedComponents =[];
        this.selectedComponentsNode = [];
        this.selectedAuthorDropdown = false;
  }

  /**
   * clear author filter
   */
  clearAuthorFilter() {
        this.filteredResults = this.searchResults;
        this.suggestedAuthors = [];
        this.selectedAuthor = null;
        this.selectedAuthorDropdown = false;
  }

    /**
     *
     * @param resultKeywords
     * @param keywords
     * @returns {boolean}
     */
  containsAllKeywords(resultKeywords:string[], keywords:string[]) {
        for (let keyw of keywords) {
            if(resultKeywords.indexOf(keyw) === -1)
                return false;
        }
        return true;
  }


  containsAllThemes(resultThemes:string[], themes:string[]) {
          for (let theme of themes) {
            if(resultThemes.indexOf(theme) === -1)
                return false;
        }
        return true;
  }


    filterByKeyword(searchResults:any[], selectedKeywords:any[]) {
        var filteredResults : any[] = [];
        if(selectedKeywords.length > 0 && selectedKeywords.indexOf(this.ALL) < 0) {
            if (searchResults !== null && searchResults.length > 0) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.keyword && resultItem.keyword !== null &&
                        this.containsAllKeywords(resultItem.keyword, selectedKeywords)) {
                        filteredResults.push(resultItem);
                    }
                }
            }
            return filteredResults;
        }else {
           return searchResults;
        }
     }

    openSummaryPage() {
        this.summaryPageOpen = true;
    }

    encodeString(url:string,param:string) {
      var urlString = url + encodeURIComponent(param);
      window.open(urlString);
    }

    openURL(url:string) {
       window.open(url);
    }


  /**
     * Get the params OnInit
     */
    ngOnInit() {

    this.items = [
      {
        label: 'File',
        icon: 'fa-file-o',
        items: [{
          label: 'New',
          icon: 'fa-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          {label: 'Undo', icon: 'fa-mail-forward'},
          {label: 'Redo', icon: 'fa-mail-reply'}
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]}
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              {label: 'Save', icon: 'fa-save'},
              {label: 'Update', icon: 'fa-save'},
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              {label: 'Delete', icon: 'fa-minus'}
            ]
          }
        ]
      }
    ];
        this.columnOptions = [];
        this.cols = [];

        this.cols.push({header:'DOI', field:'doi'});
        this.cols.push({header:'Publisher', field:'publisher.name'});
        this.cols.push({header:'Rights', field:'rights'});
        this.cols.push({header:'Theme', field:'theme'});

        this.columnOptions = [];
        for(let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }
        this.cols = [];
        this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
          if (_.includes(window.location.href,'?')) {
              this.searchValue =params['q'];
              this.searchTaxonomyKey=params['key'];
              this.queryAdvSearch = params['queryAdvSearch'];
              this.getTaxonomies();
            } else {
              this.searchValue =_.split(window.location.href,'/')[5];
              this.summaryPageOpen = true;
              this.searchTaxonomyKey = '';
            }
            this.search(this.searchValue,this.searchTaxonomyKey,this.queryAdvSearch,this.summaryPageOpen);
        });
    }

    ngOnDestroy() {
          this._routeParamsSubscription.unsubscribe();
    }
}
