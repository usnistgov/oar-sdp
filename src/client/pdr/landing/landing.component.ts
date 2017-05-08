import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef,  ViewChildren } from '@angular/core';
import { SearchService } from '../shared/index';
import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
import { Config } from '../shared/config/env.config';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import * as jsPDF  from 'jspdf';
//let jsPDF = require('jspdf');
declare var Ultima: any;
declare var jQuery: any;

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
     similarResources: boolean = false;
     similarResourcesResults: any[]=[];
     qcriteria:string ="";
     selectedFile: TreeNode;
     isDOI = false;


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
  console.log("On success");
        this.searchResults = searchResults;
        this.createDataHierarchy();
        //alert(this.searchResults);
        if(this.searchResults[0].doi != "" ){
            this.isDOI = true;
        }
        console.log(this.searchResults[0]["@id"]);
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


onSuccessAny(searchResults:any[]) {
        this.similarResourcesResults = searchResults; }
  /**
   * If search is unsuccessful push the error message
   */
  onErrorAny(error:any[]) {
        this.similarResourcesResults = [];
        this.exception = (<any>error).ex;
        this.errorMsg = (<any>error).message;
        this.status = (<any>error).httpStatus;
        this.msgs.push({severity:'error', summary:this.errorMsg + ':', detail:this.status + ' - ' + this.exception});
  }
    searchRMMAny(anyparam:string){
        let that = this;
        return this.searchService.searchRMMAny(anyparam)
            .subscribe(
            similarResourcesResults => that.onSuccessAny(similarResourcesResults),
            error => that.onErrorAny(error)
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
            label: 'Overview', icon: "Menu",command: (event)=>{
                    window.location.href="#";},
            items: [
                {label: 'Record', icon:"Submenu", command: (event)=>{
                     window.open("./#/landing?id="+encodeURIComponent(this.searchResults[0]["@id"]));
                }},
                {label: 'References', icon:"Submenu", command: (event)=>{
                    //window.location.href="./#/landing?id="+encodeURIComponent(this.searchResults[0]["@id"])+"#reference";
                     window.location.href="#reference";
                }},
                {label: 'Inventory', icon:"Submenu", command: (event)=>{
                    window.location.href="#inventory";
                }}
            ]
        },
        {
            label: 'Tools',  icon: "Menu",
            items: [
                {label: 'Searchpage', icon:"Submenu", command: (event)=>{
                        alert("Shows 'searchpage', if any associated with the record.");
                    //window.location.href=encodeURIComponent(this.searchResults[0]["searchpage"]);
                    }
                },
                {label: 'API', icon:"Submenu", command: (event)=>{
                        alert("Shows 'API', if any associated with the record.");
                      //window.location.href=encodeURIComponent(this.searchResults[0]["api"]);
                    }
                }
            ]
        },
        {
            label: 'Other',  icon: "Menu",
            items: [
                {label: 'Related Resources',icon: "Submenu",  url:""},
                {label: 'Metadata',  icon: "Submenu", command: (event)=>{this.metadata = true; this.similarResources =false;}},
                {label: 'Open Data Schema', icon: "Submenu",url:"https://project-open-data.cio.gov/v1.1/schema/"}
            ]
        }
        ];
    }
    
