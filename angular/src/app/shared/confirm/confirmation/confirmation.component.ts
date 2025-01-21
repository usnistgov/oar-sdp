import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"],
})
export class ConfirmationComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOneText: string;
  @Input() btnTwoText: string;
  @Input() btnThreeText: string;
  @Input() showWarningIcon: boolean;
  @Input() showButtonTwo: boolean;
  @Input() showButtonThree: boolean;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    // console.log("message", this.message);
  }

  public decline() {
    this.activeModal.close("no");
  }

  public accept() {
    this.activeModal.close("yes");
  }

  public cancel() {
    this.activeModal.close("cancel");
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
