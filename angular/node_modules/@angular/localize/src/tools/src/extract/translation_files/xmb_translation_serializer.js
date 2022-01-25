(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/xmb_translation_serializer", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize/src/tools/src/extract/translation_files/icu_parsing", "@angular/localize/src/tools/src/extract/translation_files/xml_file"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XmbTranslationSerializer = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var icu_parsing_1 = require("@angular/localize/src/tools/src/extract/translation_files/icu_parsing");
    var xml_file_1 = require("@angular/localize/src/tools/src/extract/translation_files/xml_file");
    /**
     * A translation serializer that can write files in XMB format.
     *
     * http://cldr.unicode.org/development/development-process/design-proposals/xmb
     *
     * @see XmbTranslationParser
     * @publicApi used by CLI
     */
    var XmbTranslationSerializer = /** @class */ (function () {
        function XmbTranslationSerializer(basePath, useLegacyIds, fs) {
            if (fs === void 0) { fs = file_system_1.getFileSystem(); }
            this.basePath = basePath;
            this.useLegacyIds = useLegacyIds;
            this.fs = fs;
        }
        XmbTranslationSerializer.prototype.serialize = function (messages) {
            var e_1, _a;
            var ids = new Set();
            var xml = new xml_file_1.XmlFile();
            xml.rawText("<!DOCTYPE messagebundle [\n" +
                "<!ELEMENT messagebundle (msg)*>\n" +
                "<!ATTLIST messagebundle class CDATA #IMPLIED>\n" +
                "\n" +
                "<!ELEMENT msg (#PCDATA|ph|source)*>\n" +
                "<!ATTLIST msg id CDATA #IMPLIED>\n" +
                "<!ATTLIST msg seq CDATA #IMPLIED>\n" +
                "<!ATTLIST msg name CDATA #IMPLIED>\n" +
                "<!ATTLIST msg desc CDATA #IMPLIED>\n" +
                "<!ATTLIST msg meaning CDATA #IMPLIED>\n" +
                "<!ATTLIST msg obsolete (obsolete) #IMPLIED>\n" +
                "<!ATTLIST msg xml:space (default|preserve) \"default\">\n" +
                "<!ATTLIST msg is_hidden CDATA #IMPLIED>\n" +
                "\n" +
                "<!ELEMENT source (#PCDATA)>\n" +
                "\n" +
                "<!ELEMENT ph (#PCDATA|ex)*>\n" +
                "<!ATTLIST ph name CDATA #REQUIRED>\n" +
                "\n" +
                "<!ELEMENT ex (#PCDATA)>\n" +
                "]>\n");
            xml.startTag('messagebundle');
            try {
                for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                    var message = messages_1_1.value;
                    var id = this.getMessageId(message);
                    if (ids.has(id)) {
                        // Do not render the same message more than once
                        continue;
                    }
                    ids.add(id);
                    xml.startTag('msg', { id: id, desc: message.description, meaning: message.meaning }, { preserveWhitespace: true });
                    if (message.location) {
                        this.serializeLocation(xml, message.location);
                    }
                    this.serializeMessage(xml, message);
                    xml.endTag('msg', { preserveWhitespace: false });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            xml.endTag('messagebundle');
            return xml.toString();
        };
        XmbTranslationSerializer.prototype.serializeLocation = function (xml, location) {
            xml.startTag('source');
            var endLineString = location.end !== undefined && location.end.line !== location.start.line ?
                "," + (location.end.line + 1) :
                '';
            xml.text(this.fs.relative(this.basePath, location.file) + ":" + location.start.line + endLineString);
            xml.endTag('source');
        };
        XmbTranslationSerializer.prototype.serializeMessage = function (xml, message) {
            var length = message.messageParts.length - 1;
            for (var i = 0; i < length; i++) {
                this.serializeTextPart(xml, message.messageParts[i]);
                xml.startTag('ph', { name: message.placeholderNames[i] }, { selfClosing: true });
            }
            this.serializeTextPart(xml, message.messageParts[length]);
        };
        XmbTranslationSerializer.prototype.serializeTextPart = function (xml, text) {
            var pieces = icu_parsing_1.extractIcuPlaceholders(text);
            var length = pieces.length - 1;
            for (var i = 0; i < length; i += 2) {
                xml.text(pieces[i]);
                xml.startTag('ph', { name: pieces[i + 1] }, { selfClosing: true });
            }
            xml.text(pieces[length]);
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
         * An XMB legacy message id is a 64 bit number encoded as a decimal string, which will have
         * at most 20 digits, since 2^65-1 = 36,893,488,147,419,103,231. This digest is based on:
         * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/GoogleJsMessageIdGenerator.java
         */
        XmbTranslationSerializer.prototype.getMessageId = function (message) {
            return message.customId ||
                this.useLegacyIds && message.legacyIds !== undefined &&
                    message.legacyIds.find(function (id) { return id.length <= 20 && !/[^0-9]/.test(id); }) ||
                message.id;
        };
        return XmbTranslationSerializer;
    }());
    exports.XmbTranslationSerializer = XmbTranslationSerializer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMveG1iX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUFzRztJQUd0RyxxR0FBcUQ7SUFFckQsK0ZBQW1DO0lBRW5DOzs7Ozs7O09BT0c7SUFDSDtRQUNFLGtDQUNZLFFBQXdCLEVBQVUsWUFBcUIsRUFDdkQsRUFBZ0M7WUFBaEMsbUJBQUEsRUFBQSxLQUFpQiwyQkFBYSxFQUFFO1lBRGhDLGFBQVEsR0FBUixRQUFRLENBQWdCO1lBQVUsaUJBQVksR0FBWixZQUFZLENBQVM7WUFDdkQsT0FBRSxHQUFGLEVBQUUsQ0FBOEI7UUFBRyxDQUFDO1FBRWhELDRDQUFTLEdBQVQsVUFBVSxRQUEwQjs7WUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztZQUM5QixJQUFNLEdBQUcsR0FBRyxJQUFJLGtCQUFPLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsT0FBTyxDQUNQLDZCQUE2QjtnQkFDN0IsbUNBQW1DO2dCQUNuQyxpREFBaUQ7Z0JBQ2pELElBQUk7Z0JBQ0osdUNBQXVDO2dCQUN2QyxvQ0FBb0M7Z0JBQ3BDLHFDQUFxQztnQkFDckMsc0NBQXNDO2dCQUN0QyxzQ0FBc0M7Z0JBQ3RDLHlDQUF5QztnQkFDekMsK0NBQStDO2dCQUMvQywyREFBeUQ7Z0JBQ3pELDJDQUEyQztnQkFDM0MsSUFBSTtnQkFDSiwrQkFBK0I7Z0JBQy9CLElBQUk7Z0JBQ0osK0JBQStCO2dCQUMvQixzQ0FBc0M7Z0JBQ3RDLElBQUk7Z0JBQ0osMkJBQTJCO2dCQUMzQixNQUFNLENBQUMsQ0FBQztZQUNa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SSxDQUFDLENBQUM7WUFDNUMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUNoRTtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSywrQ0FBWSxHQUFwQixVQUFxQixPQUF1QjtZQUMxQyxPQUFPLE9BQU8sQ0FBQyxRQUFRO2dCQUNuQixJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUztvQkFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUM7Z0JBQ25FLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNILCtCQUFDO0lBQUQsQ0FBQyxBQXBHRCxJQW9HQztJQXBHWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIGdldEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtVBhcnNlZE1lc3NhZ2UsIMm1U291cmNlTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2xvY2FsaXplJztcblxuaW1wb3J0IHtleHRyYWN0SWN1UGxhY2Vob2xkZXJzfSBmcm9tICcuL2ljdV9wYXJzaW5nJztcbmltcG9ydCB7VHJhbnNsYXRpb25TZXJpYWxpemVyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtYbWxGaWxlfSBmcm9tICcuL3htbF9maWxlJztcblxuLyoqXG4gKiBBIHRyYW5zbGF0aW9uIHNlcmlhbGl6ZXIgdGhhdCBjYW4gd3JpdGUgZmlsZXMgaW4gWE1CIGZvcm1hdC5cbiAqXG4gKiBodHRwOi8vY2xkci51bmljb2RlLm9yZy9kZXZlbG9wbWVudC9kZXZlbG9wbWVudC1wcm9jZXNzL2Rlc2lnbi1wcm9wb3NhbHMveG1iXG4gKlxuICogQHNlZSBYbWJUcmFuc2xhdGlvblBhcnNlclxuICogQHB1YmxpY0FwaSB1c2VkIGJ5IENMSVxuICovXG5leHBvcnQgY2xhc3MgWG1iVHJhbnNsYXRpb25TZXJpYWxpemVyIGltcGxlbWVudHMgVHJhbnNsYXRpb25TZXJpYWxpemVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGJhc2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCwgcHJpdmF0ZSB1c2VMZWdhY3lJZHM6IGJvb2xlYW4sXG4gICAgICBwcml2YXRlIGZzOiBGaWxlU3lzdGVtID0gZ2V0RmlsZVN5c3RlbSgpKSB7fVxuXG4gIHNlcmlhbGl6ZShtZXNzYWdlczogybVQYXJzZWRNZXNzYWdlW10pOiBzdHJpbmcge1xuICAgIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGNvbnN0IHhtbCA9IG5ldyBYbWxGaWxlKCk7XG4gICAgeG1sLnJhd1RleHQoXG4gICAgICAgIGA8IURPQ1RZUEUgbWVzc2FnZWJ1bmRsZSBbXFxuYCArXG4gICAgICAgIGA8IUVMRU1FTlQgbWVzc2FnZWJ1bmRsZSAobXNnKSo+XFxuYCArXG4gICAgICAgIGA8IUFUVExJU1QgbWVzc2FnZWJ1bmRsZSBjbGFzcyBDREFUQSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYFxcbmAgK1xuICAgICAgICBgPCFFTEVNRU5UIG1zZyAoI1BDREFUQXxwaHxzb3VyY2UpKj5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgaWQgQ0RBVEEgI0lNUExJRUQ+XFxuYCArXG4gICAgICAgIGA8IUFUVExJU1QgbXNnIHNlcSBDREFUQSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgbmFtZSBDREFUQSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgZGVzYyBDREFUQSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgbWVhbmluZyBDREFUQSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgb2Jzb2xldGUgKG9ic29sZXRlKSAjSU1QTElFRD5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgeG1sOnNwYWNlIChkZWZhdWx0fHByZXNlcnZlKSBcImRlZmF1bHRcIj5cXG5gICtcbiAgICAgICAgYDwhQVRUTElTVCBtc2cgaXNfaGlkZGVuIENEQVRBICNJTVBMSUVEPlxcbmAgK1xuICAgICAgICBgXFxuYCArXG4gICAgICAgIGA8IUVMRU1FTlQgc291cmNlICgjUENEQVRBKT5cXG5gICtcbiAgICAgICAgYFxcbmAgK1xuICAgICAgICBgPCFFTEVNRU5UIHBoICgjUENEQVRBfGV4KSo+XFxuYCArXG4gICAgICAgIGA8IUFUVExJU1QgcGggbmFtZSBDREFUQSAjUkVRVUlSRUQ+XFxuYCArXG4gICAgICAgIGBcXG5gICtcbiAgICAgICAgYDwhRUxFTUVOVCBleCAoI1BDREFUQSk+XFxuYCArXG4gICAgICAgIGBdPlxcbmApO1xuICAgIHhtbC5zdGFydFRhZygnbWVzc2FnZWJ1bmRsZScpO1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKTtcbiAgICAgIGlmIChpZHMuaGFzKGlkKSkge1xuICAgICAgICAvLyBEbyBub3QgcmVuZGVyIHRoZSBzYW1lIG1lc3NhZ2UgbW9yZSB0aGFuIG9uY2VcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZHMuYWRkKGlkKTtcbiAgICAgIHhtbC5zdGFydFRhZyhcbiAgICAgICAgICAnbXNnJywge2lkLCBkZXNjOiBtZXNzYWdlLmRlc2NyaXB0aW9uLCBtZWFuaW5nOiBtZXNzYWdlLm1lYW5pbmd9LFxuICAgICAgICAgIHtwcmVzZXJ2ZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgICAgIGlmIChtZXNzYWdlLmxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplTG9jYXRpb24oeG1sLCBtZXNzYWdlLmxvY2F0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VyaWFsaXplTWVzc2FnZSh4bWwsIG1lc3NhZ2UpO1xuICAgICAgeG1sLmVuZFRhZygnbXNnJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgICB9XG4gICAgeG1sLmVuZFRhZygnbWVzc2FnZWJ1bmRsZScpO1xuICAgIHJldHVybiB4bWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplTG9jYXRpb24oeG1sOiBYbWxGaWxlLCBsb2NhdGlvbjogybVTb3VyY2VMb2NhdGlvbik6IHZvaWQge1xuICAgIHhtbC5zdGFydFRhZygnc291cmNlJyk7XG4gICAgY29uc3QgZW5kTGluZVN0cmluZyA9IGxvY2F0aW9uLmVuZCAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLmVuZC5saW5lICE9PSBsb2NhdGlvbi5zdGFydC5saW5lID9cbiAgICAgICAgYCwke2xvY2F0aW9uLmVuZC5saW5lICsgMX1gIDpcbiAgICAgICAgJyc7XG4gICAgeG1sLnRleHQoXG4gICAgICAgIGAke3RoaXMuZnMucmVsYXRpdmUodGhpcy5iYXNlUGF0aCwgbG9jYXRpb24uZmlsZSl9OiR7bG9jYXRpb24uc3RhcnQubGluZX0ke2VuZExpbmVTdHJpbmd9YCk7XG4gICAgeG1sLmVuZFRhZygnc291cmNlJyk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZU1lc3NhZ2UoeG1sOiBYbWxGaWxlLCBtZXNzYWdlOiDJtVBhcnNlZE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCBsZW5ndGggPSBtZXNzYWdlLm1lc3NhZ2VQYXJ0cy5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2VyaWFsaXplVGV4dFBhcnQoeG1sLCBtZXNzYWdlLm1lc3NhZ2VQYXJ0c1tpXSk7XG4gICAgICB4bWwuc3RhcnRUYWcoJ3BoJywge25hbWU6IG1lc3NhZ2UucGxhY2Vob2xkZXJOYW1lc1tpXX0sIHtzZWxmQ2xvc2luZzogdHJ1ZX0pO1xuICAgIH1cbiAgICB0aGlzLnNlcmlhbGl6ZVRleHRQYXJ0KHhtbCwgbWVzc2FnZS5tZXNzYWdlUGFydHNbbGVuZ3RoXSk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZVRleHRQYXJ0KHhtbDogWG1sRmlsZSwgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGllY2VzID0gZXh0cmFjdEljdVBsYWNlaG9sZGVycyh0ZXh0KTtcbiAgICBjb25zdCBsZW5ndGggPSBwaWVjZXMubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB4bWwudGV4dChwaWVjZXNbaV0pO1xuICAgICAgeG1sLnN0YXJ0VGFnKCdwaCcsIHtuYW1lOiBwaWVjZXNbaSArIDFdfSwge3NlbGZDbG9zaW5nOiB0cnVlfSk7XG4gICAgfVxuICAgIHhtbC50ZXh0KHBpZWNlc1tsZW5ndGhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGlkIGZvciB0aGUgZ2l2ZW4gYG1lc3NhZ2VgLlxuICAgKlxuICAgKiBJZiB0aGVyZSB3YXMgYSBjdXN0b20gaWQgcHJvdmlkZWQsIHVzZSB0aGF0LlxuICAgKlxuICAgKiBJZiB3ZSBoYXZlIHJlcXVlc3RlZCBsZWdhY3kgbWVzc2FnZSBpZHMsIHRoZW4gdHJ5IHRvIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgaWRcbiAgICogZnJvbSB0aGUgbGlzdCBvZiBsZWdhY3kgaWRzIHRoYXQgd2VyZSBleHRyYWN0ZWQuXG4gICAqXG4gICAqIE90aGVyd2lzZSByZXR1cm4gdGhlIGNhbm9uaWNhbCBtZXNzYWdlIGlkLlxuICAgKlxuICAgKiBBbiBYTUIgbGVnYWN5IG1lc3NhZ2UgaWQgaXMgYSA2NCBiaXQgbnVtYmVyIGVuY29kZWQgYXMgYSBkZWNpbWFsIHN0cmluZywgd2hpY2ggd2lsbCBoYXZlXG4gICAqIGF0IG1vc3QgMjAgZGlnaXRzLCBzaW5jZSAyXjY1LTEgPSAzNiw4OTMsNDg4LDE0Nyw0MTksMTAzLDIzMS4gVGhpcyBkaWdlc3QgaXMgYmFzZWQgb246XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9ibG9iL21hc3Rlci9zcmMvY29tL2dvb2dsZS9qYXZhc2NyaXB0L2pzY29tcC9Hb29nbGVKc01lc3NhZ2VJZEdlbmVyYXRvci5qYXZhXG4gICAqL1xuICBwcml2YXRlIGdldE1lc3NhZ2VJZChtZXNzYWdlOiDJtVBhcnNlZE1lc3NhZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBtZXNzYWdlLmN1c3RvbUlkIHx8XG4gICAgICAgIHRoaXMudXNlTGVnYWN5SWRzICYmIG1lc3NhZ2UubGVnYWN5SWRzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbWVzc2FnZS5sZWdhY3lJZHMuZmluZChpZCA9PiBpZC5sZW5ndGggPD0gMjAgJiYgIS9bXjAtOV0vLnRlc3QoaWQpKSB8fFxuICAgICAgICBtZXNzYWdlLmlkO1xuICB9XG59XG4iXX0=