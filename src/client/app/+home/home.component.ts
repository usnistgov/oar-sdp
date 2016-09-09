import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchService } from '../shared/search-service/index';
import {Router,NavigationExtras} from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
 })

export class HomeComponent implements OnInit {

    errorMessage: string;
    searchValue:string;
    taxonomies: SelectItem[];
    searchTaxonomyKey: string;

    /**
     *
     */
  constructor(public taxonomyListService: TaxonomyListService, public searchService:SearchService, private router:Router) {
             this.taxonomies = [];
    }

    /**
     *
     */
  ngOnInit() {
        this.getTaxonomies();
  }

    /**
     * Handle the nameListService observable
     */
    getTaxonomies() {
        this.taxonomyListService.get()
            .subscribe(
            taxonomies => this.taxonomies = this.toTaxonomiesItems(taxonomies),
            error =>  this.errorMessage = <any>error
        );
    }

    toTaxonomiesItems(taxonomies:any[]) {
        let items :SelectItem[] = [];
        items.push({label:'All', value:''});
        for (let taxonomy of taxonomies) {
            items.push({label:taxonomy.researchCategory, value:taxonomy.keyIdentifier});
        }
        return items;
    }

    search() {
        if(this.searchValue !== '' && this.searchValue !== undefined) {
            let params:NavigationExtras = {
                queryParams: { 'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey:''}
            };
            this.router.navigate(['/search'], params);
        }
    }


}
