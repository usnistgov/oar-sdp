import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';
export function main() {
  describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let comp: AboutComponent;
    let de: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AboutComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AboutComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('p'));
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should have expected <p> text', () => {
      fixture.detectChanges();
      const p = de.nativeElement;
      expect(p.textContent).toMatch(/Dissemination/i,
        '<P> should say something about "Dissemination"');
    });
    it('should have proper label', () => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.labelStyle'));
      const label = de.nativeElement;
      expect(label.textContent).toEqual('About Public Data Repository');
    });

  });
}
