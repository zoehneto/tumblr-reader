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
    styles: [`
        html, body {
            margin:0;
        }
        
        html, button, input, select, textarea,
        .pure-g [class *= "pure-u"] {
            font-family: Verdana, Geneva, sans-serif;
        }
        
        /*Styles for comments in text post or caption*/
        blockquote{
            border-left: 3px solid lightgrey;
            margin: 1em 0;
            padding: 0 20px;
        }
        
        a:link, a:visited, a:hover, a:active {
            text-decoration: underline;
            color: #6E6E6E;
        }
        a:hover{
            color: black;
        }
        
        div.center {
            text-align: center;
        }
    `],
})
export class AppComponent {
    hideComponents: boolean;

    hideOtherComponents(hideComponents: boolean) {
        this.hideComponents = hideComponents;
    }
}
