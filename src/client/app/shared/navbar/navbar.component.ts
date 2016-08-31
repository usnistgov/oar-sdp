import { Component,OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent implements OnInit {

    menuItems: MenuItem[];

    /**
     * initialize the menu items
     */
    ngOnInit() {
        this.loadMenuItems();
    }

    loadMenuItems() {
        this.menuItems = [
            {
                label: 'File',
                items: [{
                    label: 'New',
                    icon: 'fa-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }
        ];
    }



}
