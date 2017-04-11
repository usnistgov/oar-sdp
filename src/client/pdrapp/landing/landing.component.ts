import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef,  ViewChildren } from '@angular/core';
import { SearchService } from '../shared/index';


import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
import { Config } from '../shared/config/env.config';
import { HeadbarComponent } from '../shared/index';
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
    keyword:string;
    summaryCandidate: any[];
    private _routeParamsSubscription: Subscription;
    findId: string;
    private leftmenu: MenuItem[];
    private rightmenu: MenuItem[];
    private files: TreeNode[] = [];
    private fileHierarchy : TreeNode;
    metadata: boolean = false;
    private rmmApi : string = Config.RMMAPI;
    private displayIdentifier :string;
    private dataHierarchy: any[]=[];
    

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
        this.createDataHierarchy();
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
                {label: 'References', icon:"Submenu", command: (event)=>{alert("Test References");
                    window.location.href="#reference";
                   
                }},
                {label: 'Inventory', icon:"Submenu", command: (event)=>{alert("Test References");
                    window.location.href="#inventory";
                   
                }
                }
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
            label: 'Other',  icon: "Menu",
            items: [
                {label: 'Related Resources',icon: "Submenu",  url:""},
                {label: 'Metadata',  icon: "Submenu", command: (event)=>{this.metadata = true;}},
                {label: 'History', icon: "Submenu",url:""}
            ]
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
                {label: 'Add All to DataCart', icon: "fa-cart-arrow-down",command: (event)=>{
                   alert("Coming soon...");}
                }
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
                {label: 'Google Analytics',  icon: "fa-external-link",url:""},
                {label: 'Service Logs',icon: "fa-external-link",command: (event)=>{
                    alert("Coming soon ...");
                  }}
               
            ]
        },
        {
            label: 'Find',  icon: "Menu", items: [
                {label: 'Similar Resources',  icon: "fa-external-link",url:this.rmmApi+"?searchphrase="},
                {label: 'Resources by Authors',icon: "fa-external-link",url:""},
                {label: 'Data,Sites,Tools', icon: "fa-external-link",url:""}
            ]
        },
        {
            label: 'Export Metadata', icon: "Menu", items: [
                {label: 'PDF',  icon: "fa-file-pdf-o",url:""},
                {label: 'POD JSON', icon: "fa-file-o",url:"https://www.nist.gov/sites/default/files/data.json"},
                {label: 'Extended JSON', icon: "fa-file-o",url:this.rmmApi}
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


// Create Files Structure to browse throw files
 createDataHierarchy(){
      
        this.fileHierarchy = this.createTreeObj("Files","Files");
        this.fileHierarchy.children =[];
        for(let record of this.searchResults){
            //console.log(record.dataHierarchy[0]);
            //this.fileHierarchy.children.push(this.createChildrenTree(record.dataHierarchy[0].children, record.dataHierarchy[0].filepath);
            for(let fields of record.dataHierarchy){
                
                    if( fields.downloadURL != null)
                    this.fileHierarchy.children.push(this.createFileNode(fields.filepath, fields.filepath));
                     else 
                      if(fields.children != null)
                      this.fileHierarchy.children.push(this.createChildrenTree(fields.children,fields.filepath));
                    
            }
        }
        this.files.push(this.fileHierarchy);
     }
  createChildrenTree(children:any[], filepath:string){
    let testObj:TreeNode = {};
    testObj= this.createTreeObj(filepath,filepath);
    testObj.children=[];
    //console.log(children);
    for(let child of children){
        let fname = child.filepath.split("/")[child.filepath.split("/").length-1]
         if(child.downloadURL != null){
              testObj.children.push(this.createFileNode(fname, child.filepath));
         }else if(child.children != null){
           testObj.children.push(this.createChildrenTree(child.children,fname));
         }
     }
     return testObj;
  }


  createTreeObj(label :string, data:string){
     let testObj : TreeNode = {}; 
     testObj = {};
     testObj.label = label;
     testObj.data = data;
     testObj.expandedIcon = "fa-folder-open";
     testObj.collapsedIcon =  "fa-folder";
     return testObj;
  }
 createFileNode(label :string, data:string){
     let endFileNode:TreeNode = {};
     endFileNode.label = label;
     endFileNode.data = data;
     endFileNode.icon = "fa-file-o";
     return endFileNode;

 }

}
