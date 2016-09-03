import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'responsive-menu',
    template: `
        <div class="pure-visible-sm menu-bar center" (click)="toggleMenu()">
            <p>Menu</p>
        </div>
        <div class="pure-visible-sm spacer"></div>
        <side-bar (click)="toggleMenu()" class="{{showMenu ? '' : 'pure-hidden-sm'}}"></side-bar>
    `,
    styleUrls: ['./responsive-menu.component.scss']
})
export class ResponsiveMenuComponent implements OnInit {
    @Output() onMenuToggled = new EventEmitter<boolean>();
    showMenu: boolean;

    ngOnInit() {
        this.showMenu = true;
        this.onMenuToggled.emit(this.showMenu);
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
        this.onMenuToggled.emit(this.showMenu);
    }
}
