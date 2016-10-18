import { Component, AfterViewInit,ElementRef} from '@angular/core';
import { Config, HeadbarComponent, FootbarComponent } from './shared/index';
import './operators';


/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
declare var Ultima: any;


@Component({
  moduleId: module.id,
  selector: 'sdp-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {

  layoutCompact: boolean = true;

  layoutMode: string = 'horizontal';

  darkMenu: boolean = false;

  profileMode: string = 'inline';

  constructor( private el: ElementRef) {
      console.log('Environment config', Config);
  }


  ngAfterViewInit() {
    Ultima.init(this.el.nativeElement);
  }
}