/**
 * Update right side panel on landing page
 */
    updateRightMenu(){
      this.rightmenu = [{
            label: 'Access', 
            items: [
                {label: 'Visit Home Page',  icon: "faa faa-external-link",command: (event)=>{
                    window.open(this.searchResults[0].landingPage);
                  //alert("Test References"+this.searchResults[0].license);
                }},
                {label: 'Download all data', icon: "faa faa-download"},
                {label: 'Add All to DataCart', icon: "faa faa-cart-arrow-down",command: (event)=>{
                   alert("Coming soon...");}
                }
            ]
        },
        {
            label: 'Use', 
            items: [
                {label: 'Cite this resource',  icon: "faa faa-angle-double-right",command: (event)=>{
                    let citeString = "";
                    if(this.searchResults[0].authors !=  null){
                        for(let author of this.searchResults[0].authors)
                        { citeString += author.fn +",";}
                    }

                    citeString += this.searchResults[0].title +",";
                    citeString += this.searchResults[0].doi;
                    alert("Copy following to cite the resource: \n\n"+citeString);
                    //window.open(this.searchResults[0].license);
                  }},
                {label: 'Access Details', icon: "faa faa-angle-double-right",command: (event)=>{
                    let accessString = "Access level is:";
                    accessString += this.searchResults[0].accessLevel;
                    alert(accessString);
                    ;}},
                {label: 'License Statement', icon: "faa faa-copyright",command: (event)=>{
                    window.open(this.searchResults[0].license);
                  }}
            ]
        },
        {
            label: 'Metrices',   items: [
                {label: 'Google Analytics',  icon: "faa faa-external-link",url:""},
                {label: 'Service Logs',icon: "faa faa-external-link",command: (event)=>{
                    alert("Coming soon ...");
                  }}              
            ]
        },
        {
            label: 'Find',   items: [
                {label: 'Similar Resources',  icon: "faa faa-external-link",
                        command: (event)=>{
                             this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
                             this.searchRMMAny('keyword='+this.searchResults[0].keyword+"&include=title,@id");
                           });
                           this.qcriteria = "Similar Resources By Keyword";
                            this.similarResources = true;
                            this.metadata = false;
                        //window.open(this.rmmApi+"?keyword="+this.searchResults[0].keyword);
                  }},
                {label: 'Resources by Authors',icon: "faa faa-external-link",command: (event)=>{
                             this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
                             let authlist = "";
                             for(let auth of this.searchResults[0].authors)
                                authlist = authlist+auth.familyName+",";
                             this.searchRMMAny('authors.familyName='+authlist+"&include=title,@id");
                           });
                        this.qcriteria = "Similar Resources By Author";   
                        this.similarResources = true;
                        this.metadata = false;}},
                {label: 'Data,Sites,Tools', icon: "faa faa-external-link",command: (event)=>{
                    alert("Coming soon ...");
                  }}
            ]
        },
        {
            label: 'Export Metadata', icon: "Menu", items: [
                {   label: 'PDF',  icon: "faa faa-file-pdf-o",
                    command: (event)=>{ var doc = new jsPDF();
                        var i=0;
                        for(var key in this.searchResults[0]){
                        doc.text(20, 10 + i, key + ": " + this.searchResults[0][key]);
                        i+=10;
                        }
                        doc.save('metadata_'+this.searchResults[0].title+'.pdf');
                    }
                },
                {label: 'POD JSON', icon: "faa faa-file-o", command: (event)=>{ alert("Coming soon ...");}},
                {label: 'Extended JSON', icon: "faa faa-file-o",command: (event)=>{
                        window.open(this.rmmApi+"records?@id="+this.searchResults[0]['@id']);
                    }
                }
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
        if (this.searchResults[0].dataHierarchy == null )
        return;
        this.fileHierarchy = this.createTreeObj("Files","Files");
        this.fileHierarchy.children =[];
        for(let record of this.searchResults){
            //console.log(record);
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
    testObj= this.createTreeObj(filepath.split("/")[filepath.split("/").length-1],filepath);
    testObj.children=[];
    //console.log(children);
    for(let child of children){
        let fname = child.filepath.split("/")[child.filepath.split("/").length-1]
        
         if(child.downloadURL != null){
              testObj.children.push(this.createFileNode(fname, child.filepath));
         }else if(child.children != null){
           testObj.children.push(this.createChildrenTree(child.children,child.filepath));
         }
     }
     return testObj;
  }
  createTreeObj(label :string, data:string){
     let testObj : TreeNode = {}; 
     testObj = {};
     testObj.label = label;
     testObj.data = data;
     testObj.expandedIcon = "faa faa-folder-open";
     testObj.collapsedIcon =  "faa faa-folder";
     return testObj;
  }
 createFileNode(label :string, data:string){
     let endFileNode:TreeNode = {};
     endFileNode.label = label;
     endFileNode.data = data;
     endFileNode.icon = "faa faa-file-o";
     endFileNode.expandedIcon = "faa faa-folder-open";
     endFileNode.collapsedIcon =  "faa fa-folder";
     return endFileNode;
 }
 fileDetails:string="";
 isFileDetails: boolean = false;
 nodeSelect(event) {
      for(let record of this.searchResults){
        var test = this.getComponentDetails(record.components,event.node.data);
        let i =0;
        this.fileDetails ="";
        for(let t of test){
            this.isFileDetails = true;
            this.fileDetails = t; 
        }
     }
  }

getComponentDetails(data,filepath) {
  return data.filter(
      function(data){return data.filepath == filepath }
  );
}
keys() : Array<string> {
    return Object.keys(this.fileDetails);
  }


}
