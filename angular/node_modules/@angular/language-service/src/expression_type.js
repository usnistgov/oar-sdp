/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
        define("@angular/language-service/src/expression_type", ["require", "exports", "tslib", "@angular/compiler", "@angular/language-service/src/diagnostic_messages", "@angular/language-service/src/symbols", "@angular/language-service/src/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AstType = void 0;
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var diagnostic_messages_1 = require("@angular/language-service/src/diagnostic_messages");
    var symbols_1 = require("@angular/language-service/src/symbols");
    var utils_1 = require("@angular/language-service/src/utils");
    // AstType calculatetype of the ast given AST element.
    var AstType = /** @class */ (function () {
        function AstType(scope, query, context, source) {
            this.scope = scope;
            this.query = query;
            this.context = context;
            this.source = source;
            this.diagnostics = [];
        }
        AstType.prototype.getType = function (ast) {
            return ast.visit(this);
        };
        AstType.prototype.getDiagnostics = function (ast) {
            var type = ast.visit(this);
            if (this.context.inEvent && type.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.callable_expression_expected_method_call));
            }
            return this.diagnostics;
        };
        AstType.prototype.visitUnary = function (ast) {
            // Visit the child to produce diagnostics.
            ast.expr.visit(this);
            // The unary plus and minus operator are always of type number.
            // https://github.com/Microsoft/TypeScript/blob/v1.8.10/doc/spec.md#4.18
            switch (ast.operator) {
                case '-':
                case '+':
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
            }
            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unrecognized_operator, ast.operator));
            return this.anyType;
        };
        AstType.prototype.visitBinary = function (ast) {
            var _this_1 = this;
            var getType = function (ast, operation) {
                var type = _this_1.getType(ast);
                if (type.nullable) {
                    switch (operation) {
                        case '&&':
                        case '||':
                        case '==':
                        case '!=':
                        case '===':
                        case '!==':
                            // Nullable allowed.
                            break;
                        default:
                            _this_1.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.expression_might_be_null));
                            break;
                    }
                }
                return type;
            };
            var leftType = getType(ast.left, ast.operation);
            var rightType = getType(ast.right, ast.operation);
            var leftKind = this.query.getTypeKind(leftType);
            var rightKind = this.query.getTypeKind(rightType);
            // The following swtich implements operator typing similar to the
            // type production tables in the TypeScript specification.
            // https://github.com/Microsoft/TypeScript/blob/v1.8.10/doc/spec.md#4.19
            var operKind = leftKind << 8 | rightKind;
            switch (ast.operation) {
                case '*':
                case '/':
                case '%':
                case '-':
                case '<<':
                case '>>':
                case '>>>':
                case '&':
                case '^':
                case '|':
                    switch (operKind) {
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Number:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        default:
                            var errorAst = ast.left;
                            switch (leftKind) {
                                case symbols_1.BuiltinType.Any:
                                case symbols_1.BuiltinType.Number:
                                    errorAst = ast.right;
                                    break;
                            }
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(errorAst.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                    }
                case '+':
                    switch (operKind) {
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Other:
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.Any:
                            return this.anyType;
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Other:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.String:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.String);
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Number:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.Number:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.left.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Other:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.right.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                        default:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.expected_a_string_or_number_type));
                            return this.anyType;
                    }
                case '>':
                case '<':
                case '<=':
                case '>=':
                case '==':
                case '!=':
                case '===':
                case '!==':
                    if (!(leftKind & rightKind) &&
                        !((leftKind | rightKind) & (symbols_1.BuiltinType.Null | symbols_1.BuiltinType.Undefined))) {
                        // Two values are comparable only if
                        //   - they have some type overlap, or
                        //   - at least one is not defined
                        this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.expected_operands_of_comparable_types_or_any));
                    }
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
                case '&&':
                    return rightType;
                case '||':
                    return this.query.getTypeUnion(leftType, rightType);
            }
            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unrecognized_operator, ast.operation));
            return this.anyType;
        };
        AstType.prototype.visitChain = function (ast) {
            var e_1, _a;
            try {
                // If we are producing diagnostics, visit the children
                for (var _b = tslib_1.__values(ast.expressions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var expr = _c.value;
                    expr.visit(this);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // The type of a chain is always undefined.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
        };
        AstType.prototype.visitConditional = function (ast) {
            // The type of a conditional is the union of the true and false conditions.
            ast.condition.visit(this);
            ast.trueExp.visit(this);
            ast.falseExp.visit(this);
            return this.query.getTypeUnion(this.getType(ast.trueExp), this.getType(ast.falseExp));
        };
        AstType.prototype.visitFunctionCall = function (ast) {
            var _this_1 = this;
            // The type of a function call is the return type of the selected signature.
            // The signature is selected based on the types of the arguments. Angular doesn't
            // support contextual typing of arguments so this is simpler than TypeScript's
            // version.
            var args = ast.args.map(function (arg) { return _this_1.getType(arg); });
            var target = this.getType(ast.target);
            if (!target || !target.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.call_target_not_callable, this.sourceOf(ast.target), target.name));
                return this.anyType;
            }
            var signature = target.selectSignature(args);
            if (signature) {
                return signature.result;
            }
            // TODO: Consider a better error message here. See `typescript_symbols#selectSignature` for more
            // details.
            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unable_to_resolve_compatible_call_signature));
            return this.anyType;
        };
        AstType.prototype.visitImplicitReceiver = function (_ast) {
            var _this = this;
            // Return a pseudo-symbol for the implicit receiver.
            // The members of the implicit receiver are what is defined by the
            // scope passed into this class.
            return {
                name: '$implicit',
                kind: 'component',
                language: 'ng-template',
                type: undefined,
                container: undefined,
                callable: false,
                nullable: false,
                public: true,
                definition: undefined,
                documentation: [],
                members: function () {
                    return _this.scope;
                },
                signatures: function () {
                    return [];
                },
                selectSignature: function (_types) {
                    return undefined;
                },
                indexed: function (_argument) {
                    return undefined;
                },
                typeArguments: function () {
                    return undefined;
                },
            };
        };
        AstType.prototype.visitInterpolation = function (ast) {
            var e_2, _a;
            try {
                // If we are producing diagnostics, visit the children.
                for (var _b = tslib_1.__values(ast.expressions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var expr = _c.value;
                    expr.visit(this);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return this.undefinedType;
        };
        AstType.prototype.visitKeyedRead = function (ast) {
            var targetType = this.getType(ast.obj);
            var keyType = this.getType(ast.key);
            var result = targetType.indexed(keyType, ast.key instanceof compiler_1.LiteralPrimitive ? ast.key.value : undefined);
            return result || this.anyType;
        };
        AstType.prototype.visitKeyedWrite = function (ast) {
            // The write of a type is the type of the value being written.
            return this.getType(ast.value);
        };
        AstType.prototype.visitLiteralArray = function (ast) {
            var _a;
            var _this_1 = this;
            // A type literal is an array type of the union of the elements
            return this.query.getArrayType((_a = this.query).getTypeUnion.apply(_a, tslib_1.__spread(ast.expressions.map(function (element) { return _this_1.getType(element); }))));
        };
        AstType.prototype.visitLiteralMap = function (ast) {
            var e_3, _a;
            try {
                // If we are producing diagnostics, visit the children
                for (var _b = tslib_1.__values(ast.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    value.visit(this);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // TODO: Return a composite type.
            return this.anyType;
        };
        AstType.prototype.visitLiteralPrimitive = function (ast) {
            // The type of a literal primitive depends on the value of the literal.
            switch (ast.value) {
                case true:
                case false:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
                case null:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Null);
                case undefined:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
                default:
                    switch (typeof ast.value) {
                        case 'string':
                            return this.query.getBuiltinType(symbols_1.BuiltinType.String);
                        case 'number':
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        default:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unrecognized_primitive, typeof ast.value));
                            return this.anyType;
                    }
            }
        };
        AstType.prototype.visitMethodCall = function (ast) {
            return this.resolveMethodCall(this.getType(ast.receiver), ast);
        };
        AstType.prototype.visitPipe = function (ast) {
            var _this_1 = this;
            // The type of a pipe node is the return type of the pipe's transform method. The table returned
            // by getPipes() is expected to contain symbols with the corresponding transform method type.
            var pipe = this.query.getPipes().get(ast.name);
            if (!pipe) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.no_pipe_found, ast.name));
                return this.anyType;
            }
            var expType = this.getType(ast.exp);
            var signature = pipe.selectSignature([expType].concat(ast.args.map(function (arg) { return _this_1.getType(arg); })));
            if (!signature) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unable_to_resolve_signature, ast.name));
                return this.anyType;
            }
            return signature.result;
        };
        AstType.prototype.visitPrefixNot = function (ast) {
            // If we are producing diagnostics, visit the children
            ast.expression.visit(this);
            // The type of a prefix ! is always boolean.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
        };
        AstType.prototype.visitNonNullAssert = function (ast) {
            var expressionType = this.getType(ast.expression);
            return this.query.getNonNullableType(expressionType);
        };
        AstType.prototype.visitPropertyRead = function (ast) {
            return this.resolvePropertyRead(this.getType(ast.receiver), ast);
        };
        AstType.prototype.visitPropertyWrite = function (ast) {
            // The type of a write is the type of the value being written.
            return this.getType(ast.value);
        };
        AstType.prototype.visitQuote = function (_ast) {
            // The type of a quoted expression is any.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Any);
        };
        AstType.prototype.visitSafeMethodCall = function (ast) {
            return this.resolveMethodCall(this.query.getNonNullableType(this.getType(ast.receiver)), ast);
        };
        AstType.prototype.visitSafePropertyRead = function (ast) {
            return this.resolvePropertyRead(this.query.getNonNullableType(this.getType(ast.receiver)), ast);
        };
        /**
         * Gets the source of an expession AST.
         * The AST's sourceSpan is relative to the start of the template source code, which is contained
         * at this.source.
         */
        AstType.prototype.sourceOf = function (ast) {
            return this.source.substring(ast.sourceSpan.start, ast.sourceSpan.end);
        };
        Object.defineProperty(AstType.prototype, "anyType", {
            get: function () {
                var result = this._anyType;
                if (!result) {
                    result = this._anyType = this.query.getBuiltinType(symbols_1.BuiltinType.Any);
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AstType.prototype, "undefinedType", {
            get: function () {
                var result = this._undefinedType;
                if (!result) {
                    result = this._undefinedType = this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        AstType.prototype.resolveMethodCall = function (receiverType, ast) {
            var _this_1 = this;
            if (this.isAny(receiverType)) {
                return this.anyType;
            }
            var methodType = this.resolvePropertyRead(receiverType, ast);
            if (!methodType) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.could_not_resolve_type, ast.name));
                return this.anyType;
            }
            if (this.isAny(methodType)) {
                return this.anyType;
            }
            if (!methodType.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.identifier_not_callable, ast.name));
                return this.anyType;
            }
            var signature = methodType.selectSignature(ast.args.map(function (arg) { return _this_1.getType(arg); }));
            if (!signature) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.unable_to_resolve_signature, ast.name));
                return this.anyType;
            }
            return signature.result;
        };
        AstType.prototype.resolvePropertyRead = function (receiverType, ast) {
            if (this.isAny(receiverType)) {
                return this.anyType;
            }
            // The type of a property read is the seelcted member's type.
            var member = receiverType.members().get(ast.name);
            if (!member) {
                if (receiverType.name === '$implicit') {
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.identifier_not_defined_in_app_context, ast.name));
                }
                else if (receiverType.nullable && ast.receiver instanceof compiler_1.PropertyRead) {
                    var receiver = ast.receiver.name;
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.identifier_possibly_undefined, receiver, receiver + "?." + ast.name, receiver + "!." + ast.name));
                }
                else {
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.identifier_not_defined_on_receiver, ast.name, receiverType.name));
                }
                return this.anyType;
            }
            if (!member.public) {
                var container = receiverType.name === '$implicit' ? 'the component' : "'" + receiverType.name + "'";
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(refinedSpan(ast), diagnostic_messages_1.Diagnostic.identifier_is_private, ast.name, container));
            }
            return member.type;
        };
        AstType.prototype.isAny = function (symbol) {
            return !symbol || this.query.getTypeKind(symbol) === symbols_1.BuiltinType.Any ||
                (!!symbol.type && this.isAny(symbol.type));
        };
        return AstType;
    }());
    exports.AstType = AstType;
    function refinedSpan(ast) {
        // nameSpan is an absolute span, but the spans returned by the expression visitor are expected to
        // be relative to the start of the expression.
        // TODO: migrate to only using absolute spans
        var absoluteOffset = ast.sourceSpan.start - ast.span.start;
        if (ast instanceof compiler_1.ASTWithName) {
            return utils_1.offsetSpan(ast.nameSpan, -absoluteOffset);
        }
        return utils_1.offsetSpan(ast.sourceSpan, -absoluteOffset);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbl90eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGFuZ3VhZ2Utc2VydmljZS9zcmMvZXhwcmVzc2lvbl90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7SUFFSCw4Q0FBNlU7SUFFN1UseUZBQW1FO0lBQ25FLGlFQUFtRjtJQUVuRiw2REFBbUM7SUFNbkMsc0RBQXNEO0lBQ3REO1FBR0UsaUJBQ1ksS0FBa0IsRUFBVSxLQUFrQixFQUM5QyxPQUFxQyxFQUFVLE1BQWM7WUFEN0QsVUFBSyxHQUFMLEtBQUssQ0FBYTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7WUFDOUMsWUFBTyxHQUFQLE9BQU8sQ0FBOEI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBSnhELGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUl5QixDQUFDO1FBRTdFLHlCQUFPLEdBQVAsVUFBUSxHQUFRO1lBQ2QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxnQ0FBYyxHQUFkLFVBQWUsR0FBUTtZQUNyQixJQUFNLElBQUksR0FBVyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLHNDQUFnQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxnQ0FBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQzthQUM5RjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO1FBRUQsNEJBQVUsR0FBVixVQUFXLEdBQVU7WUFDbkIsMENBQTBDO1lBQzFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FB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LENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBU1QsIEFzdFZpc2l0b3IsIEFTVFdpdGhOYW1lLCBCaW5hcnksIEJpbmRpbmdQaXBlLCBDaGFpbiwgQ29uZGl0aW9uYWwsIEZ1bmN0aW9uQ2FsbCwgSW1wbGljaXRSZWNlaXZlciwgSW50ZXJwb2xhdGlvbiwgS2V5ZWRSZWFkLCBLZXllZFdyaXRlLCBMaXRlcmFsQXJyYXksIExpdGVyYWxNYXAsIExpdGVyYWxQcmltaXRpdmUsIE1ldGhvZENhbGwsIE5vbk51bGxBc3NlcnQsIFByZWZpeE5vdCwgUHJvcGVydHlSZWFkLCBQcm9wZXJ0eVdyaXRlLCBRdW90ZSwgU2FmZU1ldGhvZENhbGwsIFNhZmVQcm9wZXJ0eVJlYWQsIFVuYXJ5fSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5cbmltcG9ydCB7Y3JlYXRlRGlhZ25vc3RpYywgRGlhZ25vc3RpY30gZnJvbSAnLi9kaWFnbm9zdGljX21lc3NhZ2VzJztcbmltcG9ydCB7QnVpbHRpblR5cGUsIFNpZ25hdHVyZSwgU3ltYm9sLCBTeW1ib2xRdWVyeSwgU3ltYm9sVGFibGV9IGZyb20gJy4vc3ltYm9scyc7XG5pbXBvcnQgKiBhcyBuZyBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7b2Zmc2V0U3Bhbn0gZnJvbSAnLi91dGlscyc7XG5cbmludGVyZmFjZSBFeHByZXNzaW9uRGlhZ25vc3RpY3NDb250ZXh0IHtcbiAgaW5FdmVudD86IGJvb2xlYW47XG59XG5cbi8vIEFzdFR5cGUgY2FsY3VsYXRldHlwZSBvZiB0aGUgYXN0IGdpdmVuIEFTVCBlbGVtZW50LlxuZXhwb3J0IGNsYXNzIEFzdFR5cGUgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBkaWFnbm9zdGljczogbmcuRGlhZ25vc3RpY1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHNjb3BlOiBTeW1ib2xUYWJsZSwgcHJpdmF0ZSBxdWVyeTogU3ltYm9sUXVlcnksXG4gICAgICBwcml2YXRlIGNvbnRleHQ6IEV4cHJlc3Npb25EaWFnbm9zdGljc0NvbnRleHQsIHByaXZhdGUgc291cmNlOiBzdHJpbmcpIHt9XG5cbiAgZ2V0VHlwZShhc3Q6IEFTVCk6IFN5bWJvbCB7XG4gICAgcmV0dXJuIGFzdC52aXNpdCh0aGlzKTtcbiAgfVxuXG4gIGdldERpYWdub3N0aWNzKGFzdDogQVNUKTogbmcuRGlhZ25vc3RpY1tdIHtcbiAgICBjb25zdCB0eXBlOiBTeW1ib2wgPSBhc3QudmlzaXQodGhpcyk7XG4gICAgaWYgKHRoaXMuY29udGV4dC5pbkV2ZW50ICYmIHR5cGUuY2FsbGFibGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMuY2FsbGFibGVfZXhwcmVzc2lvbl9leHBlY3RlZF9tZXRob2RfY2FsbCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaWFnbm9zdGljcztcbiAgfVxuXG4gIHZpc2l0VW5hcnkoYXN0OiBVbmFyeSk6IFN5bWJvbCB7XG4gICAgLy8gVmlzaXQgdGhlIGNoaWxkIHRvIHByb2R1Y2UgZGlhZ25vc3RpY3MuXG4gICAgYXN0LmV4cHIudmlzaXQodGhpcyk7XG5cbiAgICAvLyBUaGUgdW5hcnkgcGx1cyBhbmQgbWludXMgb3BlcmF0b3IgYXJlIGFsd2F5cyBvZiB0eXBlIG51bWJlci5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvYmxvYi92MS44LjEwL2RvYy9zcGVjLm1kIzQuMThcbiAgICBzd2l0Y2ggKGFzdC5vcGVyYXRvcikge1xuICAgICAgY2FzZSAnLSc6XG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuTnVtYmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgIGNyZWF0ZURpYWdub3N0aWMocmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy51bnJlY29nbml6ZWRfb3BlcmF0b3IsIGFzdC5vcGVyYXRvcikpO1xuICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gIH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSk6IFN5bWJvbCB7XG4gICAgY29uc3QgZ2V0VHlwZSA9IChhc3Q6IEFTVCwgb3BlcmF0aW9uOiBzdHJpbmcpOiBTeW1ib2wgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0VHlwZShhc3QpO1xuICAgICAgaWYgKHR5cGUubnVsbGFibGUpIHtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcbiAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgY2FzZSAnfHwnOlxuICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgICBjYXNlICchPT0nOlxuICAgICAgICAgICAgLy8gTnVsbGFibGUgYWxsb3dlZC5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhyZWZpbmVkU3Bhbihhc3QpLCBEaWFnbm9zdGljLmV4cHJlc3Npb25fbWlnaHRfYmVfbnVsbCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH07XG5cbiAgICBjb25zdCBsZWZ0VHlwZSA9IGdldFR5cGUoYXN0LmxlZnQsIGFzdC5vcGVyYXRpb24pO1xuICAgIGNvbnN0IHJpZ2h0VHlwZSA9IGdldFR5cGUoYXN0LnJpZ2h0LCBhc3Qub3BlcmF0aW9uKTtcbiAgICBjb25zdCBsZWZ0S2luZCA9IHRoaXMucXVlcnkuZ2V0VHlwZUtpbmQobGVmdFR5cGUpO1xuICAgIGNvbnN0IHJpZ2h0S2luZCA9IHRoaXMucXVlcnkuZ2V0VHlwZUtpbmQocmlnaHRUeXBlKTtcblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgc3d0aWNoIGltcGxlbWVudHMgb3BlcmF0b3IgdHlwaW5nIHNpbWlsYXIgdG8gdGhlXG4gICAgLy8gdHlwZSBwcm9kdWN0aW9uIHRhYmxlcyBpbiB0aGUgVHlwZVNjcmlwdCBzcGVjaWZpY2F0aW9uLlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL3YxLjguMTAvZG9jL3NwZWMubWQjNC4xOVxuICAgIGNvbnN0IG9wZXJLaW5kID0gbGVmdEtpbmQgPDwgOCB8IHJpZ2h0S2luZDtcbiAgICBzd2l0Y2ggKGFzdC5vcGVyYXRpb24pIHtcbiAgICAgIGNhc2UgJyonOlxuICAgICAgY2FzZSAnLyc6XG4gICAgICBjYXNlICclJzpcbiAgICAgIGNhc2UgJy0nOlxuICAgICAgY2FzZSAnPDwnOlxuICAgICAgY2FzZSAnPj4nOlxuICAgICAgY2FzZSAnPj4+JzpcbiAgICAgIGNhc2UgJyYnOlxuICAgICAgY2FzZSAnXic6XG4gICAgICBjYXNlICd8JzpcbiAgICAgICAgc3dpdGNoIChvcGVyS2luZCkge1xuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55IDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLkFueTpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkFueSA8PCA4IHwgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5OdW1iZXI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5OdW1iZXIpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBsZXQgZXJyb3JBc3QgPSBhc3QubGVmdDtcbiAgICAgICAgICAgIHN3aXRjaCAobGVmdEtpbmQpIHtcbiAgICAgICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgICAgICAgIGVycm9yQXN0ID0gYXN0LnJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoZXJyb3JBc3Quc3BhbiwgRGlhZ25vc3RpYy5leHBlY3RlZF9hX251bWJlcl90eXBlKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgICAgICB9XG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgc3dpdGNoIChvcGVyS2luZCkge1xuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55IDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5BbnkgPDwgOCB8IEJ1aWx0aW5UeXBlLkJvb2xlYW46XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5BbnkgPDwgOCB8IEJ1aWx0aW5UeXBlLk51bWJlcjpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkFueSA8PCA4IHwgQnVpbHRpblR5cGUuT3RoZXI6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5Cb29sZWFuIDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLkFueTpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLk90aGVyIDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55IDw8IDggfCBCdWlsdGluVHlwZS5TdHJpbmc6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5Cb29sZWFuIDw8IDggfCBCdWlsdGluVHlwZS5TdHJpbmc6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLlN0cmluZzpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLlN0cmluZyA8PCA4IHwgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuU3RyaW5nIDw8IDggfCBCdWlsdGluVHlwZS5Cb29sZWFuOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuU3RyaW5nIDw8IDggfCBCdWlsdGluVHlwZS5OdW1iZXI6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5TdHJpbmcgPDwgOCB8IEJ1aWx0aW5UeXBlLlN0cmluZzpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLlN0cmluZyA8PCA4IHwgQnVpbHRpblR5cGUuT3RoZXI6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5PdGhlciA8PCA4IHwgQnVpbHRpblR5cGUuU3RyaW5nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuU3RyaW5nKTtcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLk51bWJlciA8PCA4IHwgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuTnVtYmVyKTtcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkJvb2xlYW4gPDwgOCB8IEJ1aWx0aW5UeXBlLk51bWJlcjpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLk90aGVyIDw8IDggfCBCdWlsdGluVHlwZS5OdW1iZXI6XG4gICAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhhc3QubGVmdC5zcGFuLCBEaWFnbm9zdGljLmV4cGVjdGVkX2FfbnVtYmVyX3R5cGUpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLkJvb2xlYW46XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLk90aGVyOlxuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoYXN0LnJpZ2h0LnNwYW4sIERpYWdub3N0aWMuZXhwZWN0ZWRfYV9udW1iZXJfdHlwZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMocmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5leHBlY3RlZF9hX3N0cmluZ19vcl9udW1iZXJfdHlwZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICAgICAgfVxuICAgICAgY2FzZSAnPic6XG4gICAgICBjYXNlICc8JzpcbiAgICAgIGNhc2UgJzw9JzpcbiAgICAgIGNhc2UgJz49JzpcbiAgICAgIGNhc2UgJz09JzpcbiAgICAgIGNhc2UgJyE9JzpcbiAgICAgIGNhc2UgJz09PSc6XG4gICAgICBjYXNlICchPT0nOlxuICAgICAgICBpZiAoIShsZWZ0S2luZCAmIHJpZ2h0S2luZCkgJiZcbiAgICAgICAgICAgICEoKGxlZnRLaW5kIHwgcmlnaHRLaW5kKSAmIChCdWlsdGluVHlwZS5OdWxsIHwgQnVpbHRpblR5cGUuVW5kZWZpbmVkKSkpIHtcbiAgICAgICAgICAvLyBUd28gdmFsdWVzIGFyZSBjb21wYXJhYmxlIG9ubHkgaWZcbiAgICAgICAgICAvLyAgIC0gdGhleSBoYXZlIHNvbWUgdHlwZSBvdmVybGFwLCBvclxuICAgICAgICAgIC8vICAgLSBhdCBsZWFzdCBvbmUgaXMgbm90IGRlZmluZWRcbiAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goY3JlYXRlRGlhZ25vc3RpYyhcbiAgICAgICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5leHBlY3RlZF9vcGVyYW5kc19vZl9jb21wYXJhYmxlX3R5cGVzX29yX2FueSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLkJvb2xlYW4pO1xuICAgICAgY2FzZSAnJiYnOlxuICAgICAgICByZXR1cm4gcmlnaHRUeXBlO1xuICAgICAgY2FzZSAnfHwnOlxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRUeXBlVW5pb24obGVmdFR5cGUsIHJpZ2h0VHlwZSk7XG4gICAgfVxuXG4gICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICBjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMudW5yZWNvZ25pemVkX29wZXJhdG9yLCBhc3Qub3BlcmF0aW9uKSk7XG4gICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgfVxuXG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbikge1xuICAgIC8vIElmIHdlIGFyZSBwcm9kdWNpbmcgZGlhZ25vc3RpY3MsIHZpc2l0IHRoZSBjaGlsZHJlblxuICAgIGZvciAoY29uc3QgZXhwciBvZiBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIGV4cHIudmlzaXQodGhpcyk7XG4gICAgfVxuICAgIC8vIFRoZSB0eXBlIG9mIGEgY2hhaW4gaXMgYWx3YXlzIHVuZGVmaW5lZC5cbiAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5VbmRlZmluZWQpO1xuICB9XG5cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsKSB7XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBjb25kaXRpb25hbCBpcyB0aGUgdW5pb24gb2YgdGhlIHRydWUgYW5kIGZhbHNlIGNvbmRpdGlvbnMuXG4gICAgYXN0LmNvbmRpdGlvbi52aXNpdCh0aGlzKTtcbiAgICBhc3QudHJ1ZUV4cC52aXNpdCh0aGlzKTtcbiAgICBhc3QuZmFsc2VFeHAudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0VHlwZVVuaW9uKHRoaXMuZ2V0VHlwZShhc3QudHJ1ZUV4cCksIHRoaXMuZ2V0VHlwZShhc3QuZmFsc2VFeHApKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsKSB7XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBmdW5jdGlvbiBjYWxsIGlzIHRoZSByZXR1cm4gdHlwZSBvZiB0aGUgc2VsZWN0ZWQgc2lnbmF0dXJlLlxuICAgIC8vIFRoZSBzaWduYXR1cmUgaXMgc2VsZWN0ZWQgYmFzZWQgb24gdGhlIHR5cGVzIG9mIHRoZSBhcmd1bWVudHMuIEFuZ3VsYXIgZG9lc24ndFxuICAgIC8vIHN1cHBvcnQgY29udGV4dHVhbCB0eXBpbmcgb2YgYXJndW1lbnRzIHNvIHRoaXMgaXMgc2ltcGxlciB0aGFuIFR5cGVTY3JpcHQnc1xuICAgIC8vIHZlcnNpb24uXG4gICAgY29uc3QgYXJncyA9IGFzdC5hcmdzLm1hcChhcmcgPT4gdGhpcy5nZXRUeXBlKGFyZykpO1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0VHlwZShhc3QudGFyZ2V0ISk7XG4gICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5jYWxsYWJsZSkge1xuICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKGNyZWF0ZURpYWdub3N0aWMoXG4gICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5jYWxsX3RhcmdldF9ub3RfY2FsbGFibGUsIHRoaXMuc291cmNlT2YoYXN0LnRhcmdldCEpLFxuICAgICAgICAgIHRhcmdldC5uYW1lKSk7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBjb25zdCBzaWduYXR1cmUgPSB0YXJnZXQuc2VsZWN0U2lnbmF0dXJlKGFyZ3MpO1xuICAgIGlmIChzaWduYXR1cmUpIHtcbiAgICAgIHJldHVybiBzaWduYXR1cmUucmVzdWx0O1xuICAgIH1cbiAgICAvLyBUT0RPOiBDb25zaWRlciBhIGJldHRlciBlcnJvciBtZXNzYWdlIGhlcmUuIFNlZSBgdHlwZXNjcmlwdF9zeW1ib2xzI3NlbGVjdFNpZ25hdHVyZWAgZm9yIG1vcmVcbiAgICAvLyBkZXRhaWxzLlxuICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhyZWZpbmVkU3Bhbihhc3QpLCBEaWFnbm9zdGljLnVuYWJsZV90b19yZXNvbHZlX2NvbXBhdGlibGVfY2FsbF9zaWduYXR1cmUpKTtcbiAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICB9XG5cbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKF9hc3Q6IEltcGxpY2l0UmVjZWl2ZXIpOiBTeW1ib2wge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAvLyBSZXR1cm4gYSBwc2V1ZG8tc3ltYm9sIGZvciB0aGUgaW1wbGljaXQgcmVjZWl2ZXIuXG4gICAgLy8gVGhlIG1lbWJlcnMgb2YgdGhlIGltcGxpY2l0IHJlY2VpdmVyIGFyZSB3aGF0IGlzIGRlZmluZWQgYnkgdGhlXG4gICAgLy8gc2NvcGUgcGFzc2VkIGludG8gdGhpcyBjbGFzcy5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJyRpbXBsaWNpdCcsXG4gICAgICBraW5kOiAnY29tcG9uZW50JyxcbiAgICAgIGxhbmd1YWdlOiAnbmctdGVtcGxhdGUnLFxuICAgICAgdHlwZTogdW5kZWZpbmVkLFxuICAgICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG4gICAgICBjYWxsYWJsZTogZmFsc2UsXG4gICAgICBudWxsYWJsZTogZmFsc2UsXG4gICAgICBwdWJsaWM6IHRydWUsXG4gICAgICBkZWZpbml0aW9uOiB1bmRlZmluZWQsXG4gICAgICBkb2N1bWVudGF0aW9uOiBbXSxcbiAgICAgIG1lbWJlcnMoKTogU3ltYm9sVGFibGUge1xuICAgICAgICByZXR1cm4gX3RoaXMuc2NvcGU7XG4gICAgICB9LFxuICAgICAgc2lnbmF0dXJlcygpOiBTaWduYXR1cmVbXSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RTaWduYXR1cmUoX3R5cGVzKTogU2lnbmF0dXJlIHxcbiAgICAgICAgICB1bmRlZmluZWQge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgaW5kZXhlZChfYXJndW1lbnQpOiBTeW1ib2wgfFxuICAgICAgICAgIHVuZGVmaW5lZCB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0sXG4gICAgICB0eXBlQXJndW1lbnRzKCk6IFN5bWJvbFtdIHxcbiAgICAgICAgICB1bmRlZmluZWQge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgIH07XG4gIH1cblxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uKTogU3ltYm9sIHtcbiAgICAvLyBJZiB3ZSBhcmUgcHJvZHVjaW5nIGRpYWdub3N0aWNzLCB2aXNpdCB0aGUgY2hpbGRyZW4uXG4gICAgZm9yIChjb25zdCBleHByIG9mIGFzdC5leHByZXNzaW9ucykge1xuICAgICAgZXhwci52aXNpdCh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudW5kZWZpbmVkVHlwZTtcbiAgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkKTogU3ltYm9sIHtcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdGhpcy5nZXRUeXBlKGFzdC5vYmopO1xuICAgIGNvbnN0IGtleVR5cGUgPSB0aGlzLmdldFR5cGUoYXN0LmtleSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0VHlwZS5pbmRleGVkKFxuICAgICAgICBrZXlUeXBlLCBhc3Qua2V5IGluc3RhbmNlb2YgTGl0ZXJhbFByaW1pdGl2ZSA/IGFzdC5rZXkudmFsdWUgOiB1bmRlZmluZWQpO1xuICAgIHJldHVybiByZXN1bHQgfHwgdGhpcy5hbnlUeXBlO1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSk6IFN5bWJvbCB7XG4gICAgLy8gVGhlIHdyaXRlIG9mIGEgdHlwZSBpcyB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgYmVpbmcgd3JpdHRlbi5cbiAgICByZXR1cm4gdGhpcy5nZXRUeXBlKGFzdC52YWx1ZSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSk6IFN5bWJvbCB7XG4gICAgLy8gQSB0eXBlIGxpdGVyYWwgaXMgYW4gYXJyYXkgdHlwZSBvZiB0aGUgdW5pb24gb2YgdGhlIGVsZW1lbnRzXG4gICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QXJyYXlUeXBlKFxuICAgICAgICB0aGlzLnF1ZXJ5LmdldFR5cGVVbmlvbiguLi5hc3QuZXhwcmVzc2lvbnMubWFwKGVsZW1lbnQgPT4gdGhpcy5nZXRUeXBlKGVsZW1lbnQpKSkpO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCk6IFN5bWJvbCB7XG4gICAgLy8gSWYgd2UgYXJlIHByb2R1Y2luZyBkaWFnbm9zdGljcywgdmlzaXQgdGhlIGNoaWxkcmVuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBhc3QudmFsdWVzKSB7XG4gICAgICB2YWx1ZS52aXNpdCh0aGlzKTtcbiAgICB9XG4gICAgLy8gVE9ETzogUmV0dXJuIGEgY29tcG9zaXRlIHR5cGUuXG4gICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUpIHtcbiAgICAvLyBUaGUgdHlwZSBvZiBhIGxpdGVyYWwgcHJpbWl0aXZlIGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIHRoZSBsaXRlcmFsLlxuICAgIHN3aXRjaCAoYXN0LnZhbHVlKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5Cb29sZWFuKTtcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuTnVsbCk7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuVW5kZWZpbmVkKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGFzdC52YWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5TdHJpbmcpO1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5OdW1iZXIpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goY3JlYXRlRGlhZ25vc3RpYyhcbiAgICAgICAgICAgICAgICByZWZpbmVkU3Bhbihhc3QpLCBEaWFnbm9zdGljLnVucmVjb2duaXplZF9wcmltaXRpdmUsIHR5cGVvZiBhc3QudmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZU1ldGhvZENhbGwodGhpcy5nZXRUeXBlKGFzdC5yZWNlaXZlciksIGFzdCk7XG4gIH1cblxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSkge1xuICAgIC8vIFRoZSB0eXBlIG9mIGEgcGlwZSBub2RlIGlzIHRoZSByZXR1cm4gdHlwZSBvZiB0aGUgcGlwZSdzIHRyYW5zZm9ybSBtZXRob2QuIFRoZSB0YWJsZSByZXR1cm5lZFxuICAgIC8vIGJ5IGdldFBpcGVzKCkgaXMgZXhwZWN0ZWQgdG8gY29udGFpbiBzeW1ib2xzIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgdHJhbnNmb3JtIG1ldGhvZCB0eXBlLlxuICAgIGNvbnN0IHBpcGUgPSB0aGlzLnF1ZXJ5LmdldFBpcGVzKCkuZ2V0KGFzdC5uYW1lKTtcbiAgICBpZiAoIXBpcGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMubm9fcGlwZV9mb3VuZCwgYXN0Lm5hbWUpKTtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIGNvbnN0IGV4cFR5cGUgPSB0aGlzLmdldFR5cGUoYXN0LmV4cCk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID1cbiAgICAgICAgcGlwZS5zZWxlY3RTaWduYXR1cmUoW2V4cFR5cGVdLmNvbmNhdChhc3QuYXJncy5tYXAoYXJnID0+IHRoaXMuZ2V0VHlwZShhcmcpKSkpO1xuICAgIGlmICghc2lnbmF0dXJlKSB7XG4gICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhyZWZpbmVkU3Bhbihhc3QpLCBEaWFnbm9zdGljLnVuYWJsZV90b19yZXNvbHZlX3NpZ25hdHVyZSwgYXN0Lm5hbWUpKTtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIHJldHVybiBzaWduYXR1cmUucmVzdWx0O1xuICB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QpIHtcbiAgICAvLyBJZiB3ZSBhcmUgcHJvZHVjaW5nIGRpYWdub3N0aWNzLCB2aXNpdCB0aGUgY2hpbGRyZW5cbiAgICBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKTtcbiAgICAvLyBUaGUgdHlwZSBvZiBhIHByZWZpeCAhIGlzIGFsd2F5cyBib29sZWFuLlxuICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLkJvb2xlYW4pO1xuICB9XG5cbiAgdmlzaXROb25OdWxsQXNzZXJ0KGFzdDogTm9uTnVsbEFzc2VydCkge1xuICAgIGNvbnN0IGV4cHJlc3Npb25UeXBlID0gdGhpcy5nZXRUeXBlKGFzdC5leHByZXNzaW9uKTtcbiAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXROb25OdWxsYWJsZVR5cGUoZXhwcmVzc2lvblR5cGUpO1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlUHJvcGVydHlSZWFkKHRoaXMuZ2V0VHlwZShhc3QucmVjZWl2ZXIpLCBhc3QpO1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSkge1xuICAgIC8vIFRoZSB0eXBlIG9mIGEgd3JpdGUgaXMgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIGJlaW5nIHdyaXR0ZW4uXG4gICAgcmV0dXJuIHRoaXMuZ2V0VHlwZShhc3QudmFsdWUpO1xuICB9XG5cbiAgdmlzaXRRdW90ZShfYXN0OiBRdW90ZSkge1xuICAgIC8vIFRoZSB0eXBlIG9mIGEgcXVvdGVkIGV4cHJlc3Npb24gaXMgYW55LlxuICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLkFueSk7XG4gIH1cblxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlTWV0aG9kQ2FsbCh0aGlzLnF1ZXJ5LmdldE5vbk51bGxhYmxlVHlwZSh0aGlzLmdldFR5cGUoYXN0LnJlY2VpdmVyKSksIGFzdCk7XG4gIH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZVByb3BlcnR5UmVhZCh0aGlzLnF1ZXJ5LmdldE5vbk51bGxhYmxlVHlwZSh0aGlzLmdldFR5cGUoYXN0LnJlY2VpdmVyKSksIGFzdCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc291cmNlIG9mIGFuIGV4cGVzc2lvbiBBU1QuXG4gICAqIFRoZSBBU1QncyBzb3VyY2VTcGFuIGlzIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgdGVtcGxhdGUgc291cmNlIGNvZGUsIHdoaWNoIGlzIGNvbnRhaW5lZFxuICAgKiBhdCB0aGlzLnNvdXJjZS5cbiAgICovXG4gIHByaXZhdGUgc291cmNlT2YoYXN0OiBBU1QpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZS5zdWJzdHJpbmcoYXN0LnNvdXJjZVNwYW4uc3RhcnQsIGFzdC5zb3VyY2VTcGFuLmVuZCk7XG4gIH1cblxuICBwcml2YXRlIF9hbnlUeXBlOiBTeW1ib2x8dW5kZWZpbmVkO1xuICBwcml2YXRlIGdldCBhbnlUeXBlKCk6IFN5bWJvbCB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FueVR5cGU7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2FueVR5cGUgPSB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLkFueSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF91bmRlZmluZWRUeXBlOiBTeW1ib2x8dW5kZWZpbmVkO1xuICBwcml2YXRlIGdldCB1bmRlZmluZWRUeXBlKCk6IFN5bWJvbCB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX3VuZGVmaW5lZFR5cGU7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3VuZGVmaW5lZFR5cGUgPSB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLlVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVNZXRob2RDYWxsKHJlY2VpdmVyVHlwZTogU3ltYm9sLCBhc3Q6IFNhZmVNZXRob2RDYWxsfE1ldGhvZENhbGwpIHtcbiAgICBpZiAodGhpcy5pc0FueShyZWNlaXZlclR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBjb25zdCBtZXRob2RUeXBlID0gdGhpcy5yZXNvbHZlUHJvcGVydHlSZWFkKHJlY2VpdmVyVHlwZSwgYXN0KTtcbiAgICBpZiAoIW1ldGhvZFR5cGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMuY291bGRfbm90X3Jlc29sdmVfdHlwZSwgYXN0Lm5hbWUpKTtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQW55KG1ldGhvZFR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBpZiAoIW1ldGhvZFR5cGUuY2FsbGFibGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMuaWRlbnRpZmllcl9ub3RfY2FsbGFibGUsIGFzdC5uYW1lKSk7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBjb25zdCBzaWduYXR1cmUgPSBtZXRob2RUeXBlLnNlbGVjdFNpZ25hdHVyZShhc3QuYXJncy5tYXAoYXJnID0+IHRoaXMuZ2V0VHlwZShhcmcpKSk7XG4gICAgaWYgKCFzaWduYXR1cmUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKHJlZmluZWRTcGFuKGFzdCksIERpYWdub3N0aWMudW5hYmxlX3RvX3Jlc29sdmVfc2lnbmF0dXJlLCBhc3QubmFtZSkpO1xuICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIHNpZ25hdHVyZS5yZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVQcm9wZXJ0eVJlYWQocmVjZWl2ZXJUeXBlOiBTeW1ib2wsIGFzdDogU2FmZVByb3BlcnR5UmVhZHxQcm9wZXJ0eVJlYWQpIHtcbiAgICBpZiAodGhpcy5pc0FueShyZWNlaXZlclR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICAvLyBUaGUgdHlwZSBvZiBhIHByb3BlcnR5IHJlYWQgaXMgdGhlIHNlZWxjdGVkIG1lbWJlcidzIHR5cGUuXG4gICAgY29uc3QgbWVtYmVyID0gcmVjZWl2ZXJUeXBlLm1lbWJlcnMoKS5nZXQoYXN0Lm5hbWUpO1xuICAgIGlmICghbWVtYmVyKSB7XG4gICAgICBpZiAocmVjZWl2ZXJUeXBlLm5hbWUgPT09ICckaW1wbGljaXQnKSB7XG4gICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5pZGVudGlmaWVyX25vdF9kZWZpbmVkX2luX2FwcF9jb250ZXh0LCBhc3QubmFtZSkpO1xuICAgICAgfSBlbHNlIGlmIChyZWNlaXZlclR5cGUubnVsbGFibGUgJiYgYXN0LnJlY2VpdmVyIGluc3RhbmNlb2YgUHJvcGVydHlSZWFkKSB7XG4gICAgICAgIGNvbnN0IHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLm5hbWU7XG4gICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5pZGVudGlmaWVyX3Bvc3NpYmx5X3VuZGVmaW5lZCwgcmVjZWl2ZXIsXG4gICAgICAgICAgICBgJHtyZWNlaXZlcn0/LiR7YXN0Lm5hbWV9YCwgYCR7cmVjZWl2ZXJ9IS4ke2FzdC5uYW1lfWApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5pZGVudGlmaWVyX25vdF9kZWZpbmVkX29uX3JlY2VpdmVyLCBhc3QubmFtZSxcbiAgICAgICAgICAgIHJlY2VpdmVyVHlwZS5uYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBpZiAoIW1lbWJlci5wdWJsaWMpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9XG4gICAgICAgICAgcmVjZWl2ZXJUeXBlLm5hbWUgPT09ICckaW1wbGljaXQnID8gJ3RoZSBjb21wb25lbnQnIDogYCcke3JlY2VpdmVyVHlwZS5uYW1lfSdgO1xuICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKGNyZWF0ZURpYWdub3N0aWMoXG4gICAgICAgICAgcmVmaW5lZFNwYW4oYXN0KSwgRGlhZ25vc3RpYy5pZGVudGlmaWVyX2lzX3ByaXZhdGUsIGFzdC5uYW1lLCBjb250YWluZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbWJlci50eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FueShzeW1ib2w6IFN5bWJvbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhc3ltYm9sIHx8IHRoaXMucXVlcnkuZ2V0VHlwZUtpbmQoc3ltYm9sKSA9PT0gQnVpbHRpblR5cGUuQW55IHx8XG4gICAgICAgICghIXN5bWJvbC50eXBlICYmIHRoaXMuaXNBbnkoc3ltYm9sLnR5cGUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWZpbmVkU3Bhbihhc3Q6IEFTVCk6IG5nLlNwYW4ge1xuICAvLyBuYW1lU3BhbiBpcyBhbiBhYnNvbHV0ZSBzcGFuLCBidXQgdGhlIHNwYW5zIHJldHVybmVkIGJ5IHRoZSBleHByZXNzaW9uIHZpc2l0b3IgYXJlIGV4cGVjdGVkIHRvXG4gIC8vIGJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgLy8gVE9ETzogbWlncmF0ZSB0byBvbmx5IHVzaW5nIGFic29sdXRlIHNwYW5zXG4gIGNvbnN0IGFic29sdXRlT2Zmc2V0ID0gYXN0LnNvdXJjZVNwYW4uc3RhcnQgLSBhc3Quc3Bhbi5zdGFydDtcbiAgaWYgKGFzdCBpbnN0YW5jZW9mIEFTVFdpdGhOYW1lKSB7XG4gICAgcmV0dXJuIG9mZnNldFNwYW4oYXN0Lm5hbWVTcGFuLCAtYWJzb2x1dGVPZmZzZXQpO1xuICB9XG4gIHJldHVybiBvZmZzZXRTcGFuKGFzdC5zb3VyY2VTcGFuLCAtYWJzb2x1dGVPZmZzZXQpO1xufVxuIl19