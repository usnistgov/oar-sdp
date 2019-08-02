import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';

@Component({
  selector: 'sdp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public gaService: GoogleAnalyticsService) { 
  }

  ngOnInit() {
  }

}
