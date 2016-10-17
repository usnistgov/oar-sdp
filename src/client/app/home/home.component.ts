import { Component, OnInit } from '@angular/core';
import {SelectItem,DialogModule} from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchService } from '../shared/search-service/index';
import {Router,NavigationExtras} from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
 })

export class HomeComponent implements OnInit {

    errorMessage: string;
    searchValue:string = '';
    taxonomies: SelectItem[];
    searchTaxonomyKey: string;
    display: boolean = false;

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

   showDialog() {
        this.display = true;
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
            items.push({label:taxonomy.researchCategory, value:taxonomy.researchCategory});
        }
        return items;
    }

    search() {
            let params:NavigationExtras = {
                queryParams: { 'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey:''}
            };

            this.router.navigate(['/search'], params);


    }

    searchExample (popupValue:string)

    {
      this.display = false;
      this.searchValue = popupValue;
    }

}
