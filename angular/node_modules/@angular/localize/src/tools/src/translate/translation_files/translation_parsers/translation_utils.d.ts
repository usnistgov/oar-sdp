/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Element, Node } from '@angular/compiler';
export declare function getAttrOrThrow(element: Element, attrName: string): string;
export declare function getAttribute(element: Element, attrName: string): string | undefined;
export declare function parseInnerRange(element: Element): Node[];
