(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/xliff2_translation_serializer", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize/src/tools/src/extract/translation_files/format_options", "@angular/localize/src/tools/src/extract/translation_files/icu_parsing", "@angular/localize/src/tools/src/extract/translation_files/utils", "@angular/localize/src/tools/src/extract/translation_files/xml_file"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Xliff2TranslationSerializer = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var format_options_1 = require("@angular/localize/src/tools/src/extract/translation_files/format_options");
    var icu_parsing_1 = require("@angular/localize/src/tools/src/extract/translation_files/icu_parsing");
    var utils_1 = require("@angular/localize/src/tools/src/extract/translation_files/utils");
    var xml_file_1 = require("@angular/localize/src/tools/src/extract/translation_files/xml_file");
    /** This is the maximum number of characters that can appear in a legacy XLIFF 2.0 message id. */
    var MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH = 20;
    /**
     * A translation serializer that can write translations in XLIFF 2 format.
     *
     * http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
     *
     * @see Xliff2TranslationParser
     * @publicApi used by CLI
     */
    var Xliff2TranslationSerializer = /** @class */ (function () {
        function Xliff2TranslationSerializer(sourceLocale, basePath, useLegacyIds, formatOptions, fs) {
            if (formatOptions === void 0) { formatOptions = {}; }
            if (fs === void 0) { fs = file_system_1.getFileSystem(); }
            this.sourceLocale = sourceLocale;
            this.basePath = basePath;
            this.useLegacyIds = useLegacyIds;
            this.formatOptions = formatOptions;
            this.fs = fs;
            this.currentPlaceholderId = 0;
            format_options_1.validateOptions('Xliff1TranslationSerializer', [['xml:space', ['preserve']]], formatOptions);
        }
        Xliff2TranslationSerializer.prototype.serialize = function (messages) {
            var e_1, _a, e_2, _b;
            var _this = this;
            var messageMap = utils_1.consolidateMessages(messages, function (message) { return _this.getMessageId(message); });
            var xml = new xml_file_1.XmlFile();
            xml.startTag('xliff', {
                'version': '2.0',
                'xmlns': 'urn:oasis:names:tc:xliff:document:2.0',
                'srcLang': this.sourceLocale
            });
            // NOTE: the `original` property is set to the legacy `ng.template` value for backward
            // compatibility.
            // We could compute the file from the `message.location` property, but there could
            // be multiple values for this in the collection of `messages`. In that case we would probably
            // need to change the serializer to output a new `<file>` element for each collection of
            // messages that come from a particular original file, and the translation file parsers may
            // not
            xml.startTag('file', tslib_1.__assign({ 'id': 'ngi18n', 'original': 'ng.template' }, this.formatOptions));
            try {
                for (var _c = tslib_1.__values(messageMap.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = tslib_1.__read(_d.value, 2), id = _e[0], duplicateMessages = _e[1];
                    var message = duplicateMessages[0];
                    xml.startTag('unit', { id: id });
                    var messagesWithLocations = duplicateMessages.filter(utils_1.hasLocation);
                    if (message.meaning || message.description || messagesWithLocations.length) {
                        xml.startTag('notes');
                        try {
                            // Write all the locations
                            for (var messagesWithLocations_1 = (e_2 = void 0, tslib_1.__values(messagesWithLocations)), messagesWithLocations_1_1 = messagesWithLocations_1.next(); !messagesWithLocations_1_1.done; messagesWithLocations_1_1 = messagesWithLocations_1.next()) {
                                var _f = messagesWithLocations_1_1.value.location, file = _f.file, start = _f.start, end = _f.end;
                                var endLineString = end !== undefined && end.line !== start.line ? "," + (end.line + 1) : '';
                                this.serializeNote(xml, 'location', this.fs.relative(this.basePath, file) + ":" + (start.line + 1) + endLineString);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (messagesWithLocations_1_1 && !messagesWithLocations_1_1.done && (_b = messagesWithLocations_1.return)) _b.call(messagesWithLocations_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (message.description) {
                            this.serializeNote(xml, 'description', message.description);
                        }
                        if (message.meaning) {
                            this.serializeNote(xml, 'meaning', message.meaning);
                        }
                        xml.endTag('notes');
                    }
                    xml.startTag('segment');
                    xml.startTag('source', {}, { preserveWhitespace: true });
                    this.serializeMessage(xml, message);
                    xml.endTag('source', { preserveWhitespace: false });
                    xml.endTag('segment');
                    xml.endTag('unit');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            xml.endTag('file');
            xml.endTag('xliff');
            return xml.toString();
        };
        Xliff2TranslationSerializer.prototype.serializeMessage = function (xml, message) {
            this.currentPlaceholderId = 0;
            var length = message.messageParts.length - 1;
            for (var i = 0; i < length; i++) {
                this.serializeTextPart(xml, message.messageParts[i]);
                this.serializePlaceholder(xml, message.placeholderNames[i], message.substitutionLocations);
            }
            this.serializeTextPart(xml, message.messageParts[length]);
        };
        Xliff2TranslationSerializer.prototype.serializeTextPart = function (xml, text) {
            var pieces = icu_parsing_1.extractIcuPlaceholders(text);
            var length = pieces.length - 1;
            for (var i = 0; i < length; i += 2) {
                xml.text(pieces[i]);
                this.serializePlaceholder(xml, pieces[i + 1], undefined);
            }
            xml.text(pieces[length]);
        };
        Xliff2TranslationSerializer.prototype.serializePlaceholder = function (xml, placeholderName, substitutionLocations) {
            var _a, _b;
            var text = (_a = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[placeholderName]) === null || _a === void 0 ? void 0 : _a.text;
            if (placeholderName.startsWith('START_')) {
                var closingPlaceholderName = placeholderName.replace(/^START/, 'CLOSE');
                var closingText = (_b = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[closingPlaceholderName]) === null || _b === void 0 ? void 0 : _b.text;
                var attrs = {
                    id: "" + this.currentPlaceholderId++,
                    equivStart: placeholderName,
                    equivEnd: closingPlaceholderName,
                };
                var type = getTypeForPlaceholder(placeholderName);
                if (type !== null) {
                    attrs.type = type;
                }
                if (text !== undefined) {
                    attrs.dispStart = text;
                }
                if (closingText !== undefined) {
                    attrs.dispEnd = closingText;
                }
                xml.startTag('pc', attrs);
            }
            else if (placeholderName.startsWith('CLOSE_')) {
                xml.endTag('pc');
            }
            else {
                var attrs = {
                    id: "" + this.currentPlaceholderId++,
                    equiv: placeholderName,
                };
                var type = getTypeForPlaceholder(placeholderName);
                if (type !== null) {
                    attrs.type = type;
                }
                if (text !== undefined) {
                    attrs.disp = text;
                }
                xml.startTag('ph', attrs, { selfClosing: true });
            }
        };
        Xliff2TranslationSerializer.prototype.serializeNote = function (xml, name, value) {
            xml.startTag('note', { category: name }, { preserveWhitespace: true });
            xml.text(value);
            xml.endTag('note', { preserveWhitespace: false });
        };
        /**
         * Get the id for the given `message`.
         *
         * If there was a custom id provided, use that.
         *
         * If we have requested legacy message ids, then try to return the appropriate id
         * from the list of legacy ids that were extracted.
         *
         * Otherwise return the canonical message id.
         *
         * An Xliff 2.0 legacy message id is a 64 bit number encoded as a decimal string, which will have
         * at most 20 digits, since 2^65-1 = 36,893,488,147,419,103,231. This digest is based on:
         * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/GoogleJsMessageIdGenerator.java
         */
        Xliff2TranslationSerializer.prototype.getMessageId = function (message) {
            return message.customId ||
                this.useLegacyIds && message.legacyIds !== undefined &&
                    message.legacyIds.find(function (id) { return id.length <= MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH && !/[^0-9]/.test(id); }) ||
                message.id;
        };
        return Xliff2TranslationSerializer;
    }());
    exports.Xliff2TranslationSerializer = Xliff2TranslationSerializer;
    /**
     * Compute the value of the `type` attribute from the `placeholder` name.
     *
     * If the tag is not known but starts with `TAG_`, `START_TAG_` or `CLOSE_TAG_` then the type is
     * `other`. Certain formatting tags (e.g. bold, italic, etc) have type `fmt`. Line-breaks, images
     * and links are special cases.
     */
    function getTypeForPlaceholder(placeholder) {
        var tag = placeholder.replace(/^(START_|CLOSE_)/, '');
        switch (tag) {
            case 'BOLD_TEXT':
            case 'EMPHASISED_TEXT':
            case 'ITALIC_TEXT':
            case 'LINE_BREAK':
            case 'STRIKETHROUGH_TEXT':
            case 'UNDERLINED_TEXT':
                return 'fmt';
            case 'TAG_IMG':
                return 'image';
            case 'LINK':
                return 'link';
            default:
                return /^(START_|CLOSE_)/.test(placeholder) ? 'other' : null;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMveGxpZmYyX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUFzRztJQUd0RywyR0FBZ0U7SUFDaEUscUdBQXFEO0lBRXJELHlGQUF5RDtJQUN6RCwrRkFBbUM7SUFFbkMsaUdBQWlHO0lBQ2pHLElBQU0saUNBQWlDLEdBQUcsRUFBRSxDQUFDO0lBRTdDOzs7Ozs7O09BT0c7SUFDSDtRQUVFLHFDQUNZLFlBQW9CLEVBQVUsUUFBd0IsRUFBVSxZQUFxQixFQUNyRixhQUFpQyxFQUFVLEVBQWdDO1lBQTNFLDhCQUFBLEVBQUEsa0JBQWlDO1lBQVUsbUJBQUEsRUFBQSxLQUFpQiwyQkFBYSxFQUFFO1lBRDNFLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7WUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBUztZQUNyRixrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUE4QjtZQUgvRSx5QkFBb0IsR0FBRyxDQUFDLENBQUM7WUFJL0IsZ0NBQWUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9GLENBQUM7UUFFRCwrQ0FBUyxHQUFULFVBQVUsUUFBMEI7O1lBQXBDLGlCQW1EQztZQWxEQyxJQUFNLFVBQVUsR0FBRywyQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9B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QUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSyxrREFBWSxHQUFwQixVQUFxQixPQUF1QjtZQUMxQyxPQUFPLE9BQU8sQ0FBQyxRQUFRO2dCQUNuQixJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUztvQkFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2xCLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLE1BQU0sSUFBSSxpQ0FBaUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXBFLENBQW9FLENBQUM7Z0JBQy9FLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNILGtDQUFDO0lBQUQsQ0FBQyxBQXRKRCxJQXNKQztJQXRKWSxrRUFBMkI7SUF3SnhDOzs7Ozs7T0FNRztJQUNILFNBQVMscUJBQXFCLENBQUMsV0FBbUI7UUFDaEQsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssaUJBQWlCLENBQUM7WUFDdkIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxvQkFBb0IsQ0FBQztZQUMxQixLQUFLLGlCQUFpQjtnQkFDcEIsT0FBTyxLQUFLLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxPQUFPLENBQUM7WUFDakIsS0FBSyxNQUFNO2dCQUNULE9BQU8sTUFBTSxDQUFDO1lBQ2hCO2dCQUNFLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNoRTtJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIGdldEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtVBhcnNlZE1lc3NhZ2UsIMm1U291cmNlTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2xvY2FsaXplJztcblxuaW1wb3J0IHtGb3JtYXRPcHRpb25zLCB2YWxpZGF0ZU9wdGlvbnN9IGZyb20gJy4vZm9ybWF0X29wdGlvbnMnO1xuaW1wb3J0IHtleHRyYWN0SWN1UGxhY2Vob2xkZXJzfSBmcm9tICcuL2ljdV9wYXJzaW5nJztcbmltcG9ydCB7VHJhbnNsYXRpb25TZXJpYWxpemVyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtjb25zb2xpZGF0ZU1lc3NhZ2VzLCBoYXNMb2NhdGlvbn0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1htbEZpbGV9IGZyb20gJy4veG1sX2ZpbGUnO1xuXG4vKiogVGhpcyBpcyB0aGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IGNhbiBhcHBlYXIgaW4gYSBsZWdhY3kgWExJRkYgMi4wIG1lc3NhZ2UgaWQuICovXG5jb25zdCBNQVhfTEVHQUNZX1hMSUZGXzJfTUVTU0FHRV9MRU5HVEggPSAyMDtcblxuLyoqXG4gKiBBIHRyYW5zbGF0aW9uIHNlcmlhbGl6ZXIgdGhhdCBjYW4gd3JpdGUgdHJhbnNsYXRpb25zIGluIFhMSUZGIDIgZm9ybWF0LlxuICpcbiAqIGh0dHA6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3hsaWZmLWNvcmUvdjIuMC9vcy94bGlmZi1jb3JlLXYyLjAtb3MuaHRtbFxuICpcbiAqIEBzZWUgWGxpZmYyVHJhbnNsYXRpb25QYXJzZXJcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMlRyYW5zbGF0aW9uU2VyaWFsaXplciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uU2VyaWFsaXplciB7XG4gIHByaXZhdGUgY3VycmVudFBsYWNlaG9sZGVySWQgPSAwO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc291cmNlTG9jYWxlOiBzdHJpbmcsIHByaXZhdGUgYmFzZVBhdGg6IEFic29sdXRlRnNQYXRoLCBwcml2YXRlIHVzZUxlZ2FjeUlkczogYm9vbGVhbixcbiAgICAgIHByaXZhdGUgZm9ybWF0T3B0aW9uczogRm9ybWF0T3B0aW9ucyA9IHt9LCBwcml2YXRlIGZzOiBGaWxlU3lzdGVtID0gZ2V0RmlsZVN5c3RlbSgpKSB7XG4gICAgdmFsaWRhdGVPcHRpb25zKCdYbGlmZjFUcmFuc2xhdGlvblNlcmlhbGl6ZXInLCBbWyd4bWw6c3BhY2UnLCBbJ3ByZXNlcnZlJ11dXSwgZm9ybWF0T3B0aW9ucyk7XG4gIH1cblxuICBzZXJpYWxpemUobWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlTWFwID0gY29uc29saWRhdGVNZXNzYWdlcyhtZXNzYWdlcywgbWVzc2FnZSA9PiB0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgY29uc3QgeG1sID0gbmV3IFhtbEZpbGUoKTtcbiAgICB4bWwuc3RhcnRUYWcoJ3hsaWZmJywge1xuICAgICAgJ3ZlcnNpb24nOiAnMi4wJyxcbiAgICAgICd4bWxucyc6ICd1cm46b2FzaXM6bmFtZXM6dGM6eGxpZmY6ZG9jdW1lbnQ6Mi4wJyxcbiAgICAgICdzcmNMYW5nJzogdGhpcy5zb3VyY2VMb2NhbGVcbiAgICB9KTtcbiAgICAvLyBOT1RFOiB0aGUgYG9yaWdpbmFsYCBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIGxlZ2FjeSBgbmcudGVtcGxhdGVgIHZhbHVlIGZvciBiYWNrd2FyZFxuICAgIC8vIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gV2UgY291bGQgY29tcHV0ZSB0aGUgZmlsZSBmcm9tIHRoZSBgbWVzc2FnZS5sb2NhdGlvbmAgcHJvcGVydHksIGJ1dCB0aGVyZSBjb3VsZFxuICAgIC8vIGJlIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhpcyBpbiB0aGUgY29sbGVjdGlvbiBvZiBgbWVzc2FnZXNgLiBJbiB0aGF0IGNhc2Ugd2Ugd291bGQgcHJvYmFibHlcbiAgICAvLyBuZWVkIHRvIGNoYW5nZSB0aGUgc2VyaWFsaXplciB0byBvdXRwdXQgYSBuZXcgYDxmaWxlPmAgZWxlbWVudCBmb3IgZWFjaCBjb2xsZWN0aW9uIG9mXG4gICAgLy8gbWVzc2FnZXMgdGhhdCBjb21lIGZyb20gYSBwYXJ0aWN1bGFyIG9yaWdpbmFsIGZpbGUsIGFuZCB0aGUgdHJhbnNsYXRpb24gZmlsZSBwYXJzZXJzIG1heVxuICAgIC8vIG5vdFxuICAgIHhtbC5zdGFydFRhZygnZmlsZScsIHsnaWQnOiAnbmdpMThuJywgJ29yaWdpbmFsJzogJ25nLnRlbXBsYXRlJywgLi4udGhpcy5mb3JtYXRPcHRpb25zfSk7XG4gICAgZm9yIChjb25zdCBbaWQsIGR1cGxpY2F0ZU1lc3NhZ2VzXSBvZiBtZXNzYWdlTWFwLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGR1cGxpY2F0ZU1lc3NhZ2VzWzBdO1xuXG4gICAgICB4bWwuc3RhcnRUYWcoJ3VuaXQnLCB7aWR9KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzV2l0aExvY2F0aW9ucyA9IGR1cGxpY2F0ZU1lc3NhZ2VzLmZpbHRlcihoYXNMb2NhdGlvbik7XG4gICAgICBpZiAobWVzc2FnZS5tZWFuaW5nIHx8IG1lc3NhZ2UuZGVzY3JpcHRpb24gfHwgbWVzc2FnZXNXaXRoTG9jYXRpb25zLmxlbmd0aCkge1xuICAgICAgICB4bWwuc3RhcnRUYWcoJ25vdGVzJyk7XG5cbiAgICAgICAgLy8gV3JpdGUgYWxsIHRoZSBsb2NhdGlvbnNcbiAgICAgICAgZm9yIChjb25zdCB7bG9jYXRpb246IHtmaWxlLCBzdGFydCwgZW5kfX0gb2YgbWVzc2FnZXNXaXRoTG9jYXRpb25zKSB7XG4gICAgICAgICAgY29uc3QgZW5kTGluZVN0cmluZyA9XG4gICAgICAgICAgICAgIGVuZCAhPT0gdW5kZWZpbmVkICYmIGVuZC5saW5lICE9PSBzdGFydC5saW5lID8gYCwke2VuZC5saW5lICsgMX1gIDogJyc7XG4gICAgICAgICAgdGhpcy5zZXJpYWxpemVOb3RlKFxuICAgICAgICAgICAgICB4bWwsICdsb2NhdGlvbicsXG4gICAgICAgICAgICAgIGAke3RoaXMuZnMucmVsYXRpdmUodGhpcy5iYXNlUGF0aCwgZmlsZSl9OiR7c3RhcnQubGluZSArIDF9JHtlbmRMaW5lU3RyaW5nfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vdGUoeG1sLCAnZGVzY3JpcHRpb24nLCBtZXNzYWdlLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5tZWFuaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZXJpYWxpemVOb3RlKHhtbCwgJ21lYW5pbmcnLCBtZXNzYWdlLm1lYW5pbmcpO1xuICAgICAgICB9XG4gICAgICAgIHhtbC5lbmRUYWcoJ25vdGVzJyk7XG4gICAgICB9XG4gICAgICB4bWwuc3RhcnRUYWcoJ3NlZ21lbnQnKTtcbiAgICAgIHhtbC5zdGFydFRhZygnc291cmNlJywge30sIHtwcmVzZXJ2ZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgICAgIHRoaXMuc2VyaWFsaXplTWVzc2FnZSh4bWwsIG1lc3NhZ2UpO1xuICAgICAgeG1sLmVuZFRhZygnc291cmNlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgICAgIHhtbC5lbmRUYWcoJ3NlZ21lbnQnKTtcbiAgICAgIHhtbC5lbmRUYWcoJ3VuaXQnKTtcbiAgICB9XG4gICAgeG1sLmVuZFRhZygnZmlsZScpO1xuICAgIHhtbC5lbmRUYWcoJ3hsaWZmJyk7XG4gICAgcmV0dXJuIHhtbC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVNZXNzYWdlKHhtbDogWG1sRmlsZSwgbWVzc2FnZTogybVQYXJzZWRNZXNzYWdlKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UGxhY2Vob2xkZXJJZCA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gbWVzc2FnZS5tZXNzYWdlUGFydHMubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnNlcmlhbGl6ZVRleHRQYXJ0KHhtbCwgbWVzc2FnZS5tZXNzYWdlUGFydHNbaV0pO1xuICAgICAgdGhpcy5zZXJpYWxpemVQbGFjZWhvbGRlcih4bWwsIG1lc3NhZ2UucGxhY2Vob2xkZXJOYW1lc1tpXSwgbWVzc2FnZS5zdWJzdGl0dXRpb25Mb2NhdGlvbnMpO1xuICAgIH1cbiAgICB0aGlzLnNlcmlhbGl6ZVRleHRQYXJ0KHhtbCwgbWVzc2FnZS5tZXNzYWdlUGFydHNbbGVuZ3RoXSk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZVRleHRQYXJ0KHhtbDogWG1sRmlsZSwgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGllY2VzID0gZXh0cmFjdEljdVBsYWNlaG9sZGVycyh0ZXh0KTtcbiAgICBjb25zdCBsZW5ndGggPSBwaWVjZXMubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB4bWwudGV4dChwaWVjZXNbaV0pO1xuICAgICAgdGhpcy5zZXJpYWxpemVQbGFjZWhvbGRlcih4bWwsIHBpZWNlc1tpICsgMV0sIHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHhtbC50ZXh0KHBpZWNlc1tsZW5ndGhdKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplUGxhY2Vob2xkZXIoXG4gICAgICB4bWw6IFhtbEZpbGUsIHBsYWNlaG9sZGVyTmFtZTogc3RyaW5nLFxuICAgICAgc3Vic3RpdHV0aW9uTG9jYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCDJtVNvdXJjZUxvY2F0aW9ufHVuZGVmaW5lZD58dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgdGV4dCA9IHN1YnN0aXR1dGlvbkxvY2F0aW9ucz8uW3BsYWNlaG9sZGVyTmFtZV0/LnRleHQ7XG5cbiAgICBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ1NUQVJUXycpKSB7XG4gICAgICBjb25zdCBjbG9zaW5nUGxhY2Vob2xkZXJOYW1lID0gcGxhY2Vob2xkZXJOYW1lLnJlcGxhY2UoL15TVEFSVC8sICdDTE9TRScpO1xuICAgICAgY29uc3QgY2xvc2luZ1RleHQgPSBzdWJzdGl0dXRpb25Mb2NhdGlvbnM/LltjbG9zaW5nUGxhY2Vob2xkZXJOYW1lXT8udGV4dDtcbiAgICAgIGNvbnN0IGF0dHJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBpZDogYCR7dGhpcy5jdXJyZW50UGxhY2Vob2xkZXJJZCsrfWAsXG4gICAgICAgIGVxdWl2U3RhcnQ6IHBsYWNlaG9sZGVyTmFtZSxcbiAgICAgICAgZXF1aXZFbmQ6IGNsb3NpbmdQbGFjZWhvbGRlck5hbWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgdHlwZSA9IGdldFR5cGVGb3JQbGFjZWhvbGRlcihwbGFjZWhvbGRlck5hbWUpO1xuICAgICAgaWYgKHR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgYXR0cnMudHlwZSA9IHR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF0dHJzLmRpc3BTdGFydCA9IHRleHQ7XG4gICAgICB9XG4gICAgICBpZiAoY2xvc2luZ1RleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdHRycy5kaXNwRW5kID0gY2xvc2luZ1RleHQ7XG4gICAgICB9XG4gICAgICB4bWwuc3RhcnRUYWcoJ3BjJywgYXR0cnMpO1xuICAgIH0gZWxzZSBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ0NMT1NFXycpKSB7XG4gICAgICB4bWwuZW5kVGFnKCdwYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhdHRyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICAgaWQ6IGAke3RoaXMuY3VycmVudFBsYWNlaG9sZGVySWQrK31gLFxuICAgICAgICBlcXVpdjogcGxhY2Vob2xkZXJOYW1lLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRUeXBlRm9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJOYW1lKTtcbiAgICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSB0eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdHRycy5kaXNwID0gdGV4dDtcbiAgICAgIH1cbiAgICAgIHhtbC5zdGFydFRhZygncGgnLCBhdHRycywge3NlbGZDbG9zaW5nOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVOb3RlKHhtbDogWG1sRmlsZSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgeG1sLnN0YXJ0VGFnKCdub3RlJywge2NhdGVnb3J5OiBuYW1lfSwge3ByZXNlcnZlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICAgIHhtbC50ZXh0KHZhbHVlKTtcbiAgICB4bWwuZW5kVGFnKCdub3RlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGlkIGZvciB0aGUgZ2l2ZW4gYG1lc3NhZ2VgLlxuICAgKlxuICAgKiBJZiB0aGVyZSB3YXMgYSBjdXN0b20gaWQgcHJvdmlkZWQsIHVzZSB0aGF0LlxuICAgKlxuICAgKiBJZiB3ZSBoYXZlIHJlcXVlc3RlZCBsZWdhY3kgbWVzc2FnZSBpZHMsIHRoZW4gdHJ5IHRvIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgaWRcbiAgICogZnJvbSB0aGUgbGlzdCBvZiBsZWdhY3kgaWRzIHRoYXQgd2VyZSBleHRyYWN0ZWQuXG4gICAqXG4gICAqIE90aGVyd2lzZSByZXR1cm4gdGhlIGNhbm9uaWNhbCBtZXNzYWdlIGlkLlxuICAgKlxuICAgKiBBbiBYbGlmZiAyLjAgbGVnYWN5IG1lc3NhZ2UgaWQgaXMgYSA2NCBiaXQgbnVtYmVyIGVuY29kZWQgYXMgYSBkZWNpbWFsIHN0cmluZywgd2hpY2ggd2lsbCBoYXZlXG4gICAqIGF0IG1vc3QgMjAgZGlnaXRzLCBzaW5jZSAyXjY1LTEgPSAzNiw4OTMsNDg4LDE0Nyw0MTksMTAzLDIzMS4gVGhpcyBkaWdlc3QgaXMgYmFzZWQgb246XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9ibG9iL21hc3Rlci9zcmMvY29tL2dvb2dsZS9qYXZhc2NyaXB0L2pzY29tcC9Hb29nbGVKc01lc3NhZ2VJZEdlbmVyYXRvci5qYXZhXG4gICAqL1xuICBwcml2YXRlIGdldE1lc3NhZ2VJZChtZXNzYWdlOiDJtVBhcnNlZE1lc3NhZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBtZXNzYWdlLmN1c3RvbUlkIHx8XG4gICAgICAgIHRoaXMudXNlTGVnYWN5SWRzICYmIG1lc3NhZ2UubGVnYWN5SWRzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbWVzc2FnZS5sZWdhY3lJZHMuZmluZChcbiAgICAgICAgICAgIGlkID0+IGlkLmxlbmd0aCA8PSBNQVhfTEVHQUNZX1hMSUZGXzJfTUVTU0FHRV9MRU5HVEggJiYgIS9bXjAtOV0vLnRlc3QoaWQpKSB8fFxuICAgICAgICBtZXNzYWdlLmlkO1xuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgdmFsdWUgb2YgdGhlIGB0eXBlYCBhdHRyaWJ1dGUgZnJvbSB0aGUgYHBsYWNlaG9sZGVyYCBuYW1lLlxuICpcbiAqIElmIHRoZSB0YWcgaXMgbm90IGtub3duIGJ1dCBzdGFydHMgd2l0aCBgVEFHX2AsIGBTVEFSVF9UQUdfYCBvciBgQ0xPU0VfVEFHX2AgdGhlbiB0aGUgdHlwZSBpc1xuICogYG90aGVyYC4gQ2VydGFpbiBmb3JtYXR0aW5nIHRhZ3MgKGUuZy4gYm9sZCwgaXRhbGljLCBldGMpIGhhdmUgdHlwZSBgZm10YC4gTGluZS1icmVha3MsIGltYWdlc1xuICogYW5kIGxpbmtzIGFyZSBzcGVjaWFsIGNhc2VzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlRm9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3QgdGFnID0gcGxhY2Vob2xkZXIucmVwbGFjZSgvXihTVEFSVF98Q0xPU0VfKS8sICcnKTtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlICdCT0xEX1RFWFQnOlxuICAgIGNhc2UgJ0VNUEhBU0lTRURfVEVYVCc6XG4gICAgY2FzZSAnSVRBTElDX1RFWFQnOlxuICAgIGNhc2UgJ0xJTkVfQlJFQUsnOlxuICAgIGNhc2UgJ1NUUklLRVRIUk9VR0hfVEVYVCc6XG4gICAgY2FzZSAnVU5ERVJMSU5FRF9URVhUJzpcbiAgICAgIHJldHVybiAnZm10JztcbiAgICBjYXNlICdUQUdfSU1HJzpcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIGNhc2UgJ0xJTksnOlxuICAgICAgcmV0dXJuICdsaW5rJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIC9eKFNUQVJUX3xDTE9TRV8pLy50ZXN0KHBsYWNlaG9sZGVyKSA/ICdvdGhlcicgOiBudWxsO1xuICB9XG59XG4iXX0=