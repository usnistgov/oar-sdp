import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { DataTableModule, TreeModule, AutoCompleteModule } from 'primeng/primeng';
import { MockModule } from '../../mock.module';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports: [
          TreeModule, 
          DataTableModule, 
          AutoCompleteModule, 
          MockModule, 
          FormsModule,
          HttpClientTestingModule,
          RouterTestingModule,
          ToastrModule.forRoot()
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
