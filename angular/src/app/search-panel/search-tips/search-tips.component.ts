import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";

interface SearchTip {
  lead: string;
  example: string;
}

interface FieldHint {
  field: string;
  meaning: string;
}

/**
 * Rotating search tips shown beneath the search bar, with a "Search tips"
 * link that opens a popup (styled after the gov banner popup) describing the
 * search syntax the backend already supports. Standalone: import it where used.
 */
@Component({
  selector: "sdp-search-tips",
  standalone: true,
  imports: [NgFor, NgIf, A11yModule],
  templateUrl: "./search-tips.component.html",
  styleUrls: ["./search-tips.component.scss"],
})
export class SearchTipsComponent implements OnDestroy {
  /** Emits an example query when the user picks one, so the host can prefill the search box. */
  @Output() exampleSelected = new EventEmitter<string>();

  // The first tip is always the quotes tip.
  readonly tips: SearchTip[] = [
    {
      lead: "Looking for words together? Put them in quotes:",
      example: '"analytical chemistry"',
    },
    {
      lead: "Looking for a person? Search by contact name:",
      example: "contactPoint.fn=Levine",
    },
    {
      lead: "Know the subject? Search by keyword:",
      example: "keyword=chemistry",
    },
    {
      lead: "Need results that match both? Join them with AND:",
      example: "keyword=chemistry AND topic.tag=physics",
    },
    {
      lead: "Happy with either? Join them with OR:",
      example: "keyword=chemistry OR topic.tag=physics",
    },
  ];

  readonly fieldHints: FieldHint[] = [
    { field: "contactPoint.fn", meaning: "Contact name" },
    { field: "keyword", meaning: "Subject keywords" },
    { field: "topic.tag", meaning: "Research topic" },
    { field: "title", meaning: "Resource title" },
    { field: "description", meaning: "Resource description" },
    { field: "doi", meaning: "DOI" },
  ];

  index = 0;
  hovered = false;
  focused = false;
  expanded = false;
  readonly reducedMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  private inertElements: HTMLElement[] = [];

  @ViewChild("trigger") private trigger?: ElementRef<HTMLButtonElement>;
  @ViewChild("closeButton") private closeButton?: ElementRef<HTMLButtonElement>;

  get paused(): boolean {
    return this.hovered || this.focused || this.expanded;
  }

  next(): void {
    this.index = (this.index + 1) % this.tips.length;
  }

  selectExample(example: string, closeDialog = false): void {
    if (closeDialog) this.collapse(false);
    this.exampleSelected.emit(example);
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

  collapse(restoreFocus = true): void {
    if (!this.expanded) return;
    this.expanded = false;
    document.body.style.overflow = "";
    this.restoreBackground();
    if (restoreFocus) this.trigger?.nativeElement.focus();
  }

  /**
   * Marks everything outside the dialog (except the click-to-close backdrop)
   * as inert so it can't be reached by keyboard or assistive technology while
   * the modal is open.
   */
  private makeBackgroundInert(): void {
    this.restoreBackground();
    if (!this.expanded) return;
    let node =
      this.closeButton?.nativeElement.closest<HTMLElement>(".tips-modal");
    while (node && node !== document.body) {
      const parent: HTMLElement | null = node.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children) as HTMLElement[]) {
        if (
          sibling !== node &&
          !sibling.classList.contains("tips-modal-backdrop") &&
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
