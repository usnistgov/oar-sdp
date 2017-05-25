import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
@Component({
  selector: 'description-resources',
  template: `
   <h3 id="description" name="desscription">Description</h3><br>
            <div id="recordDescription" class="well" style="background-color:#006495; text-align: left; color: white">
                {{ record["description"] }}
            </div>     
            <strong>Research Topics:</strong> 
            <span  *ngFor="let topic of record['topic']; let i =index">
                {{ topic.tag }}
                <span *ngIf="i < record['references'].length-1 ">,</span>
            </span>
            <br> 
            <b>Subject Keywords:</b>
            <span *ngFor="let keyword of record['keyword']; let i =index">
                {{ keyword }}<span *ngIf="i < record['keyword'].length-1 ">,</span>
            </span>
            <br>
            <br>
           
            <h3 id="reference" name="reference">References</h3>
            This data is discussed in :
                <span *ngIf="record['references']">
                    <span *ngFor="let refs of record['references']"> 
                      <br> <a href={{refs.location}} target="blank" *ngIf="refs['refType'] == 'IsDocumentedBy'">{{ refs.label }}</a>
                     </span>
                </span>
            
            <br>
             <br>
            <h3 id="files" name="files">Files</h3><br>
            This resource contains: 
            <div class="ui-g">
                <div class="ui-g-6">
                    <p-tree [value]="files" selectionMode="single" [(selection)]="selectedFile" (onNodeSelect)="nodeSelect($event)">
                        <template let-node  pTemplate="default">
                            <span>{{node.label}}</span>
                        </template>
                    </p-tree>
                </div>
                <div class="ui-g-6">
                    <div ng2-sticky>
                        <div *ngIf="isFileDetails">
                            <filedetails-resources [fileDetails]="fileDetails"></filedetails-resources>
                        </div>   
                    </div>
                </div>
            </div>
            
  `
})

export class DescriptionComponent {
   @Input() record: any[];
   @Input() files: any[];

 fileDetails:string="";
 isFileDetails: boolean = false;
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
 }
