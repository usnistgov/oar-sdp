#!/usr/bin/env node
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/main", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/src/ngtsc/logging", "glob", "yargs", "@angular/localize/src/tools/src/extract/duplicates", "@angular/localize/src/tools/src/extract/extraction", "@angular/localize/src/tools/src/extract/translation_files/json_translation_serializer", "@angular/localize/src/tools/src/extract/translation_files/xliff1_translation_serializer", "@angular/localize/src/tools/src/extract/translation_files/xliff2_translation_serializer", "@angular/localize/src/tools/src/extract/translation_files/xmb_translation_serializer", "@angular/localize/src/tools/src/extract/translation_files/format_options"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSerializer = exports.extractTranslations = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var logging_1 = require("@angular/compiler-cli/src/ngtsc/logging");
    var glob = require("glob");
    var yargs = require("yargs");
    var duplicates_1 = require("@angular/localize/src/tools/src/extract/duplicates");
    var extraction_1 = require("@angular/localize/src/tools/src/extract/extraction");
    var json_translation_serializer_1 = require("@angular/localize/src/tools/src/extract/translation_files/json_translation_serializer");
    var xliff1_translation_serializer_1 = require("@angular/localize/src/tools/src/extract/translation_files/xliff1_translation_serializer");
    var xliff2_translation_serializer_1 = require("@angular/localize/src/tools/src/extract/translation_files/xliff2_translation_serializer");
    var xmb_translation_serializer_1 = require("@angular/localize/src/tools/src/extract/translation_files/xmb_translation_serializer");
    var format_options_1 = require("@angular/localize/src/tools/src/extract/translation_files/format_options");
    if (require.main === module) {
        var args = process.argv.slice(2);
        var options = yargs
            .option('l', {
            alias: 'locale',
            describe: 'The locale of the source being processed',
            default: 'en',
            type: 'string',
        })
            .option('r', {
            alias: 'root',
            default: '.',
            describe: 'The root path for other paths provided in these options.\n' +
                'This should either be absolute or relative to the current working directory.',
            type: 'string',
        })
            .option('s', {
            alias: 'source',
            required: true,
            describe: 'A glob pattern indicating what files to search for translations, e.g. `./dist/**/*.js`.\n' +
                'This should be relative to the root path.',
            type: 'string',
        })
            .option('f', {
            alias: 'format',
            required: true,
            choices: ['xmb', 'xlf', 'xlif', 'xliff', 'xlf2', 'xlif2', 'xliff2', 'json'],
            describe: 'The format of the translation file.',
            type: 'string',
        })
            .option('formatOptions', {
            describe: 'Additional options to pass to the translation file serializer, in the form of JSON formatted key-value string pairs:\n' +
                'For example: `--formatOptions {"xml:space":"preserve"}.\n' +
                'The meaning of the options is specific to the format being serialized.',
            type: 'string'
        })
            .option('o', {
            alias: 'outputPath',
            required: true,
            describe: 'A path to where the translation file will be written. This should be relative to the root path.',
            type: 'string',
        })
            .option('loglevel', {
            describe: 'The lowest severity logging message that should be output.',
            choices: ['debug', 'info', 'warn', 'error'],
            type: 'string',
        })
            .option('useSourceMaps', {
            type: 'boolean',
            default: true,
            describe: 'Whether to generate source information in the output files by following source-map mappings found in the source files',
        })
            .option('useLegacyIds', {
            type: 'boolean',
            default: true,
            describe: 'Whether to use the legacy id format for messages that were extracted from Angular templates.',
        })
            .option('d', {
            alias: 'duplicateMessageHandling',
            describe: 'How to handle messages with the same id but different text.',
            choices: ['error', 'warning', 'ignore'],
            default: 'warning',
            type: 'string',
        })
            .strict()
            .help()
            .parse(args);
        var fileSystem = new file_system_1.NodeJSFileSystem();
        file_system_1.setFileSystem(fileSystem);
        var rootPath = options.r;
        var sourceFilePaths = glob.sync(options.s, { cwd: rootPath, nodir: true });
        var logLevel = options.loglevel;
        var logger = new logging_1.ConsoleLogger(logLevel ? logging_1.LogLevel[logLevel] : logging_1.LogLevel.warn);
        var duplicateMessageHandling = options.d;
        var formatOptions = format_options_1.parseFormatOptions(options.formatOptions);
        extractTranslations({
            rootPath: rootPath,
            sourceFilePaths: sourceFilePaths,
            sourceLocale: options.l,
            format: options.f,
            outputPath: options.o,
            logger: logger,
            useSourceMaps: options.useSourceMaps,
            useLegacyIds: options.useLegacyIds,
            duplicateMessageHandling: duplicateMessageHandling,
            formatOptions: formatOptions,
            fileSystem: fileSystem,
        });
    }
    function extractTranslations(_a) {
        var e_1, _b;
        var rootPath = _a.rootPath, sourceFilePaths = _a.sourceFilePaths, sourceLocale = _a.sourceLocale, format = _a.format, output = _a.outputPath, logger = _a.logger, useSourceMaps = _a.useSourceMaps, useLegacyIds = _a.useLegacyIds, duplicateMessageHandling = _a.duplicateMessageHandling, _c = _a.formatOptions, formatOptions = _c === void 0 ? {} : _c, fs = _a.fileSystem;
        var basePath = fs.resolve(rootPath);
        var extractor = new extraction_1.MessageExtractor(fs, logger, { basePath: basePath, useSourceMaps: useSourceMaps });
        var messages = [];
        try {
            for (var sourceFilePaths_1 = tslib_1.__values(sourceFilePaths), sourceFilePaths_1_1 = sourceFilePaths_1.next(); !sourceFilePaths_1_1.done; sourceFilePaths_1_1 = sourceFilePaths_1.next()) {
                var file = sourceFilePaths_1_1.value;
                messages.push.apply(messages, tslib_1.__spread(extractor.extractMessages(file)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sourceFilePaths_1_1 && !sourceFilePaths_1_1.done && (_b = sourceFilePaths_1.return)) _b.call(sourceFilePaths_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var diagnostics = duplicates_1.checkDuplicateMessages(fs, messages, duplicateMessageHandling, basePath);
        if (diagnostics.hasErrors) {
            throw new Error(diagnostics.formatDiagnostics('Failed to extract messages'));
        }
        var outputPath = fs.resolve(rootPath, output);
        var serializer = getSerializer(format, sourceLocale, fs.dirname(outputPath), useLegacyIds, formatOptions, fs);
        var translationFile = serializer.serialize(messages);
        fs.ensureDir(fs.dirname(outputPath));
        fs.writeFile(outputPath, translationFile);
        if (diagnostics.messages.length) {
            logger.warn(diagnostics.formatDiagnostics('Messages extracted with warnings'));
        }
    }
    exports.extractTranslations = extractTranslations;
    function getSerializer(format, sourceLocale, rootPath, useLegacyIds, formatOptions, fs) {
        if (formatOptions === void 0) { formatOptions = {}; }
        switch (format) {
            case 'xlf':
            case 'xlif':
            case 'xliff':
                return new xliff1_translation_serializer_1.Xliff1TranslationSerializer(sourceLocale, rootPath, useLegacyIds, formatOptions, fs);
            case 'xlf2':
            case 'xlif2':
            case 'xliff2':
                return new xliff2_translation_serializer_1.Xliff2TranslationSerializer(sourceLocale, rootPath, useLegacyIds, formatOptions, fs);
            case 'xmb':
                return new xmb_translation_serializer_1.XmbTranslationSerializer(rootPath, useLegacyIds, fs);
            case 'json':
                return new json_translation_serializer_1.SimpleJsonTranslationSerializer(sourceLocale);
        }
        throw new Error("No translation serializer can handle the provided format: " + format);
    }
    exports.getSerializer = getSerializer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvZXh0cmFjdC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQ0E7Ozs7OztPQU1HO0lBQ0gsMkVBQXdIO0lBQ3hILG1FQUF3RjtJQUV4RiwyQkFBNkI7SUFDN0IsNkJBQStCO0lBSS9CLGlGQUFvRDtJQUNwRCxpRkFBOEM7SUFFOUMscUlBQWdHO0lBQ2hHLHlJQUE4RjtJQUM5Rix5SUFBOEY7SUFDOUYsbUlBQXdGO0lBQ3hGLDJHQUFxRjtJQUVyRixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQzNCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQU0sT0FBTyxHQUNULEtBQUs7YUFDQSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUUsMENBQTBDO1lBQ3BELE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxNQUFNO1lBQ2IsT0FBTyxFQUFFLEdBQUc7WUFDWixRQUFRLEVBQUUsNERBQTREO2dCQUNsRSw4RUFBOEU7WUFDbEYsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQ0osMkZBQTJGO2dCQUMzRiwyQ0FBMkM7WUFDL0MsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQzNFLFFBQVEsRUFBRSxxQ0FBcUM7WUFDL0MsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUN2QixRQUFRLEVBQ0osd0hBQXdIO2dCQUN4SCwyREFBMkQ7Z0JBQzNELHdFQUF3RTtZQUM1RSxJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7YUFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQ0osaUdBQWlHO1lBQ3JHLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQzthQUNELE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDbEIsUUFBUSxFQUFFLDREQUE0RDtZQUN0RSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDM0MsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUN2QixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUNKLHVIQUF1SDtTQUM1SCxDQUFDO2FBQ0QsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN0QixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUNKLDhGQUE4RjtTQUNuRyxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsUUFBUSxFQUFFLDZEQUE2RDtZQUN2RSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztZQUN2QyxPQUFPLEVBQUUsU0FBUztZQUNsQixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7YUFDRCxNQUFNLEVBQUU7YUFDUixJQUFJLEVBQUU7YUFDTixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckIsSUFBTSxVQUFVLEdBQUcsSUFBSSw4QkFBZ0IsRUFBRSxDQUFDO1FBQzFDLDJCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUIsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUErQyxDQUFDO1FBQ3pFLElBQU0sTUFBTSxHQUFHLElBQUksdUJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBTSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsQ0FBK0IsQ0FBQztRQUN6RSxJQUFNLGFBQWEsR0FBRyxtQ0FBa0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHaEUsbUJBQW1CLENBQUM7WUFDbEIsUUFBUSxVQUFBO1lBQ1IsZUFBZSxpQkFBQTtZQUNmLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QixNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sUUFBQTtZQUNOLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsd0JBQXdCLDBCQUFBO1lBQ3hCLGFBQWEsZUFBQTtZQUNiLFVBQVUsWUFBQTtTQUNYLENBQUMsQ0FBQztLQUNKO0lBb0RELFNBQWdCLG1CQUFtQixDQUFDLEVBWVA7O1lBWDNCLFFBQVEsY0FBQSxFQUNSLGVBQWUscUJBQUEsRUFDZixZQUFZLGtCQUFBLEVBQ1osTUFBTSxZQUFBLEVBQ00sTUFBTSxnQkFBQSxFQUNsQixNQUFNLFlBQUEsRUFDTixhQUFhLG1CQUFBLEVBQ2IsWUFBWSxrQkFBQSxFQUNaLHdCQUF3Qiw4QkFBQSxFQUN4QixxQkFBa0IsRUFBbEIsYUFBYSxtQkFBRyxFQUFFLEtBQUEsRUFDTixFQUFFLGdCQUFBO1FBRWQsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFNLFNBQVMsR0FBRyxJQUFJLDZCQUFnQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBQyxRQUFRLFVBQUEsRUFBRSxhQUFhLGVBQUEsRUFBQyxDQUFDLENBQUM7UUFFOUUsSUFBTSxRQUFRLEdBQXFCLEVBQUUsQ0FBQzs7WUFDdEMsS0FBbUIsSUFBQSxvQkFBQSxpQkFBQSxlQUFlLENBQUEsZ0RBQUEsNkVBQUU7Z0JBQS9CLElBQU0sSUFBSSw0QkFBQTtnQkFDYixRQUFRLENBQUMsSUFBSSxPQUFiLFFBQVEsbUJBQVMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRTthQUNuRDs7Ozs7Ozs7O1FBRUQsSUFBTSxXQUFXLEdBQUcsbUNBQXNCLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RixJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBTSxVQUFVLEdBQ1osYUFBYSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLElBQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFMUMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7U0FDaEY7SUFDSCxDQUFDO0lBcENELGtEQW9DQztJQUVELFNBQWdCLGFBQWEsQ0FDekIsTUFBYyxFQUFFLFlBQW9CLEVBQUUsUUFBd0IsRUFBRSxZQUFxQixFQUNyRixhQUFpQyxFQUFFLEVBQWM7UUFBakQsOEJBQUEsRUFBQSxrQkFBaUM7UUFDbkMsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxPQUFPO2dCQUNWLE9BQU8sSUFBSSwyREFBMkIsQ0FDbEMsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxJQUFJLDJEQUEyQixDQUNsQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxxREFBd0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLEtBQUssTUFBTTtnQkFDVCxPQUFPLElBQUksNkRBQStCLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUE2RCxNQUFRLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBcEJELHNDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtzZXRGaWxlU3lzdGVtLCBOb2RlSlNGaWxlU3lzdGVtLCBBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge0NvbnNvbGVMb2dnZXIsIExvZ2dlciwgTG9nTGV2ZWx9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvbG9nZ2luZyc7XG5pbXBvcnQge8m1UGFyc2VkTWVzc2FnZX0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCAqIGFzIHlhcmdzIGZyb20gJ3lhcmdzJztcblxuaW1wb3J0IHtEaWFnbm9zdGljSGFuZGxpbmdTdHJhdGVneX0gZnJvbSAnLi4vZGlhZ25vc3RpY3MnO1xuXG5pbXBvcnQge2NoZWNrRHVwbGljYXRlTWVzc2FnZXN9IGZyb20gJy4vZHVwbGljYXRlcyc7XG5pbXBvcnQge01lc3NhZ2VFeHRyYWN0b3J9IGZyb20gJy4vZXh0cmFjdGlvbic7XG5pbXBvcnQge1RyYW5zbGF0aW9uU2VyaWFsaXplcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9zZXJpYWxpemVyJztcbmltcG9ydCB7U2ltcGxlSnNvblRyYW5zbGF0aW9uU2VyaWFsaXplcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy9qc29uX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtYbGlmZjFUcmFuc2xhdGlvblNlcmlhbGl6ZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMveGxpZmYxX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtYbGlmZjJUcmFuc2xhdGlvblNlcmlhbGl6ZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMveGxpZmYyX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtYbWJUcmFuc2xhdGlvblNlcmlhbGl6ZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMveG1iX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtGb3JtYXRPcHRpb25zLCBwYXJzZUZvcm1hdE9wdGlvbnN9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvZm9ybWF0X29wdGlvbnMnO1xuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgyKTtcbiAgY29uc3Qgb3B0aW9ucyA9XG4gICAgICB5YXJnc1xuICAgICAgICAgIC5vcHRpb24oJ2wnLCB7XG4gICAgICAgICAgICBhbGlhczogJ2xvY2FsZScsXG4gICAgICAgICAgICBkZXNjcmliZTogJ1RoZSBsb2NhbGUgb2YgdGhlIHNvdXJjZSBiZWluZyBwcm9jZXNzZWQnLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2VuJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9wdGlvbigncicsIHtcbiAgICAgICAgICAgIGFsaWFzOiAncm9vdCcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnLicsXG4gICAgICAgICAgICBkZXNjcmliZTogJ1RoZSByb290IHBhdGggZm9yIG90aGVyIHBhdGhzIHByb3ZpZGVkIGluIHRoZXNlIG9wdGlvbnMuXFxuJyArXG4gICAgICAgICAgICAgICAgJ1RoaXMgc2hvdWxkIGVpdGhlciBiZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4nLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub3B0aW9uKCdzJywge1xuICAgICAgICAgICAgYWxpYXM6ICdzb3VyY2UnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQSBnbG9iIHBhdHRlcm4gaW5kaWNhdGluZyB3aGF0IGZpbGVzIHRvIHNlYXJjaCBmb3IgdHJhbnNsYXRpb25zLCBlLmcuIGAuL2Rpc3QvKiovKi5qc2AuXFxuJyArXG4gICAgICAgICAgICAgICAgJ1RoaXMgc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSByb290IHBhdGguJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9wdGlvbignZicsIHtcbiAgICAgICAgICAgIGFsaWFzOiAnZm9ybWF0JyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgY2hvaWNlczogWyd4bWInLCAneGxmJywgJ3hsaWYnLCAneGxpZmYnLCAneGxmMicsICd4bGlmMicsICd4bGlmZjInLCAnanNvbiddLFxuICAgICAgICAgICAgZGVzY3JpYmU6ICdUaGUgZm9ybWF0IG9mIHRoZSB0cmFuc2xhdGlvbiBmaWxlLicsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vcHRpb24oJ2Zvcm1hdE9wdGlvbnMnLCB7XG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQWRkaXRpb25hbCBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIHRyYW5zbGF0aW9uIGZpbGUgc2VyaWFsaXplciwgaW4gdGhlIGZvcm0gb2YgSlNPTiBmb3JtYXR0ZWQga2V5LXZhbHVlIHN0cmluZyBwYWlyczpcXG4nICtcbiAgICAgICAgICAgICAgICAnRm9yIGV4YW1wbGU6IGAtLWZvcm1hdE9wdGlvbnMge1wieG1sOnNwYWNlXCI6XCJwcmVzZXJ2ZVwifS5cXG4nICtcbiAgICAgICAgICAgICAgICAnVGhlIG1lYW5pbmcgb2YgdGhlIG9wdGlvbnMgaXMgc3BlY2lmaWMgdG8gdGhlIGZvcm1hdCBiZWluZyBzZXJpYWxpemVkLicsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9wdGlvbignbycsIHtcbiAgICAgICAgICAgIGFsaWFzOiAnb3V0cHV0UGF0aCcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2NyaWJlOlxuICAgICAgICAgICAgICAgICdBIHBhdGggdG8gd2hlcmUgdGhlIHRyYW5zbGF0aW9uIGZpbGUgd2lsbCBiZSB3cml0dGVuLiBUaGlzIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgcm9vdCBwYXRoLicsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vcHRpb24oJ2xvZ2xldmVsJywge1xuICAgICAgICAgICAgZGVzY3JpYmU6ICdUaGUgbG93ZXN0IHNldmVyaXR5IGxvZ2dpbmcgbWVzc2FnZSB0aGF0IHNob3VsZCBiZSBvdXRwdXQuJyxcbiAgICAgICAgICAgIGNob2ljZXM6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vcHRpb24oJ3VzZVNvdXJjZU1hcHMnLCB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ1doZXRoZXIgdG8gZ2VuZXJhdGUgc291cmNlIGluZm9ybWF0aW9uIGluIHRoZSBvdXRwdXQgZmlsZXMgYnkgZm9sbG93aW5nIHNvdXJjZS1tYXAgbWFwcGluZ3MgZm91bmQgaW4gdGhlIHNvdXJjZSBmaWxlcycsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub3B0aW9uKCd1c2VMZWdhY3lJZHMnLCB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ1doZXRoZXIgdG8gdXNlIHRoZSBsZWdhY3kgaWQgZm9ybWF0IGZvciBtZXNzYWdlcyB0aGF0IHdlcmUgZXh0cmFjdGVkIGZyb20gQW5ndWxhciB0ZW1wbGF0ZXMuJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vcHRpb24oJ2QnLCB7XG4gICAgICAgICAgICBhbGlhczogJ2R1cGxpY2F0ZU1lc3NhZ2VIYW5kbGluZycsXG4gICAgICAgICAgICBkZXNjcmliZTogJ0hvdyB0byBoYW5kbGUgbWVzc2FnZXMgd2l0aCB0aGUgc2FtZSBpZCBidXQgZGlmZmVyZW50IHRleHQuJyxcbiAgICAgICAgICAgIGNob2ljZXM6IFsnZXJyb3InLCAnd2FybmluZycsICdpZ25vcmUnXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0cmljdCgpXG4gICAgICAgICAgLmhlbHAoKVxuICAgICAgICAgIC5wYXJzZShhcmdzKTtcblxuICBjb25zdCBmaWxlU3lzdGVtID0gbmV3IE5vZGVKU0ZpbGVTeXN0ZW0oKTtcbiAgc2V0RmlsZVN5c3RlbShmaWxlU3lzdGVtKTtcblxuICBjb25zdCByb290UGF0aCA9IG9wdGlvbnMucjtcbiAgY29uc3Qgc291cmNlRmlsZVBhdGhzID0gZ2xvYi5zeW5jKG9wdGlvbnMucywge2N3ZDogcm9vdFBhdGgsIG5vZGlyOiB0cnVlfSk7XG4gIGNvbnN0IGxvZ0xldmVsID0gb3B0aW9ucy5sb2dsZXZlbCBhcyAoa2V5b2YgdHlwZW9mIExvZ0xldmVsKSB8IHVuZGVmaW5lZDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIobG9nTGV2ZWwgPyBMb2dMZXZlbFtsb2dMZXZlbF0gOiBMb2dMZXZlbC53YXJuKTtcbiAgY29uc3QgZHVwbGljYXRlTWVzc2FnZUhhbmRsaW5nID0gb3B0aW9ucy5kIGFzIERpYWdub3N0aWNIYW5kbGluZ1N0cmF0ZWd5O1xuICBjb25zdCBmb3JtYXRPcHRpb25zID0gcGFyc2VGb3JtYXRPcHRpb25zKG9wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XG5cblxuICBleHRyYWN0VHJhbnNsYXRpb25zKHtcbiAgICByb290UGF0aCxcbiAgICBzb3VyY2VGaWxlUGF0aHMsXG4gICAgc291cmNlTG9jYWxlOiBvcHRpb25zLmwsXG4gICAgZm9ybWF0OiBvcHRpb25zLmYsXG4gICAgb3V0cHV0UGF0aDogb3B0aW9ucy5vLFxuICAgIGxvZ2dlcixcbiAgICB1c2VTb3VyY2VNYXBzOiBvcHRpb25zLnVzZVNvdXJjZU1hcHMsXG4gICAgdXNlTGVnYWN5SWRzOiBvcHRpb25zLnVzZUxlZ2FjeUlkcyxcbiAgICBkdXBsaWNhdGVNZXNzYWdlSGFuZGxpbmcsXG4gICAgZm9ybWF0T3B0aW9ucyxcbiAgICBmaWxlU3lzdGVtLFxuICB9KTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRyYWN0VHJhbnNsYXRpb25zT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIG9mIHRoZSBzb3VyY2UgYmVpbmcgcHJvY2Vzc2VkLlxuICAgKi9cbiAgc291cmNlTG9jYWxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgYmFzZSBwYXRoIGZvciBvdGhlciBwYXRocyBwcm92aWRlZCBpbiB0aGVzZSBvcHRpb25zLlxuICAgKiBUaGlzIHNob3VsZCBlaXRoZXIgYmUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXG4gICAqL1xuICByb290UGF0aDogc3RyaW5nO1xuICAvKipcbiAgICogQW4gYXJyYXkgb2YgcGF0aHMgdG8gZmlsZXMgdG8gc2VhcmNoIGZvciB0cmFuc2xhdGlvbnMuIFRoZXNlIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGVcbiAgICogcm9vdFBhdGguXG4gICAqL1xuICBzb3VyY2VGaWxlUGF0aHM6IHN0cmluZ1tdO1xuICAvKipcbiAgICogVGhlIGZvcm1hdCBvZiB0aGUgdHJhbnNsYXRpb24gZmlsZS5cbiAgICovXG4gIGZvcm1hdDogc3RyaW5nO1xuICAvKipcbiAgICogQSBwYXRoIHRvIHdoZXJlIHRoZSB0cmFuc2xhdGlvbiBmaWxlIHdpbGwgYmUgd3JpdHRlbi4gVGhpcyBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIHJvb3RQYXRoLlxuICAgKi9cbiAgb3V0cHV0UGF0aDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGxvZ2dlciB0byB1c2UgZm9yIGRpYWdub3N0aWMgbWVzc2FnZXMuXG4gICAqL1xuICBsb2dnZXI6IExvZ2dlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZ2VuZXJhdGUgc291cmNlIGluZm9ybWF0aW9uIGluIHRoZSBvdXRwdXQgZmlsZXMgYnkgZm9sbG93aW5nIHNvdXJjZS1tYXAgbWFwcGluZ3NcbiAgICogZm91bmQgaW4gdGhlIHNvdXJjZSBmaWxlLlxuICAgKi9cbiAgdXNlU291cmNlTWFwczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gdXNlIHRoZSBsZWdhY3kgaWQgZm9ybWF0IGZvciBtZXNzYWdlcyB0aGF0IHdlcmUgZXh0cmFjdGVkIGZyb20gQW5ndWxhciB0ZW1wbGF0ZXNcbiAgICovXG4gIHVzZUxlZ2FjeUlkczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEhvdyB0byBoYW5kbGUgbWVzc2FnZXMgd2l0aCB0aGUgc2FtZSBpZCBidXQgbm90IHRoZSBzYW1lIHRleHQuXG4gICAqL1xuICBkdXBsaWNhdGVNZXNzYWdlSGFuZGxpbmc6IERpYWdub3N0aWNIYW5kbGluZ1N0cmF0ZWd5O1xuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIGZvcm1hdHRpbmcgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSB0cmFuc2xhdGlvbiBmaWxlIHNlcmlhbGl6ZXIuXG4gICAqL1xuICBmb3JtYXRPcHRpb25zPzogRm9ybWF0T3B0aW9ucztcbiAgLyoqXG4gICAqIFRoZSBmaWxlLXN5c3RlbSBhYnN0cmFjdGlvbiB0byB1c2UuXG4gICAqL1xuICBmaWxlU3lzdGVtOiBGaWxlU3lzdGVtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRyYW5zbGF0aW9ucyh7XG4gIHJvb3RQYXRoLFxuICBzb3VyY2VGaWxlUGF0aHMsXG4gIHNvdXJjZUxvY2FsZSxcbiAgZm9ybWF0LFxuICBvdXRwdXRQYXRoOiBvdXRwdXQsXG4gIGxvZ2dlcixcbiAgdXNlU291cmNlTWFwcyxcbiAgdXNlTGVnYWN5SWRzLFxuICBkdXBsaWNhdGVNZXNzYWdlSGFuZGxpbmcsXG4gIGZvcm1hdE9wdGlvbnMgPSB7fSxcbiAgZmlsZVN5c3RlbTogZnMsXG59OiBFeHRyYWN0VHJhbnNsYXRpb25zT3B0aW9ucykge1xuICBjb25zdCBiYXNlUGF0aCA9IGZzLnJlc29sdmUocm9vdFBhdGgpO1xuICBjb25zdCBleHRyYWN0b3IgPSBuZXcgTWVzc2FnZUV4dHJhY3RvcihmcywgbG9nZ2VyLCB7YmFzZVBhdGgsIHVzZVNvdXJjZU1hcHN9KTtcblxuICBjb25zdCBtZXNzYWdlczogybVQYXJzZWRNZXNzYWdlW10gPSBbXTtcbiAgZm9yIChjb25zdCBmaWxlIG9mIHNvdXJjZUZpbGVQYXRocykge1xuICAgIG1lc3NhZ2VzLnB1c2goLi4uZXh0cmFjdG9yLmV4dHJhY3RNZXNzYWdlcyhmaWxlKSk7XG4gIH1cblxuICBjb25zdCBkaWFnbm9zdGljcyA9IGNoZWNrRHVwbGljYXRlTWVzc2FnZXMoZnMsIG1lc3NhZ2VzLCBkdXBsaWNhdGVNZXNzYWdlSGFuZGxpbmcsIGJhc2VQYXRoKTtcbiAgaWYgKGRpYWdub3N0aWNzLmhhc0Vycm9ycykge1xuICAgIHRocm93IG5ldyBFcnJvcihkaWFnbm9zdGljcy5mb3JtYXREaWFnbm9zdGljcygnRmFpbGVkIHRvIGV4dHJhY3QgbWVzc2FnZXMnKSk7XG4gIH1cblxuICBjb25zdCBvdXRwdXRQYXRoID0gZnMucmVzb2x2ZShyb290UGF0aCwgb3V0cHV0KTtcbiAgY29uc3Qgc2VyaWFsaXplciA9XG4gICAgICBnZXRTZXJpYWxpemVyKGZvcm1hdCwgc291cmNlTG9jYWxlLCBmcy5kaXJuYW1lKG91dHB1dFBhdGgpLCB1c2VMZWdhY3lJZHMsIGZvcm1hdE9wdGlvbnMsIGZzKTtcbiAgY29uc3QgdHJhbnNsYXRpb25GaWxlID0gc2VyaWFsaXplci5zZXJpYWxpemUobWVzc2FnZXMpO1xuICBmcy5lbnN1cmVEaXIoZnMuZGlybmFtZShvdXRwdXRQYXRoKSk7XG4gIGZzLndyaXRlRmlsZShvdXRwdXRQYXRoLCB0cmFuc2xhdGlvbkZpbGUpO1xuXG4gIGlmIChkaWFnbm9zdGljcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICBsb2dnZXIud2FybihkaWFnbm9zdGljcy5mb3JtYXREaWFnbm9zdGljcygnTWVzc2FnZXMgZXh0cmFjdGVkIHdpdGggd2FybmluZ3MnKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcmlhbGl6ZXIoXG4gICAgZm9ybWF0OiBzdHJpbmcsIHNvdXJjZUxvY2FsZTogc3RyaW5nLCByb290UGF0aDogQWJzb2x1dGVGc1BhdGgsIHVzZUxlZ2FjeUlkczogYm9vbGVhbixcbiAgICBmb3JtYXRPcHRpb25zOiBGb3JtYXRPcHRpb25zID0ge30sIGZzOiBGaWxlU3lzdGVtKTogVHJhbnNsYXRpb25TZXJpYWxpemVyIHtcbiAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICBjYXNlICd4bGYnOlxuICAgIGNhc2UgJ3hsaWYnOlxuICAgIGNhc2UgJ3hsaWZmJzpcbiAgICAgIHJldHVybiBuZXcgWGxpZmYxVHJhbnNsYXRpb25TZXJpYWxpemVyKFxuICAgICAgICAgIHNvdXJjZUxvY2FsZSwgcm9vdFBhdGgsIHVzZUxlZ2FjeUlkcywgZm9ybWF0T3B0aW9ucywgZnMpO1xuICAgIGNhc2UgJ3hsZjInOlxuICAgIGNhc2UgJ3hsaWYyJzpcbiAgICBjYXNlICd4bGlmZjInOlxuICAgICAgcmV0dXJuIG5ldyBYbGlmZjJUcmFuc2xhdGlvblNlcmlhbGl6ZXIoXG4gICAgICAgICAgc291cmNlTG9jYWxlLCByb290UGF0aCwgdXNlTGVnYWN5SWRzLCBmb3JtYXRPcHRpb25zLCBmcyk7XG4gICAgY2FzZSAneG1iJzpcbiAgICAgIHJldHVybiBuZXcgWG1iVHJhbnNsYXRpb25TZXJpYWxpemVyKHJvb3RQYXRoLCB1c2VMZWdhY3lJZHMsIGZzKTtcbiAgICBjYXNlICdqc29uJzpcbiAgICAgIHJldHVybiBuZXcgU2ltcGxlSnNvblRyYW5zbGF0aW9uU2VyaWFsaXplcihzb3VyY2VMb2NhbGUpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgTm8gdHJhbnNsYXRpb24gc2VyaWFsaXplciBjYW4gaGFuZGxlIHRoZSBwcm92aWRlZCBmb3JtYXQ6ICR7Zm9ybWF0fWApO1xufVxuIl19