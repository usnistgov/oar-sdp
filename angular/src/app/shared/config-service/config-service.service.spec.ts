import { TestBed } from '@angular/core/testing';
import { AppConfig } from './config-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

describe('AppConfig', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterModule, RouterTestingModule],
    providers: [Location]
  }));

  it('should be created', () => {
    const service: AppConfig = TestBed.get(AppConfig);

    expect(service).toBeTruthy();
  });
});
