import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { MockModule } from '../../mock.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [PaginationComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [MockModule, RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
