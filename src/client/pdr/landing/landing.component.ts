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
import {Http, Headers, RequestOptions, Response, ResponseContentType, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { CartService } from '../datacart/cart.service';
import { CartEntity } from '../datacart/cart.entity';
import { Observable } from 'rxjs/Observable';
import {ProgressSpinnerModule, DialogModule} from 'primeng/primeng';
import * as __ from 'underscore';
import {isNullOrUndefined} from "util";

//import * as jsPDF  from 'jspdf';

declare var Ultima: any;
declare var saveAs: any;
declare var $: any;

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
    displayCart: boolean = true;
    showSpinner: boolean = false;
    cartEntities: CartEntity[];
    cols: any[];
    selectedData: TreeNode[];
    dataFiles: TreeNode[] = [];
    childNode: TreeNode = {};
    index:any = {};
    isResultAvailable: boolean = true;
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

  /**
   * Creates an instance of the SearchPanel
   *
   */
    constructor(private route: ActivatedRoute, private http: Http,private cartService: CartService, private el: ElementRef,public searchService:SearchService, private titleService: Title) {
    this.getDataCartList();
    this.cartService.watchCart().subscribe(value => {
      this.displayCart = value;
    });
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
      this.createDataCartHierarchy();
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
  /**
   * If Search is successful populate list of keywords themes and authors
   */

  getDataCartList() {
    this.cartService.getAllCartEntities().then(function (result) {
      //console.log("result" + result.length);
      this.cartEntities = result;
      //console.log("cart entities inside datacartlist" + JSON.stringify(this.cartEntities));
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
  }

  downloadZIP() {
    let downloadURL: string[];
    let fileName: string[];
    let params: URLSearchParams = new URLSearchParams();
    let folderName: string;
    this.showSpinner = true;
    for (let p of params.getAll('id')){
      console.log('params before' + p);
    }
    for (let selData of this.selectedData) {
      if (selData.data['filePath'] != null) {
        if (selData.data['filePath'].split(".").length > 1) {
          console.log("resId" + selData.data['resId']);
          console.log("filepath" + selData.data['filePath'])
          //folderName = selData.data['resId'].split("/")[2] + "-" + selData.data['resTitle'].substring(0, 20);
          params.append('folderName', folderName);
          params.append('downloadURL', selData.data['downloadURL']);
          params.append('fileName', selData.data['id'] + selData.data['fileName']);
          params.append('filePath', selData.data['filePath']);
          params.append('resFilePath', selData.data['resFilePath']);
          params.append('id', selData.data['id']);
          console.log('params selected' + selData.data['id']);
          this.cartService.updateCartItemDownloadStatus(selData.data['id'],'downloading');

        }
      }
    }
    this.downloadFile(params).subscribe(blob => {
        saveAs(blob, "download.zip");
        this.showSpinner = false;
    });

    for (let selData of this.selectedData) {
      if (selData.data['filePath'] != null) {
        if (selData.data['filePath'].split(".").length > 1) {
          console.log("resId" + selData.data['resId']);
          console.log("filepath" + selData.data['filePath'])
          this.cartService.updateCartItemDownloadStatus(selData.data['id'],'downloaded');
        }
      }
    }

    this.cartService.getAllCartEntities().then(function (result) {
      //console.log("result" + result.length);

      this.cartEntities = result;
      console.log("hello" + JSON.stringify(this.cartEntities));
      this.createDataCartHierarchy();
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });

  }

  updateCartEntries(row:any,downloadedStatus:any) {
    console.log("id" + JSON.stringify(row.data));
    this.cartService.updateCartItemDownloadStatus(row.data['id'],downloadedStatus);
    this.cartService.getAllCartEntities().then(function (result) {
      //console.log("result" + result.length);
      this.cartEntities = result;
      this.createDataCartHierarchy();

    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });

  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

  downloadFile(params): Observable<Blob> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob});
    return this.http.get(this.distApi + "/cart?" + params, options)
      .map(res => res.blob())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Removes all cartInstances that are bound to the productId given.
   **/
  removeByDataId() {

    let dataId: any;
    // convert the map to an array
    for (let selData of this.selectedData) {
      dataId = selData.data['id'];
      // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
      this.cartEntities = this.cartEntities.filter(entry => entry.data.id != dataId);

      //save to localStorage
      this.cartService.saveListOfCartEntities(this.cartEntities);
    }

    this.getDataCartList();
    this.createDataCartHierarchy();
    this.cartService.setCartLength(this.dataFiles.length);
  }

  /**
   * Removes all cartInstances that are bound to the productId given.
   **/
  removeByDownloadStatus() {

    let dataId: any;
    // convert the map to an array
    this.cartService.removeDownloadStatus();
    this.cartService.getAllCartEntities().then(function (result) {
      //console.log("result" + result.length);
      this.cartEntities = result;
      console.log("cart entities inside datacartlist" + JSON.stringify(this.cartEntities));
      this.createDataCartHierarchy();
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
    this.cartService.setCartLength(this.dataFiles.length);
  }

  /**
   * Removes all cartInstances that are bound to the productId given.
   **/
  clearDownloadStatus() {

    let dataId: any;
    // convert the map to an array
    this.cartService.updateCartDownloadStatus(false);
    this.cartService.getAllCartEntities().then(function (result) {
      //console.log("result" + result.length);
      this.cartEntities = result;
      console.log("cart entities inside datacartlist" + JSON.stringify(this.cartEntities));
      this.createDataCartHierarchy();
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
    this.cartService.setCartLength(this.dataFiles.length);
  }
  /**
   * Removes all cartInstances that are bound to the productId given.
   **/
  removeItem(row:any) {

    let dataId: any;
    // convert the map to an array
    let delRow = this.cartEntities.indexOf(row);
    this.cartEntities.splice(delRow,1);
    this.cartService.saveListOfCartEntities(this.cartEntities);
    this.getDataCartList();
    this.createDataCartHierarchy();
    //console.log("datafiles" + this.dataFiles.length);

  }


  createDataCartHierarchy() {

    //console.log("cart ent" + JSON.stringify(this.cartEntities));

    let arrayList = this.cartEntities.reduce(function (result, current) {
      result[current.data.resTitle] = result[current.data.resTitle] || [];
      result[current.data.resTitle].push(current);
      return result;
    }, {});
    //console.log("list" + JSON.stringify(arrayList));
    this.dataFiles = [];
    //let arrayList = this.cartEntities;
    //console.log("arraylist" + JSON.stringify(arrayList));
    let parentObj: TreeNode = {};
    for (var key in arrayList) {
      let resId = key;
      if (arrayList.hasOwnProperty(key)) {
        parentObj = {
          data: {
            'resTitle': key,
          }
        };
        parentObj.children = [];
        for (let fields of arrayList[key]) {
          //console.log("file path" + fields.data.filePath);
          let fpath = fields.data.filePath.split("/");
          if (fpath.length > 0) {
            let child2: TreeNode = {};
            child2.children = [];
            let parent = parentObj;
            let folderExists:boolean = false;
            let folder = null;
            for (let path in fpath) {
              //let array = JSON.stringify(parent);
              //console.log("path" + fpath[path]);
              child2 = this.createDataCartChildrenTree(fpath[path],fields.data.id,resId,key,fields.data.downloadURL,fields.data.filePath,fields.data.downloadedStatus);
              parent.children.push(child2);
              parent = child2;
            }
          }
        }

        console.log("final output" + JSON.stringify(parentObj));

        /*
        let tmp:any ={};
        parentObj.children.forEach((o) => {
          const path = o.data.filePath;
          if (tmp[path]) {
            tmp[path].children = tmp[path].children || [];// in case no children property or array exists
            tmp[path].children.push(...o.children);
          } else {
            tmp[path] = o;
          }

        });

*/

        //this.walkData(parentObj[0], parentObj,0);

        //let values = Object.keys(tmp).map(key => tmp[key]);
        //parentObj.children = values;
        this.walkData(parentObj, parentObj, 0);
        //parentObj = tmp;
        this.dataFiles.push(parentObj);
        this.index = {};
        //this.dataFiles.push(parentObj);
      }
    }
  }

  walkData(inputArray, parent, level){
    level = level || '';
    if (inputArray.children) {
      let copy = inputArray.children.filter((item) => { return true});
      copy.forEach((item) => {
        var path = inputArray.data && inputArray.data.filePath ?
          inputArray.data.filePath : 'root';
        this.walkData(item, inputArray, level + '/' + path);
      });
    }
    if(inputArray.data && inputArray.data.filePath) {
      var key = level + inputArray.data.filePath;
      if (!(key in this.index)) {
        this.index[key] = inputArray;
      } else {
        //debugger;
        inputArray.children.forEach((item) => {
          this.index[key].children.push(item);
        })
        var indx = 0;
        var found = false;
        parent.children.forEach((item) => {
          if (!found &&
            item.data.filePath === inputArray.data.filePath &&
            item.data.id === inputArray.data.id
          ){
            found = true;
          }
          else if(!found) {
            indx++;
          }
        });
        parent.children.splice(indx, 1);
      }
    }
  }

  createDataCartChildrenTree(path: string,id:string,resId:string,resTitle:string,downloadURL:string,resFilePath:string,downloadedStatus:string){
    let child1:TreeNode = {};
    child1 = {
      data: {
        'filePath': path,
        'id' : id,
        'resId' : resId,
        'resTitle': path,
        'downloadURL' : downloadURL,
        'resFilePath' : resFilePath,
        'downloadedStatus' : downloadedStatus
      }
    };
    child1.children = [];
    return child1;
  }
}
