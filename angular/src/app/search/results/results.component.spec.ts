import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { TreeModule } from 'primeng/tree';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MockModule } from '../../mock.module';
import { FormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from '../pagination/pagination.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../../shared/ga-service/google-analytics.service.mock";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReadMoreKeywordsComponent } from '../search.readmorekeywords';
import { ReadMoreDescriptionComponent } from '../search.readmoredescription';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ResultsComponent,
        PaginationComponent,
        OverlayPanel,
        ReadMoreKeywordsComponent,
        ReadMoreDescriptionComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [TreeModule,
        AutoCompleteModule,
        MockModule,
        FormsModule,
        RouterTestingModule,
        CheckboxModule,
        DropdownModule,
        ToastrModule.forRoot()],
    providers: [
        { provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});