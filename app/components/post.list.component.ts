import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";

@Component({
    selector: 'post-list',
    template: `
        <div class="pure-u-1-6"></div>
        <ul class="pure-u-2-3">
            <li *ngFor="let post of posts">
                <div>
                    <div *ngIf="post.question">
                        <div class="question">
                            <p>{{post.asking_name}} asked:</p>
                            <p>{{post.question}}</p>
                        </div>
                        <div [innerHTML]="post.answer"></div>
                    </div>
                    <div *ngIf="post.photos">
                        <img *ngFor="let photo of post.photos" src="{{photo.original_size.url}}">
                    </div>
                    <div *ngIf="post.player" [innerHTML]="post.player[post.player.length - 1].embed_code"></div>
                    <div [innerHTML]="post.body"></div>
                    <div *ngIf="post.caption" [innerHTML]="post.caption"></div>
                </div>
            </li>
        </ul>
    `,
    styles: [`
        ul{
            padding: 0;
            list-style: none;
        }
        
        li{
            background-color: lightgrey;
            padding: 10px;
            margin: 40px 0;
        }
        
        div.question{
            background-color: grey;
        }
        
        img{
            width: 100%;
        }
    `]
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