import {Component, ViewChild, ElementRef} from '@angular/core';
import { Config } from '../shared/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-help',
  templateUrl: 'help.component.html',
  styleUrls: ['help.component.css']
})
export class HelpComponent {

  @ViewChild('howToSearch') public howToSearch:ElementRef;
  @ViewChild('contactUs') public contactUs:ElementRef;

  public HelpComponent () {
    this.goToHowToSearch();
  }

  public goToContactUs():void {
    setImmediate(() => {
      this.contactUs.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    });
  }
  public goToHowToSearch():void {
    setImmediate(() => {
      this.howToSearch.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    });
  }




}
