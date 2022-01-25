import { Message } from './message';
import * as ɵngcc0 from '@angular/core';
export declare class MessageService {
    private messageSource;
    private clearSource;
    messageObserver: import("rxjs").Observable<Message | Message[]>;
    clearObserver: import("rxjs").Observable<string>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(key?: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MessageService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MessageService>;
}

//# sourceMappingURL=messageservice.d.ts.map