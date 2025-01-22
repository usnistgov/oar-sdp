import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
  Inject,
} from "@angular/core";
import * as _ from "lodash-es";
import { SearchService, SEARCH_SERVICE } from "../../shared/search-service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  pager: any = {}; // Object to store pagination state
  subscription: Subscription = new Subscription();

  @Input() totalItems: number = 0; // Total number of items
  @Input() currentPage: number = 1; // Current active page
  @Input() pageSize: number = 10; // Items per page
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService) {}

  /**
   * Lifecycle hook: OnInit
   */
  ngOnInit(): void {
    this.updatePager(this.currentPage);

    // Watch for page updates from SearchService
    this.subscription.add(
      this.searchService.watchCurrentPage().subscribe((page) => {
        if (page !== this.currentPage) {
          this.currentPage = page || 1;
          this.updatePager(this.currentPage);
        }
      })
    );

    // Watch for total item updates from SearchService
    this.subscription.add(
      this.searchService.watchTotalItems().subscribe((totalItems) => {
        if (totalItems !== this.totalItems) {
          this.totalItems = totalItems || 0;
          this.updatePager(this.currentPage);
        }
      })
    );
  }

  /**
   * Lifecycle hook: OnChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalItems || changes.pageSize) {
      this.updatePager(this.currentPage);

      const totalPages = Math.ceil(this.totalItems / this.pageSize);
      if (this.currentPage > totalPages) {
        this.setPage(totalPages || 1);
      }
    }
  }

  /**
   * Lifecycle hook: OnDestroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Update the pager state for the current page
   * @param page - The current page number
   */
  updatePager(page: number): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    this.pager = this.getPager(page);
  }

  /**
   * Emit the new page to parent and update SearchService
   * @param page - The page number to set
   */
  setPage(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalItems / this.pageSize)) {
      return;
    }
    this.currentPage = page;
    this.updatePager(page);
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
    this.searchService.setCurrentPage(page); // Notify SearchService
  }

  /**
   * Calculate and return the pager object
   * @param currentPage - The current page number
   */
  getPager(currentPage: number = this.currentPage): any {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pages = _.range(startPage, endPage + 1);
    return {
      totalItems: this.totalItems,
      currentPage,
      pageSize: this.pageSize,
      totalPages,
      startPage,
      endPage,
      pages,
    };
  }

  /**
   * Handle the page change event from PrimeNG paginator
   * @param event - The page change event
   */
  onPageChange(event: any): void {
    const newPage = Math.floor(event.first / event.rows) + 1; // Calculate new page number
    this.currentPage = newPage;
    this.pageSize = event.rows;

    // Update the pager state and notify parent
    this.updatePager(this.currentPage);
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });

    // Notify SearchService about the page change
    this.searchService.setCurrentPage(this.currentPage);
  }
}
