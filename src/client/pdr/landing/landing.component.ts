import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
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

import { SearchResolve } from "./search-service.resolve";
import { error } from 'selenium-webdriver';
import { ResComponents, DataHierarchy } from "./datacomponents";

//import * as jsPDF  from 'jspdf';
declare var Ultima: any;
declare var jQuery: any;

interface reference {
    refType? : string,
    "@id"? : string,
    label? : string,
    location? : string
}

function compare_versions(a: string, b: string) : number {
    let aflds : any[] = a.split(".");
    let bflds : any[] = b.split(".");
    let toint = function(el, i, a) {
        let e = null;
        try {
            return parseInt(el);
        } catch (e) {
            return el;
        }
    }
    aflds = aflds.map(toint);
    bflds = bflds.map(toint);

    let i :number = 0;
    let out : number = 0;
    for (i=0; i < aflds.length && i < bflds.length; i++) {
        if (typeof aflds[i] === "number") {
            if (typeof bflds[i] === "number") {
                out = <number>aflds[i] - <number>bflds[i];
                if (out == 0) continue;
            }
            else 
                return +1;
        }
        else if (typeof bflds[i] === "number") 
            return -1;
        return a.localeCompare(b);
    }

    return out;
}

function compare_dates(a : string, b : string) : number {
    if (a.includes("Z"))
        a = a.substring(0, a.indexOf("Z"));
    if (a.includes("Z"))
        b = b.substring(0, a.indexOf("Z"));

    let asc = -1, bsc = -1;
    try {
        asc = Date.parse(a);
        bsc = Date.parse(b);
    } catch (e) { return 0; }

    return asc - bsc;
}

function compare_histories(a, b) {
    let out = 0;
    if (a.issued && b.issued)
        out = compare_dates(a.issued, b.issued);
    if (out == 0) 
        out = compare_versions(a.version, b.version);
    return out;
}

