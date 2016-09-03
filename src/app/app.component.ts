import { Component, ViewEncapsulation } from '@angular/core';
import 'purecss/build/grids.css';
import 'purecss/build/grids-responsive.css';
import '../../public/css/purecss-utils.css';

@Component({
    selector: 'tumblr-reader',
    template: `
        <div class="pure-g">
            <responsive-menu class="pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" 
            (onMenuToggled)="hideOtherComponents($event)"></responsive-menu>
            <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-3-5 
            {{hideComponents ? 'pure-hidden-sm' : ''}}">
                <router-outlet></router-outlet>
            </div>  
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    hideComponents: boolean;

    hideOtherComponents(hideComponents: boolean) {
        this.hideComponents = hideComponents;
    }
}
