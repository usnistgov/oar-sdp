import { Component, Input,ChangeDetectorRef } from '@angular/core';
import {LandingPanelComponent} from './landing.component';
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
import { CartService } from '../datacart/cart.service';
import { Data } from '../datacart/data';

@Component({
  moduleId: module.id,
  styleUrls: ['landing.component.css'],
  selector: 'description-resources',
  template: `
          <!--div class="ui-g">
          <div class = "ui-g-12 ui-md-12 ui-lg-12 ui-sm-12"-->
          <h3 id="description" name="desscription"><b>Description</b></h3><br>
            <div id="recordDescription" class="well welldesc">
                {{ record["description"] }}
            </div>
            <div *ngIf="record['topic']">
            <strong>Research Topics:</strong>
            <span  *ngFor="let topic of record['topic']; let i =index">
                {{ topic.tag }}
                <span *ngIf="i < record['topic'].length-1 ">,</span>
            </span>
            </div>
            <div *ngIf="record['keyword']">
                <b>Subject Keywords:</b>
                <span *ngFor="let keyword of record['keyword']; let i =index">
                    {{ keyword }}<span *ngIf="i < record['keyword'].length-1 ">,</span>
                </span>
            </div>
            <br>
            <div *ngIf="checkReferences()">
             <h3 id="reference" name="reference"><b>References:</b></h3>
                <span *ngIf="isDocumentedBy"> 
                    This data is discussed in :
                    <span style="padding-left:2.75em" *ngFor="let refs of record['references']">
                        <span *ngIf="refs['refType'] == 'IsDocumentedBy'">
                            <br> <i class="faa faa-external-link">
                                 <a href={{refs.location}} target="blank">{{ refs.label }}</a>
                                 </i>
                        </span>
                    </span>
                    <br>
                </span>
                <span *ngIf="isReferencedBy"> 
                    This data is referenced in :
                    <span style="padding-left:2.75em" *ngFor="let refs of record['references']">
                        <span *ngIf="refs['refType'] == 'IsReferencedBy'">
                            <br> <i class="faa faa-external-link">
                            <a href={{refs.location}} target="blank">{{ refs.location }}</a>
                            </i>
                        </span>
                    </span>
                </span>
            </div>
            <div>
            <br>
             <h3><b>Access To Data:</b></h3><br> 
             <span *ngIf="record['accessLevel'] === 'public'"><i class="faa faa-globe"></i> 
                This data is public. 
             </span>
             <span *ngIf="record['accessLevel'] === 'restricted public'"><i class="faa faa-lock"></i> 
                This data has access restrictions. 
             </span>   
             <br>
             <span *ngIf="record['rights']"> 
                The access rights are {{ record.rights }} 
             </span>
             <br>
             <span style="margin-left:0em" *ngIf="isAccessPage">Data is available via the following locations: 
             <br>   
                <span style="padding-left:2.75em" *ngFor="let title of accessTitles; let i =index">
                    <i class="faa faa-external-link"> <a href="{{accessUrls[i]}}">{{title}}</a> 
                    </i><br>
                </span>
             </span>
             <br>
             <br>
            </div> 
            <div *ngIf="files.length != 0">           
                <h3 id="files" name="files"><b>Files</b>
                   <a href="{{distdownload}}" class="faa faa-file-archive-o" title="Download All Files" ></a>
                  <a href="javascript:;" (click)="addFilesToCart()" class="faa faa-cart-plus " title="Add All files to datacart" ></a>
                  <span [hidden] ="!addAllFileSpinner">
                        <p-progressSpinner [style]="{width: '20px', height: '20px',top:'10%'}" ></p-progressSpinner>
                     </span>
                </h3>
                <div class="ui-g">
                    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-12">
                        <p-tree [value]="files" selectionMode="single" [(selection)]="selectedFile" (onNodeSelect)="nodeSelect($event)">
                            <ng-template let-node  pTemplate="default">
                                <span>{{node.label}}</span>
                            </ng-template>
                        </p-tree>
                    </div>
                    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-12">
                        <div ng2-sticky>
                            <div *ngIf="isFileDetails">
                                <filedetails-resources [fileDetails]="fileDetails" [record]="record"></filedetails-resources>
                            </div>
                            <div *ngIf="!isFileDetails">
                                <div class="card fileinfocard ">
                                    <div class="ui-g fileinfosection">
                                        <span>Click on the file name to view details.</span>   
                                    </div>
                                </div>         
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!--/div-->
     <!--/div-->
  `
})

