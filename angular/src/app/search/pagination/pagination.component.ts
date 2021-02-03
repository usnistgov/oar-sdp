import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    // pager object
    pager: any = {};

    @Input() totalItems: number = 0;
    @Input() currentPage: number = 1;
    @Input() pageSize: number = 10;
    @Input() startPage: number = 0;
    @Input() endPage: number = 0;
    @Output() currentPageOutput = new EventEmitter<number>();  // normal or collapsed

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.pager.totalPages = this.totalItems;
        this.setPage(this.currentPage);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.getPager(page);
        this.currentPageOutput.emit(page);
    }

    getPager(currentPage: number){
        let totalPages = Math.ceil(this.totalItems / this.pageSize);

        let startPage: number, endPage: number;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage+2;
            }
        }

        // the first and last pages are always displayed (except total pages = 1)
        // Following pages is used to display page #2 to total pages -1 (display 3 pages a time)
        let pages = _.range(startPage+1, endPage);

        // If total page is less than 3, pages will be hidden. 
        // But we want to set a value so it won't be null.
        if(totalPages < 3) pages = [1];

        // return object with all pager properties required by the view
        return {
            totalItems: this.totalItems,
            currentPage: currentPage,
            pageSize: this.pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages
        };
    }
}
