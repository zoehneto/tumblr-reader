import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TumblrService } from './shared/tumblr.service';
import { SidebarComponent } from  './components/sidebar.component';
import { PostListComponent } from './components/post.list.component';
import { SettingsService } from './shared/settings.service';
import { SettingsComponent } from './components/settings.component';
import { CustomSanitizationService } from './shared/custom.sanitization.service';
import { FaviconService } from './shared/favicon.service';
import { HotkeysService } from 'angular2-hotkeys/angular2-hotkeys';
import { PostItemSwitch } from './item-switch/post.item.switch';
import { BlogItemSwitch } from './item-switch/blog.item.switch';
import 'purecss/build/grids-min.css';

@Component({
    selector: 'tumblr-reader',
    template: `
        <div class="pure-g">
            <side-bar class="pure-u-1-5"></side-bar>
            <div class="pure-u-3-5">
                <router-outlet ></router-outlet>
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
    `],
    directives: [ROUTER_DIRECTIVES, SidebarComponent, PostListComponent, SettingsComponent],
    providers: [Title, TumblrService, SettingsService, CustomSanitizationService, FaviconService,
        HotkeysService, PostItemSwitch, BlogItemSwitch]
})
export class AppComponent {
}
