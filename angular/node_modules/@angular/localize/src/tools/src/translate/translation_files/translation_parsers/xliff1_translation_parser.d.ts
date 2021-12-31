/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser" />
import { ParsedTranslationBundle, TranslationParser } from './translation_parser';
/**
 * A translation parser that can load XLIFF 1.2 files.
 *
 * http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
 * http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
 *
 */
export declare class Xliff1TranslationParser implements TranslationParser {
    canParse(filePath: string, contents: string): boolean;
    parse(filePath: string, contents: string): ParsedTranslationBundle;
}
