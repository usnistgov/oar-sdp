import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig } from '..//shared/config-service/config.service';
import { MockModule } from '../mock.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const appInitializerFn = (appConfig: AppConfig) => {
    return () => {
      appConfig.loadRemoteConfig();
    };
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MockModule
      ],
      declarations: [ HomeComponent ],
      providers: [ AppConfig ],
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

  // Note: this is getting its configuration from environments/environmnet.ts
  it('should set the forensics URL', () => {
    expect(component.forensicsURL).toEqual("http://localhost:4000/forensics")
  });
});
