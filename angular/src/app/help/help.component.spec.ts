import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SearchSyntaxComponent } from "./search-syntax/search-syntax.component";
import { HelpPageNotFoundComponent } from "./not-found/not-found.component";
import { HowAdvancedSearchComponent } from "./how-advanced-search/how-advanced-search.component";
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [ 
        HelpComponent,
        ContactUsComponent,
        SearchSyntaxComponent,
        HelpPageNotFoundComponent,
        HowAdvancedSearchComponent
      ],
      providers: [{provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'The first lable should be "help"',
    (() => {
      TestBed.compileComponents().then(() => {
        let aboutDOMEl = fixture.debugElement.children[0].nativeElement;
        expect(aboutDOMEl.querySelectorAll('label')[0].textContent.trim()).toEqual(
          'Help'
        );
      });
    })
  );
});