export class DescriptionComponent {

  @Input() record: any[];
  @Input() files: any[];
  @Input() distdownload: string;
  addAllFileSpinner:boolean = false;
  fileDetails: string = '';
  isFileDetails: boolean = false;
  isReference: boolean = false;
  selectedFile: TreeNode;
  isAccessPage : boolean = false;
  accessPages: Map <string, string> = new Map();
  accessUrls : string[] =[];
  accessTitles : string[] =[];
  isReferencedBy : boolean = false;
  isDocumentedBy : boolean = false;
  private dataFiles: TreeNode[] = [];

  /**
   * Dependecy injection of the service with reflection by angular
   */
  constructor(private cartService: CartService) {
    this.cartService.watchAddAllFilesCart().subscribe(value => {
      this.addAllFileSpinner = value;
    });
  }


  nodeSelect(event) {
    var test = this.getComponentDetails(this.record["components"], event.node.data);
    let i = 0;
    this.fileDetails = '';
    for (let t of test) {
      this.isFileDetails = true;
      this.fileDetails = t;
    }
  }

  getComponentDetails(data, filepath) {
    return data.filter(
      function (data) {
        return data.filepath == filepath
      }
    );
  }

  keys(): Array<string> {
    return Object.keys(this.fileDetails);
  }

checkReferences(){
      if(Array.isArray(this.record['references']) ){
        for(let ref of this.record['references'] ){
            if(ref.refType === 'IsDocumentedBy') this.isDocumentedBy = true;
            if(ref.refType === 'IsReferencedBy') this.isReferencedBy = true;
        }
        if(this.isDocumentedBy || this.isReferencedBy)
        return true;
      }
  }

  addFilesToCart() {
    let data: Data;
    let compValue: any;
    console.log("component size" + this.record["components"].length);
    this.cartService.updateAllFilesSpinnerStatus(true);
    for (let comp of this.record["components"]) {
      if (typeof comp["downloadURL"] != "undefined") {
        console.log("title+++" + comp["title"]);
        console.log("downloadURL+++" + comp["downloadURL"]);
        data = {
          'resId': this.record["@id"],
          'resTitle': this.record["title"],
          'id': comp["title"],
          'fileName': comp["title"],
          'filePath': comp["filepath"],
          'fileSize': comp["size"],
          'downloadURL': comp["downloadURL"],
          'fileFormat': comp["mediaType"],
          'downloadedStatus': null,
          'resFilePath': ''
        };
        this.cartService.addDataToCart(data);
        data = null;
      }
    }
    setTimeout(() => {
      this.cartService.updateAllFilesSpinnerStatus(false);
    }, 3000);
  }

 checkKeywords(){
    if(Array.isArray(this.record['keyword']) ){
        if(this.record['keyword'].length > 0)
            return true;
        else
            return false;
    }
    else {
        return false;
    }
  }

  /*

  createDataCartHierarchy(){
    if (this.recordDisplay['dataHierarchy'] == null )
      return;
    for(let fields of this.recordDisplay['dataHierarchy']){
      if( fields.filepath != null) {
        if(fields.children != null)
          this.dataFiles.push(this.createChildrenTree(fields.children,
            fields.filepath));
        else
          this.dataFiles.push(this.createFileNode(fields.filepath,
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
<<<<<<< HEAD
    return testObj;
  }
=======
 }
 checkAccesspages(){
    if(Array.isArray(this.record['inventory']) ){
        if(this.record['inventory'][0].forCollection == "") {
            for(let inv of this.record['inventory'][0].byType ){
                if(inv.forType == "nrdp:AccessPage")
                    this.isAccessPage = true;
            }
        }
    }
    if(this.isAccessPage){
        this.accessPages = new Map();
        for(let comp of this.record['components']){
            if(comp['@type'].includes("nrdp:AccessPage"))
            {
                if(comp["title"] !== "" && comp["title"] !== undefined)
                    this.accessPages.set(comp["title"], comp["accessURL"]);
                else
                    this.accessPages.set(comp["accessURL"], comp["accessURL"]);
            }
        }
    }

    this.accessTitles = Array.from(this.accessPages.keys());

    this.accessUrls = Array.from(this.accessPages.values());
 }


 ngOnInit(){
    this.cdr.detectChanges();
 }
 ngOnChanges(){
    this.checkAccesspages();
 }
 constructor(private cdr: ChangeDetectorRef) {}
>>>>>>> refs/remotes/origin/integration

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
  */
}
