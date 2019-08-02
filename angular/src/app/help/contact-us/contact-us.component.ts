import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(public gaService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }
}
