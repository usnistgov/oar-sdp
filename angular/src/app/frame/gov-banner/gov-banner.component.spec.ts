import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GovBannerComponent } from "./gov-banner.component";

describe("GovBannerComponent", () => {
  let fixture: ComponentFixture<GovBannerComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovBannerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GovBannerComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  const trigger = () =>
    el.querySelector(".gov-banner-trigger") as HTMLButtonElement;
  const dialog = () => el.querySelector<HTMLElement>(".gov-modal");

  it("shows the official-website statement, popup closed by default", () => {
    expect(trigger().textContent).toContain(
      "An official website of the United States government"
    );
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(dialog()).toBeNull();
  });

  it("opens the popup on click, with explanations and a blurred backdrop", () => {
    trigger().click();
    fixture.detectChanges();
    expect(trigger().getAttribute("aria-expanded")).toBe("true");
    expect(dialog()).not.toBeNull();
    expect(dialog().getAttribute("role")).toBe("dialog");
    expect(dialog().textContent).toContain("U.S. Government Websites");
    expect(dialog().textContent).toContain("Official websites use .gov");
    expect(dialog().textContent).toContain("Secure .gov websites use HTTPS");
    expect(el.querySelector(".gov-modal-backdrop")).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes via the close button", () => {
    trigger().click();
    fixture.detectChanges();
    (el.querySelector(".gov-modal-close") as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(dialog()).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes via the backdrop and via Escape", () => {
    trigger().click();
    fixture.detectChanges();
    (el.querySelector(".gov-modal-backdrop") as HTMLElement).click();
    fixture.detectChanges();
    expect(dialog()).toBeNull();

    trigger().click();
    fixture.detectChanges();
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    fixture.detectChanges();
    expect(dialog()).toBeNull();
  });
});
