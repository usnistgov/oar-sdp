import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef,  ViewChildren } from '@angular/core';
import { SearchService } from '../shared/index';


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
    selector: 'pdr-landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css'],
    providers:[SearchService]
    
})


export class LandingPanelComponent implements OnInit, OnDestroy {
   
  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  profileMode: string = 'inline';
    msgs: Message[] = [];
    exception : string;
    errorMsg: string;
    status: string;
    errorMessage: string;
    errorMessageArray: string[];
    searchResults: any[] = [];
    searchValue:string;
    filteredResults:any[] = [];
    keyword:string;
    summaryCandidate: any[];
    private _routeParamsSubscription: Subscription;
    findId: string;
    private leftmenu: MenuItem[];
    private rightmenu: MenuItem[];
    private files: TreeNode[];

  /**
   * Creates an instance of the SearchPanel
   *
   */
    constructor(private route: ActivatedRoute, private el: ElementRef,public searchService:SearchService) {
    }

  /**
   * If Search is successful populate list of keywords themes and authors
   */

  onSuccess(searchResults:any[]) {
  
        this.searchResults = searchResults;
        this.filteredResults = searchResults;
       // alert("on success :"+this.searchResults[0]);
       // this.createInventoryHierarachy(this.searchResults);

    }

 sortResults(){

 }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error:any[]) {
        this.searchResults = [];
        this.exception = (<any>error).ex;
        this.errorMsg = (<any>error).message;
        this.status = (<any>error).httpStatus;
        this.msgs.push({severity:'error', summary:this.errorMsg + ':', detail:this.status + ' - ' + this.exception});
  }

  searchbyid(searchId:string){
        this.keyword = '';
        let that = this;
        return this.searchService.searchById(searchId)
            .subscribe(
            searchResults => that.onSuccess(searchResults),
            error => that.onError(error)
            );
  }
  
    encodeString(url:string,param:string) {
      var urlString = url + encodeURIComponent(param);
      window.open(urlString);
    }

    openURL(url:string) {
       window.open(url);
    }

/**
 * Update Leftside menu on landing page
 */
    updateLeftMenu(){
        
      this.leftmenu = [{
            label: 'Overview', icon: "Menu",
            items: [
                {label: 'References', icon:"Submenu", command: (event)=>{alert("Test References");}},
                {label: 'Inventory', icon:"Submenu"}
            ]
        },
        {
            label: 'Tools',  icon: "Menu",
            items: [
                {label: 'Searchpage', icon: "fa-search", url:""},
                {label: 'API', icon: "fa-file-code-o",url:""}
            ]
        },
        {
            label: 'Related Resources', icon: "Menu", routerLink:""
        },
        {
            label: 'Metadata',  icon: "Menu",url:""
            
        },
        {
            label: 'History', icon: "Menu",url:""
        }
        ];
    }
    
