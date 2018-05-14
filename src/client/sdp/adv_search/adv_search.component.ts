import { Component, OnInit, NgZone } from '@angular/core';
import { SelectItem, DropdownModule, ConfirmationService,Message } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import { SearchService } from '../shared/search-service/index';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from '../shared/search-query/data';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { SearchEntity } from '../shared/search-query/search.entity';

import * as _ from 'lodash';
declare var jQuery: any


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-advsearch',
  templateUrl: 'adv_search.component.html',
  styleUrls: ['adv_search.component.css'],
  providers: [ConfirmationService]

})

export class AdvSearchComponent implements OnInit {

    errorMessage: string;
    searchValue:string = '';
    advSearchValue:string[];
    taxonomies: SelectItem[];
    advSearchList: SelectItem[] = [];
    suggestedTaxonomyList: string[];
    suggestedTaxonomies: string[];
    textRotate: boolean = true;
    searchTaxonomyKey: string;
    display: boolean = false;
    displayQueryBuilder: boolean = false;
    queryAdvSearch:string= '';
    showAdvancedSearch: boolean = false;
    showAdvSearchBuilder: boolean = false;
    queryName:string='';
    showQueryName:boolean = false;
    rows: any[] = [];
    fields: SelectItem[];
    duplicateQuery:boolean = false;
    ALL:string='ALL FIELDS';
    showDeleteButton:boolean = false;
    operators:SelectItem[];
    searchEntities: SearchEntity[] = [];
    selectedAdvSearch : string = '';
    queryValue: string[];
    editQuery:boolean = false;
    mobHeight: number;
    mobWidth: number;
    width:string;
    isActive: boolean = true;
    filterClass:string = "ui-g-12 ui-md-9 ui-lg-9";
    resultsClass:string = "ui-g-12 ui-md-9 ui-lg-9";
    msgs: Message[] = [];
    queryNameReq:boolean = false;



