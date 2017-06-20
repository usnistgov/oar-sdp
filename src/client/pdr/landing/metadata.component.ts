import { Component, Input } from '@angular/core';
import { FieldsetModule } from 'primeng/primeng';

@Component({
  selector: 'metadata-detail',
  template: `
    <h3> Metadata:</h3>
      <br>
      Title: <div class="well">{{recordDisplay['title']}}</div>
      <br>Issed: <div class="well">{{recordDisplay['issued']}}</div>
      <br>References:<div class="well"> <span *ngFor="let ref of recordDisplay['references']">
                             refType: <span>{{ref.refType}}</span>
                        <br> location: <span>{{ref.location}}</span>
                        <br> @type: <span>{{ref["@type"]}}</span>
                        <br> label: <span>{{ref.label}}</span>
                        <br><br>
                        </span>
                     </div>
        <br>Extension Schemas:<div class="well"  *ngFor="let ext of recordDisplay['_extensionSchemas']">
                                {{ ext }}<br>
                             </div>
        <br>Landing Page:<div class="well">{{ recordDisplay['landingPage']}}</div>
        
        <br> abbrev : <div class="well"  *ngFor="let ab of recordDisplay['abbrev']">
                         {{ ab }}<br>
                      </div>
        
        <br> ProgrammCode : <div class="well"> <span *ngFor="let pg of recordDisplay['programCode']">
                              {{ pg }}<br></span>
                            </div>
        <br> @context: <div class="well">{{recordDisplay["@context"]}}</div>
        <br> Description: <div class="well"  *ngFor="let pg of recordDisplay['description']">
                            {{ pg }}<br>
                          </div>
        <br> language: <div class="well"> <span *ngFor="let lang of recordDisplay['language']">
                            {{ lang }}<br></span>
                          </div>
        <br> bureauCode: <div class="well" *ngFor="let pg of recordDisplay['bureauCode']">{{ pg }}<br></div>
        <br> Authors: <div class="well"> <span *ngFor="let auth of recordDisplay['authors']">
                        {{ auth.fn }}<br> {{auth.proxyFor}}
                        <br><span *ngFor="let aff of auth.affiliation">{{ aff.title }}<br></span><br>
                        </span>
                      </div>
        <br> Contact Point:  <div class="well">fn :<span> {{recordDisplay['contactPoint'].fn}}</span>
                             hasEmail: <span> {{recordDisplay['contactPoint'].hasEmail}}</span>
                             <br><span *ngFor="let add of recordDisplay['contactPoint'].address">{{ add }}<br></span><br>
                             </div>
        <br> accessLevel: <div class="well"> {{recordDisplay['accessLevel']}}</div>
        <br> @id: <div class="well"> {{recordDisplay["@id"]}}</div>
        <br> publisher: <div class="well"><br><span>@type: {{ recordDisplay['publisher']["@type"]}}</span>
                        <br><span>name : @type: {{ recordDisplay['publisher'].name}}</span></div>

        <br> doi : <div class="well">{{ recordDisplay['doi'] }}</div>
        <br> keyword : <div class="well"><span *ngFor="let key of recordDisplay['keyword']">{{ key }} ,</span></div>
        <br> licence : <div class="well">{{ recordDisplay['license'] }}</div>
        <br> modified : <div class="well">{{ recordDisplay['modified'] }}</div>
        <br> ediid : <div class="well">{{ recordDisplay['ediid'] }}</div>
         <!--br> components: <div class="well">{{ testString}}</div>
         <br> inventory: <div class="well"></div>
         <br> dataHierarchy:<div class="well"></div-->

     
  `
})
export class MetadataComponent {
   @Input() recordDisplay: any[];
   
    testString : String;
   
   ngOnInit() {
      //this.testString = "";
      if(Array.isArray(this.recordDisplay['components'])){
        this.testString = JSON.stringify(this.recordDisplay['components']);
      }
     
      //this.createDisplay(this.recordDisplay);
   }
    // <div innerHtml='{{ testString }}'></div> 
    
   createDisplay( dataObj:any[] ){
      var recordArray = this.generateArray(dataObj);
      let fieldsKeys = Object.keys(dataObj);
      recordArray.forEach((item, index) => {
          this.testString += '<div class="ui-g"> <div class="ui-g-2">'+fieldsKeys[index]+'</div>'
          if( Array.isArray(recordArray[index]) ) {
             this.testString += '<div class="ui-g-8"> **** '+this.createKeyVal(recordArray[index])+'</div>';
             //console.log();
          }
          else{
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
