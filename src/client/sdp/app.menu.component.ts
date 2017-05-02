import { Component,Input,OnInit,EventEmitter,ViewChild,trigger,state,transition,style,animate,Inject,forwardRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-menu',
  template: `
        <ul app-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

  @Input() reset: boolean;

  model: any[];

  constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}

  ngOnInit() {
    this.model = [
      {label: ' ', icon: 'home', routerLink: ['/']},
      {
        label: 'Key Datasets',
        items: [
          {label: 'Atomic Spectroscopy Database',url: 'https://www.nist.gov/node/429021'},
          {label: 'Ballistics Toolmark', url: 'https://www.nist.gov/programs-projects/nist-ballistics-toolmark-database'},
          {label: 'Chemistry WebBook',url: 'http://webbook.nist.gov/chemistry'},
          {label: 'Digital Library of Mathematical Functions', url: 'http://dlmf.nist.gov/'},
          {label: 'Fire Research', url: 'https://www.nist.gov/node/436111'},
          {label: 'Materials Genome Initiative', url: 'https://mgi.nist.gov/'},
          {label: 'National Vulnerability Database', url: 'http://csrc.nist.gov/groups/SNS/nvd/'},
          {label: 'Physical Reference Data', url: 'https://www.nist.gov/pml/productsservices/physical-reference-data'},
          {label: 'Time',url: 'http://nist.time.gov/'},
          {label: 'World Trade Center Disaster Investigation Material', url: 'http://wtcdata.nist.gov/'},
        ]
      },
      {label: 'Standard Reference Data (SRDs)', url: 'https://www.nist.gov/srd'},
      {
        label: 'Developer',
        items: [
          {label: 'APIs', routerLink: ['/api']},
          {label: 'GitHub (usnistgov)',url: 'https://github.com/usnistgov'},
        ]
      },
      {
        label: 'About',
        items: [
          {label: 'About NIST Data', routerLink: ['/about']},
          {label: 'Policy', routerLink: ['/policy']},
          {label: 'FAQ', routerLink: ['/faq']},
          {label: 'Help', routerLink: ['/help']},
        ]
      },
      {
        label: 'Find Papers',
        items: [
          {label: 'Search All Papers',url: ['https://www.nist.gov/publications']},
          {label: 'JRes NIST', url: 'https://www.nist.gov/nist-research-library/journal-research-nist'},
        ]
      },
    ];
  }
}


@Component({
  selector: '[app-submenu]',
  template: `
        <template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" target="_blank" (click)="itemClick($event,child,i)" class="ripplelink" 
                *ngIf="!child.routerLink" [attr.tabindex]="!visible ? '-1' : null">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">arrow_drop_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" 
                    [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">arrow_drop_down</i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" 
                [visible]="isActive(i)" [reset]="reset"></ul>
            </li>
        </template>
    `,
  animations: [
    trigger('children', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  activeIndex: number;

  constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent, public router: Router, public location: Location) {}

  itemClick(event: Event, item: MenuItem, index: number) {
    //avoid processing disabled items
    if(item.disabled) {
      event.preventDefault();
      return true;
    }

    //activate current item and deactivate active sibling if any
    this.activeIndex = (this.activeIndex === index) ? null : index;

    //execute command
    if(item.command) {
      if(!item.eventEmitter) {
        item.eventEmitter = new EventEmitter();
        item.eventEmitter.subscribe(item.command);
      }

      item.eventEmitter.emit({
        originalEvent: event,
        item: item
      });
    }

    //prevent hash change
    if(item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    //hide menu
    if(!item.items) {
      if(this.app.isHorizontal())
        this.app.resetMenu = true;
      else
        this.app.resetMenu = false;

      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
    return this._reset;
  }

  set reset(val:boolean) {
    this._reset = val;

    if(this._reset && this.app.isHorizontal()) {
      this.activeIndex = null;
    }
  }
}
