import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef,  ViewChildren } from '@angular/core';
import { SearchService } from '../shared/index';
import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem,OverlayPanelModule, FieldsetModule,PanelModule } from 'primeng/primeng';
import { Config } from '../shared/config/env.config';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';  
import { BrowserModule ,Title} from '@angular/platform-browser';
import { Ng2StickyModule } from 'ng2-sticky';
//import * as jsPDF  from 'jspdf';

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
    //searchResults: any[] = [];
    searchValue:string;
    recordDisplay:any[] = [];
    keyword:string;
    summaryCandidate: any[];
    private _routeParamsSubscription: Subscription;
    findId: string;
    leftmenu: MenuItem[];
    rightmenu: MenuItem[];
    private files: TreeNode[] = [];
    private fileHierarchy : TreeNode;
    metadata: boolean = false;
    private rmmApi : string = Config.RMMAPI;
    private sdpLink : string = Config.SDPAPI;
    private distApi : string = Config.DISTAPI;
    
    private displayIdentifier :string;
    private dataHierarchy: any[]=[];
     similarResources: boolean = false;
     similarResourcesResults: any[]=[];
     qcriteria:string ="";
     selectedFile: TreeNode;
     isDOI = false;
     isEmail = false;
     citeString:string = "";
     type: string = "";     
  /**
   * Creates an instance of the SearchPanel
   *
   */
    constructor(private route: ActivatedRoute, private el: ElementRef,public searchService:SearchService, private titleService: Title) {
    }

  /**
   * If Search is successful populate list of keywords themes and authors
   */

  onSuccess(searchResults:any[]) {
        
        this.recordDisplay = searchResults;
        this.type = this.recordDisplay['@type'];
        this.titleService.setTitle(this.recordDisplay['title']);
        this.createDataHierarchy();
        if(this.recordDisplay['doi'] != undefined && this.recordDisplay['doi'] != "" ){
             this.isDOI = true;
        }
        if(this.recordDisplay['contactPoint'].hasEmail!= undefined && this.recordDisplay['contactPoint'].hasEmail != "")
       this.isEmail = true;
                
        this.updateLeftMenu();
        this.updateRightMenu();
    }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error:any) {
        this.exception = (<any>error).ex;
        this.errorMsg = (<any>error).message;
        this.status = (<any>error).httpStatus;
        this.msgs.push({severity:'error', summary:this.errorMsg + ':', detail:this.status + ' - ' + this.exception});
  }

  searchbyid(searchId:string){
      console.log(searchId);
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
     var itemsMenu: any[] = []; 
      var descItem = this.createMenuItem ("Description","",(event)=>{ 
                   this.metadata = false; this.similarResources =false;
                   window.location.href="#description";
                 },""); 

      var refItem = this.createMenuItem ("References","",(event)=>{
                      this.metadata = false;
                      window.location.href="#reference";
                },"");           

      var filesItem = this.createMenuItem("Files","", (event)=>{    
                     this.metadata = false;
                      window.location.href="#files";
                },"");

      var metaItem = this.createMenuItem("Metadata","",(event)=>{
                    this.metadata = true; this.similarResources =false;},"");    
    
      itemsMenu.push(descItem);
      if(this.checkReferences())
        itemsMenu.push(refItem);
      if(this.files.length != 0)
        itemsMenu.push(filesItem);
      itemsMenu.push(metaItem); 

      this.leftmenu = [{
            label: 'Table of Contents', command: (event)=>{
                    window.location.href="#";},
            items: itemsMenu
        }];
    }
    

createMenuItem(label :string, icon:string, command: any, url : string ){
     let testItem : any = {};
     testItem.label = label;
     testItem.icon = icon;
     if(command != "")
     testItem.command = command;
     if(url != "")
     testItem.url = url;
     return testItem;
}

