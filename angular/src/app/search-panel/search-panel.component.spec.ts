import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchPanelComponent } from './search-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutoCompleteModule } from "primeng/autocomplete";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MockModule } from '../mock.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            AutoCompleteModule,
            FormsModule,
            MockModule,
            BrowserAnimationsModule,
            OverlayPanelModule,
            ToastrModule.forRoot()
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
