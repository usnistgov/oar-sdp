import { Component } from '@angular/core';
import { Config } from '../shared/index';


/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-api',
  templateUrl: 'api.component.html',
  styleUrls: ['api.component.css']
})
export class ApiComponent {

  RestAPIURL: string = Config.RMMAPI;

}
