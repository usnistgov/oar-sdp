import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../ga-service/google-analytics.service';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'sdp-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css']
})
export class FootbarComponent implements OnInit {

  constructor(public gaService: GoogleAnalyticsService, public commonService: CommonService) { }

  ngOnInit() {
  }

}
