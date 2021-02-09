import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { DataTableModule, TreeModule, AutoCompleteModule, CheckboxModule, DropdownModule } from 'primeng/primeng';
import { MockModule } from '../../mock.module';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from '../pagination/pagination.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ReadMoreComponent } from '../search.readmorecomponent';
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../../shared/ga-service/google-analytics.service.mock";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent, PaginationComponent, OverlayPanel, ReadMoreComponent ],
      imports: [
        TreeModule, 
        DataTableModule, 
        AutoCompleteModule, 
        MockModule, 
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CheckboxModule,
        DropdownModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
