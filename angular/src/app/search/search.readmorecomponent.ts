import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'read-more',
  template: `
    <span *ngIf="!isKeywords">
      {{ currentText }}
    </span>
    <span *ngIf="isKeywords">
      <p-tag
        *ngFor="let keyword of currentKeywords; let i = index"
        severity="info"
        style="margin-right: 5px;"
        size="small"
      >
        {{ keyword }}
      </p-tag>
      <p-tag
        *ngIf="!hideToggle"
        severity="success"
        style="cursor: pointer; margin-right: 5px; position: relative; top: 2pt;"
        (click)="toggleView()"
      >
        <i [ngClass]="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
        Read {{ isCollapsed ? 'more' : 'less' }}
      </p-tag>
    </span>
    <p-button
      *ngIf="!isKeywords && !hideToggle"
      style="margin-left: 20px; position: relative; top: 7px; font-size: 0.5em;"
      size="small"
      severity="secondary"
      [rounded]="true"
      (click)="toggleView()"
      [icon]="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
      label="Read {{ isCollapsed ? 'more' : 'less' }}"
      class="p-button-text"
    ></p-button>
  `,
  styles: [
    `
      span {
        display: inline;
      }
    `,
  ],
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() text: string;
  @Input() keywords: string[];
  @Input() maxLength: number;
  @Input() maxKeywords: number = 5;
  currentText: string;
  currentKeywords: string[];
  hideToggle: boolean = true;
  public isCollapsed: boolean = true;
  public isKeywords: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (this.keywords) {
      this.isKeywords = true;
      if (this.keywords.length <= this.maxKeywords) {
        this.currentKeywords = this.keywords;
        this.isCollapsed = false;
        this.hideToggle = true;
        return;
      }
      this.hideToggle = false;
      if (this.isCollapsed) {
        this.currentKeywords = this.keywords.slice(0, this.maxKeywords);
      } else {
        this.currentKeywords = this.keywords;
      }
    } else {
      this.isKeywords = false;
      if (this.text.toString().length <= this.maxLength) {
        this.currentText = this.text;
        this.isCollapsed = false;
        this.hideToggle = true;
        return;
      }
      this.hideToggle = false;
      if (this.isCollapsed) {
        this.currentText = this.text.toString().substring(0, this.maxLength) + '...';
      } else {
        this.currentText = this.text;
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.determineView();
    }, 1);
  }
}
