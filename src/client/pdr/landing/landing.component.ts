import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { SearchService } from '../shared/index';
import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem,OverlayPanelModule,
  FieldsetModule,PanelModule,ContextMenuModule,
  MenuModule } from 'primeng/primeng';
import { Config } from '../shared/config/env.config';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';
import { BrowserModule ,Title} from '@angular/platform-browser';
import { Ng2StickyModule } from 'ng2-sticky';
import { environment } from '../environment';
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
  findId: string;
  leftmenu: MenuItem[];
  rightmenu: MenuItem[];
  similarResources: boolean = false;
  similarResourcesResults: any[]=[];
  qcriteria:string = '';
  selectedFile: TreeNode;
  isDOI = false;
  isEmail = false;
  citeString:string = '';
  type: string = '';
  process : any[];
  requestedId : string = '';
  isCopied: boolean = false;
  distdownload: string = '';
  serviceApi: string = '';
  metadata: boolean = false;
  pdrApi : string = environment.PDRAPI;
  private _routeParamsSubscription: Subscription;
  private files: TreeNode[] = [];
  private fileHierarchy : TreeNode;
  private rmmApi : string = environment.RMMAPI;
  private sdpLink : string = environment.SDPAPI;
  private distApi : string = environment.DISTAPI;
  private metaApi : string = environment.METAPI;
  private landing : string = environment.LANDING;
  private displayIdentifier :string;
  private dataHierarchy: any[]=[];
  isResultAvailable: boolean = true;

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

    if(searchResults["ResultCount"] === undefined || searchResults["ResultCount"] !== 1)
      this.recordDisplay = searchResults;
    else if(searchResults["ResultCount"] !== undefined && searchResults["ResultCount"] === 1)
      this.recordDisplay = searchResults["ResultData"][0];
    this.type = this.recordDisplay['@type'];
    this.titleService.setTitle(this.recordDisplay['title']);
    this.createDataHierarchy();
    if(this.recordDisplay['doi'] !== undefined && this.recordDisplay['doi'] !== "" )
      this.isDOI = true;
    if(this.recordDisplay['contactPoint'].hasEmail !== undefined && this.recordDisplay['contactPoint'].hasEmail !== "")
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
    //console.log(searchId);
    this.keyword = '';
    let that = this;
    return this.searchService.searchById(searchId)
      .subscribe(
        async searchResults => await that.onSuccess(searchResults),
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
    var descItem = this.createMenuItem ("Description",'',(event)=>{
      this.metadata = false; this.similarResources =false;
    },'');

    var refItem = this.createMenuItem ("References",'',(event)=>{
      this.metadata = false; this.similarResources =false;

    },'');

    var filesItem = this.createMenuItem("Files",'', (event)=>{
      this.metadata = false;
      this.similarResources =false;
    },'');

    var metaItem = this.createMenuItem("Metadata",'',(event)=>{
      this.metadata = true; this.similarResources =false;},'');

    itemsMenu.push(descItem);
    if(this.checkReferences())
      itemsMenu.push(refItem);
    if(this.files.length !== 0)
      itemsMenu.push(filesItem);
    itemsMenu.push(metaItem);

    this.leftmenu = [{
      label: 'Table of Contents',
      command: (event)=>{ window.location.href="#";},
      items: itemsMenu
    }];
  }


  createMenuItem(label :string, icon:string, command: any, url : string ){
    let testItem : any = {};
    testItem.label = label;
    testItem.icon = icon;
    if(command !== '')
      testItem.command = command;
    if(url !== '')
      testItem.url = url;
    return testItem;
  }

  
