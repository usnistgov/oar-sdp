import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { GoogleAnalyticsServiceMock } from "../../shared/ga-service/google-analytics.service.mock";
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from '../../shared/common/common.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ContactUsComponent],
    imports: [RouterTestingModule],
    providers: [{ provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock }, CommonService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
