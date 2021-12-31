import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { HeadbarComponent } from './headbar.component';
import { OverlayPanelModule } from "primeng";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../../app.component';
import { TopMenuBarComponent } from '../../top-menu-bar/top-menu-bar.component';
import { FootbarComponent } from '../footbar';
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../../shared/ga-service/google-analytics.service.mock";
import { MockModule } from '../../mock.module';
import { ToastrModule } from 'ngx-toastr';

describe('HeadbarComponent', () => {
  let component: HeadbarComponent;
  let fixture: ComponentFixture<HeadbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [OverlayPanelModule, RouterTestingModule, HttpClientTestingModule, MockModule,ToastrModule.forRoot()],
        declarations: [ HeadbarComponent, AppComponent, TopMenuBarComponent, FootbarComponent ],
        providers: [ AppComponent, Renderer2, {provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
