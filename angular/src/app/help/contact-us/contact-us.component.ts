import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../../shared/config-service/config.service';
import { CommonService } from '../../shared/common/common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  imageURL: string;

  constructor(public commonService: CommonService,
              public gaService: GoogleAnalyticsService,
              private appConfig: AppConfig)
  { }

  ngOnInit() {
      this.appConfig.getConfig().subscribe(
          (conf) => {
              this.imageURL = conf.SDPAPI + 'assets/images/sdp-background.jpg';
          }
      );
  }
}
