#!/usr/bin/env node
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/main", ["require", "exports", "glob", "path", "yargs", "@angular/localize/src/tools/src/translate/asset_files/asset_translation_handler", "@angular/localize/src/tools/src/translate/output_path", "@angular/localize/src/tools/src/translate/source_files/source_file_translation_handler", "@angular/localize/src/tools/src/translate/translation_files/translation_loader", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser", "@angular/localize/src/tools/src/translate/translator", "@angular/localize/src/tools/src/diagnostics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var glob = require("glob");
    var path_1 = require("path");
    var yargs = require("yargs");
    var asset_translation_handler_1 = require("@angular/localize/src/tools/src/translate/asset_files/asset_translation_handler");
    var output_path_1 = require("@angular/localize/src/tools/src/translate/output_path");
    var source_file_translation_handler_1 = require("@angular/localize/src/tools/src/translate/source_files/source_file_translation_handler");
    var translation_loader_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_loader");
    var simple_json_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser");
    var xliff1_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser");
    var xliff2_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser");
    var xtb_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser");
    var translator_1 = require("@angular/localize/src/tools/src/translate/translator");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    if (require.main === module) {
        var args = process.argv.slice(2);
        var options = yargs
            .option('r', {
            alias: 'root',
            required: true,
            describe: 'The root path of the files to translate, either absolute or relative to the current working directory. E.g. `dist/en`.',
        })
            .option('s', {
            alias: 'source',
            required: true,
            describe: 'A glob pattern indicating what files to translate, relative to the `root` path. E.g. `bundles/**/*`.',
        })
            .option('l', {
            alias: 'source-locale',
            describe: 'The source locale of the application. If this is provided then a copy of the application will be created with no translation but just the `$localize` calls stripped out.',
        })
            .option('t', {
            alias: 'translations',
            required: true,
            array: true,
            describe: 'A list of paths to the translation files to load, either absolute or relative to the current working directory.\n' +
                'E.g. "-t src/locale/messages.en.xlf src/locale/messages.fr.xlf src/locale/messages.de.xlf".',
        })
            .option('target-locales', {
            array: true,
            describe: 'A list of target locales for the translation files, which will override any target locale parsed from the translation file.\n' +
                'E.g. "-t en fr de".',
        })
            .option('o', {
            alias: 'outputPath',
            required: true,
            describe: 'A output path pattern to where the translated files will be written. The marker `{{LOCALE}}` will be replaced with the target locale. E.g. `dist/{{LOCALE}}`.'
        })
            .option('m', {
            alias: 'missingTranslation',
            describe: 'How to handle missing translations.',
            choices: ['error', 'warning', 'ignore'],
            default: 'warning',
        })
            .help()
            .parse(args);
        var sourceRootPath = options['r'];
        var sourceFilePaths = glob.sync(options['s'], { absolute: true, cwd: sourceRootPath, nodir: true });
        var translationFilePaths = options['t'];
        var outputPathFn = output_path_1.getOutputPathFn(options['o']);
        var diagnostics = new diagnostics_1.Diagnostics();
        var missingTranslation = options['m'];
        var sourceLocale = options['l'];
        var translationFileLocales = options['target-locales'] || [];
        translateFiles({ sourceRootPath: sourceRootPath, sourceFilePaths: sourceFilePaths, translationFilePaths: translationFilePaths, translationFileLocales: translationFileLocales,
            outputPathFn: outputPathFn, diagnostics: diagnostics, missingTranslation: missingTranslation, sourceLocale: sourceLocale });
        diagnostics.messages.forEach(function (m) { return console.warn(m.type + ": " + m.message); });
        process.exit(diagnostics.hasErrors ? 1 : 0);
    }
    function translateFiles(_a) {
        var sourceRootPath = _a.sourceRootPath, sourceFilePaths = _a.sourceFilePaths, translationFilePaths = _a.translationFilePaths, translationFileLocales = _a.translationFileLocales, outputPathFn = _a.outputPathFn, diagnostics = _a.diagnostics, missingTranslation = _a.missingTranslation, sourceLocale = _a.sourceLocale;
        var translationLoader = new translation_loader_1.TranslationLoader([
            new xliff2_translation_parser_1.Xliff2TranslationParser(),
            new xliff1_translation_parser_1.Xliff1TranslationParser(),
            new xtb_translation_parser_1.XtbTranslationParser(diagnostics),
            new simple_json_translation_parser_1.SimpleJsonTranslationParser(),
        ], diagnostics);
        var resourceProcessor = new translator_1.Translator([
            new source_file_translation_handler_1.SourceFileTranslationHandler({ missingTranslation: missingTranslation }),
            new asset_translation_handler_1.AssetTranslationHandler(),
        ], diagnostics);
        var translations = translationLoader.loadBundles(translationFilePaths, translationFileLocales);
        sourceRootPath = path_1.resolve(sourceRootPath);
        resourceProcessor.translateFiles(sourceFilePaths, sourceRootPath, outputPathFn, translations, sourceLocale);
    }
    exports.translateFiles = translateFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQ0E7Ozs7OztPQU1HO0lBQ0gsMkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3Qiw2QkFBK0I7SUFFL0IsNkhBQWdGO0lBQ2hGLHFGQUE0RDtJQUM1RCwwSUFBNEY7SUFFNUYscUhBQXlFO0lBQ3pFLGlLQUFtSDtJQUNuSCx1SkFBMEc7SUFDMUcsdUpBQTBHO0lBQzFHLGlKQUFvRztJQUNwRyxtRkFBd0M7SUFDeEMsMkVBQTJDO0lBRTNDLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDM0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBTSxPQUFPLEdBQ1QsS0FBSzthQUNBLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLEVBQUUsTUFBTTtZQUNiLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUNKLHdIQUF3SDtTQUM3SCxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQ0osc0dBQXNHO1NBQzNHLENBQUM7YUFFRCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLGVBQWU7WUFDdEIsUUFBUSxFQUNKLDJLQUEySztTQUNoTCxDQUFDO2FBRUQsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQ0osbUhBQW1IO2dCQUNuSCw2RkFBNkY7U0FDbEcsQ0FBQzthQUVE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QUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsaUJBQWlCLENBQUMsY0FBYyxDQUM1QixlQUFlLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQXZCRCx3Q0F1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IHtyZXNvbHZlfSBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHlhcmdzIGZyb20gJ3lhcmdzJztcblxuaW1wb3J0IHtBc3NldFRyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSAnLi9hc3NldF9maWxlcy9hc3NldF90cmFuc2xhdGlvbl9oYW5kbGVyJztcbmltcG9ydCB7Z2V0T3V0cHV0UGF0aEZuLCBPdXRwdXRQYXRoRm59IGZyb20gJy4vb3V0cHV0X3BhdGgnO1xuaW1wb3J0IHtTb3VyY2VGaWxlVHJhbnNsYXRpb25IYW5kbGVyfSBmcm9tICcuL3NvdXJjZV9maWxlcy9zb3VyY2VfZmlsZV90cmFuc2xhdGlvbl9oYW5kbGVyJztcbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4vc291cmNlX2ZpbGVzL3NvdXJjZV9maWxlX3V0aWxzJztcbmltcG9ydCB7VHJhbnNsYXRpb25Mb2FkZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fbG9hZGVyJztcbmltcG9ydCB7U2ltcGxlSnNvblRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMvc2ltcGxlX2pzb25fdHJhbnNsYXRpb25fcGFyc2VyJztcbmltcG9ydCB7WGxpZmYxVHJhbnNsYXRpb25QYXJzZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy94bGlmZjFfdHJhbnNsYXRpb25fcGFyc2VyJztcbmltcG9ydCB7WGxpZmYyVHJhbnNsYXRpb25QYXJzZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy94bGlmZjJfdHJhbnNsYXRpb25fcGFyc2VyJztcbmltcG9ydCB7WHRiVHJhbnNsYXRpb25QYXJzZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy94dGJfdHJhbnNsYXRpb25fcGFyc2VyJztcbmltcG9ydCB7VHJhbnNsYXRvcn0gZnJvbSAnLi90cmFuc2xhdG9yJztcbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uL2RpYWdub3N0aWNzJztcblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGNvbnN0IGFyZ3MgPSBwcm9jZXNzLmFyZ3Yuc2xpY2UoMik7XG4gIGNvbnN0IG9wdGlvbnMgPVxuICAgICAgeWFyZ3NcbiAgICAgICAgICAub3B0aW9uKCdyJywge1xuICAgICAgICAgICAgYWxpYXM6ICdyb290JyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ1RoZSByb290IHBhdGggb2YgdGhlIGZpbGVzIHRvIHRyYW5zbGF0ZSwgZWl0aGVyIGFic29sdXRlIG9yIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LiBFLmcuIGBkaXN0L2VuYC4nLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9wdGlvbigncycsIHtcbiAgICAgICAgICAgIGFsaWFzOiAnc291cmNlJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ0EgZ2xvYiBwYXR0ZXJuIGluZGljYXRpbmcgd2hhdCBmaWxlcyB0byB0cmFuc2xhdGUsIHJlbGF0aXZlIHRvIHRoZSBgcm9vdGAgcGF0aC4gRS5nLiBgYnVuZGxlcy8qKi8qYC4nLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAub3B0aW9uKCdsJywge1xuICAgICAgICAgICAgYWxpYXM6ICdzb3VyY2UtbG9jYWxlJyxcbiAgICAgICAgICAgIGRlc2NyaWJlOlxuICAgICAgICAgICAgICAgICdUaGUgc291cmNlIGxvY2FsZSBvZiB0aGUgYXBwbGljYXRpb24uIElmIHRoaXMgaXMgcHJvdmlkZWQgdGhlbiBhIGNvcHkgb2YgdGhlIGFwcGxpY2F0aW9uIHdpbGwgYmUgY3JlYXRlZCB3aXRoIG5vIHRyYW5zbGF0aW9uIGJ1dCBqdXN0IHRoZSBgJGxvY2FsaXplYCBjYWxscyBzdHJpcHBlZCBvdXQuJyxcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLm9wdGlvbigndCcsIHtcbiAgICAgICAgICAgIGFsaWFzOiAndHJhbnNsYXRpb25zJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgYXJyYXk6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQSBsaXN0IG9mIHBhdGhzIHRvIHRoZSB0cmFuc2xhdGlvbiBmaWxlcyB0byBsb2FkLCBlaXRoZXIgYWJzb2x1dGUgb3IgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXFxuJyArXG4gICAgICAgICAgICAgICAgJ0UuZy4gXCItdCBzcmMvbG9jYWxlL21lc3NhZ2VzLmVuLnhsZiBzcmMvbG9jYWxlL21lc3NhZ2VzLmZyLnhsZiBzcmMvbG9jYWxlL21lc3NhZ2VzLmRlLnhsZlwiLicsXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC5vcHRpb24oJ3RhcmdldC1sb2NhbGVzJywge1xuICAgICAgICAgICAgYXJyYXk6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQSBsaXN0IG9mIHRhcmdldCBsb2NhbGVzIGZvciB0aGUgdHJhbnNsYXRpb24gZmlsZXMsIHdoaWNoIHdpbGwgb3ZlcnJpZGUgYW55IHRhcmdldCBsb2NhbGUgcGFyc2VkIGZyb20gdGhlIHRyYW5zbGF0aW9uIGZpbGUuXFxuJyArXG4gICAgICAgICAgICAgICAgJ0UuZy4gXCItdCBlbiBmciBkZVwiLicsXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC5vcHRpb24oJ28nLCB7XG4gICAgICAgICAgICBhbGlhczogJ291dHB1dFBhdGgnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQSBvdXRwdXQgcGF0aCBwYXR0ZXJuIHRvIHdoZXJlIHRoZSB0cmFuc2xhdGVkIGZpbGVzIHdpbGwgYmUgd3JpdHRlbi4gVGhlIG1hcmtlciBge3tMT0NBTEV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB0YXJnZXQgbG9jYWxlLiBFLmcuIGBkaXN0L3t7TE9DQUxFfX1gLidcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLm9wdGlvbignbScsIHtcbiAgICAgICAgICAgIGFsaWFzOiAnbWlzc2luZ1RyYW5zbGF0aW9uJyxcbiAgICAgICAgICAgIGRlc2NyaWJlOiAnSG93IHRvIGhhbmRsZSBtaXNzaW5nIHRyYW5zbGF0aW9ucy4nLFxuICAgICAgICAgICAgY2hvaWNlczogWydlcnJvcicsICd3YXJuaW5nJywgJ2lnbm9yZSddLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3dhcm5pbmcnLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAuaGVscCgpXG4gICAgICAgICAgLnBhcnNlKGFyZ3MpO1xuXG4gIGNvbnN0IHNvdXJjZVJvb3RQYXRoID0gb3B0aW9uc1snciddO1xuICBjb25zdCBzb3VyY2VGaWxlUGF0aHMgPVxuICAgICAgZ2xvYi5zeW5jKG9wdGlvbnNbJ3MnXSwge2Fic29sdXRlOiB0cnVlLCBjd2Q6IHNvdXJjZVJvb3RQYXRoLCBub2RpcjogdHJ1ZX0pO1xuICBjb25zdCB0cmFuc2xhdGlvbkZpbGVQYXRoczogc3RyaW5nW10gPSBvcHRpb25zWyd0J107XG4gIGNvbnN0IG91dHB1dFBhdGhGbiA9IGdldE91dHB1dFBhdGhGbihvcHRpb25zWydvJ10pO1xuICBjb25zdCBkaWFnbm9zdGljcyA9IG5ldyBEaWFnbm9zdGljcygpO1xuICBjb25zdCBtaXNzaW5nVHJhbnNsYXRpb246IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5ID0gb3B0aW9uc1snbSddO1xuICBjb25zdCBzb3VyY2VMb2NhbGU6IHN0cmluZ3x1bmRlZmluZWQgPSBvcHRpb25zWydsJ107XG4gIGNvbnN0IHRyYW5zbGF0aW9uRmlsZUxvY2FsZXM6IHN0cmluZ1tdID0gb3B0aW9uc1sndGFyZ2V0LWxvY2FsZXMnXSB8fCBbXTtcblxuICB0cmFuc2xhdGVGaWxlcyh7c291cmNlUm9vdFBhdGgsIHNvdXJjZUZpbGVQYXRocywgdHJhbnNsYXRpb25GaWxlUGF0aHMsIHRyYW5zbGF0aW9uRmlsZUxvY2FsZXMsXG4gICAgICAgICAgICAgICAgICBvdXRwdXRQYXRoRm4sIGRpYWdub3N0aWNzLCBtaXNzaW5nVHJhbnNsYXRpb24sIHNvdXJjZUxvY2FsZX0pO1xuXG4gIGRpYWdub3N0aWNzLm1lc3NhZ2VzLmZvckVhY2gobSA9PiBjb25zb2xlLndhcm4oYCR7bS50eXBlfTogJHttLm1lc3NhZ2V9YCkpO1xuICBwcm9jZXNzLmV4aXQoZGlhZ25vc3RpY3MuaGFzRXJyb3JzID8gMSA6IDApO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbGF0ZUZpbGVzT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcm9vdCBwYXRoIG9mIHRoZSBmaWxlcyB0byB0cmFuc2xhdGUsIGVpdGhlciBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nXG4gICAqIGRpcmVjdG9yeS4gRS5nLiBgZGlzdC9lbmBcbiAgICovXG4gIHNvdXJjZVJvb3RQYXRoOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZmlsZXMgdG8gdHJhbnNsYXRlLCByZWxhdGl2ZSB0byB0aGUgYHJvb3RgIHBhdGguXG4gICAqL1xuICBzb3VyY2VGaWxlUGF0aHM6IHN0cmluZ1tdO1xuICAvKipcbiAgICogQW4gYXJyYXkgb2YgcGF0aHMgdG8gdGhlIHRyYW5zbGF0aW9uIGZpbGVzIHRvIGxvYWQsIGVpdGhlciBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0byB0aGUgY3VycmVudFxuICAgKiB3b3JraW5nIGRpcmVjdG9yeS5cbiAgICovXG4gIHRyYW5zbGF0aW9uRmlsZVBhdGhzOiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIEEgY29sbGVjdGlvbiBvZiB0aGUgdGFyZ2V0IGxvY2FsZXMgZm9yIHRoZSB0cmFuc2xhdGlvbiBmaWxlcy5cbiAgICovXG4gIHRyYW5zbGF0aW9uRmlsZUxvY2FsZXM6IChzdHJpbmd8dW5kZWZpbmVkKVtdO1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGNvbXB1dGVzIHRoZSBvdXRwdXQgcGF0aCBvZiB3aGVyZSB0aGUgdHJhbnNsYXRlZCBmaWxlcyB3aWxsIGJlIHdyaXR0ZW4uXG4gICAqIFRoZSBtYXJrZXIgYHt7TE9DQUxFfX1gIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdGFyZ2V0IGxvY2FsZS4gRS5nLiBgZGlzdC97e0xPQ0FMRX19YC5cbiAgICovXG4gIG91dHB1dFBhdGhGbjogT3V0cHV0UGF0aEZuO1xuICAvKipcbiAgICogQW4gb2JqZWN0IHRoYXQgd2lsbCByZWNlaXZlIGFueSBkaWFnbm9zdGljcyBtZXNzYWdlcyBkdWUgdG8gdGhlIHByb2Nlc3NpbmcuXG4gICAqL1xuICBkaWFnbm9zdGljczogRGlhZ25vc3RpY3M7XG4gIC8qKlxuICAgKiBIb3cgdG8gaGFuZGxlIG1pc3NpbmcgdHJhbnNsYXRpb25zLlxuICAgKi9cbiAgbWlzc2luZ1RyYW5zbGF0aW9uOiBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneTtcbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgb2YgdGhlIHNvdXJjZSBmaWxlcy5cbiAgICogSWYgdGhpcyBpcyBwcm92aWRlZCB0aGVuIGEgY29weSBvZiB0aGUgYXBwbGljYXRpb24gd2lsbCBiZSBjcmVhdGVkIHdpdGggbm8gdHJhbnNsYXRpb24gYnV0IGp1c3RcbiAgICogdGhlIGAkbG9jYWxpemVgIGNhbGxzIHN0cmlwcGVkIG91dC5cbiAgICovXG4gIHNvdXJjZUxvY2FsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZUZpbGVzKHtzb3VyY2VSb290UGF0aCwgc291cmNlRmlsZVBhdGhzLCB0cmFuc2xhdGlvbkZpbGVQYXRocyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25GaWxlTG9jYWxlcywgb3V0cHV0UGF0aEZuLCBkaWFnbm9zdGljcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uLCBzb3VyY2VMb2NhbGV9OiBUcmFuc2xhdGVGaWxlc09wdGlvbnMpIHtcbiAgY29uc3QgdHJhbnNsYXRpb25Mb2FkZXIgPSBuZXcgVHJhbnNsYXRpb25Mb2FkZXIoXG4gICAgICBbXG4gICAgICAgIG5ldyBYbGlmZjJUcmFuc2xhdGlvblBhcnNlcigpLFxuICAgICAgICBuZXcgWGxpZmYxVHJhbnNsYXRpb25QYXJzZXIoKSxcbiAgICAgICAgbmV3IFh0YlRyYW5zbGF0aW9uUGFyc2VyKGRpYWdub3N0aWNzKSxcbiAgICAgICAgbmV3IFNpbXBsZUpzb25UcmFuc2xhdGlvblBhcnNlcigpLFxuICAgICAgXSxcbiAgICAgIGRpYWdub3N0aWNzKTtcblxuICBjb25zdCByZXNvdXJjZVByb2Nlc3NvciA9IG5ldyBUcmFuc2xhdG9yKFxuICAgICAgW1xuICAgICAgICBuZXcgU291cmNlRmlsZVRyYW5zbGF0aW9uSGFuZGxlcih7bWlzc2luZ1RyYW5zbGF0aW9ufSksXG4gICAgICAgIG5ldyBBc3NldFRyYW5zbGF0aW9uSGFuZGxlcigpLFxuICAgICAgXSxcbiAgICAgIGRpYWdub3N0aWNzKTtcblxuICBjb25zdCB0cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbkxvYWRlci5sb2FkQnVuZGxlcyh0cmFuc2xhdGlvbkZpbGVQYXRocywgdHJhbnNsYXRpb25GaWxlTG9jYWxlcyk7XG4gIHNvdXJjZVJvb3RQYXRoID0gcmVzb2x2ZShzb3VyY2VSb290UGF0aCk7XG4gIHJlc291cmNlUHJvY2Vzc29yLnRyYW5zbGF0ZUZpbGVzKFxuICAgICAgc291cmNlRmlsZVBhdGhzLCBzb3VyY2VSb290UGF0aCwgb3V0cHV0UGF0aEZuLCB0cmFuc2xhdGlvbnMsIHNvdXJjZUxvY2FsZSk7XG59XG4iXX0=