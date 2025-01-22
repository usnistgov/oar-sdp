import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { HelpComponent } from "./help.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SearchSyntaxComponent } from "./search-syntax/search-syntax.component";
import { HelpPageNotFoundComponent } from "./not-found/not-found.component";
import { HowAdvancedSearchComponent } from "./how-advanced-search/how-advanced-search.component";
import { RouterTestingModule } from "@angular/router/testing";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("HelpComponent", () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        HelpComponent,
        ContactUsComponent,
        SearchSyntaxComponent,
        HelpPageNotFoundComponent,
        HowAdvancedSearchComponent,
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: GoogleAnalyticsService,
          useClass: GoogleAnalyticsServiceMock,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('The first lable should be "help"', () => {
    TestBed.compileComponents().then(() => {
      let aboutDOMEl = fixture.debugElement.children[0].nativeElement;
      expect(
        aboutDOMEl.querySelectorAll("label")[0].textContent.trim()
      ).toEqual("Help");
    });
  });
});
