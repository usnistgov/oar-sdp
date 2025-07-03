
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TopMenuBarComponent } from "./top-menu-bar.component";
import { SEARCH_SERVICE } from "../shared/search-service";
import { AppConfig } from "../shared/config-service/config.service";
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { SearchQueryService } from "../shared/search-query/search-query.service";
import { MockSearchService } from "../shared/search-service/search-service.service.mock";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { ToastrModule } from "ngx-toastr";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("TopMenuBarComponent", () => {
  let component: TopMenuBarComponent;
  let fixture: ComponentFixture<TopMenuBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [TopMenuBarComponent, AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule,
        ToastrModule.forRoot()],
    providers: [
        { provide: AppComponent, useClass: AppComponent },
        { provide: SEARCH_SERVICE, useClass: MockSearchService },
        {
            provide: GoogleAnalyticsService,
            useClass: GoogleAnalyticsServiceMock,
        },
        AppConfig,
        SearchQueryService,
        Location,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