/**
 * Update right side panel on landing page
 */
    updateRightMenu(){

       var itemsMenu: any[] = [];
       var homepage = this.createMenuItem("Visit Home Page",  "faa faa-external-link", "",this.recordDisplay['landingPage']);
       var download = this.createMenuItem("Download all data","faa faa-download", "",this.distApi+"ds/zip?id="+this.recordDisplay['@id']);

       var metadata = this.createMenuItem("Export Metadata", "faa faa-file-o","",this.rmmApi+"records?@id="+this.recordDisplay['@id']);
        
            
        itemsMenu.push(homepage);
        if (this.files.length != 0)
            itemsMenu.push(download);
        itemsMenu.push(metadata);   
         
      this.rightmenu = [{
            label: 'Access ', 
            items: itemsMenu
        },
        {
            label: 'Use', 
            items: [
                {label: 'Cite this resource',  icon: "faa faa-angle-double-right",command: (event)=>{
                    this.citeString = "";
                    let date =  new Date(); 
                    if(this.recordDisplay['authors'] !=  null){
                        for(let author of this.recordDisplay['authors'])
                        { if(author.familyName != null && author.familyName != undefined) 
                         this.citeString += author.familyName +" ";
                         if(author.givenName != null && author.givenName != undefined) 
                         this.citeString +=  author.givenName+" ";
                         if(author.middleName != null && author.middleName != undefined) 
                         this.citeString += author.middleName;

                         this.citeString +=", "
                        }
                    }else if(this.recordDisplay['contactPoint']){
                        if(this.recordDisplay['contactPoint'].fn != null && this.recordDisplay['contactPoint'].fn != undefined)
                        this.citeString += this.recordDisplay['contactPoint'].fn+ ", ";
                    }
                    if(this.recordDisplay['title']!= null && this.recordDisplay['title']!= 'undefined' )
                        this.citeString += this.recordDisplay['title'] +", ";
                    if(this.recordDisplay['doi']!= null && this.recordDisplay['doi']!= 'undefined' )
                        this.citeString += this.recordDisplay['doi'];
        
                    this.citeString += ", access:"+date;

                    this.showDialog();
              }},
             {label: 'License Statement', icon: "faa faa-external-link",command: (event)=>{
                    window.open(this.recordDisplay['license']);
             }}
           ]
        },{
            label: 'Find',   items: [
                {label: 'Similar Resources',  icon: "faa faa-external-link",
                        command: (event)=>{
                              window.open(this.sdpLink+"/#/search?q=keyword="+this.recordDisplay['keyword']+"&key=&queryAdvSearch=yes");
                  }},
                {label: 'Resources by Authors',icon: "faa faa-external-link",command: (event)=>{
                      let authlist = "";
                      for(let auth of this.recordDisplay['authors'])
                                authlist = authlist+auth.familyName+",";
                            
                            window.open(this.sdpLink+"/#/search?q=authors.familyName="+authlist+"&key=&queryAdvSearch=yes");
                        }
                    }
                        
            ]
        //     label: 'Export Metadata', icon: "Menu", items: [
        //         // {   label: 'PDF',  icon: "faa faa-file-pdf-o",
        //         //     command: (event)=>{ 
        //         //         alert("Coming soon");
        //         //         // var doc = new jsPDF();
        //         //         // var i=0;
        //         //         // for(var key in this.searchResults[0]){
        //         //         // doc.text(20, 10 + i, key + ": " + this.searchResults[0][key]);
        //         //         // i+=10;
        //         //         // }
        //         //         // doc.save('metadata_'+this.searchResults[0].title+'.pdf');
        //         //     }
        //         // },
       
         }
        ];
    }

  /**
     * Get the params OnInit
     */
    ngOnInit() {
        this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
          if (_.includes(window.location.href,'?')) {
              this.searchValue = params['id'];
              console.log("*** test input ? **"+_.split(window.location.href,'/'));
            } else {
                var alength = _.split(window.location.href,'/').length;
              this.searchValue =_.split(window.location.href,'/')[alength-1];
              console.log(" searchvalue TEST id ***"+_.split(window.location.href,'/')[5]);
            }
            this.findId = this.searchValue;//params['id'];
            this.searchbyid(this.findId);
             this.files =[];
        });    
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
        if (this.recordDisplay['dataHierarchy'] == null )
            return; 
        this.fileHierarchy = this.createTreeObj("Files","Files");
        this.fileHierarchy.children =[];
         for(let fields of this.recordDisplay['dataHierarchy']){
                if( fields.downloadURL != null)
                    this.fileHierarchy.children.push(this.createFileNode(fields.filepath, fields.filepath));
                else 
                    if(fields.children != null)
                      this.fileHierarchy.children.push(this.createChildrenTree(fields.children,fields.filepath));       
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
     if(label == "Files") 
     testObj.expanded = true;
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

clicked = false;
expandClick(){
    this.clicked = !this.clicked;
    return this.clicked;
}

clickContact = false;
expandContact(){
    this.clickContact = !this.clickContact;
    return this.clickContact;
}
 display: boolean = false;

    showDialog() {
        this.display = true;
    }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

 checkReferences(){
      if(Array.isArray(this.recordDisplay['references']) ){
          for(let ref of this.recordDisplay['references'] ){
              if(ref.refType == "isDocumentedBy") return true;
          }
      }
 }
}
