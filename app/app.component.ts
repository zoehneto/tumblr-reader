import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {TumblrService} from "./shared/tumblr.service";
import {ConfigService} from "./shared/config.service";
import {SidebarComponent} from  "./components/sidebar.component"
import {PostListComponent} from "./components/post.list.component"
import {SettingsService} from "./shared/settings.service";
import {SettingsComponent} from "./components/settings.component";

@Component({
    selector: 'my-app',
    template: `
        <div class="pure-g">
            <sidebar class="pure-u-1-5"></sidebar>
            <div class="pure-u-3-5">
                <router-outlet ></router-outlet>
            </div>  
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, SidebarComponent, PostListComponent, SettingsComponent],
    providers: [ConfigService, TumblrService, SettingsService]
})
@Routes([
    {path: '/settings', component: SettingsComponent},
    {path: '/blog/:name', component: PostListComponent}
])
export class AppComponent{
}