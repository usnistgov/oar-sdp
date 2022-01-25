(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/extraction", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/sourcemaps", "@babel/core", "@angular/localize/src/tools/src/extract/source_files/es2015_extract_plugin", "@angular/localize/src/tools/src/extract/source_files/es5_extract_plugin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageExtractor = void 0;
    var tslib_1 = require("tslib");
    var sourcemaps_1 = require("@angular/compiler-cli/src/ngtsc/sourcemaps");
    var core_1 = require("@babel/core");
    var es2015_extract_plugin_1 = require("@angular/localize/src/tools/src/extract/source_files/es2015_extract_plugin");
    var es5_extract_plugin_1 = require("@angular/localize/src/tools/src/extract/source_files/es5_extract_plugin");
    /**
     * Extracts parsed messages from file contents, by parsing the contents as JavaScript
     * and looking for occurrences of `$localize` in the source code.
     *
     * @publicApi used by CLI
     */
    var MessageExtractor = /** @class */ (function () {
        function MessageExtractor(fs, logger, _a) {
            var basePath = _a.basePath, _b = _a.useSourceMaps, useSourceMaps = _b === void 0 ? true : _b, _c = _a.localizeName, localizeName = _c === void 0 ? '$localize' : _c;
            this.fs = fs;
            this.logger = logger;
            this.basePath = basePath;
            this.useSourceMaps = useSourceMaps;
            this.localizeName = localizeName;
            this.loader = new sourcemaps_1.SourceFileLoader(this.fs, this.logger, { webpack: basePath });
        }
        MessageExtractor.prototype.extractMessages = function (filename) {
            var messages = [];
            var sourceCode = this.fs.readFile(this.fs.resolve(this.basePath, filename));
            if (sourceCode.includes(this.localizeName)) {
                // Only bother to parse the file if it contains a reference to `$localize`.
                core_1.transformSync(sourceCode, {
                    sourceRoot: this.basePath,
                    filename: filename,
                    plugins: [
                        es2015_extract_plugin_1.makeEs2015ExtractPlugin(this.fs, messages, this.localizeName),
                        es5_extract_plugin_1.makeEs5ExtractPlugin(this.fs, messages, this.localizeName),
                    ],
                    code: false,
                    ast: false
                });
            }
            if (this.useSourceMaps) {
                this.updateSourceLocations(filename, sourceCode, messages);
            }
            return messages;
        };
        /**
         * Update the location of each message to point to the source-mapped original source location, if
         * available.
         */
        MessageExtractor.prototype.updateSourceLocations = function (filename, contents, messages) {
            var e_1, _a, e_2, _b;
            var _this = this;
            var sourceFile = this.loader.loadSourceFile(this.fs.resolve(this.basePath, filename), contents);
            if (sourceFile === null) {
                return;
            }
            try {
                for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                    var message = messages_1_1.value;
                    if (message.location !== undefined) {
                        message.location = this.getOriginalLocation(sourceFile, message.location);
                        if (message.messagePartLocations) {
                            message.messagePartLocations = message.messagePartLocations.map(function (location) { return location && _this.getOriginalLocation(sourceFile, location); });
                        }
                        if (message.substitutionLocations) {
                            var placeholderNames = Object.keys(message.substitutionLocations);
                            try {
                                for (var placeholderNames_1 = (e_2 = void 0, tslib_1.__values(placeholderNames)), placeholderNames_1_1 = placeholderNames_1.next(); !placeholderNames_1_1.done; placeholderNames_1_1 = placeholderNames_1.next()) {
                                    var placeholderName = placeholderNames_1_1.value;
                                    var location = message.substitutionLocations[placeholderName];
                                    message.substitutionLocations[placeholderName] =
                                        location && this.getOriginalLocation(sourceFile, location);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (placeholderNames_1_1 && !placeholderNames_1_1.done && (_b = placeholderNames_1.return)) _b.call(placeholderNames_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Find the original location using source-maps if available.
         *
         * @param sourceFile The generated `sourceFile` that contains the `location`.
         * @param location The location within the generated `sourceFile` that needs mapping.
         *
         * @returns A new location that refers to the original source location mapped from the given
         *     `location` in the generated `sourceFile`.
         */
        MessageExtractor.prototype.getOriginalLocation = function (sourceFile, location) {
            var originalStart = sourceFile.getOriginalLocation(location.start.line, location.start.column);
            if (originalStart === null) {
                return location;
            }
            var originalEnd = sourceFile.getOriginalLocation(location.end.line, location.end.column);
            var start = { line: originalStart.line, column: originalStart.column };
            // We check whether the files are the same, since the returned location can only have a single
            // `file` and it would not make sense to store the end position from a different source file.
            var end = (originalEnd !== null && originalEnd.file === originalStart.file) ?
                { line: originalEnd.line, column: originalEnd.column } :
                start;
            var originalSourceFile = sourceFile.sources.find(function (sf) { return (sf === null || sf === void 0 ? void 0 : sf.sourcePath) === originalStart.file; });
            var startPos = originalSourceFile.startOfLinePositions[start.line] + start.column;
            var endPos = originalSourceFile.startOfLinePositions[end.line] + end.column;
            var text = originalSourceFile.contents.substring(startPos, endPos);
            return { file: originalStart.file, start: start, end: end, text: text };
        };
        return MessageExtractor;
    }());
    exports.MessageExtractor = MessageExtractor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvZXh0cmFjdC9leHRyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFTQSx5RUFBd0Y7SUFFeEYsb0NBQTBDO0lBRTFDLG9IQUE2RTtJQUM3RSw4R0FBdUU7SUFRdkU7Ozs7O09BS0c7SUFDSDtRQU1FLDBCQUNZLEVBQWMsRUFBVSxNQUFjLEVBQzlDLEVBQStFO2dCQUE5RSxRQUFRLGNBQUEsRUFBRSxxQkFBb0IsRUFBcEIsYUFBYSxtQkFBRyxJQUFJLEtBQUEsRUFBRSxvQkFBMEIsRUFBMUIsWUFBWSxtQkFBRyxXQUFXLEtBQUE7WUFEbkQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7WUFFaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDZCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRCwwQ0FBZSxHQUFmLFVBQ0ksUUFBZ0I7WUFFbEIsSUFBTSxRQUFRLEdBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZ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RCxJQW9HQztJQXBHWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvbG9nZ2luZyc7XG5pbXBvcnQge1NvdXJjZUZpbGUsIFNvdXJjZUZpbGVMb2FkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2Mvc291cmNlbWFwcyc7XG5pbXBvcnQge8m1UGFyc2VkTWVzc2FnZSwgybVTb3VyY2VMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHt0cmFuc2Zvcm1TeW5jfSBmcm9tICdAYmFiZWwvY29yZSc7XG5cbmltcG9ydCB7bWFrZUVzMjAxNUV4dHJhY3RQbHVnaW59IGZyb20gJy4vc291cmNlX2ZpbGVzL2VzMjAxNV9leHRyYWN0X3BsdWdpbic7XG5pbXBvcnQge21ha2VFczVFeHRyYWN0UGx1Z2lufSBmcm9tICcuL3NvdXJjZV9maWxlcy9lczVfZXh0cmFjdF9wbHVnaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4dHJhY3Rpb25PcHRpb25zIHtcbiAgYmFzZVBhdGg6IEFic29sdXRlRnNQYXRoO1xuICB1c2VTb3VyY2VNYXBzPzogYm9vbGVhbjtcbiAgbG9jYWxpemVOYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIHBhcnNlZCBtZXNzYWdlcyBmcm9tIGZpbGUgY29udGVudHMsIGJ5IHBhcnNpbmcgdGhlIGNvbnRlbnRzIGFzIEphdmFTY3JpcHRcbiAqIGFuZCBsb29raW5nIGZvciBvY2N1cnJlbmNlcyBvZiBgJGxvY2FsaXplYCBpbiB0aGUgc291cmNlIGNvZGUuXG4gKlxuICogQHB1YmxpY0FwaSB1c2VkIGJ5IENMSVxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV4dHJhY3RvciB7XG4gIHByaXZhdGUgYmFzZVBhdGg6IEFic29sdXRlRnNQYXRoO1xuICBwcml2YXRlIHVzZVNvdXJjZU1hcHM6IGJvb2xlYW47XG4gIHByaXZhdGUgbG9jYWxpemVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgbG9hZGVyOiBTb3VyY2VGaWxlTG9hZGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBmczogRmlsZVN5c3RlbSwgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcixcbiAgICAgIHtiYXNlUGF0aCwgdXNlU291cmNlTWFwcyA9IHRydWUsIGxvY2FsaXplTmFtZSA9ICckbG9jYWxpemUnfTogRXh0cmFjdGlvbk9wdGlvbnMpIHtcbiAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGg7XG4gICAgdGhpcy51c2VTb3VyY2VNYXBzID0gdXNlU291cmNlTWFwcztcbiAgICB0aGlzLmxvY2FsaXplTmFtZSA9IGxvY2FsaXplTmFtZTtcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBTb3VyY2VGaWxlTG9hZGVyKHRoaXMuZnMsIHRoaXMubG9nZ2VyLCB7d2VicGFjazogYmFzZVBhdGh9KTtcbiAgfVxuXG4gIGV4dHJhY3RNZXNzYWdlcyhcbiAgICAgIGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICApOiDJtVBhcnNlZE1lc3NhZ2VbXSB7XG4gICAgY29uc3QgbWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdID0gW107XG4gICAgY29uc3Qgc291cmNlQ29kZSA9IHRoaXMuZnMucmVhZEZpbGUodGhpcy5mcy5yZXNvbHZlKHRoaXMuYmFzZVBhdGgsIGZpbGVuYW1lKSk7XG4gICAgaWYgKHNvdXJjZUNvZGUuaW5jbHVkZXModGhpcy5sb2NhbGl6ZU5hbWUpKSB7XG4gICAgICAvLyBPbmx5IGJvdGhlciB0byBwYXJzZSB0aGUgZmlsZSBpZiBpdCBjb250YWlucyBhIHJlZmVyZW5jZSB0byBgJGxvY2FsaXplYC5cbiAgICAgIHRyYW5zZm9ybVN5bmMoc291cmNlQ29kZSwge1xuICAgICAgICBzb3VyY2VSb290OiB0aGlzLmJhc2VQYXRoLFxuICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIG1ha2VFczIwMTVFeHRyYWN0UGx1Z2luKHRoaXMuZnMsIG1lc3NhZ2VzLCB0aGlzLmxvY2FsaXplTmFtZSksXG4gICAgICAgICAgbWFrZUVzNUV4dHJhY3RQbHVnaW4odGhpcy5mcywgbWVzc2FnZXMsIHRoaXMubG9jYWxpemVOYW1lKSxcbiAgICAgICAgXSxcbiAgICAgICAgY29kZTogZmFsc2UsXG4gICAgICAgIGFzdDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VTb3VyY2VNYXBzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvdXJjZUxvY2F0aW9ucyhmaWxlbmFtZSwgc291cmNlQ29kZSwgbWVzc2FnZXMpO1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsb2NhdGlvbiBvZiBlYWNoIG1lc3NhZ2UgdG8gcG9pbnQgdG8gdGhlIHNvdXJjZS1tYXBwZWQgb3JpZ2luYWwgc291cmNlIGxvY2F0aW9uLCBpZlxuICAgKiBhdmFpbGFibGUuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVNvdXJjZUxvY2F0aW9ucyhmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50czogc3RyaW5nLCBtZXNzYWdlczogybVQYXJzZWRNZXNzYWdlW10pOlxuICAgICAgdm9pZCB7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWRTb3VyY2VGaWxlKHRoaXMuZnMucmVzb2x2ZSh0aGlzLmJhc2VQYXRoLCBmaWxlbmFtZSksIGNvbnRlbnRzKTtcbiAgICBpZiAoc291cmNlRmlsZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgIGlmIChtZXNzYWdlLmxvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWVzc2FnZS5sb2NhdGlvbiA9IHRoaXMuZ2V0T3JpZ2luYWxMb2NhdGlvbihzb3VyY2VGaWxlLCBtZXNzYWdlLmxvY2F0aW9uKTtcblxuICAgICAgICBpZiAobWVzc2FnZS5tZXNzYWdlUGFydExvY2F0aW9ucykge1xuICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZVBhcnRMb2NhdGlvbnMgPSBtZXNzYWdlLm1lc3NhZ2VQYXJ0TG9jYXRpb25zLm1hcChcbiAgICAgICAgICAgICAgbG9jYXRpb24gPT4gbG9jYXRpb24gJiYgdGhpcy5nZXRPcmlnaW5hbExvY2F0aW9uKHNvdXJjZUZpbGUsIGxvY2F0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVzc2FnZS5zdWJzdGl0dXRpb25Mb2NhdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlck5hbWVzID0gT2JqZWN0LmtleXMobWVzc2FnZS5zdWJzdGl0dXRpb25Mb2NhdGlvbnMpO1xuICAgICAgICAgIGZvciAoY29uc3QgcGxhY2Vob2xkZXJOYW1lIG9mIHBsYWNlaG9sZGVyTmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbWVzc2FnZS5zdWJzdGl0dXRpb25Mb2NhdGlvbnNbcGxhY2Vob2xkZXJOYW1lXTtcbiAgICAgICAgICAgIG1lc3NhZ2Uuc3Vic3RpdHV0aW9uTG9jYXRpb25zW3BsYWNlaG9sZGVyTmFtZV0gPVxuICAgICAgICAgICAgICAgIGxvY2F0aW9uICYmIHRoaXMuZ2V0T3JpZ2luYWxMb2NhdGlvbihzb3VyY2VGaWxlLCBsb2NhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIG9yaWdpbmFsIGxvY2F0aW9uIHVzaW5nIHNvdXJjZS1tYXBzIGlmIGF2YWlsYWJsZS5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUZpbGUgVGhlIGdlbmVyYXRlZCBgc291cmNlRmlsZWAgdGhhdCBjb250YWlucyB0aGUgYGxvY2F0aW9uYC5cbiAgICogQHBhcmFtIGxvY2F0aW9uIFRoZSBsb2NhdGlvbiB3aXRoaW4gdGhlIGdlbmVyYXRlZCBgc291cmNlRmlsZWAgdGhhdCBuZWVkcyBtYXBwaW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIG5ldyBsb2NhdGlvbiB0aGF0IHJlZmVycyB0byB0aGUgb3JpZ2luYWwgc291cmNlIGxvY2F0aW9uIG1hcHBlZCBmcm9tIHRoZSBnaXZlblxuICAgKiAgICAgYGxvY2F0aW9uYCBpbiB0aGUgZ2VuZXJhdGVkIGBzb3VyY2VGaWxlYC5cbiAgICovXG4gIHByaXZhdGUgZ2V0T3JpZ2luYWxMb2NhdGlvbihzb3VyY2VGaWxlOiBTb3VyY2VGaWxlLCBsb2NhdGlvbjogybVTb3VyY2VMb2NhdGlvbik6IMm1U291cmNlTG9jYXRpb24ge1xuICAgIGNvbnN0IG9yaWdpbmFsU3RhcnQgPVxuICAgICAgICBzb3VyY2VGaWxlLmdldE9yaWdpbmFsTG9jYXRpb24obG9jYXRpb24uc3RhcnQubGluZSwgbG9jYXRpb24uc3RhcnQuY29sdW1uKTtcbiAgICBpZiAob3JpZ2luYWxTdGFydCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbEVuZCA9IHNvdXJjZUZpbGUuZ2V0T3JpZ2luYWxMb2NhdGlvbihsb2NhdGlvbi5lbmQubGluZSwgbG9jYXRpb24uZW5kLmNvbHVtbik7XG4gICAgY29uc3Qgc3RhcnQgPSB7bGluZTogb3JpZ2luYWxTdGFydC5saW5lLCBjb2x1bW46IG9yaWdpbmFsU3RhcnQuY29sdW1ufTtcbiAgICAvLyBXZSBjaGVjayB3aGV0aGVyIHRoZSBmaWxlcyBhcmUgdGhlIHNhbWUsIHNpbmNlIHRoZSByZXR1cm5lZCBsb2NhdGlvbiBjYW4gb25seSBoYXZlIGEgc2luZ2xlXG4gICAgLy8gYGZpbGVgIGFuZCBpdCB3b3VsZCBub3QgbWFrZSBzZW5zZSB0byBzdG9yZSB0aGUgZW5kIHBvc2l0aW9uIGZyb20gYSBkaWZmZXJlbnQgc291cmNlIGZpbGUuXG4gICAgY29uc3QgZW5kID0gKG9yaWdpbmFsRW5kICE9PSBudWxsICYmIG9yaWdpbmFsRW5kLmZpbGUgPT09IG9yaWdpbmFsU3RhcnQuZmlsZSkgP1xuICAgICAgICB7bGluZTogb3JpZ2luYWxFbmQubGluZSwgY29sdW1uOiBvcmlnaW5hbEVuZC5jb2x1bW59IDpcbiAgICAgICAgc3RhcnQ7XG4gICAgY29uc3Qgb3JpZ2luYWxTb3VyY2VGaWxlID1cbiAgICAgICAgc291cmNlRmlsZS5zb3VyY2VzLmZpbmQoc2YgPT4gc2Y/LnNvdXJjZVBhdGggPT09IG9yaWdpbmFsU3RhcnQuZmlsZSkhO1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gb3JpZ2luYWxTb3VyY2VGaWxlLnN0YXJ0T2ZMaW5lUG9zaXRpb25zW3N0YXJ0LmxpbmVdICsgc3RhcnQuY29sdW1uO1xuICAgIGNvbnN0IGVuZFBvcyA9IG9yaWdpbmFsU291cmNlRmlsZS5zdGFydE9mTGluZVBvc2l0aW9uc1tlbmQubGluZV0gKyBlbmQuY29sdW1uO1xuICAgIGNvbnN0IHRleHQgPSBvcmlnaW5hbFNvdXJjZUZpbGUuY29udGVudHMuc3Vic3RyaW5nKHN0YXJ0UG9zLCBlbmRQb3MpO1xuICAgIHJldHVybiB7ZmlsZTogb3JpZ2luYWxTdGFydC5maWxlLCBzdGFydCwgZW5kLCB0ZXh0fTtcbiAgfVxufVxuIl19