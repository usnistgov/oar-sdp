import { Component,OnInit} from '@angular/core';
import { Config, HeadbarComponent, FootbarComponent } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
declare var Modena: any;

@Component({
  moduleId: module.id,
  selector: 'sdp-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor() {
      console.log('Environment config', Config);
  }

    ngOnInit() {
        Modena.init();
    }
}
