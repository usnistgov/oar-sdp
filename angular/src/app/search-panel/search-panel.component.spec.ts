import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPanelComponent } from './search-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverlayPanelModule, AutoCompleteModule } from "primeng/primeng";
import { MockModule } from '../mock.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            AutoCompleteModule,
            FormsModule,
            MockModule,
            BrowserAnimationsModule,
            OverlayPanelModule
          ],
      declarations: [ SearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
