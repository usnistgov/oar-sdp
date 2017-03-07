import {Component, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'read-more',
  template: `
        <div [innerHTML]="currentText">
        </div>
            <a [hidden]="hideToggle" href="javascript:void(0);" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `
})

export class ReadMoreComponent implements AfterViewInit   {
  @Input() text: string;
  @Input() maxLength: number  ;
  currentText: string;
  hideToggle: boolean = true;

  public isCollapsed: boolean = true;

  constructor(private elementRef: ElementRef) {

  }
  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }
  determineView() {

    if (this.text.toString().length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed == true) {
      this.currentText = this.text.toString().substring(0, this.maxLength) + "...";
    } else if(this.isCollapsed == false)  {
      this.currentText = this.text;
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.determineView();
    }, 1);
  }
}
