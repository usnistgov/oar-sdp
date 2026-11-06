import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgIf } from "@angular/common";

/**
 * "An official website of the United States government" banner, styled after
 * the one on america.gov. Clicking it opens a centered popup (with a blurred
 * backdrop) explaining .gov and HTTPS. Standalone: import it where rendered.
 */
@Component({
  selector: "sdp-gov-banner",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./gov-banner.component.html",
  styleUrls: ["./gov-banner.component.css"],
})
export class GovBannerComponent implements OnDestroy {
  expanded = false;

  @ViewChild("trigger") private trigger?: ElementRef<HTMLButtonElement>;
  @ViewChild("closeButton") private closeButton?: ElementRef<HTMLButtonElement>;

  toggle(): void {
    if (this.expanded) this.collapse();
    else this.open();
  }

  open(): void {
    this.expanded = true;
    // Keep the page from scrolling behind the popup.
    document.body.style.overflow = "hidden";
    // Move focus into the dialog once it has rendered.
    setTimeout(() => this.closeButton?.nativeElement.focus());
  }

  collapse(): void {
    if (!this.expanded) return;
    this.expanded = false;
    document.body.style.overflow = "";
    this.trigger?.nativeElement.focus();
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    this.collapse();
  }

  ngOnDestroy(): void {
    if (this.expanded) document.body.style.overflow = "";
  }
}
