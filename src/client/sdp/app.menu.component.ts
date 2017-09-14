import {Component,Input,OnInit,EventEmitter,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';


@Component({
  selector: 'app-menu',
  template: `
        <ul app-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

  @Input() reset: boolean;

  model: any[];

  constructor(public app: AppComponent) {}

  ngOnInit() {
    this.model = [
      {label: '', icon: 'home', routerLink: ['/']},
      {
        label:'Key Datasets',
        items: [
          {label: 'Atomic Spectroscopy Database',url: 'https://www.nist.gov/node/429021', target:'_blank'},
          {label: 'Ballistics Toolmark', url: 'https://www.nist.gov/programs-projects/nist-ballistics-toolmark-database', target:'_blank'},
          {label: 'Chemistry WebBook',url: 'http://webbook.nist.gov/chemistry', target:'_blank'},
          {label: 'Digital Library of Mathematical Functions', url: 'http://dlmf.nist.gov/', target:'_blank'},
          {label: 'Fire Research', url: 'https://www.nist.gov/node/436111', target:'_blank'},
          {label: 'Materials Genome Initiative', url: 'https://mgi.nist.gov/', target:'_blank'},
          {label: 'National Vulnerability Database', url: 'http://csrc.nist.gov/groups/SNS/nvd/', target:'_blank'},
          {label: 'Physical Reference Data', url: 'https://www.nist.gov/pml/productsservices/physical-reference-data', target:'_blank'},
          {label: 'Time',url: 'http://nist.time.gov/', target:'_blank'},
          {label: 'World Trade Center Disaster Investigation Material', url: 'http://wtcdata.nist.gov/', target:'_blank'},
        ]
      },
      {label: 'Standard Reference Data (SRDs)', url: 'https://www.nist.gov/srd', target:'_blank'},
      {
        label: 'Developer',
        items: [
          {label: 'APIs', routerLink: ['/api']},
          {label: 'GitHub (usnistgov)',url: 'https://github.com/usnistgov', target:'_blank'},
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
          {label: 'Search All Papers',url: 'https://www.nist.gov/publications', target:'_blank'},
          {label: 'JRes NIST', url: 'https://www.nist.gov/nist-research-library/journal-research-nist', target:'_blank'},
          {label: 'NIST PubMed Central', url: 'https://www.ncbi.nlm.nih.gov/pmc/funder/nist/', target:'_blank'},
        ]
      },
    ];
  }
}

@Component({
  selector: '[app-submenu]',
  template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="!child.routerLink" 
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ? 'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
  animations: [
    trigger('children', [
      state('hiddenAnimated', style({
        height: '0px'
      })),
      state('visibleAnimated', style({
        height: '*'
      })),
      state('visible', style({
        height: '*'
      })),
      state('hidden', style({
        height: '0px'
      })),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})

@Component({
  selector: '[app-submenu]',
  template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="!child.routerLink" 
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ? 'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
  animations: [
    trigger('children', [
      state('hiddenAnimated', style({
        height: '0px'
      })),
      state('visibleAnimated', style({
        height: '*'
      })),
      state('visible', style({
        height: '*'
      })),
      state('hidden', style({
        height: '0px'
      })),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenu {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  activeIndex: number;

  constructor(public app: AppComponent) {}

  itemClick(event: Event, item: MenuItem, index: number) {
    if(this.root) {
      this.app.menuHoverActive = !this.app.menuHoverActive;
    }

    //avoid processing disabled items
    if(item.disabled) {
      event.preventDefault();
      return true;
    }

    //activate current item and deactivate active sibling if any
    this.activeIndex = (this.activeIndex === index) ? null : index;

    //execute command
    if(item.command) {
      item.command({originalEvent: event, item: item});
    }

    //prevent hash change
    if(item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    //hide menu
    if(!item.items) {
      if(this.app.isHorizontal() || this.app.isSlim())
        this.app.resetMenu = true;
      else
        this.app.resetMenu = false;

      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
      this.app.menuHoverActive = !this.app.menuHoverActive;
    }
  }

  onMouseEnter(index: number) {
    if(this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())) {
      this.activeIndex = index;
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

    if(this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
      this.activeIndex = null;
    }
  }
}
