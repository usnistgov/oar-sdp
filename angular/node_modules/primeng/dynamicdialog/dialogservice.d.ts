import { ComponentFactoryResolver, ApplicationRef, Injector, Type, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import * as ɵngcc0 from '@angular/core';
export declare class DialogService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>>;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    open(componentType: Type<any>, config: DynamicDialogConfig): DynamicDialogRef;
    private appendDialogComponentToBody;
    private removeDialogComponentFromBody;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DialogService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DialogService>;
}

//# sourceMappingURL=dialogservice.d.ts.map