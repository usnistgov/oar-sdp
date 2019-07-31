import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';

@Component({
  selector: 'sdp-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css']
})
export class FootbarComponent implements OnInit {

  constructor(public gaService: GoogleAnalyticsService) { }

  ngOnInit() {
  }

}
