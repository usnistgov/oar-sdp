(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/xliff1_translation_serializer", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize/src/tools/src/extract/translation_files/format_options", "@angular/localize/src/tools/src/extract/translation_files/icu_parsing", "@angular/localize/src/tools/src/extract/translation_files/utils", "@angular/localize/src/tools/src/extract/translation_files/xml_file"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Xliff1TranslationSerializer = void 0;
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
    /** This is the number of characters that a legacy Xliff 1.2 message id has. */
    var LEGACY_XLIFF_MESSAGE_LENGTH = 40;
    /**
     * A translation serializer that can write XLIFF 1.2 formatted files.
     *
     * http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
     * http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
     *
     * @see Xliff1TranslationParser
     * @publicApi used by CLI
     */
    var Xliff1TranslationSerializer = /** @class */ (function () {
        function Xliff1TranslationSerializer(sourceLocale, basePath, useLegacyIds, formatOptions, fs) {
            if (formatOptions === void 0) { formatOptions = {}; }
            if (fs === void 0) { fs = file_system_1.getFileSystem(); }
            this.sourceLocale = sourceLocale;
            this.basePath = basePath;
            this.useLegacyIds = useLegacyIds;
            this.formatOptions = formatOptions;
            this.fs = fs;
            format_options_1.validateOptions('Xliff1TranslationSerializer', [['xml:space', ['preserve']]], formatOptions);
        }
        Xliff1TranslationSerializer.prototype.serialize = function (messages) {
            var e_1, _a, e_2, _b;
            var _this = this;
            var messageMap = utils_1.consolidateMessages(messages, function (message) { return _this.getMessageId(message); });
            var xml = new xml_file_1.XmlFile();
            xml.startTag('xliff', { 'version': '1.2', 'xmlns': 'urn:oasis:names:tc:xliff:document:1.2' });
            // NOTE: the `original` property is set to the legacy `ng2.template` value for backward
            // compatibility.
            // We could compute the file from the `message.location` property, but there could
            // be multiple values for this in the collection of `messages`. In that case we would probably
            // need to change the serializer to output a new `<file>` element for each collection of
            // messages that come from a particular original file, and the translation file parsers may not
            // be able to cope with this.
            xml.startTag('file', tslib_1.__assign({ 'source-language': this.sourceLocale, 'datatype': 'plaintext', 'original': 'ng2.template' }, this.formatOptions));
            xml.startTag('body');
            try {
                for (var _c = tslib_1.__values(messageMap.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = tslib_1.__read(_d.value, 2), id = _e[0], duplicateMessages = _e[1];
                    var message = duplicateMessages[0];
                    xml.startTag('trans-unit', { id: id, datatype: 'html' });
                    xml.startTag('source', {}, { preserveWhitespace: true });
                    this.serializeMessage(xml, message);
                    xml.endTag('source', { preserveWhitespace: false });
                    try {
                        // Write all the locations
                        for (var _f = (e_2 = void 0, tslib_1.__values(duplicateMessages.filter(utils_1.hasLocation))), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var location = _g.value.location;
                            this.serializeLocation(xml, location);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (message.description) {
                        this.serializeNote(xml, 'description', message.description);
                    }
                    if (message.meaning) {
                        this.serializeNote(xml, 'meaning', message.meaning);
                    }
                    xml.endTag('trans-unit');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            xml.endTag('body');
            xml.endTag('file');
            xml.endTag('xliff');
            return xml.toString();
        };
        Xliff1TranslationSerializer.prototype.serializeMessage = function (xml, message) {
            var _a;
            var length = message.messageParts.length - 1;
            for (var i = 0; i < length; i++) {
                this.serializeTextPart(xml, message.messageParts[i]);
                var location = (_a = message.substitutionLocations) === null || _a === void 0 ? void 0 : _a[message.placeholderNames[i]];
                this.serializePlaceholder(xml, message.placeholderNames[i], location === null || location === void 0 ? void 0 : location.text);
            }
            this.serializeTextPart(xml, message.messageParts[length]);
        };
        Xliff1TranslationSerializer.prototype.serializeTextPart = function (xml, text) {
            var pieces = icu_parsing_1.extractIcuPlaceholders(text);
            var length = pieces.length - 1;
            for (var i = 0; i < length; i += 2) {
                xml.text(pieces[i]);
                this.serializePlaceholder(xml, pieces[i + 1], undefined);
            }
            xml.text(pieces[length]);
        };
        Xliff1TranslationSerializer.prototype.serializePlaceholder = function (xml, id, text) {
            var attrs = { id: id };
            var ctype = getCtypeForPlaceholder(id);
            if (ctype !== null) {
                attrs.ctype = ctype;
            }
            if (text !== undefined) {
                attrs['equiv-text'] = text;
            }
            xml.startTag('x', attrs, { selfClosing: true });
        };
        Xliff1TranslationSerializer.prototype.serializeNote = function (xml, name, value) {
            xml.startTag('note', { priority: '1', from: name }, { preserveWhitespace: true });
            xml.text(value);
            xml.endTag('note', { preserveWhitespace: false });
        };
        Xliff1TranslationSerializer.prototype.serializeLocation = function (xml, location) {
            xml.startTag('context-group', { purpose: 'location' });
            this.renderContext(xml, 'sourcefile', this.fs.relative(this.basePath, location.file));
            var endLineString = location.end !== undefined && location.end.line !== location.start.line ?
                "," + (location.end.line + 1) :
                '';
            this.renderContext(xml, 'linenumber', "" + (location.start.line + 1) + endLineString);
            xml.endTag('context-group');
        };
        Xliff1TranslationSerializer.prototype.renderContext = function (xml, type, value) {
            xml.startTag('context', { 'context-type': type }, { preserveWhitespace: true });
            xml.text(value);
            xml.endTag('context', { preserveWhitespace: false });
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
         * An Xliff 1.2 legacy message id is a hex encoded SHA-1 string, which is 40 characters long. See
         * https://csrc.nist.gov/csrc/media/publications/fips/180/4/final/documents/fips180-4-draft-aug2014.pdf
         */
        Xliff1TranslationSerializer.prototype.getMessageId = function (message) {
            return message.customId ||
                this.useLegacyIds && message.legacyIds !== undefined &&
                    message.legacyIds.find(function (id) { return id.length === LEGACY_XLIFF_MESSAGE_LENGTH; }) ||
                message.id;
        };
        return Xliff1TranslationSerializer;
    }());
    exports.Xliff1TranslationSerializer = Xliff1TranslationSerializer;
    /**
     * Compute the value of the `ctype` attribute from the `placeholder` name.
     *
     * The placeholder can take the following forms:
     *
     * - `START_BOLD_TEXT`/`END_BOLD_TEXT`
     * - `TAG_<ELEMENT_NAME>`
     * - `START_TAG_<ELEMENT_NAME>`
     * - `CLOSE_TAG_<ELEMENT_NAME>`
     *
     * In these cases the element name of the tag is extracted from the placeholder name and returned as
     * `x-<element_name>`.
     *
     * Line breaks and images are special cases.
     */
    function getCtypeForPlaceholder(placeholder) {
        var tag = placeholder.replace(/^(START_|CLOSE_)/, '');
        switch (tag) {
            case 'LINE_BREAK':
                return 'lb';
            case 'TAG_IMG':
                return 'image';
            default:
                var element = tag.startsWith('TAG_') ?
                    tag.replace(/^TAG_(.+)/, function (_, tagName) { return tagName.toLowerCase(); }) :
                    TAG_MAP[tag];
                if (element === undefined) {
                    return null;
                }
                return "x-" + element;
        }
    }
    var TAG_MAP = {
        'LINK': 'a',
        'BOLD_TEXT': 'b',
        'EMPHASISED_TEXT': 'em',
        'HEADING_LEVEL1': 'h1',
        'HEADING_LEVEL2': 'h2',
        'HEADING_LEVEL3': 'h3',
        'HEADING_LEVEL4': 'h4',
        'HEADING_LEVEL5': 'h5',
        'HEADING_LEVEL6': 'h6',
        'HORIZONTAL_RULE': 'hr',
        'ITALIC_TEXT': 'i',
        'LIST_ITEM': 'li',
        'MEDIA_LINK': 'link',
        'ORDERED_LIST': 'ol',
        'PARAGRAPH': 'p',
        'QUOTATION': 'q',
        'STRIKETHROUGH_TEXT': 's',
        'SMALL_TEXT': 'small',
        'SUBSTRIPT': 'sub',
        'SUPERSCRIPT': 'sup',
        'TABLE_BODY': 'tbody',
        'TABLE_CELL': 'td',
        'TABLE_FOOTER': 'tfoot',
        'TABLE_HEADER_CELL': 'th',
        'TABLE_HEADER': 'thead',
        'TABLE_ROW': 'tr',
        'MONOSPACED_TEXT': 'tt',
        'UNDERLINED_TEXT': 'u',
        'UNORDERED_LIST': 'ul',
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYxX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMveGxpZmYxX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUFzRztJQUd0RywyR0FBZ0U7SUFDaEUscUdBQXFEO0lBRXJELHlGQUF5RDtJQUN6RCwrRkFBbUM7SUFFbkMsK0VBQStFO0lBQy9FLElBQU0sMkJBQTJCLEdBQUcsRUFBRSxDQUFDO0lBRXZDOzs7Ozs7OztPQVFHO0lBQ0g7UUFDRSxxQ0FDWSxZQUFvQixFQUFVLFFBQXdCLEVBQVUsWUFBcUIsRUFDckYsYUFBaUMsRUFBVSxFQUFnQztZQUEzRSw4QkFBQSxFQUFBLGtCQUFpQztZQUFVLG1CQUFBLEVBQUEsS0FBaUIsMkJBQWEsRUFBRTtZQUQzRSxpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO1lBQVUsaUJBQVksR0FBWixZQUFZLENBQVM7WUFDckYsa0JBQWEsR0FBYixhQUFhLENBQW9CO1lBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBOEI7WUFDckYsZ0NBQWUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9GLENBQUM7UUFFRCwrQ0FBUyxHQUFULFVBQVUsUUFBMEI7O1lBQXBDLGlCQTJDQztZQTFDQyxJQUFNLFVBQVUsR0FBRywyQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUExQixDQUEwQixDQUFDLENB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LGNBQWMsRUFBRSxPQUFPO1FBQ3ZCLG1CQUFtQixFQUFFLElBQUk7UUFDekIsY0FBYyxFQUFFLE9BQU87UUFDdkIsV0FBVyxFQUFFLElBQUk7UUFDakIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixpQkFBaUIsRUFBRSxHQUFHO1FBQ3RCLGdCQUFnQixFQUFFLElBQUk7S0FDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbSwgZ2V0RmlsZVN5c3RlbX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge8m1UGFyc2VkTWVzc2FnZSwgybVTb3VyY2VMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuXG5pbXBvcnQge0Zvcm1hdE9wdGlvbnMsIHZhbGlkYXRlT3B0aW9uc30gZnJvbSAnLi9mb3JtYXRfb3B0aW9ucyc7XG5pbXBvcnQge2V4dHJhY3RJY3VQbGFjZWhvbGRlcnN9IGZyb20gJy4vaWN1X3BhcnNpbmcnO1xuaW1wb3J0IHtUcmFuc2xhdGlvblNlcmlhbGl6ZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fc2VyaWFsaXplcic7XG5pbXBvcnQge2NvbnNvbGlkYXRlTWVzc2FnZXMsIGhhc0xvY2F0aW9ufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7WG1sRmlsZX0gZnJvbSAnLi94bWxfZmlsZSc7XG5cbi8qKiBUaGlzIGlzIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IGEgbGVnYWN5IFhsaWZmIDEuMiBtZXNzYWdlIGlkIGhhcy4gKi9cbmNvbnN0IExFR0FDWV9YTElGRl9NRVNTQUdFX0xFTkdUSCA9IDQwO1xuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gc2VyaWFsaXplciB0aGF0IGNhbiB3cml0ZSBYTElGRiAxLjIgZm9ybWF0dGVkIGZpbGVzLlxuICpcbiAqIGh0dHA6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3YxLjIvb3MveGxpZmYtY29yZS5odG1sXG4gKiBodHRwOi8vZG9jcy5vYXNpcy1vcGVuLm9yZy94bGlmZi92MS4yL3hsaWZmLXByb2ZpbGUtaHRtbC94bGlmZi1wcm9maWxlLWh0bWwtMS4yLmh0bWxcbiAqXG4gKiBAc2VlIFhsaWZmMVRyYW5zbGF0aW9uUGFyc2VyXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBjbGFzcyBYbGlmZjFUcmFuc2xhdGlvblNlcmlhbGl6ZXIgaW1wbGVtZW50cyBUcmFuc2xhdGlvblNlcmlhbGl6ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc291cmNlTG9jYWxlOiBzdHJpbmcsIHByaXZhdGUgYmFzZVBhdGg6IEFic29sdXRlRnNQYXRoLCBwcml2YXRlIHVzZUxlZ2FjeUlkczogYm9vbGVhbixcbiAgICAgIHByaXZhdGUgZm9ybWF0T3B0aW9uczogRm9ybWF0T3B0aW9ucyA9IHt9LCBwcml2YXRlIGZzOiBGaWxlU3lzdGVtID0gZ2V0RmlsZVN5c3RlbSgpKSB7XG4gICAgdmFsaWRhdGVPcHRpb25zKCdYbGlmZjFUcmFuc2xhdGlvblNlcmlhbGl6ZXInLCBbWyd4bWw6c3BhY2UnLCBbJ3ByZXNlcnZlJ11dXSwgZm9ybWF0T3B0aW9ucyk7XG4gIH1cblxuICBzZXJpYWxpemUobWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlTWFwID0gY29uc29saWRhdGVNZXNzYWdlcyhtZXNzYWdlcywgbWVzc2FnZSA9PiB0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgY29uc3QgeG1sID0gbmV3IFhtbEZpbGUoKTtcbiAgICB4bWwuc3RhcnRUYWcoJ3hsaWZmJywgeyd2ZXJzaW9uJzogJzEuMicsICd4bWxucyc6ICd1cm46b2FzaXM6bmFtZXM6dGM6eGxpZmY6ZG9jdW1lbnQ6MS4yJ30pO1xuICAgIC8vIE5PVEU6IHRoZSBgb3JpZ2luYWxgIHByb3BlcnR5IGlzIHNldCB0byB0aGUgbGVnYWN5IGBuZzIudGVtcGxhdGVgIHZhbHVlIGZvciBiYWNrd2FyZFxuICAgIC8vIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gV2UgY291bGQgY29tcHV0ZSB0aGUgZmlsZSBmcm9tIHRoZSBgbWVzc2FnZS5sb2NhdGlvbmAgcHJvcGVydHksIGJ1dCB0aGVyZSBjb3VsZFxuICAgIC8vIGJlIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhpcyBpbiB0aGUgY29sbGVjdGlvbiBvZiBgbWVzc2FnZXNgLiBJbiB0aGF0IGNhc2Ugd2Ugd291bGQgcHJvYmFibHlcbiAgICAvLyBuZWVkIHRvIGNoYW5nZSB0aGUgc2VyaWFsaXplciB0byBvdXRwdXQgYSBuZXcgYDxmaWxlPmAgZWxlbWVudCBmb3IgZWFjaCBjb2xsZWN0aW9uIG9mXG4gICAgLy8gbWVzc2FnZXMgdGhhdCBjb21lIGZyb20gYSBwYXJ0aWN1bGFyIG9yaWdpbmFsIGZpbGUsIGFuZCB0aGUgdHJhbnNsYXRpb24gZmlsZSBwYXJzZXJzIG1heSBub3RcbiAgICAvLyBiZSBhYmxlIHRvIGNvcGUgd2l0aCB0aGlzLlxuICAgIHhtbC5zdGFydFRhZygnZmlsZScsIHtcbiAgICAgICdzb3VyY2UtbGFuZ3VhZ2UnOiB0aGlzLnNvdXJjZUxvY2FsZSxcbiAgICAgICdkYXRhdHlwZSc6ICdwbGFpbnRleHQnLFxuICAgICAgJ29yaWdpbmFsJzogJ25nMi50ZW1wbGF0ZScsXG4gICAgICAuLi50aGlzLmZvcm1hdE9wdGlvbnMsXG4gICAgfSk7XG4gICAgeG1sLnN0YXJ0VGFnKCdib2R5Jyk7XG4gICAgZm9yIChjb25zdCBbaWQsIGR1cGxpY2F0ZU1lc3NhZ2VzXSBvZiBtZXNzYWdlTWFwLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGR1cGxpY2F0ZU1lc3NhZ2VzWzBdO1xuXG4gICAgICB4bWwuc3RhcnRUYWcoJ3RyYW5zLXVuaXQnLCB7aWQsIGRhdGF0eXBlOiAnaHRtbCd9KTtcbiAgICAgIHhtbC5zdGFydFRhZygnc291cmNlJywge30sIHtwcmVzZXJ2ZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgICAgIHRoaXMuc2VyaWFsaXplTWVzc2FnZSh4bWwsIG1lc3NhZ2UpO1xuICAgICAgeG1sLmVuZFRhZygnc291cmNlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcblxuICAgICAgLy8gV3JpdGUgYWxsIHRoZSBsb2NhdGlvbnNcbiAgICAgIGZvciAoY29uc3Qge2xvY2F0aW9ufSBvZiBkdXBsaWNhdGVNZXNzYWdlcy5maWx0ZXIoaGFzTG9jYXRpb24pKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplTG9jYXRpb24oeG1sLCBsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZXNzYWdlLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplTm90ZSh4bWwsICdkZXNjcmlwdGlvbicsIG1lc3NhZ2UuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKG1lc3NhZ2UubWVhbmluZykge1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vdGUoeG1sLCAnbWVhbmluZycsIG1lc3NhZ2UubWVhbmluZyk7XG4gICAgICB9XG4gICAgICB4bWwuZW5kVGFnKCd0cmFucy11bml0Jyk7XG4gICAgfVxuICAgIHhtbC5lbmRUYWcoJ2JvZHknKTtcbiAgICB4bWwuZW5kVGFnKCdmaWxlJyk7XG4gICAgeG1sLmVuZFRhZygneGxpZmYnKTtcbiAgICByZXR1cm4geG1sLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZU1lc3NhZ2UoeG1sOiBYbWxGaWxlLCBtZXNzYWdlOiDJtVBhcnNlZE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCBsZW5ndGggPSBtZXNzYWdlLm1lc3NhZ2VQYXJ0cy5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2VyaWFsaXplVGV4dFBhcnQoeG1sLCBtZXNzYWdlLm1lc3NhZ2VQYXJ0c1tpXSk7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IG1lc3NhZ2Uuc3Vic3RpdHV0aW9uTG9jYXRpb25zPy5bbWVzc2FnZS5wbGFjZWhvbGRlck5hbWVzW2ldXTtcbiAgICAgIHRoaXMuc2VyaWFsaXplUGxhY2Vob2xkZXIoeG1sLCBtZXNzYWdlLnBsYWNlaG9sZGVyTmFtZXNbaV0sIGxvY2F0aW9uPy50ZXh0KTtcbiAgICB9XG4gICAgdGhpcy5zZXJpYWxpemVUZXh0UGFydCh4bWwsIG1lc3NhZ2UubWVzc2FnZVBhcnRzW2xlbmd0aF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVUZXh0UGFydCh4bWw6IFhtbEZpbGUsIHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHBpZWNlcyA9IGV4dHJhY3RJY3VQbGFjZWhvbGRlcnModGV4dCk7XG4gICAgY29uc3QgbGVuZ3RoID0gcGllY2VzLmxlbmd0aCAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMikge1xuICAgICAgeG1sLnRleHQocGllY2VzW2ldKTtcbiAgICAgIHRoaXMuc2VyaWFsaXplUGxhY2Vob2xkZXIoeG1sLCBwaWVjZXNbaSArIDFdLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICB4bWwudGV4dChwaWVjZXNbbGVuZ3RoXSk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZVBsYWNlaG9sZGVyKHhtbDogWG1sRmlsZSwgaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGNvbnN0IGF0dHJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge2lkfTtcbiAgICBjb25zdCBjdHlwZSA9IGdldEN0eXBlRm9yUGxhY2Vob2xkZXIoaWQpO1xuICAgIGlmIChjdHlwZSAhPT0gbnVsbCkge1xuICAgICAgYXR0cnMuY3R5cGUgPSBjdHlwZTtcbiAgICB9XG4gICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXR0cnNbJ2VxdWl2LXRleHQnXSA9IHRleHQ7XG4gICAgfVxuICAgIHhtbC5zdGFydFRhZygneCcsIGF0dHJzLCB7c2VsZkNsb3Npbmc6IHRydWV9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplTm90ZSh4bWw6IFhtbEZpbGUsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHhtbC5zdGFydFRhZygnbm90ZScsIHtwcmlvcml0eTogJzEnLCBmcm9tOiBuYW1lfSwge3ByZXNlcnZlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICAgIHhtbC50ZXh0KHZhbHVlKTtcbiAgICB4bWwuZW5kVGFnKCdub3RlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplTG9jYXRpb24oeG1sOiBYbWxGaWxlLCBsb2NhdGlvbjogybVTb3VyY2VMb2NhdGlvbik6IHZvaWQge1xuICAgIHhtbC5zdGFydFRhZygnY29udGV4dC1ncm91cCcsIHtwdXJwb3NlOiAnbG9jYXRpb24nfSk7XG4gICAgdGhpcy5yZW5kZXJDb250ZXh0KHhtbCwgJ3NvdXJjZWZpbGUnLCB0aGlzLmZzLnJlbGF0aXZlKHRoaXMuYmFzZVBhdGgsIGxvY2F0aW9uLmZpbGUpKTtcbiAgICBjb25zdCBlbmRMaW5lU3RyaW5nID0gbG9jYXRpb24uZW5kICE9PSB1bmRlZmluZWQgJiYgbG9jYXRpb24uZW5kLmxpbmUgIT09IGxvY2F0aW9uLnN0YXJ0LmxpbmUgP1xuICAgICAgICBgLCR7bG9jYXRpb24uZW5kLmxpbmUgKyAxfWAgOlxuICAgICAgICAnJztcbiAgICB0aGlzLnJlbmRlckNvbnRleHQoeG1sLCAnbGluZW51bWJlcicsIGAke2xvY2F0aW9uLnN0YXJ0LmxpbmUgKyAxfSR7ZW5kTGluZVN0cmluZ31gKTtcbiAgICB4bWwuZW5kVGFnKCdjb250ZXh0LWdyb3VwJyk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckNvbnRleHQoeG1sOiBYbWxGaWxlLCB0eXBlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB4bWwuc3RhcnRUYWcoJ2NvbnRleHQnLCB7J2NvbnRleHQtdHlwZSc6IHR5cGV9LCB7cHJlc2VydmVXaGl0ZXNwYWNlOiB0cnVlfSk7XG4gICAgeG1sLnRleHQodmFsdWUpO1xuICAgIHhtbC5lbmRUYWcoJ2NvbnRleHQnLCB7cHJlc2VydmVXaGl0ZXNwYWNlOiBmYWxzZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaWQgZm9yIHRoZSBnaXZlbiBgbWVzc2FnZWAuXG4gICAqXG4gICAqIElmIHRoZXJlIHdhcyBhIGN1c3RvbSBpZCBwcm92aWRlZCwgdXNlIHRoYXQuXG4gICAqXG4gICAqIElmIHdlIGhhdmUgcmVxdWVzdGVkIGxlZ2FjeSBtZXNzYWdlIGlkcywgdGhlbiB0cnkgdG8gcmV0dXJuIHRoZSBhcHByb3ByaWF0ZSBpZFxuICAgKiBmcm9tIHRoZSBsaXN0IG9mIGxlZ2FjeSBpZHMgdGhhdCB3ZXJlIGV4dHJhY3RlZC5cbiAgICpcbiAgICogT3RoZXJ3aXNlIHJldHVybiB0aGUgY2Fub25pY2FsIG1lc3NhZ2UgaWQuXG4gICAqXG4gICAqIEFuIFhsaWZmIDEuMiBsZWdhY3kgbWVzc2FnZSBpZCBpcyBhIGhleCBlbmNvZGVkIFNIQS0xIHN0cmluZywgd2hpY2ggaXMgNDAgY2hhcmFjdGVycyBsb25nLiBTZWVcbiAgICogaHR0cHM6Ly9jc3JjLm5pc3QuZ292L2NzcmMvbWVkaWEvcHVibGljYXRpb25zL2ZpcHMvMTgwLzQvZmluYWwvZG9jdW1lbnRzL2ZpcHMxODAtNC1kcmFmdC1hdWcyMDE0LnBkZlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRNZXNzYWdlSWQobWVzc2FnZTogybVQYXJzZWRNZXNzYWdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbWVzc2FnZS5jdXN0b21JZCB8fFxuICAgICAgICB0aGlzLnVzZUxlZ2FjeUlkcyAmJiBtZXNzYWdlLmxlZ2FjeUlkcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG1lc3NhZ2UubGVnYWN5SWRzLmZpbmQoaWQgPT4gaWQubGVuZ3RoID09PSBMRUdBQ1lfWExJRkZfTUVTU0FHRV9MRU5HVEgpIHx8XG4gICAgICAgIG1lc3NhZ2UuaWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSB2YWx1ZSBvZiB0aGUgYGN0eXBlYCBhdHRyaWJ1dGUgZnJvbSB0aGUgYHBsYWNlaG9sZGVyYCBuYW1lLlxuICpcbiAqIFRoZSBwbGFjZWhvbGRlciBjYW4gdGFrZSB0aGUgZm9sbG93aW5nIGZvcm1zOlxuICpcbiAqIC0gYFNUQVJUX0JPTERfVEVYVGAvYEVORF9CT0xEX1RFWFRgXG4gKiAtIGBUQUdfPEVMRU1FTlRfTkFNRT5gXG4gKiAtIGBTVEFSVF9UQUdfPEVMRU1FTlRfTkFNRT5gXG4gKiAtIGBDTE9TRV9UQUdfPEVMRU1FTlRfTkFNRT5gXG4gKlxuICogSW4gdGhlc2UgY2FzZXMgdGhlIGVsZW1lbnQgbmFtZSBvZiB0aGUgdGFnIGlzIGV4dHJhY3RlZCBmcm9tIHRoZSBwbGFjZWhvbGRlciBuYW1lIGFuZCByZXR1cm5lZCBhc1xuICogYHgtPGVsZW1lbnRfbmFtZT5gLlxuICpcbiAqIExpbmUgYnJlYWtzIGFuZCBpbWFnZXMgYXJlIHNwZWNpYWwgY2FzZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEN0eXBlRm9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3QgdGFnID0gcGxhY2Vob2xkZXIucmVwbGFjZSgvXihTVEFSVF98Q0xPU0VfKS8sICcnKTtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlICdMSU5FX0JSRUFLJzpcbiAgICAgIHJldHVybiAnbGInO1xuICAgIGNhc2UgJ1RBR19JTUcnOlxuICAgICAgcmV0dXJuICdpbWFnZSc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0YWcuc3RhcnRzV2l0aCgnVEFHXycpID9cbiAgICAgICAgICB0YWcucmVwbGFjZSgvXlRBR18oLispLywgKF8sIHRhZ05hbWU6IHN0cmluZykgPT4gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKSA6XG4gICAgICAgICAgVEFHX01BUFt0YWddO1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgeC0ke2VsZW1lbnR9YDtcbiAgfVxufVxuXG5jb25zdCBUQUdfTUFQOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAnTElOSyc6ICdhJyxcbiAgJ0JPTERfVEVYVCc6ICdiJyxcbiAgJ0VNUEhBU0lTRURfVEVYVCc6ICdlbScsXG4gICdIRUFESU5HX0xFVkVMMSc6ICdoMScsXG4gICdIRUFESU5HX0xFVkVMMic6ICdoMicsXG4gICdIRUFESU5HX0xFVkVMMyc6ICdoMycsXG4gICdIRUFESU5HX0xFVkVMNCc6ICdoNCcsXG4gICdIRUFESU5HX0xFVkVMNSc6ICdoNScsXG4gICdIRUFESU5HX0xFVkVMNic6ICdoNicsXG4gICdIT1JJWk9OVEFMX1JVTEUnOiAnaHInLFxuICAnSVRBTElDX1RFWFQnOiAnaScsXG4gICdMSVNUX0lURU0nOiAnbGknLFxuICAnTUVESUFfTElOSyc6ICdsaW5rJyxcbiAgJ09SREVSRURfTElTVCc6ICdvbCcsXG4gICdQQVJBR1JBUEgnOiAncCcsXG4gICdRVU9UQVRJT04nOiAncScsXG4gICdTVFJJS0VUSFJPVUdIX1RFWFQnOiAncycsXG4gICdTTUFMTF9URVhUJzogJ3NtYWxsJyxcbiAgJ1NVQlNUUklQVCc6ICdzdWInLFxuICAnU1VQRVJTQ1JJUFQnOiAnc3VwJyxcbiAgJ1RBQkxFX0JPRFknOiAndGJvZHknLFxuICAnVEFCTEVfQ0VMTCc6ICd0ZCcsXG4gICdUQUJMRV9GT09URVInOiAndGZvb3QnLFxuICAnVEFCTEVfSEVBREVSX0NFTEwnOiAndGgnLFxuICAnVEFCTEVfSEVBREVSJzogJ3RoZWFkJyxcbiAgJ1RBQkxFX1JPVyc6ICd0cicsXG4gICdNT05PU1BBQ0VEX1RFWFQnOiAndHQnLFxuICAnVU5ERVJMSU5FRF9URVhUJzogJ3UnLFxuICAnVU5PUkRFUkVEX0xJU1QnOiAndWwnLFxufTtcbiJdfQ==