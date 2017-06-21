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
   
   
   
   ngOnInit() {
      
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
     return tempString;
  }


  isArray(obj : any ) {
     return Array.isArray(obj)
  }

}
