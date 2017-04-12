import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 

@Component({
  selector: 'similar-resources',
  template: `
      <br>
      <h2>{{qcriteria}}</h2>
      <div *ngFor="let results of similarResourcesResults"> 
      <br> <a target='_blank' href="../#/landing?id={{results['@id']}}">{{results.title}}</a>
     </div>
  `
})

export class SimilarsComponent {
   @Input() similarResourcesResults: any[];
   @Input() qcriteria : string = "TEST";
 }
