import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdvSearchComponent } from './adv-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { MockModule } from '../mock.module';
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../shared/ga-service/google-analytics.service.mock";

describe('AdvSearchComponent', () => {
  let component: AdvSearchComponent;
  let fixture: ComponentFixture<AdvSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModalModule,
        MockModule,
        NgbModule.forRoot()
      ],
      declarations: [ AdvSearchComponent ],
      providers: [
        ConfirmationDialogService, 
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
