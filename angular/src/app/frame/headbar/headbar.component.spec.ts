import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Renderer2 } from "@angular/core";
import { HeadbarComponent } from "./headbar.component";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { AppComponent } from "../../app.component";
import { TopMenuBarComponent } from "../../top-menu-bar/top-menu-bar.component";
import { FootbarComponent } from "../footbar";
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../../shared/ga-service/google-analytics.service.mock";
import { MockModule } from "../../mock.module";
import { ToastrModule } from "ngx-toastr";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
describe("HeadbarComponent", () => {
  let component: HeadbarComponent;
  let fixture: ComponentFixture<HeadbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        HeadbarComponent,
        AppComponent,
        TopMenuBarComponent,
        FootbarComponent,
      ],
      imports: [
        OverlayPanelModule,
        RouterTestingModule,
        MockModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        AppComponent,
        Renderer2,
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
    fixture = TestBed.createComponent(HeadbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
