/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser" />
import { Diagnostics } from '../../../diagnostics';
import { ParsedTranslationBundle, TranslationParser } from './translation_parser';
/**
 * A translation parser that can load XB files.
 */
export declare class XtbTranslationParser implements TranslationParser {
    private diagnostics;
    constructor(diagnostics: Diagnostics);
    canParse(filePath: string, contents: string): boolean;
    parse(filePath: string, contents: string): ParsedTranslationBundle;
}
