import { Component, Input } from '@angular/core';
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
             <h3 id="reference" name="reference">References</h3>
               This data is discussed in :
                <span *ngFor="let refs of record['references']">
                  <span *ngIf="refs['refType'] == 'IsDocumentedBy'">
                    <br> <a href={{refs.location}} target="blank">{{ refs.label }}</a>
                  </span>
                </span>
            </div>
            <div>

             <b>Data Access:</b> {{ record['accessLevel'] }}
                <span *ngIf="record['rights']">, The access rights are {{ record.rights }} </span>
             <br>
             <br>
            </div> 
            <div *ngIf="files.length != 0">           
                <h3 id="files" name="files"><b>Files</b>
                   <a href="{{distdownload}}" class="faa faa-file-archive-o" title="Download All Files" ></a>
                  <a href="javascript:;" (click)="addFilesToCart()" class="faa faa-cart-plus " title="Add All files to datacart" ></a>
                     <span *ngIf="fileSuccessSpinner">
                        <p-progressSpinner [style]="{width: '25px', height: '25px',left: '93%'}" ></p-progressSpinner>
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
  fileSuccessSpinner:boolean = false;
  fileDetails: string = '';
  isFileDetails: boolean = false;
  isReference: boolean = false;
  selectedFile: TreeNode;
  private dataFiles: TreeNode[] = [];

  /**
   * Dependecy injection of the service with reflection by angular
   */
  constructor(private cartService: CartService) {

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

  checkReferences() {
    if (Array.isArray(this.record['references'])) {
      for (let ref of this.record['references']) {
        if (ref.refType === 'isDocumentedBy') return true;
      }
    }
  }

  addFilesToCart() {
    let data: Data;
    let compValue: any;
    console.log("component size" + this.record["components"].length);
    this.fileSuccessSpinner = true;
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
          'downloadedStatus' : false,
          'resFilePath':''
        };
        this.cartService.addDataToCart(data);
        //this.fileSuccessSpinner = false;
        data = null;
      }
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
  */
}
