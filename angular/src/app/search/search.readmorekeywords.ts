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
    let keywordsArray: string[] = [];
    const raw = this.text;

    if (Array.isArray(raw)) {
      if (
        raw.length === 1 &&
        typeof raw[0] === "string" &&
        raw[0].includes(";")
      ) {
        keywordsArray = raw[0]
          .split(";")
          .map((value) => value.trim())
          .filter((value) => !!value);
      } else {
        keywordsArray = raw
          .filter((value) => typeof value === "string")
          .map((value) => String(value).trim())
          .filter((value) => !!value);
      }
    } else if (typeof raw === "string") {
      keywordsArray = raw
        .split(";")
        .map((value) => value.trim())
        .filter((value) => !!value);
    }

    if (!keywordsArray.length) {
      this.currentKeywords = [];
      this.hideToggle = true;
      return;
    }

    if (keywordsArray.length <= this.maxKeywords) {
      this.currentKeywords = keywordsArray;
      this.hideToggle = true;
      return;
    }

    this.hideToggle = false;
    this.currentKeywords = this.isCollapsed
      ? keywordsArray.slice(0, this.maxKeywords)
      : keywordsArray;
  }
}
