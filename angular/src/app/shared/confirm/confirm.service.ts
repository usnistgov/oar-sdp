import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

    constructor(private modalService: NgbModal) { }

    public confirm(
        title: string,
        message: string,
        showWarningIcon: boolean,
        showButtonTwo: boolean = true,
        showButtonThree: boolean = true,
        btnOneText: string = 'Yes',
        btnTwoText: string = 'No',
        btnThreeText: string = 'Cancel',
        dialogSize: 'sm' | 'lg' = 'lg'): Promise<string> {
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false,
            windowClass: "myCustomModalClass"
        };
        const modalRef = this.modalService.open(ConfirmationComponent, ngbModalOptions);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOneText = btnOneText;
        modalRef.componentInstance.btnTwoText = btnTwoText;
        modalRef.componentInstance.btnThreeText = btnThreeText;
        modalRef.componentInstance.showWarningIcon = showWarningIcon;
        modalRef.componentInstance.showButtonTwo = showButtonTwo;
        modalRef.componentInstance.showButtonThree = showButtonThree;

        return modalRef.result;
    }

    public displayMessage(
        title: string,
        message: string,
        showWarningIcon: boolean = false,
        showCancelButton: boolean = false,
        btnOkText: string = 'Close',
        btnCancelText: string = 'NO',
        dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false,
            windowClass: "myCustomModalClass",
            size: dialogSize
        };
        const modalRef = this.modalService.open(ConfirmationComponent, ngbModalOptions);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;
        modalRef.componentInstance.showWarningIcon = showWarningIcon;
        modalRef.componentInstance.showCancelButton = showCancelButton;

        return modalRef.result;
    }
}
