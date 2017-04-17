//import { Directive, ElementRef, Input } from '@angular/core';

// @Directive({ selector: '[collapse]' })
// export class CollapseComponentComponent {
//     constructor(el: ElementRef) {
//        el.nativeElement.style.backgroundColor = 'yellow';
//     }
// }

import {Directive, Input, HostBinding,ElementRef} from '@angular/core';

@Directive({selector: '[collapse]'})
export class Collaspe {

  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  darkMenu: boolean = false;
  profileMode: string = 'inline';
  

  constructor( private el: ElementRef) {
  }
 // style
    @HostBinding('style.height')
    private height:string;
    // shown
    @HostBinding('class.in')
    @HostBinding('attr.aria-expanded')
    private isExpanded:boolean = true;
    // hidden
    @HostBinding('attr.aria-hidden')
    private isCollapsed:boolean = false;
    // stale state
    @HostBinding('class.collapse')
    private isCollapse:boolean = true;
    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing:boolean = false;

    @Input()
    private set collapse(value:boolean) {
        this.isExpanded = value;
        this.toggle();
    }

    private get collapse():boolean {
        return this.isExpanded;
    }

   
    toggle() {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.isCollapse = false;
        this.isCollapsing = true;
      
        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(() => {
            this.height = '0';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }

    show() {
        this.isCollapse = false;
        this.isCollapsing = true;

        this.isExpanded = true;
        this.isCollapsed = false;
       
        setTimeout(() => {
            this.height = 'auto';

            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }
}
