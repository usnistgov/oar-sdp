import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TopicComponent } from "./topic.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
describe("TopicComponent", () => {
  let component: TopicComponent;
  let fixture: ComponentFixture<TopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TopicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
