import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FiltersComponent } from "./filters.component";
import { TreeModule } from "primeng/tree";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MockModule } from "../../mock.module";
import { FormsModule } from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("FiltersComponent", () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  // Provide fixture data expected by onSuccess test (subset sufficient to meet counts)
  let searchResult: any[] = [
    { keyword: ["Advanced Functional Materials","Metrology","Materials Science"], topic:[{tag:"Nanotechnology"}], contactPoint:{fn:"Michael Winchester"}, components:[{"@type":["nrdp:DataFile"]}], "@type":["nrdp:PublicDataResource"] },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.overrideTemplate(FiltersComponent, "");
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [
        TreeModule,
        AutoCompleteModule,
        MockModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    component.fields = [];
    component.searchValue = "";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("onSuccess builds facets from the backend Facets object", () => {
    const facets = {
      topics: [{ tag: "Nanotechnology", count: 5 }],
      resourceTypes: [{ type: "nrdp:PublicDataResource", count: 3 }],
      keywords: [{ keyword: "advanced functional materials" }],
    };
    component.onSuccess(searchResult, searchResult.length, facets);
    expect(component.keywords).toContain("advanced functional materials");
    expect(component.keywords.length).toBeGreaterThanOrEqual(1);
    expect(component.themesWithCount[0].label.startsWith("Nanotechnology")).toBeTruthy();
    expect(component.resourceTypesWithCount[0].label.startsWith("Public Data Resource")).toBeTruthy();
  });

  it("ignores empty resource type values when building resource types", () => {
    const facets = {
      resourceTypes: [
        { type: "", count: 0 },
        { type: "   ", count: 0 },
        { type: "CodeRepository", count: 4 },
      ],
    };
    component.onSuccess(searchResult, searchResult.length, facets);
    const emptyLabels = component.resourceTypesWithCount.filter(
      (r) => !r.data || r.data.trim() === "" || r.label.startsWith("-")
    );
    expect(emptyLabels.length).toBe(0);
    const codeRepo = component.resourceTypesWithCount.find((r) =>
      r.label.toLowerCase().includes("code repository")
    );
    expect(codeRepo).toBeTruthy();
  });

  it("collects keywords from the backend keyword facets", () => {
    const facets = {
      keywords: [{ keyword: "github" }, { keyword: "javascript" }],
    };
    component.onSuccess([], 0, facets);
    expect(component.keywords).toContain("github");
    expect(component.keywords).toContain("javascript");
  });
});
