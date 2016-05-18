import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll ],
    template: `
        <div class="pure-u-1-6"></div>
        <ul infinite-scroll [infiniteScrollDistance]="2" (scrolled)="onScroll()" class="pure-u-2-3">
            <li *ngFor="let post of posts">
                <div>
                    <div *ngIf="post.type == 'answer'">
                        <div class="question">
                            <p>{{post.asking_name}} asked:</p>
                            <p>{{post.question}}</p>
                        </div>
                        <div [innerHTML]="post.answer"></div>
                    </div>
                    
                    <div *ngIf="post.type == 'quote'">
                        <p>{{post.text}}</p>
                        <div [innerHTML]="post.source"></div>
                    </div>
                    
                    <div *ngIf="post.type == 'photo'">
                        <img *ngFor="let photo of post.photos" src="{{photo.original_size.url}}">
                    </div>
                    <div *ngIf="post.type == 'video'" [innerHTML]="post.player[post.player.length - 1].embed_code"></div>
                    <div *ngIf="post.caption" [innerHTML]="post.caption"></div>
                    
                    <div *ngIf="post.type == 'text'"[innerHTML]="post.body"></div>
                    
                    <div>
                        <ul class="list-inline">
                            <li *ngFor="let tag of post.tags">
                                <a target="_blank" href="http://{{blog.name}}.tumblr.com/tagged/{{tag}}">#{{tag}}</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        {{post.date | date}}
                    </div>
                </div>
            </li>
        </ul>
    `,
    styles: [`
        ul{
            padding: 0;
            list-style: none;
        }
        
        li:first-child{
            margin-top: 0;
        }
        
        li{
            background-color: lightgrey;
            padding: 10px;
            margin: 40px 0;
        }
        
        .list-inline > li{
            display: inline-block;
            margin: 0;
            padding-left: 0;
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

    onScroll(){
        if(this.posts.length < this.blog.posts){
            this._tumblrService.getPosts(this.blog.name, this.posts.length).subscribe(res => {
                this.posts = this.posts.concat(res.posts);
            });
        }
    }
}