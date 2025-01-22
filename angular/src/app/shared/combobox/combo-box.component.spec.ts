import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { ComboBoxComponent } from "./combo-box.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ComboBoxComponent", () => {
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ComboBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
