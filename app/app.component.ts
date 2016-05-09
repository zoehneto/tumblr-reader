import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {TumblrService} from "./tumblr.service";
import {ConfigService} from "./config.service";
import {SidebarComponent} from  "./sidebar.component"
import {PostListComponent} from "./post.list.component"

@Component({
    selector: 'my-app',
    template: `
        <div class="pure-g">
            <sidebar class="pure-u-1-5"></sidebar>
            <div class="pure-u-4-5">
                <router-outlet ></router-outlet>
            </div>  
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, SidebarComponent, PostListComponent],
    providers: [ConfigService, TumblrService]
})
@Routes([
    {path: '/:name', component: PostListComponent}
])
export class AppComponent{
}