/**
 * Update right side panel on landing page
 */
    updateRightMenu(){
      this.rightmenu = [{
            label: 'Access', icon: "Menu",
            items: [
                {label: 'Visit Home Page',  icon: "fa-external-link",command: (event)=>{
                    window.open(this.searchResults[0].landingPage);
                  //alert("Test References"+this.searchResults[0].license);
                }},
                {label: 'Download all data', icon: "fa-download"},
                {label: 'Add All to DataCart', icon: "fa-cart-arrow-down"}
            ]
        },
        {
            label: 'Use', icon: "Menu",
            items: [
                {label: 'Cite this resource',  icon: "fa-angle-double-right",url:""},
                {label: 'Access Details', icon: "fa-angle-double-right",url:""},
                {label: 'License Statement', icon: "fa-copyright",command: (event)=>{
                    window.open(this.searchResults[0].license);
                  }}
            ]
        },
        {
            label: 'Metrices',  icon: "Menu", items: [
                {label: 'Similar Resources',  icon: "fa-external-link",url:"http://10.200.222.250:8082/oar-rmm-service/records?searchphrase="},
                {label: 'Resources by Authors',icon: "fa-external-link",url:""},
                {label: 'Data,Sites,Tools', icon: "fa-external-link",url:""}
            ]
        },
        {
            label: 'Export Metadata', icon: "Menu", items: [
                {label: 'PDF',  icon: "fa-file-pdf-o",url:""},
                {label: 'POD JSON', icon: "fa-file-o",url:"https://www.nist.gov/sites/default/files/data.json"},
                {label: 'Extended JSON', icon: "fa-file-o",url:"http://10.200.222.250:8082/oar-rmm-service/records"}
            ]
            
        }
        ];
    }

  /**
     * Get the params OnInit
     */
    ngOnInit() {

       
        this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
          if (_.includes(window.location.href,'?')) {
               
              // this.searchValue =params['q'];
              // this.searchTaxonomyKey=params['key'];
              // this.queryAdvSearch = params['queryAdvSearch'];
              // this.getTaxonomies();
            } else {
              this.searchValue =_.split(window.location.href,'/')[5];
            
            }
            this.findId = params['id'];
            this.searchbyid(this.findId);
             this.files =[];
            //this.searchService.readSampleData().then(files => this.files = files);
           
             this.createTestObj();
             this.files.push(this.testObj);
            //this.search(this.searchValue,this.searchTaxonomyKey,this.queryAdvSearch,this.summaryPageOpen);
        });

        this.updateLeftMenu();
        this.updateRightMenu();
        
    }

    ngOnDestroy() {
          this._routeParamsSubscription.unsubscribe();
    }
    //This is to check if empty
    isEmptyObject(obj) {
      return (Object.keys(obj).length === 0);
    }

   /***Collect some data from searchresults */



    /****This is all trial code */

   private testObj:TreeNode;
   private test2obj:TreeNode;
   createTestObj(){
     this.test2obj = {
            "label": "New2Documents",
            "data": "Documents Folder",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [{
                    "label": "Work",
                    "data": "Work Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
                },
                {
                    "label": "Home",
                    "data": "Home Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
                }]
        };
     this.testObj = {};
     this.testObj.label = "New Document Test";
     this.testObj.data = "Description of data";
     this.testObj.expandedIcon = "fa-folder-open";
     this.testObj.collapsedIcon =  "fa-folder";
     this.testObj.children=[];

     this.testObj.children.push(this.test2obj);
   }


  collectComponents(searchResults:any[]) {
    let components :TreeNode[] = [];
    let componentsArray:string[] = [];
    let resultItemComp:string[] = [];
    for (let resultItem of searchResults) {
      if(resultItem.components && resultItem.components !== null && resultItem.components.length > 0) {
        for (let resultItemComponents of resultItem.components) {
            let comp = resultItemComponents['@type'][0];
            let compType = _.split(comp, ':')[1];
            let compTypeFinal = _.split(compType, ':')[1];
           
          
        }
      }
    }
    return components;
  }


 private FileTreeStructure:TreeNode = {};

  ////This is specific for NERDm data
  createInventoryHierarachy(forCol:string){
      let inventoryrootList:string[] =[];
        
      for (let resultItem of this.searchResults) {
        if(resultItem.inventory && resultItem.inventory !== null && resultItem.inventory.length > 0) {
          //inventoryrootList = resultItem.inventory[0];
          //  for(let childCollection of resultItem.inventory[0].childCollections){
          //   //   this.createTreeStructure(childCollection);
          //   //  compHierarchy.push(this.createTreeObj(childCollection, childCollection));
          //   //  this.files.push(this.createTreeObj(childCollection, childCollection));
          // }
          for(let inventoryItem of resultItem.inventory){
            
            if(inventoryItem.forCollection == "" && inventoryItem.childCollection !== null){
                this.FileTreeStructure = this.createTreeObj("Data","Root of Data");
                this.FileTreeStructure.children = [];
            }else{

                if(inventoryItem.forCollection !== null && inventoryItem.forCollection == forCol && inventoryItem.childCollection == null){
                    //this.createTreenode from the file from components
                    return;
                }
                //this.createTreeObj(inventoryItem.forCollection,inventoryItem.forCollection)
                if(inventoryItem.childCollection !== null){
                    for(let subCollection of inventoryItem.childCollection)
                    {
                        this.createInventoryHierarachy(subCollection);
                    }
                }
            }
          }
        }
      }
  }


  


  checkifsubcollection(filepath:string){
      if(filepath.indexOf("/")>0) return true
  }
  checkiffolderExists(foldername:string){
      return foldername.split("/");
  }

  createTreeObj(label :string, data:string){
     this.testObj = {};
     this.testObj.label = label;
     this.testObj.data = data;
     this.testObj.expandedIcon = "fa-folder-open";
     this.testObj.collapsedIcon =  "fa-folder";
     return this.testObj;
  }


}
