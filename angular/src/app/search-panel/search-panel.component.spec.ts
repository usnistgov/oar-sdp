import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SearchPanelComponent } from "./search-panel.component";
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { AutoCompleteModule } from "primeng/autocomplete";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { MockModule } from "../mock.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ data: [] }),
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: () => Promise.resolve("term\r\n"),
  })
);

describe("SearchPanelComponent", () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SearchPanelComponent],
      imports: [
        RouterTestingModule,
        AutoCompleteModule,
        FormsModule,
        MockModule,
        BrowserAnimationsModule,
        OverlayPanelModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("SI search mode", () => {
    afterEach(() => component.searchQueryService.setAiMode(false));

    it("is off by default and toggles the glow class and banner", () => {
      const group = fixture.nativeElement.querySelector(".search-input-group");
      expect(component.aiMode).toBe(false);
      expect(group.classList).not.toContain("search-input-group--ai");
      expect(fixture.nativeElement.querySelector(".ai-banner")).toBeNull();

      component.toggleAiMode();
      fixture.detectChanges();
      expect(component.aiMode).toBe(true);
      expect(group.classList).toContain("search-input-group--ai");
      expect(fixture.nativeElement.querySelector(".ai-banner")).not.toBeNull();

      component.toggleAiMode();
      fixture.detectChanges();
      expect(component.aiMode).toBe(false);
      expect(fixture.nativeElement.querySelector(".ai-banner")).toBeNull();
    });

    it("prefills the search bar from the TRY example", () => {
      component.toggleAiMode();
      fixture.detectChanges();
      fixture.nativeElement.querySelector(".ai-banner__example").click();
      expect(component.searchValue).toBe(component.aiExamples[0].query);
    });

    it("exposes the switch state for assistive tech", () => {
      const btn = fixture.nativeElement.querySelector(".search-addon--ai");
      expect(btn.getAttribute("aria-checked")).toBe("false");
      btn.click();
      fixture.detectChanges();
      expect(btn.getAttribute("aria-checked")).toBe("true");
    });

    it("uses natural language placeholders and skips keyword suggestions", () => {
      component.toggleAiMode();
      expect(component.currentPlaceholders).toBe(component.aiPlaceHolderText);
      component.parsed_data = [["gallium"]];
      component.parsed_data_headers = ["term"];
      component.filterTaxonomies({ query: "gal" });
      expect(component.suggestedTaxonomyList).toEqual([]);
      expect(component.shouldShowEmptyMessage()).toBe(false);
    });
  });
});
