import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "read-more-description",
  template: `
    <span>
      {{ currentText }}
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
      :host ::ng-deep .small-button.p-button {
        background-color: transparent;
        border: 1px solid #cbd5e1;
        border-radius: 999px;
        color: #475569;
        font-size: 0.72rem;
        font-weight: 500;
        height: auto;
        padding: 0.25em 0.75em;
        margin-left: 4px;
        line-height: 1.4;
        box-shadow: none;
        position: relative;
        top: 3px;
      }
      :host ::ng-deep .small-button.p-button:hover {
        background-color: #f1f5f9;
        border-color: #94a3b8;
        color: #1e293b;
      }
    `,
  ],
})
export class ReadMoreDescriptionComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() maxLength: number = 300;

  isCollapsed: boolean = true;
  currentText: string;
  hideToggle: boolean = false;

  ngOnInit() {
    this.determineView();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.text) {
      this.isCollapsed = true;
      this.determineView();
    }
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    const textStr = String(this.text ?? ''); // Guard against null/undefined
    if (textStr.length <= this.maxLength) {
      this.currentText = textStr;
      this.hideToggle = true;
    } else {
      this.hideToggle = false;
      if (this.isCollapsed) {
        this.currentText = textStr.substring(0, this.maxLength) + "...";
      } else {
        this.currentText = textStr;
      }
    }
  }
}