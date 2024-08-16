import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdvSearchComponent } from './adv-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from '../mock.module';
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";
import { ToastrModule } from 'ngx-toastr';

describe('AdvSearchComponent', () => {
  let component: AdvSearchComponent;
  let fixture: ComponentFixture<AdvSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MockModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AdvSearchComponent ],
      providers: [
        GoogleAnalyticsService,
        {provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA] 
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
