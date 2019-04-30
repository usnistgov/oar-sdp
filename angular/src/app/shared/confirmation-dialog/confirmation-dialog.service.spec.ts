import { TestBed, inject } from '@angular/core/testing';

import { ConfirmationDialogService } from './confirmation-dialog.service';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmationDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule,
        NgbModule.forRoot()
      ],
      providers: [ConfirmationDialogService]
    });
  });

  it('should be created', inject([ConfirmationDialogService], (service: ConfirmationDialogService) => {
    expect(service).toBeTruthy();
  }));
});
