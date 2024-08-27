import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "read-more-description",
  template: `
    <span>
      {{ currentText }}
      <p-button
        *ngIf="!hideToggle"
        severity="secondary"
        [rounded]="true"
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
        position: relative;
        top: -1px;
        font-size: 0.8em;
        height: 1.5em;
        padding: 5px 5px;
        line-height: 1em;
      }
    `,
  ],
})
export class ReadMoreDescriptionComponent implements OnInit {
  @Input() text: string;
  @Input() maxLength: number = 300;

  isCollapsed: boolean = true;
  currentText: string;
  hideToggle: boolean = false;

  ngOnInit() {
    this.determineView();
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    const textStr = String(this.text); // Ensure text is treated as a string
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