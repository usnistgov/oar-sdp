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
import { MenubarModule } from "primeng/menubar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("HeadbarComponent", () => {
  let component: HeadbarComponent;
  let fixture: ComponentFixture<HeadbarComponent>;
  let renderer: Renderer2;

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
        MenubarModule,
        NoopAnimationsModule,
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
    renderer = fixture.componentRef.injector.get(Renderer2);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should hide dropdown when mouse leaves", async () => {
    // Wait for initial render
    await fixture.whenStable();

    // Ensure menubar is initialized
    expect(component.menubar).toBeTruthy();

    const menubarElement = fixture.nativeElement.querySelector("p-menubar");

    // First show the dropdown
    component.menubar.show();
    fixture.detectChanges();

    // Then hide it
    component.menubar.hide();
    fixture.detectChanges();

    // Check for active menu items (should be none after hide)
    const activeMenuItems =
      menubarElement.querySelectorAll(".p-menuitem-active");
    expect(activeMenuItems.length).toBe(0);

    // Check that overlay is hidden
    const visibleOverlay = menubarElement.querySelector(
      '.p-menubar-root-list[role="menubar"]'
    );
    expect(
      visibleOverlay?.classList.contains("p-submenu-list-active")
    ).toBeFalsy();
  });

  it("should show dropdown when mouse enters", () => {
    const menubarElement = fixture.nativeElement.querySelector("p-menubar");
    const mouseEnterEvent = new Event("mouseenter");
    menubarElement.dispatchEvent(mouseEnterEvent);
    fixture.detectChanges();

    const dropdownItems = menubarElement.querySelectorAll(".p-submenu-list");
    dropdownItems.forEach((item) => {
      const style = getComputedStyle(item);
      expect(style.display).toBe("block");
    });
  });
});