  displayFields: any[] = ['Authors', 'contactPoint', 'description', 'DOI', 'Keyword' , 'Publisher', 'Rights' , 'Theme',
                            'Title'];
  /**
   * Create an instance of services for Home
   */
  constructor(ngZone:NgZone,public taxonomyListService: TaxonomyListService, public searchFieldsListService :
    SearchFieldsListService, public searchService:SearchService, private router:Router,public searchQueryService: SearchQueryService, private confirmationService: ConfirmationService) {
    this.taxonomies = [];
    this.fields = [];
    setTimeout(() => {
      this.getSearchQueryList();
      console.log("+++++++++++length+++++++" + this.searchEntities.length);
    },1000);

    setTimeout(() => {
      this.advSearchList.push({label:'Create New', value:'add'})
      for (let resultItem of this.searchEntities) {
        if (!_.isEmpty(resultItem.data.queryName)) {
          console.log("query name++++++" + resultItem.data.queryName);
          this.advSearchList.push({label: resultItem.data.queryName, value: resultItem.data.queryName});
        }
      }
    },1000);

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

  deleteConfirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      accept: () => {
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        this.deleteAdvSearchQuery();
        this.displayQueryBuilder = false;
      },
      reject: () => {
      }
    });
  }

  cancelConfirm() {
    this.confirmationService.confirm({
      message: 'Do you want to cancel this request?',
      header: 'Cancel Confirmation',
      accept: () => {
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        this.cancelAdvSearchQuery();
      },
      reject: () => {
      }
    });
  }

  resetConfirm() {
    this.confirmationService.confirm({
      message: 'Do you want to reset this record?',
      header: 'Reset Confirmation',
      accept: () => {
        this.showAdvSearch(this.queryName,true);
      },
      reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  removeItem(row:any) {
    console.log("row" + JSON.stringify(row));
    let dataId: any;
    // convert the map to an array
    let delRow = this.searchEntities.indexOf(row);
    this.searchEntities.splice(delRow,1);
    this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
    this.getSearchQueryList();
    this.displayQueryBuilder = false;
  }

  getSearchQueryList() {
    this.searchQueryService.getAllSearchEntities().then(function (result) {
    this.searchEntities = result;
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
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
   *
   */
  ngOnInit() {
    //jQuery('.element').atrotating();
    this.getTaxonomies();
    this.getSearchFields();
    this.rows =  [];
    this.searchOperators();
    var placeHolder = ['Kinetics database', 'Gallium', '"SRD 101"', 'XPDB', 'Interatomic Potentials'];
    var i=0;
    var loopLength=placeHolder.length;
    setInterval(function(){
      if(i<loopLength){
        var newPlaceholder = placeHolder[i];
        i++;
        jQuery('#advsearchinput').attr('placeholder',newPlaceholder);
      } else {
        jQuery('#advsearchinput').attr('placeholder',placeHolder[0]);
        i=0;
      }
    },2000);
  }

  /**
   * Set the display to show the examples dialog
   */
   showDialog() {
        this.display = true;
   }

   displayBuilder() {
     this.displayQueryBuilder = true;
     this.queryName = '';
     this.rows = [];
   }

  /**
   * Set the display to show the examples dialog
   */
  showAdvSearch(queryName:any,editQuery:boolean) {
    if (editQuery) {
      this.queryName = queryName;
      this.editQuery = editQuery;
    }
      console.log("adv search----" + JSON.stringify(this.searchEntities));
      this.displayQueryBuilder = true;
      this.rows = [{}];
      let k = 1;
      for (let resultItem of this.searchEntities) {
        if (queryName == resultItem.data.queryName) {
          this.searchValue = resultItem.data.queryValue;
          this.queryValue = resultItem.data.queryValue.split('&');
          console.log("query value++ " + this.queryValue);
          for (var i = 0; i < this.queryValue.length; i++) {
            if (i == 0) {
              this.rows[i] = [{}];
              let row = this.queryValue[i].split('=');
              if (row[0].includes('searchphrase')) {
                this.rows[i].column3 = 'All'
              } else {
                this.rows[i].column3 = row[0];
              }
              this.rows[i].column2 = row[1];
            }

            if (i != 0) {
              if (i % 2 != 0) {
                  this.rows[k] = [{}];
                  let row = this.queryValue[i].split('=');
                  this.rows[k].column1 = row[1];
                  i++;
                  row = this.queryValue[i].split('=');
                  if (row[0].includes('searchphrase')) {
                    this.rows[k].column3 = 'All'
                  } else {
                    this.rows[k].column3 = row[0];
                  }
                  this.rows[k].column2 = row[1];
                  k++;
              }
            }
          }
        }
      }
  }
  /**
   * Advanced Search builder string
   */

   saveSearch() {
      this.searchValue = '';
      this.queryAdvSearch = 'yes';
      for (let i = 0; i < this.rows.length; i++) {
        if (typeof this.rows[i].column1 === 'undefined') {
          this.rows[i].column1 = 'AND';
        }
        if (typeof this.rows[i].column3 === 'undefined' || this.rows[i].column3 === 'All') {
          this.rows[i].column3 = 'searchphrase';
        }
        if (typeof this.rows[i].column2 === 'undefined') {
          this.rows[i].column2 = '';
        }

        let fieldValue: string;
        fieldValue = this.rows[i].column3;
        fieldValue = fieldValue.replace(/\s+/g, '');

        if (i > 0) {
          this.searchValue += '&logicalOp=' + this.rows[i].column1 + '&' + fieldValue + '=' + this.rows[i].column2;
        } else {
          if (!_.isEmpty(fieldValue) || !_.isEmpty(this.rows[i].columns)) {
            this.searchValue += fieldValue + '=' + this.rows[i].column2;
          }
        }
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
   * Set the display to show the examples dialog
   */
  toggleTextRotate() {
    console.log("hello" + this.textRotate);
    if (this.searchValue == "") {
      this.textRotate = !this.textRotate;
    }
  }

  /**
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event:any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for(let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if(keyw.toLowerCase().indexOf(suggTaxonomy.trim().toLowerCase()) >= 0) {
        this.suggestedTaxonomyList.push(keyw);
      }
    }
  }


  /**
   * Taxonomy items list
   */
  toTaxonomySuggestedItems(taxonomies:any[]) {
    let items: string[] = [];
    for (let taxonomy of taxonomies) {
      items.push(taxonomy.label);
    }
    return items;
  }

  /**
   * Taxonomy items list
   */
  toTaxonomiesItems(taxonomies:any[]) {
    let items: SelectItem[] = [];
    items.push({label: 'ALL RESEARCH', value: ''});
    for (let taxonomy of taxonomies) {
      items.push({label: taxonomy.label, value: taxonomy.label});
    }
    return items;
  }

  /**
   * Get database fields for Advanced Search builder
   */
  getSearchFields() {
      this.searchFieldsListService.get()
        .subscribe(
          fields => this.fields = this.toFieldItems(fields),
          error =>  this.errorMessage = <any>error
        );
  }

  /**
   * Advanced Search fields dropdown
   */
  toFieldItems(fields:any[]) {
    let items :SelectItem[] = [];
    items.push({label:this.ALL, value:'All'});
    let fieldItems: SelectItem[] = [];
    for (let field of fields) {
      if (_.includes(field.tags,'searchable')) {
        fieldItems.push({label: field.label, value: field.name});
      }
    };
    fieldItems = _.sortBy(fieldItems, ['label','value']);
    fieldItems.unshift({label:this.ALL, value:'All'});

    return fieldItems;
  }

  /**
   * Define Search operators for the drop down
   */
  searchOperators() {
    this.operators = [];
    this.operators.push({label:'AND', value:'AND'});
    this.operators.push({label:'OR', value:'OR'});
    this.operators.push({label:'NOT', value:'NOT'});
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue:string,searchTaxonomyKey:string,queryAdvSearch:string) {
      this.searchTaxonomyKey = searchTaxonomyKey;
      let params:NavigationExtras = {
        queryParams: { 'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey:'',
          'queryAdvSearch':this.queryAdvSearch}
      };

      this.router.navigate(['/search'], params);
  }

  /**
   * Display advanced search block
   */
  advancedSearch(advSearch: boolean) {
    this.showAdvancedSearch = advSearch;
  }

  /**
   *  Pass Search example popup value to home screen
   */
  searchExample (popupValue:string) {
    this.display = false;
    this.searchValue = popupValue;
    this.textRotate = !this.textRotate;
  }

  /**
   * Add rows - Advanced Search block
   */
  addRow () {
    let rows = [...this.rows,{}];
    this.rows = rows;
     //this.showDeleteButton = true;
  }

  /**
   * Delete rows - Advanced Search block
   */

  deleteRow (rowIndex:number) {
    this.rows = this.rows.filter((val,i) => i!=rowIndex);
    this.saveSearch();
  }

  /**
   * Delete rows - Advanced Search block
   */

  copyRow (row:any[]) {
    let rows = [...this.rows,this.clone(row)];
    //let rows = [...this.rows,row];
    this.rows = rows;
  }

  clone(obj){
    if(obj == null || typeof(obj) != 'object')
      return obj;

    var temp = new obj.constructor();
    for(var key in obj)
      temp[key] = this.clone(obj[key]);

    return temp;
  }

  clearText(){
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this.searchValue.trim())) {
      field.value = ' ';
    }
  }

  addPlaceholder() {
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this.searchValue)) {
      field.value = '';
    }
  }

  displayQuery () {
    this.showQueryName = true;
    this.queryNameReq = false;
    //data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName};
    //this.searchQueryService.saveAdvSearchQuery(data);

  }

  copyQuery (queryValue:string) {
    this.showQueryName = true;
    this.searchValue = queryValue;
    //data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName};
    //this.searchQueryService.saveAdvSearchQuery(data);

  }

  exportList()
  {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(this.searchEntities));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'NIST-SDP-Queries.json';
    hiddenElement.click();
  }

  importList(event) {
    var files = event.srcElement.files;
    files = files[0];
    var dataFile = [];
    var read:FileReader = new FileReader();
    read.readAsText(files);
    read.onloadend = function(){
      let fileData = read.result;
      let fileJson = JSON.parse(fileData);
      for (let i in fileJson) {
        let dataset = fileJson[i].data;
        var dataQuery = JSON.stringify(dataset)
        dataFile.push(dataQuery);
      }
    }
    setTimeout(() => {
      for (let i=0;i<dataFile.length;i++) {
        let data = dataFile[i];    //voila!
        console.log(data);

       this.searchQueryService.saveSearchQuery(JSON.parse(data));
        console.log(data);
      }
    }, 100);
    setTimeout(() => {
      this.getSearchQueryList();
      console.log("+++++++++++length+++++++" + this.searchEntities.length);
    },100);
  }

  saveAdvSearchQuery (queryName:any,editQuery:boolean) {
    if (editQuery) {
      queryName = this.queryName;
    }
    if (_.isEmpty(queryName)) {
      this.queryNameReq = true;
    } else  {
      console.log("query name--" + queryName);
      console.log("query value--" + this.searchValue);
      this.getSearchQueryList();
      this.duplicateQuery = false;
      for (let resultItem of this.searchEntities) {
        if (queryName == resultItem.data.queryName) {
          this.duplicateQuery = true;
        }
      }
      if (!this.duplicateQuery) {
          let data : Data;
          var date  = new Date();
          data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName,'date': date.getTime()};
          this.searchQueryService.saveSearchQuery(data);
          this.getSearchQueryList();
          this.showQueryName = false;
          this.duplicateQuery = false;
        }
      this.queryNameReq = false;
    }
  }

  deleteAdvSearchQuery () {
    this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != this.queryName);
    this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
    this.rows = [];
  }

  cancelAdvSearchQuery () {
    this.rows = [];
    this.displayQueryBuilder = false;
  }

  resetAdvSearchQuery(){
    for (let resultItem of this.searchEntities) {
      if (this.selectedAdvSearch.includes(resultItem.data.queryName)) {
        this.queryValue = resultItem.data.queryValue.split('&');
        console.log("query value++ " + this.queryValue);
        for (var i = 0; i < this.queryValue.length; i++) {
            this.rows[i] = [{}];
        }
      }
    }
  }
}
