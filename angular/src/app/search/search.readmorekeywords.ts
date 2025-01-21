import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "read-more-keywords",
  template: `
    <span>
      <p-tag
        *ngFor="let keyword of currentKeywords"
        [value]="keyword"
        styleClass="mt-2"
        class="mr-2"
      ></p-tag>
      <p-button
        *ngIf="!hideToggle"
        severity="secondary"
        (click)="toggleView()"
        [icon]="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
        label="Read {{ isCollapsed ? 'more' : 'less' }}"
        styleClass="small-button"
      ></p-button>
    </span>
  `,
  styles: [
    `
      :host ::ng-deep .small-button {
        font-size: 0.8em;
        height: 2em;
        padding: 10px 5px;
        margin-top: 5px;
        line-height: 1em;
      }
    `,
  ],
})
export class ReadMoreKeywordsComponent implements OnInit {
  @Input() text: string | string[];
  @Input() maxKeywords: number = 5;

  isCollapsed: boolean = true;
  currentKeywords: string[];
  hideToggle: boolean = false;

  ngOnInit() {
    this.determineView();
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    let keywordsArray: string[];

    if (Array.isArray(this.text) && typeof this.text[0] === "string" && this.text[0].includes(";")) {
      keywordsArray = this.text[0].split("; ");
    } else if (typeof this.text === "string") {
      keywordsArray = this.text.split("; ");
    } else {
      keywordsArray = this.text as string[];
    }

    if (keywordsArray.length <= this.maxKeywords) {
      this.currentKeywords = keywordsArray;
      this.hideToggle = true;
    } else {
      this.hideToggle = false;
      if (this.isCollapsed) {
        this.currentKeywords = keywordsArray.slice(0, this.maxKeywords);
      } else {
        this.currentKeywords = keywordsArray;
      }
    }
  }
}