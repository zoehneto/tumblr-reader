import {Component} from '@angular/core';
import {TumblrService} from "./tumblr.service";
import {ConfigService} from "./config.service";
import {Blog} from "./data.types";
import {Post} from "./data.types";
import {SidebarComponent} from  "./sidebar.component"

@Component({
    selector: 'my-app',
    template: `
    <div class="pure-g">
        <sidebar class="pure-u-1-5"></sidebar>
        <div class="pure-u-4-5">
            <h1>{{blog.name}}</h1>
            <ul>
                <li *ngFor="let post of posts">
                    <div [innerHTML]="post.body"></div>
                </li>
            </ul>
        </div>
    </div>
    `,
    directives: [SidebarComponent],
    providers: [ConfigService, TumblrService]
})
export class AppComponent{
    blog: Blog;
    posts: Post[];
    constructor(private _tumblrService: TumblrService) {
        this.blog = new Blog;
        _tumblrService.getPosts("test").subscribe(res => {
            this.blog = res.blog;
            this.posts = res.posts;
        });
    }
}