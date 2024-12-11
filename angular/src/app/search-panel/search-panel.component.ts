import {
  Component,
  Inject,
  OnInit,
  Input,
  NgZone,
  ViewChild,
  ElementRef,
  Query,
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { TaxonomyListService } from "../shared/taxonomy-list/index";
import { SearchfieldsListService } from "../shared/searchfields-list/index";
import { SearchService, SEARCH_SERVICE } from "../shared/search-service";
import { Router, NavigationExtras } from "@angular/router";
import * as _ from "lodash-es";
import { AppConfig, Config } from "../shared/config-service/config.service";
import { timer } from "rxjs";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { OverlayPanel } from "primeng/overlaypanel";
// MARK: 08/21/2024: Disabled for now until rework
// import { AdvSearchComponent } from "../adv-search/adv-search.component";
import { SearchQueryService } from "../shared/search-query/search-query.service";
import { Observable } from "rxjs";
import {
  SDPQuery,
  QueryRow,
  CurrentQueryInfo,
} from "../shared/search-query/query";
import { ReadVarExpr } from "@angular/compiler";
import { find } from "./autocomplete";
// import fetch from "cross-fetch";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"],
  providers: [MessageService],
  animations: [
    trigger("changeDivSize", [
      state(
        "initial",
        style({
          opacity: "0",
          overflow: "hidden",
          height: "0px",
        })
      ),
      state(
        "final",
        style({
          opacity: "1",
          overflow: "hidden",
          height: "*",
        })
      ),
      transition("initial=>final", animate("1000ms ease-out")),
      transition("final=>initial", animate("500ms ease-out")),
    ]),
  ],
})
export class SearchPanelComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: boolean;
  @Input() helpicon: boolean = false;
  @Input() advanceLink: boolean;
  @Input() jumbotronPadding: string = "1em";
  @Input() homePage: boolean = false;
  visible: boolean = false;
  parsed_data_headers: any;
  parsed_data: string[][];
  syntaxRules: { criteria: string; example: string; description: string }[];
  @Input()
  set editmode(val: any) {
    this._editmode = val;
  }
  @Input()
  set setExampleState(state: string) {
    this.currentState = state;
  }

  _editmode: boolean = false;
  errorMessage: string;
  _searchValue: string = "";
  suggestedTaxonomies: string[];
  suggestedTaxonomyList: string[] = [];
  searchTaxonomyKey: string = "";
  queryAdvSearch: string = "";
  operators: SelectItem[] = [
    { label: "AND", value: "AND" },
    { label: "OR", value: "OR" },
  ];
  SDPAPI: string = "";
  imageURL: string = "";
  mobHeight: number;
  mobWidth: number;
  placeholder: string = "Search...";
  showExampleStatus: boolean = false;
  searchBottonWith: string = "10%";
  breadcrumb_top: string = "6em";
  placeHolderText: string[] = [
    "Kinetics database",
    "Gallium",
    '"SRD 101"',
    "XPDB",
    "Interatomic Potentials",
  ];
  inputStyle = {};
  fields: SelectItem[];
  currentState = "initial";
  showDropdown: boolean = true;
  currentFieldValue: string; //To temporarily hold user selected field value
  inputValueMissing: boolean = false;
  examples = [
    { field: "contactPoint.fn", example: "Levine" },
    { field: "doi", example: "10.18434/M3TH4R" },
    { field: "ediid", example: "54AE54FB37AC022DE0531A570681D4291851" },
    { field: "contactPoint.hasEmail", example: "richard.ricker@nist.gov" },
    { field: "@type", example: "Concept" },
    {
      field: "components.filepath",
      example: "Dataset_UrbanDustOpticalProperties.zip",
    },
    { field: "landingPage", example: "http://www.ctcms.nist.gov/oof/" },
  ];
  observableFields: Observable<SelectItem[]>;
  queryStringError: boolean = false;
  queryStringErrorMessage: string = "";
  DEFAULT_SEARCHBOX_WIDTH: number = 500;
  searchTextWidth: number = 500;
  backgroundPosition: string = "63%";
  // Enhanced Search Variables
  enhancedSearchButtonColor: string = "gray";

  @ViewChild("field") fieldElement: ElementRef;
  @ViewChild("field2") queryName: ElementRef;

  // injected as ViewChilds so that this class can call its public functions
  // MARK: 08/21/2024: Disabled for now until rework
  // @ViewChild(AdvSearchComponent)
  // private advSearchComp: AdvSearchComponent;

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(searchValue: string) {
    this._searchValue = searchValue;
  }

  /**
   * Create an instance of services for Home
   */
  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public taxonomyListService: TaxonomyListService,
    public searchFieldsListService: SearchfieldsListService,
    public searchQueryService: SearchQueryService,
    public ngZone: NgZone,
    private router: Router,
    private elementRef: ElementRef,
    private messageService: MessageService,
    private appConfig: AppConfig
  ) {
    var ts = new Date();
    this.suggestedTaxonomies = [];

    this.mobHeight = window.innerHeight;
    this.mobWidth = window.innerWidth;
  }

  /**
   *
   */
  ngOnInit() {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.mobWidth = window.innerWidth;
        this.mobHeight = window.innerHeight;
        this.onWindowResize();
      });
    };

    this.observableFields = this.searchFieldsListService.getSearchFields();
    this.syntaxRules = [
      {
        criteria: "Individual terms",
        example: "analytical chemistry",
        description:
          "Records that include either “analytical” or “chemistry” are returned (case insensitive).",
      },
      {
        criteria: "Phrase",
        example: '"analytical chemistry"',
        description:
          "Records that contain the phrase “analytical Chemistry” (the two words adjacent to each other in that order) will be returned (case insensitive).",
      },
      {
        criteria: "Key-Value pair",
        example: "contactPoint.fn=Levine",
        description:
          "Records whose field, contactPoint.fn, contains “Levine” are returned.",
      },
      {
        criteria: "Logical Operation: AND, OR",
        example: "keyword=chemistry AND topic.tag=physics",
        description:
          'Search Results will match the keyword “chemistry” AND topic “physics”. Available operators are AND and OR (all caps). To search words "AND" or "OR", put them in quotes. Operators can only appear between key-value pairs.',
      },
    ];

    this.searchService._watchQueryValue((queryObj) => {
      if (
        queryObj &&
        queryObj.queryString &&
        queryObj.queryString.trim() != ""
      ) {
        this.searchValue = queryObj.queryString;
      } else {
        this.searchValue = "";
      }
    });

    this.searchQueryService._watchShowExamples((showExample) => {
      this.showExampleStatus = showExample;
      this.changeState(showExample);
    });

    this.searchFieldsListService.getSearchFields().subscribe(
      (fields) => {
        this.fields = fields as SelectItem[];
      },
      (err) => {
        console.log("Error getting fields.", err);
      }
    );

    // Init search box size and breadcrumb position
    this.onWindowResize();
    var i = 0;
    const source = timer(1000, 2000);
    source.subscribe((val) => {
      if (i < this.placeHolderText.length) {
        i++;
        this.placeholder = this.placeHolderText[i];
      } else {
        this.placeholder = this.placeHolderText[0];
        i = 0;
      }
    });

    this.appConfig.getConfig().subscribe((conf) => {
      this.SDPAPI = conf.SDPAPI;
      this.imageURL = this.SDPAPI + "assets/images/ngi-background.png";
    });

    this.getTaxonomySuggestions();
  }

  /**
   * When search value changed, convert it to query object and set current query
   * so it can show up in the adv search page
   */
  onSearchValueChange() {
    let query: SDPQuery = this.searchQueryService.buildQueryFromString(
      this.searchValue,
      null,
      this.fields
    );
    query.queryName = this.searchQueryService.getUniqueQueryName();

    if (!_.isEmpty(query)) {
      this.searchQueryService.saveCurrentQueryInfo(
        new CurrentQueryInfo(query, -1, true)
      );
    }

    // this.getTextWidth();
  }

  /**
   * Show/hide syntax rules
   */
  changeState(status: boolean) {
    this.showExampleStatus = status;
    if (this.showExampleStatus) {
      this.currentState = "final";
    } else {
      this.currentState = "initial";
    }
  }

  /**
   * Hide syntax rules and field lookup help
   */
  hideAllHelp() {
    this.showExampleStatus = false;
    this.currentState = "initial";
    this.searchQueryService.setShowExamples(false);
  }

  /**
   * When window resized, we need to resize the search text box and reposition breadcrumb accordingly
   * When top menu bar collapse, we want to place breadcrumb inside the top menu bar
   */
  onWindowResize() {
    if (this.mobWidth > 461) {
      this.searchBottonWith = "10%";
      this.searchTextWidth = 500;
    } else {
      this.searchBottonWith = "100%";
      this.searchTextWidth = 50;
    }

    if (this.mobWidth > 750) {
      this.breadcrumb_top = "6em";
    } else {
      this.breadcrumb_top = "3.5em";
    }
  }

  /**
   *  Clear the search text box
   */
  clearText() {
    var field = <HTMLInputElement>document.getElementById("searchinput");

    if (!Boolean(this._searchValue.trim())) {
      field.value = " ";
    }
  }

  /**
   * Add place holder
   */
  addPlaceholder() {
    var field = <HTMLInputElement>document.getElementById("searchinput");

    if (!Boolean(this._searchValue)) {
      field.value = "";
    }
  }

  /**
   * Get Taxonomy Suggestions
   */
  getTaxonomySuggestions() {
    fetch("assets/autocomplete/parmenides_terms.csv")
      .then((response) => response.text())
      .then((data) => {
        var parsed_data = data.split("\r\n");
        this.parsed_data = [];
        parsed_data.forEach((row) => {
          if (row) {
            this.parsed_data.push(row.split(","));
          }
        });
        this.parsed_data_headers = this.parsed_data.splice(0, 1)[0];
      });
  }

  /**
   * Filter keywords for suggestive search
   * @param event
   */
  filterTaxonomies(event: any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    find(suggTaxonomy, this.parsed_data, this.parsed_data_headers).forEach(
      (element) => {
        this.suggestedTaxonomyList.push(element[0]);
      }
    );

    // this.getTextWidth();
  }

  onEnter(event: KeyboardEvent) {
    // Prevent the default behavior of selecting the first option
    console.log("onEnter");
    event.preventDefault();
    event.stopPropagation();

    // Proceed with search or other actions using the current input value
    this.search(this.searchValue, this.searchTaxonomyKey);
  }

  /**
   *  Clear the search text box
   */
  selectAll() {
    var field = <HTMLInputElement>document.getElementById("searchinput");

    field.select();
  }

  /**
   * Set the search parameters and redirect to search page
   * @param searchValue
   * @param searchTaxonomyKey
   */
  search(searchValue: string, searchTaxonomyKey: string) {
    this.searchTaxonomyKey = searchTaxonomyKey;

    this.searchService.search(searchValue, this.router.url);
  }

  /**
   * Pass Search example popup value to home screen
   * @param popupValue
   */
  setSearchValue(popupValue: string) {
    this._searchValue = popupValue;
    this.onSearchValueChange();
  }

  /**
   * Apeend text to the search box
   * @param field - text to be appended
   * @param op - operator (usually "=")
   * @param overlaypanel - the overlaypanel that is calling. It will be closed after this operation.
   */
  addKeyValuePairToSearchBox(
    event: any,
    field: string,
    overlay1: OverlayPanel,
    overlay2: OverlayPanel
  ) {
    this.currentFieldValue = field;

    overlay2.show(event);
  }

  /**
   * Process input value (popup input dialog)
   * @param inputValue
   * @param overlaypanel
   */
  processInputValue(inputValue: string, overlaypanel: OverlayPanel) {
    let lQueryConstrain: string;
    let lInputValue = inputValue;

    //If input value is empty, display message. Otherwise append the whole constrain to the search box
    if (
      lInputValue == null ||
      lInputValue == undefined ||
      lInputValue.trim() == ""
    ) {
      this.inputValueMissing = true;
    } else {
      this.inputValueMissing = false;

      // Strip quotes
      lInputValue = lInputValue.replace(new RegExp('"', "g"), "");

      if (lInputValue.indexOf(" ") > 0) {
        lInputValue = '"' + lInputValue + '"';
      }

      if (this.currentFieldValue == "searchphrase") {
        lQueryConstrain = lInputValue;
      } else {
        lQueryConstrain = this.currentFieldValue + "=" + lInputValue;
      }

      if (this.searchValue.substr(this.searchValue.length - 1) == " ")
        this.searchValue += lQueryConstrain;
      else {
        if (this.searchValue.substr(this.searchValue.length - 1) == "=") {
          this.searchValue += lQueryConstrain;
        } else {
          this.searchValue += " " + lQueryConstrain;
        }
      }

      this.onSearchValueChange();
      // this.searchQueryService.validateQueryString(this.searchValue);

      if (overlaypanel) overlaypanel.hide();
    }
  }

  /**
   * Apeend text to the search box
   * @param field - text to be appended
   * @param op - operator (usually "=")
   * @param overlaypanel - the overlaypanel that is calling. It will be closed after this operation.
   */
  appendToSearchBox(field: string, op?: string, overlaypanel?: OverlayPanel) {
    // Strip quotes
    field = field.replace(new RegExp('"', "g"), "");

    if (field.indexOf(" ") > 0) {
      field = '"' + field + '"';
    }
    if (this.searchValue.substr(this.searchValue.length - 1) == " ")
      this.searchValue += field;
    else {
      if (this.searchValue.substr(this.searchValue.length - 1) == "=") {
        this.searchValue += field;
      } else {
        this.searchValue += " " + field;
      }
    }

    if (op) this.searchValue = this.searchValue.trim() + op;

    this.onSearchValueChange();

    if (overlaypanel) overlaypanel.hide();
    field = "";
  }

  /**
   * Popup dialog
   * @param event
   * @param overlaypanel - which overlay to popup
   */
  showPopupDialog(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);

    setTimeout(() => {
      this.fieldElement.nativeElement.focus();
    }, 0);
  }

  /**
   * This is for the case when user right click on the search text box. An overlay panel with field value
   * will popup. This function returns overlay panel style based on the screen size.
   */
  overlayStyle() {
    if (this.mobWidth > 461) {
      return { position: "related", left: "50%", "max-width": "800px" };
    } else {
      return { position: "related", left: "50%", "max-width": "400px" };
    }
  }

  /**
   * Return search button class based on screen width
   */
  getSearchBtnClass() {
    if (this.mobWidth > 461) {
      return "bigSearchButton";
    } else {
      return "full-width";
    }
  }

  /**
   * Popup dialog to show query name entry
   * @param event
   * @param overlaypanel
   */
  showQueryNameDialog(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);

    setTimeout(() => {
      this.queryName.nativeElement.focus();
    }, 0);
  }

  /**
   * Save the query string in the search box into query array
   * This will remote execute the save query function in adv-search component
   * @param queryName
   * @param overlaypanel
   */
  saveAdvQuery(queryName: string, overlaypanel: OverlayPanel) {
    if (queryName) {
      this.queryStringErrorMessage =
        this.searchQueryService.validateQueryString(this.searchValue);

      if (this.queryStringErrorMessage != "") this.queryStringError = true;

      this.searchQueryService.saveAdvQueryFromString(
        this.searchValue,
        queryName,
        this.fields
      );
    } else alert("Query name is required.");

    overlaypanel.hide();
  }

  /**
   * Return examples based on currentFieldValue
   */
  getExample() {
    let example = this.examples.filter(
      (ex) => ex.field == this.currentFieldValue
    );
    if (example.length > 0) return example[0].example;
    else return "physics";
  }

  // MARK: 08/21/2024 disabled for now since moving to PrimeNG
  // getTextWidth() {
  //   if (this.mobWidth > 461) {
  //     var test = document.getElementById("autocompleteText");

  //     this.searchTextWidth =
  //       test.clientWidth + 1 < 500
  //         ? 500
  //         : test.clientWidth + 1 > 700
  //         ? 700
  //         : test.clientWidth + 1;
  //   }
  // }

  /**
   * Clear the search box text and reset default value
   */
  clearSearchBox() {
    this.searchValue = "";
    this.queryStringError = false;
    this.searchTextWidth = this.DEFAULT_SEARCHBOX_WIDTH;
  }
  /**
   * Toggle the enhanced search by clicking the button
   */
  toggleEnhancedSearch() {
    this.enhancedSearchButtonColor =
      this.enhancedSearchButtonColor === "gray" ? "#2c539e" : "gray";

    const isEnhancedSearch = this.enhancedSearchButtonColor === "#2c539e";
    const message = isEnhancedSearch
      ? "You can now search across all NIST data sources."
      : "Search is now limited to the current data portal.";
    const severity = isEnhancedSearch ? "success" : "warn";

    this.messageService.add({
      severity: severity,
      summary: "Enhanced Search",
      detail: message,
    });
  }
  showDialog() {
    this.visible = true;
  }
}
