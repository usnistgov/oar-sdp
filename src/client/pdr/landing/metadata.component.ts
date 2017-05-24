import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 
@Component({
  selector: 'metadata-detail',
  template: `
      <h3> Metadata:</h3>
      <div *ngFor="let fields of searchResults"> 
      <br>
      Title: <div class="well">{{fields.title}}</div>
      <br>Issed: <div class="well">{{fields.issued}}</div>
      <br>References:<div class="well"> <span *ngFor="let ref of fields.references">
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
     </div>
  `
})
export class MetadataComponent {
   @Input() searchResults: any[];
}
