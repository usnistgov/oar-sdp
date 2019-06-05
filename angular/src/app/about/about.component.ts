import { Component, OnInit } from '@angular/core';

declare var gas:Function;

@Component({
  selector: 'sdp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    gas('create', 'pageview');
  }

}
