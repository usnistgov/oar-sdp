import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxComponent } from './combo-box.component';

describe('ComboBoxComponent', () => {
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