@Component ({
  moduleId: module.id,
  selector: 'pdr-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.css']
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
  //findId: string;
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
  isId : boolean = true;
  private newer : reference = {};  
  teststring: string = "Loading !!";
    
  /**
   * Creates an instance of the SearchPanel
   *
   */
  constructor(private route: ActivatedRoute, private el: ElementRef, private titleService: Title) {
  
  }

  /**
   * If Search is successful populate list of keywords themes and authors
   */

  onSuccess(searchResults:any[]) {
   this.teststring = "success !!";

    if(searchResults["ResultCount"] === undefined || searchResults["ResultCount"] !== 1)
      this.recordDisplay = searchResults;
    else if(searchResults["ResultCount"] !== undefined && searchResults["ResultCount"] === 1)
      this.recordDisplay = searchResults["ResultData"][0];

    if(this.recordDisplay["@id"] === undefined || this.recordDisplay["@id"] === "" ){
      this.isId = false;
      return;
    }

    this.type = this.recordDisplay['@type'];
    this.titleService.setTitle(this.recordDisplay['title']);
    this.createDataHierarchy();
    if(this.recordDisplay['doi'] !== undefined && this.recordDisplay['doi'] !== "" )
      this.isDOI = true;
      
    if(this.recordDisplay['contactPoint'].hasEmail !== undefined && this.recordDisplay['contactPoint'].hasEmail !== "")
      this.isEmail = true;

    this.assessNewer();
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
    // //console.log(searchId);
    // this.keyword = '';
    // let that = this;
    // return this.searchService.searchById(searchId)
    //   .subscribe(
    //     async searchResults => await that.onSuccess(searchResults),
    //     error => that.onError(error)
    //   );
  }


  encodeString(url:string,param:string) {
    var urlString = url + encodeURIComponent(param);
    window.open(urlString);
  }

  openURL(url:string) {
    window.open(url);
  }

  /**
   * analyze the given resource metadata to determine if a newer version is 
   * available.  Currently, this looks in three places (in order) within the 
   * NERDm record:
   * <ol>
   *   <li> the 'isReplacedBy' property </li>
   *   <li> as a 'isPreviousVersionOf' reference in the references list.
   *   <li> in the 'versionHistory' property </li>
   * </ol>
   * The checks for last two places may be removed in a future release. 
   */
  assessNewer() {
      if (! this.recordDisplay) return;

      // look for the 'isReplacedBy'; this is expected to be inserted into the
      // record on the fly by the server based on the values of 'replaces' in
      // all other resources.
      if (this.recordDisplay['isReplacedBy']) {
          this.newer = this.recordDisplay['isReplacedBy'];
          if (! this.newer['refid']) this.newer['refid'] = this.newer['@id'];
          return;
      }

      // look for a reference with refType="isPreviousVersionOf"; the
      // referenced resource is a newer version. 
      if (this.recordDisplay['references']) {
          for (let ref of this.recordDisplay['references']) {
              if (ref.refType == "IsPreviousVersionOf" && (ref.label || ref.refid)) {
                  this.newer = ref;
                  if (! this.newer['refid']) this.newer['refid'] = this.newer['@id'];
                  if (! this.newer.label) this.newer.label = ref.newer.refid;
                  return;
              }
          }
      }

      // look at the version history to see if there is a newer version listed
      if (this.recordDisplay['version'] && this.recordDisplay['versionHistory']) {
          let history = this.recordDisplay['versionHistory'];
          history.sort(compare_histories);
          if (compare_histories(history[history.length-1],
                                { version: this.recordDisplay['version'], 
                                  issued: this.recordDisplay['modified']  }) > 0)
          {
              this.newer = history[history.length-1];
              if (! this.newer['refid']) this.newer['refid'] = this.newer['@id'];
              this.newer['label'] = this.newer['version'];
              if (! this.newer['location'] && this.newer['refid']) {
                  if (this.newer['refid'].startsWith("doi:"))
                      this.newer.location = 'https://doi.org/'+this.newer['refid'].substring(4);
                  else if (this.newer['refid'].startsWith("ark:/88434/"))
                      this.newer.location = 'https://data.nist.gov/od/id/'+this.newer['refid'];
              }
          }
      }
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
                         
                        }
                    } 
                    else if(this.recordDisplay['contactPoint']) {
                        if(this.recordDisplay['contactPoint'].fn !== null && this.recordDisplay['contactPoint'].fn !== undefined)
                        this.citeString += this.recordDisplay['contactPoint'].fn;
                    }

                    if(this.recordDisplay['issued'] !==  null && this.recordDisplay['issued'] !==  undefined){
      
                      this.citeString += " ("+ _.split(this.recordDisplay['issued'],"-")[0]+") ";
                    }
                    if(this.citeString !== "") this.citeString +=", ";
                    if(this.recordDisplay['title']!== null && this.recordDisplay['title']!== undefined )
                        this.citeString += this.recordDisplay['title'] +", ";
                    if(this.recordDisplay['publisher']){
                      if(this.recordDisplay['publisher'].name !== null && this.recordDisplay['publisher'].name !== undefined)
                      this.citeString += this.recordDisplay['publisher'].name;
                    }
                    if(this.isDOI)   this.citeString += ", "+ this.recordDisplay['doi'];
                    
                    this.citeString += " (Accessed: "+ date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+")";
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

   replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
  /**
   * Get the params OnInit
   */
  ngOnInit() {
   
    this.route.data.map(data => data.searchService ).subscribe((res)=>{
      this.onSuccess(res);
    }, (error) =>{ this.onError(error) } );
   
    /// This part is added because we need to rewrite the url in browser due to # issue and we need a record 
    this.searchValue = this.route.pathFromRoot[1].snapshot.url.toString().split('id,').pop();
    if(_.includes(this.searchValue, 'ark')) 
     this.searchValue = this.replaceAll(this.searchValue,',','/')
     
    // this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
    //   if(_.includes(window.location.href,"ark")){
    //     var alength = _.split(window.location.href,'/').length;
    //     this.searchValue ="ark"+decodeURIComponent(_.split(window.location.href,'ark')[1]);

    //   }
    //   else if(_.includes(window.location.href,'?')) {
    //     this.searchValue = params['id'];
    //   } else {
    //     var alength = _.split(window.location.href,'/').length;
    //     this.searchValue =_.split(window.location.href,'/')[alength-1];
    //     //console.log(" searchvalue TEST id ***"+_.split(window.location.href,'/')[5]);
    //   }
    //   //this.onSuccess(this.route.snapshot.data['searchService']);
    //   this.findId = this.searchValue;//params['id'];
    //   //this.searchbyid(this.findId);
    //   this.files =[];
    // });
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

  createDataHierarchy() {
      if (this.recordDisplay['components'] == null)
          return;
      let dh = new ResComponents(this.recordDisplay['components']).dataHierarchy();
      this.files = this.createNode4Hierarchy(dh).children;
  }

  createNode4Hierarchy(dnode : DataHierarchy) {
      let fp = dnode.data.filepath.split('/');
      let label = fp[fp.length-1];
      
      if (dnode.is_subcoll()) {
          let out = this.createTreeObj(label, dnode.data.filepath);
          out.children = [];
          for(let i=0; i < dnode.children.length; i++) 
              out.children.push(this.createNode4Hierarchy(dnode.children[i]));
          return out;
      }
      else {
          return this.createFileNode(label, dnode.data.filepath);
      }
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

  visibleHistory = false;
  expandHistory() {
    this.visibleHistory = ! this.visibleHistory;
    return this.visibleHistory;
  }

  /**
   * create an HTML rendering of a version string for a NERDm VersionRelease.  
   * If there is information available for linking to version's home page, a 
   * link is returned.  Otherwise, just the version is returned (prepended 
   * with a "v").
   */
  renderRelVer(relinfo, thisversion) {
      if (thisversion == relinfo.version)
          return "v"+relinfo.version;
      return this.renderRelAsLink(relinfo, "v"+relinfo.version);
  }

  renderRelAsLink(relinfo, linktext) {
      let out : string = linktext;
      if (relinfo.location) 
          out = '<a href="'+relinfo.location+'">'+linktext+'</a>';
      else if (relinfo.refid) {
          if (relinfo.refid.startsWith("doi:"))
              out = '<a href="https://doi.org/'+relinfo.refid.substring(4)+'">'+linktext+'</a>';
          else if (relinfo.refid.startsWith("ark:/88434/"))
              out = '<a href="https://data.nist.gov/od/id/'+relinfo.refid+'">'+linktext+'</a>';
      }
      return out;
  }

  /**
   * return a rendering of a release's ID.  If possible, the ID will be 
   * rendered as a link.  If there is no ID, a link with the text "View..." 
   * is returned. 
   */
  renderRelId(relinfo, thisversion) {
      if (thisversion == relinfo.version)
          return "this version";

      let id : string = "View...";
      if (relinfo.refid) id = relinfo.refid;
      return this.renderRelAsLink(relinfo, id);
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
        if(ref.refType == "IsDocumentedBy") return true;
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
