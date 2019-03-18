import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig } from '..//shared/config-service/config-service.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const appInitializerFn = (appConfig: AppConfig) => {
    return () => {
      appConfig.loadConfigForTest();
      return appConfig.loadAppConfig();
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFn,
          multi: true,
          deps: [AppConfig]
        }],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
