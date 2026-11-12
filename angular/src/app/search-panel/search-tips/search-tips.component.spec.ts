import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchTipsComponent } from "./search-tips.component";

describe("SearchTipsComponent", () => {
  let component: SearchTipsComponent;
  let fixture: ComponentFixture<SearchTipsComponent>;
  let el: HTMLElement;

  const pillText = () =>
    el.querySelector(".tips-pill-label")!.textContent!.replace(/\s+/g, "");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTipsComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("always starts with the quotes tip", () => {
    expect(pillText()).toBe("1/" + component.tips.length);
    expect(el.querySelector(".tips-tip")!.textContent).toContain(
      "Looking for words together?"
    );
    expect(el.querySelector(".tips-example")!.textContent!.trim()).toBe(
      '"analytical chemistry"'
    );
  });

  it("advances to the next tip when the pill's progress ring completes", () => {
    el.querySelector(".tips-ring-fill")!.dispatchEvent(
      new Event("animationend")
    );
    fixture.detectChanges();
    expect(pillText()).toBe("2/" + component.tips.length);
  });

  it("wraps around to the first tip after the last one", () => {
    for (let i = 0; i < component.tips.length; i++) component.next();
    expect(component.index).toBe(0);
  });

  it("pauses the timer while hovered, focused or the popup is open", () => {
    const row = el.querySelector(".tips") as HTMLElement;
    row.dispatchEvent(new Event("mouseenter"));
    fixture.detectChanges();
    const fill = () => el.querySelector(".tips-ring-fill") as SVGElement;
    expect(fill().style.animationPlayState).toBe("paused");

    row.dispatchEvent(new Event("mouseleave"));
    fixture.detectChanges();
    expect(fill().style.animationPlayState).toBe("running");
  });

  it("opens the popup from the Search tips link and closes it with Escape", () => {
    (el.querySelector(".tips-link") as HTMLElement).click();
    fixture.detectChanges();
    expect(el.querySelector(".tips-modal")).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");

    component.onEscape();
    fixture.detectChanges();
    expect(el.querySelector(".tips-modal")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("emits the example and closes the popup when one is picked inside it", () => {
    const picked: string[] = [];
    component.exampleSelected.subscribe((v: string) => picked.push(v));

    component.open();
    fixture.detectChanges();
    (
      el.querySelector(".tips-modal .tips-example--light") as HTMLElement
    ).click();
    fixture.detectChanges();

    expect(picked).toEqual(['"analytical chemistry"']);
    expect(el.querySelector(".tips-modal")).toBeNull();
  });
});
