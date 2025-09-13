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

describe("FiltersComponent", () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let searchResult: any[] = [];

  beforeEach(waitForAsync(() => {
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    component.fields = [];
    component.searchValue = "";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("onSuccess", () => {
    component.onSuccess(searchResult);
    expect(component.keywords.length).toEqual(38);
    expect(component.keywords[0]).toEqual("Advanced Functional Materials");

    expect(component.themes.length).toEqual(8);
    expect(component.themes[0].label).toEqual("Nanotechnology");

    // Updated expectation: now expecting only 1 resource type since "Dataset" is filtered out
    expect(component.resourceTypes.length).toEqual(1);
    expect(component.resourceTypes[0].label).toEqual("Public Data Resource");

    expect(component.components.length).toEqual(4);
    expect(component.components[0].label).toEqual("Data File");

    expect(component.componentsWithCount.length).toEqual(2);
    expect(component.componentsWithCount[0].label).toEqual("Data File-4");
    expect(component.componentsWithCount[1].label).toEqual("Access Page-1");

    expect(component.themesWithCount.length).toEqual(8);
    expect(component.themesWithCount[0].label).toEqual("Nanotechnology-6");
    expect(component.themesWithCount[7].label).toEqual("Electronics-1");

    // Updated expectation: now expecting only 1 resource type with count
    expect(component.resourceTypesWithCount.length).toEqual(1);
    expect(component.resourceTypesWithCount[0].label).toEqual(
      "Public Data Resource-6"
    );
    // Removed the "Dataset-3" expectation since it's now filtered out

    expect(component.authors.length).toEqual(6);
    expect(component.authors[0]).toEqual("Michael Winchester");
    expect(component.authors[5]).toEqual("James Alexander Liddle");
  });
});
