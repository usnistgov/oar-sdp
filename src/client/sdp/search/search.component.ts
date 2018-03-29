import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { SearchService, TaxonomyListService, SearchFieldsListService } from '../shared/index';
import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem, TreeNode, TreeModule, DialogModule, Dialog, InputTextModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MenuItem, InputTextareaModule, ProgressSpinner } from 'primeng/primeng';
import * as _ from 'lodash';
import { Config } from '../shared/config/env.config';
import { environment } from '../environment';
import { Data } from '../shared/search-query/data';
import { SearchQueryService } from '../shared/search-query/search-query.service';

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
  selectedResourceTypeNode: TreeNode[];
  profileMode: string = 'inline';
  msgs: Message[] = [];
  exception: string;
  textRotate: boolean = true;
  display: boolean = false;
  noResults: boolean;
  checked: boolean = false;
  errorMsg: string;
  first: number = 0;
  status: string;
  errorMessage: string;
  queryAdvSearch: string;
  searchResults: any[] = [];
  errorMessageArray: string[];
  searchResultsError: Message[] = [];
  themesTree: TreeNode[];
  componentsTree: TreeNode[];
  resourceTypeTree: TreeNode[];
  searchValue: string;
  taxonomies: SelectItem[];
  sortItems: SelectItem[];
  fields: SelectItem[];
  fieldsArray: any[];
  displayFields: string[] = [];
  selectedFields: string[] = ['Resource Description','Subject keywords'];
  searchTaxonomyKey: string;
  suggestedTaxonomies: string[];
  suggestedTaxonomyList: string[];
  nodeExpanded: boolean = true;
  sortItemKey: string;
  showMoreLink: boolean = false;
  cols: any[];
  rows: number = 5;
  columnOptions: SelectItem[];
  searching: boolean = false;
  keywords: string[];
  themes: SelectItem[] = [];
  themesWithCount: TreeNode[];
  componentsWithCount: TreeNode[];
  resourceTypesWithCount: TreeNode[];
  components: SelectItem[] = [];
  resourceTypes: SelectItem[] = [];
  authors: string[] = [];
  themesAllArray: string[] = [];
  componentsAllArray: string[] = [];
  resourceTypesAllArray: string[] = [];
  componentsAllDupArray: string[] = [];
  filteredResults: any[] = [];
  keyword: string;
  Keywords: string[] = [];
  selectedKeywords: string[] = [];
  selectedThemes: string[] = [];
  selectedComponents: string[] = [];
  selectedResourceType: string[] = [];
  selectedAuthor: any[];
  suggestedKeywords: string[] = [];
  suggestedThemes: string[] = [];
  suggestedAuthors: string[] = [];
  ALL: string = 'All';
  unspecified: string = 'Unspecified';
  unspecifiedCount: number = 0;
  filteredKeywords: string[] = [];
  filteredThemes: string[] = [];
  filteredAuthors: string[] = [];
  selectedAuthorDropdown: boolean = false;
  items: MenuItem[];
  uniqueComp: string[] = [];
  uniqueRes: string[] = [];
  uniqueThemes: string[] = [];
  sortable: any[] = [];
  showMoreResearchTopics: boolean = false;
  mobHeight: number;
  mobWidth: number;
  width:string;
  isActive: boolean = true;
  filterClass:string = "ui-g-12 ui-md-9 ui-lg-9";
  resultsClass:string = "ui-g-12 ui-md-9 ui-lg-9";
  queryName:string;
  queryValue:string;
  displayQuery: boolean = false;
  displayQueryList: boolean = false;
  private _routeParamsSubscription: Subscription;
  private PDRAPIURL: string = environment.PDRAPI;

  /**
   * Creates an instance of the SearchPanel
   *
   */
  constructor(ngZone:NgZone , private route: ActivatedRoute, private el: ElementRef, private ref:ChangeDetectorRef, public taxonomyListService: TaxonomyListService, public searchService: SearchService, public searchFieldsListService: SearchFieldsListService, public searchQueryService: SearchQueryService) {
    this.mobHeight = (window.innerHeight);
    this.mobWidth = (window.innerWidth);

    window.onresize = (e) =>
    {
      ngZone.run(() => {
        this.mobWidth = window.innerWidth;
        this.mobHeight = window.innerHeight;
      });
    };

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

  saveSearchQuery (queryName:any,queryValue:any) {

    let data : Data;

    data = {'queryName':queryName,'queryValue':queryValue,'id':queryName};

    this.searchQueryService.saveSearchQuery(data);


  }

  /**
   * Populate taxonomy items
   */
  toTaxonomiesItems(taxonomies: any[]) {
    let items: SelectItem[] = [];
    items.push({label: 'ALL RESEARCH', value: ''});
    for (let taxonomy of taxonomies) {
      items.push({label: taxonomy.label, value: taxonomy.label});
    }
    return items;
  }

  setResultsWidth () {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.resultsClass = "ui-g-12 ui-md-11 ui-lgc-11";
      this.filterClass = "ui-g-12 ui-md-11 ui-lgc-1";
    } else {
      this.resultsClass = "ui-g-12 ui-md-9 ui-lg-9";
    }
  }

  /**
   * Populate list of themes from Search results
   */

  collectThemes(searchResults: any[]) {
    let themes: SelectItem[] = [];
    let themesArray: string[] = [];
    let uniqueThemes: string[] = [];
    let themesAllArray: string[] = [];
    let topics: string;
    this.themesAllArray = [];
    this.unspecifiedCount = 0;
    for (let resultItem of searchResults) {
      this.uniqueThemes = [];
      if (typeof resultItem.topic !== 'undefined' && resultItem.topic.length > 0) {
        for (let topic of resultItem.topic) {
          topics = _.split(topic.tag, ':')[0];
          this.uniqueThemes.push(topics);
          if (themesArray.indexOf(topics) < 0) {
            themes.push({label: topics, value: topics});
            themesArray.push(topics);
          }

        }
        this.themesAllArray = this.themesAllArray.concat(this.uniqueThemes.filter(this.onlyUnique));
      } else {
        this.unspecifiedCount += 1;
      }

    }
    return themes;
  }


  showDialog() {
    this.displayQuery = true;
    this.queryValue = this.searchValue;
  }

  /**
   * Populate list of themes from Search results
   */

  collectComponents(searchResults: any[]) {
    let components: SelectItem[] = [];
    let componentsArray: string[] = [];
    let componentsAllArray: string[] = [];
    let resultItemComp: string[] = [];
    let comp: any[] = [];
    let compType: string;
    this.componentsAllArray = [];
    for (let resultItem of searchResults) {
      if (resultItem.inventory && resultItem.inventory !== null && resultItem.inventory.length > 0) {
        this.uniqueComp = [];
        for (let resultItemComponents of resultItem.inventory) {
          comp = resultItemComponents.byType;
          for (let type of comp) {
            let compType = type.forType;
            if ((_.includes(compType, 'nrdp'))){
              //this.componentsAllArray.push(_.startCase(_.split(compType, ':')[1]));
              this.uniqueComp.push(_.startCase(_.split(compType, ':')[1]));
              if (componentsArray.indexOf(compType) < 0) {
                components.push({
                  label: _.startCase(_.split(compType, ':')[1]),
                  value: _.startCase(_.split(compType, ':')[1])
                });
                componentsArray.push(compType);
              }
            }
          }
          this.uniqueComp = this.uniqueComp.filter(this.onlyUnique);
        }
        for (let comp of this.uniqueComp) {
          this.componentsAllArray.push(comp);
        }
      }
    }
    return components;
  }


  /**
   * Populate list of themes from Search results
   */

  collectResourceTypes(searchResults: any[]) {
    let resourceTypes: SelectItem[] = [];
    let resourceTypesArray: string[] = [];
    let resourceTypesAllArray: string[] = [];
    let resultItemResourceType: string[] = [];
    let res: any[] = [];
    let resType: string;
    this.resourceTypesAllArray = [];
    for (let resultItem of searchResults) {
      this.uniqueRes = [];
      let resTypeArray = resultItem['@type'];
      for (var i = 0; i < resTypeArray.length; i++) {
        resType = resTypeArray[i];
        this.uniqueRes.push(_.startCase(_.split(resType, ':')[1]));
        if (resourceTypesArray.indexOf(resType) < 0) {
          resourceTypes.push({
            label: _.startCase(_.split(resType, ':')[1]),
            value: _.startCase(_.split(resType, ':')[1])
          });
          resourceTypesArray.push(resType);
        }
      }
      this.uniqueRes = this.uniqueRes.filter(this.onlyUnique);
      for (let res of this.uniqueRes) {
        this.resourceTypesAllArray.push(res);
      }
    }
    return resourceTypes;
  }

  /**
   * Populate list of Authors from Search results
   */

  collectAuthors(searchResults: any[]) {
    let authors: string[] = [];
    for (let resultItem of searchResults) {
      if (resultItem.contactPoint && resultItem.contactPoint !== null && resultItem.contactPoint.fn !== null) {
        if (authors.indexOf(resultItem.contactPoint.fn) < 0) {
          authors.push(resultItem.contactPoint.fn);
        }
      }
    }
    return authors;
  }

  /**
   * Populate list of keywords from search results
   */

  collectKeywords(searchResults: any[]) {
    let kwords: string[] = [];
    for (let resultItem of searchResults) {
      if (resultItem.keyword && resultItem.keyword !== null && resultItem.keyword.length > 0) {
        for (let keyword of resultItem.keyword) {
          if (kwords.indexOf(keyword) < 0) {
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

  onSuccess(searchResults: any[]) {
    this.noResults = false;
    this.themesWithCount = [];
    this.componentsWithCount = [];
    this.sortable = [];
    this.searchResults = searchResults;
    this.filteredResults = searchResults;
    this.keywords = this.collectKeywords(searchResults);
    this.themes = this.collectThemes(searchResults);
    this.resourceTypes = this.collectResourceTypes(searchResults);
    let compNoData : boolean = false;
    this.searchResultsError = [];

    if (searchResults.length === 0) {
      this.noResults = true;
      this.searchResultsError.push({severity:'info', summary:'Info Message', detail:'No records found'});
    }

    // collect Research topics with count
    this.collectThemesWithCount();
    this.components = this.collectComponents(searchResults);
    // collect Resource features with count
    this.collectComponentsWithCount();
    this.collectResourceTypesWithCount();

    if (this.componentsWithCount.length == 0)
    {
      compNoData = true;
      this.componentsWithCount = [];
      this.componentsWithCount.push({label: "DataFile - 0", data: "DataFile"});
      this.componentsWithCount.push({label: "AccessPage - 0", data: "AccessPage"});
      this.componentsWithCount.push({label: "SubCollection - 0", data: "Subcollection"});
      this.componentsTree = [{
        label: 'Record has -',
        "expanded": true,
        children: this.componentsWithCount,
      }];
      this.componentsTree[0].selectable = false;
      for (var i=0; i<this.componentsWithCount.length; i++)
      {
        this.componentsTree[0].children[i].selectable = false;
      }
    }

    this.themesTree = [{
      label: 'Research Topics -',
      "expanded": true,
      children: this.themesWithCount
    }];
    this.resourceTypeTree = [{
      label: 'Resource Type -',
      "expanded": true,
      children: this.resourceTypesWithCount
    }];
    if (!compNoData) {
      this.componentsTree = [{
        label: 'Record has -',
        "expanded": true,
        children: this.componentsWithCount,
      }];
    }
    this.authors = this.collectAuthors(searchResults);
    if (this.filteredResults.length < 5) {
      this.rows = 20;
    }
    this.searching = false;
  }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error: any[]) {
    this.searchResults = [];
    this.filteredResults = [];
    this.keywords = [];
    this.themes = [];
    this.msgs = [];
    this.noResults = true;
    this.exception = (<any>error).ex;
    this.errorMsg = (<any>error).message;
    this.status = (<any>error).httpStatus;
    this.msgs.push({severity: 'error', summary: this.errorMsg + ':', detail: this.status + ' - ' + this.exception});
    this.searching = false;
  }

  showMoreResTopics() {
    this.showMoreResearchTopics = true;
  }

  showLessResTopics() {
    this.showMoreResearchTopics = false;
  }

  /**
   * call the Search service with parameters
   */
  search(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string) {
    this.searching = true;
    this.keyword = '';
    let that = this;
    return this.searchService.searchPhrase(this.searchValue, this.searchTaxonomyKey, queryAdvSearch)
      .subscribe(
        searchResults => that.onSuccess(searchResults),
        error => that.onError(error)
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
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event: any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for (let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if (keyw.toLowerCase().indexOf(suggTaxonomy.toLowerCase()) >= 0) {
        this.suggestedTaxonomyList.push(keyw);
      }
    }
  }

  /**
   * Filter keywords for suggestive search
   */
  nodeExpand(event: any) {
    this.nodeExpanded = true;

  }

  nodeSelect(event) {
    //event.node = selected node
  }

  /**
   * Filter keywords for suggestive search
   */
  nodeCollapse(event: any) {
    this.nodeExpanded = false;

  }

  /**
   *  Pass Search example popup value to home screen
   */
  searchExample (popupValue:string) {
    this.display = false;
    this.searchValue = popupValue;
    this.textRotate = !this.textRotate;
  }


  collectThemesWithCount() {
    this.sortable = [];
    this.themesWithCount = [];
    for (let theme in (_.countBy(this.themesAllArray))) {
      this.sortable.push([theme, _.countBy(this.themesAllArray)[theme]]);
    }
    if (this.unspecifiedCount > 0) {
      this.sortable.push(['Unspecified', this.unspecifiedCount]);
    }
    this.sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    for (var key in this.sortable) {
      this.themesWithCount.push({
        label: this.sortable[key][0] + "-" + this.sortable[key][1],
        data: this.sortable[key][0]
      });
    }

    if (this.sortable.length > 5) {
      this.showMoreLink = true;
    } else {
      this.showMoreLink = false;
    }
  }

  collectComponentsWithCount() {
    this.componentsWithCount = [];
    for (let comp of this.components) {
      let count: any;
      count = _.countBy(this.componentsAllArray, _.partial(_.isEqual, comp.value))['true'];
      this.componentsWithCount.push({label: comp.label + "-" + count, data: comp.value});
    }
  }

  collectResourceTypesWithCount() {
    this.resourceTypesWithCount = [];
    for (let res of this.resourceTypes) {
      let count: any;
      count = _.countBy(this.resourceTypesAllArray, _.partial(_.isEqual, res.value))['true'];
      this.resourceTypesWithCount.push({label: res.label + "-" + count, data: res.value});
    }
  }

  /**
   * Filter keywords for suggestive search
   */
  filterKeywords(event: any) {
    let keyword = event.query;
    this.suggestedKeywords = [];
    for (let i = 0; i < this.keywords.length; i++) {
      let keyw = this.keywords[i];
      if (keyw.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
        this.suggestedKeywords.push(keyw);
      }
    }

    this.suggestedKeywords = this.sortAlphabetically(this.suggestedKeywords);
  }

  /**
   * Filter authors for suggestive search
   */

  filterAuthors(event: any) {
    let author = event.query;
    this.suggestedAuthors = [];
    for (let i = 0; i < this.authors.length; i++) {
      let autho = this.authors[i];
      if (autho.toLowerCase().indexOf(author.toLowerCase()) >= 0) {
        this.suggestedAuthors = [...this.suggestedAuthors,autho];
      }
    }
    this.suggestedAuthors = this.sortAlphabetically(this.suggestedAuthors);
    //this.suggestedAuthors.splice(0, 0, 'All');

  }

  /**
   * Sort arrays alphabetically
   */
  sortAlphabetically(array: string[]) {
    var sortedArray: string[] = array.sort((n1, n2) => {
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
  onAuthorDropdownClick(event: any) {
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
  filterByTheme(searchResults: any[], selectedThemes: string[]) {
    var filteredResults: any[] = [];
    if (selectedThemes.length > 0 && selectedThemes.indexOf(this.ALL) < 0) {
      if (searchResults !== null && searchResults.length > 0) {
        for (let resultItem of searchResults) {
          if (resultItem.topic !== null) {
            if (this.containsAllThemes(resultItem.topic, selectedThemes)) {
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

  /**
   * Filter Components
   */
  filterByComponents(searchResults: any[], selectedComponents: string[]) {
    var filteredResults: any[] = [];

    if (selectedComponents.length > 0) {
      if (searchResults !== null && searchResults.length > 0) {
        let components: SelectItem[] = [];
        let componentsArray: string[] = [];
        let resultItemComp: string[] = [];
        for (let resultItem of searchResults) {
          if (resultItem.inventory && resultItem.inventory !== null && resultItem.inventory.length > 0) {
            for (let resultItemComponents of resultItem.inventory) {
              let comp = resultItemComponents.byType;
              if (comp !== null) {
                for (let type of comp) {
                  let compType = type.forType;
                  compType = _.startCase(_.split(compType, ':')[1]);
                  for (let comps of selectedComponents) {
                    if (comps !== null) {
                      if (compType.indexOf(comps) === 0) {
                        filteredResults.push(resultItem);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return filteredResults;
    } else {
      return searchResults;
    }
  }

  /**
   * Filter Components
   */
  filterByResourceTypes(searchResults: any[], selectedComponents: string[]) {
    var filteredResults: any[] = [];

    if (this.selectedResourceType.length > 0) {
      if (searchResults !== null && searchResults.length > 0) {
        let resourceTypes: SelectItem[] = [];
        let resourceTypesArray: string[] = [];
        let resultItemRes: string[] = [];
        for (let resultItem of searchResults) {
          let resTypeArray: string[];
          resTypeArray = resultItem['@type']
          for (var i=0;i<resTypeArray.length;i++) {
            let resType = resTypeArray[i];
            resType = _.startCase(_.split(resType, ':')[1]);
            for (let res of selectedComponents) {
              if (resType.indexOf(res) === 0) {
                filteredResults.push(resultItem);
              }
            }
          }
        }
      }
      return filteredResults;
    } else {
      return searchResults;
    }
  }

  /**
   * Filter Components
   */
  filterByThemes(searchResults: any[], selectedThemes: string[]) {
    var filteredResults: any[] = [];
    if (typeof selectedThemes !== 'undefined') {
      if (searchResults !== null && searchResults.length > 0) {
        let themes: SelectItem[] = [];
        let resultItemThemes: string[] = [];
        for (let resultItem of searchResults) {
          if (resultItem.topic && resultItem.topic !== null && resultItem.topic.length > 0) {
            for (let resultItemThemes of resultItem.topic) {
              let theme = resultItemThemes.tag;
              let themeStr = _.split(theme, ':')[0];
              let themeMatch: boolean = false;
              for (let selTheme of selectedThemes) {
                if (themeStr.indexOf(selTheme) === 0) {
                  filteredResults.push(resultItem);
                  themeMatch = true;
                }
              }
              if (themeMatch) {
                break;
              }
            }
          } else {
            if (_.includes(selectedThemes, 'Unspecified')) {
              filteredResults.push(resultItem);
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

  filterByAuthor(searchResults: any[], selectedAuthor: any[]) {
    var filteredResults: any[] = [];
    if (selectedAuthor.length > 0) {
      if (searchResults !== null && searchResults.length > 0) {
        for (let resultItem of searchResults) {
          if (resultItem.contactPoint && resultItem.contactPoint !== null &&
            this.containsAllAuthors(resultItem.contactPoint.fn, selectedAuthor)) {
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
  filterResults(event: any,type: string) {

    this.filteredResults = this.searchResults;
    if (type === 'unselectauthor') {
      if (typeof this.selectedAuthor != 'undefined') {
        let selAuthorIndex = this.selectedAuthor.indexOf(event);
        this.selectedAuthor = [...this.selectedAuthor.slice(0, selAuthorIndex), ...this.selectedAuthor.slice(selAuthorIndex + 1)];
      }
    }

    if (type === 'unselectkeyword') {
      if (typeof this.selectedKeywords != 'undefined') {
        let selKeywordsIndex = this.selectedKeywords.indexOf(event);
        this.selectedKeywords = [...this.selectedKeywords.slice(0, selKeywordsIndex), ...this.selectedKeywords.slice(selKeywordsIndex + 1)];
      }
    }

    this.selectedThemes = [];
    this.selectedComponents = [];
    let themeSelected: boolean = false;
    let componentSelected: boolean = false;
    let resourceTypesSelected: boolean = false;
    let authorSelected: boolean = false;
    let keywordSelected: boolean = false;
    let compNoData: boolean = false;

    // Research Topics selected
    if (typeof this.selectedThemesNode != 'undefined') {
      if (this.selectedThemesNode != null && this.selectedThemesNode.length > 0) {
        for (let theme of this.selectedThemesNode) {
          if (typeof theme.data !== 'undefined' && theme.data !== 'undefined') {
            themeSelected = true;

            this.selectedThemes.push(theme.data);

          }
        }

        this.filteredResults = this.filterByThemes(this.filteredResults, this.selectedThemes);
        this.filteredResults = this.filteredResults.filter(this.onlyUnique);
        if (this.selectedAuthor != null && this.selectedAuthor.length > 0) {
        } else {
          this.authors = this.collectAuthors(this.filteredResults);
        }
        if (this.selectedKeywords != null && this.selectedKeywords.length > 0) {
        } else {
          this.suggestedKeywords = this.collectKeywords(this.filteredResults);
        }
        if (this.selectedComponentsNode != null && this.selectedComponentsNode.length > 0) {
        } else {
          this.components = this.collectComponents(this.filteredResults);
          this.collectComponentsWithCount();
        }
        if (this.selectedResourceTypeNode != null && this.selectedResourceTypeNode.length > 0) {
        } else {
          this.resourceTypes = this.collectResourceTypes(this.filteredResults);
          this.collectResourceTypesWithCount();
        }
      }
    }
    // Resource Features selected
    if (typeof this.selectedComponentsNode != 'undefined') {
      if (this.selectedComponentsNode != null && this.selectedComponentsNode.length > 0) {
        for (let comp of this.selectedComponentsNode) {
          if (typeof comp.data !== 'undefined' && comp.data !== 'undefined') {
            componentSelected = true;
            this.selectedComponents.push(comp.data);
          }
        }

        this.filteredResults = this.filterByComponents(this.filteredResults, this.selectedComponents);
        this.filteredResults = this.filteredResults.filter(this.onlyUnique);
        if (this.selectedAuthor != null && this.selectedAuthor.length > 0) {
        } else {
          this.authors = this.collectAuthors(this.filteredResults);
        }
        if (this.selectedKeywords != null && this.selectedKeywords.length > 0) {
        } else {
          this.suggestedKeywords = this.collectKeywords(this.filteredResults);
        }
        if (this.selectedThemesNode != null && this.selectedThemesNode.length > 0) {
        } else {
          this.themes = this.collectThemes(this.filteredResults);
          this.collectThemesWithCount();
        }
        if (this.selectedResourceTypeNode != null && this.selectedResourceTypeNode.length > 0) {
        } else {
          this.resourceTypes = this.collectResourceTypes(this.filteredResults);
          this.collectResourceTypesWithCount();
        }
      }
    }

    // Resource Features selected
    if (typeof this.selectedResourceTypeNode != 'undefined') {
      if (this.selectedResourceTypeNode != null && this.selectedResourceTypeNode.length > 0) {
        for (let res of this.selectedResourceTypeNode) {
          if (typeof res.data !== 'undefined' && res.data !== 'undefined') {
            resourceTypesSelected = true;
            this.selectedResourceType.push(res.data);
          }
        }
        this.filteredResults = this.filterByResourceTypes(this.filteredResults, this.selectedResourceType);
        this.filteredResults = this.filteredResults.filter(this.onlyUnique);

        if (this.selectedComponentsNode != null && this.selectedComponentsNode.length > 0) {
        } else {
          this.components = this.collectComponents(this.filteredResults);
          this.collectComponentsWithCount();
        }

        if (this.selectedAuthor != null && this.selectedAuthor.length > 0) {
        } else {
          this.authors = this.collectAuthors(this.filteredResults);
        }
        if (this.selectedKeywords != null && this.selectedKeywords.length > 0) {
        } else {
          this.suggestedKeywords = this.collectKeywords(this.filteredResults);
        }
        if (this.selectedThemesNode != null && this.selectedThemesNode.length > 0) {
        } else {
          this.themes = this.collectThemes(this.filteredResults);
          this.collectThemesWithCount();
        }
      }
    }

    if (typeof this.selectedAuthor != 'undefined') {
      if (this.selectedAuthor !== null && this.selectedAuthor.length > 0) {
        authorSelected = true;
        this.filteredResults = this.filterByAuthor(this.filteredResults, this.selectedAuthor);
        if (this.selectedThemesNode != null && this.selectedThemesNode.length > 0) {
        } else {
          this.themes = this.collectThemes(this.filteredResults);
          this.collectThemesWithCount();
        }
        if (this.selectedComponentsNode != null && this.selectedComponentsNode.length > 0) {
        } else {
          this.components = this.collectComponents(this.filteredResults);
          this.collectComponentsWithCount();
        }
        if (this.selectedKeywords != null && this.selectedKeywords.length > 0) {
        } else {
          this.suggestedKeywords = this.collectKeywords(this.filteredResults);
        }
        if (this.selectedResourceTypeNode != null && this.selectedResourceTypeNode.length > 0) {
        } else {
          this.resourceTypes = this.collectResourceTypes(this.filteredResults);
          this.collectResourceTypesWithCount();
        }
      }
    }

    if (typeof this.selectedKeywords != 'undefined') {
      if (this.selectedKeywords !== null && this.selectedKeywords.length > 0) {
        keywordSelected = true;
        this.filteredResults = this.filterByKeyword(this.filteredResults, this.selectedKeywords);
        if (this.selectedThemesNode != null && this.selectedThemesNode.length > 0) {
        } else {
          this.themes = this.collectThemes(this.filteredResults);
          this.collectThemesWithCount();
        }
        if (this.selectedComponentsNode != null && this.selectedComponentsNode.length > 0) {
        } else {
          this.components = this.collectComponents(this.filteredResults);
          this.collectComponentsWithCount();
        }
        if (this.selectedAuthor != null && this.selectedAuthor.length > 0) {
        } else {
          this.authors = this.collectAuthors(this.filteredResults);
        }
        if (this.selectedResourceTypeNode != null && this.selectedResourceTypeNode.length > 0) {
        } else {
          this.resourceTypes = this.collectResourceTypes(this.filteredResults);
          this.collectResourceTypesWithCount();
        }
      }
    }

    if (!themeSelected && !componentSelected && !authorSelected && !keywordSelected && !resourceTypesSelected) {
      this.filteredResults = this.searchResults;
      this.suggestedThemes = [];
      this.suggestedKeywords = [];
      this.suggestedAuthors = [];
      this.selectedAuthor = null;
      this.selectedKeywords = [];
      this.selectedThemes = [];
      this.selectedThemesNode = [];
      this.selectedComponents = [];
      this.selectedComponentsNode = [];
      this.selectedResourceType = [];
      this.selectedResourceTypeNode = [];
      this.selectedAuthorDropdown = false;
      this.authors = this.collectAuthors(this.filteredResults);
      this.suggestedKeywords = this.collectKeywords(this.filteredResults);
      this.components = this.collectComponents(this.filteredResults);
      this.collectComponentsWithCount();
      this.themes = this.collectThemes(this.filteredResults);
      this.collectThemesWithCount();
      this.resourceTypes = this.collectResourceTypes(this.filteredResults);
      this.collectResourceTypesWithCount();
    }

    if (this.componentsWithCount.length == 0)
    {
      compNoData = true;
      this.componentsWithCount = [];
      this.componentsWithCount.push({label: "DataFile - 0", data: "DataFile"});
      this.componentsWithCount.push({label: "AccessPage - 0", data: "AccessPage"});
      this.componentsWithCount.push({label: "SubCollection - 0", data: "Subcollection"});
      this.componentsTree[0].children = this.componentsWithCount;
      this.componentsTree[0].selectable = false;
      for (var i=0; i<this.componentsWithCount.length; i++) {
        this.componentsTree[0].children[i].selectable = false;
      }
    } else {
      this.componentsTree[0].selectable = true;
    }
    if (!compNoData) {
      this.componentsTree[0].children = this.componentsWithCount;
      for (var i=0; i<this.componentsWithCount.length; i++) {
        this.componentsTree[0].children[i].selectable = true;
      }
    }
    this.themesTree[0].children = this.themesWithCount;
  }


  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  /**
   * clear filters
   */
  clearFilters() {
    this.filteredResults = this.searchResults;
    this.suggestedThemes = [];
    this.suggestedKeywords = [];
    this.suggestedAuthors = [];
    this.selectedAuthor = null;
    this.selectedKeywords = [];
    this.selectedThemes = [];
    this.selectedThemesNode = [];
    this.selectedComponents = [];
    this.selectedComponentsNode = [];
    this.selectedAuthorDropdown = false;
    this.selectedResourceType = [];
    this.selectedResourceTypeNode = [];
    this.resourceTypes = this.collectResourceTypes(this.filteredResults);
    this.collectResourceTypesWithCount();
    this.authors = this.collectAuthors(this.filteredResults);
    this.suggestedKeywords = this.collectKeywords(this.filteredResults);
    this.components = this.collectComponents(this.filteredResults);
    this.collectComponentsWithCount();
    this.themes = this.collectThemes(this.filteredResults);
    this.collectThemesWithCount();
    this.themesTree = [{
      label: 'Research Topics -',
      "expanded": true,
      children: this.themesWithCount
    }];
    this.componentsTree = [{
      label: 'Record has -',
      "expanded": true,
      children: this.componentsWithCount
    }];
    this.resourceTypeTree = [{
      label: 'Resource Type -',
      "expanded": true,
      children: this.resourceTypesWithCount
    }];
  }

  /**
   * clear author filter
   */
  clearAuthorFilter() {
    this.filteredResults = this.searchResults;
    this.suggestedAuthors = [];
    this.selectedAuthor = null;
    this.selectedAuthorDropdown = false;

    this.suggestedThemes = [];
    this.suggestedKeywords = [];
    this.selectedKeywords = [];
    this.selectedThemes = [];
    this.selectedThemesNode = [];
    this.selectedComponents = [];
    this.selectedComponentsNode = [];
    this.selectedAuthorDropdown = false;
    this.authors = this.collectAuthors(this.filteredResults);
    this.suggestedKeywords = this.collectKeywords(this.filteredResults);
    this.components = this.collectComponents(this.filteredResults);
    this.collectComponentsWithCount();
    this.themes = this.collectThemes(this.filteredResults);
    this.collectThemesWithCount();
    this.themesTree = [{
      label: 'Research Topics -',
      "expanded": true,
      children: this.themesWithCount
    }];
    this.componentsTree = [{
      label: 'Record has -',
      "expanded": true,
      children: this.componentsWithCount
    }];
  }

  /**
   *
   * @param resultKeywords
   * @param keywords
   * @returns {boolean}
   */
  containsAllKeywords(resultKeywords: string[], keywords: string[]) {
    for (let keyw of keywords) {
      if (resultKeywords.indexOf(keyw) === -1)
        return false;
      console.log("keyword not matched" + keywords);
    }
    return true;
  }

  /**
   *
   * @param resultAuthors
   * @param Authors
   * @returns {boolean}
   */
  containsAllAuthors(resultAuthors: string[], authors: string[]) {
    for (let keyw of authors) {
      if (resultAuthors.indexOf(keyw) === -1)
        return false;
    }
    return true;
  }


  containsAllThemes(resultThemes: any[], themes: string[]) {
    for (let theme of themes) {
      if (resultThemes !== null) {
        for (let result of resultThemes) {
          if (result.tag !== null) {
            if ((result.tag).indexOf(theme)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  filterByKeyword(searchResults: any[], selectedKeywords: any[]) {
    var filteredResults: any[] = [];
    if (selectedKeywords.length > 0 && selectedKeywords.indexOf(this.ALL) < 0) {
      if (searchResults !== null && searchResults.length > 0) {
        for (let resultItem of searchResults) {
          if (resultItem.keyword && resultItem.keyword !== null &&
            this.containsAllKeywords(resultItem.keyword, selectedKeywords)) {
            console.log("keyword matched");
            filteredResults.push(resultItem);
          }
        }
      }
      return filteredResults;
    } else {
      return searchResults;
    }
  }

  encodeString(url: string, param: string) {
    var urlString = url + encodeURIComponent(param);
    window.open(urlString);
  }

  openURL(url: string) {
    window.open(url);
  }

  getSearchFields() {
    this.searchFieldsListService.get()
      .subscribe(
        fields => this.fields = this.toSortItems(fields),
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Advanced Search fields dropdown
   */
  toSortItems(fields: any[]) {
    this.fieldsArray = fields;
    let items: SelectItem[] = [];
    let sortItems: SelectItem[] = [];
    this.displayFields = [];
    //for (let field of fields) {
    for (let field of fields) {
      if (_.includes(field.tags, 'filterable')) {
        if (field.type !== 'object') {
          if (field.name !== 'component.topic.tag') {
            sortItems.push({label: field.label, value: field.name});
          }
          if (field.label !== 'Resource Title') {
            if (field.name !== 'component.topic.tag') {
              this.displayFields.push(field.label);
            }
          }
        }
      }
    }
    //sortItems = _.sortBy(sortItems, ['label','value']);
    return sortItems;
  }

  SortByFields() {
    let sortField :string[] = [];
    this.filteredResults = _.sortBy(this.filteredResults, this.sortItemKey);
    for (let field of this.fieldsArray) {
      if (field.name === this.sortItemKey) {
        this.selectedFields = [...this.selectedFields,field.label];
      }
    }
    return this.filteredResults;

  }

  SortByFieldsTest(filteredResults,sortItemKey) {
    let sortField :string[] = [];
    filteredResults = _.sortBy(filteredResults, sortItemKey);
    for (let field of this.fieldsArray) {
      if (field.name === sortItemKey) {
        this.selectedFields = [...this.selectedFields,field.label];
      }
    }
    return filteredResults;
  }


  ResetSelectedFields() {
    this.selectedFields = ['Resource Description','Subject keywords'];
    this.checked = false;
  }

  SelectAllFields() {
    this.selectedFields = [];
    if (this.checked) {
      for (let field of this.fieldsArray) {
        if (_.includes(field.tags, 'filterable')) {
          if (field.type !== 'object') {
            if (field.label !== 'Resource Title') {
              if (field.name !== 'component.topic.tag') {
                this.selectedFields.push(field.label);
              }
            }
          }
        }
      }
    }
  }


  /**
   * Get the params OnInit
   */
  ngOnInit() {
    this.getSearchFields();
    this.getTaxonomySuggestions();
    this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
      this.searchValue =params['q'];
      this.searchTaxonomyKey=params['key'];
      this.queryAdvSearch = params['queryAdvSearch'];
      this.getTaxonomies();
      this.search(this.searchValue,this.searchTaxonomyKey,this.queryAdvSearch);
    });
  }

  ngOnDestroy() {
    if ( this._routeParamsSubscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }
}
