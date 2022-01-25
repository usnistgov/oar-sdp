/// <amd-module name="@angular/localize/src/tools/src/extract/translation_files/utils" />
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵMessageId, ɵParsedMessage, ɵSourceLocation } from '@angular/localize';
/**
 * Consolidate an array of messages into a map from message id to an array of messages with that id.
 *
 * @param messages the messages to consolidate.
 * @param getMessageId a function that will compute the message id of a message.
 */
export declare function consolidateMessages(messages: ɵParsedMessage[], getMessageId: (message: ɵParsedMessage) => string): Map<ɵMessageId, ɵParsedMessage[]>;
/**
 * Does the given message have a location property?
 */
export declare function hasLocation(message: ɵParsedMessage): message is ɵParsedMessage & {
    location: ɵSourceLocation;
};
