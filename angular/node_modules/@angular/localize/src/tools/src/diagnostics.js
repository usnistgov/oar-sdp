/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/diagnostics", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class is used to collect and then report warnings and errors that occur during the execution
     * of the tools.
     */
    var Diagnostics = /** @class */ (function () {
        function Diagnostics() {
            this.messages = [];
        }
        Object.defineProperty(Diagnostics.prototype, "hasErrors", {
            get: function () { return this.messages.some(function (m) { return m.type === 'error'; }); },
            enumerable: true,
            configurable: true
        });
        Diagnostics.prototype.warn = function (message) { this.messages.push({ type: 'warning', message: message }); };
        Diagnostics.prototype.error = function (message) { this.messages.push({ type: 'error', message: message }); };
        return Diagnostics;
    }());
    exports.Diagnostics = Diagnostics;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2RpYWdub3N0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBRUg7OztPQUdHO0lBQ0g7UUFBQTtZQUNXLGFBQVEsR0FBbUQsRUFBRSxDQUFDO1FBSXpFLENBQUM7UUFIQyxzQkFBSSxrQ0FBUztpQkFBYixjQUFrQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBQ3ZFLDBCQUFJLEdBQUosVUFBSyxPQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsMkJBQUssR0FBTCxVQUFNLE9BQWUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxrQkFBQztJQUFELENBQUMsQUFMRCxJQUtDO0lBTFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGNvbGxlY3QgYW5kIHRoZW4gcmVwb3J0IHdhcm5pbmdzIGFuZCBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIGV4ZWN1dGlvblxuICogb2YgdGhlIHRvb2xzLlxuICovXG5leHBvcnQgY2xhc3MgRGlhZ25vc3RpY3Mge1xuICByZWFkb25seSBtZXNzYWdlczoge3R5cGU6ICd3YXJuaW5nJyB8ICdlcnJvcicsIG1lc3NhZ2U6IHN0cmluZ31bXSA9IFtdO1xuICBnZXQgaGFzRXJyb3JzKCkgeyByZXR1cm4gdGhpcy5tZXNzYWdlcy5zb21lKG0gPT4gbS50eXBlID09PSAnZXJyb3InKTsgfVxuICB3YXJuKG1lc3NhZ2U6IHN0cmluZykgeyB0aGlzLm1lc3NhZ2VzLnB1c2goe3R5cGU6ICd3YXJuaW5nJywgbWVzc2FnZX0pOyB9XG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZykgeyB0aGlzLm1lc3NhZ2VzLnB1c2goe3R5cGU6ICdlcnJvcicsIG1lc3NhZ2V9KTsgfVxufVxuIl19