import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdvSearchComponent } from './adv-search.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from '../mock.module';
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AdvSearchComponent', () => {
  let component: AdvSearchComponent;
  let fixture: ComponentFixture<AdvSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AdvSearchComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule,
        MockModule,
        ToastrModule.forRoot()],
    providers: [
        GoogleAnalyticsService,
        { provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
