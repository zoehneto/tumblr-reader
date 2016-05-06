import {Component} from '@angular/core';
import {TumblrService} from "./tumblr.service";
import {ConfigService} from "./config.service";
import {Blog} from "./data.types";
import {Post} from "./data.types";

@Component({
    selector: 'my-app',
    template: `
    <h1>{{blog.name}}</h1>
    <ul>
        <li *ngFor="let post of posts">
            <div [innerHTML]="post.body"></div>
        </li>
    </ul>
    `,
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