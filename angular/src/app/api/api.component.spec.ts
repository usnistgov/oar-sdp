import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ApiComponent } from "./api.component";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
describe("ApiComponent", () => {
  let component: ApiComponent;
  let fixture: ComponentFixture<ApiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ApiComponent],
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
    fixture = TestBed.createComponent(ApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
