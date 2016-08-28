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
    styles: [`
        .menu-bar {
            position: fixed;
            height: 3em;
            width: inherit;
            background-color: #EEEEEE;
            border-bottom: 3px solid white;
        }
        
        div.spacer {
            height: calc(3em + 3px);
        }
        
        side-bar {
            width: inherit;
        }
    `]
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
