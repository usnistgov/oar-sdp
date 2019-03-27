"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var domhandler_1 = require("../dom/domhandler");
var paginator_1 = require("../paginator/paginator");
var shared_1 = require("../common/shared");
var objectutils_1 = require("../utils/objectutils");
var TreeTableService = /** @class */ (function () {
    function TreeTableService() {
        this.sortSource = new rxjs_1.Subject();
        this.selectionSource = new rxjs_1.Subject();
        this.contextMenuSource = new rxjs_1.Subject();
        this.uiUpdateSource = new rxjs_1.Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.uiUpdateSource$ = this.uiUpdateSource.asObservable();
    }
    TreeTableService.prototype.onSort = function (sortMeta) {
        this.sortSource.next(sortMeta);
    };
    TreeTableService.prototype.onSelectionChange = function () {
        this.selectionSource.next();
    };
    TreeTableService.prototype.onContextMenu = function (node) {
        this.contextMenuSource.next(node);
    };
    TreeTableService.prototype.onUIUpdate = function (value) {
        this.uiUpdateSource.next(value);
    };
    TreeTableService = __decorate([
        core_1.Injectable()
    ], TreeTableService);
    return TreeTableService;
}());
exports.TreeTableService = TreeTableService;
var TreeTable = /** @class */ (function () {
    function TreeTable(el, domHandler, objectUtils, zone, tableService) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.tableService = tableService;
        this.lazy = false;
        this.first = 0;
        this.totalRecords = 0;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.compareSelectionBy = 'deepEquals';
        this.loadingIcon = 'pi pi-spinner';
        this.columnResizeMode = 'fit';
        this.rowTrackBy = function (index, item) { return item; };
        this.onNodeExpand = new core_1.EventEmitter();
        this.onNodeCollapse = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onLazyLoad = new core_1.EventEmitter();
        this.sortFunction = new core_1.EventEmitter();
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.onNodeSelect = new core_1.EventEmitter();
        this.onNodeUnselect = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.onHeaderCheckboxToggle = new core_1.EventEmitter();
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this._value = [];
        this._sortOrder = 1;
        this.selectionKeys = {};
    }
    TreeTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    TreeTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'caption':
                    _this.captionTemplate = item.template;
                    break;
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'summary':
                    _this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    _this.colGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
                case 'frozenheader':
                    _this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    _this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    _this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    _this.frozenColGroupTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(TreeTable.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
            }
            this.updateSerializedValue();
            this.tableService.onUIUpdate(this.value);
        },
        enumerable: true,
        configurable: true
    });
    TreeTable.prototype.updateSerializedValue = function () {
        this.serializedValue = [];
        if (this.paginator)
            this.serializePageNodes();
        else
            this.serializeNodes(null, this.value, 0, true);
    };
    TreeTable.prototype.serializeNodes = function (parent, nodes, level, visible) {
        if (nodes && nodes.length) {
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                node.parent = parent;
                var rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                this.serializedValue.push(rowNode);
                this.serializeNodes(node, node.children, level + 1, rowNode.visible);
            }
        }
    };
    TreeTable.prototype.serializePageNodes = function () {
        this.serializedValue = [];
        if (this.value && this.value.length) {
            var first = this.lazy ? 0 : this.first;
            for (var i = first; i < (first + this.rows); i++) {
                var node = this.value[i];
                if (node) {
                    this.serializedValue.push({
                        node: node,
                        parent: null,
                        level: 0,
                        visible: true
                    });
                    this.serializeNodes(node, node.children, 1, true);
                }
            }
        }
    };
    Object.defineProperty(TreeTable.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeTable.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeTable.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeTable.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        },
        enumerable: true,
        configurable: true
    });
    TreeTable.prototype.updateSelectionKeys = function () {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (var _i = 0, _a = this._selection; _i < _a.length; _i++) {
                    var node = _a[_i];
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(node.data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection.data, this.dataKey))] = 1;
            }
        }
    };
    TreeTable.prototype.onPageChange = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.serializePageNodes();
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.tableService.onUIUpdate(this.value);
    };
    TreeTable.prototype.sort = function (event) {
        var originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            var sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
    };
    TreeTable.prototype.sortSingle = function () {
        if (this.sortField && this.sortOrder) {
            if (this.resetPageOnSort) {
                this.first = 0;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.sortNodes(this.value);
            }
            var sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
            this.updateSerializedValue();
        }
    };
    TreeTable.prototype.sortNodes = function (nodes) {
        var _this = this;
        if (!nodes || nodes.length === 0) {
            return;
        }
        if (this.customSort) {
            this.sortFunction.emit({
                data: nodes,
                mode: this.sortMode,
                field: this.sortField,
                order: this.sortOrder
            });
        }
        else {
            nodes.sort(function (node1, node2) {
                var value1 = _this.objectUtils.resolveFieldData(node1.data, _this.sortField);
                var value2 = _this.objectUtils.resolveFieldData(node2.data, _this.sortField);
                var result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (_this.sortOrder * result);
            });
        }
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var node = nodes_2[_i];
            this.sortNodes(node.children);
        }
    };
    TreeTable.prototype.sortMultiple = function () {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.sortMultipleNodes(this.value);
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
            this.updateSerializedValue();
        }
    };
    TreeTable.prototype.sortMultipleNodes = function (nodes) {
        var _this = this;
        if (!nodes || nodes.length === 0) {
            return;
        }
        if (this.customSort) {
            this.sortFunction.emit({
                data: this.value,
                mode: this.sortMode,
                multiSortMeta: this.multiSortMeta
            });
        }
        else {
            this.value.sort(function (node1, node2) {
                return _this.multisortField(node1, node2, _this.multiSortMeta, 0);
            });
        }
        for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
            var node = nodes_3[_i];
            this.sortMultipleNodes(node.children);
        }
    };
    TreeTable.prototype.multisortField = function (node1, node2, multiSortMeta, index) {
        var value1 = this.objectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
        var value2 = this.objectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
        var result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true }));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(node1, node2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    TreeTable.prototype.getSortMeta = function (field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (var i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    };
    TreeTable.prototype.isSorted = function (field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    TreeTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            multiSortMeta: this.multiSortMeta
        };
    };
    TreeTable.prototype.isEmpty = function () {
        return this.value == null || this.value.length == 0;
    };
    TreeTable.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    TreeTable.prototype.onColumnResizeBegin = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        event.preventDefault();
    };
    TreeTable.prototype.onColumnResize = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    };
    TreeTable.prototype.onColumnResizeEnd = function (event, column) {
        var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        var columnWidth = column.offsetWidth;
        var newColumnWidth = columnWidth + delta;
        var minWidth = column.style.minWidth || 15;
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            var scrollableView = this.findParentScrollableView(column);
                            var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-body-table');
                            var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-header-table');
                            var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-footer-table');
                            var resizeColumnIndex = this.domHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    var scrollableView = this.findParentScrollableView(column);
                    var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-body-table');
                    var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-header-table');
                    var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    }
                    var resizeColumnIndex = this.domHandler.index(column);
                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    var containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        this.domHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    };
    TreeTable.prototype.findParentScrollableView = function (column) {
        if (column) {
            var parent_1 = column.parentElement;
            while (parent_1 && !this.domHandler.hasClass(parent_1, 'ui-treetable-scrollable-view')) {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
        else {
            return null;
        }
    };
    TreeTable.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                var col = colGroup.children[resizeColumnIndex];
                var nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    };
    TreeTable.prototype.onColumnDragStart = function (event, columnElement) {
        this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    TreeTable.prototype.onColumnDragEnter = function (event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
            var dropHeaderOffset = this.domHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    TreeTable.prototype.onColumnDragLeave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    };
    TreeTable.prototype.onColumnDrop = function (event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'ttreorderablecolumn');
            var dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'ttreorderablecolumn');
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    TreeTable.prototype.handleRowClick = function (event) {
        var targetNode = event.originalEvent.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            var rowNode = event.rowNode;
            var selected = this.isSelected(rowNode.node);
            var metaSelection = this.rowTouched ? false : this.metaKeySelection;
            var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowNode.node.data, this.dataKey)) : null;
            if (metaSelection) {
                var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                if (selected && metaKey) {
                    if (this.isSingleSelectionMode()) {
                        this._selection = null;
                        this.selectionKeys = {};
                        this.selectionChange.emit(null);
                    }
                    else {
                        var selectionIndex_1 = this.findIndexInSelection(rowNode.node);
                        this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                    this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(rowNode.node);
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    else if (this.isMultipleSelectionMode()) {
                        if (metaKey) {
                            this._selection = this.selection || [];
                        }
                        else {
                            this._selection = [];
                            this.selectionKeys = {};
                        }
                        this._selection = this.selection.concat([rowNode.node]);
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                }
            }
            else {
                if (this.selectionMode === 'single') {
                    if (selected) {
                        this._selection = null;
                        this.selectionKeys = {};
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                    }
                    else {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
                else if (this.selectionMode === 'multiple') {
                    if (selected) {
                        var selectionIndex_2 = this.findIndexInSelection(rowNode.node);
                        this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                    else {
                        this._selection = this.selection ? this.selection.concat([rowNode.node]) : [rowNode.node];
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
        }
        this.rowTouched = false;
    };
    TreeTable.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    TreeTable.prototype.handleRowRightClick = function (event) {
        if (this.contextMenu) {
            var node = event.rowNode.node;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = node;
                this.contextMenuSelectionChange.emit(node);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(node);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                var selected = this.isSelected(node);
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(node.data, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = node;
                        this.selectionChange.emit(node);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [node];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
            }
        }
    };
    TreeTable.prototype.toggleNodeWithCheckbox = function (event) {
        this.preventSelectionSetterPropagation = true;
        var node = event.rowNode.node;
        var selected = this.isSelected(node);
        if (selected) {
            this.propagateSelectionDown(node, false);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, false);
            }
            this.selectionChange.emit(this.selection);
            this.onNodeUnselect.emit({ originalEvent: event, node: node });
        }
        else {
            this.propagateSelectionDown(node, true);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, true);
            }
            this.selectionChange.emit(this.selection);
            this.onNodeSelect.emit({ originalEvent: event, node: node });
        }
        this.tableService.onSelectionChange();
    };
    TreeTable.prototype.toggleNodesWithCheckbox = function (event, check) {
        if (check) {
            if (this.value && this.value.length) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var node = _a[_i];
                    this.propagateSelectionDown(node, true);
                }
            }
        }
        else {
            this._selection = [];
            this.selectionKeys = {};
        }
        this.preventSelectionSetterPropagation = true;
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    };
    TreeTable.prototype.propagateSelectionUp = function (node, select) {
        if (node.children && node.children.length) {
            var selectedChildCount = 0;
            var childPartialSelected = false;
            var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(node.data, this.dataKey)) : null;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (this.isSelected(child))
                    selectedChildCount++;
                else if (child.partialSelected)
                    childPartialSelected = true;
            }
            if (select && selectedChildCount == node.children.length) {
                this._selection = (this.selection || []).concat([node]);
                node.partialSelected = false;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
            else {
                if (!select) {
                    var index_1 = this.findIndexInSelection(node);
                    if (index_1 >= 0) {
                        this._selection = this.selection.filter(function (val, i) { return i != index_1; });
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                }
                if (childPartialSelected || selectedChildCount > 0 && selectedChildCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
        }
        var parent = node.parent;
        if (parent) {
            this.propagateSelectionUp(parent, select);
        }
    };
    TreeTable.prototype.propagateSelectionDown = function (node, select) {
        var index = this.findIndexInSelection(node);
        var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(node.data, this.dataKey)) : null;
        if (select && index == -1) {
            this._selection = (this.selection || []).concat([node]);
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        else if (!select && index > -1) {
            this._selection = this.selection.filter(function (val, i) { return i != index; });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        node.partialSelected = false;
        if (node.children && node.children.length) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.propagateSelectionDown(child, select);
            }
        }
    };
    TreeTable.prototype.isSelected = function (node) {
        if (node && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(node.data, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(node) > -1;
                else
                    return this.equals(node, this.selection);
            }
        }
        return false;
    };
    TreeTable.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selection && this.selection.length) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(node, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    TreeTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    TreeTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    TreeTable.prototype.equals = function (node1, node2) {
        return this.compareSelectionBy === 'equals' ? (node1 === node2) : this.objectUtils.equals(node1.data, node2.data, this.dataKey);
    };
    TreeTable.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    };
    TreeTable.prototype.ngOnDestroy = function () {
        this.editingCell = null;
        this.initialized = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeTable.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "autoLayout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "lazy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TreeTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TreeTable.prototype, "first", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TreeTable.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TreeTable.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeTable.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "paginatorPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeTable.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TreeTable.prototype, "defaultSortOrder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "resetPageOnSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "customSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeTable.prototype, "contextMenuSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "contextMenuSelectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "contextMenuSelectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "metaKeySelection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "compareSelectionBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "rowHover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "loadingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "frozenWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeTable.prototype, "frozenColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeTable.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeTable.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeTable.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], TreeTable.prototype, "rowTrackBy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeExpand", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeCollapse", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "sortFunction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onColResize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeUnselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeTable.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], TreeTable.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('resizeHelper'),
        __metadata("design:type", core_1.ElementRef)
    ], TreeTable.prototype, "resizeHelperViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorUp'),
        __metadata("design:type", core_1.ElementRef)
    ], TreeTable.prototype, "reorderIndicatorUpViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorDown'),
        __metadata("design:type", core_1.ElementRef)
    ], TreeTable.prototype, "reorderIndicatorDownViewChild", void 0);
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", core_1.ElementRef)
    ], TreeTable.prototype, "tableViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], TreeTable.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TreeTable.prototype, "value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeTable.prototype, "sortField", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TreeTable.prototype, "sortOrder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TreeTable.prototype, "multiSortMeta", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TreeTable.prototype, "selection", null);
    TreeTable = __decorate([
        core_1.Component({
            selector: 'p-treeTable',
            template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n                [ngClass]=\"{'ui-treetable ui-widget': true, 'ui-treetable-auto-layout': autoLayout, 'ui-treetable-hoverable-rows': (rowHover||(selectionMode === 'single' || selectionMode === 'multiple')),\n                'ui-treetable-resizable': resizableColumns, 'ui-treetable-resizable-fit': (resizableColumns && columnResizeMode === 'fit')}\">\n            <div class=\"ui-treetable-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-treetable-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-treetable-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-treetable-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            \n            <div class=\"ui-treetable-wrapper\" *ngIf=\"!scrollable\">\n                <table #table class=\"ui-treetable-table\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-treetable-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tfoot class=\"ui-treetable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                    <tbody class=\"ui-treetable-tbody\" [pTreeTableBody]=\"columns\" [pTreeTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                </table>\n            </div>\n\n            <div class=\"ui-treetable-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-treetable-scrollable-view ui-treetable-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [ttScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-treetable-scrollable-view\" [ttScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\"></div>\n            </div>\n\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div *ngIf=\"summaryTemplate\" class=\"ui-treetable-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, TreeTableService]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, objectutils_1.ObjectUtils, core_1.NgZone, TreeTableService])
    ], TreeTable);
    return TreeTable;
}());
exports.TreeTable = TreeTable;
var TTBody = /** @class */ (function () {
    function TTBody(tt) {
        this.tt = tt;
    }
    __decorate([
        core_1.Input("pTreeTableBody"),
        __metadata("design:type", Array)
    ], TTBody.prototype, "columns", void 0);
    __decorate([
        core_1.Input("pTreeTableBodyTemplate"),
        __metadata("design:type", core_1.TemplateRef)
    ], TTBody.prototype, "template", void 0);
    TTBody = __decorate([
        core_1.Component({
            selector: '[pTreeTableBody]',
            template: "\n        <ng-template ngFor let-serializedNode let-rowIndex=\"index\" [ngForOf]=\"tt.serializedValue\" [ngForTrackBy]=\"tt.rowTrackBy\">\n            <ng-container *ngIf=\"serializedNode.visible\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: serializedNode, node: serializedNode.node, rowData: serializedNode.node.data, columns: columns}\"></ng-container>\n            </ng-container>\n        </ng-template>\n        <ng-container *ngIf=\"tt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"tt.emptyMessageTemplate; context: {$implicit: columns}\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable])
    ], TTBody);
    return TTBody;
}());
exports.TTBody = TTBody;
var TTScrollableView = /** @class */ (function () {
    function TTScrollableView(tt, el, domHandler, zone) {
        var _this = this;
        this.tt = tt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
        this.subscription = this.tt.tableService.uiUpdateSource$.subscribe(function () {
            _this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                }, 50);
            });
        });
        this.initialized = false;
    }
    Object.defineProperty(TTScrollableView.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        set: function (val) {
            this._scrollHeight = val;
            this.setScrollHeight();
        },
        enumerable: true,
        configurable: true
    });
    TTScrollableView.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.initialized = true;
        }
    };
    TTScrollableView.prototype.ngAfterViewInit = function () {
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (!this.frozen) {
            if (this.tt.frozenColumns || this.tt.frozenBodyTemplate) {
                this.domHandler.addClass(this.el.nativeElement, 'ui-treetable-unfrozen-view');
            }
            if (this.tt.frozenWidth) {
                this.el.nativeElement.style.left = this.tt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.tt.frozenWidth + ')';
            }
            var frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = this.domHandler.findSingle(frozenView, '.ui-treetable-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }
    };
    TTScrollableView.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollBarWidth = _this.domHandler.calculateScrollbarWidth();
            if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                _this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
            }
            if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
            }
            if (!_this.frozen) {
                _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
            }
        });
    };
    TTScrollableView.prototype.unbindEvents = function () {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    };
    TTScrollableView.prototype.onHeaderScroll = function (event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    };
    TTScrollableView.prototype.onFooterScroll = function (event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    };
    TTScrollableView.prototype.onBodyScroll = function (event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
    };
    TTScrollableView.prototype.setScrollHeight = function () {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                var containerHeight = this.domHandler.getOuterHeight(this.tt.el.nativeElement.children[0]);
                var relativeHeight = this.domHandler.getOuterHeight(this.tt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                var scrollBodyHeight = (relativeHeight - staticHeight);
                if (this.frozen) {
                    scrollBodyHeight -= this.domHandler.calculateScrollbarWidth();
                }
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if (this.frozen)
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - this.domHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    };
    TTScrollableView.prototype.hasVerticalOverflow = function () {
        return this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    };
    TTScrollableView.prototype.alignScrollBar = function () {
        if (!this.frozen) {
            var scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    };
    TTScrollableView.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.initialized = false;
    };
    __decorate([
        core_1.Input("ttScrollableView"),
        __metadata("design:type", Array)
    ], TTScrollableView.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTScrollableView.prototype, "frozen", void 0);
    __decorate([
        core_1.ViewChild('scrollHeader'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollHeaderBox'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollBody'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollTable'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooter'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooterBox'),
        __metadata("design:type", core_1.ElementRef)
    ], TTScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TTScrollableView.prototype, "scrollHeight", null);
    TTScrollableView = __decorate([
        core_1.Component({
            selector: '[ttScrollableView]',
            template: "\n        <div #scrollHeader class=\"ui-treetable-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-treetable-scrollable-header-box\">\n                <table class=\"ui-treetable-scrollable-header-table\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-treetable-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenHeaderTemplate||tt.headerTemplate : tt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-treetable-scrollable-body\">\n            <table #scrollTable class=\"ui-treetable-scrollable-body-table\">\n                <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-treetable-tbody\" [pTreeTableBody]=\"columns\" [pTreeTableBodyTemplate]=\"frozen ? tt.frozenBodyTemplate||tt.bodyTemplate : tt.bodyTemplate\"></tbody>\n            </table>\n        </div>\n        <div #scrollFooter *ngIf=\"tt.footerTemplate\" class=\"ui-treetable-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-treetable-scrollable-footer-box\">\n                <table class=\"ui-treetable-scrollable-footer-table\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-treetable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenFooterTemplate||tt.footerTemplate : tt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], TTScrollableView);
    return TTScrollableView;
}());
exports.TTScrollableView = TTScrollableView;
var TTSortableColumn = /** @class */ (function () {
    function TTSortableColumn(tt, domHandler) {
        var _this = this;
        this.tt = tt;
        this.domHandler = domHandler;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
    }
    TTSortableColumn.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    };
    TTSortableColumn.prototype.updateSortState = function () {
        this.sorted = this.tt.isSorted(this.field);
    };
    TTSortableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.tt.sort({
                originalEvent: event,
                field: this.field
            });
            this.domHandler.clearSelection();
        }
    };
    TTSortableColumn.prototype.isEnabled = function () {
        return this.ttSortableColumnDisabled !== true;
    };
    TTSortableColumn.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("ttSortableColumn"),
        __metadata("design:type", String)
    ], TTSortableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTSortableColumn.prototype, "ttSortableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TTSortableColumn.prototype, "onClick", null);
    TTSortableColumn = __decorate([
        core_1.Directive({
            selector: '[ttSortableColumn]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-sortable-column]': 'isEnabled()',
                '[class.ui-state-highlight]': 'sorted'
            }
        }),
        __metadata("design:paramtypes", [TreeTable, domhandler_1.DomHandler])
    ], TTSortableColumn);
    return TTSortableColumn;
}());
exports.TTSortableColumn = TTSortableColumn;
var TTSortIcon = /** @class */ (function () {
    function TTSortIcon(tt) {
        var _this = this;
        this.tt = tt;
        this.subscription = this.tt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    TTSortIcon.prototype.ngOnInit = function () {
        this.updateSortState();
    };
    TTSortIcon.prototype.onClick = function (event) {
        event.preventDefault();
    };
    TTSortIcon.prototype.updateSortState = function () {
        if (this.tt.sortMode === 'single') {
            this.sortOrder = this.tt.isSorted(this.field) ? this.tt.sortOrder : 0;
        }
        else if (this.tt.sortMode === 'multiple') {
            var sortMeta = this.tt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    };
    TTSortIcon.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TTSortIcon.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TTSortIcon.prototype, "ariaLabelDesc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TTSortIcon.prototype, "ariaLabelAsc", void 0);
    TTSortIcon = __decorate([
        core_1.Component({
            selector: 'p-treeTableSortIcon',
            template: "\n        <a href=\"#\" (click)=\"onClick($event)\" class=\"ui-treetable-sort-icon\" [attr.aria-label]=\" sortOrder === 1 ? ariaLabelAsc : sortOrder === -1 ? ariaLabelDesc : '' \">\n            <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n        </a>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable])
    ], TTSortIcon);
    return TTSortIcon;
}());
exports.TTSortIcon = TTSortIcon;
var TTResizableColumn = /** @class */ (function () {
    function TTResizableColumn(tt, el, domHandler, zone) {
        this.tt = tt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    TTResizableColumn.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(function () {
                _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
            });
        }
    };
    TTResizableColumn.prototype.bindDocumentEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
            document.addEventListener('mousemove', _this.documentMouseMoveListener);
            _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
            document.addEventListener('mouseup', _this.documentMouseUpListener);
        });
    };
    TTResizableColumn.prototype.unbindDocumentEvents = function () {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    };
    TTResizableColumn.prototype.onMouseDown = function (event) {
        this.tt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    };
    TTResizableColumn.prototype.onDocumentMouseMove = function (event) {
        this.tt.onColumnResize(event);
    };
    TTResizableColumn.prototype.onDocumentMouseUp = function (event) {
        this.tt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    };
    TTResizableColumn.prototype.isEnabled = function () {
        return this.ttResizableColumnDisabled !== true;
    };
    TTResizableColumn.prototype.ngOnDestroy = function () {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTResizableColumn.prototype, "ttResizableColumnDisabled", void 0);
    TTResizableColumn = __decorate([
        core_1.Directive({
            selector: '[ttResizableColumn]'
        }),
        __metadata("design:paramtypes", [TreeTable, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], TTResizableColumn);
    return TTResizableColumn;
}());
exports.TTResizableColumn = TTResizableColumn;
var TTReorderableColumn = /** @class */ (function () {
    function TTReorderableColumn(tt, el, domHandler, zone) {
        this.tt = tt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    TTReorderableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    };
    TTReorderableColumn.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragOverListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragEnterListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    TTReorderableColumn.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    TTReorderableColumn.prototype.onMouseDown = function (event) {
        if (event.target.nodeName === 'INPUT' || this.domHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    };
    TTReorderableColumn.prototype.onDragStart = function (event) {
        this.tt.onColumnDragStart(event, this.el.nativeElement);
    };
    TTReorderableColumn.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    TTReorderableColumn.prototype.onDragEnter = function (event) {
        this.tt.onColumnDragEnter(event, this.el.nativeElement);
    };
    TTReorderableColumn.prototype.onDragLeave = function (event) {
        this.tt.onColumnDragLeave(event);
    };
    TTReorderableColumn.prototype.onDrop = function (event) {
        if (this.isEnabled()) {
            this.tt.onColumnDrop(event, this.el.nativeElement);
        }
    };
    TTReorderableColumn.prototype.isEnabled = function () {
        return this.ttReorderableColumnDisabled !== true;
    };
    TTReorderableColumn.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTReorderableColumn.prototype, "ttReorderableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TTReorderableColumn.prototype, "onDrop", null);
    TTReorderableColumn = __decorate([
        core_1.Directive({
            selector: '[ttReorderableColumn]'
        }),
        __metadata("design:paramtypes", [TreeTable, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], TTReorderableColumn);
    return TTReorderableColumn;
}());
exports.TTReorderableColumn = TTReorderableColumn;
var TTSelectableRow = /** @class */ (function () {
    function TTSelectableRow(tt, domHandler, tableService) {
        var _this = this;
        this.tt = tt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.tt.isSelected(_this.rowNode.node);
            });
        }
    }
    TTSelectableRow.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    };
    TTSelectableRow.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    };
    TTSelectableRow.prototype.onTouchEnd = function (event) {
        if (this.isEnabled()) {
            this.tt.handleRowTouchEnd(event);
        }
    };
    TTSelectableRow.prototype.isEnabled = function () {
        return this.ttSelectableRowDisabled !== true;
    };
    TTSelectableRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("ttSelectableRow"),
        __metadata("design:type", Object)
    ], TTSelectableRow.prototype, "rowNode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTSelectableRow.prototype, "ttSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], TTSelectableRow.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], TTSelectableRow.prototype, "onTouchEnd", null);
    TTSelectableRow = __decorate([
        core_1.Directive({
            selector: '[ttSelectableRow]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [TreeTable, domhandler_1.DomHandler, TreeTableService])
    ], TTSelectableRow);
    return TTSelectableRow;
}());
exports.TTSelectableRow = TTSelectableRow;
var TTSelectableRowDblClick = /** @class */ (function () {
    function TTSelectableRowDblClick(tt, domHandler, tableService) {
        var _this = this;
        this.tt = tt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.tt.isSelected(_this.rowNode.node);
            });
        }
    }
    TTSelectableRowDblClick.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    };
    TTSelectableRowDblClick.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    };
    TTSelectableRowDblClick.prototype.isEnabled = function () {
        return this.ttSelectableRowDisabled !== true;
    };
    TTSelectableRowDblClick.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("ttSelectableRowDblClick"),
        __metadata("design:type", Object)
    ], TTSelectableRowDblClick.prototype, "rowNode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTSelectableRowDblClick.prototype, "ttSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('dblclick', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], TTSelectableRowDblClick.prototype, "onClick", null);
    TTSelectableRowDblClick = __decorate([
        core_1.Directive({
            selector: '[ttSelectableRowDblClick]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [TreeTable, domhandler_1.DomHandler, TreeTableService])
    ], TTSelectableRowDblClick);
    return TTSelectableRowDblClick;
}());
exports.TTSelectableRowDblClick = TTSelectableRowDblClick;
var TTContextMenuRow = /** @class */ (function () {
    function TTContextMenuRow(tt, tableService) {
        var _this = this;
        this.tt = tt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.contextMenuSource$.subscribe(function (node) {
                _this.selected = _this.tt.equals(_this.rowNode.node, node);
            });
        }
    }
    TTContextMenuRow.prototype.onContextMenu = function (event) {
        if (this.isEnabled()) {
            this.tt.handleRowRightClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
            event.preventDefault();
        }
    };
    TTContextMenuRow.prototype.isEnabled = function () {
        return this.ttContextMenuRowDisabled !== true;
    };
    TTContextMenuRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("ttContextMenuRow"),
        __metadata("design:type", Object)
    ], TTContextMenuRow.prototype, "rowNode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTContextMenuRow.prototype, "ttContextMenuRowDisabled", void 0);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], TTContextMenuRow.prototype, "onContextMenu", null);
    TTContextMenuRow = __decorate([
        core_1.Directive({
            selector: '[ttContextMenuRow]',
            host: {
                '[class.ui-contextmenu-selected]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [TreeTable, TreeTableService])
    ], TTContextMenuRow);
    return TTContextMenuRow;
}());
exports.TTContextMenuRow = TTContextMenuRow;
var TTCheckbox = /** @class */ (function () {
    function TTCheckbox(tt, domHandler, tableService) {
        var _this = this;
        this.tt = tt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.tt.isSelected(_this.rowNode.node);
        });
    }
    TTCheckbox.prototype.ngOnInit = function () {
        this.checked = this.tt.isSelected(this.rowNode.node);
    };
    TTCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.tt.toggleNodeWithCheckbox({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
        this.domHandler.clearSelection();
    };
    TTCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TTCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TTCheckbox.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input("value"),
        __metadata("design:type", Object)
    ], TTCheckbox.prototype, "rowNode", void 0);
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TTCheckbox.prototype, "boxViewChild", void 0);
    TTCheckbox = __decorate([
        core_1.Component({
            selector: 'p-treeTableCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-treetable-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-chkbox-icon ui-clickable pi\" [ngClass]=\"{'pi-check':checked, 'pi-minus': rowNode.node.partialSelected}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable, domhandler_1.DomHandler, TreeTableService])
    ], TTCheckbox);
    return TTCheckbox;
}());
exports.TTCheckbox = TTCheckbox;
var TTHeaderCheckbox = /** @class */ (function () {
    function TTHeaderCheckbox(tt, domHandler, tableService) {
        var _this = this;
        this.tt = tt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.valueChangeSubscription = this.tt.tableService.uiUpdateSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.tt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
    }
    TTHeaderCheckbox.prototype.ngOnInit = function () {
        this.checked = this.updateCheckedState();
    };
    TTHeaderCheckbox.prototype.onClick = function (event, checked) {
        if (this.tt.value && this.tt.value.length > 0) {
            this.tt.toggleNodesWithCheckbox(event, !checked);
        }
        this.domHandler.clearSelection();
    };
    TTHeaderCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TTHeaderCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TTHeaderCheckbox.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TTHeaderCheckbox.prototype.updateCheckedState = function () {
        var checked;
        if (this.tt.value) {
            for (var _i = 0, _a = this.tt.value; _i < _a.length; _i++) {
                var node = _a[_i];
                if (this.tt.isSelected(node)) {
                    checked = true;
                }
                else {
                    checked = false;
                    break;
                }
            }
        }
        else {
            checked = false;
        }
        return checked;
    };
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TTHeaderCheckbox.prototype, "boxViewChild", void 0);
    TTHeaderCheckbox = __decorate([
        core_1.Component({
            selector: 'p-treeTableHeaderCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-treetable-header-chkbox ui-widget\" (click)=\"onClick($event, cb.checked)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"!tt.value||tt.value.length === 0\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': (!tt.value || tt.value.length === 0)}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable, domhandler_1.DomHandler, TreeTableService])
    ], TTHeaderCheckbox);
    return TTHeaderCheckbox;
}());
exports.TTHeaderCheckbox = TTHeaderCheckbox;
var TTEditableColumn = /** @class */ (function () {
    function TTEditableColumn(tt, el, domHandler, zone) {
        this.tt = tt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    TTEditableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    };
    TTEditableColumn.prototype.isValid = function () {
        return (this.tt.editingCell && this.domHandler.find(this.tt.editingCell, '.ng-invalid.ng-dirty').length === 0);
    };
    TTEditableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            if (this.tt.editingCell) {
                if (this.tt.editingCell !== this.el.nativeElement) {
                    if (!this.isValid()) {
                        return;
                    }
                    this.domHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    };
    TTEditableColumn.prototype.openCell = function () {
        var _this = this;
        this.tt.editingCell = this.el.nativeElement;
        this.domHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.tt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                var focusable = _this.domHandler.findSingle(_this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    };
    TTEditableColumn.prototype.onKeyDown = function (event) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.tt.editingCell = null;
                    this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 27) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.tt.editingCell = null;
                    this.tt.onEditCancel.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 9) {
                this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    };
    TTEditableColumn.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && !this.domHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    TTEditableColumn.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    TTEditableColumn.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    TTEditableColumn.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    TTEditableColumn.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    TTEditableColumn.prototype.isEnabled = function () {
        return this.ttEditableColumnDisabled !== true;
    };
    __decorate([
        core_1.Input("ttEditableColumn"),
        __metadata("design:type", Object)
    ], TTEditableColumn.prototype, "data", void 0);
    __decorate([
        core_1.Input("ttEditableColumnField"),
        __metadata("design:type", Object)
    ], TTEditableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TTEditableColumn.prototype, "ttEditableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TTEditableColumn.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], TTEditableColumn.prototype, "onKeyDown", null);
    TTEditableColumn = __decorate([
        core_1.Directive({
            selector: '[ttEditableColumn]'
        }),
        __metadata("design:paramtypes", [TreeTable, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], TTEditableColumn);
    return TTEditableColumn;
}());
exports.TTEditableColumn = TTEditableColumn;
var TreeTableCellEditor = /** @class */ (function () {
    function TreeTableCellEditor(tt, editableColumn) {
        this.tt = tt;
        this.editableColumn = editableColumn;
    }
    TreeTableCellEditor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'input':
                    _this.inputTemplate = item.template;
                    break;
                case 'output':
                    _this.outputTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], TreeTableCellEditor.prototype, "templates", void 0);
    TreeTableCellEditor = __decorate([
        core_1.Component({
            selector: 'p-treeTableCellEditor',
            template: "\n        <ng-container *ngIf=\"tt.editingCell === editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!tt.editingCell || tt.editingCell !== editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable, TTEditableColumn])
    ], TreeTableCellEditor);
    return TreeTableCellEditor;
}());
exports.TreeTableCellEditor = TreeTableCellEditor;
var TreeTableToggler = /** @class */ (function () {
    function TreeTableToggler(tt) {
        this.tt = tt;
    }
    TreeTableToggler.prototype.onClick = function (event) {
        this.rowNode.node.expanded = !this.rowNode.node.expanded;
        if (this.rowNode.node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }
        else {
            this.tt.onNodeCollapse.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }
        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);
        event.preventDefault();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeTableToggler.prototype, "rowNode", void 0);
    TreeTableToggler = __decorate([
        core_1.Component({
            selector: 'p-treeTableToggler',
            template: "\n        <a href=\"#\" class=\"ui-treetable-toggler\" *ngIf=\"rowNode.node.leaf === false || rowNode.level !== 0 || rowNode.node.children && rowNode.node.children.length\" (click)=\"onClick($event)\" [style.visibility]=\"rowNode.node.leaf === false || (rowNode.node.children && rowNode.node.children.length) ? 'visible' : 'hidden'\" [style.marginLeft]=\"rowNode.level * 16 + 'px'\">\n            <i [ngClass]=\"rowNode.node.expanded ? 'pi pi-fw pi-chevron-down' : 'pi pi-fw pi-chevron-right'\"></i>\n        </a>\n    "
        }),
        __metadata("design:paramtypes", [TreeTable])
    ], TreeTableToggler);
    return TreeTableToggler;
}());
exports.TreeTableToggler = TreeTableToggler;
var TreeTableModule = /** @class */ (function () {
    function TreeTableModule() {
    }
    TreeTableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, paginator_1.PaginatorModule],
            exports: [TreeTable, shared_1.SharedModule, TreeTableToggler, TTSortableColumn, TTSortIcon, TTResizableColumn, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor],
            declarations: [TreeTable, TreeTableToggler, TTScrollableView, TTBody, TTSortableColumn, TTSortIcon, TTResizableColumn, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor]
        })
    ], TreeTableModule);
    return TreeTableModule;
}());
exports.TreeTableModule = TreeTableModule;
//# sourceMappingURL=treetable.js.map