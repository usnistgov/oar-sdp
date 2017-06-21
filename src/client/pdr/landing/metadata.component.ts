import { Component, Input, Pipe,PipeTransform } from '@angular/core';



@Component({
  selector: 'metadata-detail',
  
  template: `
    <div class="ui-g">
     <div class = "ui-g-12 ui-md-12 ui-lg-12 ui-sm-10" style="padding:2%">
      <h1>Metadata</h1>
      <br>
      <fieldset-view [entry]="recordDisplay"></fieldset-view>
      </div>
    </div>
  `
})
export class MetadataComponent {
   @Input() recordDisplay: any[];
   
    testString : String;
    someHtmlCode: string = "<div><b>This is my HTML.</b></div>";
   
   ngOnInit() {
       this.testString = " <div class=\"customfieldset\"><h1><span>Legend</span></h1> Fieldset</div>";
      // this.testString += " <p-fieldset legend=\"Test2\"> TEST 2 Here</p-fieldset>";
      // if(Array.isArray(this.recordDisplay['components'])){
      //   this.testString = JSON.stringify(this.recordDisplay['components']);
      // }
     //this.createFieldSet(this.recordDisplay);
      //this.createDisplay(this.recordDisplay);
   }
    // <div innerHtml='{{ testString }}'></div> 
//     <div innerHtml='{{ someHtmlCode }}'></div> 
//  <div [sanitizeHtml]="testString"></div>

//  Key: {{entry.key}}, value: {{entry.value}} Length :: {{isArray(entry.value)}} <br>
    
  createFieldSet( dataObj:any[] ){
      var recordArray = this.generateArray(dataObj);
      let fieldsKeys = Object.keys(dataObj);
      recordArray.forEach((item, index) => {
          this.testString += '<p-fieldset legend="fieldsKeys[index]">';
          if( Array.isArray(recordArray[index]) ) {
             this.testString += 'this.createKeyVal(recordArray[index])';
          }
          else{
            this.testString += recordArray[index];
          }
        this.testString +='</p-fieldset>';
      });   
   }

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


  isArray(obj : any ) {
     return Array.isArray(obj)
  }

}
