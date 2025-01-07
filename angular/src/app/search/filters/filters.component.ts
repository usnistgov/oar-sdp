import {
  Component,
  OnInit,
  Inject,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { TreeNode } from "primeng/api";
// import { Message } from 'primeng/components/common/api';
import { Message } from "primeng/api";
import { SDPQuery } from "../../shared/search-query/query";
import { SearchService, SEARCH_SERVICE } from "../../shared/search-service";
import { SearchQueryService } from "../../shared/search-query/search-query.service";
import {
  TaxonomyListService,
  SearchfieldsListService,
} from "../../shared/index";
import * as _ from "lodash-es";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.css"],
  providers: [TaxonomyListService, SearchfieldsListService],
  animations: [
    trigger("expand", [
      state("closed", style({ height: "40px" })),
      state("collapsed", style({ height: "183px" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("625ms")),
      transition("expanded <=> closed", animate("625ms")),
      transition("closed <=> collapsed", animate("625ms")),
    ]),
    trigger("expandOptions", [
      state("collapsed", style({ height: "0px" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("625ms")),
    ]),
    trigger("filterExpand", [
      state("collapsed", style({ width: "40px" })),
      state("expanded", style({ width: "*" })),
      transition("expanded <=> collapsed", animate("625ms")),
    ]),
  ],
})
export class FiltersComponent implements OnInit, AfterViewInit {
  searchResults: any[] = [];
  suggestedThemes: string[] = [];
  suggestedKeywords: string[] = [];
  suggestedKeywordsLkup: any = {};
  suggestedAuthors: string[] = [];
  selectedAuthor: any[] = [];
  selectedKeywords: any[] = [];
  selectedThemes: any[] = [];
  selectedComponents: any[] = [];
  selectedComponentsNode: any[] = [];
  selectedResourceType: any[] = [];
  selectedResourceTypeNode: any[] = [];
  selectedAuthorDropdown: boolean = false;
  resourceTypes: SelectItem[] = [];
  resourceTypesAllArray: string[] = [];
  uniqueRes: string[] = [];
  resourceTypesWithCount: TreeNode[] = [];
  authors: string[] = [];
  components: SelectItem[] = [];
  componentsAllArray: string[] = [];
  componentsWithCount: TreeNode[] = [];
  showComponents: string[] = ["Data File", "Access Page", "Subcollection"];
  MoreOptionsDisplayed: boolean = false;
  moreOptionsText: string = "Show More Options...";

  //  NIST theme
  themes: SelectItem[] = [];
  themesAllArray: string[] = [];
  unspecifiedCount: number = 0;
  uniqueThemes: string[] = [];
  themesWithCount: TreeNode[] = [];
  themesTree: TreeNode[] = [];
  showMoreLink: boolean = false;
  selectedThemesNode: any[] = [];

  componentsTree: TreeNode[] = [];
  resourceTypeTree: TreeNode[] = [];
  resultStatus: string;
  RESULT_STATUS = {
    success: "SUCCESS",
    noResult: "NO RESULT",
    userError: "USER ERROR",
    sysError: "SYS ERROR",
  };
  keywords: string[];
  searchResultsError: Message[] = [];
  searching: boolean = false;
  msgs: Message[] = [];
  status: string;
  fieldsArray: any[];
  fields: SelectItem[] = [];
  searchResType: string;
  searchResTopics: string;
  searchRecord: string;
  searchAuthors: string;
  searchKeywords: string;
  displayFields: string[] = [];
  queryAdvSearch: string;
  page: number = 1;
  isActive: boolean = true;
  filterClass: string;
  resultsClass: string;
  nodeExpanded: boolean = false;
  comheight: string; // parent div height
  comwidth: string; // parent div width
  dropdownLabelLengthLimit: number = 30;

  filterStyle = {
    width: "100%",
    "background-color": "white",
    "font-weight": "400",
    "font-style": "italic",
    "font-family": "sans-serif",
  };

  ResourceTypeStyle = {
    width: "auto",
    "background-color": "white",
    "border-width": "0",
    "font-family": "sans-serif",
  };

  recordHasStyle = {
    width: "auto",
    "background-color": "white",
    "border-width": "0",
    "font-family": "sans-serif",
  };
  researchTopicStyle = {
    width: "100%",
    "background-color": "white",
    "border-width": "0",
    "font-family": "sans-serif",
  };

  //Error handling
  queryStringErrorMessage: string = "";
  queryStringError: boolean = false;
  errorMessage: string;
  exception: string;
  errorMsg: string;

  @Input() searchValue: string;
  @Input() searchTaxonomyKey: string;
  @Input() parent: HTMLElement; // parent div
  @Input() filterWidthNum: number;
  @Input() mobileMode: boolean = false;
  @Output() filterMode = new EventEmitter<string>(); // normal or collapsed

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public searchQueryService: SearchQueryService,
    public taxonomyListService: TaxonomyListService,
    public searchFieldsListService: SearchfieldsListService
  ) {
    this.searchFieldsListService.watchFields().subscribe((fields) => {
      this.toSortItems(fields);
    })
  }

  /**
   * If search value changed, clear the filters and refresh the search result.
   * @param changes - changed detected
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterWidthNum != undefined && changes.filterWidthNum != null) {
      if (
        changes.filterWidthNum.currentValue !=
        changes.filterWidthNum.previousValue
      ) {
        if (changes.filterWidthNum.currentValue < 40) this.isActive = false;
        else this.isActive = true;
      }
    }

    if (changes.searchValue != undefined && changes.searchValue != null) {
      if (
        changes.searchValue.currentValue != changes.searchValue.previousValue ||
        changes.searchTaxonomyKey.currentValue !=
          changes.searchTaxonomyKey.previousValue
      ) {
        //Clear filters when we conduct a new search
        this.clearFilters();
        this.onSearchValueChanged();
      }
    }
  }

  ngOnInit() {
    this.msgs = [];
    this.searchResultsError = [];
    this.MoreOptionsDisplayed = false;
  }

  toggleMoreOptions() {
    this.MoreOptionsDisplayed = !this.MoreOptionsDisplayed;
    if (this.MoreOptionsDisplayed) {
      this.moreOptionsText = "Show Less";
    } else {
      this.moreOptionsText = "Show More Options...";
    }
  }

  toggleExpand(expand: boolean): void {
    this.showMoreLink = !expand;
    this.nodeExpanded = expand;
  }

  /**
   * After view init, make the filter width the same as parent div in the parent component
   * Default width is 400px.
   */
  ngAfterViewInit() {
    if (this.parent) this.comwidth = this.parent.clientWidth + "px";
    else this.comwidth = "400px";
  }

  onSearchValueChanged(){
    this.searchService.setQueryValue(this.searchValue, "", "");
    this.queryStringErrorMessage =  
      this.searchQueryService.validateQueryString(this.searchValue);
    if (!this.queryStringErrorMessage) {
      this.queryStringError = true;
    }

    let lSearchValue = this.searchValue.replace(/  +/g, " ");

    //Convert to a query then search
    this.doSearch(
      this.searchQueryService.buildQueryFromString(
        lSearchValue,
        null,
        this.fields
      )
    );
  }

  /**
   * Get the filterable fields and then do the search
   */
  // getFields() {
  //   this.searchFieldsListService.getSearchFields().subscribe({
  //     next: (fields) => {
  //       this.toSortItems(fields);
  //       this.searchService.setQueryValue(this.searchValue, "", "");
  //       this.queryStringErrorMessage =
  //         this.searchQueryService.validateQueryString(this.searchValue);
  //       if (!this.queryStringErrorMessage) {
  //         this.queryStringError = true;
  //       }

  //       let lSearchValue = this.searchValue.replace(/  +/g, " ");

  //       //Convert to a query then search
  //       this.doSearch(
  //         this.searchQueryService.buildQueryFromString(
  //           lSearchValue,
  //           null,
  //           this.fields
  //         )
  //       );
  //     },
  //     error: (error) => {
  //       this.errorMessage = <any>error;
  //     }
  //   });
  // }

  /**
   * Do the search
   * @param query - search query
   * @param searchTaxonomyKey - Taxonomy keys if any
   */
  doSearch(query: SDPQuery, searchTaxonomyKey?: string) {
    this.msgs = [];
    this.searchResultsError = [];
    this.search(query, searchTaxonomyKey);

    this.selectedResourceTypeNode = [];
    this.selectedThemesNode = [];
    this.selectedComponentsNode = [];

    // Turn spinner off after 60 seconds (if still waiting for the result)
    setTimeout(() => {
      this.searching = false;
    }, 60000);
  }

  /**
   * Sort the given fields and populate this.fields
   * @param fields
   */
  toSortItems(fields: any[]) {
    this.fieldsArray = fields;
    let sortItems: SelectItem[] = [];
    this.fields = [];
    let dupFound: boolean = false;

    for (let field of fields) {
      if (_.includes(field.tags, "filterable")) {
        if (field.type !== "object") {
          if (field.name !== "component.topic.tag") {
            dupFound = false;
            for (let item of sortItems) {
              if (item.label == field.label && item.value == field.name) {
                dupFound = true;
                break;
              }
            }
            if (!dupFound)
              sortItems.push({ label: field.label, value: field.name });
          }
        }
      }

      if (_.includes(field.tags, "searchable")) {
        let lValue = field.name.replace("component.", "components.");

        dupFound = false;
        for (let item of this.fields) {
          if (item.label == field.label && item.value == lValue) {
            dupFound = true;
            break;
          }
        }
        if (!dupFound) this.fields.push({ label: field.label, value: lValue });
      }
    }

    this.fields = _.sortBy(this.fields, ["label", "value"]);
  }

  /**
   * call the Search service with parameters
   */
  search(query: SDPQuery, searchTaxonomyKey?: string) {
    this.searching = true;
    let that = this;
    return this.searchService.searchPhrase(query, searchTaxonomyKey).subscribe(
      (searchResults) => {
        that.onSuccess(searchResults.ResultData);
      },
      (error) => that.onError(error)
    );
  }

  /**
   * If Search is successful, populate list of keywords themes and authors
   * @param searchResults
   */
  onSuccess(searchResults: any[]) {
    this.resultStatus = this.RESULT_STATUS.success;
    this.themesWithCount = [];
    this.componentsWithCount = [];
    this.searchResults = searchResults;
    this.keywords = this.collectKeywords(searchResults);
    this.collectThemes(searchResults);
    this.resourceTypes = this.collectResourceTypes(searchResults);

    let compNoData: boolean = false;
    this.searchResultsError = [];

    if (searchResults.length === 0) {
      this.resultStatus = this.RESULT_STATUS.noResult;
    }
    // collect Research topics with count
    this.collectThemesWithCount();

    this.components = this.collectComponents(searchResults);

    // collect Resource features with count
    this.collectComponentsWithCount();
    this.collectResourceTypesWithCount();
    if (this.componentsWithCount.length == 0) {
      compNoData = true;
      this.componentsWithCount = [];
      this.componentsWithCount.push({
        label: "DataFile - 0",
        data: "DataFile",
      });
      this.componentsWithCount.push({
        label: "AccessPage - 0",
        data: "AccessPage",
      });
      this.componentsWithCount.push({
        label: "SubCollection - 0",
        data: "Subcollection",
      });
      this.componentsTree = [
        {
          label: "Record has -",
          expanded: true,
          children: this.componentsWithCount,
        },
      ];

      this.componentsTree[0].selectable = false;

      for (var i = 0; i < this.componentsWithCount.length; i++) {
        this.componentsTree[0].children[i].selectable = false;
      }
    }
    this.themesTree = [
      {
        label: "Research Topics -",
        expanded: true,
        children: this.themesWithCount,
      },
    ];

    this.resourceTypeTree = [
      {
        label: "Type of Resource  -",
        expanded: true,
        children: this.resourceTypesWithCount,
      },
    ];

    if (!compNoData) {
      this.componentsTree = [
        {
          label: "Record has -",
          expanded: true,
          children: this.componentsWithCount,
        },
      ];
    }
    this.authors = this.collectAuthors(searchResults);
    this.searching = false;
  }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error: any[]) {
    this.searchResults = [];
    this.keywords = [];
    this.themes = [];
    this.msgs = [];

    if ((<any>error).status == 400) {
      this.resultStatus = this.RESULT_STATUS.userError;
    } else {
      this.resultStatus = this.RESULT_STATUS.sysError;
    }

    this.exception = (<any>error).ex;
    this.errorMsg = (<any>error).message;
    this.status = (<any>error).httpStatus;
    this.msgs.push({
      severity: "error",
      summary: this.errorMsg + ":",
      detail: this.status + " - " + this.exception,
    });
    this.searching = false;
  }

  /**
   * Form the filter string and refresh the result page
   */
  filterResults() {
    let lFilterString: string = "";
    this.selectedThemes = [];
    this.selectedComponents = [];
    this.selectedResourceType = [];
    let themeSelected: boolean = false;
    let componentSelected: boolean = false;
    let resourceTypesSelected: boolean = false;
    let themeType = "";
    let compType = "";
    let resourceType = "";

    // Resource type
    if (this.selectedResourceTypeNode.length > 0) {
      lFilterString += "@type=";

      for (let res of this.selectedResourceTypeNode) {
        if (
          res &&
          typeof res.data !== "undefined" &&
          res.data !== "undefined"
        ) {
          resourceTypesSelected = true;
          this.selectedResourceType.push(res.data);
          resourceType += res.data + ",";

          lFilterString += res.data.replace(/\s/g, "") + ",";
        }
      }

      lFilterString = this.removeEndingComma(lFilterString);
    }

    // NIST Research topics
    if (this.selectedThemesNode.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "topic.tag=";

      for (let theme of this.selectedThemesNode) {
        if (
          theme != "undefined" &&
          typeof theme.data !== "undefined" &&
          theme.data !== "undefined"
        ) {
          themeSelected = true;
          this.selectedThemes.push(theme.data);
          themeType += theme.data + ",";

          lFilterString += theme.data.trim() + ",";
        }
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Record has
    if (this.selectedComponentsNode.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "components.@type=";

      for (let comp of this.selectedComponentsNode) {
        if (
          comp != "undefined" &&
          typeof comp.data !== "undefined" &&
          comp.data !== "undefined"
        ) {
          componentSelected = true;
          this.selectedComponents.push(comp.data);
          compType += comp.data + ",";

          lFilterString += comp.data.replace(/\s/g, "") + ",";
        }
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Authors and contributors
    if (this.selectedAuthor.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "contactPoint.fn=";

      for (let author of this.selectedAuthor) {
        lFilterString += author + ",";
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Keywords
    if (this.selectedKeywords.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "keyword=";

      for (let keyword of this.selectedKeywords) {
        lFilterString += this.suggestedKeywordsLkup[keyword] + ",";
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);
    if (!lFilterString) lFilterString = "NoFilter";

    this.searchService.setFilterString(lFilterString);
  }

  /**
   * Remove the ending comma of the given string
   * @param inputrString
   */
  removeEndingComma(inputrString: string): string {
    if (!inputrString) return "";

    if (inputrString[inputrString.length - 1] == ",")
      return inputrString.substr(0, inputrString.length - 1);
    else return inputrString;
  }

  /**
   * Create a list of suggested authors based on given search query
   * @param event - search query that user typed into the filter box
   */
  filterAuthors(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let author = event.query;
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.authors.length; i++) {
      let auth = this.authors[i];
      if (auth.toLowerCase().indexOf(author.toLowerCase()) >= 0) {
        filtered.push(auth);
      }
    }

    this.suggestedAuthors = filtered;
  }

  /**
   * Create a list of suggested keywords based on given search query
   * Because some keywords might be very long, for display purpose we only show the first few words in
   * the dropdown list.
   * suggestedKeywords - for display
   * suggestedKeywordsLkup - stores the real ketwords
   * @param event - search query that user typed into the keyword filter box
   */
  updateSuggestedKeywords(event: any) {
    let keyword = event.query.toLowerCase();
    this.suggestedKeywords = [];
    this.suggestedKeywordsLkup = {};

    // Handle current keyword: update suggested keywords and lookup
    for (let i = 0; i < this.keywords.length; i++) {
      let keyw = this.keywords[i].trim().toLowerCase();
      if (keyw.indexOf(keyword) >= 0) {
        //Avoid duplicate
        if (
          this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] == undefined
        ) {
          this.suggestedKeywords.push(this.shortenKeyword(keyw));
          this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] = keyw;
        }
      }
    }

    // Handle selected keyword: update suggested keywords lookup. Lookup array must cover all selected keywords.
    this.selectedKeywords.forEach((kw) => {
      for (let i = 0; i < this.keywords.length; i++) {
        let keyw = this.keywords[i].trim().toLowerCase();
        if (keyw.indexOf(kw.toLowerCase()) >= 0) {
          if (
            this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] == undefined
          ) {
            this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] = keyw;
          }
        }
      }
    });

    this.suggestedKeywords = this.sortAlphabetically(this.suggestedKeywords);
  }

  /**
   * Some keywords are very long. They cause problem when display both in suggested keyword list or
   * selected keyword list. This function returns the first few words of the input keyword. The length
   * of the return string is based on this.dropdownLabelLengthLimit but not exactly.
   * If the length of the input keyword is less than dropdownLabelLengthLimit, the input keyword will be returned.
   * Otherwise, It selects the first few words whose total length is just exceed the length limit followed by "...".
   * @param keyword
   * @returns Keyword abbreviate
   */
  shortenKeyword(keyword: string) {
    let keywordAbbr: string;

    //If the keyword length is greater than the maximum length, we want to truncate
    //it so that the length is close the maximum length.

    if (keyword.length > this.dropdownLabelLengthLimit) {
      let wordCount = 1;
      while (
        keyword.split(" ", wordCount).join(" ").length <
        this.dropdownLabelLengthLimit
      ) {
        wordCount++;
      }

      keywordAbbr = keyword.substring(
        0,
        keyword.split(" ", wordCount).join(" ").length
      );
      if (keywordAbbr.trim().length < keyword.length)
        keywordAbbr = keywordAbbr + "...";

      let i = 1;
      let tmpKeyword = keywordAbbr;
      while (
        Object.keys(this.suggestedKeywordsLkup).indexOf(tmpKeyword) >= 0 &&
        this.suggestedKeywordsLkup[tmpKeyword] != keyword &&
        i < 100
      ) {
        tmpKeyword = keywordAbbr + "(" + i + ")";
        i++;
      }
      keywordAbbr = tmpKeyword;
    } else keywordAbbr = keyword;

    return keywordAbbr;
  }

  /**
   * Sort arrays alphabetically
   * @param array - array to be sorted
   */
  sortAlphabetically(array: string[]) {
    var sortedArray: string[] = array.sort((n1, n2) => {
      if (n1 > n2) return 1;

      if (n1 < n2) return -1;

      return 0;
    });

    return sortedArray;
  }

  /**
   * Return filter icon image class based on filter status
   */
  getFilterImgClass() {
    if (this.isActive) {
      if (this.mobileMode) {
        return "faa faa-angle-double-up";
      } else {
        return "faa faa-angle-double-left";
      }
    } else {
      if (this.mobileMode) {
        return "faa faa-angle-double-down";
      } else {
        return "faa faa-angle-double-right";
      }
    }
  }

  /**
   * clear filters
   */
  clearFilters() {
    this.suggestedThemes = [];
    this.suggestedKeywords = [];
    this.suggestedAuthors = [];
    // this.selectedAuthor = [];
    this.selectedKeywords = [];
    this.selectedThemes = [];
    this.selectedThemesNode = [];
    this.selectedComponents = [];
    this.selectedComponentsNode = [];
    this.selectedAuthorDropdown = false;
    this.selectedResourceType = [];
    this.selectedResourceTypeNode = [];
    this.resourceTypes = this.collectResourceTypes(this.searchResults);
    this.collectResourceTypesWithCount();
    this.authors = this.collectAuthors(this.searchResults);
    this.suggestedKeywords = this.collectKeywords(this.searchResults);
    this.components = this.collectComponents(this.searchResults);
    this.collectComponentsWithCount();
    this.collectThemes(this.searchResults);
    this.collectThemesWithCount();
    this.themesTree = [
      {
        label: "NIST Research Topics -",
        expanded: true,
        children: this.themesWithCount,
      },
    ];
    this.componentsTree = [
      {
        label: "Record has -",
        expanded: true,
        children: this.componentsWithCount,
      },
    ];

    this.resourceTypeTree = [
      {
        label: "Resource Type -",
        expanded: true,
        children: this.resourceTypesWithCount,
      },
    ];

    this.filterResults();
  }

  /**
   * Get resource type from search result
   * @param searchResults search result
   */
  collectResourceTypes(searchResults: any[]) {
    let resourceTypes: SelectItem[] = [];
    let resourceTypesArray: string[] = [];
    let resourceTypesAllArray: string[] = [];
    let resultItemResourceType: string[] = [];
    let res: any[] = [];
    let resType: string;
    let tempType: any;
    this.resourceTypesAllArray = [];

    for (let resultItem of searchResults) {
      this.uniqueRes = [];
      let resTypeArray = resultItem["@type"];

      for (var i = 0; i < resTypeArray.length; i++) {
        resType = resTypeArray[i];
        this.uniqueRes.push(_.startCase(_.split(resType, ":")[1]));
        if (resourceTypesArray.indexOf(resType) < 0) {
          resourceTypes.push({
            label: _.startCase(_.split(resType, ":")[1]),
            value: _.startCase(_.split(resType, ":")[1]),
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
   * Collect resource type + count
   */
  collectResourceTypesWithCount() {
    this.resourceTypesWithCount = [];
    for (let res of this.resourceTypes) {
      let count: any;
      count = _.countBy(
        this.resourceTypesAllArray,
        _.partial(_.isEqual, res.value)
      )["true"];
      this.resourceTypesWithCount.push({
        label: res.label + "-" + count,
        data: res.value,
      });
    }
  }

  /**
   * For unique filter
   * @param value
   * @param index
   * @param self
   */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  /**
   * Get authors from search result
   * @param searchResults search result
   */
  collectAuthors(searchResults: any[]) {
    let authors: string[] = [];
    for (let resultItem of searchResults) {
      if (
        resultItem.contactPoint &&
        resultItem.contactPoint !== null &&
        resultItem.contactPoint.fn !== null
      ) {
        if (authors.indexOf(resultItem.contactPoint.fn) < 0) {
          authors.push(resultItem.contactPoint.fn);
        }
      }
    }
    return authors;
  }

  /**
   * Get keywords from search result
   * @param searchResults search result
   */
  collectKeywords(searchResults: any[]) {
    let kwords: string[] = [];
    let tempkeywords: string[] = [];

    for (let resultItem of searchResults) {
      if (
        resultItem.keyword &&
        resultItem.keyword !== null &&
        resultItem.keyword.length > 0
      ) {
        for (let keyword of resultItem.keyword) {
          //If keyword value contains semicolons, split them
          tempkeywords = keyword.split(";");
          for (let kw of tempkeywords) {
            if (kwords.indexOf(kw) < 0) {
              kwords.push(kw);
            }
          }
        }
      }
    }
    return kwords;
  }

  /**
   * Collect components from search results
   * @param searchResults - search results
   */
  collectComponents(searchResults: any[]) {
    let components: SelectItem[] = [];
    let componentsArray: string[] = [];
    let compType: string;
    let uniqueComp: string[] = [];

    this.componentsAllArray = [];

    for (let resultItem of searchResults) {
      if (
        resultItem["components"] != null &&
        resultItem["components"] != undefined &&
        resultItem["components"].length > 0
      ) {
        uniqueComp = [];
        let allcomponents = resultItem["components"];
        for (let component of allcomponents) {
          let resTypeArray = component["@type"];
          for (var i = 0; i < resTypeArray.length; i++) {
            compType = _.startCase(_.split(resTypeArray[i], ":")[1]);
            if (uniqueComp.indexOf(compType) < 0) uniqueComp.push(compType);

            if (
              compType != null &&
              compType != undefined &&
              _.includes(resTypeArray[i], "nrdp")
            ) {
              if (componentsArray.indexOf(resTypeArray[i]) < 0) {
                components.push({
                  label: compType,
                  value: compType,
                });
                componentsArray.push(resTypeArray[i]);
              }
            }
          }
        }

        for (let comp of uniqueComp) {
          this.componentsAllArray.push(comp);
        }
      }
    }
    return components;
  }

  /**
   * Collect components + count
   */
  collectComponentsWithCount() {
    this.componentsWithCount = [];
    for (let comp of this.components) {
      let count: any;
      if (this.showComponents.includes(comp.label)) {
        count = _.countBy(
          this.componentsAllArray,
          _.partial(_.isEqual, comp.value)
        )["true"];
        this.componentsWithCount.push({
          label: comp.label + "-" + count,
          data: comp.value,
        });
      }
    }
  }

  /**
   * Collect themes from Search results
   * @param searchResults - search results
   */
  collectThemes(searchResults: any[]) {
    let themes: SelectItem[] = [];
    let themesArray: string[] = [];

    let topicLabel: string;
    let data: string;
    this.themesAllArray = [];
    this.unspecifiedCount = 0;

    for (let resultItem of searchResults) {
      if (
        typeof resultItem.topic !== "undefined" &&
        resultItem.topic.length > 0
      ) {
        for (let topic of resultItem.topic) {
          topicLabel = _.split(topic.tag, ":")[0];
          topic = topic.tag;

          if (themesArray.indexOf(topicLabel) < 0) {
            themes.push({ label: topicLabel, value: topic });
            themesArray.push(topicLabel);
          }
        }
      } else {
        this.unspecifiedCount += 1;
      }
    }

    for (let resultItem of searchResults) {
      this.uniqueThemes = [];

      if (
        typeof resultItem.topic !== "undefined" &&
        resultItem.topic.length > 0
      ) {
        for (let topic of resultItem.topic) {
          topic = topic.tag;

          for (let theme of themes) {
            if (topic.toLowerCase().indexOf(theme.label.toLowerCase()) > -1) {
              this.uniqueThemes.push(theme.label);
            }
          }
        }

        this.themesAllArray = this.themesAllArray.concat(
          this.uniqueThemes.filter(this.onlyUnique)
        );
      }
    }

    this.themes = themes;
  }

  /**
   * Find the location of nth character in a string
   * @param string - string to search from
   * @param nth - occuence
   * @param char - character to search for
   * @returns position of the character
   */
  findNthOccurence(string, nth, char) {
    let index = 0;
    for (let i = 0; i < nth; i += 1) {
      if (index !== -1) index = string.indexOf(char, index + 1);
    }
    return index;
  }

  /**
   * Collect NIST themes + count
   */
  collectThemesWithCount() {
    let sortable: any[] = [];

    sortable = [];
    this.themesWithCount = [];
    for (let theme in _.countBy(this.themesAllArray)) {
      sortable.push([theme, _.countBy(this.themesAllArray)[theme]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    if (this.unspecifiedCount > 0) {
      sortable.push(["Unspecified", this.unspecifiedCount]);
    }

    for (var key in sortable) {
      this.themesWithCount.push({
        label: sortable[key][0] + "-" + sortable[key][1],
        data: sortable[key][0],
      });
    }

    if (sortable.length > 5) {
      this.showMoreLink = true;
    } else {
      this.showMoreLink = false;
    }
  }

  /**
   * Set the width of the filter column. If the filter is active, set the width to 25%.
   * If the filter is collapsed, set the width to 40px.
   */
  setFilterWidth() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.filterMode.emit("collapsed");
    } else {
      this.filterMode.emit("normal");
    }
  }

  /**
   * Return tooltip text for given filter tree node.
   * @param filternode tree node of a filter
   * @returns tooltip text
   */
  filterTooltip(filternode: any) {
    if (filternode && filternode.label)
      return (
        filternode.label.split("-")[0] + "-" + filternode.label.split("-")[1]
      );
    else return "";
  }
}
