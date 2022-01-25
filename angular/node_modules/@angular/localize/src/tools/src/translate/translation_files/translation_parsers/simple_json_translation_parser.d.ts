/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser" />
import { ParseAnalysis, ParsedTranslationBundle, TranslationParser } from './translation_parser';
/**
 * A translation parser that can parse JSON that has the form:
 *
 * ```
 * {
 *   "locale": "...",
 *   "translations": {
 *     "message-id": "Target message string",
 *     ...
 *   }
 * }
 * ```
 *
 * @see SimpleJsonTranslationSerializer
 * @publicApi used by CLI
 */
export declare class SimpleJsonTranslationParser implements TranslationParser<Object> {
    /**
     * @deprecated
     */
    canParse(filePath: string, contents: string): Object | false;
    analyze(filePath: string, contents: string): ParseAnalysis<Object>;
    parse(_filePath: string, contents: string, json?: Object): ParsedTranslationBundle;
}
