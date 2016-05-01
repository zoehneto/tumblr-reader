import {Component} from 'angular2/core';
import {TumblrService} from "./tumblr.service";
import {ConfigService} from "./config.service";
import {Blog} from "./data.types";

@Component({
    selector: 'my-app',
    template: `
    <h1>{{blog.id}}</h1>
    <ul>
        <li *ngFor="let post of posts"></li>
    </ul>
    `,
    providers: [ConfigService, TumblrService]
})
export class AppComponent{
    posts=[{test:'a'}];
    constructor(private _tumblrService: TumblrService) {
        _tumblrService.getPosts(this.blog.id).subscribe(
            res => this.posts = res
        );
    }

    blog: Blog = {
        id: 'test'
    };


}