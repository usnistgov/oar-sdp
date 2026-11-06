import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgIf } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";

/**
 * "An official website of the United States government" banner, styled after
 * the one on america.gov. Clicking it opens a centered popup (with a blurred
 * backdrop) explaining .gov and HTTPS. Standalone: import it where rendered.
 */
@Component({
  selector: "sdp-gov-banner",
  standalone: true,
  imports: [NgIf, A11yModule],
  templateUrl: "./gov-banner.component.html",
  styleUrls: ["./gov-banner.component.css"],
})
export class GovBannerComponent implements OnDestroy {
  expanded = false;
  private inertElements: HTMLElement[] = [];

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
    setTimeout(() => {
      this.makeBackgroundInert();
      this.closeButton?.nativeElement.focus();
    });
  }

  collapse(): void {
    if (!this.expanded) return;
    this.expanded = false;
    document.body.style.overflow = "";
    this.restoreBackground();
    this.trigger?.nativeElement.focus();
  }

  /**
   * Marks everything outside the dialog (except the click-to-close backdrop)
   * as inert so it can't be reached by keyboard or assistive technology while
   * the modal is open.
   */
  private makeBackgroundInert(): void {
    this.restoreBackground();
    if (!this.expanded) return;
    let node = this.closeButton?.nativeElement.closest<HTMLElement>(".gov-modal");
    while (node && node !== document.body) {
      const parent: HTMLElement | null = node.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children) as HTMLElement[]) {
        if (
          sibling !== node &&
          !sibling.classList.contains("gov-modal-backdrop") &&
          !sibling.hasAttribute("inert")
        ) {
          sibling.setAttribute("inert", "");
          this.inertElements.push(sibling);
        }
      }
      node = parent;
    }
  }

  private restoreBackground(): void {
    this.inertElements.forEach((e) => e.removeAttribute("inert"));
    this.inertElements = [];
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    this.collapse();
  }

  ngOnDestroy(): void {
    if (this.expanded) document.body.style.overflow = "";
    this.restoreBackground();
  }
}
