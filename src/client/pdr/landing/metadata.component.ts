import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 
import { TreeModule,TreeNode, Tree, MenuItem } from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {DomSanitizer} from '@angular/platform-browser';
import {FieldsetModule} from 'primeng/primeng';

@Component({
  selector: 'metadata-detail',
  template: `
     <div innerHtml='{{ testString }}'></div> 
     <br>
     
       Title: <div class="">{{fields.title}}</div>
      <br>Issed: <div class="well">{{fields.issued}}</div>
      <br>References:<div class="well-sm"> <span *ngFor="let ref of fields.references">
                             refType: <span>{{ref.refType}}</span>
                        <br> location: <span>{{ref.location}}</span>
                        <br> @type: <span>{{ref["@type"]}}</span>
                        <br> label: <span>{{ref.label}}</span>
                        <br><br>
                        </span>
                     </div>
        <br>Extension Schemas:<div class="well"  *ngFor="let ext of fields._extensionSchemas">
                                {{ ext }}<br>
                             </div>
        <br>Landing Page:<div class="well">{{ fields.landingPage}}</div>
        
        <br> abbrev : <div class="well"  *ngFor="let ab of fields.abbrev">
                         {{ ab }}<br>
                      </div>
        
        <br> ProgrammCode : <div class="well"> <span *ngFor="let pg of fields.programCode">
                              {{ pg }}<br></span>
                            </div>
        <br> @context: <div class="well">{{fields["@context"]}}</div>
        <br> Description: <div class="well"  *ngFor="let pg of fields.description">
                            {{ pg }}<br>
                          </div>
        <br> language: <div class="well"> <span *ngFor="let lang of fields.language">
                            {{ lang }}<br></span>
                          </div>
        <br> bureauCode: <div class="well" *ngFor="let pg of fields.bureauCode">{{ pg }}<br></div>
        <br> Authors: <div class="well"> <span *ngFor="let auth of fields.authors">
                        {{ auth.fn }}<br> {{auth.proxyFor}}
                        <br><span *ngFor="let aff of auth.affiliation">{{ aff.title }}<br></span><br>
                        </span>
                      </div>
        <br> Contact Point:  <div class="well">fn :<span> {{fields.contactPoint.fn}}</span>
                             hasEmail: <span> {{fields.contactPoint.hasEmail}}</span>
                             <br><span *ngFor="let add of fields.contactPoint.address">{{ add }}<br></span><br>
                             </div>
        <br> accessLevel: <div class="well"> {{fields.accessLevel}}</div>
        <br> @id: <div class="well"> {{fields["@id"]}}</div>
        <br> publisher: <div class="well"><br><span>@type: {{ fields.publisher["@type"]}}</span>
                        <br><span>name : @type: {{ fields.publisher.name}}</span></div>

        <br> doi : <div class="well">{{ fields.doi }}</div>
        <br> keyword : <div class="well"><span *ngFor="let key of fields.keyword">{{ key }} ,</span></div>
        <br> licence : <div class="well">{{ fields.license }}</div>
        <br> modified : <div class="well">{{ fields.modified }}</div>
        <br> ediid : <div class="well">{{ fields.ediid }}</div>
        <br> components: <div class="well"></div>
        <br> inventory: <div class="well"></div>
        <br> dataHierarchy:<div class="well"></div>
   
  `
})
export class MetadataComponent {
   @Input() searchResults: any[];
    private mTrees : TreeNode[] = [];
    private metadataTree: TreeNode;
    private recordToDisplay : Object;  
    private testString : String;
    private fields :Object;
   ngOnInit() {
      this.testString = "";
      this.recordToDisplay = this.searchResults[0];
      this.fields = this.searchResults[0];
      this.createTree();
   }
   createTree(){
      var recordArray = this.generateArray(this.recordToDisplay);
      let fieldsKeys = Object.keys(this.recordToDisplay);
      recordArray.forEach((item, index) => {
          this.testString += '<div class="ui-g"> <div class="ui-g-2">'+fieldsKeys[index]+'</div>'
          if(recordArray[index] instanceof Array ) {
             this.testString += '<div class="ui-g-8">'+this.createKeyVal(recordArray[index])+'</div>';
             //console.log();
          }else{
          this.testString += '<div class="ui-g-8">'+recordArray[index]+'</div>';
          }
        this.testString += '</div>';
        
      });   
   }
  generateArray(obj){
     return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  private testKeys: Object;
  private testVals;
   
   createKeyVal(objArray){
     this.testKeys = Object.keys(objArray);
     this.testVals = this.generateArray(objArray);
     let tempString ="";
     for(let v of this.testVals)
      tempString += v +",";
    //  this.testVals.forEach((item, index) => {
    //   tempString += '<div class="ui-g"> <div class="ui-g-2">'+this.testKeys[index]+'</div>';
    //  tempString += '<div class="ui-g-8">'+this.testVals[index]+'</div></div>';
    // });
    return tempString;
  }

}
