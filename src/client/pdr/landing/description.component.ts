import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
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
                <h3 id="files" name="files"><b>Files</b>  <a href="{{distdownload}}" class="faa faa-file-archive-o" title="Download All Files" ></a>
                </h3> 
                 
                <div class="ui-g">
                    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-12">
                        <p-tree [value]="files" selectionMode="single" [(selection)]="selectedFile" (onNodeSelect)="nodeSelect($event)">
                            <template let-node  pTemplate="default">
                                <span>{{node.label}}</span>
                            </template>
                        </p-tree>
                    </div>
                    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-12">
                        <div ng2-sticky>
                            <div *ngIf="isFileDetails">
                                <filedetails-resources [fileDetails]="fileDetails"></filedetails-resources>
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

 fileDetails:string="";
 isFileDetails: boolean = false;
 isReference: boolean = false;
 selectedFile: TreeNode;
 
 nodeSelect(event) {
      
        var test = this.getComponentDetails(this.record["components"],event.node.data);
        let i =0;
        
        this.fileDetails ="";
        for(let t of test){
            this.isFileDetails = true;
            this.fileDetails = t; 
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
 
 checkReferences(){
      if(Array.isArray(this.record['references']) ){
          for(let ref of this.record['references'] ){
              if(ref.refType == "isDocumentedBy") return true;
          }
      }
 }

}