/**
 * Update right side panel on landing page
 */
    updateRightMenu(){
      
      this.serviceApi = this.landing+"records?@id="+this.recordDisplay['@id']; 
      if(!_.includes(this.landing, "rmm"))
        this.serviceApi = this.landing+this.recordDisplay['ediid'];

      this.distdownload = this.distApi+"ds/zip?id="+this.recordDisplay['@id'];
      //this.distdownload = this.distApi+"/"+this.recordDisplay['@id']+"?format=zip";
      
      var itemsMenu: any[] = [];
      var homepage = this.createMenuItem("Visit Home Page",  "faa faa-external-link", '',this.recordDisplay['landingPage']);
      var download = this.createMenuItem("Download all data","faa faa-file-archive-o", '', this.distdownload);
      var metadata = this.createMenuItem("Export JSON", "faa faa-file-o",'',this.serviceApi);
    
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

                    if(this.recordDisplay['authors'] !==  null && this.recordDisplay['authors'] !==  undefined){

                        for(let author of this.recordDisplay['authors']) { 
                         if(author.familyName !== null && author.familyName !== undefined) 
                            this.citeString += author.familyName +' ';
                         if(author.givenName !== null && author.givenName !== undefined) 
                            this.citeString +=  author.givenName+' ';
                         if(author.middleName !== null && author.middleName !== undefined) 
                            this.citeString += author.middleName;
                         this.citeString +=", ";
                        }
                    } 
                    else if(this.recordDisplay['contactPoint']) {
                        if(this.recordDisplay['contactPoint'].fn !== null && this.recordDisplay['contactPoint'].fn !== undefined)
                        this.citeString += this.recordDisplay['contactPoint'].fn+ ", ";
                    }
                    if(this.recordDisplay['title']!== null && this.recordDisplay['title']!== 'undefined' )
                        this.citeString += this.recordDisplay['title'] +", ";
                    if(this.recordDisplay['doi']!== null && this.recordDisplay['doi']!== 'undefined' )
                        this.citeString += this.recordDisplay['doi'];
                    this.citeString += ", access:"+date;
                    this.showDialog();
              }},
             {label: 'License Statement', icon: "faa faa-external-link",command: (event)=>{
                    window.open(this.recordDisplay['license'],'_self');
             }}
           ]
        },{
            label: 'Find',   items: [
                {label: 'Similar Resources',  icon: "faa faa-external-link",
                        command: (event)=>{
                              window.open(this.sdpLink+"/#/search?q=keyword="+this.recordDisplay['keyword']+"&key=&queryAdvSearch=yes",'search');
                  }},
                {label: 'Resources by Authors',icon: "faa faa-external-link", command: (event)=>{
                let authlist = "";
                if (this.recordDisplay['authors']) {    
                  for(let auth of this.recordDisplay['authors'])
                    authlist = authlist+auth.familyName+",";
                }
                window.open(this.sdpLink+"/#/search?q=authors.familyName="+authlist+"&key=&queryAdvSearch=yes", 'search');
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
      if(_.includes(window.location.href,"ark")){
        var alength = _.split(window.location.href,'/').length;
        this.searchValue ="ark"+decodeURIComponent(_.split(window.location.href,'ark')[1]);

      }
      else if(_.includes(window.location.href,'?')) {
        this.searchValue = params['id'];
      } else {
        var alength = _.split(window.location.href,'/').length;
        this.searchValue =_.split(window.location.href,'/')[alength-1];
        //console.log(" searchvalue TEST id ***"+_.split(window.location.href,'/')[5]);
      }
      //this.onSuccess(this.route.snapshot.data['searchService']);
      this.findId = this.searchValue;//params['id'];
      this.searchbyid(this.findId);
      this.files =[];
    });
  }

  ngOnDestroy() {

    this._routeParamsSubscription.unsubscribe();

  }

  ngAfterViewInit(){

    window.history.replaceState( {} , '#/id/', '/od/id/'+this.searchValue );
  }
  //This is to check if empty
  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }

  createDataHierarchy(){
    if (this.recordDisplay['dataHierarchy'] == null )
      return;
    for(let fields of this.recordDisplay['dataHierarchy']){
      if( fields.filepath != null) {
        if(fields.children != null)
          this.files.push(this.createChildrenTree(fields.children,
            fields.filepath));
        else
          this.files.push(this.createFileNode(fields.filepath,
            fields.filepath));
      }
    }


  }


  createChildrenTree(children:any[], filepath:string){
    let testObj:TreeNode = {};
    testObj= this.createTreeObj(filepath.split("/")[filepath.split("/").length-1],filepath);
    testObj.children=[];
    for(let child of children){
      let fname = child.filepath.split("/")[child.filepath.split("/").length-1];
      if( child.filepath != null) {
        if(child.children != null)
          testObj.children.push(this.createChildrenTree(child.children,
            child.filepath));
        else
          testObj.children.push(this.createFileNode(fname,
            child.filepath));
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
  closeDialog(){
    this.display = false;
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

  isArray(obj : any ) {
    return Array.isArray(obj);
  }

  isObject(obj: any)
  {
    if (typeof obj === "object") {
      return true;
    }
  }
}
