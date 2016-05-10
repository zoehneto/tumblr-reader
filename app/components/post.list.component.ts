import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";

@Component({
    selector: 'post-list',
    template: `
        <ul>
            <li *ngFor="let post of posts">
                <div [innerHTML]="post.body"></div>
            </li>
        </ul>
    `
})
export class PostListComponent{
    private blog: Blog;
    private posts: Post[];
    constructor(private _routeSegment: RouteSegment, private _tumblrService: TumblrService) {
        this.blog = new Blog();
        _tumblrService.getPosts(_routeSegment.getParam("name")).subscribe(res => {
            this.blog = res.blog;
            this.posts = res.posts;
        });
    }
}